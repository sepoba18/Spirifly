const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ console, state: { activePlans: [], realOwned: {}, lang: 'es' }, document: { getElementById: () => null } });
for (const file of ['data.js','data_real_genshin.js','assets/data/simulator-original.js','data_builds.js','planner_real.js','farming_engine.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const audit = vm.runInContext(`(() => {
  const materials = Object.values(REAL_MASTER_MATERIALS);
  const missingRefs = [];
  for (const entity of [...REAL_CHARACTERS_DB, ...REAL_WEAPONS_DB]) {
    const steps = [...Object.values(entity.ascensionCosts || {}), ...(entity.talents || []).flatMap(t => Object.values(t.costs || {}))];
    for (const step of steps) {
      for (const [id, qty] of Object.entries(step.costItems || {})) {
        if (!REAL_MASTER_MATERIALS[id] || !Number.isInteger(qty) || qty <= 0) missingRefs.push({ name: entity.name, id, qty });
      }
    }
  }
  const inconsistentDomains = FARMING_DOMAINS_REGISTRY.flatMap(d => d.matIds.filter(id => {
    const m = REAL_MASTER_MATERIALS[id];
    return !m || (d.type === 'boss' && m.rank >= 5) || (d.type === 'weekly' && m.rank < 5);
  }).map(id => ({ domain: d.id, id })));
  const iconMismatch = materials.filter(m => !m.icon.includes('UI_ItemIcon_' + m.id + '.png')).map(m => ({ id:m.id, icon:m.icon }));
  const missingTalentSources = materials.filter(m => m.id.startsWith('1043') && m.id !== '104319' && !FARMING_DOMAINS_REGISTRY.some(d => d.type === 'talent' && d.matIds.includes(m.id))).map(m => ({ id:m.id, name:m.name }));
  const missingBossSources = materials.filter(m => m.id.startsWith('113') && m.id !== '113021' && !FARMING_DOMAINS_REGISTRY.some(d => d.matIds.includes(m.id))).map(m => ({ id:m.id, name:m.name }));
  const missingSimulator = CHARACTER_BUILDS_DB.filter(c => !c.baseStats || !c.talentsData).map(c => c.name.es);
  return { counts: { characters: REAL_CHAR_LIST.length, weapons: REAL_WEAPONS_DB.length, builds: CHARACTER_BUILDS_DB.length, materials: materials.length }, missingRefs, inconsistentDomains, iconMismatch, missingTalentSources, missingBossSources, missingSimulator };
})()`, context);
assert.equal(audit.missingSimulator.length,0,'Todas las builds tienen estadísticas y talentos específicos');
assert.equal(audit.missingRefs.length, 0, 'Referencias y cantidades de materiales');
assert.equal(audit.inconsistentDomains.length, 0, 'No mezclar materiales semanales y jefes normales');
assert.equal(audit.iconMismatch.length, 0, 'Iconos de materiales corresponden a su ID');
vm.runInContext(`
  state.activePlans = [{kind:'character', key:'Hu Tao', curState:0, tarState:13, talCur:[1,1,1], talTar:[10,10,10], incWeapon:false}];
