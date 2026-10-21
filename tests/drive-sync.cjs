const fs = require('fs');
const vm = require('vm');
const assert = require('node:assert/strict');
const {webcrypto} = require('node:crypto');
const root = require('node:path').resolve(__dirname, '..');
const source = fs.readFileSync(root + '/gdrive_sync_engine.js', 'utf8');
const clone = x => JSON.parse(JSON.stringify(x));
class Drive {
  constructor() { this.payload = null; this.version = 0; this.writes = 0; this.requests = 0; this.duplicates = false; this.fail = 0; }
  async fetch(url, opts = {}) {
    this.requests++;
    if (this.hook) await this.hook(url, opts);
    if (this.fail) return new Response('{}', {status: this.fail});
    let data;
    if (opts.method === 'POST' || opts.method === 'PATCH') {
      const boundary = opts.headers['Content-Type'].split('boundary=')[1];
      const sections = opts.body.split('--' + boundary).filter(s => s.includes('Content-Type:'));
      const meta = JSON.parse(sections[0].split('\r\n\r\n')[1].trim());
      const payload = JSON.parse(sections[1].split('\r\n\r\n')[1].trim());
      if (meta.name === 'seelie_genshin_backup.json') { this.payload = payload; this.version++; this.writes++; }
      data = {id:'file'};
    } else if (url.includes('spaces=')) data = {files: this.payload ? Array.from({length:this.duplicates ? 2 : 1}, () => ({id:'file', version:String(this.version)})) : []};
    else if (url.includes('alt=media')) data = this.payload;
    else data = {id:'file', version:String(this.version)};
    return new Response(JSON.stringify(data), {headers:{ETag:'version-' + this.version}});
  }
}
function device(drive) {
  const data = new Map();
  const storage = {getItem:k=>data.get(k)??null, setItem:(k,v)=>data.set(k,String(v)), removeItem:k=>data.delete(k)};
  const callbacks = new Map(); let timer = 0;
  const c = {console, localStorage:storage, crypto:webcrypto, TextEncoder, AbortSignal, fetch:drive.fetch.bind(drive),
    DEFAULT_SEELIE_OWNED:{mora:0}, state:{activePlans:[],realOwned:{mora:0},lang:'es'},
    setTimeout:fn=>{ callbacks.set(++timer,fn); return timer; }, clearTimeout:id=>callbacks.delete(id)};
  vm.createContext(c); vm.runInContext(source,c);
  const elements = new Map();
  c.document = {documentElement:{lang:'es'}, getElementById:id=>elements.get(id) || null, querySelectorAll:()=>[]};
  c.localStorage.setItem('gdrive_access_token','test'); c.localStorage.setItem('gdrive_token_timestamp',Date.now()); c.localStorage.setItem('teyvat_drive_linked','true');
  c.elements = elements; c.callbacks = callbacks;
  c.triggerDriveSyncStamp = () => { storage.setItem('teyvat_data_last_modified', new Date().toISOString()); c.GoogleDriveSyncEngine.scheduleSync(); };
  return c;
}
function edit(c, value) { c.localStorage.setItem('main-inventory',JSON.stringify({mora:value})); c.state.realOwned={mora:value}; c.triggerDriveSyncStamp(); }
let passed=0;
async function test(name,fn) { await fn(); passed++; console.log('PASS '+name); }
(async()=>{
 await test('first upload and phone download with real request flow',async()=>{
   const d=new Drive(),pc=device(d),phone=device(d); edit(pc,400); await pc.GoogleDriveSyncEngine.syncWithDrive(); assert.equal(d.writes,1);
   await phone.GoogleDriveSyncEngine.syncWithDrive(); assert.equal(phone.state.realOwned.mora,400);
   await phone.GoogleDriveSyncEngine.syncWithDrive(); assert.equal(phone.GoogleDriveSyncEngine.status,'synced'); assert.equal(d.writes,1);
   edit(phone,500); await phone.GoogleDriveSyncEngine.syncWithDrive(); await pc.GoogleDriveSyncEngine.syncWithDrive(); assert.equal(pc.state.realOwned.mora,500);
 });
 await test('hydrated defaults keep separate remote/local baselines',async()=>{
   const d=new Drive(),pc=device(d); d.payload={version:2,accounts:['main'],accountNames:{main:'Principal'},data:{'main-inventory':{mora:10},'main-goals':[]},settings:{autoResolveConflict:true}};d.version=1;
   await pc.GoogleDriveSyncEngine.syncWithDrive(); d.payload.data['main-inventory'].mora=20;d.version++;
   await pc.GoogleDriveSyncEngine.syncWithDrive(); assert.equal(pc.state.realOwned.mora,20);assert.equal(d.writes,0);
   edit(pc,30);await pc.GoogleDriveSyncEngine.syncWithDrive();assert.equal(d.payload.data['main-inventory'].mora,30);
 });
 await test('both edited shows conflict without overwriting either side',async()=>{
   const d=new Drive(),a=device(d),b=device(d);edit(a,1);await a.GoogleDriveSyncEngine.syncWithDrive();await b.GoogleDriveSyncEngine.syncWithDrive();edit(a,2);await a.GoogleDriveSyncEngine.syncWithDrive();edit(b,3);await b.GoogleDriveSyncEngine.syncWithDrive();assert.equal(b.GoogleDriveSyncEngine.status,'conflict');assert.equal(d.payload.data['main-inventory'].mora,2);assert.equal(b.state.realOwned.mora,3);
 });
 await test('expired session manual button reauthorizes once without changing data',async()=>{
   const d=new Drive(),c=device(d);let requests=0;c.google={accounts:{oauth2:{initTokenClient:()=>({requestAccessToken:()=>requests++})}}};c.localStorage.setItem('gdrive_token_timestamp',0);await c.GoogleDriveSyncEngine.syncWithDrive(true);assert.equal(requests,1);assert.equal(d.requests,0);assert.equal(c.localStorage.getItem('teyvat_data_last_modified'),null);
 });
 await test('401 clears invalid token and manual sync requests authorization',async()=>{
   const d=new Drive(),c=device(d);let requests=0;c.google={accounts:{oauth2:{initTokenClient:()=>({requestAccessToken:()=>requests++})}}};d.fail=401;await assert.rejects(c.GoogleDriveSyncEngine.syncWithDrive(true));assert.equal(requests,1);assert.equal(c.GoogleDriveSyncEngine.status,'auth');assert.equal(c.localStorage.getItem('gdrive_access_token'),null);
 });
 await test('server failures preserve remote and mark error',async()=>{
   const d=new Drive(),c=device(d);d.fail=500;edit(c,900);await assert.rejects(c.GoogleDriveSyncEngine.syncWithDrive());assert.equal(d.writes,0);assert.equal(c.GoogleDriveSyncEngine.status,'error');assert.equal(c.localStorage.getItem('spirifly_sync_pending'),'true');
 });
 await test('two sync requests serialize and do not create duplicate files',async()=>{
   const d=new Drive(),c=device(d);edit(c,4);await Promise.all([c.GoogleDriveSyncEngine.syncWithDrive(),c.GoogleDriveSyncEngine.syncWithDrive()]);assert.equal(d.writes,1);
 });
 await test('edits during upload stay pending and are uploaded in next pass',async()=>{
   const d=new Drive(),c=device(d);edit(c,4);let edited=false;d.hook=async(url,opts)=>{if(!edited && opts.method==='POST' && opts.body.includes('seelie_genshin_backup.json')){edited=true;edit(c,5);}};await c.GoogleDriveSyncEngine.syncWithDrive();assert.equal(d.payload.data['main-inventory'].mora,5);assert.equal(c.GoogleDriveSyncEngine.status,'synced');assert.equal(d.writes,2);
 });
 await test('new edits during remote read do not get overwritten by download',async()=>{
   const d=new Drive(),a=device(d),b=device(d);edit(a,10);await a.GoogleDriveSyncEngine.syncWithDrive();await b.GoogleDriveSyncEngine.syncWithDrive();edit(a,20);await a.GoogleDriveSyncEngine.syncWithDrive();let edited=false;d.hook=async()=>{if(!edited){edited=true;edit(b,30);}};await b.GoogleDriveSyncEngine.syncWithDrive();assert.equal(b.state.realOwned.mora,30);assert.equal(d.payload.data['main-inventory'].mora,20);assert.equal(b.GoogleDriveSyncEngine.status,'conflict');
 });
 await test('multi-account restore and preferences including null reset',async()=>{
   const d=new Drive(),a=device(d),b=device(d);a.localStorage.setItem('accounts','["main","alt"]');a.localStorage.setItem('account','alt');a.localStorage.setItem('accountUids','{"alt":"123"}');a.localStorage.setItem('alt-inventory','{"mora":600}');a.localStorage.setItem('alt-goals','[{"key":"Amber"}]');a.localStorage.setItem('teyvat_active_wish_banner','chronicled');b.localStorage.setItem('teyvat_starred','["Kaeya"]');await b.GoogleDriveSyncEngine.applyRemotePayload(a.GoogleDriveSyncEngine.getLocalPayload());assert.equal(b.state.account,'alt');assert.equal(b.state.realOwned.mora,600);assert.equal(b.state.activePlans[0].key,'Amber');assert.equal(b.state.activeWishBanner,'chronicled');assert.equal(b.state.starredChars.length,0);
 });
 await test('restore waits for wish database before loading profile',async()=>{
   const d=new Drive(),a=device(d);let done=false; a.WishEngine={saveWishesToStorage:async()=>{await Promise.resolve();done=true;},setActiveAccountUid:()=>assert.ok(done),loadWishesFromStorage:async()=>[]};const payload=a.GoogleDriveSyncEngine.getLocalPayload();payload.wishAccounts=['123'];payload.accountUids={main:'123'};payload.wishesData={'123':[]};await a.GoogleDriveSyncEngine.applyRemotePayload(payload);assert.ok(done);
 });
 await test('cleared wishes are explicitly included as empty history',async()=>{
   const d=new Drive(),c=device(d);c.localStorage.setItem('teyvat_wish_accounts_v1','["123"]');assert.equal(c.GoogleDriveSyncEngine.getLocalPayload().wishesData['123'].length,0);
 });
 await test('duplicate Drive files stop safely with an explicit error',async()=>{
   const d=new Drive(),c=device(d);edit(c,1);await c.GoogleDriveSyncEngine.syncWithDrive();d.duplicates=true;await assert.rejects(c.GoogleDriveSyncEngine.syncWithDrive(),/ambigua/);assert.equal(d.writes,1);
 });
 await test('snapshot is read-only and fingerprint is stable',async()=>{
   const d=new Drive(),c=device(d);edit(c,1);const before=c.localStorage.getItem('main-inventory');const one=await c.GoogleDriveSyncEngine._fingerprint(c.GoogleDriveSyncEngine.getLocalPayload());const two=await c.GoogleDriveSyncEngine._fingerprint(c.GoogleDriveSyncEngine.getLocalPayload());assert.equal(one,two);assert.equal(c.localStorage.getItem('main-inventory'),before);
 });
 await test('manual conflict preference requires confirmation before remote download',async()=>{
   const d=new Drive(),a=device(d),b=device(d);edit(a,1);await a.GoogleDriveSyncEngine.syncWithDrive();await b.GoogleDriveSyncEngine.syncWithDrive();b.localStorage.setItem('gdrive_auto_resolve_conflict','false');await b.GoogleDriveSyncEngine.syncWithDrive();await a.GoogleDriveSyncEngine.syncWithDrive();edit(a,2);await a.GoogleDriveSyncEngine.syncWithDrive();await b.GoogleDriveSyncEngine.syncWithDrive();assert.equal(b.GoogleDriveSyncEngine.status,'conflict');assert.equal(b.state.realOwned.mora,1);
 });
 await test('legacy fingerprint migrates without blocking a local edit',async()=>{
   const d=new Drive(),a=device(d);edit(a,1);await a.GoogleDriveSyncEngine.syncWithDrive();const legacy=await a.GoogleDriveSyncEngine._legacyFingerprint(d.payload);a.localStorage.setItem('spirifly_sync_base_hash',legacy);a.localStorage.removeItem('spirifly_sync_local_hash');edit(a,2);await a.GoogleDriveSyncEngine.syncWithDrive();assert.equal(d.payload.data['main-inventory'].mora,2);
 });
 await test('valid Aino plans survive restore and account switch',async()=>{
   const d=new Drive(),a=device(d);const payload=a.GoogleDriveSyncEngine.getLocalPayload();payload.data['main-goals']=[{key:'Aino',level:90}];await a.GoogleDriveSyncEngine.applyRemotePayload(payload);assert.equal(a.state.activePlans[0].key,'Aino');a.AccountManager.switchAccount('main');assert.equal(a.state.activePlans[0].key,'Aino');
 });
 await test('malformed remote data is rejected before restoring any keys',async()=>{
   const d=new Drive(),a=device(d);const payload=a.GoogleDriveSyncEngine.getLocalPayload();payload.data.gdrive_access_token='unexpected';await assert.rejects(a.GoogleDriveSyncEngine.applyRemotePayload(payload));assert.equal(a.localStorage.getItem('gdrive_access_token'),'test');
 });
 await test('account settings schedule automatic sync',async()=>{
   const d=new Drive(),a=device(d);a.saveActiveAccountSettings({ar:40});assert.equal(a.localStorage.getItem('spirifly_sync_pending'),'true');await a.GoogleDriveSyncEngine.syncWithDrive();assert.equal(d.payload.data['main-settings'].ar,40);
 });
 await test('failed or expired background sync never requests a popup',async()=>{
   const d=new Drive(),a=device(d);let auth=0;a.google={accounts:{oauth2:{initTokenClient:()=>({requestAccessToken:()=>auth++})}}};a.localStorage.setItem('gdrive_token_timestamp',0);await a.GoogleDriveSyncEngine.syncWithDrive();assert.equal(auth,0);assert.equal(a.GoogleDriveSyncEngine.status,'auth');
 });
 await test('corrupt local inventory cannot overwrite a valid cloud backup',async()=>{
   const d=new Drive(),a=device(d);edit(a,500);await a.GoogleDriveSyncEngine.syncWithDrive();a.localStorage.setItem('main-inventory','{broken');await assert.rejects(a.GoogleDriveSyncEngine.syncWithDrive(),/conservó/);assert.equal(d.writes,1);assert.equal(d.payload.data['main-inventory'].mora,500);
 });
 console.log(`${passed} integration scenarios passed.`);
})().catch(error=>{console.error(error);process.exitCode=1});
