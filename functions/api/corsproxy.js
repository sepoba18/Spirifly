const ALLOWED = new Set([
  'public-operation-hk4e-sg.hoyoverse.com', 'public-operation-hk4e.mihoyo.com',
  'hk4e-api-os.hoyoverse.com', 'hk4e-api.mihoyo.com'
]);
const PATHS = new Set(['/gacha_info/api/getGachaLog', '/gacha_info/api/getGachaConfigList']);
const MAX_BYTES = 2 * 1024 * 1024;
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
function error(status, message) {
  return Response.json({ retcode: -1, message }, { status, headers: CORS });
}
export async function onRequest({ request }) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (!['GET', 'POST'].includes(request.method)) return error(405, 'Método no permitido.');
  try {
    let target = new URL(request.url).searchParams.get('url');
    if (!target && request.method === 'POST') {
      const reader = request.body.getReader();
      const chunks = []; let length = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > 16384) { await reader.cancel(); return error(413, 'Solicitud demasiado grande.'); }
        chunks.push(value);
      }
      const bytes = new Uint8Array(length); let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
      const text = new TextDecoder().decode(bytes);
      target = JSON.parse(text).url;
    }
    if (typeof target !== 'string' || target.length > 16384) return error(400, 'URL requerida o demasiado larga.');
    const parsed = new URL(target);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password || (parsed.port && parsed.port !== '443') ||
        !ALLOWED.has(parsed.hostname.toLowerCase()) || !PATHS.has(parsed.pathname)) return error(403, 'Destino no permitido.');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const upstream = await fetch(parsed.href, { method: 'GET', redirect: 'manual', signal: controller.signal, headers: { Accept: 'application/json' } });
      if (upstream.status >= 300 && upstream.status < 400) return error(502, 'El servicio remoto intentó redirigir la solicitud.');
      if (!upstream.ok) return error(502, 'El servicio remoto no respondió correctamente.');
      const reader = upstream.body.getReader();
      const chunks = []; let size = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_BYTES) { await reader.cancel(); return error(502, 'Respuesta remota demasiado grande.'); }
        chunks.push(value);
      }
      const bytes = new Uint8Array(size); let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
      const json = JSON.parse(new TextDecoder().decode(bytes));
      return Response.json(json, { headers: { ...CORS, 'Cache-Control': 'no-store' } });
    } finally { clearTimeout(timer); }
  } catch { return error(502, 'No se pudo consultar el historial. Intenta nuevamente.'); }
}