`, context);
const expCheck = vm.runInContext(`Object.values(REAL_CHAR_EXP_STEPS).map(s => (s.exp_104003||0)*20000+(s.exp_104002||0)*5000+(s.exp_104001||0)*1000)`, context);
const expSteps = [120175,578325,579100,854125,1195925,1611875,3423125];
expSteps.forEach((expected,i) => assert.ok(expCheck[i]>=expected && expCheck[i]-expected<1000));
const threeStarOre = vm.runInContext('computePlanRequirements({kind:"weapon",key:"Espada del Alba",curState:0,tarState:1})["104013"]',context);
assert.equal(threeStarOre,6,'Un arma de tres estrellas no usa la tabla de cuatro');
let totals = vm.runInContext('FarmingEngine.getSeelieFarmingData("all").totals', context);
assert.equal(vm.runInContext('computeMissingResinForReqs(computePlanRequirements(state.activePlans[0]))', context), totals.totalResin, 'Farmeo y planificador deben coincidir');
for (const [ids, title] of [ [['113003','113004','113005'],'Stormterror'], [['113006','113007','113008'],'Andrius'], [['113013','113014','113015'],'Tartaglia'], [['113025','113026','113027'],'Signora'], [['113060','113061','113062'],'Arlecchino'] ]) {
  for (const id of ids) {
    const name = vm.runInContext(`FARMING_DOMAINS_REGISTRY.find(d=>d.type==='weekly' && d.matIds.includes('${id}')).name`, context);
    assert.ok(name.includes(title), `${id}: ${name}`);
  }
}
let result = vm.runInContext('FarmingEngine.getSeelieFarmingData("all", {"113060":3,"113061":3,"113062":3})', context);
let card = result.sections.flatMap(s => s.cards)[0];
assert.equal(card.runs, 4, 'Sumar todos los materiales de un jefe semanal');
assert.equal(card.resin, 240, 'Costo habitual sin asumir descuento infinito');
assert.equal(result.totals.condResin, 0, 'Las concentradas no sirven para jefes');
result = vm.runInContext('FarmingEngine.getSeelieFarmingData("all", {"202":60000,"113022":3})', context);
assert.equal(result.totals.condResin, 1, 'Solo contar actividades compatibles con concentradas');
for (const [id, expected] of [['104356',[1,4,0]], ['104359',[2,5,0]], ['104362',[3,6,0]]]) {
  const days = vm.runInContext(`FARMING_DOMAINS_REGISTRY.find(d=>d.matIds.includes('${id}')).days`, context);
  assert.deepEqual(Array.from(days), expected);
}
const completed = vm.runInContext('FarmingEngine.getSeelieFarmingData("all", {"104365":3,"104368":3,"104371":3})', context);
assert.equal(completed.sections.flatMap(s=>s.cards).length, 3, 'Cada familia de Snezhnaya conserva su propia rotación');
for (const [id, expected] of [['104365',[1,4,0]], ['104368',[2,5,0]], ['104371',[3,6,0]]]) {
  const domain = vm.runInContext(`FARMING_DOMAINS_REGISTRY.find(d=>d.matIds.includes('${id}'))`, context);
  assert.deepEqual(Array.from(domain.days),expected);
  assert.equal(domain.name,'Ruinas sagradas del desamparo');
}
const quest = vm.runInContext('FarmingEngine.getSeelieFarmingData("all", {"113063":6})', context);
assert.equal(quest.totals.totalResin,0,'Las misiones de Natlan no cuestan resina');
assert.equal(quest.sections[0].cards[0].title,'Misiones de Natlan');
assert.equal(quest.sections[0].cards[0].tagType,'specialty');
assert.equal(audit.missingTalentSources.length,0,'Todos los libros tienen dominio');
assert.equal(audit.missingBossSources.length,0,'Todos los recursos 113 tienen origen');
const registrations = vm.runInContext(`Object.values(REAL_MASTER_MATERIALS).filter(m=>m.id.startsWith('113')&&m.id!=='113021').map(m=>({id:m.id,count:FARMING_DOMAINS_REGISTRY.filter(d=>d.matIds.includes(m.id)).length}))`,context);
for (const record of registrations) assert.equal(record.count,1,record.id);
// Un stock compartido no puede descontarse una vez por personaje.
const shared = vm.runInContext(`(() => {
  state.activePlans = [{kind:'character',key:'Amber'}, {kind:'character',key:'Lisa'}];
  state.realOwned = {'104301': 1};
  const previous = computePlanRequirements;
  computePlanRequirements = () => ({'104301': 1});
  const domain = FarmingEngine.getDomainsForDay(1,'all').find(d=>d.id==='mond_talent_freedom');
  computePlanRequirements = previous;
  state.activePlans = [];
  state.realOwned = {};
  return domain;
})()`, context);
assert.equal(shared.totalDeficit,1,'Stock compartido entre personajes');
assert.equal(shared.isPriority,true);
for (const [id, name] of [['112004','Slimes'], ['112008','Samachurls'], ['112011','Hilichurls Tiradores'], ['112023','Guardias de las Ruinas']]) {
  const record = vm.runInContext(`FarmingEngine.getSeelieFarmingData("all", {'${id}': 1}).sections.flatMap(s=>s.cards)[0]`, context);
  assert.equal(record.title,name);
}
const wishes = require(path.join(root, 'wish_engine.js'));
const unknownDate = wishes.processBannerPity([{id:'1',name:'Arma',rank_type:'3',time:''}], 'character');
assert.equal(unknownDate.stats.totalPulls,1);
assert.equal(unknownDate.stats.monthlyChart.length,0,'No inventar fechas');
assert.equal(wishes.detectServerFromUid('1800000001'), 'Asia');
const sequence = wishes.processBannerPity([
 {id:'1',name:'Skyward Blade',rank_type:'5',time:'2026-01-01 00:00:00'},
 {id:'2',name:'Arma promocional',rank_type:'5',time:'2026-02-01 00:00:00'},
 {id:'3',name:'Otra arma promocional',rank_type:'5',time:'2026-03-01 00:00:00'}
], 'weapon');
assert.equal(sequence.stats.isGuaranteed,false,'Consumir garantía promocional después de perder 75/25');
assert.equal(sequence.processedList[0].isGuaranteed,false,'No trasladar una Senda imaginaria a otro banner');
assert.equal(sequence.stats.fatePoints,0);
// Referencias locales estáticas (sin confundir plantillas dinámicas).
const missingAssets = new Set();
for (const name of ['index.html','app.js','planner_real.js','farming_engine.js','styles.css','privacy.html','terms.html','cookies.html']) {
  const source = fs.readFileSync(path.join(root,name),'utf8');
  for (const match of source.matchAll(/(?:["'(])((?:assets\/)[A-Za-z0-9_./-]+\.(?:png|jpg|svg|ico|webp))/g)) {
    if (!fs.existsSync(path.join(root,match[1]))) missingAssets.add(match[1]);
  }
}
audit.missingLocalAssets = [...missingAssets];
assert.equal(audit.missingLocalAssets.length,0,'Recursos locales existentes');
const weeklyFilter = vm.runInContext('FarmingEngine.getDomainsForDay(1,"60")',context);
assert.equal(weeklyFilter.length,14,'Calendario de los catorce jefes semanales');
assert.ok(weeklyFilter.every(d=>d.type==='weekly'&&d.resinCost===60));
const nativeAudit = vm.runInContext(`CHARACTER_BUILDS_DB.filter(b=>b.originalSource).map(build=>({id:build.id,stats:build.baseStats,talents:Object.values(build.talentsData)}))`,context);
assert.equal(nativeAudit.length,70,'Fichas completadas con parámetros específicos');
for (const build of nativeAudit) {
  assert.ok(['hp90','atk90','def90'].every(key=>Number.isFinite(build.stats[key])&&build.stats[key]>0),build.id);
  for (const talent of build.talents) {
    for (const label of talent.native.labels) {
      for (const match of label.matchAll(/\{(param\d+):/g)) {
        const values = talent.native.parameters[match[1]];
        assert.ok(Array.isArray(values)&&values.length>=13&&values.every(Number.isFinite),`${build.id}:${match[1]}`);
      }
    }
  }
}
const appCode = fs.readFileSync(path.join(root,'app.js'),'utf8');
vm.runInContext(appCode.slice(appCode.indexOf('function formatOriginalTalentAttribute('),appCode.indexOf('function renderTheorycraft()')),context);
assert.equal(context.formatOriginalTalentAttribute('{param1:F1P}',{param1:[0.3612]},1,'en'),'36.12%');
assert.equal(context.formatOriginalTalentAttribute('{param1:F1}s',{param1:[15]},1,'en'),'15s');
context.escapeHtml = value => String(value);
const facts = vm.runInContext(`renderOriginalBuildFacts(CHARACTER_BUILDS_DB.find(b=>b.id==='amber'))`,context);
assert.ok(facts.includes('tc-base-stats') && !facts.includes('<table') && !facts.includes('As de la arquería'));
const completedSources = vm.runInContext('FARMING_ADDITIONAL_SOURCES',context);
fs.writeFileSync(path.join(root,'research','completed-farming-sources.json'),JSON.stringify(completedSources,null,2));
audit.completedNativeBuilds = nativeAudit.map(b=>b.id);
audit.completedSources = vm.runInContext('FARMING_ADDITIONAL_SOURCES.flatMap(source => source.matIds.map(id=>({id,name:REAL_MASTER_MATERIALS[id].name,source:source.name,region:source.region,type:source.type,resinCost:source.resinCost,days:source.days})))',context);

fs.writeFileSync(path.join(root,'research','site-audit.json'), JSON.stringify(audit,null,2));
console.log(JSON.stringify({ counts:audit.counts, checks:'PASS', pending:{ talentMaterials:audit.missingTalentSources.length,bossMaterials:audit.missingBossSources.length,simulatorBuilds:audit.missingSimulator.length } },null,2));
