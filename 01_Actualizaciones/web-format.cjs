const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const standardCosts = require('./standard-costs.cjs');
const UI_ASSETS = require('./ui-assets.json');
const LANGS = ['es', 'en', 'pt', 'ja', 'ko'];
const UI = 'https://gi.yatta.moe/assets/UI/';
const WEAPONS = { WEAPON_SWORD_ONE_HAND: 'Sword', WEAPON_CLAYMORE: 'Claymore', WEAPON_POLE: 'Polearm', WEAPON_CATALYST: 'Catalyst', WEAPON_BOW: 'Bow' };
const ELEMENTS = { ELEMENT_ANEMO: 'Anemo', ELEMENT_GEO: 'Geo', ELEMENT_ELECTRO: 'Electro', ELEMENT_PYRO: 'Pyro', ELEMENT_HYDRO: 'Hydro', ELEMENT_CRYO: 'Cryo', ELEMENT_DENDRO: 'Dendro' };
const DAYS = { lunes: 1, monday: 1, martes: 2, tuesday: 2, miércoles: 3, wednesday: 3, jueves: 4, thursday: 4, viernes: 5, friday: 5, sábado: 6, saturday: 6, domingo: 0, sunday: 0 };
const clone = value => JSON.parse(JSON.stringify(value));
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const norm = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}\p{M}]/gu, '');

function image(filename) {
  if (!filename) return null;
  const key = String(filename).split('/').pop().replace(/\.(png|webp)$/i, '');
  if (UI_ASSETS[key]) return UI_ASSETS[key].url;
  return /^https:\/\//.test(filename) ? filename : `${UI}${String(filename).replace(/\.png$/, '')}.png`;
}

function convertCosts(costs, prefix, levels) {
  const result = {};
  for (const level of levels) {
    const rows = costs?.[`${prefix}${level}`];
    if (!Array.isArray(rows) || !rows.length) throw Error(`Falta el coste ${prefix}${level}.`);
    const converted = { coinCost: 0, costItems: {} };
    const seen = new Set();
    for (const item of rows) {
      const id = String(item.id);
      if (!/^\d+$/.test(id) || !Number.isSafeInteger(item.count) || item.count < 0 || seen.has(id)) throw Error(`Coste invalido o duplicado en ${prefix}${level}: ${id}.`);
      seen.add(id);
      if (id === '202') converted.coinCost = item.count;
      else if (item.count > 0) converted.costItems[id] = item.count;
    }
    if (!seen.has('202')) throw Error(`Falta Mora en ${prefix}${level}.`);
    result[level] = converted;
  }
  return result;
}

function usedIds(record) {
  const ids = new Set(['202']);
  for (const table of [record.ascensionCosts, ...(record.talents || []).map(talent => talent.costs)]) {
    for (const cost of Object.values(table || {})) for (const id of Object.keys(cost.costItems || {})) ids.add(id);
  }
  return ids;
}

function replaceConstant(source, name, value) {
  const match = new RegExp(`^const ${name}\\s*=\\s*`, 'm').exec(source);
  if (!match) throw Error(`No se encontro la constante ${name}.`);
  const start = match.index + match[0].length;
  let depth = 0, quote = null, comment = null;
  for (let i = start; i < source.length; i++) {
    const ch = source[i], next = source[i + 1];
    if (comment === 'line') { if (ch === '\n') comment = null; continue; }
    if (comment === 'block') { if (ch === '*' && next === '/') { comment = null; i++; } continue; }
    if (quote) { if (ch === '\\') { i++; continue; } if (ch === quote) quote = null; continue; }
    if (ch === '/' && next === '/') { comment = 'line'; i++; continue; }
    if (ch === '/' && next === '*') { comment = 'block'; i++; continue; }
    if (['"', "'", '`'].includes(ch)) { quote = ch; continue; }
    if ('[{('.includes(ch)) depth++;
    if (']})'.includes(ch)) depth--;
    if (ch === ';' && depth === 0) return `${source.slice(0, start)}${JSON.stringify(value, null, 2)}${source.slice(i)}`;
  }
  throw Error(`No se encontro el final de ${name}.`);
}

function materialRecord(raw, existing) {
  const record = { id: String(raw.id), name: raw.name, rank: raw.rarity ?? raw.rank ?? existing?.rank, icon: image(raw.images?.filename_icon) || existing?.icon };
  if (!record.name || !record.icon || !Number.isInteger(record.rank)) throw Error(`Ficha de material incompleta: ${record.id}.`);
  return record;
}

