const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const pipeline = require('../01_Actualizaciones/version-pipeline.cjs');
const buildSources = require('../01_Actualizaciones/build-sources.cjs');

const local = {
  characters: [{ id: '1', name: 'Bárbara' }], weapons: [{ id: '10', name: 'Arma existente' }],
  materials: [{ id: '202', name: 'Mora' }], builds: [], domains: [], bosses: []
};

function fixture() {
  const snapshot = { schemaVersion: 1, requestedVersion: '7.2', source: pipeline.API, collectedAt: '2026-11-02T00:00:00.000Z', datasets: {}, stats: {}, requests: [] };
  for (const lang of Object.keys(pipeline.LANGUAGES)) {
    snapshot.datasets[`characters/${lang}`] = [{ id: 1, name: 'Barbara' }, { id: 2, name: 'Mitya', costs: { ascend1: [{ id: 101, count: 3 }] } }];
    snapshot.datasets[`weapons/${lang}`] = [{ id: 10, name: 'Arma existente' }, { id: 11, name: 'Arma nueva' }];
    snapshot.datasets[`materials/${lang}`] = [{ id: 202, name: 'Mora' }, { id: 101, name: 'Flor' }];
    snapshot.datasets[`talents/${lang}`] = [{ id: 2, name: 'Mitya', costs: { lvl2: [{ id: 202, count: 12500 }] } }];
    snapshot.datasets[`constellations/${lang}`] = [{ id: 2, name: 'Mitya', c3: { description: 'Sube habilidad' } }];
    snapshot.requests.push({ key: `characters/${lang}`, status: 'ok', url: 'https://example.invalid' });
  }
  return snapshot;
}

