const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const elements = {};
const ctx = vm.createContext({ console, state: { activePlans: [], realOwned: {} },
  document: { getElementById: id => elements[id] || null } });
for (const file of ['data.js', 'data_real_genshin.js', 'planner_real.js', 'farming_engine.js', 'assets/custom-weapons.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), ctx);
}
const run = code => vm.runInContext(code, ctx);
const plain = value => JSON.parse(JSON.stringify(value));
const fields = ['domainMatId', 'commonMatId', 'eliteMatId'];
for (const field of fields) {
  const families = plain(run(`getCustomWeaponFamilies('${field}')`));
  assert.ok(families.length > 0);
  let previous = -1;
  for (const family of families) {
    assert.equal(family.items.length, field === 'domainMatId' ? 4 : 3);
    assert.notEqual(family.region, 'Otras', family.baseId);
    const order = family.region === 'Varias regiones' ? -1 : run(`REGION_ORDER.indexOf('${family.region}')`);
    assert.ok(order >= previous, family.region);
    previous = order;
  }
}
// Compara cada fase, Mora, EXP y materiales con un arma real de cada rareza.
for (const rarity of [3, 4, 5]) {
  run(`state.activePlans=[];state.soloWeapDraft=null;
    var official=REAL_UPGRADABLE_WEAPONS.find(w=>w.rarity===${rarity});
    var first=Object.keys(official.ascensionCosts['1'].costItems);
    var cfg={...getDefaultCustomWeaponConfig(),name:'Prueba',rarity:${rarity},
      domainMatId:first.find(id=>id.startsWith('114')),
      commonMatId:first.find(id=>id.startsWith('112')&&getMat(id).rank===1),
      eliteMatId:first.find(id=>id.startsWith('112')&&getMat(id).rank===2)};
    var plan={kind:'weapon',key:'Prueba',isCustom:true,customConfig:cfg,curState:0,tarState:13};state.activePlans=[plan];`);
  assert.deepEqual(plain(run('buildCustomWeaponObject(cfg).ascensionCosts')), plain(run('official.ascensionCosts')));
  const full = plain(run('computePlanRequirements(plan)'));
  assert.deepEqual(full, plain(run('computePlanRequirements({...plan,key:official.name,isCustom:false})')));
  for (const field of fields) {
    run(`cfg.${field}='unknown'`);
    const partial = plain(run('computePlanRequirements(plan)'));
    assert.equal(partial['202'], full['202']);
    assert.ok(Object.keys(partial).every(id => id !== 'null' && id !== 'unknown'));
  }
  assert.ok(Object.keys(plain(run('computePlanRequirements(plan)'))).every(id => ['202','104011','104012','104013'].includes(id)));
  run('plan.active=false');
  assert.deepEqual(plain(run('computePlanRequirements(plan)')), {});
  run('state.activePlans=JSON.parse(JSON.stringify(state.activePlans))');
  assert.ok(run('getWeaponInfo("Prueba").isCustom'));
}
elements.customWeaponName = { value: 'Nueva' };
elements.customWeaponType = { value: 'Sword' };
elements.customWeaponRarity = { value: '4' };
ctx.alert = message => { ctx.lastAlert = message; };
ctx.savePlansToStorage = () => {};
run('closeCustomWeaponModal=()=>{};openSoloWeaponConfigModal=()=>{};getArProgressionLimits=()=>({maxStateIdx:13});state.activePlans=[];customWeaponDraft=getDefaultCustomWeaponConfig();saveCustomWeaponModal();');
assert.equal(run('state.activePlans.length'), 1);
run('state.activePlans[0].curState=4;state.activePlans[0].weapRefine=3;state.activePlans[0].active=false;customWeaponDraft={...state.activePlans[0].customConfig,originalKey:"Nueva"};');
elements.customWeaponName.value = 'Editada';
run('saveCustomWeaponModal()');
assert.equal(run('state.activePlans[0].curState'), 4);
assert.equal(run('state.activePlans[0].weapRefine'), 3);
assert.equal(run('state.activePlans[0].active'), false);
assert.equal(run('state.activePlans[0].key'), 'Editada');
run('customWeaponDraft=getDefaultCustomWeaponConfig();saveCustomWeaponModal();');
assert.match(ctx.lastAlert, /Ya existe/);
assert.equal(run('state.activePlans.length'), 1);
// Se puede equipar, renombrar y cambiar de tipo sin dejar armas incompatibles.
run(`state.activePlans.push({kind:'character',key:'Amber',weaponKey:'Editada'});
  customWeaponDraft={...state.activePlans[0].customConfig,originalKey:'Editada'};`);
elements.customWeaponName.value = 'Arco propio';
elements.customWeaponType.value = 'Bow';
run('saveCustomWeaponModal()');
assert.equal(run('state.activePlans[1].weaponKey'), 'Arco propio');
assert.ok(run('getPlannerWeapons().some(w=>w.name==="Arco propio"&&w.type==="Bow")'));
run(`customWeaponDraft={...state.activePlans[0].customConfig,originalKey:'Arco propio'};`);
elements.customWeaponType.value = 'Sword';
run('saveCustomWeaponModal()');
assert.equal(run('state.activePlans[1].weaponKey'), 'none');
console.log('PASS: familias completas y ordenadas; costos 3/4/5 estrellas; pendientes; pausa; persistencia; creación; edición; duplicados.');