function convertDossier(dossier, local, quantityAudit = []) {
  const raw = dossier.translations.es;
  const existing = local[dossier.folder].find(item => String(item.id) === String(dossier.id));
  if (!existing && local[dossier.folder].some(item => norm(item.name) === norm(raw?.name))) throw Error(`El nombre ${raw.name} ya existe con otro ID; resolver el alias sin cambiar planes guardados.`);
  if (!raw || !/^\d+$/.test(String(raw.id))) throw Error('Falta identidad del personaje o arma en espanol.');
  const record = {
    id: existing?.id || String(raw.id), name: existing?.name || raw.name, rarity: raw.rarity,
    icon: image(raw.images?.filename_icon) || existing?.icon,
    ascensionCosts: convertCosts(dossier.folder === 'characters' ? standardCosts.complete(raw.costs, 'ascend', raw, quantityAudit) : raw.costs, 'ascend', [1, 2, 3, 4, 5, 6]), items: {}
  };
  if (existing && norm(existing.name) !== norm(raw.name)) throw Error(`Cambio de nombre para ID existente ${raw.id}: revisar alias antes de integrar.`);
  const weapon = WEAPONS[raw.weaponType];
  if (!weapon || !record.icon || ![3, 4, 5].includes(record.rarity)) throw Error(`Identidad incompleta o fuera del alcance del catalogo: ${raw.id}.`);
  if (dossier.folder === 'characters') {
    record.element = ELEMENTS[raw.elementType]; record.weapon = weapon;
    record.region = raw.associationType?.replace(/^ASSOC_/, '') || existing?.region;
    record.namecard = existing?.namecard || null;
    if (!record.element || !record.region) throw Error(`Falta elemento o region de ${raw.name}.`);
    const talents = dossier.related.talents?.es;
    if (!talents) throw Error(`Faltan talentos de ${raw.name}.`);
    const talentCosts = convertCosts(standardCosts.complete(talents.costs, 'lvl', raw, quantityAudit), 'lvl', [2, 3, 4, 5, 6, 7, 8, 9, 10]);
    record.talents = [1, 2, 3].map(index => {
      const talent = talents[`combat${index}`];
      const icon = image(talents.images?.[`filename_combat${index}`]);
      if (!talent?.name || !icon) throw Error(`Falta talento ${index} o su imagen: ${raw.name}.`);
      const costs = talent.costs ? convertCosts(standardCosts.complete(talent.costs, 'lvl', raw, quantityAudit), 'lvl', [2, 3, 4, 5, 6, 7, 8, 9, 10]) : clone(talentCosts);
      return { name: talent.name, icon, costs };
    });
  } else record.type = weapon;
  return record;
}

function boostsFor(dossier) {
  const result = {};
  const english = dossier.related.constellations?.en;
  for (const key of ['C3', 'C5']) {
    const data = english?.[key.toLowerCase()];
    if (data?._talentIndex != null) { result[key] = data._talentIndex; continue; }
    const text = data?.description || '';
    if (!/by\s+3\b/i.test(text)) throw Error(`No se pudo verificar el aumento de 3 niveles de ${key} de ${dossier.name}.`);
    if (/Increases the Level of the Elemental Skill\b/i.test(text)) result[key] = 1;
    else if (/Increases the Level of the Elemental Burst\b/i.test(text)) result[key] = 2;
    else if (/Increases the Level of (the )?Normal Attack\b/i.test(text)) result[key] = 0;
    else throw Error(`No se pudo identificar ${key} de ${dossier.name}; requiere revision.`);
  }
  return result;
}

function baseStatsFor(dossier) {
  const stats = dossier.stats?.['90'];
  if (!stats || ['hp', 'attack', 'defense'].some(key => !Number.isFinite(stats[key]) || stats[key] <= 0)) return null;
  const raw = dossier.translations.es;
  const label = raw.substatText || { FIGHT_PROP_CRITICAL: 'Prob. CRIT', FIGHT_PROP_CRITICAL_HURT: 'Daño CRIT', FIGHT_PROP_ATTACK_PERCENT: 'ATQ%', FIGHT_PROP_HP_PERCENT: 'Vida%', FIGHT_PROP_DEFENSE_PERCENT: 'DEF%', FIGHT_PROP_CHARGE_EFFICIENCY: 'Recarga de Energía', FIGHT_PROP_ELEMENT_MASTERY: 'Maestría Elemental', FIGHT_PROP_HEAL_ADD: 'Bono de Curación', FIGHT_PROP_ELEC_ADD_HURT: 'Bono de Daño Electro', FIGHT_PROP_WATER_ADD_HURT: 'Bono de Daño Hydro', FIGHT_PROP_FIRE_ADD_HURT: 'Bono de Daño Pyro', FIGHT_PROP_ICE_ADD_HURT: 'Bono de Daño Cryo', FIGHT_PROP_WIND_ADD_HURT: 'Bono de Daño Anemo', FIGHT_PROP_ROCK_ADD_HURT: 'Bono de Daño Geo', FIGHT_PROP_GRASS_ADD_HURT: 'Bono de Daño Dendro', FIGHT_PROP_PHYSICAL_ADD_HURT: 'Bono de Daño Físico' }[raw.substatType];
  if (!label || !Number.isFinite(stats.specialized)) return null;
  const flat = ['FIGHT_PROP_ELEMENT_MASTERY', 'FIGHT_PROP_BASE_ATTACK'].includes(raw.substatType);
  const value = flat ? stats.specialized : stats.specialized * 100;
  return { hp90: Math.round(stats.hp), atk90: Math.round(stats.attack), def90: Math.round(stats.defense), ascStat: label, ascVal: `${Math.round(value * 10) / 10}${flat ? '' : '%'}` };
}

