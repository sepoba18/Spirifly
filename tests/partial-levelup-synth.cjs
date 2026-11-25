const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const noop = () => {};
const ctx = vm.createContext({
  console,
  document: {
    getElementById: () => null,
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: noop
  },
  window: { addEventListener: noop, innerWidth: 1280, innerHeight: 800 },
  localStorage: { getItem: () => null, setItem: noop },
  state: {
    lang: 'es',
    activePlans: [],
    realOwned: {},
    starredChars: []
  },
  saveRealOwned: noop,
  savePlansToStorage: noop
});

for (const file of ['data_real_genshin.js', 'assets/data/traveler-planner.js', 'planner_real.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx);
}
const appCode = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
vm.runInContext(appCode.slice(appCode.indexOf('const SEELIE_ORDER_112'), appCode.indexOf('const IS_ADMIN_VIEW')), ctx);

const run = (code) => vm.runInContext(code, ctx);

// 1. Subida parcial de personaje 1 -> 70 sin estrella (idx 9) cuando objetivo es 90 (idx 13)
const furinaPlan = {
  uid: 'p1',
  kind: 'character',
  key: 'Furina',
  active: true,
  constellation: 0,
  curState: 0,
  tarState: 13,
  incLevel: true,
  talCur: [1, 1, 1],
  talTar: [1, 10, 10],
  talInc: [true, true, true],
  weaponKey: 'Fulgor de las Aguas Calmas',
  weapRefine: 1,
  weapCurState: 0,
  weapTarState: 13,
  incWeapon: true
};
ctx.state.activePlans = [furinaPlan];
ctx.p = furinaPlan;

const req70 = run('computePartialUpgradeRequirements(p, { newCurState: 9, newTalCur: [1, 1, 1], newWeapCurState: 0 })');
// Para llegar a Nv. 70 sin estrella (asc 1..4): 1 verde (104121), 9 azul (104122), 3 morado (104123), 0 dorado (104124)
assert.equal(req70['104121'], 1, 'Nv. 70 sin estrella requiere 1 esquirla Hydro');
assert.equal(req70['104122'], 9, 'Nv. 70 sin estrella requiere 9 fragmentos Hydro');
assert.equal(req70['104123'], 3, 'Nv. 70 sin estrella requiere 3 trozos Hydro');
assert.equal(req70['104124'] || 0, 0, 'Nv. 70 sin estrella NO debe requerir gemas doradas de asc 5/6');
assert.equal(req70['104338'] || 0, 0, 'Talentos sin cambios no deben consumir libros');
assert.equal(req70['114049'] || 0, 0, 'Arma sin cambios no debe consumir materiales de arma');

// 2. Síntesis automática en cascada 3:1 y prioridad sobre otro plan que comparte material
const yelanPlan = {
  uid: 'p2',
  kind: 'character',
  key: 'Yelan',
  active: true,
  constellation: 0,
  curState: 0,
  tarState: 13,
  incLevel: true,
  talCur: [1, 1, 1],
  talTar: [1, 1, 1],
  talInc: [false, false, false],
  weaponKey: 'none',
  weapCurState: 0,
  weapTarState: 0,
  incWeapon: false
};
ctx.state.activePlans = [furinaPlan, yelanPlan];
ctx.state.realOwned = {
  '202': 1000000,
  '104003': 200,
  '104002': 20,
  '104001': 20,
  '104121': 19, // 1 directo -> sobran 18 (9 para 3 azules, quedan 9 verdes)
  '104122': 12, // 9 directo -> sobran 3 (+3 de verdes = 6 -> 2 morados)
  '104123': 1   // 1 directo -> faltan 2 morados, cubiertos por síntesis
};

const planConsume = run('planInventoryConsumptionWithSynthesis(computePartialUpgradeRequirements(p, { newCurState: 9, newTalCur: [1,1,1], newWeapCurState: 0 }), state.realOwned, REAL_INVENTORY_ITEMS, getOtherPlansRequirementsMap(p))');
assert.equal(planConsume.unmetItems.filter(u => u.matId.startsWith('10412')).length, 0, 'Las gemas Hydro deben quedar 100% cubiertas por síntesis 3:1');
assert.equal(planConsume.sharedPriorityUsed, true, 'Debe detectar prioridad sobre materiales compartidos con Yelan');
assert.equal(planConsume.nextOwned['104121'], 9, 'Deben sobrar exactamente 9 esquirlas Hydro (19 - 1 - 9)');
assert.equal(planConsume.nextOwned['104122'], 0, 'Todos los fragmentos Hydro disponibles debieron consumirse/sintetizarse');
assert.equal(planConsume.nextOwned['104123'], 0, 'El trozo Hydro directo debió consumirse');
assert.ok(planConsume.synthConversions.some(c => c.fromId === '104121' && c.toId === '104122' && c.consumed === 9 && c.produced === 3));
assert.ok(planConsume.synthConversions.some(c => c.fromId === '104122' && c.toId === '104123' && c.consumed === 6 && c.produced === 2));

run('applyInventoryConsumptionPlan(planInventoryConsumptionWithSynthesis(computePartialUpgradeRequirements(p, { newCurState: 9, newTalCur: [1,1,1], newWeapCurState: 0 }), state.realOwned, REAL_INVENTORY_ITEMS, getOtherPlansRequirementsMap(p)))');
run('applyPartialPlanUpgrade(p, { newCurState: 9, newTalCur: [1,1,1], newWeapCurState: 0 })');
assert.equal(furinaPlan.curState, 9, 'Furina debe quedar en Nv. 70 sin estrella');
assert.equal(furinaPlan.tarState, 13, 'El objetivo de Furina debe mantenerse en Nv. 90');
assert.deepEqual(furinaPlan.talCur, [1, 1, 1], 'Talentos deben quedar intactos');
assert.equal(furinaPlan.weapCurState, 0, 'Arma equipada debe quedar intacta');

// 3. Subida independiente de talento y arma equipada sobre el mismo personaje
ctx.state.realOwned = {
  '202': 500000,
  '104341': 6,  // verde Justicia (necesita 3 para 1->2) -> sobran 3 -> 1 azul
  '104342': 5,  // azul Justicia (necesita 6 para 2->4: 2+4) -> falta 1 azul cubierto con 3 verdes
  '114053': 8,  // domain tier 1 arma Furina
  '114054': 0   // domain tier 2
};
const selTalWeap = { newCurState: 9, newTalCur: [1, 4, 1], newWeapCurState: 5 };
ctx.selTalWeap = selTalWeap;
const reqTalWeap = run('computePartialUpgradeRequirements(p, selTalWeap)');
assert.equal(reqTalWeap['104341'], 3);
assert.equal(reqTalWeap['104342'], 6);
assert.ok(reqTalWeap['114053'] > 0);
const consTalWeap = run('planInventoryConsumptionWithSynthesis(computePartialUpgradeRequirements(p, selTalWeap), state.realOwned, REAL_INVENTORY_ITEMS, {})');
assert.equal(consTalWeap.nextOwned['104341'], 0, '3 verdes usados directo + 3 sintetizados a azul');
assert.equal(consTalWeap.nextOwned['104342'], 0, '5 azules directos + 1 sintetizado = 6 cubiertos');
run('applyPartialPlanUpgrade(p, selTalWeap)');
assert.deepEqual(furinaPlan.talCur, [1, 4, 1], 'Solo el segundo talento debe subir a 4');
assert.equal(furinaPlan.weapCurState, 5, 'Arma equipada debe subir a Nv. 50 sin estrella');

// 4. Arma independiente
const soloWeapon = {
  uid: 'w1',
  kind: 'weapon',
  key: 'Cortador de Jade Primordial',
  weaponKey: 'Cortador de Jade Primordial',
  active: true,
  weapRefine: 1,
  curState: 0,
  tarState: 13
};
ctx.w = soloWeapon;
ctx.state.realOwned = { '114017': 14, '114018': 0 }; // 5 directos + 9 -> 3 tier2
const wReq = run('computePartialUpgradeRequirements(w, { newCurState: 5 })'); // hasta 50 sin estrella (asc 1 y 2)
assert.equal(wReq['114017'], 5);
assert.equal(wReq['114018'], 5);
const wCons = run('planInventoryConsumptionWithSynthesis(computePartialUpgradeRequirements(w, { newCurState: 5 }), state.realOwned, REAL_INVENTORY_ITEMS, {})');
assert.equal(wCons.nextOwned['114017'], 0, '5 directos + 9 sintetizados = 14');
assert.equal(wCons.nextOwned['114018'] ?? 0, 0, '3 sintetizados usados (quedan 2 faltantes sin registrar)');
assert.equal(wCons.deductions.find(d => d.matId === '114018').craftedUsed, 3, 'Debe registrar 3 sintetizados usados para tier 2');
assert.ok(wCons.unmetItems.some(u => u.matId === '114018' && u.unmet === 2));
run('applyPartialPlanUpgrade(w, { newCurState: 5 })');
assert.equal(soloWeapon.curState, 5);
assert.equal(soloWeapon.tarState, 13);

// 5. Viajero: sincroniza curState y NO sintetiza diamantes brillantes (nonCraftable)
const travPyro = { kind: 'character', key: 'Viajero', active: true, curState: 0, tarState: 13, incLevel: true, talCur: [1,1,1], talTar: [1,1,1], talInc: [false,false,false], incWeapon: false };
const travHydro = { kind: 'character', key: 'Viajero (Hydro)', active: true, curState: 0, tarState: 13, incLevel: true, talCur: [1,1,1], talTar: [1,1,1], talInc: [false,false,false], incWeapon: false };
ctx.state.activePlans = [travPyro, travHydro];
ctx.tp = travPyro;
ctx.state.realOwned = { '104101': 10, '104102': 0 };
const travCons = run('planInventoryConsumptionWithSynthesis(computePartialUpgradeRequirements(tp, { newCurState: 9, newTalCur: [1,1,1], newWeapCurState: 0 }), state.realOwned, REAL_INVENTORY_ITEMS, {})');
assert.equal(travCons.synthConversions.length, 0, 'Diamantes brillantes del Viajero no son sintetizables');
assert.equal(travCons.nextOwned['104101'], 9, 'Solo consume 1 esquirla directa, sin intentar sintetizar las 9 restantes');
run('applyPartialPlanUpgrade(tp, { newCurState: 9, newTalCur: [1,1,1], newWeapCurState: 0 })');
assert.equal(travHydro.curState, 9, 'Viajero debe sincronizar su nuevo nivel actual parcial entre variantes');

console.log('PASS: subida parcial progresiva, síntesis automática 3:1 en cascada, prioridad compartida, armas independientes y Viajero.');
