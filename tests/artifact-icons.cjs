const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const context = vm.createContext({});
vm.runInContext(app.slice(app.indexOf('const ARTIFACT_SETS_ICONS'), app.indexOf('function getCharacterTeammateAvatar')), context);
const resolve = name => context.getArtifactSetIcon(name);
assert.equal(resolve('Cáscara de Sueños Opulentos (4 piezas)'), 'assets/artifacts/UI_RelicIcon_15021_4.png');
assert.equal(resolve('Husk of Opulent Dreams (4 piezas)'), resolve('Cáscara de Sueños Opulentos (4 piezas)'));
assert.equal(resolve('Silken Moon’s Serenade (4 piezas)'), resolve("Silken Moon's Serenade (4 piezas)"));
assert.equal(resolve('Furia del Trueno (2p) + Nobleza (2p)'), 'assets/artifacts/UI_RelicIcon_15005_4.png');
assert.equal(resolve('2p EM+80 + 2p Dendro+15%'), 'assets/artifacts/UI_RelicIcon_15003_4.png');
assert.equal(resolve(null), '');
assert.equal(resolve('set desconocido'), '');
assert.equal(resolve('2p Vida+20% + 2p Vida+20%'), 'assets/artifacts/UI_RelicIcon_15017_4.png');
assert.equal(resolve('2p ATQ+18% + 2p ATQ+18%'), 'assets/artifacts/UI_RelicIcon_15001_4.png');
assert.equal(resolve('2p Maestría Elemental + 2p Maestría Elemental'), 'assets/artifacts/UI_RelicIcon_15003_4.png');
vm.runInContext(fs.readFileSync(path.join(root, 'data_builds.js'), 'utf8'), context);
const sets = vm.runInContext('CHARACTER_BUILDS_DB.flatMap(build => (build.bestArtifacts || build.artifactRanking || []).map(artifact => artifact.set))', context);
for (const set of sets) assert.match(resolve(set), /^assets\/artifacts\/UI_RelicIcon_\d+_4\.png$/, set);
assert.ok(!app.includes('artifact-placeholder.svg'));
const candidates = sets.filter(set => /2\s*(?:p|piezas|pieces)/i.test(set));
for (const set of candidates) {
  const groups = context.getArtifactPieceGroups(set);
  assert.ok(groups.length > 0, set);
  if (/\s+\+\s+/.test(set)) {
    assert.equal(groups.length, 2, set);
    assert.notEqual(groups[0].id, groups[1].id, set);
  } else assert.equal(groups.length, 1, set);
}
const verifiedBonuses = JSON.parse(fs.readFileSync(path.join(root, 'tests/fixtures/artifact-two-piece-bonuses.json'), 'utf8'));
const bonusById = Object.fromEntries(Object.values(verifiedBonuses).map(item => [String(item.id), item]));
for (const entry of vm.runInContext('Object.entries(ARTIFACT_TWO_PIECE_SETS)', context)) {
  const [id, bonus] = entry;
  assert.ok(bonusById[id].effect2Pc.includes(bonus.amount), id);
}

const icons = vm.runInContext('Object.values(ARTIFACT_SETS_ICONS)', context);
for (const icon of new Set(icons)) {
  assert.match(icon, /^assets\/artifacts\/UI_RelicIcon_\d+_4\.png$/);
  const bytes = fs.readFileSync(path.join(root, icon));
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
}
assert.ok(!/class="tc-arti-img"[^>]+tab_domain/.test(app));
console.log(`PASS: ${new Set(icons).size} flores locales, alias con tildes y apóstrofos, combinaciones y respaldo sin materiales de arma.`);