function sourceFor(id, snapshot, local, rawMaterials, rows) {
  const material = rawMaterials.get(id);
  const existing = local.domains?.find(domain => domain.matIds?.map(String).includes(id));
  if (existing) return { ...clone(existing), characters: [...new Set([...(existing.characters || []), ...rows.map(row => row.name)])] };
  const domain = (snapshot.datasets['domains/es'] || []).find(domain => String(domain.id) === String(material?.dropDomainId));
  const english = domain && (snapshot.datasets['domains/en'] || []).find(item => item.id === domain.id);
  const farming = material?._farmingSources || [];
  const region = { SNEZHNAYA: 'Snezhnaya', SNEZHNAYA_STAR: 'Snezhnaya', NODKRAI: 'Nod-Krai' }[rows[0]?.region] || rows[0]?.region || '';
  const monster = farming.filter(source => source.type === 'Monster' && source.name);
  if (/^113/.test(id) && monster.length === 1) {
    const ascensionUse = rows.some(row => Object.values(row.ascensionCosts || {}).some(cost => Object.hasOwn(cost.costItems, id)));
    return { id: `source_boss_${id}`, name: monster[0].name, region, type: ascensionUse ? 'boss' : 'weekly', resinCost: ascensionUse ? 40 : 60,
      days: [0, 1, 2, 3, 4, 5, 6], matName: material.name, matIds: [id], icon: image(material.images?.filename_icon), characters: rows.map(row => row.name), sourceKey: id, source: 'https://gi.yatta.moe/api/v2/' };
  }
  const namedDomain = farming.find(source => source.type === 'Domain' && source.name && source.days?.length);
  const domainName = domain?.entranceName || domain?.name || namedDomain?.name || material?.dropDomainName;
  const dayNames = material?.daysOfWeek || domain?.daysOfWeek || english?.daysOfWeek || namedDomain?.days;
  const days = dayNames?.map(day => typeof day === 'number' && day >= 0 && day <= 7 ? day % 7 : DAYS[String(day).toLowerCase()]);
  const type = /AVATAR_PROUD/.test(domain?.domainType || '') || /^1043/.test(id) ? 'talent' : /WEAPON/.test(domain?.domainType || '') || /^114/.test(id) ? 'weapon' : null;
  if (!type || !domainName || !days?.length || days.some(day => day == null)) return null;
  const sourceId = domain?.entranceId || material.dropDomainId || `material_${id}`;
  return { id: `source_${sourceId}_${days.join('')}_${type}`, name: domainName,
    region: domain?.regionName || region, type, resinCost: 20, days: [...new Set(days)].sort((a, b) => (a || 7) - (b || 7)), familyKey: `source_${sourceId}`,
    matName: material.name, matIds: [id], icon: image(material.images?.filename_icon), characters: rows.map(row => row.name), sourceKey: String(sourceId), source: namedDomain ? 'https://gi.yatta.moe/api/v2/' : snapshot.source };
}

