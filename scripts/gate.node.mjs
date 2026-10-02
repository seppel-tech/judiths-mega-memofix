import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
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

test('public recovery helper is constant JavaScript even without the secret', async()=>{
  const configured = await gate(req('/__gate/client.js'),config,deps());
  const unconfigured = await gate(req('/__gate/client.js'),config,{...deps(),appPassword:undefined});
  assert.equal(configured.status,200);
  assert.equal(unconfigured.status,200);
  assert.match(configured.headers.get('content-type'),/javascript/);
  const script = await configured.text();
  assert.equal(script,await unconfigured.text());
  assert.ok(!script.includes(password));
});
for (const path of ['/__gate/client.js/unknown','/__gate/client.js.map','/__gate/unknown']) {
  test('recovery helper does not expose sibling or nested app routes '+path,async()=>{
    assert.equal((await gate(req(path),config,deps())).status,401);
    assert.equal((await gate(req(path),config,{...deps(),appPassword:undefined})).status,503);
  });
}
test('login and failed retry load the external recovery helper without inline script',async()=>{
  for(const response of [await gate(req('/deep?x=1'),config,deps()),await gate(login('wrong'),config,deps())]) {
    const html=await response.text();
    assert.match(html,/<script src="\/__gate\/client\.js" defer><\/script>/);
    assert.doesNotMatch(html,/<script(?:\s[^>]*)?>\s*[^<\s]/);
  }
});
test('recovery fragment stays only in the browser action, including a long recovery token',async()=>{
  const fragment='#access_token='+ 'synthetic-recovery-token_'.repeat(700)+'&type=recovery';
  const form={action:'/__gate/login'};
  const script=await (await gate(req('/__gate/client.js'),config,deps())).text();
  runInNewContext(script,{document:{querySelector:()=>form},window:{location:{hash:fragment}}});
  assert.equal(form.action,'/__gate/login'+fragment);
  // The helper must also tolerate non-login gate pages without a form.
  assert.doesNotThrow(()=>runInNewContext(script,{document:{querySelector:()=>null},window:{location:{hash:fragment}}}));
  const r=await gate(login(),config,deps());
  assert.equal(r.status,303);
  assert.equal(r.headers.get('location'),'/deep?x=1');
  assert.ok(!r.headers.get('location').includes('#'));
});
test('worker migration still runs without a server secret while app routes fail closed',async()=>{
  const missing={...deps(),appPassword:undefined};
  const r=await gate(req('/sw.js'),config,missing);
  assert.equal(r.status,200);
  assert.match(r.headers.get('content-type'),/javascript/);
  assert.equal(await r.text(),await (await gate(req('/sw.js'),config,deps())).text());
  for(const path of ['/','/sw.js/unknown','/assets/main.js','/api/private'])assert.equal((await gate(req(path),config,missing)).status,503);
  assert.equal((await gate(req('/sw.js',{method:'POST'}),config,missing)).status,503);
});
test('authenticated worker requests still reach the original worker',async()=>{
  const token=await tokenFor(password,config,now);
  assert.equal(await gate(req('/sw.js',{headers:{cookie:'testfix_gate='+token}}),config,deps()),null);
});
