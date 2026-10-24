const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const context = vm.createContext({ state: {lang:'es'}, escapeHtml: value => String(value) });
for (const file of ['assets/data/simulator-original.js','data_builds.js']) vm.runInContext(fs.readFileSync(file,'utf8'),context);
const app = fs.readFileSync('app.js','utf8');
vm.runInContext(app.slice(app.indexOf('const BASE_STATS_I18N'),app.indexOf('function renderTheorycraft()')),context);
vm.runInContext(`
for (const build of CHARACTER_BUILDS_DB) {
 for (const key of ['hp90','atk90','def90']) {
  if (!Number.isFinite(build.baseStats[key]) || build.baseStats[key] <= 0) throw Error(build.id + ': base inválida ' + key);
 }
 for (const lang of ['es','en','pt','ja','ko']) {
  state.lang = lang;
  const html = renderOriginalBuildFacts(build);
  if (/undefined|NaN|FIGHT_PROP|tc-original-level|<table/.test(html)) throw Error(build.id + ': presentación inválida en ' + lang);
 }
}
`,context);
assert.ok(app.includes('${ch.baseStats ? `<details class="tc-original-facts">'));
assert.ok(!app.includes('estadísticas base y talentos'));
assert.ok(!app.includes('tc-original-level'));
console.log('PASS: 127 fichas con Vida, ATQ, DEF y ascensión; cinco idiomas y sin tablas de talentos.');
