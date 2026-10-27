const assert = require('node:assert/strict');
const share = require('../assets/wish-share.js');
const engine = require('../wish_engine.js');
assert.deepEqual(share.summarize(null), {total:0, stars:0, best:null});
// El primer 5★ registrado puede empezar con pity previo desconocido.
const wishes = Array.from({length:180}, (_, i) => ({id:String(1000+i),gacha_type:'301',rank_type:[2,25,105].includes(i)?'5':'3',name:[2,25,105].includes(i)?'Nahida':'Arma',time:'2026-10-25 12:00:00'}));
const summary = share.summarize(engine.processFullHistory(wishes));
assert.equal(summary.total,180);
assert.equal(summary.stars,3);
assert.equal(summary.best.pity,23);
assert.equal(summary.best.banner,'character');
assert.equal(share.summarize(engine.processFullHistory(wishes.slice(0,3))).best,null);
const mixed = {summary:{totalPullsAll:200,total5StarsAll:4},character:{stats:{fiveStarHistory:[{pity:23,name:'A'},{pity:1}]}},weapon:{stats:{fiveStarHistory:[{pity:7,name:'B'},{pity:1}]}}};
assert.equal(share.summarize(mixed).best.pity,7);
assert.equal(share.summarize(mixed).best.banner,'weapon');
console.log('PASS: historial vacío, total registrado, ciclos completos, exclusión inicial y récord entre banners.');