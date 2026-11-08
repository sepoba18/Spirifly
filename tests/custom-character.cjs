const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const ctx = vm.createContext({ console, state: { activePlans: [], realOwned: {}, lang: 'es', starredChars: [] }, document: { getElementById: () => null } });
for (const file of ['data.js', 'data_real_genshin.js', 'assets/data/traveler-planner.js', 'planner_real.js', 'farming_engine.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx);
}
const run = code => vm.runInContext(code, ctx);
const plain = value => JSON.parse(JSON.stringify(value));
const catalogs = plain(run(`({local:getAllLocalSpecialties(), common:getAllCommonDropFamilies(), books:getAllTalentBookFamilies(), boss:getAllWorldBossMaterials(), weekly:getAllWeeklyBossMaterials()})`));
const counts = Object.fromEntries(['Mondstadt','Liyue','Inazuma','Sumeru','Fontaine','Natlan','Nod-Krai','Snezhnaya'].map(region => [region, catalogs.local.filter(m => m.region === region).length]));
assert.deepEqual(counts, {Mondstadt:8,Liyue:9,Inazuma:9,Sumeru:9,Fontaine:8,Natlan:8,'Nod-Krai':6,Snezhnaya:6});
assert.equal(new Set(catalogs.local.map(m=>m.id)).size,63);
for (const family of [...catalogs.common, ...catalogs.books]) assert.equal(family.items.length,3,family.baseId);
// Ningún material usado por un personaje del catálogo debe faltar en los selectores.
const selectable = new Set(Object.values(catalogs).flatMap(list => list.flatMap(m => m.items || [m])).map(m=>m.id));
const used = plain(run(`REAL_CHARACTERS_DB.flatMap(c=>[...Object.values(c.ascensionCosts||{}),...(c.talents||[]).flatMap(t=>Object.values(t.costs||{}))]).flatMap(s=>Object.keys(s.costItems||{}))`));
for (const id of used) if (/^(100|101|112|113|1043)/.test(id) && id !== '104319') assert.ok(selectable.has(id),id);
run(`state.activePlans=[{kind:'character',key:'Prueba futura',isCustom:true,customConfig:{...getDefaultCustomConfig(),name:'Prueba futura',element:'Hydro',bossMatId:'113012',localMatId:'101257',commonMatId:'112005',talentBookId:'104301',weeklyMatId:'113003'},curState:0,tarState:13,talCur:[1,1,1],talTar:[10,10,10],incWeapon:false}];`);
const req = plain(run('computePlanRequirements(state.activePlans[0])'));
for (const [id,qty] of Object.entries({'113012':46,'101257':168,'112005':36,'112006':96,'112007':129,'104301':9,'104302':63,'104303':114,'113003':18,'104319':3,'104121':1,'104122':9,'104123':9,'104124':6})) assert.equal(req[id],qty,id);
// Cada categoría desconocida desaparece del cálculo, sin afectar las otras.
for (const [field,ids] of Object.entries({bossMatId:['113012'],localMatId:['101257'],commonMatId:['112005','112006','112007'],talentBookId:['104301','104302','104303'],weeklyMatId:['113003']})) {
  run(`state.cfgDraft=JSON.parse(JSON.stringify(state.activePlans[0]));state.activePlans[0].customConfig[${JSON.stringify(field)}]='unknown';`);
  const partial = plain(run('computePlanRequirements(state.activePlans[0])'));
  for (const [id,qty] of Object.entries(req)) assert.equal(partial[id],ids.includes(id)?undefined:qty,`${field}: ${id}`);
  run('state.activePlans[0]=state.cfgDraft;state.cfgDraft=null;');
}
run(`state.activePlans[0].customConfig={...getDefaultCustomConfig(),name:'Prueba futura'};`);
const pending = plain(run('computePlanRequirements(state.activePlans[0])'));
assert.ok(Object.keys(pending).every(id=>/^10411[1-4]$/.test(id)||['202','104001','104002','104003','104319'].includes(id)));
assert.ok(pending['202']>0);
run('state.activePlans[0].active=false;');
assert.deepEqual(plain(run('computePlanRequirements(state.activePlans[0])')),{});
// Los planes ya guardados conservan los valores heredados.
const legacy = plain(run(`buildCustomCharacterObject({name:'Antiguo'}).ascensionCosts['2'].costItems`));
assert.equal(legacy['100025'],10);
assert.equal(legacy['113011'],2);
assert.equal(run(`normalizeMaterialSearch('  ÁMBAR de piño  ')`),'ambar de pino');
let saved = false;
ctx.alert = message => { ctx.lastAlert = message; };
ctx.savePlansToStorage = () => { saved = true; };
run(`state.activePlans=[{kind:'character',key:'Uno',isCustom:true},{kind:'character',key:'Dos',isCustom:true}];customCharDraft={...getDefaultCustomConfig(),name:'dos',originalKey:'Uno'};saveCustomCharModal();`);
assert.equal(saved,false);
assert.equal(run('state.activePlans[0].key'),'Uno');
assert.match(ctx.lastAlert,/Ya existe/);
run(`customCharDraft={...getDefaultCustomConfig(),name:'amber'};saveCustomCharModal();`);
assert.equal(saved,false);
assert.match(ctx.lastAlert,/oficial/);
// Crear, persistir, restaurar y editar sin tocar las metas reales del navegador.
ctx.setSpiriflyStorage = () => {};
run(`getArProgressionLimits=()=>({maxStateIdx:13,maxTalent:10});openCharConfigModal=()=>{};state.activePlans=[];customCharDraft={...getDefaultCustomConfig(),name:'Futuro',localMatId:'101257'};saveCustomCharModal();`);
assert.equal(saved,true);
assert.equal(run('state.activePlans.length'),1);
assert.equal(run('getCustomPendingCount(state.activePlans[0].customConfig)'),4);
const beforeRestore = plain(run('computePlanRequirements(state.activePlans[0])'));
run('state.activePlans=JSON.parse(JSON.stringify(state.activePlans));');
assert.deepEqual(plain(run('computePlanRequirements(state.activePlans[0])')),beforeRestore);
run(`state.activePlans[0].weaponKey='Espada del Alba';state.starredChars=['Futuro'];customCharDraft={...state.activePlans[0].customConfig,name:'Futuro editado',originalKey:'Futuro',weapon:'Bow',localMatId:'101269'};saveCustomCharModal();`);
assert.equal(run('state.activePlans.length'),1);
assert.equal(run('state.activePlans[0].key'),'Futuro editado');
assert.equal(run('state.activePlans[0].weaponKey'),'none');
assert.equal(run('state.starredChars[0]'),'Futuro editado');
assert.equal(run(`computePlanRequirements(state.activePlans[0])['101257']`),undefined);
assert.equal(run(`computePlanRequirements(state.activePlans[0])['101269']`),168);
console.log(JSON.stringify({checks:'PASS',regions:counts,selectors:Object.fromEntries(Object.entries(catalogs).map(([key,list])=>[key,list.length])),scenarios:'Cobertura, costos 90/10-10-10, materiales pendientes, pausa, compatibilidad y nombres duplicados'},null,2));
