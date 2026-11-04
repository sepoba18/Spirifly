const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const buildSources = require('./build-sources.cjs');
const preloadSources = require('./preload-sources.cjs');
const webFormat = require('./web-format.cjs');
const stageVerifier = require('./verify-stage.cjs');

const ROOT = path.resolve(__dirname, '..');
const API = 'https://genshin-db-api.vercel.app/api/v5/';
const LANGUAGES = { es: 'Spanish', en: 'English', pt: 'Portuguese', ja: 'Japanese', ko: 'Korean' };
const FOLDERS = ['characters', 'weapons', 'materials', 'talents', 'constellations', 'domains', 'enemies', 'artifacts'];
const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}\p{M}]/gu, '');
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])]));
  return value;
}
const digest = value => crypto.createHash('sha256').update(JSON.stringify(canonical(value))).digest('hex');
const identity = item => item.id == null ? `name:${normalize(item.name)}` : `id:${item.id}`;

function parseArgs(args) {
  const options = { languages: Object.keys(LANGUAGES), timeout: 15000, retries: 1 };
  for (let i = 0; i < args.length; i++) {
    const option = args[i];
    if (option === '--help') { options.help = true; continue; }
    if (!['--version', '--languages', '--from', '--output'].includes(option) || !args[i + 1] || args[i + 1].startsWith('--')) throw Error(`Argumento invalido: ${option}. Usa --help.`);
    options[option.slice(2)] = args[++i];
  }
  if (options.help) return options;
  if (!/^\d{1,2}\.\d{1,2}$/.test(options.version || '')) throw Error('Indica una version valida, por ejemplo --version 7.2.');
  if (typeof options.languages === 'string') options.languages = [...new Set(options.languages.split(','))];
  if (!options.languages.length || options.languages.some(lang => !LANGUAGES[lang]) || !options.languages.includes('es')) throw Error('Idiomas permitidos: es,en,pt,ja,ko. Incluye es para comparar con la web.');
  return options;
}

function loadLocal(root = ROOT) {
  const context = vm.createContext({ console });
  for (const file of ['data_real_genshin.js', 'data_builds.js', 'farming_engine.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file, timeout: 15000 });
  }
  return JSON.parse(vm.runInContext(`JSON.stringify({characters:REAL_CHARACTERS_DB,weapons:REAL_WEAPONS_DB,materials:Object.values(REAL_MASTER_MATERIALS),builds:CHARACTER_BUILDS_DB,domains:FARMING_DOMAINS_REGISTRY,bosses:FARMING_ADDITIONAL_SOURCES,talentBoosts:REAL_CHAR_TALENT_BOOSTS})`, context));
}

function validateDataset(value) {
  if (!Array.isArray(value) || !value.length || value.some(item => !item || typeof item !== 'object' || Array.isArray(item) || typeof item.name !== 'string' || !item.name.trim())) throw Error('Respuesta inesperada: se esperaba un catalogo no vacio de objetos con nombre.');
  const ids = value.map(identity);
  if (new Set(ids).size !== ids.length) throw Error('Respuesta con identificadores duplicados.');
  return value;
}

async function requestJson(url, options, fetcher = fetch) {
  let last;
  for (let attempt = 0; attempt <= options.retries; attempt++) {
    try {
      const response = await fetcher(url, { signal: AbortSignal.timeout(options.timeout), headers: { Accept: 'application/json' } });
      if (!response.ok) {
        const error = Error(`HTTP ${response.status} ${response.statusText || ''}`.trim());
        error.permanent = response.status >= 400 && response.status < 500 && ![408, 429].includes(response.status);
        throw error;
      }
      return await response.json();
    } catch (error) {
      last = error;
      if (error.permanent) break;
      if (attempt < options.retries) await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  throw Error(`${last.message}${last.cause ? ` (${last.cause.message})` : ''}`);
}

async function pool(jobs, worker, concurrency = 3) {
  let index = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, jobs.length) }, async () => {
    while (index < jobs.length) { const job = jobs[index++]; await worker(job); }
  }));
}

