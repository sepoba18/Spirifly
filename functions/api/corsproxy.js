const ALLOWED = new Set([
  'public-operation-hk4e-sg.hoyoverse.com', 'public-operation-hk4e.mihoyo.com',
  'hk4e-api-os.hoyoverse.com', 'hk4e-api.mihoyo.com'
]);
const PATHS = new Set(['/gacha_info/api/getGachaLog', '/gacha_info/api/getGachaConfigList']);
const MAX_BYTES = 2 * 1024 * 1024;

function resolveAllowedOrigin(origin) {
  if (!origin) return 'https://spirifly.app';
  try {
    const u = new URL(origin);
    const h = u.hostname.toLowerCase();
    if (h === 'spirifly.app' || h === 'www.spirifly.app' || h === 'spirifly.pages.dev' || h.endsWith('.spirifly.pages.dev') || h === 'localhost' || h === '127.0.0.1') {
      return origin;
    }
  } catch {}
  return null;
}

function buildCorsHeaders(origin) {
  const allow = resolveAllowedOrigin(origin);
  if (!allow) return null;
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };
}

function error(status, message, corsHeaders) {
  return Response.json({ retcode: -1, message }, { status, headers: corsHeaders || {} });
}

export async function onRequest({ request }) {
  const origin = request.headers.get('Origin');
  const cors = buildCorsHeaders(origin);
  if (!cors) return error(403, 'Origen no autorizado.', { 'Vary': 'Origin' });
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (request.method !== 'POST') return error(405, 'Método no permitido. Usa POST.', cors);
  try {
    if (!request.body) return error(400, 'Cuerpo JSON requerido.', cors);
    const reader = request.body.getReader();
    const chunks = []; let length = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 16384) { await reader.cancel(); return error(413, 'Solicitud demasiado grande.', cors); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const text = new TextDecoder().decode(bytes);
    const target = JSON.parse(text).url;
    if (typeof target !== 'string' || target.length > 16384) return error(400, 'URL requerida o demasiado larga.', cors);
    const parsed = new URL(target);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password || (parsed.port && parsed.port !== '443') ||
        !ALLOWED.has(parsed.hostname.toLowerCase()) || !PATHS.has(parsed.pathname)) return error(403, 'Destino no permitido.', cors);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const upstream = await fetch(parsed.href, { method: 'GET', redirect: 'manual', signal: controller.signal, headers: { Accept: 'application/json' } });
      if (upstream.status >= 300 && upstream.status < 400) return error(502, 'El servicio remoto intentó redirigir la solicitud.', cors);
      if (!upstream.ok) return error(502, 'El servicio remoto no respondió correctamente.', cors);
      const uReader = upstream.body.getReader();
      const uChunks = []; let size = 0;
      while (true) {
        const { value, done } = await uReader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_BYTES) { await uReader.cancel(); return error(502, 'Respuesta remota demasiado grande.', cors); }
        uChunks.push(value);
      }
      const uBytes = new Uint8Array(size); let uOffset = 0;
      for (const chunk of uChunks) { uBytes.set(chunk, uOffset); uOffset += chunk.byteLength; }
      const json = JSON.parse(new TextDecoder().decode(uBytes));
      return Response.json(json, { headers: { ...cors, 'Cache-Control': 'no-store' } });
    } finally { clearTimeout(timer); }
  } catch { return error(502, 'No se pudo consultar el historial. Intenta nuevamente.', cors); }
}
