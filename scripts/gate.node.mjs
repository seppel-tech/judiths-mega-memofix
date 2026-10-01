import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gate, tokenFor, SESSION_MAX_AGE_MS, safeRedirect } from '../middleware.core.ts';
const config = { appId: 'testfix', appName: 'TESTFIX', publicExact: ['/gate.css'], serviceWorkerPaths: ['/sw.js'] };
const password = 'Synthetic-Test-Only-42';
const now = 1790856000000;
const deps = () => ({ appPassword: password, now, clientIp: 'test', failures: new Map() });
const req = (path='/', options={}) => new Request('https://app.example'+path, options);
const login = (value=password, extra={}) => req('/__gate/login', { method:'POST', body:new URLSearchParams({password:value,redirect:'/deep?x=1'}), ...extra });
test('fails closed without server secret', async()=>assert.equal((await gate(req(),config,{...deps(),appPassword:undefined})).status,503));
for (const path of ['/', '/index.html', '/assets/main.js', '/api/private', '/gate.css/unknown', '/_next/static/main.js']) {
  test('blocks anonymous '+path, async()=>assert.equal((await gate(req(path),config,deps())).status,401));
}
test('only exact public file passes',async()=>assert.equal(await gate(req('/gate.css'),config,deps()),null));
test('rejects wrong password without a cookie',async()=>{ const r=await gate(login('wrong'),config,deps());assert.equal(r.status,401);assert.equal(r.headers.get('set-cookie'),null); });
test('correct login sets protected cookie and original target',async()=>{
  const r=await gate(login(),config,deps()); assert.equal(r.status,303); assert.equal(r.headers.get('location'),'/deep?x=1');
  const c=r.headers.get('set-cookie');for(const part of ['HttpOnly','Secure','SameSite=Lax','Path=/'])assert.ok(c.includes(part));assert.ok(!c.includes(password));
  assert.equal(await gate(req('/api/private',{headers:{cookie:c.split(';')[0]}}),config,deps()),null);
});
test('cannot forge or reuse another app session',async()=>{
  const token=await tokenFor(password,{...config,appId:'otherfix'},now);
  assert.equal((await gate(req('/',{headers:{cookie:'testfix_gate='+token}}),config,deps())).status,401);
  assert.equal((await gate(req('/',{headers:{cookie:'testfix_gate='+now+'.'+'0'.repeat(64)}}),config,deps())).status,401);
});
test('expired and future cookies fail server-side',async()=>{
 for(const time of [now-SESSION_MAX_AGE_MS-1,now+600001]) {const token=await tokenFor(password,config,time);assert.equal((await gate(req('/',{headers:{cookie:'testfix_gate='+token}}),config,deps())).status,401);}
});
test('password rotation revokes cookie',async()=>{const token=await tokenFor(password,config,now);assert.equal((await gate(req('/',{headers:{cookie:'testfix_gate='+token}}),config,{...deps(),appPassword:'Changed'})).status,401);});
test('cross-origin login is rejected',async()=>assert.equal((await gate(login(password,{headers:{origin:'https://evil.example'}}),config,deps())).status,403));
test('oversize login is rejected',async()=>assert.equal((await gate(login('x'.repeat(9000)),config,deps())).status,413));
test('limiter blocks repeated failures',async()=>{const d=deps();for(let i=0;i<10;i++)await gate(login('wrong'),config,d);assert.equal((await gate(login(),config,d)).status,429);});
test('redirects cannot leave origin',()=>{for(const s of ['//evil.example','https://evil.example','/\\evil.example','/x\nLocation:x'])assert.equal(safeRedirect(s),'/');});
test('worker migration preserves local data, blocks cached navigation',async()=>{const r=await gate(req('/sw.js'),config,deps());assert.equal(r.status,200);assert.match(r.headers.get('content-type'),/javascript/);const s=await r.text();assert.ok(s.includes('skipWaiting'));assert.ok(s.includes('fetch(e.request)'));assert.ok(!s.includes('caches.delete'));assert.ok(!s.includes(password));});

test('login permits same-origin form origin without leaking cross-origin referrers',async()=>{const r=await gate(req(),config,deps());assert.equal(r.headers.get('referrer-policy'),'same-origin');assert.ok((await r.text()).includes('<meta name="referrer" content="same-origin"'));});
