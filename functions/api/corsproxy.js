/**
 * Spirifly - Cloudflare Pages Function: Proxy CORS para HoYoverse API
 * Endpoint: /api/corsproxy?url=<targetUrl>
 * 
 * Permite a la aplicación web consultar el historial de deseos oficial de HoYoverse
 * sin bloqueos por políticas CORS del navegador, idéntico al mecanismo de Paimon.moe.
 */

export async function onRequest(context) {
  const { request } = context;

  // Manejo de Preflight CORS (OPTIONS)
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Max-Age": "86400"
      }
    });
  }

  const url = new URL(request.url);
  let targetUrl = url.searchParams.get("url");

  // Soporte para POST con body JSON
  if (!targetUrl && request.method === "POST") {
    try {
      const body = await request.json();
      targetUrl = body.url;
    } catch (e) {}
  }

  if (!targetUrl) {
    return new Response(JSON.stringify({ retcode: -1, message: "Parámetro 'url' requerido." }), {
      status: 400,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  try {
    const parsedTarget = new URL(targetUrl);
    const host = parsedTarget.hostname.toLowerCase();

    // Filtro de seguridad estricto: Solo permitir dominios oficiales de HoYoverse y miHoYo
    const allowedHosts = [
      "public-operation-hk4e-sg.hoyoverse.com",
      "public-operation-hk4e.mihoyo.com",
      "hk4e-api-os.hoyoverse.com",
      "hk4e-api.mihoyo.com"
    ];

    const isAllowed = allowedHosts.some(h => host === h || host.endsWith("." + h));
    if (!isAllowed) {
      return new Response(JSON.stringify({ retcode: -2, message: "Dominio no permitido por seguridad." }), {
        status: 403,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // Reenviar la petición a HoYoverse con cabeceras limpias
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*"
      }
    });

    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ retcode: -3, message: "Error al consultar HoYoverse: " + err.message }), {
      status: 502,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
