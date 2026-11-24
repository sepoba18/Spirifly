const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({console, state: {activeWishUid: '600000001'}});
vm.runInContext(fs.readFileSync(path.join(root, 'data_real_genshin.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(root, 'farming_engine.js'), 'utf8'), context);
const audit = vm.runInContext('({domains: FARMING_DOMAINS_REGISTRY.filter(d => d.type === "weapon"), materials: Object.values(REAL_MASTER_MATERIALS).filter(m => m.id.startsWith("114"))})', context);
assert.ok(audit.domains.length >= 24, 'Conservar las 24 familias verificadas y admitir nuevas');
assert.ok(audit.materials.length >= 96, 'Conservar los 96 materiales verificados y admitir nuevos');
for (const material of audit.materials) {
  const matches = audit.domains.filter(d => d.matIds.includes(material.id));
  assert.equal(matches.length, 1, material.id);
  if (Number(material.id) <= 114096) {
    const group = Math.floor((Number(material.id) - 114001) / 4) % 3 + 1;
    assert.deepEqual(Array.from(matches[0].days), [group, group + 3, 0], material.id);
  } else {
    const days = Array.from(matches[0].days);
    assert.ok(days.length && days.includes(0), material.id + ': domingo disponible');
    assert.equal(new Set(days).size, days.length, material.id + ': dias sin duplicados');
    assert.ok(days.every(day => Number.isInteger(day) && day >= 0 && day <= 6), material.id + ': dias validos');
  }
}
for (const [uid, reset] of [['600000001','09:00:00'], ['700000001','03:00:00'], ['800000001','20:00:00'], ['900000001','20:00:00'], ['1800000001','20:00:00']]) {
  context.state.activeWishUid = uid;
  const timestamp = Date.parse('2026-10-23T' + reset + 'Z');
  const day = reset === '20:00:00' ? 6 : 5;
  assert.equal(context.getActiveServerDay(new Date(timestamp - 1)), day - 1, uid + ' antes');
  assert.equal(context.getActiveServerDay(new Date(timestamp)), day, uid + ' después');
}
context.AccountManager = {getActiveAccountId: () => 'main', getAccountUid: () => '700000001'};
context.state.activeWishUid = '600000001';
assert.equal(context.getActiveServerDay(new Date('2026-10-23T04:00:00Z')), 5);
delete context.AccountManager;
context.state.activeWishUid = '';
const now = new Date('2026-10-23T00:00:00Z');
assert.equal(context.getActiveServerDay(now), now.getDay());
console.log(`OK: ${audit.materials.length} materiales, ${audit.domains.length} familias y reinicio de todos los servidores.`);

// Pausar conserva el avatar y las metas, pero excluye sus materiales.
context.state.activePlans = [{kind:'character',key:'Amber',active:false,target:90}, {kind:'character',key:'Lisa',target:80}];
context.state.realOwned = {};
context.computePlanRequirements = p => ({'202': p.key === 'Amber' ? 60000 : 120000});
let result = vm.runInContext('FarmingEngine.getSeelieFarmingData("all")', context);
assert.equal(result.activeCharList.length, 2);
assert.equal(result.activeCharList[0].active, false);
assert.equal(result.totals.totalResin, 40);
context.state.activePlans[0].active = true;
result = vm.runInContext('FarmingEngine.getSeelieFarmingData("all")', context);
assert.equal(result.totals.totalResin, 60);
assert.equal(context.state.activePlans[0].target, 90);
// El gesto guarda sin eliminar y permite reactivar el mismo plan.
const listeners = {};
const chip = {dataset:{avatarKey:'Amber'},addEventListener:(name,fn)=>{listeners[name]=fn;}};
const container = {innerHTML:'',querySelectorAll:()=>[chip]};
context.document = {getElementById:id=>id === 'seelieCharAvatarBar' ? container : null};
context.escapeHtml = s => s;
context.renderFarming = () => {};
let saves = 0;
context.savePlansToStorage = () => {saves++;};
const app = fs.readFileSync(path.join(root,'app.js'),'utf8');
vm.runInContext(app.slice(app.indexOf('function renderFarmingCharAvatarBar('),app.indexOf('function renderSeelieFarmingSections(')),context);
context.state.farmingCharFilter = 'Amber';
context.renderFarmingCharAvatarBar(result.activeCharList);
let prevented = 0;
listeners.contextmenu({preventDefault:()=>{prevented++;}});
assert.equal(context.state.activePlans[0].active,false);
assert.equal(context.state.farmingCharFilter,'all');
listeners.contextmenu({preventDefault:()=>{prevented++;}});
assert.equal(context.state.activePlans[0].active,true);
assert.equal(context.state.activePlans.length,2);
assert.equal(context.state.activePlans[0].target,90);
assert.equal(saves,2);
assert.equal(prevented,2);
console.log('OK: pausa, reactivación, materiales y conservación de metas.');

// El avatar del planificador comparte la pausa con Farmeo (personajes y armas).
const planner = fs.readFileSync(path.join(root,'planner_real.js'),'utf8');
vm.runInContext(planner.slice(planner.indexOf('function bindPlannerCardPause(')),context);
for (const kind of ['character','weapon']) {
  const plan = {kind,key:'test',target:90};
  context.state.activePlans = [plan];
  context.state.farmingCharFilter = 'test';
  let handler;
  const card = {addEventListener:(event,fn)=>{assert.equal(event,'contextmenu');handler=fn;}};
  context.bindPlannerCardPause(card,plan);
  const event = {preventDefault:()=>{},stopPropagation:()=>{}};
  handler(event);
  assert.equal(plan.active,false);
  assert.equal(context.state.farmingCharFilter,'all');
  handler(event);
  assert.equal(plan.active,true);
  assert.equal(plan.target,90);
  assert.equal(context.state.activePlans.length,1);
}
console.log('OK: pausa en avatares de personajes y armas del planificador.');

// Paso 3: Filtrado de materiales completados (conservando familias multi-tier incompletas) y formato de Mora.
context.state.activePlans = [{kind:'character', key:'Amber', target:90}];
context.state.realOwned = {
  '202': 10057755,
  '104319': 3,
  '112002': 36,
  '112003': 96,
  '112004': 50,
  '113060': 6,
  '113061': 2
};
const filteredOut = vm.runInContext(`FarmingEngine.getSeelieFarmingData("all", {
  "202": 10057755,
  "104319": 2,
  "112002": 36,
  "112003": 96,
  "112004": 129,
  "113060": 6,
  "113061": 6
})`, context);
const allVisibleCards = filteredOut.sections.flatMap(s => s.cards);
assert.equal(allVisibleCards.some(c => c.id === 'leyline_mora'), false, 'Mora completada debe ocultarse');
assert.equal(allVisibleCards.some(c => c.id === 'special_crown'), false, 'Corona completada debe ocultarse');
const slimeCard = allVisibleCards.find(c => c.id === 'elite_112002');
assert.ok(slimeCard, 'Familia de 3 con un tier faltante debe seguir visible');
assert.equal(slimeCard.items.length, 3, 'La familia de 3 conserva sus 3 ítems mientras falte uno');
assert.equal(slimeCard.items.filter(it => it.deficit === 0).length, 2);
assert.equal(slimeCard.items.find(it => it.id === '112004').deficit, 79);
const weeklyCard = allVisibleCards.find(c => c.tagType === 'weekly');
assert.ok(weeklyCard, 'Jefe semanal con un drop faltante permanece visible');
assert.deepEqual(Array.from(weeklyCard.items.map(it => it.id)), ['113061'], 'Jefe semanal oculta drops individuales completados');

// Al completar el último tier faltante de la familia de 3, la tarjeta completa desaparece.
context.state.realOwned['112004'] = 129;
const completedSlime = vm.runInContext(`FarmingEngine.getSeelieFarmingData("all", {
  "202": 10057755,
  "104319": 2,
  "112002": 36,
  "112003": 96,
  "112004": 129
})`, context);
assert.equal(completedSlime.sections.flatMap(s => s.cards).length, 0, 'Todas las tarjetas completas deben ocultarse');

vm.runInContext(app.slice(app.indexOf('function formatFarmingBadgeCount('), app.indexOf('function renderSeelieSourceCard(')), context);
assert.equal(context.formatFarmingBadgeCount(10057755, true), '10.1M');
assert.equal(context.formatFarmingBadgeCount(2450000, true), '2.45M');
assert.equal(context.formatFarmingBadgeCount(850000, true), '850k');
assert.equal(context.formatFarmingBadgeCount(452, false), 'x452');
console.log('OK: ocultamiento de completados, preservación de familias multi-tier y formato compacto de Mora.');

// Paso 4: Síntesis 3:1 en cascada entre Inventario y Farmeo (gemas, libros, armas y enemigos).
// Caso exacto reportado: Cryo (500/15/0/0 vs req 1/9/9/6) y Electro (1254/403/1/0 vs req 1/9/9/6) -> 0 déficit en Farmeo.
context.state.activePlans = [{kind:'character', key:'Amber', active:true, target:90}];
context.state.realOwned = {
  '104161': 500, '104162': 15, '104163': 0, '104164': 0,
  '104141': 1254, '104142': 403, '104143': 1, '104144': 0
};
const fullSynthGems = vm.runInContext(`FarmingEngine.getSeelieFarmingData("all", {
  "104161": 1, "104162": 9, "104163": 9, "104164": 6,
  "104141": 1, "104142": 9, "104143": 9, "104144": 6
})`, context);
assert.equal(fullSynthGems.sections.flatMap(s => s.cards).length, 0, 'Gemas completables por síntesis deben ocultarse en Farmeo');
assert.equal(fullSynthGems.totals.totalResin, 0, 'Resina total debe ser 0 cuando la síntesis cubre todo');

// Caso solo tiers altos requeridos (sin req en T1/T2) usando stock de T1/T2 en inventario.
context.state.realOwned = {'104161': 81, '104162': 0, '104163': 0, '104164': 0};
const highTierOnly = vm.runInContext(`FarmingEngine.getSeelieFarmingData("all", {"104163": 3, "104164": 2})`, context);
assert.equal(highTierOnly.sections.flatMap(s => s.cards).length, 0, '81 verdes cubren 3 moradas + 2 doradas por cascada');

// Caso síntesis parcial: 18 azules (req 9 -> 9 excedentes -> 3 moradas), faltan 6 moradas y 6 doradas.
context.state.realOwned = {'104161': 1, '104162': 18, '104163': 0, '104164': 0};
const partialSynth = vm.runInContext(`FarmingEngine.getSeelieFarmingData("all", {
  "104161": 1, "104162": 9, "104163": 9, "104164": 6
})`, context);
const cryoCard = partialSynth.sections.flatMap(s => s.cards).find(c => c.id === 'boss_gem_10416');
assert.ok(cryoCard, 'Tarjeta permanece en Farmeo si aún faltan gemas tras sintetizar');
assert.equal(cryoCard.items.find(it => it.id === '104163').deficit, 6, 'Déficit morado debe descontar las 3 sintetizables');
assert.equal(cryoCard.items.find(it => it.id === '104164').deficit, 6, 'Déficit dorado permanece en 6');

// No se sintetiza hacia abajo: sobrar en T3 no cubre déficit de T1.
context.state.realOwned = {'104161': 0, '104163': 20};
const noDowngrade = vm.runInContext(`FarmingEngine.getSeelieFarmingData("all", {"104161": 1, "104163": 1})`, context);
const noDowngradeCard = noDowngrade.sections.flatMap(s => s.cards).find(c => c.id === 'boss_gem_10416');
assert.ok(noDowngradeCard);
assert.equal(noDowngradeCard.items.find(it => it.id === '104161').deficit, 1);
assert.equal(noDowngradeCard.items.find(it => it.id === '104163').deficit, 0);

// Diamantes brillantes del Viajero (104101-104104) NO son sintetizables.
context.state.realOwned = {'104101': 99, '104102': 0};
const nonCraftableDiamonds = vm.runInContext(`FarmingEngine.getSeelieFarmingData("all", {"104102": 3})`, context);
const diamondCard = nonCraftableDiamonds.sections.flatMap(s => s.cards).find(c => c.id === 'adventure_rank_diamond');
assert.ok(diamondCard);
assert.equal(diamondCard.items.find(it => it.id === '104102').deficit, 3, 'Diamantes del Viajero no deben sintetizarse');

// getDomainsForDay también respeta la síntesis en libros de talento.
context.state.activePlans = [{kind:'character', key:'Amber', active:true}];
context.state.realOwned = {'104301': 27, '104302': 0, '104303': 0};
const prevCompute = context.computePlanRequirements;
context.computePlanRequirements = () => ({'104303': 3});
const domLiberty = vm.runInContext('FarmingEngine.getDomainsForDay(1, "all").find(d => d.id === "mond_talent_freedom")', context);
assert.equal(domLiberty.isPriority, false, 'Dominio cubierto por síntesis no debe marcarse como faltante');
assert.equal(domLiberty.totalDeficit, 0);
context.computePlanRequirements = prevCompute;

// Inventario: createInventoryTile marca craft-complete / craft-ok cuando la síntesis cubre la meta.
const invCtx = vm.createContext({
  console,
  escapeHtml: s => String(s),
  getRealOwned: id => invCtx.state.realOwned[id] || 0,
  saveRealOwned: () => {},
  renderCharacterWeaponPlanner: () => {},
  document: {
    createElement: () => ({
      className: '',
      dataset: {},
      title: '',
      innerHTML: '',
      querySelector: () => ({addEventListener: () => {}}),
      querySelectorAll: () => []
    })
  },
  state: {
    realOwned: {'104161': 500, '104162': 15, '104163': 0, '104164': 0}
  }
});
vm.runInContext(fs.readFileSync(path.join(root, 'data_real_genshin.js'), 'utf8'), invCtx);
vm.runInContext(app.slice(app.indexOf('const SEELIE_ORDER_112'), app.indexOf('const IS_ADMIN_VIEW')), invCtx);
vm.runInContext(app.slice(app.indexOf('function getSafeCraftableCount('), app.indexOf('function synthesizeSingleItem(')), invCtx);
vm.runInContext(app.slice(app.indexOf('function createInventoryTile('), app.indexOf('function updateOnlyNeededButton(')), invCtx);
const cryoReqMap = {'104161': 1, '104162': 9, '104163': 9, '104164': 6};
const cryoPurpleItem = vm.runInContext('REAL_INVENTORY_ITEMS.find(x => x.id === "104163")', invCtx);
const cryoOrangeItem = vm.runInContext('REAL_INVENTORY_ITEMS.find(x => x.id === "104164")', invCtx);
const purpleTile = invCtx.createInventoryTile(cryoPurpleItem, cryoReqMap, {}, {gem: 'Gemas'});
const orangeTile = invCtx.createInventoryTile(cryoOrangeItem, cryoReqMap, {}, {gem: 'Gemas'});
assert.ok(purpleTile.className.includes('craft-complete'), 'Gema morada completable por síntesis debe marcarse craft-complete');
assert.ok(purpleTile.innerHTML.includes('craft-ok'), 'Estado de gema morada debe ser craft-ok');
assert.ok(purpleTile.innerHTML.includes('+57'), 'Botón de síntesis debe seguir mostrando +57');
assert.ok(orangeTile.className.includes('craft-complete'), 'Gema dorada completable por síntesis debe marcarse craft-complete');
assert.ok(orangeTile.innerHTML.includes('+16'), 'Botón de síntesis debe seguir mostrando +16');

// Si falta incluso sintetizando, debe permanecer en estado needed / has-target (no craft-complete).
invCtx.state.realOwned = {'104161': 1, '104162': 18, '104163': 0, '104164': 0};
const partialPurpleTile = invCtx.createInventoryTile(cryoPurpleItem, cryoReqMap, {}, {gem: 'Gemas'});
assert.ok(!partialPurpleTile.className.includes('craft-complete'), 'Síntesis insuficiente no debe marcarse craft-complete');
assert.ok(partialPurpleTile.innerHTML.includes('has-target'), 'Síntesis insuficiente debe mantener estado pendiente');
assert.ok(partialPurpleTile.innerHTML.includes('+3'), 'Síntesis insuficiente muestra +3 disponibles');
console.log('OK: síntesis 3:1 en cascada consistente entre Inventario, Farmeo y Dominios.');