function catalogUrl(folder, language) {
  return `${API}${folder}?${new URLSearchParams({ query: 'names', matchCategories: 'true', verboseCategories: 'true', resultLanguage: LANGUAGES[language] })}`;
}

async function collect(options, fetcher = fetch, log = console.log) {
  const snapshot = { schemaVersion: 1, requestedVersion: options.version, collectedAt: new Date().toISOString(), source: API, datasets: {}, requests: [], stats: {} };
  const jobs = options.languages.flatMap(language => FOLDERS.map(folder => ({ folder, language })));
  await pool(jobs, async ({ folder, language }) => {
    const key = `${folder}/${language}`;
    const url = catalogUrl(folder, language);
    const request = { key, url, checkedAt: new Date().toISOString() };
    try {
      snapshot.datasets[key] = validateDataset(await requestJson(url, options, fetcher));
      request.status = 'ok';
      request.count = snapshot.datasets[key].length;
      log(`OK ${key}: ${request.count}`);
    } catch (error) {
      request.status = 'error'; request.error = error.message;
      log(`ERROR ${key}: ${error.message}`);
    }
    snapshot.requests.push(request);
  });
  return snapshot;
}

function compare(items, localItems) {
  const ids = new Map(localItems.filter(item => item.id != null).map(item => [String(item.id), item]));
  const names = new Map(localItems.map(item => [normalize(item.name), item]));
  return items.map(item => {
    const byId = item.id == null ? null : ids.get(String(item.id));
    const byName = names.get(normalize(item.name));
    const match = byId || byName;
    return { id: item.id ?? null, name: item.name, status: byId ? 'present-id' : byName ? 'review-name-match' : 'candidate', localId: match?.id ?? null };
  });
}

function changesSince(snapshot, previous) {
  if (!previous || snapshot.source !== previous.source || previous.requestedVersion !== snapshot.requestedVersion) return null;
  const result = {};
  for (const [key, items] of Object.entries(snapshot.datasets)) {
    if (!previous.datasets[key]) continue;
    const old = new Map(previous.datasets[key].map(item => [identity(item), item]));
    const current = new Set(items.map(identity));
    result[key] = {
      added: items.filter(item => !old.has(identity(item))).map(item => ({ id: item.id ?? null, name: item.name })),
      changed: items.filter(item => old.has(identity(item)) && digest(old.get(identity(item))) !== digest(item)).map(item => ({ id: item.id ?? null, name: item.name })),
      absent: previous.datasets[key].filter(item => !current.has(identity(item))).map(item => ({ id: item.id ?? null, name: item.name }))
    };
  }
  return result;
}

function referencedMaterials(value, known, result = new Set()) {
  if (!value || typeof value !== 'object') return result;
  for (const [key, child] of Object.entries(value)) {
    if (known.has(key)) result.add(key);
    if (key === 'id' && known.has(String(child))) result.add(String(child));
    if (child && typeof child === 'object') referencedMaterials(child, known, result);
  }
  return result;
}

function costMaterialIds(value, inCosts = false, result = new Set()) {
  if (!value || typeof value !== 'object') return result;
  if (inCosts && value.id != null && (value.count != null || value.amount != null)) result.add(String(value.id));
  for (const [key, child] of Object.entries(value)) {
    if (inCosts && /^\d+$/.test(key) && typeof child === 'number' && child > 0 && key.length >= 3) result.add(key);
    if (child && typeof child === 'object') costMaterialIds(child, inCosts || ['costs', 'costItems'].includes(key), result);
  }
  return result;
}

