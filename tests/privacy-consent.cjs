const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(path.join(__dirname, '..', 'assets', 'privacy.js'), 'utf8');
const key = 'spirifly_analytics_consent_v1';

function visit(saved, options = {}) {
  const storage = new Map(saved ? [[key, JSON.stringify(saved)]] : []);
  const scripts = [], deleted = [], controls = new Map();
  let panel, ready;
  function button() {
    return { hidden: true, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; },
      click() { this.listeners.click({ currentTarget: this }); }, focus() { this.focused = true; } };
  }
  for (const name of ['[data-privacy-settings]', '[data-ad-privacy]']) controls.set(name, button());
  const doc = {
    readyState: 'loading',
    head: { appendChild(node) { scripts.push(node); } },
    body: { appendChild(node) { panel = node; } },
    createElement(tag) {
      if (tag === 'script') return {};
      const reject = button(), accept = button();
      return { hidden: false, setAttribute() {}, querySelector(selector) {
        return selector === '[data-analytics-reject]' ? reject : accept;
      } };
    },
    addEventListener(type, fn) { if (type === 'DOMContentLoaded') ready = fn; },
    querySelectorAll(selector) { return controls.has(selector) ? [controls.get(selector)] : []; }
  };
  Object.defineProperty(doc, 'cookie', {
    get() { if (options.blockCookies) throw new Error('cookies blocked'); return '_ga=old; _ga_J3F1TQSWB0=old; gameProgress=keep'; },
    set(value) { if (options.blockCookies) throw new Error('cookies blocked'); deleted.push(value); }
  });
  const window = { location: { origin: 'https://spirifly.app', pathname: '/', hostname: 'spirifly.app',
    href: 'https://spirifly.app/?authkey=DO_NOT_SEND#token=DO_NOT_SEND' } };
  const localStorage = {
    getItem(k) { if (options.blockStorage) throw new Error('storage blocked'); return storage.get(k) || null; },
    setItem(k, value) { if (options.blockStorage) throw new Error('storage blocked'); storage.set(k, value); }
  };
  vm.runInNewContext(source, { window, document: doc, localStorage, Date, Number, JSON });
  ready();
  return { window, scripts, deleted, storage, controls, panel,
    accept() { panel.querySelector('[data-analytics-accept]').click(); },
    reject() { panel.querySelector('[data-analytics-reject]').click(); } };
}

const fresh = visit();
assert.equal(fresh.scripts.length, 0, 'A new visitor makes no Analytics request');
assert.equal(fresh.window['ga-disable-G-J3F1TQSWB0'], true);
assert.equal(fresh.panel.hidden, true, 'Consent does not obstruct the tools or tutorial');
fresh.controls.get('[data-privacy-settings]').click();
assert.equal(fresh.panel.hidden, false);
fresh.accept();
assert.equal(fresh.scripts.length, 1, 'Opt-in loads Analytics once');
assert.equal(fresh.window['ga-disable-G-J3F1TQSWB0'], false);
assert.equal(JSON.parse(fresh.storage.get(key)).analytics, true);
const config = fresh.window.dataLayer.find(args => args[0] === 'config')[2];
assert.equal(config.page_location, 'https://spirifly.app/', 'Import credentials are excluded from the measured URL');
assert.equal(config.page_referrer, '');
assert.equal(config.allow_google_signals, false);
assert.equal(config.allow_ad_personalization_signals, false);
fresh.accept();
assert.equal(fresh.scripts.length, 1);
fresh.reject();
assert.equal(fresh.window['ga-disable-G-J3F1TQSWB0'], true, 'Withdrawal disables an already loaded tag');
assert.equal(JSON.parse(fresh.storage.get(key)).analytics, false);
assert.ok(fresh.deleted.some(c => c.startsWith('_ga=')));
assert.ok(fresh.deleted.every(c => !c.startsWith('gameProgress=')), 'Withdrawal preserves game progress');
assert.ok(!fresh.window.dataLayer.some(args => args[0] === 'consent' && Object.entries(args[2]).some(([k, v]) => k.startsWith('ad_') && v === 'granted')), 'Analytics consent never grants advertising consent');

assert.equal(visit({ analytics: true, updated: Date.now() }).scripts.length, 1, 'Remember an unexpired opt-in');
assert.equal(visit({ analytics: false, updated: Date.now() }).scripts.length, 0, 'Remember a refusal');
assert.equal(visit({ analytics: true, updated: Date.now() - 181 * 86400000 }).scripts.length, 0, 'Expired consent does not load Analytics');
assert.equal(visit({ analytics: true, updated: Date.now() + 86400000 }).scripts.length, 0, 'Reject future-dated records');
const blocked = visit(null, { blockStorage: true });
assert.equal(blocked.scripts.length, 0);
blocked.reject();
assert.equal(blocked.window['ga-disable-G-J3F1TQSWB0'], true, 'Blocked storage leaves optional measurement disabled');
visit({ analytics: false, updated: Date.now() }, { blockCookies: true }).reject();

let reopened = 0;
fresh.window.googlefc.showRevocationMessage = () => { reopened++; };
fresh.window.__tcfapi = (command, version, callback) => callback({ gdprApplies: true }, true);
fresh.window.googlefc.callbackQueue[0].CONSENT_API_READY();
assert.equal(fresh.controls.get('[data-ad-privacy]').hidden, false, 'Show the advertising control only when the CMP applies');
fresh.controls.get('[data-ad-privacy]').click();
fresh.window.googlefc.callbackQueue[1].CONSENT_API_READY();
assert.equal(reopened, 1, 'Advertising preferences reopen the certified CMP');
console.log('PASS: default refusal, opt-in, persistence, expiry, withdrawal, sensitive URL exclusion, blocked storage and CMP revocation.');