async function main() {
  assert.throws(() => pipeline.parseArgs(['--version', '../7.2']), /version valida/);
  assert.throws(() => pipeline.parseArgs(['--version', '7.2', '--languages', 'en']), /Incluye es/);
  assert.throws(() => pipeline.parseArgs(['--version', '7.2', '--unknown', 'x']), /Argumento invalido/);
  assert.deepEqual(pipeline.parseArgs(['--version', '8.0']).languages, ['es', 'en', 'pt', 'ja', 'ko']);
  for (const value of [[], ['Mitya'], { error: 'bad' }, [{ name: 'Mitya', id: 1 }, { name: 'Otro', id: 1 }]]) assert.throws(() => pipeline.validateDataset(value));
  assert.equal(pipeline.validateDataset([{ id: 1, name: 'Mitya' }]).length, 1);

  const compared = pipeline.compare([{ id: 1, name: 'Barbara' }, { id: 2, name: 'Bárbara' }, { id: 3, name: 'Mitya' }], local.characters);
  assert.deepEqual(compared.map(item => item.status), ['present-id', 'review-name-match', 'candidate']);
  const snapshot = fixture();
  const manifest = { expectedCharacters: ['Mitya', 'Valeriy'], manualChecks: ['Revisar mecanica'] };
  const report = pipeline.createReport(snapshot, local, manifest);
  assert.deepEqual(report.expected.map(item => item.status), ['available-in-source', 'pending-in-source']);
  const mitya = report.dossiers.find(item => item.name === 'Mitya');
  assert.equal(mitya.integration.build, 'pending');
  assert.deepEqual(mitya.materials.map(item => item.id).sort(), [101, 202]);
  assert.deepEqual(mitya.integration.missingLanguages, []);
  assert.equal(mitya.related.constellations.es.c3.description, 'Sube habilidad');
  assert.match(pipeline.markdown(report, snapshot), /pendiente en la fuente/);
  assert.equal(report.changes, null);
  const versionFixture = fixture();
  for (const lang of Object.keys(pipeline.LANGUAGES)) {
    versionFixture.datasets[`characters/${lang}`][0].version = '1.0';
    versionFixture.datasets[`characters/${lang}`][1].version = '7.2';
    versionFixture.datasets[`characters/${lang}`].push({ id: 5, name: 'Personaje antiguo faltante', version: '1.0' });
    versionFixture.datasets[`characters/${lang}`].push({ id: 6, name: 'Personaje actual existente', version: '7.2' });
  }
  versionFixture.datasets['characters/ja'][1].name = 'ミチャ';
  versionFixture.datasets['talents/ja'] = [{ id: 200, name: 'アイノ', costs: { lvl2: [{ id: 999999, count: 3 }] } }, { id: 201, name: 'ミチャ' }];
  versionFixture.datasets['characters/ko'][1].name = '미탸';
  versionFixture.datasets['talents/ko'] = [{ id: 200, name: '아이노' }, { id: 201, name: '미탸' }];
  const versionLocal = structuredClone(local);
  versionLocal.characters.push({ id: '6', name: 'Personaje actual existente' });
  const versionReport = pipeline.createReport(versionFixture, versionLocal, {});
  assert.equal(versionReport.versionScope.characters.length, 2);
  assert.ok(versionReport.dossiers.some(item => item.id === 6), 'Crear expediente aunque ya exista en local');
  assert.ok(!versionReport.dossiers.some(item => item.id === 5), 'No confundir personajes antiguos faltantes con novedades');
  const localized = versionReport.dossiers.find(item => item.id === 2);
  assert.equal(localized.related.talents.ja.id, 201, 'No confundir nombres japoneses');
  assert.equal(localized.related.talents.ko.id, 201, 'No confundir nombres coreanos');
  assert.ok(!localized.materials.some(item => item.id === 999999));
  assert.equal(report.buildResearch.characters[0].status, 'pending-specialist-guide');
  const indexHtml = '<html>KQM<a href="/q/mitya-quickguide/">Mitya</a><a href="/mitya/">Mitya guide</a><a href="https://example.com/valeriy/">Fake</a><a href="/notmitya/">Other</a></html>';
  const discovered = buildSources.discoverGuides(indexHtml, ['Mitya', 'Valeriy']);
  assert.equal(discovered[0].guides.length, 2);
  assert.equal(discovered[1].guides.length, 0);
  assert.equal(discovered[0].guides[0].guideVersion, null);
  const guideSnapshot = fixture();
  await buildSources.collectGuides(guideSnapshot, ['Mitya', 'Valeriy'], { timeout: 1000 }, async () => ({ ok: true, text: async () => indexHtml }), () => {});
  assert.equal(buildSources.research(guideSnapshot, ['Mitya']).characters[0].status, 'guide-links-found-review-required');
  assert.match(pipeline.markdown(pipeline.createReport(guideSnapshot, local, manifest), guideSnapshot), /https:\/\/keqingmains.com\/q\/mitya-quickguide\//);
  const failedGuideSnapshot = fixture();
  await buildSources.collectGuides(failedGuideSnapshot, ['Mitya'], { timeout: 1000 }, async () => { throw Error('Sin conexion'); }, () => {});
  assert.equal(failedGuideSnapshot.buildGuideIndex.status, 'error');
  assert.equal(pipeline.createReport(failedGuideSnapshot, local, manifest).incomplete, true);
  const missingMaterial = fixture();
  missingMaterial.datasets['talents/es'][0].costs.lvl3 = [{ id: 999999, count: 2 }];
  assert.deepEqual(pipeline.createReport(missingMaterial, local, manifest).dossiers.find(item => item.name === 'Mitya').integration.missingMaterialIds, ['999999']);

  const reordered = fixture();
  reordered.datasets['characters/es'][0] = { name: 'Barbara', id: 1 };
  assert.equal(pipeline.changesSince(reordered, snapshot)['characters/es'].changed.length, 0, 'El orden de propiedades no cambia los datos');

  const changed = structuredClone(snapshot);
  changed.datasets['characters/es'][1].costs.ascend1[0].count = 5;
  changed.datasets['weapons/es'].pop();
  changed.datasets['materials/es'].push({ id: 102, name: 'Material nuevo' });
  const delta = pipeline.changesSince(changed, snapshot);
  assert.equal(delta['characters/es'].changed[0].name, 'Mitya');
  assert.equal(delta['weapons/es'].absent.length, 1);
  assert.equal(delta['materials/es'].added.length, 1);
  changed.source = 'otra-fuente';
  assert.equal(pipeline.changesSince(changed, snapshot), null);

  const options = { version: '7.2', languages: ['es'], timeout: 1000, retries: 0 };
  let attempts = 0;
  await assert.rejects(pipeline.requestJson('https://example.invalid', options, async () => {
    attempts++; throw new Error('fetch failed', { cause: Error('getaddrinfo ENOTFOUND example.invalid') });
  }), /ENOTFOUND/);
  assert.equal(attempts, 1);
  attempts = 0;
  await assert.rejects(pipeline.requestJson('https://example.invalid', { ...options, retries: 3 }, async () => {
    attempts++; return { ok: false, status: 404, statusText: 'Not Found' };
  }), /HTTP 404/);
  assert.equal(attempts, 1, 'No repetir errores permanentes');
  attempts = 0;
  const retry = await pipeline.requestJson('https://example.invalid', { ...options, retries: 1 }, async () => {
    attempts++;
    return attempts === 1 ? { ok: false, status: 503, statusText: 'Unavailable' } : { ok: true, json: async () => ({ recovered: true }) };
  });
  assert.equal(retry.recovered, true);
  assert.equal(attempts, 2);

  const collected = await pipeline.collect(options, async url => {
    if (url.includes('/materials?')) return { ok: true, json: async () => [] };
    return { ok: true, json: async () => [{ id: 1, name: 'Registro' }] };
  }, () => {});
  assert.equal(collected.requests.length, 8);
  assert.equal(Object.keys(collected.datasets).length, 7);
  assert.match(collected.requests.find(item => item.key === 'materials/es').error, /Respuesta inesperada/);
  assert.equal(pipeline.createReport(collected, local, manifest).incomplete, true);

  const partial = fixture();
  delete partial.datasets['characters/ja'];
  const partialReport = pipeline.createReport(partial, local, manifest);
  assert.deepEqual(partialReport.dossiers.find(item => item.name === 'Mitya').integration.missingLanguages, ['ja']);
  await pipeline.collectStats(partial, partialReport, options, async () => ({ ok: true, json: async () => ({ 90: { hp: 10000, attack: 200, defense: 600 } }) }), () => {});
  assert.equal(partial.stats['characters/2']['90'].hp, 10000);
  const badStats = fixture();
  await pipeline.collectStats(badStats, report, options, async () => ({ ok: true, json: async () => ({ error: 'No data' }) }), () => {});
  assert.ok(badStats.requests.some(item => item.status === 'error'));
  assert.equal(Object.keys(badStats.stats).length, 0);

  assert.throws(() => pipeline.validateSnapshot(snapshot, '7.3'), /Snapshot incompatible/);
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'spirifly-version-test-'));
  const input = path.join(temporary, 'fixture.json');
  fs.writeFileSync(input, JSON.stringify(snapshot), { flag: 'wx' });
  const root = path.resolve(__dirname, '..');
  const protectedFiles = ['data_real_genshin.js', 'data_builds.js', 'app.js', 'farming_engine.js'];
  const before = protectedFiles.map(file => fs.readFileSync(path.join(root, file)));
  for (let i = 0; i < 2; i++) {
    const result = spawnSync(process.execPath, [path.join(root, '01_Actualizaciones/version-pipeline.cjs'), '--version', '7.2', '--from', input, '--output', temporary], { encoding: 'utf8', timeout: 20000, cwd: os.tmpdir() });
    assert.equal(result.status, 2, result.stderr || result.stdout);
  }
  const runs = fs.readdirSync(temporary, { withFileTypes: true }).filter(entry => entry.isDirectory());
  assert.equal(runs.length, 2, 'Preservar resultados anteriores');
  for (const run of runs) {
    const saved = JSON.parse(fs.readFileSync(path.join(temporary, run.name, 'snapshot.json'), 'utf8'));
    assert.equal(saved.collectedAt, snapshot.collectedAt, 'Conservar antiguedad en modo offline');
    assert.ok(fs.statSync(path.join(temporary, run.name, 'LEER_PRIMERO.md')).size > 0);
  }
  protectedFiles.forEach((file, index) => assert.deepEqual(fs.readFileSync(path.join(root, file)), before[index], `No modificar ${file}`));
  console.log('PASS: recoleccion por version, cinco idiomas, IDs/alias, costes, estadisticas, cambios, errores/reintentos, modo offline y conservacion de archivos.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
