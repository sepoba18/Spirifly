const INDEX = 'https://keqingmains.com/';
const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}\p{M}]/gu, '');

function discoverGuides(html, names) {
  const links = new Set();
  for (const match of html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)) {
    try {
      const url = new URL(match[1].replace(/&amp;/g, '&'), INDEX);
      if (url.protocol === 'https:' && url.hostname === 'keqingmains.com' && !url.username && !url.password) links.add(url.origin + url.pathname);
    } catch { /* Un enlace mal formado no es una fuente. */ }
  }
  return names.map(name => ({
    character: name,
    guides: [...links].filter(link => {
      const last = new URL(link).pathname.split('/').filter(Boolean).at(-1) || '';
      return normalize(last.replace(/[-_](quickguide|quick-guide|guide)$/i, '')) === normalize(name);
    }).map(url => ({ publisher: 'KQM', url, status: 'link-found-review-required', guideVersion: null, updatedAt: null, reviewedAt: null }))
  }));
}

function research(snapshot, names) {
  const collection = snapshot.buildGuideIndex;
  const entries = collection?.entries || [];
  return {
    policy: 'specialist-guides-only', primaryPublisher: 'KQM', indexUrl: INDEX,
    checkedAt: collection?.checkedAt || null,
    status: collection?.status || 'not-queried', error: collection?.error || null,
    characters: [...new Set(names)].map(name => {
      const entry = entries.find(item => normalize(item.character) === normalize(name));
      return { character: name, status: entry?.guides.length ? 'guide-links-found-review-required' : !entry && collection?.status === 'ok' ? 'not-queried-for-character' : 'pending-specialist-guide', guides: entry?.guides || [],
        requiredReview: ['Confirmar que la guia corresponde al personaje y rol.', 'Registrar version, fecha y URL de la guia.', 'Revisar armas, refinamientos, artefactos, estadisticas, recarga, equipos y talentos.', 'Marcar analisis previos al lanzamiento como preliminares.', 'Adaptar recomendaciones y traducir sin copiar la guia completa.'] };
    })
  };
}

async function collectGuides(snapshot, names, options, fetcher = fetch, log = console.log) {
  const record = { key: 'build-guides/kqm', url: INDEX, checkedAt: new Date().toISOString() };
  try {
    const response = await fetcher(INDEX, { signal: AbortSignal.timeout(options.timeout), headers: { Accept: 'text/html' } });
    if (!response.ok) throw Error(`HTTP ${response.status} ${response.statusText || ''}`.trim());
    if (response.url && new URL(response.url).hostname !== 'keqingmains.com') throw Error('Redireccion fuera de la fuente especializada.');
    const html = await response.text();
    if (!/<html\b/i.test(html) || !/keqingmains|\bKQM\b/i.test(html)) throw Error('Respuesta inesperada del indice KQM.');
    snapshot.buildGuideIndex = { status: 'ok', checkedAt: record.checkedAt, entries: discoverGuides(html, names) };
    record.status = 'ok';
    log('OK build-guides/kqm: enlaces encontrados pendientes de revision.');
  } catch (error) {
    record.status = 'error'; record.error = `${error.message}${error.cause ? ` (${error.cause.message})` : ''}`;
    snapshot.buildGuideIndex = { status: 'error', checkedAt: record.checkedAt, error: record.error, entries: [] };
    log(`ERROR build-guides/kqm: ${record.error}`);
  }
  snapshot.requests.push(record);
}

module.exports = { INDEX, discoverGuides, research, collectGuides };
