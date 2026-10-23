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
