const BASE = 'https://gi.yatta.moe/api/v2/';
const LANG = { es: 'es', en: 'en', pt: 'pt', ja: 'jp', ko: 'kr' };
const ELEMENT = { Wind: 'ELEMENT_ANEMO', Rock: 'ELEMENT_GEO', Electric: 'ELEMENT_ELECTRO', Fire: 'ELEMENT_PYRO', Water: 'ELEMENT_HYDRO', Ice: 'ELEMENT_CRYO', Grass: 'ELEMENT_DENDRO' };
const EXTRA = { 1: 0, 2: 1, 9: 2 };
const norm = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}\p{M}]/gu, '');
const clean = value => String(value || '').replace(/<[^>]+>/g, '').replace(/\{[^}]+\}/g, '').replace(/^#/, '');

async function pool(jobs, worker) {
  let index = 0;
  await Promise.all(Array.from({ length: Math.min(3, jobs.length) }, async () => {
    while (index < jobs.length) await worker(jobs[index++]);
  }));
}

function costsFromPromotes(promotes, key, levelKey) {
  const result = {};
  for (const step of Object.values(promotes || {})) {
    const level = step[levelKey];
    if (!Number.isInteger(level) || level < 1 || !step.costItems) continue;
    result[`${key}${level}`] = [{ id: 202, count: step.coinCost }, ...Object.entries(step.costItems).map(([id, count]) => ({ id: Number(id), count }))];
  }
  return result;
}

function fromCharacter(raw, version) {
  if (!raw.id || !raw.name || !raw.upgrade || !raw.talent || !raw.region || !ELEMENT[raw.element]) throw Error('Ficha Yatta incompleta: faltan identidad, elemento, region, ascensiones o talentos.');
  const character = { id: Number(raw.id), name: raw.name, rarity: raw.rank, weaponType: raw.weaponType, elementType: ELEMENT[raw.element],
    associationType: `ASSOC_${raw.region}`, substatType: raw.specialProp, substatText: raw._specialStatText || null,
    costs: costsFromPromotes(raw.upgrade.promote, 'ascend', 'promoteLevel'), images: { filename_icon: raw.icon }, version, _provider: BASE };
  const active = Object.values(raw.talent).filter(talent => Object.values(talent.promote || {}).some(step => step.level >= 2 && step.costItems));
  if (active.length !== 3) throw Error(`Se esperaban tres talentos mejorables; la fuente contiene ${active.length}.`);
  const iconSlot = talent => /^Skill_A_/.test(talent.icon) ? 1 : /^Skill_S_/.test(talent.icon) ? 2 : /^Skill_E_/.test(talent.icon) ? 3 : null;
  const iconSlots = active.map(iconSlot);
  const typeSlots = active.map(talent => talent.type + 1);
  const useIcons = iconSlots.every(Boolean) && new Set(iconSlots).size === 3;
  if (!useIcons && (new Set(typeSlots).size !== 3 || typeSlots.some(index => ![1, 2, 3].includes(index)))) throw Error('No se pudo distinguir ataques normales, habilidad y definitiva.');
  const talents = { id: character.id, name: raw.name, costs: {}, images: {}, version, _provider: BASE };
  for (const talent of active) {
    const index = useIcons ? iconSlot(talent) : talent.type + 1;
    const costs = costsFromPromotes(talent.promote, 'lvl', 'level');
    talents[`combat${index}`] = { name: talent.name, description: clean(talent.description), costs };
    talents.images[`filename_combat${index}`] = talent.icon;
    if (index === 1) talents.costs = costs;
  }
  const constellations = { id: character.id, name: raw.name, version, _provider: BASE };
  const values = Object.values(raw.constellation || {});
  values.forEach((item, i) => {
    const extra = item.extraData?.addTalentExtraLevel;
    if (extra && extra.extraLevel !== 3) throw Error('Constelacion con aumento de talento distinto de 3: requiere adaptacion.');
    constellations[`c${i + 1}`] = { name: item.name, description: clean(item.description), ...(extra && EXTRA[extra.talentIndex] != null ? { _talentIndex: EXTRA[extra.talentIndex] } : {}) };
  });
  return { character, talents, constellations };
}

function fromWeapon(raw, version, indexType) {
  if (!raw.id || !raw.name || !raw.upgrade) throw Error('Ficha Yatta de arma incompleta.');
  const names = { Sword: 'WEAPON_SWORD_ONE_HAND', Claymore: 'WEAPON_CLAYMORE', Polearm: 'WEAPON_POLE', Catalyst: 'WEAPON_CATALYST', Bow: 'WEAPON_BOW' };
  const weaponType = /^WEAPON_/.test(indexType || '') ? indexType : /^WEAPON_/.test(raw.type || '') ? raw.type : names[raw.type];
  if (!weaponType) throw Error(`No se pudo normalizar el tipo de arma: ${raw.type}.`);
  return { id: Number(raw.id), name: raw.name, rarity: raw.rank, weaponType,
    costs: costsFromPromotes(raw.upgrade.promote, 'ascend', 'promoteLevel'), images: { filename_icon: raw.icon }, version, _provider: BASE };
}

function stats90(raw, curves, character) {
  const phase = Object.values(raw.upgrade?.promote || {}).find(step => step.promoteLevel === 6);
  if (!phase) return null;
  const result = { level: 90, ascension: 6 };
  for (const [prop, key] of character ? [['FIGHT_PROP_BASE_HP', 'hp'], ['FIGHT_PROP_BASE_ATTACK', 'attack'], ['FIGHT_PROP_BASE_DEFENSE', 'defense']] : [['FIGHT_PROP_BASE_ATTACK', 'attack']]) {
    const base = raw.upgrade.prop?.find(item => item.propType === prop);
    const curve = curves?.['90']?.curveInfos?.[base?.type] ?? curves?.['90']?.[base?.type];
    const factor = typeof curve === 'number' ? curve : curve?.[prop];
    const addition = phase.addProps?.[prop];
    if (!Number.isFinite(base?.initValue) || !Number.isFinite(factor) || !Number.isFinite(addition)) return null;
    result[key] = base.initValue * factor + addition;
  }
  if (character) {
    if (!Number.isFinite(phase.addProps?.[raw.specialProp])) return null;
    result.specialized = phase.addProps[raw.specialProp];
  }
  return { 90: result };
}

function costsConflict(first, second) {
  for (const [step, rows] of Object.entries(first || {})) {
    const other = second?.[step];
    if (!Array.isArray(rows) || !Array.isArray(other)) continue;
    const ids = new Set(other.map(item => String(item.id)));
    if (rows.length === other.length && rows.some(item => !ids.has(String(item.id)))) return true;
    for (const item of rows) {
      const matched = other.find(entry => String(entry.id) === String(item.id));
      if (item.count != null && matched?.count != null && item.count !== matched.count) return true;
    }
  }
  return false;
}

function merge(snapshot, folder, lang, incoming) {
  const key = `${folder}/${lang}`;
  const entries = snapshot.datasets[key] ||= [];
  const current = entries.find(item => String(item.id) === String(incoming.id)) || (['talents', 'constellations'].includes(folder) ? entries.find(item => norm(incoming.name) && norm(item.name) === norm(incoming.name)) : null);
  if (!current) entries.push(incoming);
  else if (current._provider === BASE && incoming._provider === BASE) entries[entries.indexOf(current)] = incoming;
  else if (folder === 'materials' && incoming._farmingSources) { current._farmingSources = incoming._farmingSources; current._droppedBy = incoming._droppedBy; }
  else if (['characters', 'weapons', 'talents'].includes(folder) && current.costs && JSON.stringify(current.costs) !== JSON.stringify(incoming.costs)) {
    if (costsConflict(current.costs, incoming.costs)) snapshot.preloadSources.conflicts.push({ folder, language: lang, id: incoming.id, reason: 'Costes diferentes entre genshin-db y Yatta. Revisar antes de integrar.' });
  }
}

async function collect(snapshot, manifest, local, options, requestJson, fetcher = fetch, log = console.log) {
  snapshot.preloadSources = { stage: 'preload', provider: BASE, checkedAt: new Date().toISOString(), advertisedVersions: [], raw: {}, conflicts: [], warnings: [], conversionErrors: [], targetIdentified: false, targetIds: { characters: [], weapons: [], materials: [], artifacts: [] } };
  const state = snapshot.preloadSources;
  if (options.cachedReplay) { state.reprocessedAt = state.checkedAt; state.checkedAt = options.cachedAt || snapshot.collectedAt; }
  async function get(route, required = false) {
    const request = { key: `preload/${route}`, url: `${BASE}${route}`, checkedAt: new Date().toISOString(), required };
    if (options.cachedReplay) { request.mode = 'cached'; request.checkedAt = options.cachedAt || snapshot.collectedAt; }
    try {
      const payload = await requestJson(request.url, options, fetcher);
      if (payload?.response != null && payload.response !== 200) throw Error(`Yatta response ${payload.response}.`);
      if (!payload?.data || typeof payload.data !== 'object') throw Error('Respuesta Yatta inesperada: falta data.');
      state.raw[route] = payload.data; request.status = 'ok'; log(`OK ${request.key}`);
      return payload.data;
    } catch (error) { request.status = 'error'; request.error = error.message; log(`ERROR ${request.key}: ${error.message}`); return null; }
    finally { snapshot.requests.push(request); }
  }
  const [versionData, avatars, weapons, changelog] = await Promise.all([get('static/version'), get('en/avatar'), get('en/weapon'), get('static/changelog')]);
  const aliases = { avatar: 'characters', character: 'characters', characters: 'characters', weapon: 'weapons', weapons: 'weapons', material: 'materials', materials: 'materials', reliquary: 'artifacts', artifact: 'artifacts', artifacts: 'artifacts' };
  for (const entry of Object.values(changelog || {})) {
    if (typeof entry?.version !== 'string' || entry.version.split('.').slice(0, 2).join('.') !== options.version || !entry.items || typeof entry.items !== 'object') continue;
    if (Array.isArray(entry.items)) { state.conversionErrors.push('Formato inesperado del registro de cambios de la version.'); continue; }
    state.targetIdentified = true;
    for (const [category, ids] of Object.entries(entry.items)) {
      const target = aliases[category];
      if (target && Array.isArray(ids)) {
        for (const id of ids.filter(id => !/^\d+$/.test(String(id)))) state.conversionErrors.push(`Identificador especial ${category}/${id}: requiere adaptacion explicita.`);
        state.targetIds[target] = [...new Set([...state.targetIds[target], ...ids.filter(id => /^\d+$/.test(String(id))).map(String)])];
      }
    }
  }
  const versionStrings = JSON.stringify(versionData || {}).match(/\b\d{1,2}\.\d{1,2}(?:\.\d+)?\b/g) || [];
  state.advertisedVersions = [...new Set(versionStrings.map(value => value.split('.').slice(0, 2).join('.')))];
  const exactVersion = state.advertisedVersions.length === 1 && state.advertisedVersions[0] === options.version;
  state.versionEvidence = exactVersion ? 'semantic-version' : state.targetIdentified ? 'versioned-changelog' : 'manifest-and-known-ids';
  if (!exactVersion && !state.targetIdentified) state.warnings.push('La version de la fuente secundaria no se pudo confirmar como la solicitada. Solo se consultan IDs conocidos o personajes/armas esperados explicitamente.');
  const index = (value) => Object.entries(value?.items || {}).map(([id, item]) => ({ ...item, id: item.id ?? id }));
  const expectedCharacters = new Set((manifest.expectedCharacters || []).map(norm));
  const expectedWeapons = new Set((manifest.expectedWeapons || []).map(norm));
  const selected = (folder, values, expected) => {
    const known = new Set([...(snapshot.datasets[`${folder}/en`] || []).filter(item => item.version === options.version).map(item => String(item.id)), ...state.targetIds[folder]]);
    const knownIds = new Set(local[folder].map(item => String(item.id)));
    const chosen = values.filter(item => known.has(String(item.id)) || expected.has(norm(item.name)) || expected.has(norm(item.route)) || exactVersion && !knownIds.has(String(item.id)) && item.beta === true);
    for (const id of known) if (!chosen.some(item => String(item.id) === id)) chosen.push({ id });
    return chosen;
  };
  const chars = selected('characters', index(avatars), expectedCharacters);
  const arms = selected('weapons', index(weapons), expectedWeapons);
  const jobs = [...chars.map(item => ({ folder: 'characters', endpoint: 'avatar', item })), ...arms.map(item => ({ folder: 'weapons', endpoint: 'weapon', item }))];
  const materialIds = new Set(state.targetIds.materials);
  await pool(jobs.flatMap(job => options.languages.map(lang => ({ job, lang }))), async ({ job, lang }) => {
      const raw = await get(`${LANG[lang]}/${job.endpoint}/${job.item.id}`);
      if (!raw) return;
      try {
        if (String(raw.id) !== String(job.item.id)) throw Error('El ID de la respuesta no coincide con el solicitado.');
        if (job.folder === 'characters') {
          const converted = fromCharacter(raw, options.version);
          merge(snapshot, job.folder, lang, converted.character);
          merge(snapshot, 'talents', lang, converted.talents);
          merge(snapshot, 'constellations', lang, converted.constellations);
          for (const rows of Object.values(converted.talents.costs)) for (const item of rows) materialIds.add(String(item.id));
          for (const rows of Object.values(converted.character.costs)) for (const item of rows) materialIds.add(String(item.id));
        } else {
          const converted = fromWeapon(raw, options.version, job.item.type);
          merge(snapshot, job.folder, lang, converted);
          for (const rows of Object.values(converted.costs)) for (const item of rows) materialIds.add(String(item.id));
        }
      } catch (error) { state.conversionErrors.push(`${job.folder}/${job.item.id}/${lang}: ${error.message}`); }
  });
  const materialsToFetch = [...materialIds].filter(id => {
    const complete = options.languages.every(lang => (snapshot.datasets[`materials/${lang}`] || []).some(item => String(item.id) === id));
    const needsSource = /^(113|114|1043)/.test(id) && id !== '104319' && !local.domains.some(domain => domain.matIds?.map(String).includes(id));
    return !complete || needsSource;
  });
  await pool(materialsToFetch.flatMap(id => options.languages.map(lang => ({ id, lang }))), async ({ id, lang }) => {
      const raw = await get(`${LANG[lang]}/material/${id}`);
      if (raw) {
        const sources = [...(raw.source || [])];
        const droppedBy = raw.additions?.droppedBy || [];
        if (/^113/.test(id) && droppedBy.length === 1 && !sources.some(item => item.type === 'Monster')) sources.push({ type: 'Monster', name: droppedBy[0].name, id: droppedBy[0].id });
        merge(snapshot, 'materials', lang, { id: Number(id), name: raw.name, rarity: raw.rank, typeText: raw.type, sources: (raw.source || []).map(item => item.name), _farmingSources: sources, _droppedBy: droppedBy, images: { filename_icon: raw.icon }, _provider: BASE });
      }
  });
  // Conservar los detalles crudos permite resolver discrepancias sin otra descarga.
  if (jobs.length) {
    const [avatarCurves, weaponCurves] = await Promise.all([chars.length ? get('static/avatarCurve') : null, arms.length ? get('static/weaponCurve') : null]);
    for (const job of jobs) {
      const raw = state.raw[`en/${job.endpoint}/${job.item.id}`];
      if (!raw) continue;
      const converted = stats90(raw, job.folder === 'characters' ? avatarCurves : weaponCurves, job.folder === 'characters');
      if (converted && !snapshot.stats[`${job.folder}/${job.item.id}`]) {
        const key = `${job.folder}/${job.item.id}`;
        snapshot.stats[key] = converted;
        (snapshot.statsSources ||= {})[key] = BASE;
      }
    }
  }
  return state;
}

async function replay(snapshot, manifest, local, options, log = console.log) {
  const previous = snapshot.preloadSources;
  if (!previous?.raw) return;
  const cache = previous.raw;
  await collect(snapshot, manifest, local, { ...options, cachedReplay: true, cachedAt: previous.checkedAt || snapshot.collectedAt }, async url => {
    const route = url.slice(BASE.length);
    if (!Object.hasOwn(cache, route)) throw Error(`No se guardo esta respuesta: ${route}. Requiere otra consulta con conexion.`);
    return { data: cache[route] };
  }, undefined, log);
  snapshot.preloadSources.raw = { ...cache, ...snapshot.preloadSources.raw };
  for (const request of snapshot.requests) {
    if (request.status === 'error' && request.key.startsWith('stats/')) {
      const key = request.key.slice('stats/'.length);
      if (snapshot.stats[key]?.['90']) { request.required = false; request.recoveredBy = snapshot.statsSources?.[key] || BASE; }
    }
  }
}

module.exports = { BASE, costsFromPromotes, fromCharacter, fromWeapon, stats90, collect, costsConflict, replay };