function reviewBuild(dossier, entry, local, proposed, version) {
  if (!entry?.build || !entry.source) return { status: 'pending-specialist-review', build: null };
  const source = entry.source;
  let url;
  try { url = new URL(source.url); } catch { throw Error('URL de build invalida.'); }
  const specialist = ['keqingmains.com', 'www.prydwen.gg', 'prydwen.gg'].includes(url.hostname)
    || url.hostname === 'mobalytics.gg' && /^\/genshin-impact\/characters\/[a-z0-9-]+-build-guide\/?$/.test(url.pathname)
    || ['icy-veins.com', 'www.icy-veins.com'].includes(url.hostname) && /^\/genshin-impact\/[a-z0-9-]+-guide-best-builds\/?$/.test(url.pathname);
  if (url.protocol !== 'https:' || !specialist || url.username || url.password) throw Error('La build requiere una fuente especializada permitida: KQM, Prydwen, Mobalytics o Icy Veins.');
  if (source.guideVersion !== version || !/^\d{4}-\d{2}-\d{2}$/.test(source.reviewedAt || '') || typeof source.preliminary !== 'boolean') throw Error('La build requiere version, fecha de revision y estado preliminar explicitos.');
  const build = clone(entry.build);
  const previous = local.builds.find(item => Object.values(item.name || {}).some(name => norm(name) === norm(dossier.name)));
  if (!/^[a-z0-9_-]+$/.test(build.id || '') || previous && previous.id !== build.id || norm(build.name?.es) !== norm(dossier.name) || !build.name?.en || ['role', 'roleCategory', 'tier', 'scalingType', 'scalingLabel', 'talentPriority'].some(key => typeof build[key] !== 'string' || !build[key].trim())) throw Error('Build incompleta, identidad incorrecta o cambio del ID existente.');
  const character = proposed.characters.find(item => String(item.id) === String(dossier.id));
  if (!character || build.element !== character.element || build.weaponType !== character.weapon || build.rarity !== character.rarity) throw Error('La identidad de la build no coincide con el personaje.');
  if (!build.bestWeapons?.length || !build.bestArtifacts?.length || !build.metaTeams?.length || !build.substatsPriority?.length || ['sands', 'goblet', 'circlet'].some(key => !build.mainStats?.[key])) throw Error('Faltan armas, sets, equipos, estadisticas o prioridades en la build.');
  for (const weapon of build.bestWeapons) {
    const found = [...local.weapons, ...proposed.weapons].find(item => String(item.id) === String(weapon.weaponId));
    if (!found || found.type !== character.weapon) throw Error(`Arma de build inexistente o incompatible: ${weapon.weaponId}.`);
  }
  const roster = [...local.characters, ...proposed.characters];
  const resolveMember = name => {
    const direct = roster.find(item => norm(item.name) === norm(name));
    if (direct) return String(direct.id).split('-')[0];
    const alias = [...local.builds, ...proposed.builds].find(item => Object.values(item.name || {}).some(label => norm(label) === norm(name)));
    const avatar = alias && roster.find(item => item.icon === alias.icon);
    if (avatar) return String(avatar.id).split('-')[0];
    const translated = Object.entries(proposed.translations.characters).find(([, names]) => Object.values(names).some(label => norm(label) === norm(name)));
    return translated?.[0]?.split('-')[0] || null;
  };
  for (const team of build.metaTeams) {
    if (!Array.isArray(team.members) || team.members.length !== 4) throw Error('Equipo de build incompleto o con personajes desconocidos.');
    const ids = team.members.map(resolveMember);
    if (ids.some(id => !id) || new Set(ids).size !== 4) throw Error('Equipo de build con personajes desconocidos o identidades duplicadas por alias.');
  }
  build.icon = character.icon;
  build.review = { ...build.review, sourceUrl: source.url, targetVersion: version, date: source.reviewedAt, sourceConsulted: true, status: source.preliminary ? 'preliminary' : 'reviewed' };
  return { status: source.preliminary ? 'preliminary-reviewed' : 'reviewed', build };
}

