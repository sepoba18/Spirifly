const BLOCKED_PREFIXES = [
  '/tests',
  '/01_actualizaciones',
  '/research',
  '/scripts',
  '/herramientas_parches',
  '/downloads',
  '/video_temp',
  '/video_temp_b',
  '/.git',
  '/.codex'
];

const BLOCKED_EXACT = new Set([
  '/firebase.json',
  '/getlink.ps1',
  '/.gitignore'
]);

const BLOCKED_EXTENSIONS = [
  '.cjs',
  '.py',
  '.bat',
  '.ps1',
  '.md',
  '.bak',
  '.tmp'
];

function isBlockedPath(pathname) {
  const lower = pathname.toLowerCase();
  if (BLOCKED_EXACT.has(lower)) return true;
  if (BLOCKED_PREFIXES.some(prefix => lower === prefix || lower.startsWith(prefix + '/'))) {
    return true;
  }
  return BLOCKED_EXTENSIONS.some(ext => lower.endsWith(ext));
}

async function notFoundResponse(context) {
  const headers = {
    'X-Robots-Tag': 'noindex, nofollow',
    'Cache-Control': 'no-store'
  };
  try {
    if (context.env && context.env.ASSETS) {
      const pageUrl = new URL('/404.html', context.request.url);
      const assetRes = await context.env.ASSETS.fetch(pageUrl);
      if (assetRes && assetRes.ok) {
        return new Response(assetRes.body, {
          status: 404,
          headers: {
            ...headers,
            'Content-Type': 'text/html; charset=utf-8'
          }
        });
      }
    }
  } catch {}
  return new Response('404 Not Found', {
    status: 404,
    headers: {
      ...headers,
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}

export async function onRequest(context) {
  const { pathname } = new URL(context.request.url);
  if (isBlockedPath(pathname)) {
    return notFoundResponse(context);
  }
  return context.next();
}
