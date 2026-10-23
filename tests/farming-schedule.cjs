const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({console, state: {activeWishUid: '600000001'}});
vm.runInContext(fs.readFileSync(path.join(root, 'data_real_genshin.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(root, 'farming_engine.js'), 'utf8'), context);
const audit = vm.runInContext('({domains: FARMING_DOMAINS_REGISTRY.filter(d => d.type === "weapon"), materials: Object.values(REAL_MASTER_MATERIALS).filter(m => m.id.startsWith("114"))})', context);
assert.equal(audit.domains.length, 24);
assert.equal(audit.materials.length, 96);
for (const material of audit.materials) {
  const matches = audit.domains.filter(d => d.matIds.includes(material.id));
  assert.equal(matches.length, 1, material.id);
  const group = Math.floor((Number(material.id) - 114001) / 4) % 3 + 1;
  assert.deepEqual(Array.from(matches[0].days), [group, group + 3, 0], material.id);
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
console.log('OK: 96 materiales, 24 familias y reinicio de todos los servidores.');

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