function createReport(snapshot, local, manifest, previous = null) {
  const comparisons = {};
  for (const folder of ['characters', 'weapons', 'materials']) comparisons[folder] = compare(snapshot.datasets[`${folder}/es`] || [], local[folder]);
  const versionScope = {};
  for (const folder of ['characters', 'weapons', 'materials', 'artifacts']) {
    versionScope[folder] = (snapshot.datasets[`${folder}/es`] || []).filter(item => item.version === snapshot.requestedVersion || snapshot.preloadSources?.targetIds?.[folder]?.includes(String(item.id))).map(item => ({
      id: item.id ?? null, name: item.name, version: snapshot.requestedVersion, releaseVersion: item.version || null, selectionReason: item.version === snapshot.requestedVersion ? 'released-in-version' : 'secondary-changelog',
      localStatus: comparisons[folder]?.find(entry => String(entry.id) === String(item.id))?.status || 'not-compared'
    }));
  }
  const expected = (manifest.expectedCharacters || []).map(name => {
    const found = (snapshot.datasets['characters/es'] || []).find(item => normalize(item.name) === normalize(name));
    const english = (snapshot.datasets['characters/en'] || []).find(item => normalize(item.name) === normalize(name));
    const item = found || english;
    return { name, status: item ? 'available-in-source' : 'pending-in-source', id: item?.id ?? null };
  });
  const expectedWeapons = (manifest.expectedWeapons || []).map(name => {
    const item = ['es', 'en'].flatMap(lang => snapshot.datasets[`weapons/${lang}`] || []).find(item => normalize(item.name) === normalize(name));
    return { name, status: item ? 'available-in-source' : 'pending-in-source', id: item?.id ?? null };
  });
  const selectedWeapons = new Set([...expectedWeapons.filter(item => item.id != null).map(item => String(item.id)), ...versionScope.weapons.map(item => String(item.id))]);
  const selected = new Set(expected.filter(item => item.id != null).map(item => String(item.id)));
  for (const item of versionScope.characters) if (item.id != null) selected.add(String(item.id));
  const dossiers = [];
  const materials = snapshot.datasets['materials/es'] || [];
  const knownMaterials = new Set(materials.filter(item => item.id != null).map(item => String(item.id)));
  for (const folder of ['characters', 'weapons']) {
    const entries = snapshot.datasets[`${folder}/es`] || [];
    const candidates = new Set(comparisons[folder].filter(item => item.status === 'candidate').map(item => String(item.id)));
    for (const item of entries.filter(item => item.version === snapshot.requestedVersion || !item.version && candidates.has(String(item.id)) || folder === 'characters' && selected.has(String(item.id)) || folder === 'weapons' && selectedWeapons.has(String(item.id)))) {
      const translations = {};
      for (const lang of Object.keys(LANGUAGES)) {
        translations[lang] = (snapshot.datasets[`${folder}/${lang}`] || []).find(entry => item.id != null && String(entry.id) === String(item.id)) || null;
      }
      const related = {};
      if (folder === 'characters') for (const relatedFolder of ['talents', 'constellations']) {
        related[relatedFolder] = {};
        for (const lang of Object.keys(LANGUAGES)) {
          const translatedName = translations[lang]?.name;
          related[relatedFolder][lang] = (snapshot.datasets[`${relatedFolder}/${lang}`] || []).find(entry => normalize(translatedName) && normalize(entry.name) === normalize(translatedName)) || null;
        }
      }
      const refs = referencedMaterials({ translations, related }, knownMaterials);
      const costIds = costMaterialIds({ translations, related });
      for (const id of costIds) if (knownMaterials.has(id)) refs.add(id);
      const build = local.builds.find(build => Object.values(build.name || {}).some(name => normalize(name) === normalize(item.name)));
      dossiers.push({ folder, id: item.id ?? null, name: item.name, translations, related, materials: materials.filter(mat => refs.has(String(mat.id))), stats: snapshot.stats[`${folder}/${item.id}`] || null, statsSource: snapshot.statsSources?.[`${folder}/${item.id}`] || snapshot.source,
        integration: { build: build ? 'existing-review-required' : 'pending', materials: 'review-costs-and-sources', mechanics: 'manual-review', missingLanguages: Object.keys(LANGUAGES).filter(lang => !translations[lang]),
          missingMaterialIds: [...costIds].filter(id => !knownMaterials.has(id)),
          targetFiles: folder === 'characters' ? ['data_real_genshin.js', 'data_builds.js', 'i18n_dictionary.js', 'farming_engine.js', 'assets/data/simulator-original.json', 'assets/data/simulator-original.js', 'char_talent_boosts.json'] : ['data_real_genshin.js', 'data_builds.js', 'i18n_dictionary.js', 'farming_engine.js'] } });
    }
  }
  return { schemaVersion: 1, requestedVersion: snapshot.requestedVersion, collectedAt: snapshot.collectedAt,
    incomplete: snapshot.requests.some(request => request.status !== 'ok' && request.required !== false), expected, expectedWeapons, weaponsScopeDeclared: Array.isArray(manifest.expectedWeapons) || snapshot.preloadSources?.targetIdentified === true, comparisons, versionScope, dossiers,
    buildResearch: buildSources.research(snapshot, [...(manifest.expectedCharacters || []), ...dossiers.filter(item => item.folder === 'characters').map(item => item.translations.en?.name || item.name)]),
    preload: { stage: 'preload', sourceConflicts: snapshot.preloadSources?.conflicts || [], warnings: snapshot.preloadSources?.warnings || [], secondaryConsulted: !!snapshot.preloadSources },
    changes: changesSince(snapshot, previous), manualChecks: manifest.manualChecks || [], references: manifest.officialReferences || [] };
}

