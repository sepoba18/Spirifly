/**
 * Teyvat Companion Pro - Motor Matemático y Almacén del Contador de Deseos
 * Basado en la Especificación Maestra de Ingeniería Inversa (Genshin 5.x)
 * Estándar UIGF v4.0 + Capturing Radiance + Senda Divina (1 Punto)
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.WishEngine = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // 1. Constantes y Mapeo Oficial de Banners
  const GACHA_TYPES = {
    NOVICE: '100',
    STANDARD: '200',
    CHARACTER_1: '301',
    WEAPON: '302',
    CHARACTER_2: '400',
    CHRONICLED: '500'
  };

  const BANNER_KEYS = {
    '100': 'novice',
    '200': 'standard',
    '301': 'character',
    '400': 'character', // Comparte pity con 301
    '302': 'weapon',
    '500': 'chronicled'
  };

  // Personajes 5★ de Banner Permanente (actualizado con Tighnari, Dehya y Yumemizuki Mizuki)
  const STANDARD_5STAR_CHARACTERS = new Set([
    'Jean',
    'Diluc',
    'Mona',
    'Qiqi',
    'Keqing',
    'Keching',
    'Tighnari',
    'Tignari',
    'Dehya',
    'Yumemizuki Mizuki',
    'Mizuki',
    'Mizuki Yumemizuki'
  ]);

  /**
   * Determina de manera robusta si un personaje pertenece al banner estándar permanente (pérdida del 50/50)
   */
  function isStandard5StarCharacter(name) {
    if (!name) return false;
    const clean = String(name).trim();
    if (STANDARD_5STAR_CHARACTERS.has(clean)) return true;
    const lower = clean.toLowerCase();
    for (const std of STANDARD_5STAR_CHARACTERS) {
      if (std.toLowerCase() === lower) return true;
    }
    if (lower.includes('mizuki') || lower.includes('yumemizuki')) return true;
    if (lower.includes('tighnari') || lower.includes('tignari')) return true;
    if (lower.includes('keqing') || lower.includes('keching')) return true;
    if (lower === 'dehya') return true;
    if (lower === 'jean') return true;
    if (lower === 'diluc') return true;
    if (lower === 'mona') return true;
    if (lower === 'qiqi') return true;
    return false;
  }

  // Armas 5★ de Banner Permanente
  const STANDARD_5STAR_WEAPONS = new Set([
    'Aquila Favonia', 'Halcón de Jade', 'Espada Celestial', 'Skyward Blade',
    'Wolf\'s Gravestone', 'Lápida del Lobo', 'Orgullo Celestial', 'Skyward Pride',
    'Primordial Jade Winged-Spear', 'Halcón de Jade (Lanza)', 'Púa Celestial', 'Skyward Spine',
    'Lost Prayer to the Sacred Winds', 'Oración Perdida a los Vientos Sagrados', 'Atlas Celestial', 'Skyward Atlas',
    'Amos\' Bow', 'Arco de Amos', 'Alas Celestiales', 'Skyward Harp'
  ]);

  // Configuración de Pity por categoría
  const PITY_CONFIG = {
    character: {
      softPity: 74,
      hardPity: 90,
      baseRate5: 0.006, // 0.6%
      softRateInc5: 0.06, // +6% por tirada
      baseRate4: 0.051, // 5.1%
      softPity4: 9,
      hardPity4: 10,
      winRate5050Effective: 0.55 // Con Capturing Radiance 5.0+
    },
    weapon: {
      softPity: 63,
      hardPity: 80,
      baseRate5: 0.007, // 0.7%
      softRateInc5: 0.07, // +7% por tirada
      baseRate4: 0.060, // 6.0%
      softPity4: 8,
      hardPity4: 10,
      maxFatePoints: 1 // Actualizado 5.0+: Solo 1 punto de destino
    },
    standard: {
      softPity: 74,
      hardPity: 90,
      baseRate5: 0.006,
      softRateInc5: 0.06,
      baseRate4: 0.051,
      softPity4: 9,
      hardPity4: 10
    },
    chronicled: {
      softPity: 74,
      hardPity: 90,
      baseRate5: 0.006,
      softRateInc5: 0.06,
      baseRate4: 0.051,
      softPity4: 9,
      hardPity4: 10,
      maxFatePoints: 1
    }
  };

  /**
   * Ordena cronológicamente los deseos (de más antiguo a más reciente).
   * Usa timestamp 'time' ASC y como desempate 'id' numérico ASC.
   */
  function sortWishesAscending(wishes) {
    return [...wishes].sort(function (a, b) {
      const timeDiff = (a.time || '').localeCompare(b.time || '');
      if (timeDiff !== 0) return timeDiff;
      // Comparar IDs numéricamente para evitar desorden en tiradas múltiples de 10
      const idA = a.id || '0';
      const idB = b.id || '0';
      if (idA.length !== idB.length) {
        return idA.length - idB.length;
      }
      return idA.localeCompare(idB);
    });
  }

  /**
   * Procesa el historial de un banner específico calculando pity de 5★ y 4★,
   * detección de 50/50, garantía previa y Capturing Radiance (5.0+).
   * @param {Array} rawWishes - Lista de deseos crudos (RawWishItem)
   * @param {string} bannerKey - 'character', 'weapon', 'standard' o 'chronicled'
   * @returns {Object} { processedList: Array, stats: Object }
   */
  function processBannerPity(rawWishes, bannerKey) {
    const config = PITY_CONFIG[bannerKey] || PITY_CONFIG.character;
    const sorted = sortWishesAscending(rawWishes);

    let currentPity5 = 0;
    let currentPity4 = 0;
    let isGuaranteed = false;
    let fatePoints = 0;

    let won5050Count = 0;
    let lost5050Count = 0;
    let guaranteed5Count = 0;
    let capturingRadianceCount = 0;

    let won7525Count = 0;
    let lost7525Count = 0;

    const fiveStarList = [];
    const fourStarList = [];
    const monthlyStats = {};
    const luckBuckets = { early: 0, mid: 0, soft: 0, hard: 0 };

    const processedList = [];

    for (let i = 0; i < sorted.length; i++) {
      const wish = sorted[i];
      currentPity5++;
      currentPity4++;

      const rank = String(wish.rank_type || '3');
      const itemType = wish.item_type || (rank === '5' && STANDARD_5STAR_WEAPONS.has(wish.name) ? 'Arma' : 'Personaje');
      const monthKey = /^\d{4}-(0[1-9]|1[0-2])(?:-|$)/.test(wish.time || '') ? wish.time.substring(0, 7) : null;

      if (monthKey && !monthlyStats[monthKey]) {
        monthlyStats[monthKey] = { month: monthKey, pulls: 0, star5: 0, star4: 0, star3: 0 };
      }
      if (monthKey) monthlyStats[monthKey].pulls++;

      const item = {
        id: wish.id || String(Date.now() + i),
        uid: wish.uid || '',
        gacha_type: wish.gacha_type || '301',
        time: wish.time || '',
        name: wish.name || 'Desconocido',
        lang: wish.lang || 'es-es',
        item_type: itemType,
        rank_type: rank,
        pity: currentPity5,
        pity4: currentPity4,
        isWon5050: null,
        isGuaranteed: false,
        isCapturingRadiance: false,
        isWon7525: null
      };

      if (rank === '3') {
        if (monthKey) monthlyStats[monthKey].star3++;
      } else if (rank === '4') {
        if (monthKey) monthlyStats[monthKey].star4++;
        item.pity = null; // En la vista de tabla, pity principal se enfoca en 5★
        item.pity4 = currentPity4;
        fourStarList.push({
          name: item.name,
          pity: currentPity4,
          item_type: itemType,
          time: item.time
        });
        currentPity4 = 0; // Reseteo de pity 4★
      } else if (rank === '5') {
        if (monthKey) monthlyStats[monthKey].star5++;
        const pityHit = currentPity5;
        item.pity = pityHit;

        // Histograma de suerte
        if (bannerKey === 'weapon') {
          if (pityHit <= 30) luckBuckets.early++;
          else if (pityHit <= 62) luckBuckets.mid++;
          else if (pityHit <= 73) luckBuckets.soft++;
          else luckBuckets.hard++;
        } else {
          if (pityHit <= 30) luckBuckets.early++;
          else if (pityHit <= 73) luckBuckets.mid++;
          else if (pityHit <= 82) luckBuckets.soft++;
          else luckBuckets.hard++;
        }

        // Lógica de 50/50 y Garantizado para Personajes
        if (bannerKey === 'character') {
          const isStandardChar = isStandard5StarCharacter(item.name);
          const isPromo = !isStandardChar;

          if (isGuaranteed) {
            item.isGuaranteed = true;
            item.isWon5050 = null; // No era 50/50, era 100% garantizado
            guaranteed5Count++;
            isGuaranteed = false; // Se consumió la garantía
          } else {
            item.isGuaranteed = false;
            if (isPromo) {
              item.isWon5050 = true;
              won5050Count++;
              // Verificamos si vino etiquetado como Capturing Radiance (Genshin 5.0+)
              if (wish.is_capturing_radiance || wish.isCapturingRadiance) {
                item.isCapturingRadiance = true;
                capturingRadianceCount++;
              }
              isGuaranteed = false;
            } else {
              item.isWon5050 = false;
              lost5050Count++;
              isGuaranteed = true; // Próximo 5★ queda 100% asegurado
            }
          }
        } else if (bannerKey === 'weapon') {
          // Lógica de Armas (75/25 y Senda Divina de 1 punto en 5.0+)
          const isStandardWeap = STANDARD_5STAR_WEAPONS.has(item.name);
          const isPromoWeap = !isStandardWeap;

          // La Senda elegida no figura en el historial; solo inferimos el 75/25.
          if (isGuaranteed) {
            item.isGuaranteed = true;
            item.isWon7525 = null;
            isGuaranteed = false;
          } else {
            if (isPromoWeap) {
              item.isWon7525 = true;
              won7525Count++;
              isGuaranteed = false;
            } else {
              item.isWon7525 = false;
              lost7525Count++;
              isGuaranteed = true;

            }
          }
        }

        fiveStarList.push({
          name: item.name,
          pity: pityHit,
          time: item.time,
          isWon5050: item.isWon5050,
          isGuaranteed: item.isGuaranteed,
          isCapturingRadiance: item.isCapturingRadiance,
          isWon7525: item.isWon7525
        });

        currentPity5 = 0; // Reseteo de pity 5★
      }

      processedList.push(item);
    }

    // Calcular estadísticas globales del banner
    const totalPulls = sorted.length;
    const total5050 = won5050Count + lost5050Count;
    const win5050Pct = total5050 > 0 ? ((won5050Count / total5050) * 100).toFixed(1) : '0.0';

    const total7525 = won7525Count + lost7525Count;
    const win7525Pct = total7525 > 0 ? ((won7525Count / total7525) * 100).toFixed(1) : '0.0';

    const total5PitySum = fiveStarList.reduce(function (sum, h) { return sum + h.pity; }, 0);
    const avg5Pity = fiveStarList.length > 0 ? (total5PitySum / fiveStarList.length).toFixed(1) : '0.0';

    const total4PitySum = fourStarList.reduce(function (sum, h) { return sum + h.pity; }, 0);
    const avg4Pity = fourStarList.length > 0 ? (total4PitySum / fourStarList.length).toFixed(1) : '0.0';

    const fourStarCharCount = fourStarList.filter(function (f) { return f.item_type === 'Personaje'; }).length;
    const fourStarWeapCount = fourStarList.filter(function (f) { return f.item_type === 'Arma'; }).length;

    // Calcular probabilidad acumulada para el siguiente 5★
    const nextPullProb = calculateProbAtPity(currentPity5 + 1, config);
    const pullsToSoft = Math.max(0, config.softPity - currentPity5);
    const pullsToHard = Math.max(0, config.hardPity - currentPity5);

    const stats = {
      bannerKey: bannerKey,
      totalPulls: totalPulls,
      currentPity5: currentPity5,
      currentPity4: currentPity4,
      isGuaranteed: isGuaranteed,
      fatePoints: fatePoints,
      pullsToSoft: pullsToSoft,
      pullsToHard: pullsToHard,
      nextPullProb: (nextPullProb * 100).toFixed(2),
      fiveStarsCount: fiveStarList.length,
      fourStarsCount: fourStarList.length,
      fourStarCharCount: fourStarCharCount,
      fourStarWeapCount: fourStarWeapCount,
      avg5Pity: avg5Pity,
      avg4Pity: avg4Pity,
      won5050Count: won5050Count,
      lost5050Count: lost5050Count,
      guaranteed5Count: guaranteed5Count,
      capturingRadianceCount: capturingRadianceCount,
      win5050Pct: win5050Pct,
      won7525Count: won7525Count,
      lost7525Count: lost7525Count,
      win7525Pct: win7525Pct,
      primoCost: totalPulls * 160,
      luckBuckets: luckBuckets,
      fiveStarHistory: [...fiveStarList].reverse(), // Más recientes primero para la UI
      monthlyChart: Object.values(monthlyStats).sort(function (a, b) { return a.month.localeCompare(b.month); })
    };

    return {
      // Devolvemos la lista en orden cronológico inverso (el más reciente arriba) para la tabla UI
      processedList: [...processedList].reverse(),
      stats: stats
    };
  }

  /**
   * Calcula la probabilidad puntual de sacar 5★ en la tirada número N
   */
  function calculateProbAtPity(pullNumber, config) {
    if (pullNumber >= config.hardPity) return 1.0;
    if (pullNumber < config.softPity) return config.baseRate5;
    // Crecimiento lineal en Soft Pity
    return Math.min(1.0, config.baseRate5 + config.softRateInc5 * (pullNumber - config.softPity + 1));
  }

  /**
   * Simulación probabilística acumulada:
   * Calcula la probabilidad de conseguir al menos un 5★ con K tiradas adicionales partiendo de pity actual.
   */
  function calculateCumulativeChance(currentPity, additionalPulls, bannerKey) {
    const config = PITY_CONFIG[bannerKey] || PITY_CONFIG.character;
    let probMissAll = 1.0;
    for (let i = 1; i <= additionalPulls; i++) {
      const p = calculateProbAtPity(currentPity + i, config);
      probMissAll *= (1.0 - p);
      if (currentPity + i >= config.hardPity) {
        probMissAll = 0.0;
        break;
      }
    }
    return Math.min(1.0, Math.max(0.0, 1.0 - probMissAll));
  }

  /**
   * Clasifica todos los deseos crudos en los 4 banners principales
   */
  function categorizeWishes(wishes) {
    const categorized = {
      character: [],
      weapon: [],
      standard: [],
      chronicled: []
    };

    for (let i = 0; i < wishes.length; i++) {
      const w = wishes[i];
      const gType = String(w.gacha_type || '301');
      if (gType === '301' || gType === '400') {
        categorized.character.push(w);
      } else if (gType === '302') {
        categorized.weapon.push(w);
      } else if (gType === '200' || gType === '100') {
        categorized.standard.push(w);
      } else if (gType === '500') {
        categorized.chronicled.push(w);
      } else {
        categorized.character.push(w);
      }
    }

    return categorized;
  }

  /**
   * Procesa todo el historial del usuario devolviendo estadísticas consolidadas
   */
  function processFullHistory(allWishes) {
    const categorized = categorizeWishes(allWishes);
    const charData = processBannerPity(categorized.character, 'character');
    const weapData = processBannerPity(categorized.weapon, 'weapon');
    const stdData = processBannerPity(categorized.standard, 'standard');
    const chrData = processBannerPity(categorized.chronicled, 'chronicled');

    const totalPullsAll = charData.stats.totalPulls + weapData.stats.totalPulls + stdData.stats.totalPulls + chrData.stats.totalPulls;
    const totalPrimosAll = totalPullsAll * 160;

    return {
      character: charData,
      weapon: weapData,
      standard: stdData,
      chronicled: chrData,
      summary: {
        totalPullsAll: totalPullsAll,
        totalPrimosAll: totalPrimosAll,
        total5StarsAll: charData.stats.fiveStarsCount + weapData.stats.fiveStarsCount + stdData.stats.fiveStarsCount + chrData.stats.fiveStarsCount,
        total4StarsAll: charData.stats.fourStarsCount + weapData.stats.fourStarsCount + stdData.stats.fourStarsCount + chrData.stats.fourStarsCount
      }
    };
  }

  // =========================================================================
  // 2. PARSER Y SERIALIZADOR ESTÁNDAR UNIVERSAL UIGF v4.0
  // =========================================================================

  /**
   * Exporta toda la base de datos de deseos en formato JSON compatible con UIGF v4.0
   */
  function exportToUIGF(allWishes, uid, lang) {
    const sorted = sortWishesAscending(allWishes);
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const uigfJson = {
      info: {
        uid: uid || (sorted.length > 0 ? sorted[0].uid : '000000000'),
        lang: lang || 'es-es',
        export_time: nowStr,
        export_app: 'Teyvat Companion Pro',
        export_app_version: 'v2.5.0',
        uigf_version: 'v4.0'
      },
      list: sorted.map(function (w) {
        return {
          uid: w.uid || uid || '',
          gacha_type: String(w.gacha_type || '301'),
          item_id: w.item_id || '',
          count: String(w.count || '1'),
          time: w.time || '',
          name: w.name || '',
          lang: w.lang || lang || 'es-es',
          item_type: w.item_type || 'Personaje',
          rank_type: String(w.rank_type || '3'),
          id: String(w.id || '')
        };
      })
    };

    return uigfJson;
  }

  /**
   * Importa cualquier formato de JSON (UIGF v4.0, v3.0, Paimon.moe, Seelie o Teyvat Backup)
   * y devuelve una lista normalizada de RawWishItem sin duplicados.
   */
  function importFromUniversalJSON(jsonContent) {
    let parsed;
    if (typeof jsonContent === 'string') {
      try {
        const cleanContent = jsonContent.charCodeAt(0) === 0xFEFF ? jsonContent.slice(1) : jsonContent;
        parsed = JSON.parse(cleanContent);
      } catch (e) {
        // Fallback inteligente: Si no es JSON pero contiene estructura tabular/CSV de Paimon.moe
        if (jsonContent.includes('Type,Name') || jsonContent.includes('Paimon.moe') || jsonContent.includes('Weapon,') || jsonContent.includes('Character,')) {
          return importFromPaimonMoeCSV(jsonContent);
        }
        throw new Error('El archivo no contiene un JSON ni CSV válido: ' + e.message);
      }
    } else {
      parsed = jsonContent;
    }

    const rawList = [];

    // Caso A: Estándar UIGF (v4.0, v3.0, v2.2)
    if (parsed && Array.isArray(parsed.list)) {
      const defaultUid = (parsed.info && parsed.info.uid) ? parsed.info.uid : '';
      for (let i = 0; i < parsed.list.length; i++) {
        const item = parsed.list[i];
        rawList.push(normalizeWishItem(item, defaultUid));
      }
    }
    // Caso B: Formato de Paimon.moe (objeto con claves character, weapon, standard)
    else if (parsed && (parsed.character || parsed.weapon || parsed.standard || parsed.chronicled)) {
      const banners = ['character', 'weapon', 'standard', 'chronicled'];
      const defaultGacha = { character: '301', weapon: '302', standard: '200', chronicled: '500' };

      banners.forEach(function (bKey) {
        const bData = parsed[bKey];
        if (bData && Array.isArray(bData.list)) {
          bData.list.forEach(function (item) {
            rawList.push(normalizeWishItem(item, '', defaultGacha[bKey]));
          });
        } else if (bData && Array.isArray(bData.history5)) {
          // Backup simplificado de Paimon.moe
          bData.history5.forEach(function (h, idx) {
            rawList.push({
              uid: parsed.uid || '',
              gacha_type: defaultGacha[bKey],
              item_id: '',
              count: '1',
              time: h.time || '2026-01-01 00:00:00',
              name: h.name,
              lang: 'es-es',
              item_type: STANDARD_5STAR_WEAPONS.has(h.name) ? 'Arma' : 'Personaje',
              rank_type: '5',
              id: 'imp_' + bKey + '_' + (Date.now() + idx)
            });
          });
        }
      });
    }
    // Caso C: Array directo de deseos
    else if (Array.isArray(parsed)) {
      parsed.forEach(function (item) {
        rawList.push(normalizeWishItem(item, ''));
      });
    }
    // Caso D: Backup global con propiedad 'allWishes' o 'wishData'
    else if (parsed && parsed.allWishes && Array.isArray(parsed.allWishes)) {
      parsed.allWishes.forEach(function (item) {
        rawList.push(normalizeWishItem(item, ''));
      });
    } else {
      throw new Error('Formato de deseos desconocido. Asegúrate de que sea un archivo UIGF v4.0, Excel o CSV de historial.');
    }

    // Filtrar y eliminar duplicados por 'id'
    return deduplicateWishes(rawList);
  }

  /**
   * Importa desde un archivo Excel (.xlsx o .xls) exportado por Paimon.moe
   * Requiere SheetJS (window.XLSX en navegador o require('./xlsx.full.min.js') en Node)
   */
  function importFromPaimonMoeXLSX(data) {
    const XLSXLib = typeof window !== 'undefined' && window.XLSX
      ? window.XLSX
      : (typeof require !== 'undefined' ? (function() { try { return require('./xlsx.full.min.js'); } catch(e) { return null; } })() : null);

    if (!XLSXLib) {
      throw new Error('La librería SheetJS (XLSX) no está cargada. Asegúrate de incluir xlsx.full.min.js.');
    }

    let workbook;
    if (data && data.SheetNames) {
      workbook = data;
    } else if (data instanceof ArrayBuffer) {
      workbook = XLSXLib.read(new Uint8Array(data), { type: 'array' });
    } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer && Buffer.isBuffer(data)) {
      workbook = XLSXLib.read(data, { type: 'buffer' });
    } else {
      workbook = XLSXLib.read(data, { type: 'binary' });
    }

    const rawList = [];

    workbook.SheetNames.forEach(function (sheetName) {
      const lower = sheetName.toLowerCase();
      let defaultGacha = null;
      if (lower.includes('character') || lower.includes('personaje')) defaultGacha = '301';
      else if (lower.includes('weapon') || lower.includes('arma')) defaultGacha = '302';
      else if (lower.includes('standard') || lower.includes('estándar') || lower.includes('permanente')) defaultGacha = '200';
      else if (lower.includes('beginner') || lower.includes('principiante')) defaultGacha = '100';
      else if (lower.includes('chronicled') || lower.includes('crónica')) defaultGacha = '500';

      if (!defaultGacha) return; // Omitir 'Banner List' o 'Information'

      const ws = workbook.Sheets[sheetName];
      const rows = XLSXLib.utils.sheet_to_json(ws);

      rows.forEach(function (r, idx) {
        const itemType = (r.Type && String(r.Type).toLowerCase() === 'character') ? 'Personaje' : 'Arma';
        const rank = String(r['⭐'] || r.Rarity || r.Rank || '3');
        const name = String(r.Name || '').trim();
        const time = String(r.Time || '').trim();
        const banner = String(r.Banner || '').trim();
        const rollNum = String(r['#Roll'] || (idx + 1)).trim();

        if (!name) return;

        let gacha = defaultGacha;
        // Verificación complementaria por nombre de banner
        if (banner === 'Epitome Invocation') gacha = '302';
        else if (banner === 'Wanderlust Invocation') gacha = '200';
        else if (banner === "Beginners' Wish") gacha = '100';

        const cleanTime = time.replace(/[^0-9]/g, '');
        const id = 'pm_' + gacha + '_' + cleanTime + '_' + rollNum + '_' + idx;

        rawList.push({
          uid: 'Spirifly_User',
          gacha_type: gacha,
          item_id: '',
          count: '1',
          time: time,
          name: name,
          lang: 'es-es',
          item_type: itemType,
          rank_type: rank,
          id: id
        });
      });
    });

    return deduplicateWishes(sortWishesAscending(rawList));
  }

  /**
   * Importa desde texto CSV o copiado directamente de Paimon.moe
   */
  function importFromPaimonMoeCSV(csvText) {
    if (!csvText || typeof csvText !== 'string') return [];
    const lines = csvText.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(function (l) { return l.length > 0; });
    const rawList = [];

    let headerIndices = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Detección de fila de encabezados
      if (line.includes('Type') && line.includes('Name') && line.includes('Time')) {
        const cols = line.split(',').map(function (c) { return c.trim().replace(/^"|"$/g, ''); });
        headerIndices = {
          type: cols.indexOf('Type'),
          name: cols.indexOf('Name'),
          time: cols.indexOf('Time'),
          rank: cols.findIndex(function (c) { return c.includes('⭐') || c.toLowerCase().includes('rarity') || c.toLowerCase().includes('rank'); }),
          pity: cols.indexOf('Pity'),
          roll: cols.indexOf('#Roll'),
          banner: cols.indexOf('Banner')
        };
        continue;
      }

      if (!headerIndices) continue;

      if (line.startsWith('Name,Start,End') || line.startsWith('Paimon.moe') || line.startsWith('Version,')) {
        headerIndices = null;
        continue;
      }

      // Parser CSV considerando comillas
      const cols = [];
      let inQuote = false;
      let curr = '';
      for (let c = 0; c < line.length; c++) {
        const char = line[c];
        if (char === '"') {
          inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
          cols.push(curr.trim());
          curr = '';
        } else {
          curr += char;
        }
      }
      cols.push(curr.trim());

      if (cols.length < 3) continue;

      const typeVal = headerIndices.type >= 0 ? cols[headerIndices.type] : 'Weapon';
      const nameVal = headerIndices.name >= 0 ? cols[headerIndices.name] : '';
      const timeVal = headerIndices.time >= 0 ? cols[headerIndices.time] : '';
      const rankVal = headerIndices.rank >= 0 ? cols[headerIndices.rank] : '3';
      const rollVal = headerIndices.roll >= 0 ? cols[headerIndices.roll] : String(i);
      const bannerVal = headerIndices.banner >= 0 ? cols[headerIndices.banner] : '';

      if (!nameVal || !timeVal) continue;

      let gacha = '301';
      if (bannerVal === 'Epitome Invocation') {
        gacha = '302';
      } else if (bannerVal === 'Wanderlust Invocation') {
        gacha = '200';
      } else if (bannerVal === "Beginners' Wish") {
        gacha = '100';
      } else if (['Ode to the Dawn Breeze', 'Remembrance of Jade and Stone', 'Thunder Rends the Plains on High', 'Roving Chalice of Dewgrass', 'Dewlit Tranquility', 'Heavenlit Prophecy'].includes(bannerVal)) {
        gacha = '500';
      } else {
        gacha = '301';
      }

      const itemType = (typeVal && typeVal.toLowerCase() === 'character') ? 'Personaje' : 'Arma';
      const cleanTime = timeVal.replace(/[^0-9]/g, '');
      const id = 'csv_' + gacha + '_' + cleanTime + '_' + rollVal + '_' + i;

      rawList.push({
        uid: 'Spirifly_User',
        gacha_type: gacha,
        item_id: '',
        count: '1',
        time: timeVal,
        name: nameVal,
        lang: 'es-es',
        item_type: itemType,
        rank_type: rankVal,
        id: id
      });
    }

    return deduplicateWishes(sortWishesAscending(rawList));
  }

  function normalizeWishItem(item, fallbackUid, fallbackGachaType) {
    return {
      uid: String(item.uid || fallbackUid || ''),
      gacha_type: String(item.gacha_type || fallbackGachaType || '301'),
      item_id: String(item.item_id || ''),
      count: String(item.count || '1'),
      time: String(item.time || ''),
      name: String(item.name || 'Desconocido'),
      lang: String(item.lang || 'es-es'),
      item_type: item.item_type || (String(item.rank_type) === '5' && STANDARD_5STAR_WEAPONS.has(item.name) ? 'Arma' : 'Personaje'),
      rank_type: String(item.rank_type || '3'),
      id: String(item.id || ('gen_' + Math.random().toString(36).substring(2, 11)))
    };
  }

  // Diccionario canónico para normalización entre traducciones (ES <-> EN)
  const NAME_CANON_MAP = {
    // Armas 3★ comunes
    'debate club': 'garrote del debate',
    'garrote del debate': 'garrote del debate',
    'cool steel': 'hoja fria',
    'hoja fria': 'hoja fria',
    'harbinger of dawn': 'espada del alba',
    'espada del alba': 'espada del alba',
    'magic guide': 'guia magica',
    'guia magica': 'guia magica',
    'thrilling tales of dragon slayers': 'cuentos de cazadores de dragones',
    'cuentos de cazadores de dragones': 'cuentos de cazadores de dragones',
    'emerald orb': 'orbe esmeralda',
    'orbe esmeralda': 'orbe esmeralda',
    'black tassel': 'borla negra',
    'borla negra': 'borla negra',
    'bloodtainted greatsword': 'gran espada sangrienta',
    'gran espada sangrienta': 'gran espada sangrienta',
    'ferrous shadow': 'sombra ferrea',
    'sombra ferrea': 'sombra ferrea',
    'skyrider sword': 'espada surcacielos',
    'espada de jinete del viento': 'espada surcacielos',
    'espada surcacielos': 'espada surcacielos',
    'raven bow': 'arco de cuervo',
    'arco del cuervo': 'arco de cuervo',
    'arco de cuervo': 'arco de cuervo',
    'sharpshooter\'s oath': 'juramento del arquero',
    'sharpshooters oath': 'juramento del arquero',
    'juramento del arquero': 'juramento del arquero',
    'slingshot': 'tirachinas',
    'tirachinas': 'tirachinas',

    // Armas 4★
    'the stringless': 'ultimo acorde',
    'ultimo acorde': 'ultimo acorde',
    'sacrificial fragments': 'memorias de sacrificios',
    'memorias de sacrificios': 'memorias de sacrificios',
    'favonius codex': 'codice de favonius',
    'codice de favonius': 'codice de favonius',
    'lion\'s roar': 'rugido del leon',
    'lions roar': 'rugido del leon',
    'rugido del leon': 'rugido del leon',
    'eye of perception': 'ojo de la perspicacia',
    'ojo de la perspicacia': 'ojo de la perspicacia',
    'sacrificial bow': 'arco del sacrificio',
    'arco del sacrificio': 'arco del sacrificio',
    'favonius lance': 'lanza de favonius',
    'lanza de favonius': 'lanza de favonius',
    'dragon\'s bane': 'perdicion del dragon',
    'dragons bane': 'perdicion del dragon',
    'perdicion del dragon': 'perdicion del dragon',
    'favonius sword': 'espada de favonius',
    'espada de favonius': 'espada de favonius',
    'rainslasher': 'segadora de la lluvia',
    'segadora de la lluvia': 'segadora de la lluvia',
    'the widsith': 'sinfonia de los merodeadores',
    'sinfonia de los merodeadores': 'sinfonia de los merodeadores',
    'favonius greatsword': 'gran espada de favonius',
    'gran espada de favonius': 'gran espada de favonius',
    'favonius warbow': 'arco de favonius',
    'arco de favonius': 'arco de favonius',
    'the flute': 'flauta',
    'flauta': 'flauta',
    'sacrificial greatsword': 'gran espada de sacrificio',
    'gran espada de sacrificio': 'gran espada de sacrificio',
    'sacrificial sword': 'espada de sacrificio',
    'espada de sacrificio': 'espada de sacrificio',
    'the bell': 'espada del tiempo',
    'espada del tiempo': 'espada del tiempo',
    'winter\'s heavy heart': 'corazon del invierno',
    'winters heavy heart': 'corazon del invierno',
    'corazon del invierno': 'corazon del invierno',
    'windblume ode': 'estribillo del viento',
    'breezeborne refrain': 'estribillo del viento',
    'estribillo del viento': 'estribillo del viento',
    'new bough': 'nueva rama',
    'nueva rama': 'nueva rama',

    // Personajes y variantes de escritura
    'sacarosa': 'sucrose',
    'sucrose': 'sucrose',
    'barbara': 'barbara',
    'bárbara': 'barbara',
    'faruzan': 'faruzan',
    'faruzán': 'faruzan',
    'freminet': 'freminet',
    'fréminet': 'freminet',
    'ifa': 'ifa',
    'ifá': 'ifa',
    'alyosha': 'aliosha',
    'aliosha': 'aliosha',
    'columbina': 'colombina',
    'colombina': 'colombina',
    'linnea': 'linnea',
    'linnéa': 'linnea',
    'lan yan': 'lan yan',
    'lanyan': 'lan yan',
    'iansan': 'iansan',
    'iansán': 'iansan',
    'nefer': 'nefer',
    'néfer': 'nefer',
    'escoffier': 'escoffier',
    'alrecchino': 'arlecchino',
    'arrecchino': 'arlecchino',
    'alhacen': 'alhaitham',
    'alhacén': 'alhaitham',
    'alhaitham': 'alhaitham',
    'trotamundos': 'wanderer',
    'nomada': 'wanderer',
    'nómada': 'wanderer',
    'wanderer': 'wanderer',
    'tignari': 'tighnari',
    'tighnari': 'tighnari',
    'keching': 'keqing',
    'keqing': 'keqing',
    'xingchiu': 'xingqiu',
    'xingqiu': 'xingqiu',
    'ninguang': 'ningguang',
    'ningguang': 'ningguang',
    'mizuki': 'yumemizuki mizuki',
    'mizuki yumemizuki': 'yumemizuki mizuki',
    'yumemizuki mizuki': 'yumemizuki mizuki',
    'skyward pride': 'orgullo celestial',
    'orgullo celestial': 'orgullo celestial'
  };

  function getCanonicalGachaType(gachaType) {
    const g = String(gachaType || '301');
    if (g === '400') return '301'; // 301 y 400 comparten el banner promocional de personajes
    return g;
  }

  function getCanonicalItemName(name) {
    if (!name) return '';
    const clean = String(name).trim().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/['’]/g, '');
    return NAME_CANON_MAP[clean] || clean;
  }

  function isOfficialHoYoId(id) {
    if (!id) return false;
    const str = String(id).trim();
    // Los IDs de la API de HoYoverse son numéricos puros de al menos 10 dígitos (usualmente 19)
    return /^\d{10,}$/.test(str);
  }

  /**
   * Elimina duplicados de una lista de deseos considerando IDs oficiales y huellas semánticas
   */
  function deduplicateWishes(wishes) {
    if (!wishes || wishes.length === 0) return [];
    const sorted = sortWishesAscending(wishes);
    const seenOfficialIds = new Set();
    const seenSignatures = new Set();
    const ordinalTracker = new Map();
    const result = [];

    for (let i = 0; i < sorted.length; i++) {
      const w = sorted[i];
      const hasOfficial = isOfficialHoYoId(w.id);

      if (hasOfficial && seenOfficialIds.has(String(w.id))) {
        continue;
      }

      const gacha = getCanonicalGachaType(w.gacha_type);
      const timeStr = String(w.time || '').trim();
      const canonName = getCanonicalItemName(w.name);
      const groupKey = `${gacha}|${timeStr}|${canonName}`;

      const currOrdinal = (ordinalTracker.get(groupKey) || 0) + 1;
      ordinalTracker.set(groupKey, currOrdinal);
      const fullSig = `${groupKey}|${currOrdinal}`;

      if (seenSignatures.has(fullSig)) {
        continue;
      }

      if (hasOfficial) {
        seenOfficialIds.add(String(w.id));
      }
      seenSignatures.add(fullSig);
      result.push(w);
    }

    return result;
  }

  /**
   * Fusiona dos listas de deseos reconociendo duplicados entre fuentes distintas
   * (Excel de Paimon.moe con IDs sintéticos 'pm_...' y la API de HoYoverse con IDs numéricos).
   * Solo agrega las tiradas verdaderamente nuevas y preserva o enriquece las existentes.
   *
   * @param {Array} existingWishes - Tiradas actualmente en la base de datos
   * @param {Array} newWishes - Tiradas entrantes (descargadas o importadas)
   * @returns {Object} { mergedWishes: Array, addedCount: number, duplicatesCount: number, totalCount: number }
   */
  function mergeWishesDetailed(existingWishes, newWishes) {
    const existing = existingWishes || [];
    const incoming = newWishes || [];

    if (!existing || existing.length === 0) {
      const deduped = deduplicateWishes(sortWishesAscending(incoming));
      return {
        mergedWishes: deduped,
        addedCount: deduped.length,
        duplicatesCount: 0,
        totalCount: deduped.length
      };
    }

    if (!incoming || incoming.length === 0) {
      return {
        mergedWishes: sortWishesAscending(existing),
        addedCount: 0,
        duplicatesCount: 0,
        totalCount: existing.length
      };
    }

    // 1. Indexar los deseos existentes en cubetas por banner y marca de tiempo
    const sortedExisting = sortWishesAscending(existing);
    const existingOfficialIds = new Set();
    const timeBuckets = new Map(); // bucketKey -> Array of { item, matched: bool }
    const mergedList = [];

    for (let i = 0; i < sortedExisting.length; i++) {
      const item = Object.assign({}, sortedExisting[i]);
      const idStr = String(item.id || '').trim();
      if (isOfficialHoYoId(idStr)) {
        existingOfficialIds.add(idStr);
      }

      const gacha = getCanonicalGachaType(item.gacha_type);
      const timeStr = String(item.time || '').trim();
      const bucketKey = `${gacha}|${timeStr}`;

      if (!timeBuckets.has(bucketKey)) {
        timeBuckets.set(bucketKey, []);
      }
      timeBuckets.get(bucketKey).push({ item: item, matched: false });
      mergedList.push(item);
    }

    // 2. Procesar incoming wishes (ordenados cronológicamente)
    const sortedIncoming = sortWishesAscending(incoming);
    let addedCount = 0;
    let duplicatesCount = 0;

    for (let i = 0; i < sortedIncoming.length; i++) {
      const newItem = Object.assign({}, sortedIncoming[i]);
      const idStr = String(newItem.id || '').trim();
      const hasOfficial = isOfficialHoYoId(idStr);

      // A) Coincidencia directa por ID oficial de HoYoverse
      if (hasOfficial && existingOfficialIds.has(idStr)) {
        duplicatesCount++;
        continue;
      }

      const gacha = getCanonicalGachaType(newItem.gacha_type);
      const timeStr = String(newItem.time || '').trim();
      const bucketKey = `${gacha}|${timeStr}`;

      const bucket = timeBuckets.get(bucketKey);
      let matchedEntry = null;

      if (bucket && bucket.length > 0) {
        const incomingCanon = getCanonicalItemName(newItem.name);

        // Prioridad 1: Coincidencia por nombre canónico (resuelve nombres inglés/español)
        let idx = bucket.findIndex(e => !e.matched && getCanonicalItemName(e.item.name) === incomingCanon);

        // Prioridad 2: Respaldo por rareza (rank_type) en el mismo segundo de la multi-tirada
        if (idx === -1) {
          idx = bucket.findIndex(e => !e.matched && String(e.item.rank_type) === String(newItem.rank_type));
        }

        if (idx !== -1) {
          matchedEntry = bucket[idx];
          matchedEntry.matched = true;
        }
      }

      if (matchedEntry) {
        // Enriquecer el registro existente con el ID oficial de HoYoverse si antes era sintético
        if (hasOfficial && !isOfficialHoYoId(matchedEntry.item.id)) {
          matchedEntry.item.id = idStr;
          existingOfficialIds.add(idStr);
        }
        duplicatesCount++;
      } else {
        // C) Es una tirada NUEVA: Agregarla
        if (hasOfficial) {
          existingOfficialIds.add(idStr);
        }
        mergedList.push(newItem);
        addedCount++;
      }
    }

    const finalSorted = sortWishesAscending(mergedList);

    return {
      mergedWishes: finalSorted,
      addedCount: addedCount,
      duplicatesCount: duplicatesCount,
      totalCount: finalSorted.length
    };
  }

  /**
   * Fusiona dos listas de deseos sin duplicados, conservando la integridad de datos
   */
  function mergeWishes(existingWishes, newWishes) {
    return mergeWishesDetailed(existingWishes, newWishes).mergedWishes;
  }

  // =========================================================================
  // 3. PERSISTENCIA LOCAL MULTI-CUENTA (IndexedDB con fallback a localStorage)
  // =========================================================================

  const DB_NAME = 'TeyvatCompanionWishesDB';
  const DB_VERSION = 1;
  const STORE_NAME = 'wishes';
  const ACCOUNTS_KEY = 'teyvat_wish_accounts_v1';
  const ACTIVE_UID_KEY = 'teyvat_active_wish_uid';

  function openIndexedDB() {
    return new Promise(function (resolve, reject) {
      if (!window.indexedDB) {
        return resolve(null); // Fallback a localStorage
      }
      const req = window.indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function (e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('uid', 'uid', { unique: false });
          store.createIndex('gacha_type', 'gacha_type', { unique: false });
          store.createIndex('time', 'time', { unique: false });
        }
      };
      req.onsuccess = function (e) {
        resolve(e.target.result);
      };
      req.onerror = function (e) {
        console.warn('No se pudo abrir IndexedDB, usando fallback localStorage:', e.target.error);
        resolve(null);
      };
    });
  }

  /**
   * Guarda una lista de deseos para un UID específico
   */
  async function saveWishesToStorage(uid, wishes) {
    const safeUid = String(uid || 'default');
    registerAccountUid(safeUid);

    // Guardado dual garantizado: Siempre guardamos en localStorage para persistencia instantánea y sync Drive
    const storageKey = 'teyvat_wishes_' + safeUid;
    try {
      localStorage.setItem(storageKey, JSON.stringify(wishes));
      localStorage.removeItem('teyvat_wishes_cleared_' + safeUid);
      localStorage.setItem(ACTIVE_UID_KEY, safeUid);
    } catch (err) {
      console.warn('Advertencia al escribir fallback en localStorage:', err);
    }

    const db = await openIndexedDB();
    if (db) {
      return new Promise(function (resolve, reject) {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        // Replace this UID in one transaction, including deletions from a remote restore.
        const existing = store.index('uid').openCursor(safeUid);
        existing.onsuccess = function () {
          const cursor = existing.result;
          if (cursor) { cursor.delete(); cursor.continue(); return; }
          for (let i = 0; i < wishes.length; i++) {
            const w = Object.assign({}, wishes[i], { uid: safeUid });
            store.put(w);
          }
        };
        tx.oncomplete = function () { resolve(true); };
        tx.onerror = function (err) { reject(err); };
      });
    } else {
      return true;
    }
  }

  /**
   * Carga los deseos almacenados para un UID
   */
  async function loadWishesFromStorage(uid) {
    const safeUid = String(uid || getActiveAccountUid() || 'default');
    const storageKey = 'teyvat_wishes_' + safeUid;
    const cached = localStorage.getItem(storageKey);
    if (cached !== null) {
      try { const list = JSON.parse(cached); if (Array.isArray(list)) return sortWishesAscending(list); } catch (_) {}
    }
    if (localStorage.getItem('teyvat_wishes_cleared_' + safeUid) === 'true') return [];
    const db = await openIndexedDB();

    if (db) {
      return new Promise(function (resolve) {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const index = store.index('uid');
        const req = index.getAll(safeUid);
        req.onsuccess = function (e) {
          const items = e.target.result || [];
          if (items.length > 0) {
            resolve(sortWishesAscending(items));
          } else {
            // Si IndexedDB devolvió vacío, intentar recuperar desde localStorage
            const raw = localStorage.getItem(storageKey);
            if (raw) {
              try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  // Re-poblar IndexedDB en segundo plano
                  saveWishesToStorage(safeUid, parsed).catch(function () {});
                  return resolve(sortWishesAscending(parsed));
                }
              } catch (e) {}
            }
            resolve([]);
          }
        };
        req.onerror = function () {
          const raw = localStorage.getItem(storageKey);
          if (raw) {
            try { return resolve(sortWishesAscending(JSON.parse(raw))); } catch (e) {}
          }
          resolve([]);
        };
      });
    } else {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        try {
          return sortWishesAscending(JSON.parse(raw));
        } catch (e) {
          return [];
        }
      }
      return [];
    }
  }

  function registerAccountUid(uid) {
    if (!uid) return;
    try {
      const accounts = getStoredAccounts();
      if (!accounts.includes(uid)) {
        accounts.push(uid);
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
      }
    } catch (e) {}
  }

  function getStoredAccounts() {
    try {
      return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function getActiveAccountUid() {
    return localStorage.getItem(ACTIVE_UID_KEY) || 'default';
  }

  function setActiveAccountUid(uid) {
    if (uid) localStorage.setItem(ACTIVE_UID_KEY, uid);
  }

  function detectServerFromUid(uid) {
    const s = String(uid || '').trim();
    if (!s) return 'Global';
    if (/^18\d{8}$/.test(s)) return 'Asia';
    const first = s.charAt(0);
    if (first === '6') return 'América';
    if (first === '7') return 'Europa';
    if (first === '8') return 'Asia';
    if (first === '9') return 'TW/HK/MO';
    if (first === '1' || first === '2') return 'China (Celestia)';
    if (first === '5') return 'China (Irminsul)';
    return 'Global';
  }

  const PROFILES_KEY = 'teyvat_profiles_meta_v1';

  function getStoredProfiles() {
    let profiles = [];
    try {
      profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || '[]');
    } catch (e) {
      profiles = [];
    }

    const accounts = getStoredAccounts();
    let updated = false;

    accounts.forEach(function (uid) {
      if (!profiles.some(function (p) { return p.uid === uid; })) {
        profiles.push({
          uid: uid,
          name: 'UID: ' + uid,
          server: detectServerFromUid(uid),
          createdAt: new Date().toISOString()
        });
        updated = true;
      }
    });

    if (profiles.length === 0) {
      profiles.push({
        uid: 'default',
        name: 'UID: default',
        server: 'América',
        createdAt: new Date().toISOString()
      });
      updated = true;
    }

    // Normalizar nombres existentes para que siempre reflejen el UID
    profiles.forEach(function (p) {
      if (!p.name || !p.name.startsWith('UID:')) {
        p.name = 'UID: ' + p.uid;
        p.server = detectServerFromUid(p.uid);
        updated = true;
      }
    });

    if (updated) {
      try {
        localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
      } catch (e) {}
    }

    return profiles;
  }

  function saveProfile(profile) {
    if (!profile || !profile.uid) return getStoredProfiles();
    const cleanUid = String(profile.uid).trim();
    const profiles = getStoredProfiles();
    const server = profile.server || detectServerFromUid(cleanUid);

    const normProfile = {
      uid: cleanUid,
      name: 'UID: ' + cleanUid,
      server: server,
      createdAt: profile.createdAt || new Date().toISOString()
    };

    const idx = profiles.findIndex(function (p) { return p.uid === cleanUid; });
    if (idx >= 0) {
      profiles[idx] = Object.assign({}, profiles[idx], normProfile);
    } else {
      profiles.push(normProfile);
    }
    registerAccountUid(cleanUid);
    try {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    } catch (e) {}
    return profiles;
  }

  async function renameProfileUid(oldUid, newUid) {
    if (!oldUid || !newUid || oldUid === newUid) return getStoredProfiles();
    const cleanNew = String(newUid).trim();
    const cleanOld = String(oldUid).trim();

    // 1. Cargar deseos del UID anterior
    const wishes = await loadWishesFromStorage(cleanOld);
    const updatedWishes = wishes.map(function (w) {
      return Object.assign({}, w, { uid: cleanNew });
    });

    // 2. Guardar bajo el nuevo UID
    await saveWishesToStorage(cleanNew, updatedWishes);

    // 3. Registrar el nuevo perfil con detección de servidor
    saveProfile({
      uid: cleanNew,
      name: 'UID: ' + cleanNew,
      server: detectServerFromUid(cleanNew),
      createdAt: new Date().toISOString()
    });

    // 4. Eliminar el UID antiguo
    await deleteProfile(cleanOld);

    // 5. Dejar activo el nuevo UID
    setActiveAccountUid(cleanNew);

    return cleanNew;
  }

  async function deleteProfile(uid) {
    if (!uid) return getStoredProfiles();
    let profiles = getStoredProfiles();
    profiles = profiles.filter(function (p) { return p.uid !== uid; });
    try {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    } catch (e) {}

    let accounts = getStoredAccounts().filter(function (a) { return a !== uid; });
    try {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch (e) {}

    // Eliminar de IndexedDB esperando tx.oncomplete
    const db = await openIndexedDB();
    if (db) {
      await new Promise(function (resolve) {
        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          const index = store.index('uid');
          const req = index.getAllKeys(uid);
          req.onsuccess = function (e) {
            const keys = e.target.result || [];
            for (let i = 0; i < keys.length; i++) {
              store.delete(keys[i]);
            }
          };
          tx.oncomplete = function () { resolve(true); };
          tx.onerror = function () { resolve(false); };
        } catch (e) {
          resolve(false);
        }
      });
    }

    localStorage.removeItem('teyvat_wishes_' + uid);

    if (getActiveAccountUid() === uid) {
      const nextUid = profiles.length > 0 ? profiles[0].uid : 'default';
      setActiveAccountUid(nextUid);
    }

    return profiles;
  }

  async function clearWishesForTesting(uid) {
    const cleanUid = String(uid || getActiveAccountUid());
    const db = await openIndexedDB();
    if (db) {
      await new Promise(function (resolve) {
        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          const index = store.index('uid');
          const req = index.getAllKeys(cleanUid);
          req.onsuccess = function (e) {
            const keys = e.target.result || [];
            for (let i = 0; i < keys.length; i++) {
              store.delete(keys[i]);
            }
          };
          tx.oncomplete = function () { resolve(true); };
          tx.onerror = function () { resolve(false); };
        } catch (e) {
          resolve(false);
        }
      });
    }
    localStorage.removeItem('teyvat_wishes_' + cleanUid);
    localStorage.setItem('teyvat_wishes_cleared_' + cleanUid, 'true');
    return true;
  }

  // =========================================================================
  // API Pública del Módulo
  // =========================================================================
  return {
    GACHA_TYPES: GACHA_TYPES,
    BANNER_KEYS: BANNER_KEYS,
    PITY_CONFIG: PITY_CONFIG,
    STANDARD_5STAR_CHARACTERS: STANDARD_5STAR_CHARACTERS,
    STANDARD_5STAR_WEAPONS: STANDARD_5STAR_WEAPONS,
    isStandard5StarCharacter: isStandard5StarCharacter,

    // Algoritmos matemáticos y procesamiento
    sortWishesAscending: sortWishesAscending,
    processBannerPity: processBannerPity,
    calculateProbAtPity: calculateProbAtPity,
    calculateCumulativeChance: calculateCumulativeChance,
    categorizeWishes: categorizeWishes,
    processFullHistory: processFullHistory,

    // Formato Universal UIGF v4.0, Excel y CSV
    exportToUIGF: exportToUIGF,
    importFromUniversalJSON: importFromUniversalJSON,
    importFromPaimonMoeXLSX: importFromPaimonMoeXLSX,
    importFromPaimonMoeCSV: importFromPaimonMoeCSV,
    deduplicateWishes: deduplicateWishes,
    mergeWishes: mergeWishes,
    mergeWishesDetailed: mergeWishesDetailed,

    // Persistencia Multi-Cuenta y Perfiles
    saveWishesToStorage: saveWishesToStorage,
    loadWishesFromStorage: loadWishesFromStorage,
    getStoredAccounts: getStoredAccounts,
    getActiveAccountUid: getActiveAccountUid,
    setActiveAccountUid: setActiveAccountUid,
    getStoredProfiles: getStoredProfiles,
    saveProfile: saveProfile,
    deleteProfile: deleteProfile,
    detectServerFromUid: detectServerFromUid,
    renameProfileUid: renameProfileUid,
    clearWishesForTesting: clearWishesForTesting
  };
});