function nativeTalents(raw) {
  if (!raw?.talent) return null;
  const result = {};
  for (const [slot, prefix] of [['normal', 'Skill_A_'], ['skill', 'Skill_S_'], ['burst', 'Skill_E_']]) {
    const talent = Object.values(raw.talent).find(item => item.icon?.startsWith(prefix));
    const levels = Object.values(talent?.promote || {}).sort((a, b) => a.level - b.level);
    if (levels.length < 13 || levels.some((row, index) => row.level !== index + 1 || !Array.isArray(row.params))) return null;
    const labels = (levels[0].description || []).filter(Boolean);
    if (!labels.length) return null;
    const parameters = {};
    for (const label of labels) for (const [, key, number] of label.matchAll(/\{(param(\d+)):/g)) {
      parameters[key] = levels.map(row => row.params[Number(number) - 1]);
      if (!parameters[key].every(Number.isFinite)) return null;
    }
    result[slot] = { name: talent.name, scaleStat: 'NATIVE', native: { labels, parameters } };
  }
  return result;
}

function compile(snapshot, report, local, reviewedBuilds = { entries: [] }) {
  const output = { schemaVersion: 1, format: 'spirifly-web-v1', version: report.requestedVersion, stage: 'preload', generatedAt: new Date().toISOString(), sourceCollectedAt: snapshot.collectedAt,
    characters: [], weapons: [], materials: {}, domains: [], artifacts: [], talentBoosts: {}, translations: { characters: {}, weapons: {} }, baseStats: {}, baseStatsSources: {}, builds: [], coverage: [], blockers: [], reviewRequired: true,
    sourceState: snapshot.preloadSources ? { provider: snapshot.preloadSources.provider, checkedAt: snapshot.preloadSources.checkedAt, advertisedVersions: snapshot.preloadSources.advertisedVersions, targetIdentified: snapshot.preloadSources.targetIdentified, targetIds: snapshot.preloadSources.targetIds, conflicts: snapshot.preloadSources.conflicts, warnings: snapshot.preloadSources.warnings } : null };
  const materialMap = new Map((snapshot.datasets['materials/es'] || []).map(item => [String(item.id), item]));
  const localMaterials = new Map(local.materials.map(item => [String(item.id), item]));
  for (const item of report.versionScope.materials || []) {
    try {
      const raw = materialMap.get(String(item.id));
      output.materials[item.id] = materialRecord(raw, localMaterials.get(String(item.id)));
    } catch (error) { output.blockers.push(`${item.name}: ${error.message}`); }
  }
  for (const item of report.versionScope.artifacts || []) {
    const raw = (snapshot.datasets['artifacts/es'] || []).find(row => String(row.id) === String(item.id));
    const names = Object.fromEntries(LANGS.map(lang => [lang, (snapshot.datasets[`artifacts/${lang}`] || []).find(row => String(row.id) === String(item.id))?.name || null]));
    output.artifacts.push({ id: String(item.id), name: names, effect2Pc: raw.effect2Pc, effect4Pc: raw.effect4Pc, flowerIcon: image(raw.images?.filename_flower), iconPath: `assets/artifacts/${raw.images?.filename_flower}.png`, status: 'pending-icon-and-alias-review' });
    output.blockers.push(`${item.name}: verificar imagen local y alias del set antes de integrarlo a las builds.`);
  }
  for (const dossier of report.dossiers) {
    const coverage = { id: String(dossier.id), name: dossier.name, kind: dossier.folder, catalog: 'pending', stats: dossier.stats ? 'downloaded' : 'pending', talents: 'not-applicable', constellations: 'not-applicable', translations: 'pending', farming: 'pending', build: 'not-applicable', quantityAudit: [], blockers: [] };
    try {
      const record = convertDossier(dossier, local, coverage.quantityAudit);
      if (coverage.quantityAudit.some(item => item.kind === 'source-exception')) coverage.blockers.push('La progresion publicada difiere del perfil estandar; requiere una regla de excepcion verificada.');
      const extras = dossier.folder === 'characters' ? ['104001', '104002', '104003'] : ['104011', '104012', '104013'];
      for (const id of new Set([...usedIds(record), ...extras])) {
        const raw = materialMap.get(id);
        const existing = localMaterials.get(id);
        if (!raw && !existing) throw Error(`Falta ficha del material ${id}.`);
        const material = raw ? materialRecord(raw, existing) : clone(existing);
        record.items[id] = material;
      }
      for (const [id, material] of Object.entries(record.items)) output.materials[id] = material;
      const names = {};
      for (const lang of LANGS) {
        const translated = dossier.translations[lang];
        if (!translated?.name) coverage.blockers.push(`Falta traduccion ${lang}.`);
        else names[lang] = translated.name;
      }
      output.translations[dossier.folder][record.id] = names;
      coverage.translations = Object.keys(names).length === 5 ? 'complete' : 'pending';
      if (dossier.folder === 'characters') {
        coverage.talents = 'converted';
        output.talentBoosts[record.name] = boostsFor(dossier); coverage.constellations = 'converted';
        output.characters.push(record);
        const native = nativeTalents(snapshot.preloadSources?.raw?.[`es/avatar/${record.id}`]);
        if (native) (output.talentsData ||= {})[record.id] = native;
        const base = baseStatsFor(dossier);
        if (base) { output.baseStats[record.id] = base; output.baseStatsSources[record.id] = { source: dossier.statsSource, retrieved: snapshot.collectedAt }; coverage.stats = 'converted'; }
        else coverage.blockers.push('Faltan estadisticas base de nivel 90 verificables en la descarga.');
      } else {
        output.weapons.push(record);
        if (!dossier.stats?.['90'] || !Number.isFinite(dossier.stats['90'].attack)) coverage.blockers.push('Faltan estadisticas del arma a nivel 90.');
      }
      coverage.catalog = 'converted';
    } catch (error) { coverage.blockers.push(error.message); }
    output.coverage.push(coverage);
  }
  const allRows = [...output.characters, ...output.weapons];
  const required = new Set(allRows.flatMap(row => [...usedIds(row)]));
  const sources = new Map();
  for (const id of required) {
    const users = allRows.filter(row => usedIds(row).has(id));
    const source = sourceFor(id, snapshot, local, materialMap, users);
    if (source) {
      const entry = sources.get(source.id);
      if (entry) { entry.matIds = [...new Set([...entry.matIds, ...source.matIds])]; entry.characters = [...new Set([...entry.characters, ...source.characters])]; }
      else sources.set(source.id, source);
    }
  }
  output.domains = [...sources.values()];
  for (const coverage of output.coverage) {
    const row = allRows.find(item => String(item.id) === coverage.id);
    if (!row) continue;
    const missing = [...usedIds(row)].filter(id => /^(1043|114|113)/.test(id) && id !== '104319' && !output.domains.some(domain => domain.matIds.includes(id)));
    coverage.farming = missing.length ? 'pending' : 'resolved';
    if (missing.length) coverage.blockers.push(`Falta fuente de farmeo verificada: ${missing.join(', ')}.`);
    const dossier = report.dossiers.find(item => String(item.id) === coverage.id);
    if (coverage.kind === 'characters') {
      const entry = reviewedBuilds.entries?.find(item => String(item.characterId) === coverage.id);
      try {
        const result = reviewBuild(dossier, entry, local, output, report.requestedVersion);
        coverage.build = result.status;
        if (result.build) output.builds.push(result.build);
        else coverage.blockers.push('Build pendiente: el modulo actual localiza guias especializadas, pero aun no importa automaticamente sus recomendaciones.');
      } catch (error) { coverage.build = 'invalid'; coverage.blockers.push(error.message); }
    }
  }
  for (const expected of report.expected.filter(item => item.status !== 'available-in-source')) output.blockers.push(`Personaje esperado no disponible: ${expected.name}.`);
  for (const expected of (report.expectedWeapons || []).filter(item => item.status !== 'available-in-source')) output.blockers.push(`Arma esperada no disponible: ${expected.name}.`);
  if (!report.versionScope.weapons.length && !report.weaponsScopeDeclared) output.blockers.push('La fuente no identifica armas de esta version. Confirmar los anuncios y completar expectedWeapons antes de declarar completo el paquete.');
  if (!report.dossiers.length) output.blockers.push('No se encontraron fichas de la version solicitada.');
  if (report.incomplete) output.blockers.push('Hay consultas fallidas en la descarga.');
  for (const kind of ['characters', 'weapons', 'artifacts']) for (const id of snapshot.preloadSources?.targetIds?.[kind] || []) {
    const converted = kind === 'artifacts' ? output.artifacts : output[kind];
    if (!converted.some(row => String(row.id) === id)) output.blockers.push(`La fuente anuncia ${kind}/${id} para esta version, pero no se pudo convertir. Revisar los datos descargados.`);
  }
  for (const conflict of report.preload?.sourceConflicts || []) output.blockers.push(`Conflicto de fuentes: ${conflict.folder}/${conflict.id}/${conflict.language}: ${conflict.reason}`);
  for (const error of snapshot.preloadSources?.conversionErrors || []) output.blockers.push(`No se pudo adaptar la fuente de predescarga: ${error}`);
  for (const coverage of output.coverage) for (const reason of coverage.blockers) output.blockers.push(`${coverage.name}: ${reason}`);
  updateStatus(output);
  return output;
}

function updateStatus(output) {
  const buildOnly = new Set(output.coverage.flatMap(row => row.blockers.filter(reason => reason.startsWith('Build pendiente:')).map(reason => `${row.name}: ${reason}`)));
  output.dataStatus = !output.coverage.length || output.blockers.some(reason => !buildOnly.has(reason)) ? 'incomplete' : 'prepared-for-local-review';
  const characters = output.coverage.filter(row => row.kind === 'characters');
  output.buildStatus = !characters.length ? 'not-applicable' : characters.some(row => !['reviewed', 'preliminary-reviewed'].includes(row.build)) ? 'pending' : 'reviewed';
  output.status = output.blockers.length ? 'incomplete' : 'prepared-for-local-review';
}

function mergeRows(existing, incoming) {
  const map = new Map(existing.map(row => [String(row.id), clone(row)]));
  for (const row of incoming) map.set(String(row.id), clone(row));
  return [...map.values()];
}

function stageFiles(root, output, local) {
  const source = file => fs.readFileSync(path.join(root, file), 'utf8');
  const files = {}, baseHashes = {};
  let data = source('data_real_genshin.js');
  data = replaceConstant(data, 'REAL_CHARACTERS_DB', mergeRows(local.characters, output.characters));
  data = replaceConstant(data, 'REAL_WEAPONS_DB', mergeRows(local.weapons, output.weapons));
  data = replaceConstant(data, 'REAL_MASTER_MATERIALS', { ...Object.fromEntries(local.materials.map(item => [item.id, item])), ...output.materials });
  data = replaceConstant(data, 'REAL_CHAR_TALENT_BOOSTS', { ...local.talentBoosts, ...output.talentBoosts });
  files['data_real_genshin.js'] = data;
  files['farming_engine.js'] = replaceConstant(source('farming_engine.js'), 'FARMING_DOMAINS_REGISTRY', mergeRows(local.domains, output.domains));
  const context = vm.createContext({ console });
  vm.runInContext(source('i18n_dictionary.js'), context);
  let dictionary = source('i18n_dictionary.js');
  for (const [kind, constant] of [['characters', 'I18N_CHARACTERS_RAW'], ['weapons', 'I18N_WEAPONS_RAW']]) {
    const original = JSON.parse(vm.runInContext(`JSON.stringify(${constant})`, context));
    for (const [id, names] of Object.entries(output.translations[kind])) {
      original[id] = names;
      if (names.es) original[names.es.toLowerCase()] = names;
      if (names.en) original[names.en.toLowerCase()] = names;
    }
    dictionary = replaceConstant(dictionary, constant, original);
  }
  files['i18n_dictionary.js'] = dictionary;
  const simulator = JSON.parse(source('assets/data/simulator-original.json'));
  for (const row of output.characters) {
    const existingBuild = [...local.builds, ...output.builds].find(build => Object.values(build.name || {}).some(name => norm(name) === norm(row.name)));
    if (existingBuild && output.baseStats[row.id]) {
      simulator.characters[existingBuild.id] = { ...simulator.characters[existingBuild.id], baseStats: output.baseStats[row.id], ...(output.talentsData?.[row.id] ? { talentsData: output.talentsData[row.id] } : {}), sourceKey: row.id, ...output.baseStatsSources[row.id] };
    }
  }
  files['assets/data/simulator-original.json'] = JSON.stringify(simulator);
  files['assets/data/simulator-original.js'] = replaceConstant(source('assets/data/simulator-original.js'), 'ORIGINAL_SIMULATOR_DATA', simulator);
  files['data_builds.js'] = replaceConstant(source('data_builds.js'), 'CHARACTER_BUILDS_DB', mergeRows(local.builds, output.builds));
  files['data_builds.js'] = files['data_builds.js'].replace('build.originalSource = ORIGINAL_SIMULATOR_DATA.source;', 'build.originalSource = original.source || ORIGINAL_SIMULATOR_DATA.source;');
  files['char_talent_boosts.json'] = JSON.stringify({ ...JSON.parse(source('char_talent_boosts.json')), ...output.talentBoosts }, null, 2);
  for (const [file, content] of Object.entries(files)) {
    baseHashes[file] = hash(source(file));
    if (file.endsWith('.js')) new vm.Script(content, { filename: file });
    else JSON.parse(content);
  }
  const check = vm.createContext({ console });
  for (const file of ['data_real_genshin.js', 'assets/data/simulator-original.js', 'data_builds.js', 'farming_engine.js', 'i18n_dictionary.js']) vm.runInContext(files[file], check, { filename: file, timeout: 15000 });
  return { files, baseHashes };
}

function buildReviewTemplate(report, local) {
  return { instructions: 'Completar solo despues de revisar KQM, Prydwen, Mobalytics o Icy Veins. No es una build validada ni se carga en la web. Guardar como versiones/VERSION.builds.json para la siguiente consulta.', entries: report.dossiers.filter(item => item.folder === 'characters').map(item => ({
    characterId: String(item.id), character: item.name,
    source: { url: '', guideVersion: report.requestedVersion, reviewedAt: '', preliminary: true },
    build: clone(local.builds.find(build => Object.values(build.name || {}).some(name => norm(name) === norm(item.name))) || { id: '', name: { es: item.name, en: item.translations.en?.name || '' }, role: '', roleCategory: '', bestWeapons: [], bestArtifacts: [], mainStats: {}, substatsPriority: [], metaTeams: [], talentPriority: '' })
  })) };
}

function coverageMarkdown(output) {
  const lines = ['# Paquete en formato Spirifly', '', `Version: ${output.version}. Etapa: predescarga. Estado: ${output.status}.`, '',
    `Datos del juego: ${output.dataStatus}. Builds: ${output.buildStatus}.`, '',
    'Los archivos de archivos_web/ son copias preparadas para revision local. No se aplicaron a la web. No copiar automaticamente un paquete incompleto.', '',
    '| Ficha | Catalogo | Estadisticas | Traducciones | Farmeo | Build |', '| --- | --- | --- | --- | --- | --- |'];
  for (const row of output.coverage) lines.push(`| ${row.name} | ${row.catalog} | ${row.stats} | ${row.translations} | ${row.farming} | ${row.build} |`);
  lines.push('', '## Cantidades completadas con reglas conocidas', '', 'Para personajes con progresion estandar, se completan cantidades ausentes cuando los IDs de todos los materiales del salto estan identificados. No se sustituyen cantidades explicitas diferentes ni se aplica este perfil al Viajero, maniquies o armas.');
  for (const row of output.coverage) for (const audit of row.quantityAudit || []) lines.push(audit.kind === 'standard-quantity' ? `- ${row.name}: ${audit.step}, material ${audit.materialId}, cantidad ${audit.count}; perfil ${audit.profile}.` : `- ${row.name}: ${audit.reason}`);
  lines.push('', '## Pendientes', '');
  for (const reason of output.blockers) lines.push(`- ${reason}`);
  if (!output.blockers.length) lines.push('Paquete preparado para revision local; la predescarga no equivale a datos finales del lanzamiento.');
  lines.push('', '## Flujo de revision', '', '1. Revisar este informe y las fuentes; completar REVISION_BUILDS.json si corresponde.', '2. Repetir la consulta durante la predescarga para incorporar correcciones disponibles.', '3. Comprobar los hashes base de INTEGRACION.json antes de integrar: si cambio la web local, regenerar el paquete.', '4. Incorporar los archivos revisados a local, ejecutar las pruebas y revisar visualmente.', '5. Publicar solo despues de la revision y la autorizacion del usuario.');
  return `${lines.join('\n')}\n`;
}

function factsMarkdown(output, snapshot) {
  const escape = value => String(value ?? '').replace(/\|/g, '\\|').replace(/[\r\n]+/g, ' ').replace(/\{NON_BREAK_SPACE\}/g, ' ').replace(/^#/, '');
  const rawMaterials = new Map((snapshot.datasets['materials/es'] || []).map(item => [String(item.id), item]));
  const lines = ['# Fichas preparadas para Spirifly', '', `Version ${output.version}. Datos de predescarga: ${output.sourceCollectedAt}.`, '', 'Las cantidades siguientes proceden del paquete convertido. Los pendientes se detallan en COBERTURA.md.'];
  const costList = (row, items) => Object.entries(row.costItems).map(([id, amount]) => `${escape(items[id]?.name || id)}: ${amount}`).join('; ');
  for (const row of [...output.characters, ...output.weapons]) {
    lines.push('', `## ${row.name}`, '', `ID: ${row.id}. Rareza: ${row.rarity}. Arma: ${row.weapon || row.type}.${row.element ? ` Elemento: ${row.element}.` : ''}`,
      '', '### Ascensiones', '', '| Fase | Mora | Materiales |', '| --- | ---: | --- |');
    for (const [phase, cost] of Object.entries(row.ascensionCosts)) lines.push(`| ${phase} | ${cost.coinCost} | ${costList(cost, row.items)} |`);
    for (const talent of row.talents || []) {
      lines.push('', `### ${talent.name}`, '', '| Nivel objetivo | Mora | Materiales |', '| --- | ---: | --- |');
      for (const [level, cost] of Object.entries(talent.costs)) lines.push(`| ${level} | ${cost.coinCost} | ${costList(cost, row.items)} |`);
    }
    lines.push('', '### Materiales, flores y fuentes', '', '| Material | ID | Fuente o ubicacion | Dominio o jefe | Dias (0 domingo) |', '| --- | --- | --- | --- | --- |');
    for (const id of usedIds(row)) {
      const material = row.items[id], raw = rawMaterials.get(id);
      const domain = output.domains.find(item => item.matIds.includes(id));
      lines.push(`| ${escape(material?.name || id)} | ${id} | ${escape(raw?.sources?.join('; ') || 'Sin detalle de ubicacion en la fuente')} | ${escape(domain?.name || '')} | ${domain?.days.join(', ') || ''} |`);
    }
  }
  if (!output.characters.length && !output.weapons.length) lines.push('', 'No se pudieron convertir fichas de esta version. Revisar COBERTURA.md.');
  return `${lines.join('\n')}\n`;
}

module.exports = { image, convertCosts, convertDossier, boostsFor, baseStatsFor, replaceConstant, compile, stageFiles, buildReviewTemplate, coverageMarkdown, factsMarkdown, updateStatus };
