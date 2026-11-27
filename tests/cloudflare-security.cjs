const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');

function loadEsHandler(relPath) {
  const raw = fs.readFileSync(path.join(root, relPath), 'utf8');
  const wrapped = raw.replace(/export\s+async\s+function\s+onRequest/, 'async function onRequest') + '\n;onRequest;';
  const sandbox = {
    URL,
    Response,
    Request,
    Headers,
    Set,
    TextDecoder,
    Uint8Array,
    AbortController,
    fetch,
    setTimeout,
    clearTimeout,
    console
  };
  return vm.runInNewContext(wrapped, sandbox, { filename: relPath });
}

function visibleWordCount(htmlText) {
  const bodyMatch = htmlText.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : htmlText;
  body = body.replace(/<(script|style|noscript|svg)[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  body = body.replace(/<[^>]+>/g, ' ');
  body = body.replace(/&[a-z0-9#]+;/gi, ' ');
  return (body.match(/[A-Za-zÀ-ÿ0-9_]+/g) || []).length;
}

async function runTests() {
  // 1. Validar corsproxy.js
  const corsOnRequest = loadEsHandler('functions/api/corsproxy.js');
  for (const origin of [
    'https://spirifly.app',
    'https://www.spirifly.app',
    'https://spirifly.pages.dev',
    'https://98ba993d.spirifly.pages.dev'
  ]) {
    const req = new Request('https://spirifly.app/api/corsproxy', {
      method: 'OPTIONS',
      headers: { Origin: origin }
    });
    const res = await corsOnRequest({ request: req });
    assert.equal(res.status, 204, `Debe permitir OPTIONS para ${origin}`);
    assert.equal(res.headers.get('Access-Control-Allow-Origin'), origin);
  }

  for (const evilOrigin of ['https://attacker.pages.dev', 'https://evil.com', 'https://notspirifly.app']) {
    const req = new Request('https://spirifly.app/api/corsproxy', {
      method: 'POST',
      headers: { Origin: evilOrigin, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://public-operation-hk4e-sg.hoyoverse.com/gacha_info/api/getGachaLog' })
    });
    const res = await corsOnRequest({ request: req });
    assert.equal(res.status, 403, `Debe rechazar origen no autorizado ${evilOrigin}`);
  }

  // 2. Validar _middleware.js
  const mwOnRequest = loadEsHandler('functions/_middleware.js');
  const makeContext = urlPath => {
    let nextCalled = false;
    return {
      request: new Request('https://spirifly.app' + urlPath),
      env: {
        ASSETS: {
          async fetch() {
            return new Response('<html>404</html>', { status: 200, headers: { 'Content-Type': 'text/html' } });
          }
        }
      },
      next() {
        nextCalled = true;
        return new Response('OK', { status: 200 });
      },
      wasNextCalled() {
        return nextCalled;
      }
    };
  };

  for (const blockedPath of [
    '/firebase.json',
    '/tests/site-audit.cjs',
    '/01_Actualizaciones/version-pipeline.cjs',
    '/research/simulator-provenance.json',
    '/getlink.ps1',
    '/scripts/update_sitemap.py',
    '/herramientas_parches/revisar.cjs',
    '/.gitignore'
  ]) {
    const ctx = makeContext(blockedPath);
    const res = await mwOnRequest(ctx);
    assert.equal(res.status, 404, `Debe bloquear ${blockedPath} con 404`);
    assert.equal(res.headers.get('X-Robots-Tag'), 'noindex, nofollow');
    assert.equal(ctx.wasNextCalled(), false, `No debe llamar a next() para ${blockedPath}`);
  }

  for (const allowedPath of [
    '/',
    '/ads.txt',
    '/robots.txt',
    '/sitemap.xml',
    '/char_talent_boosts.json',
    '/personajes/mitya',
    '/assets/guides.css'
  ]) {
    const ctx = makeContext(allowedPath);
    const res = await mwOnRequest(ctx);
    assert.equal(res.status, 200, `Debe permitir ${allowedPath}`);
    assert.equal(ctx.wasNextCalled(), true, `Debe llamar a next() para ${allowedPath}`);
  }

  // 3. Auditoría HTML estática y archivos de configuración
  for (const noAdFile of ['privacy.html', 'cookies.html', 'terms.html', '404.html']) {
    const content = fs.readFileSync(path.join(root, noAdFile), 'utf8');
    assert.ok(!content.includes('adsbygoogle.js'), `${noAdFile} no debe cargar adsbygoogle.js`);
  }

  const publicHtmlFiles = [
    'index.html',
    'about.html',
    'guide.html',
    'privacy.html',
    'cookies.html',
    'terms.html',
    '404.html',
    ...fs.readdirSync(path.join(root, 'personajes')).filter(f => f.endsWith('.html')).map(f => path.join('personajes', f))
  ];

  for (const rel of publicHtmlFiles) {
    const content = fs.readFileSync(path.join(root, rel), 'utf8');
    assert.ok(!content.includes('usuario@gmail.com'), `${rel} no debe contener usuario@gmail.com`);
    const localHtmlLinks = [...content.matchAll(/href=["']([^"']+\.html(?:[?#][^"']*)?)["']/gi)]
      .map(m => m[1])
      .filter(href => !href.startsWith('http://') && !href.startsWith('https://'));
    assert.equal(localHtmlLinks.length, 0, `${rel} no debe contener enlaces internos .html (${localHtmlLinks.join(', ')})`);
  }

  const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(indexHtml, /<html lang="es">/i);
  assert.match(indexHtml, /<title>[^<]*Planificador[^<]*Genshin Impact[^<]*<\/title>/i);
  assert.ok(!/<img[^>]*\bsrc=""/i.test(indexHtml), 'index.html no debe tener etiquetas <img> con src vacío');
  assert.ok(!indexHtml.includes('Simulador de Ingresos'), 'index.html no debe exponer simulador de ingresos AdSense');
  assert.ok(!indexHtml.includes('adsToggleBtn'), 'index.html no debe incluir el botón dev adsToggleBtn');
  const dataJs = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
  assert.ok(dataJs.includes('siteTitle: "Spirifly — Planificador de Farmeo, Inventario, Deseos y Builds de Genshin Impact"'), 'data.js debe mantener el siteTitle SEO en español');
  const indexLdMatch = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  assert.ok(indexLdMatch, 'index.html debe incluir application/ld+json');
  JSON.parse(indexLdMatch[1]);

  const charFiles = fs.readdirSync(path.join(root, 'personajes'))
    .filter(f => f.endsWith('.html') && f !== 'index.html');
  assert.equal(charFiles.length, 40, 'Deben existir exactamente 40 fichas de personajes');

  for (const file of charFiles) {
    const content = fs.readFileSync(path.join(root, 'personajes', file), 'utf8');
    assert.ok(content.includes('property="og:title"'), `${file} debe tener og:title`);
    assert.ok(content.includes('rel="canonical"'), `${file} debe tener canonical`);
    assert.ok(content.includes('assets/guides.css'), `${file} debe enlazar assets/guides.css`);
    assert.ok(content.includes('assets/privacy.js?v=2'), `${file} debe enlazar assets/privacy.js?v=2`);
    const ldMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
    assert.ok(ldMatch, `${file} debe tener JSON-LD`);
    JSON.parse(ldMatch[1]);
    const words = visibleWordCount(content);
    assert.ok(words >= 550, `${file} tiene solo ${words} palabras (min 550)`);
    const charLinks = content.match(/href="\/personajes\/[a-z0-9]+"/g) || [];
    assert.ok(charLinks.length >= 3, `${file} debe enlazar al menos a 3 fichas de /personajes/`);
  }

  const headersFile = fs.readFileSync(path.join(root, '_headers'), 'utf8');
  assert.ok(headersFile.includes('X-Content-Type-Options: nosniff'));
  assert.ok(headersFile.includes('X-Frame-Options: SAMEORIGIN'));
  assert.ok(headersFile.includes('Referrer-Policy: strict-origin-when-cross-origin'));

  const robotsFile = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
  for (const disallowed of ['/tests/', '/01_Actualizaciones/', '/research/', '/scripts/', '/herramientas_parches/', '/cdn-cgi/']) {
    assert.ok(robotsFile.includes(`Disallow: ${disallowed}`), `robots.txt debe incluir Disallow: ${disallowed}`);
  }
  assert.ok(robotsFile.includes('Sitemap: https://spirifly.app/sitemap.xml'));

  console.log('PASS: corsproxy origin allowlist, _middleware internal route blocking, _headers, robots.txt, and SEO/AdSense HTML checks.');
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