async function collectStats(snapshot, report, options, fetcher = fetch, log = console.log) {
  await pool(report.dossiers.filter(item => item.id != null), async item => {
    const key = `${item.folder}/${item.id}`;
    const english = item.translations.en?.name;
    const url = `${API}stats?${new URLSearchParams({ folder: item.folder, query: english || item.name, queryLanguages: english ? 'English' : 'Spanish', resultLanguage: 'English', matchExactOnly: 'true' })}`;
    const request = { key: `stats/${key}`, url, checkedAt: new Date().toISOString() };
    try {
      const stats = await requestJson(url, options, fetcher);
      if (!stats || typeof stats !== 'object' || Array.isArray(stats) || !Object.keys(stats).some(level => /^\d+\+?$/.test(level))) throw Error('Estadisticas ausentes o con formato inesperado.');
      snapshot.stats[key] = stats; (snapshot.statsSources ||= {})[key] = API; request.status = 'ok'; log(`OK stats/${key}`);
    } catch (error) { request.status = 'error'; request.error = error.message; log(`ERROR stats/${key}: ${error.message}`); }
    if (request.status === 'error' && snapshot.stats[key]) request.required = false;
    snapshot.requests.push(request);
  });
}

function markdown(report, snapshot) {
  const lines = [`# Preparacion de Spirifly ${report.requestedVersion}`, '', `Consulta: ${report.collectedAt}`, '',
    '**Etapa: predescarga. Los datos pueden cambiar antes del lanzamiento.**', '',
    '**Son candidatos para revision. La version solicitada es una etiqueta de trabajo: la API entrega su catalogo disponible, que puede ir atrasado o contener otras versiones.**', '',
    'No se modificaron los catalogos de la web. Builds, reacciones, costes y fuentes necesitan revision antes de integrar.', '',
    `Estado de descarga: ${report.incomplete ? 'INCOMPLETA (ver errores)' : 'consultas completadas; esto no confirma que la fuente tenga toda la version'}.`, '', '## Personajes esperados', ''];
  if (!report.expected.length) lines.push('Sin lista esperada. Se puede crear un manifiesto en 01_Actualizaciones/versiones para esta version.');
  for (const item of report.expected) lines.push(`- ${item.name}: ${item.status === 'available-in-source' ? 'disponible en la fuente' : 'pendiente en la fuente; no inventar datos'}.`);
  lines.push('', '## Archivos convertidos al formato de la web', '', 'Abrir formato_web/COBERTURA.md: contiene la cobertura por ficha y los pendientes. formato_web/archivos_web/ contiene copias preparadas de los archivos que usa Spirifly. No se aplicaron a local ni a produccion.', '', 'La falta de una guia especializada, un coste o una traduccion se marca como pendiente; no se completa por suposicion.');
  if (report.preload.sourceConflicts.length) lines.push('', 'Conflictos entre fuentes: revisar formato_web/COBERTURA.md antes de integrar.');
  lines.push('', '## Datos identificados como parte de esta version', '', 'Seleccion por el campo version de la fuente o por el registro de cambios de Yatta para esa version. Puede incluir fichas anteriores que recibieron cambios. Se incluyen aunque ya existan en la web. Los materiales de versiones anteriores necesarios para subirlos tambien se conservan en los expedientes.');
  for (const [folder, entries] of Object.entries(report.versionScope)) {
    lines.push('', `### ${folder}: ${entries.length}`, '');
    for (const item of entries) lines.push(`- ${item.name} (ID ${item.id ?? 'sin ID'}; estado local: ${item.localStatus}).`);
  }
  lines.push('', '<details>', '<summary>Auditoria adicional del catalogo completo: no son novedades de esta version</summary>', '', '## Otras diferencias con la web', '', 'Esta lista es informativa. Puede incluir Viajero, maniquies, armas de misiones, recursos antiguos y materiales ajenos al planificador; no se deben incorporar como novedades.');
  for (const [folder, entries] of Object.entries(report.comparisons)) {
    const candidates = entries.filter(item => item.status === 'candidate');
    const aliases = entries.filter(item => item.status === 'review-name-match');
    lines.push(`### ${folder}`, '', `${candidates.length} candidatos sin coincidencia; ${aliases.length} coincidencias por nombre que requieren revisar ID.`, '');
    for (const item of candidates) lines.push(`- ${item.name} (ID ${item.id ?? 'no disponible'})`);
    for (const item of aliases) lines.push(`- Revisar identidad: ${item.name} (remoto ${item.id ?? 'sin ID'}, local ${item.localId ?? 'sin ID'}).`);
  }
  lines.push('', '</details>', '', '## Expedientes de incorporacion', '', 'Los detalles completos, traducciones, costes originales, materiales relacionados y estadisticas estan en paquete.json.');
  for (const item of report.dossiers) lines.push('', `### ${item.name} (${item.folder})`, '', `- Traducciones pendientes: ${item.integration.missingLanguages.join(', ') || 'ninguna'}.`, `- Estadisticas descargadas: ${item.stats ? 'si' : 'no'}.`, `- Build: ${item.integration.build}.`, `- Materiales relacionados identificados: ${item.materials.length}. Revisar cantidades, jefe, dominio y dias.`, `- IDs de materiales sin ficha en la descarga: ${item.integration.missingMaterialIds.join(', ') || 'ninguno identificado'}.`, `- Archivos que revisar: ${item.integration.targetFiles.join(', ')}.`);
  lines.push('', '## Dominios, enemigos y artefactos', '', 'Catalogos completos en snapshot.json para revisar las fuentes de materiales, jefes y sets. No se asume que sean novedades de esta version.');
  lines.push('', '## Builds de fuentes especializadas', '', `Fuente principal: ${report.buildResearch.indexUrl}`, '',
    'Politica: usar guias especializadas de KQM para las recomendaciones. Los datos de habilidades no sustituyen una guia. Un enlace encontrado todavia requiere revisar contenido, version y fecha.',
    `Consulta del indice: ${report.buildResearch.status}.`);
  for (const item of report.buildResearch.characters) {
    lines.push('', `### ${item.character}`, '', item.guides.length ? 'Enlaces encontrados; build pendiente de validacion:' : item.status === 'not-queried-for-character' ? 'La descarga guardada no busco enlaces para este personaje. Repetir la consulta con conexion; no se puede concluir si existe una guia.' : 'Pendiente de guia especializada. No completar recomendaciones sin fuente.');
    for (const guide of item.guides) lines.push(`- ${guide.publisher}: ${guide.url} (version y fecha pendientes de revision).`);
    for (const check of item.requiredReview) lines.push(`- [ ] ${check}`);
  }
  lines.push('', '## Cambios desde la consulta anterior', '');
  if (!report.changes) lines.push('Sin consulta anterior comparable.');
  else for (const [key, changes] of Object.entries(report.changes)) {
    lines.push(`- ${key}: ${changes.added.length} agregados, ${changes.changed.length} modificados, ${changes.absent.length} ausentes (no se eliminan de la web).`);
    for (const item of changes.changed) lines.push(`  - Cambio de datos: ${item.name} (${item.id ?? 'sin ID'}).`);
  }
  lines.push('', '## Pendientes de revision', '');
  for (const check of [...report.manualChecks, 'Revisar este informe antes de incorporar datos a la web local; despues ejecutar las pruebas y comprobar la web local.', 'Mantener los IDs existentes para conservar los planes guardados.']) lines.push(`- [ ] ${check}`);
  lines.push('', '## Fuentes y errores', '');
  for (const reference of report.references) lines.push(`- Referencia oficial: ${reference}`);
  for (const request of snapshot.requests) lines.push(`- ${request.status.toUpperCase()} ${request.key}: ${request.url}${request.error ? ` — ${request.error}` : ''}`);
  return `${lines.join('\n')}\n`;
}

