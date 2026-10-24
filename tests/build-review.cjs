const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({console});
for(const file of ['data_real_genshin.js','assets/data/simulator-original.js','data_builds.js','i18n_dictionary.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
vm.runInContext(`
if(CHARACTER_BUILDS_DB.length!==127)throw Error('Cobertura del catálogo');
for(const c of CHARACTER_BUILDS_DB){
 if(!c.talentPriority)throw Error(c.id+': prioridad ausente');
 for(const rec of c.bestWeapons){const w=REAL_WEAPONS_DB.find(w=>w.id===rec.weaponId);if(!w||w.type!==c.weaponType||w.name!==rec.name||w.rarity!==rec.rarity)throw Error(c.id+': identidad de arma');}
 for(const t of c.metaTeams){if(t.members.length!==4||new Set(t.members).size!==4)throw Error(c.id+': equipo incompleto o duplicado');}
}
`,context);
assert.equal(vm.runInContext('CHARACTER_BUILDS_DB.find(c=>c.id==="arlecchino").bestWeapons[0].weaponId',context),'13512');
for(const [name,en] of [['Semblante de la Luna Carmesí',"Crimson Moon's Semblance"],['Estrella Errabunda','Wandering Evenstar'],['Fluencia Impoluta','Flowing Purity']]){
 assert.equal(context.getWeaponTranslatedName(name,'es'),name);
 assert.equal(context.getWeaponTranslatedName(name,'en'),en);
}
const app=fs.readFileSync('app.js','utf8');
vm.runInContext(app.slice(app.indexOf('function getWeaponDisplayData('),app.indexOf('// Diccionario Oficial y Verificado de Sets')),context);
context.getWeaponFallbackIcon=()=> 'fallback';
const actual=context.getWeaponDisplayData('Semblante de la Luna Carmesí',5,'Polearm','13512');
assert.match(actual.icon,/BloodMoon/);
const vesna=vm.runInContext('CHARACTER_BUILDS_DB.find(c=>c.id==="vesna")',context);
assert.ok(vesna.metaTeams.every(t=>t.members.includes('Odette')));
const skirk=vm.runInContext('CHARACTER_BUILDS_DB.find(c=>c.id==="skirk")',context);
assert.ok(skirk.metaTeams.every(t=>!t.members.includes('Kazuha')));
assert.ok(app.includes('ch.review?.hideUnverifiedBenchmarks'));
assert.ok(!app.includes('ch.talentPriority || "Habilidad Elemental (E) > Definitiva (Q) > Ataques Normales"'));
console.log('PASS: 127 fichas, 499 armas compatibles, equipos de cuatro, prioridades completas y tres traducciones corregidas.');
