// Referencias externas: Genshin Builds (tablas por salto) y BitTopup Wiki
// (cada talento y constelación), consultadas el 26-10-2026.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const ctx = vm.createContext({console, state:{activePlans:[]}});
for (const f of ['data_real_genshin.js','assets/data/traveler-planner.js','planner_real.js']) {
  vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'), ctx);
}
const run = text => vm.runInContext(text, ctx);
const plain = x => JSON.parse(JSON.stringify(x));
// IDs de libros de destino para los saltos 1→2, 2→3, ..., 9→10.
// Valores explícitos para evitar replicar la aritmética del generador.
const references = {
  Anemo:{books:[104301,104305,104308,104302,104305,104309,104303,104306,104309], enemy:[112008,112009,112010], boss:113005, boost:[2,1]},
  Geo:{books:[104310,104314,104317,104311,104314,104318,104312,104315,104318], enemy:[112011,112012,112013], boss:113006, boost:[2,1]},
  Electro:{books:[104320,104324,104327,104321,104324,104328,104322,104325,104328], enemy:[112044,112045,112046], boss:113017, boost:[2,1]},
  Dendro:{books:[104329,104333,104336,104330,104333,104337,104331,104334,104337], enemy:[112059,112060,112061], boss:113032, boost:[1,2]},
  Hydro:{books:[104338,104342,104345,104339,104342,104346,104340,104343,104346], enemy:[112080,112081,112082], boss:113046, boost:[1,2]},
  Pyro:{books:[104347,104351,104354,104348,104351,104355,104349,104352,104355], enemy:[112104,112105,112106], boss:113063, boost:[1,2]},
  Cryo:{books:[104365,104369,104372,104366,104369,104373,104367,104370,104373], enemy:[112149,112150,112151], boss:113075, boost:[2,1]}
};
// [mora, libros, grado de enemigo, cantidad, material especial, corona]
const steps = [
  [12500,3,0,6,0,0], [17500,2,1,3,0,0], [25000,4,1,4,0,0],
  [30000,6,1,6,0,0], [37500,9,1,9,0,0], [120000,4,2,4,1,0],
  [260000,6,2,6,1,0], [450000,12,2,9,2,0], [700000,16,2,12,2,1]
];
function expectedStep(ref,i,pyro) {
  const [mora,books,grade,enemy,boss,crown] = steps[i];
  const result = {'202':mora, [ref.books[i]]:books, [ref.enemy[grade]]:enemy};
  if (boss) result[ref.boss] = pyro ? 1 : boss;
  if (crown) result['104319'] = crown;
  return result;
}
function sum(parts) {
  const result={};
  for(const part of parts) for(const [id,n] of Object.entries(part)) result[id]=(result[id]||0)+n;
  return result;
}
let jumps=0, intervals=0;
for(const [element,ref] of Object.entries(references)) {
  const key=element==='Pyro'?'Viajero':`Viajero (${element})`;
  ctx.key=key;
  const char=run('getRosterCharInfo(key)');
  assert.equal(char.element,element);
  assert.deepEqual(plain(run('REAL_CHAR_TALENT_BOOSTS[key]')),{C3:ref.boost[0],C5:ref.boost[1]},`${element}: C3/C5`);
  for(let talent=0;talent<3;talent++) {
    const table=element==='Geo' && talent===0 ? references.Anemo:ref;
    const expected=steps.map((_,i)=>expectedStep(table,i,element==='Pyro'));
    for(let i=0;i<9;i++) {
      const cost=char.talents[talent].costs[i+2];
      assert.deepEqual(plain({'202':cost.coinCost,...cost.costItems}),expected[i],`${element}/${talent} salto ${i+1}→${i+2}`);
      jumps++;
    }
    for(let constellation=0;constellation<=6;constellation++) {
      const bonus=(constellation>=3 && ref.boost[0]===talent || constellation>=5 && ref.boost[1]===talent)?3:0;
      for(let from=1;from<=10;from++) for(let to=from;to<=10;to++) {
        ctx.p={kind:'character',key,active:true,incLevel:false,incWeapon:false,constellation,
          talCur:[1,1,1],talTar:[1,1,1],talInc:[false,false,false]};
        ctx.p.talInc[talent]=true;
        ctx.p.talCur[talent]=from+bonus;
        ctx.p.talTar[talent]=to+bonus;
        assert.deepEqual(plain(run('computePlanRequirements(p,["talents"])')),sum(expected.slice(from-1,to-1)),`${element}/${talent} C${constellation} ${from}→${to}`);
        intervals++;
      }
    }
  }
  console.log(`PASS ${element}: 3 talentos × 9 saltos; todos los intervalos con C0–C6.`);
}
// Ascensión completa, separada de libros de experiencia y mora de nivel.
const ascension=run('REAL_CHAR_LIST.find(c=>c.sharedProgression).ascensionCosts');
const expectedAsc=[
  {coinCost:20000,costItems:{100024:3,104101:1,112005:3}},
  {coinCost:40000,costItems:{100024:10,104102:3,112005:15}},
  {coinCost:60000,costItems:{100024:20,104102:6,112006:12}},
  {coinCost:80000,costItems:{100024:30,104103:3,112006:18}},
  {coinCost:100000,costItems:{100024:45,104103:6,112007:12}},
  {coinCost:120000,costItems:{100024:60,104104:6,112007:24}}
];
for(let i=0;i<6;i++) assert.deepEqual(plain(ascension[i+1]),expectedAsc[i]);
for(const element of Object.keys(references)) {
  ctx.key=element==='Pyro'?'Viajero':`Viajero (${element})`;
  assert.deepEqual(plain(run('getRosterCharInfo(key).ascensionCosts')),plain(ascension));
}
console.log(`PASS: ${jumps} saltos, ${intervals} cálculos de intervalos y 6 fases de ascensión compartidas.`);