function validateSnapshot(snapshot, version) {
  if (snapshot.schemaVersion !== 1 || snapshot.requestedVersion !== version || snapshot.source !== API || !snapshot.datasets || !Array.isArray(snapshot.requests) || !snapshot.stats) throw Error('Snapshot incompatible con la version o la fuente solicitada.');
  for (const items of Object.values(snapshot.datasets)) validateDataset(items);
  return snapshot;
}

function previousSnapshot(output, version) {
  if (!fs.existsSync(output)) return null;
  const dirs = fs.readdirSync(output, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name).sort().reverse();
  for (const dir of dirs) {
    try {
      const snapshot = validateSnapshot(JSON.parse(fs.readFileSync(path.join(output, dir, 'snapshot.json'), 'utf8')), version);
      if (Object.keys(snapshot.datasets).length) return snapshot;
    } catch { /* Una consulta interrumpida no debe bloquear la siguiente. */ }
  }
  return null;
}

async function main(args = process.argv.slice(2)) {
  if (!args.length) {
    const readline = require('node:readline/promises').createInterface({ input: process.stdin, output: process.stdout });
    try {
      const version = (await readline.question('Version que quieres preparar (ejemplo 7.2): ')).trim();
      args = ['--version', version];
    } finally { readline.close(); }
  }
  const options = parseArgs(args);
  if (options.help) {
    console.log('node 01_Actualizaciones/version-pipeline.cjs --version 7.2 [--languages es,en,pt,ja,ko] [--from ruta/snapshot.json] [--output carpeta]\nCada consulta crea una carpeta nueva; no cambia la web ni publica. --from vuelve a analizar sin descargar.');
    return;
  }
  const manifestFile = path.join(__dirname, 'versiones', `${options.version}.json`);
  const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : { version: options.version };
  const output = path.resolve(options.output || path.join(ROOT, 'downloads', 'versiones', options.version));
  const previous = previousSnapshot(output, options.version);
  const local = loadLocal();
  console.log(`Preparando version ${options.version}. Fuente comunitaria: ${API}\nNo se modifica ni publica la web.`);
  const snapshot = options.from ? validateSnapshot(JSON.parse(fs.readFileSync(path.resolve(options.from), 'utf8')), options.version) : await collect(options);
  if (options.from && snapshot.preloadSources?.raw) {
    console.log('Reprocesando las respuestas guardadas de predescarga, sin consultar internet.');
    await preloadSources.replay(snapshot, manifest, local, options, () => {});
  }
  if (!options.from) {
    await preloadSources.collect(snapshot, manifest, local, options, requestJson);
    const initialReport = createReport(snapshot, local, manifest);
    await collectStats(snapshot, initialReport, options);
    await buildSources.collectGuides(snapshot, initialReport.buildResearch.characters.map(item => item.character), options);
  }
  const report = createReport(snapshot, local, manifest, previous);
  const reviewedBuildsFile = path.join(__dirname, 'versiones', `${options.version}.builds.json`);
  const reviewedBuilds = fs.existsSync(reviewedBuildsFile) ? JSON.parse(fs.readFileSync(reviewedBuildsFile, 'utf8')) : { entries: [] };
  const webPackage = webFormat.compile(snapshot, report, local, reviewedBuilds);
  const staged = webFormat.stageFiles(ROOT, webPackage, local);
  const directory = path.join(output, `${new Date().toISOString().replace(/[:.]/g, '-')}-${crypto.randomBytes(3).toString('hex')}`);
  fs.mkdirSync(directory, { recursive: true });
  const webDirectory = path.join(directory, 'formato_web');
  const filesDirectory = path.join(webDirectory, 'archivos_web');
  for (const [file, content] of Object.entries(staged.files)) {
    const destination = path.join(filesDirectory, file);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, content, { encoding: 'utf8', flag: 'wx' });
  }
  webPackage.checks = stageVerifier.verify(ROOT, filesDirectory);
  for (const check of webPackage.checks.filter(check => check.status !== 'passed')) webPackage.blockers.push(`Fallo la prueba del paquete web: ${check.name}.`);
  webFormat.updateStatus(webPackage);
  for (const [file, content] of Object.entries({
    'paquete_web.json': JSON.stringify(webPackage, null, 2),
    'COBERTURA.md': webFormat.coverageMarkdown(webPackage),
    'FICHAS.md': webFormat.factsMarkdown(webPackage, snapshot),
    'REVISION_BUILDS.json': JSON.stringify(webFormat.buildReviewTemplate(report, local), null, 2),
    'INTEGRACION.json': JSON.stringify({ schemaVersion: 1, version: options.version, stage: 'preload', status: webPackage.status, reviewed: false, baseHashes: staged.baseHashes, checks: webPackage.checks, instruction: 'Revisar el paquete, comprobar hashes y aplicar en local solo despues de revision. No publica.' }, null, 2)
  })) fs.writeFileSync(path.join(webDirectory, file), content, { encoding: 'utf8', flag: 'wx' });
  for (const [name, content] of Object.entries({ 'snapshot.json': JSON.stringify(snapshot, null, 2), 'paquete.json': JSON.stringify(report, null, 2), 'LEER_PRIMERO.md': markdown(report, snapshot) })) {
    fs.writeFileSync(path.join(directory, name), content, { encoding: 'utf8', flag: 'wx' });
  }
  console.log(`\nResultado: ${directory}\nAbre LEER_PRIMERO.md y formato_web/COBERTURA.md. Las copias convertidas estan en formato_web/archivos_web/. Estado: ${webPackage.status}.\nDatos del juego: ${webPackage.dataStatus}. Builds: ${webPackage.buildStatus}.`);
  if (webPackage.status === 'incomplete' || report.incomplete || report.expected.some(item => item.status === 'pending-in-source')) {
    console.log('El paquete tiene pendientes o conflictos. Revisa formato_web/COBERTURA.md. Se conservan los resultados anteriores.');
    process.exitCode = 2;
  }
  return { directory, report, snapshot, webPackage };
}

module.exports = { parseArgs, loadLocal, validateDataset, requestJson, collect, compare, changesSince, createReport, collectStats, markdown, validateSnapshot, main, API, FOLDERS, LANGUAGES };
if (require.main === module) main().catch(error => { console.error(`ERROR: ${error.stack || error.message}`); process.exitCode = 1; });
