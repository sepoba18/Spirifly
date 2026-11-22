const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
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

// Validar extractStats y getHeroCandidates con métricas ampliadas
const richResult = {
  summary: { totalPullsAll: 300, totalPrimosAll: 48000, total5StarsAll: 6 },
  character: {
    stats: {
      fiveStarsCount: 4,
      avg5Pity: '52.0',
      win5050Pct: '66.7',
      won5050Count: 2,
      lost5050Count: 1,
      currentPity5: 28,
      isGuaranteed: true,
      fiveStarHistory: [
        { name: 'Mona', pity: 43, isWon5050: false, isGuaranteed: false, isCapturingRadiance: false, time: '2026-09-01 22:29:59' },
        { name: 'Mavuika', pity: 75, isWon5050: true, isGuaranteed: false, isCapturingRadiance: false, time: '2026-06-10 21:03:56' },
        { name: 'Lauma', pity: 6, isWon5050: null, isGuaranteed: true, isCapturingRadiance: false, time: '2026-05-01 16:11:32' },
        { name: 'Citlali', pity: 83, isWon5050: true, isGuaranteed: false, isCapturingRadiance: false, time: '2024-12-31 21:40:32' }
      ]
    }
  },
  weapon: { stats: { fiveStarsCount: 1, currentPity5: 55, isGuaranteed: false, fatePoints: 0, fiveStarHistory: [{ name: 'Arma X', pity: 50 }] } },
  standard: { stats: { fiveStarsCount: 1, currentPity5: 46, fiveStarHistory: [{ name: 'Diluc', pity: 65 }] } },
  chronicled: { stats: { fiveStarsCount: 0, currentPity5: 21, totalPulls: 21, fiveStarHistory: [] } }
};

const stats = share.extractStats(richResult, { uid: '601976801' });
assert.equal(stats.totalPulls, 300);
assert.equal(stats.totalPrimos, 48000);
assert.equal(stats.countsByBanner.character, 4);
assert.equal(stats.countsByBanner.weapon, 1);
assert.equal(stats.countsByBanner.standard, 1);
assert.equal(stats.avg5Pity, 52.0);
assert.equal(stats.deltaVsGlobal, -10.5);
assert.equal(stats.maxWinStreak, 2);
assert.equal(stats.best.name, 'Lauma');
assert.equal(stats.best.pity, 6);
assert.equal(stats.worst.name, 'Mavuika');
assert.equal(stats.worst.pity, 75);
assert.equal(stats.pityBanners.chronicled.totalPulls, 21);
assert.equal(stats.maskedUid, '601•••801');
assert.equal(stats.recentFiveStars.length, 4);

const candidates = share.getHeroCandidates(richResult);
assert.equal(candidates[0].id, 'best');
assert.equal(candidates[0].name, 'Lauma');
assert.equal(candidates[0].pity, 6);
assert.equal(candidates[0].isRecord, true);
assert.equal(candidates.filter((c) => c.name === 'Lauma' && c.pity === 6).length, 1);
assert.equal(candidates.length, 5);

// Validar resolución real de iconos y splash desde data_builds.js
const root = path.resolve(__dirname, '..');
const dbCtx = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, 'data_builds.js'), 'utf8'), dbCtx);
const buildsDb = vm.runInContext('CHARACTER_BUILDS_DB', dbCtx);

const laumaMeta = share.resolveCharacterMeta('Lauma', buildsDb);
assert.equal(laumaMeta.element, 'Dendro');
assert.equal(laumaMeta.icon, 'https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Lauma.png');
assert.equal(laumaMeta.splashUrl, 'https://gi.yatta.moe/assets/UI/UI_Gacha_AvatarImg_Lauma.png');

const sandroneMeta = share.resolveCharacterMeta('Sandrone', buildsDb);
assert.equal(sandroneMeta.icon, 'https://gi.yatta.moe/assets/UI/UI_AvatarIcon_MarionetteNew.png');
assert.equal(sandroneMeta.splashUrl, 'https://gi.yatta.moe/assets/UI/UI_Gacha_AvatarImg_MarionetteNew.png');

const mizukiMeta = share.resolveCharacterMeta('Yumemizuki Mizuki', buildsDb);
assert.equal(mizukiMeta.shortName, 'Mizuki');
assert.equal(mizukiMeta.icon, 'https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Mizuki.png');
assert.equal(mizukiMeta.splashUrl, 'https://gi.yatta.moe/assets/UI/UI_Gacha_AvatarImg_Mizuki.png');

console.log('PASS: historial vacío, total registrado, métricas ampliadas, selector de héroe e iconos oficiales.');
