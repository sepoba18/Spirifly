const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const pipeline = require('../01_Actualizaciones/version-pipeline.cjs');
const web = require('../01_Actualizaciones/web-format.cjs');
const preload = require('../01_Actualizaciones/preload-sources.cjs');
const standardCosts = require('../01_Actualizaciones/standard-costs.cjs');
const root = path.resolve(__dirname, '..');

function total(table) {
  const value = { 202: 0 };
  for (const row of Object.values(table)) {
    value[202] += row.coinCost;
    for (const [id, amount] of Object.entries(row.costItems)) value[id] = (value[id] || 0) + amount;
  }
  return value;
}

async function main() {
  const snapshot = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/version71-extraction.json'), 'utf8'));
  const local = pipeline.loadLocal(root);
  const report = pipeline.createReport(snapshot, local, {});
  const output = web.compile(snapshot, report, local);
  assert.equal(output.characters.length, 2, 'Incluir ambos personajes aunque existan en la web');
  assert.equal(output.weapons.length, 6);
  assert.equal(output.stage, 'preload');
  assert.equal(output.status, 'incomplete', 'No declarar completo sin estadisticas y guias revisadas');
  const vesna = output.characters.find(item => item.id === '10000143');
  assert.equal(vesna.weapon, 'Sword');
  assert.equal(vesna.element, 'Anemo');
  assert.equal(vesna.region, 'SNEZHNAYA_STAR');
  assert.deepEqual(total(vesna.ascensionCosts), { 202: 420000, 101277: 168, 104151: 1, 104152: 9, 104153: 9, 104154: 6, 112146: 18, 112147: 30, 112148: 36, 113092: 46 });
  for (const talent of vesna.talents) assert.deepEqual(total(talent.costs), { 202: 1652500, 104371: 3, 104372: 21, 104373: 38, 112146: 6, 112147: 22, 112148: 31, 113089: 6, 104319: 1 });
  assert.deepEqual(output.talentBoosts.Vesna, { C3: 1, C5: 2 });
  assert.deepEqual(output.domains.find(row => row.matIds.includes('104371')).days, [3, 6, 0]);
  assert.ok(output.coverage.every(row => row.farming === 'resolved' && row.translations === 'complete'));
  const newSourceSnapshot = structuredClone(snapshot);
  const newSourceLocal = structuredClone(local);
  newSourceLocal.domains = newSourceLocal.domains.filter(row => !row.matIds.includes('113092') && !row.matIds.includes('104371'));
  newSourceSnapshot.datasets['materials/es'].find(row => row.id === 113092)._farmingSources = [{ type: 'Monster', name: 'Espadachina Protectora Surcanieves' }];
  const newSources = web.compile(newSourceSnapshot, pipeline.createReport(newSourceSnapshot, newSourceLocal, {}), newSourceLocal);
  assert.equal(newSources.domains.find(row => row.matIds.includes('113092')).resinCost, 40);
  assert.equal(newSources.domains.find(row => row.matIds.includes('113092')).type, 'boss');
  assert.ok(newSources.domains.find(row => row.matIds.includes('104371')).days.includes(0));
  assert.ok(Object.values(output.materials).some(item => item.id === '101277' && item.name === 'Helecho áureo'));
  assert.deepEqual(output.translations.characters['10000143'].en, 'Vesna');
  assert.deepEqual(output.builds, [], 'No inventar ni promover builds existentes a revisadas');
  const absentCounts = structuredClone(report);
  for (const rows of Object.values(absentCounts.dossiers[0].translations.es.costs)) for (const item of rows) delete item.count;
  for (const rows of Object.values(absentCounts.dossiers[0].related.talents.es.costs)) for (const item of rows) delete item.count;
  const completedCounts = web.compile(snapshot, absentCounts, local);
  const completedVesna = completedCounts.characters.find(item => item.id === '10000143');
  assert.deepEqual(completedVesna.ascensionCosts, vesna.ascensionCosts, 'Recuperar todas las cantidades de ascension sin cambiar IDs');
  assert.deepEqual(completedVesna.talents, vesna.talents, 'Recuperar cantidades por talento sin cambiar materiales');
  assert.equal(completedCounts.coverage[0].quantityAudit.filter(item => item.kind === 'standard-quantity').length, 61);
  assert.equal(absentCounts.dossiers[0].translations.es.costs.ascend1[0].count, undefined, 'Conservar intacta la evidencia descargada');
  assert.match(web.coverageMarkdown(completedCounts), /standard-character-v1/);
  const unsupportedCost = structuredClone(absentCounts);
  unsupportedCost.dossiers[0].translations.es.costs.ascend1[1].id = 999999;
  assert.ok(!web.compile(snapshot, unsupportedCost, local).characters.some(item => item.id === '10000143'), 'No inventar la identidad de un material');
  const exceptionalCosts = structuredClone(report.dossiers[0].translations.es.costs);
  exceptionalCosts.ascend1[0].count = 99999;
  delete exceptionalCosts.ascend2[0].count;
  const exceptionAudit = [];
  const kept = standardCosts.complete(exceptionalCosts, 'ascend', { id: '10000143', rarity: 5 }, exceptionAudit);
  assert.equal(kept.ascend1[0].count, 99999);
  assert.equal(kept.ascend2[0].count, undefined, 'No completar una progresion que difiere del estandar');
  assert.equal(exceptionAudit[0].kind, 'source-exception');
  const explicitDifferent = structuredClone(report);
  explicitDifferent.dossiers[0].translations.es.costs.ascend1[0].count = 30000;
  const differentOutput = web.compile(snapshot, explicitDifferent, local);
  assert.equal(differentOutput.characters.find(item => item.id === '10000143').ascensionCosts[1].coinCost, 30000);
  assert.ok(differentOutput.coverage[0].blockers.some(text => text.includes('regla de excepcion')));
  assert.equal(standardCosts.complete(exceptionalCosts, 'ascend', { id: '10000005', rarity: 5 }), exceptionalCosts, 'Excluir al Viajero del perfil generico');

  // Valores sinteticos solo para probar la ruta completa; no se guardan como datos del juego.
  const completeSnapshot = structuredClone(snapshot);
  for (const dossier of report.dossiers) completeSnapshot.stats[`${dossier.folder}/${dossier.id}`] = { 90: dossier.folder === 'characters' ? { hp: 10000, attack: 250, defense: 600, specialized: 0.192 } : { attack: 600 } };
  const reviewed = { entries: report.dossiers.filter(item => item.folder === 'characters').map(item => {
    const build = structuredClone(local.builds.find(build => build.name.en === item.translations.en.name));
    return { characterId: String(item.id), build, source: { url: build.review.sourceUrl, guideVersion: '7.1', reviewedAt: '2026-11-02', preliminary: true } };
  }) };
  const completeReport = pipeline.createReport(completeSnapshot, local, {});
  const completeOutput = web.compile(completeSnapshot, completeReport, local, reviewed);
  assert.deepEqual(completeOutput.blockers, []);
  assert.equal(completeOutput.status, 'prepared-for-local-review');
  assert.equal(completeOutput.builds.length, 2);
  assert.ok(completeOutput.builds.every(build => build.review.status === 'preliminary'));
  const rejectedReview = structuredClone(reviewed);
  rejectedReview.entries[0].source.url = 'https://example.com/guide';
  assert.ok(web.compile(completeSnapshot, completeReport, local, rejectedReview).blockers.some(text => text.includes('fuente especializada')));
  const repeatedTeam = structuredClone(reviewed);
  repeatedTeam.entries[0].build.metaTeams[0].members = ['Vesna', 'Vodyanitsa', 'Faruzan', 'Faruzán'];
  assert.ok(web.compile(completeSnapshot, completeReport, local, repeatedTeam).blockers.some(text => text.includes('duplicadas por alias')));

  const invalid = structuredClone(report);
  invalid.dossiers[0].translations.es.costs.ascend1[0].count = -1;
  const invalidOutput = web.compile(snapshot, invalid, local);
  assert.ok(invalidOutput.coverage[0].blockers.some(text => text.includes('Coste invalido')));
  assert.ok(!invalidOutput.characters.some(row => row.id === '10000143'));
  const aliasLocal = structuredClone(local);
  aliasLocal.characters.find(item => item.id === '10000143').id = 'legacy-vesna';
  assert.throws(() => web.convertDossier(report.dossiers[0], aliasLocal), /otro ID/);

  const diagnostic = structuredClone(report);
  diagnostic.preload.sourceConflicts.push({ folder: 'characters', id: '10000143', language: 'es', reason: 'Cantidades distintas' });
  assert.ok(web.compile(snapshot, diagnostic, local).blockers.some(text => text.includes('Conflicto de fuentes')));
  const statDossier = structuredClone(report.dossiers[0]);
  statDossier.stats = { 90: { hp: 10000.4, attack: 250.2, defense: 600.8, specialized: 0.192 } };
  assert.deepEqual(web.baseStatsFor(statDossier), { hp90: 10000, atk90: 250, def90: 601, ascStat: 'Prob. CRIT', ascVal: '19.2%' });

  const source = 'const SAMPLE = [{name:";]", f:`x;${1}`}];\nfunction keep(){return 2;}';
  const replaced = web.replaceConstant(source, 'SAMPLE', [{ id: '1' }]);
  assert.ok(replaced.includes('function keep(){return 2;}'));
  new vm.Script(replaced);
  const staged = web.stageFiles(root, output, local);
  const context = vm.createContext({ console });
  for (const name of ['data_real_genshin.js', 'assets/data/simulator-original.js', 'data_builds.js', 'farming_engine.js', 'i18n_dictionary.js']) vm.runInContext(staged.files[name], context);
  assert.equal(vm.runInContext('REAL_CHARACTERS_DB.length', context), local.characters.length);
  assert.equal(vm.runInContext('REAL_WEAPONS_DB.length', context), local.weapons.length);
  assert.equal(vm.runInContext('REAL_CHARACTERS_DB.find(x=>x.id==="10000143").talents[2].costs[10].costItems[104319]', context), 1);

  const asc = Object.fromEntries([1, 2, 3, 4, 5, 6].map(level => [level, { promoteLevel: level, coinCost: level * 10000, costItems: { 101277: level } }]));
  const talentPromotes = Object.fromEntries([2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => [level, { level, coinCost: level * 1000, costItems: { 104371: level } }]));
  const yatta = { id: '10000999', name: 'Preload Test', rank: 5, element: 'Electric', weaponType: 'WEAPON_CATALYST', region: 'SNEZHNAYA', icon: 'UI_AvatarIcon_Test', specialProp: 'FIGHT_PROP_CRITICAL',
    upgrade: { prop: [{ propType: 'FIGHT_PROP_BASE_HP', initValue: 1000, type: 'HP' }, { propType: 'FIGHT_PROP_BASE_ATTACK', initValue: 20, type: 'ATK' }, { propType: 'FIGHT_PROP_BASE_DEFENSE', initValue: 60, type: 'DEF' }], promote: asc },
    talent: Object.fromEntries([0, 1, 2].map(type => [type, { type, name: `Talento ${type}`, icon: 'Skill_Test', promote: talentPromotes }])),
    constellation: { 1: { name: 'c1', description: '' }, 2: { name: 'c2', description: '' }, 3: { name: 'c3', description: '', extraData: { addTalentExtraLevel: { talentIndex: 2, extraLevel: 3 } } } } };
  yatta.upgrade.promote[6].addProps = { FIGHT_PROP_BASE_HP: 100, FIGHT_PROP_BASE_ATTACK: 10, FIGHT_PROP_BASE_DEFENSE: 5, FIGHT_PROP_CRITICAL: 0.192 };
  const converted = preload.fromCharacter(yatta, '7.2');
  const missingMora = preload.costsFromPromotes({ 1: { promoteLevel: 1, costItems: { 101277: 3 } } }, 'ascend', 'promoteLevel');
  assert.equal(missingMora.ascend1[0].id, 202);
  assert.equal(missingMora.ascend1[0].count, undefined, 'Conservar IDs aun cuando falte una cantidad en la fuente');
  assert.equal(preload.costsConflict({ ascend1: [{ id: 202, count: 20000 }] }, { ascend1: [{ id: 202 }] }), false, 'Un dato ausente no es una cantidad contradictoria');
  assert.equal(preload.costsConflict({ ascend1: [{ id: 202, count: 20000 }] }, { ascend1: [{ id: 202, count: 25000 }] }), true);
  assert.equal(preload.costsConflict({ ascend1: [{ id: 101277, count: 3 }] }, { ascend1: [{ id: 101278, count: 3 }] }), true, 'IDs de materiales distintos si son un conflicto');
  assert.equal(converted.character.version, '7.2');
  assert.equal(converted.character.costs.ascend6[1].count, 6);
  assert.equal(converted.talents.combat3.name, 'Talento 2');
  assert.equal(converted.constellations.c3._talentIndex, 1);
  assert.deepEqual(preload.stats90(yatta, { 90: { HP: 10, ATK: 10, DEF: 10 } }, true), { 90: { level: 90, ascension: 6, hp: 10100, attack: 210, defense: 605, specialized: 0.192 } });
  assert.equal(preload.stats90(yatta, {}, true), null);
  const secondary = { source: pipeline.API, schemaVersion: 1, requestedVersion: '7.2', datasets: {}, stats: {}, requests: [] };
  const fakeRequest = async url => {
    const route = url.slice(preload.BASE.length);
    if (route === 'static/version') return { data: { version: '7.1.0' } };
    if (route === 'static/changelog') return { data: { 1: { version: '7.2.0', beta: true, items: { avatar: [yatta.id] } }, 2: { version: '7.3.0', beta: true, items: { avatar: ['111'] } } } };
    if (route === 'en/avatar') return { data: { items: { [yatta.id]: { id: yatta.id, name: yatta.name, beta: true }, 111: { id: 111, name: 'Otra version', beta: true } } } };
    if (route === 'en/weapon') return { data: { items: {} } };
    if (route === `en/avatar/${yatta.id}` || route === `es/avatar/${yatta.id}`) return { data: yatta };
    if (route === 'static/avatarCurve') return { data: { 90: { HP: 10, ATK: 10, DEF: 10 } } };
    if (/\/material\//.test(route)) return { data: { name: 'Material', rank: 2, icon: 'UI_ItemIcon_Test', source: [] } };
    throw Error(`Ruta no esperada: ${route}`);
  };
  await preload.collect(secondary, { expectedCharacters: ['Preload Test'] }, local, { version: '7.2', languages: ['es', 'en'], timeout: 1000 }, fakeRequest, undefined, () => {});
  assert.equal(secondary.datasets['characters/es'][0].id, 10000999, 'Recuperar personaje esperado aunque no este en genshin-db');
  assert.ok(!secondary.datasets['characters/es'].some(item => item.id === 111), 'No incorporar beta de otra version');
  assert.equal(secondary.stats['characters/10000999']['90'].attack, 210);
  assert.equal(secondary.preloadSources.versionEvidence, 'versioned-changelog');
  assert.deepEqual(secondary.preloadSources.targetIds.characters, [yatta.id]);
  const actual72 = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/version72-preload.json'), 'utf8'));
  // La fixture principal aporta materiales anteriores; las fichas 7.2 vienen del cache Yatta real.
  actual72.datasets = structuredClone(snapshot.datasets);
  actual72.requests.push({ key: 'stats/weapons/14525', status: 'error', required: true, error: 'HTTP 404 Not Found' });
  const date72 = actual72.collectedAt;
  await preload.replay(actual72, { expectedCharacters: ['Mitya', 'Valeriy'] }, local, { version: '7.2', languages: ['es', 'en', 'pt', 'ja', 'ko'], timeout: 1000, retries: 0 }, () => {});
  assert.equal(actual72.collectedAt, date72, 'No renovar la fecha de datos guardados');
  assert.deepEqual(actual72.preloadSources.conversionErrors, []);
  assert.equal(actual72.requests.find(item => item.key === 'stats/weapons/14525').required, false, 'Recuperar el 404 con curvas guardadas');
  const actualReport72 = pipeline.createReport(actual72, local, { expectedCharacters: ['Mitya', 'Valeriy'] });
  const actualOutput72 = web.compile(actual72, actualReport72, local);
  assert.equal(actualOutput72.characters.length, 2);
  assert.equal(actualOutput72.weapons.length, 1);
  assert.equal(actualOutput72.weapons[0].type, 'Catalyst');
  assert.ok(actualOutput72.coverage.every(row => row.catalog === 'converted' && row.translations === 'complete' && row.farming === 'resolved'));
  assert.deepEqual(actualOutput72.characters[0].talents.map(item => item.name), ['Reacción en cadena', 'Estipulación: Detección de variables', 'Análisis: Teorema del gradiente']);
  assert.deepEqual(actualOutput72.talentBoosts.Mitya, { C3: 1, C5: 0 });
  assert.deepEqual(actualOutput72.talentBoosts.Valeri, { C3: 0, C5: 1 });
  assert.equal(actualOutput72.baseStats['10000136'].hp90, 11634);
  assert.equal(actualOutput72.baseStats['10000137'].atk90, 255);
  assert.ok(Math.abs(actual72.stats['weapons/14525']['90'].attack - 541.829758) < 0.000001);
  assert.ok(actualOutput72.blockers.every(reason => reason.includes('Build pendiente')), 'Solo deben quedar las builds pendientes');
  assert.equal(actualOutput72.dataStatus, 'prepared-for-local-review');
  assert.equal(actualOutput72.buildStatus, 'pending');
  assert.equal(actualOutput72.talentsData['10000137'].normal.native.parameters.param7[0], 0.2432);
  assert.equal(actualOutput72.talentsData['10000137'].normal.native.parameters.param7[9], 0.43776, 'El bono de Valeri aumenta con el talento de ataque normal');
  const builds72 = JSON.parse(fs.readFileSync(path.join(__dirname, '../01_Actualizaciones/versiones/7.2.builds.json'), 'utf8'));
  const reviewed72 = web.compile(actual72, actualReport72, local, builds72);
  assert.deepEqual(reviewed72.blockers, []);
  assert.equal(reviewed72.builds.length, 2);
  const staged72 = web.stageFiles(path.join(__dirname, '..'), reviewed72, local);
  const simulator72 = JSON.parse(staged72.files['assets/data/simulator-original.json']);
  for (const [id, key] of [['10000136', 'mitya'], ['10000137', 'valeriy']]) {
    assert.equal(simulator72.characters[key].sourceKey, id);
    assert.deepEqual(simulator72.characters[key].talentsData, reviewed72.talentsData[id]);
  }
  const wrongPath72 = structuredClone(builds72);
  wrongPath72.entries[0].source.url = 'https://mobalytics.gg/other-game/guide';
  assert.ok(web.compile(actual72, actualReport72, local, wrongPath72).blockers.some(text => text.includes('fuente especializada')));
  const boss72 = actualOutput72.domains.find(row => row.matIds.includes('113093'));
  assert.equal(boss72.name, 'Anclamareas');
  assert.equal(boss72.resinCost, 40);
  const iconAliases = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/material-icon-aliases.json'), 'utf8'));
  assert.equal(actual72.preloadSources.raw['es/material/220141'].icon, iconAliases['220141'].filename, 'Verificar alias de imagen contra la respuesta real del juego');
  console.log('PASS: fixture real 7.1, conversion a formato web, cantidades independientes, cinco idiomas, fuentes, IDs estables, estadisticas y fuente secundaria de predescarga.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
