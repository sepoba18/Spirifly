(function (root, factory) {
  const api = factory(root);
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.WishShare = api;
})(typeof self !== "undefined" ? self : this, function (root) {
  "use strict";

  const COPY = {
    es: {
      button: "Compartir estadísticas",
      title: "Resumen de Deseos",
      summaryTotal: "RESUMEN TOTAL",
      wishesWord: "deseos",
      primosWord: "Protogemas",
      stars: "CINCO ESTRELLAS",
      avgChar: "PROMEDIO 5★ (PERS.)",
      avgAll: "PROMEDIO 5★",
      globalMedia: "Media global: 62.5 pity",
      win5050: "50/50 GANADOS",
      streakPrefix: "RACHA",
      wonLost: "{w} ganados · {l} perdidos",
      worstPity: "PEOR PITY",
      currentPity: "PITY ACTUAL POR BANNER",
      currentPityMeta: "Calculado hasta el último deseo",
      recentChars: "ÚLTIMOS CINCO ESTRELLAS · {banner}",
      recentSub: "Pity por tirada · Más reciente primero",
      bestKicker: "MEJOR PITY 5★",
      featuredKicker: "PERSONAJE DESTACADO 5★",
      pityLabel: "PITY",
      empty: "Sin ciclos completos",
      note: "Historial registrado · El primer 5★ de cada banner no cuenta para el récord.",
      seal: "Calculado en spirifly.app",
      heroSelectLabel: "Personaje destacado",
      bestOptionPrefix: "★ Mejor pity:",
      showUidLabel: "Mostrar UID",
      copyBtn: "Copiar imagen",
      copiedBtn: "¡Copiada!",
      copyError: "No se pudo copiar al portapapeles.",
      download: "Descargar PNG",
      close: "Cerrar",
      error: "No se pudo generar la imagen. Inténtalo nuevamente.",
      banners: ["Personajes", "Armas", "Permanente", "Recopilatorio"],
      bannerShort: ["Pers", "Arm", "Perm", "Recop"],
      bannerOf: "Banner de {banner}",
      statusShort: {
        won5050: "50/50",
        lost5050: "PERDIDO",
        guaranteed: "GARANT.",
        radiance: "✦ RAD.",
        standard: "ESTÁNDAR"
      },
      statusFull: {
        won5050: "50/50 Ganado",
        lost5050: "50/50 Perdido",
        guaranteed: "Garantizado",
        radiance: "Captura Radiante",
        standard: "Estándar"
      },
      active5050: "50/50 ACTIVO"
    },
    en: {
      button: "Share stats",
      title: "Wish Summary",
      summaryTotal: "TOTAL SUMMARY",
      wishesWord: "wishes",
      primosWord: "Primogems",
      stars: "FIVE STARS",
      avgChar: "AVG 5★ PITY (CHAR.)",
      avgAll: "AVG 5★ PITY",
      globalMedia: "Global avg: 62.5 pity",
      win5050: "50/50 WON",
      streakPrefix: "STREAK",
      wonLost: "{w} won · {l} lost",
      worstPity: "WORST PITY",
      currentPity: "CURRENT PITY BY BANNER",
      currentPityMeta: "Calculated up to latest wish",
      recentChars: "RECENT FIVE STARS · {banner}",
      recentSub: "Pity per pull · Most recent first",
      bestKicker: "BEST 5★ PITY",
      featuredKicker: "FEATURED 5★ PULL",
      pityLabel: "PITY",
      empty: "No complete cycles",
      note: "Recorded history · Each banner's first 5★ is excluded from the record.",
      seal: "Calculated on spirifly.app",
      heroSelectLabel: "Featured character",
      bestOptionPrefix: "★ Best pity:",
      showUidLabel: "Show UID",
      copyBtn: "Copy image",
      copiedBtn: "Copied!",
      copyError: "Could not copy image to clipboard.",
      download: "Download PNG",
      close: "Close",
      error: "Could not generate the image. Please try again.",
      banners: ["Character", "Weapon", "Standard", "Chronicled"],
      bannerShort: ["Char", "Weap", "Std", "Chr"],
      bannerOf: "{banner} Banner",
      statusShort: {
        won5050: "50/50",
        lost5050: "LOST",
        guaranteed: "GUAR.",
        radiance: "✦ RAD.",
        standard: "STANDARD"
      },
      statusFull: {
        won5050: "Won 50/50",
        lost5050: "Lost 50/50",
        guaranteed: "Guaranteed",
        radiance: "Capturing Radiance",
        standard: "Standard"
      },
      active5050: "50/50 ACTIVE"
    },
    pt: {
      button: "Compartilhar estatísticas",
      title: "Resumo de Orações",
      summaryTotal: "RESUMO TOTAL",
      wishesWord: "tiros",
      primosWord: "Gemas",
      stars: "CINCO ESTRELAS",
      avgChar: "MÉDIA 5★ (PERS.)",
      avgAll: "MÉDIA 5★",
      globalMedia: "Média global: 62.5 pity",
      win5050: "50/50 VENCIDOS",
      streakPrefix: "SEQ.",
      wonLost: "{w} ganhos · {l} perdidos",
      worstPity: "PIOR PITY",
      currentPity: "PITY ATUAL POR BANNER",
      currentPityMeta: "Calculado até o último tiro",
      recentChars: "ÚLTIMOS CINCO ESTRELAS · {banner}",
      recentSub: "Pity por tiro · Mais recente primeiro",
      bestKicker: "MELHOR PITY 5★",
      featuredKicker: "DESTAQUE 5★",
      pityLabel: "PITY",
      empty: "Sem ciclos completos",
      note: "Histórico registrado · O primeiro 5★ de cada banner não conta para o recorde.",
      seal: "Calculado em spirifly.app",
      heroSelectLabel: "Personagem em destaque",
      bestOptionPrefix: "★ Melhor pity:",
      showUidLabel: "Mostrar UID",
      copyBtn: "Copiar imagem",
      copiedBtn: "Copiada!",
      copyError: "Não foi possível copiar para a área de transferência.",
      download: "Baixar PNG",
      close: "Fechar",
      error: "Não foi possível gerar a imagem. Tente novamente.",
      banners: ["Personagens", "Armas", "Permanente", "Crônicas"],
      bannerShort: ["Pers", "Arm", "Perm", "Crôn"],
      bannerOf: "Banner de {banner}",
      statusShort: {
        won5050: "50/50",
        lost5050: "PERDIDO",
        guaranteed: "GARANT.",
        radiance: "✦ RAD.",
        standard: "PADRÃO"
      },
      statusFull: {
        won5050: "50/50 Ganho",
        lost5050: "50/50 Perdido",
        guaranteed: "Garantido",
        radiance: "Captura Radiante",
        standard: "Padrão"
      },
      active5050: "50/50 ATIVO"
    },
    ja: {
      button: "統計をシェア",
      title: "祈願統計",
      summaryTotal: "合計サマリー",
      wishesWord: "回",
      primosWord: "原石",
      stars: "★5獲得数",
      avgChar: "平均★5天井 (キャラ)",
      avgAll: "平均★5天井",
      globalMedia: "全体平均: 62.5",
      win5050: "すり抜け回避率",
      streakPrefix: "連勝",
      wonLost: "{w}勝 · {l}敗",
      worstPity: "最大天井",
      currentPity: "現在の天井カウント",
      currentPityMeta: "最新履歴まで集計",
      recentChars: "最近の★5獲得 · {banner}",
      recentSub: "獲得回数 · 新しい順",
      bestKicker: "最短★5記録",
      featuredKicker: "選択中の★5",
      pityLabel: "天井",
      empty: "完全な区間なし",
      note: "記録済みの履歴のみ · 各祈願の最初の★5は最短記録の対象外です。",
      seal: "spirifly.app で集計",
      heroSelectLabel: "表示キャラクター",
      bestOptionPrefix: "★ 最短記録:",
      showUidLabel: "UIDを表示",
      copyBtn: "画像をコピー",
      copiedBtn: "コピー完了",
      copyError: "画像をコピーできませんでした。",
      download: "PNGをダウンロード",
      close: "閉じる",
      error: "画像を生成できませんでした。もう一度お試しください。",
      banners: ["キャラクター", "武器", "通常", "集録"],
      bannerShort: ["キャラ", "武器", "通常", "集録"],
      bannerOf: "{banner}祈願",
      statusShort: {
        won5050: "勝利",
        lost5050: "すり抜け",
        guaranteed: "確定枠",
        radiance: "✦ 光輝",
        standard: "恒常"
      },
      statusFull: {
        won5050: "50/50 勝利",
        lost5050: "すり抜け",
        guaranteed: "確定枠",
        radiance: "つかみし明光",
        standard: "恒常"
      },
      active5050: "50/50"
    },
    ko: {
      button: "통계 공유",
      title: "기원 요약",
      summaryTotal: "전체 요약",
      wishesWord: "회",
      primosWord: "원석",
      stars: "5성 획득 수",
      avgChar: "평균 5★ 천장 (캐릭)",
      avgAll: "평균 5★ 천장",
      globalMedia: "전체 평균: 62.5",
      win5050: "반천장 승률",
      streakPrefix: "연승",
      wonLost: "{w}승 · {l}패",
      worstPity: "최고 천장",
      currentPity: "현재 배너별 스택",
      currentPityMeta: "최신 기원 기준",
      recentChars: "최근 5성 기록 · {banner}",
      recentSub: "획득 스택 · 최신순",
      bestKicker: "최단 5★ 기록",
      featuredKicker: "선택된 5성",
      pityLabel: "스택",
      empty: "완전한 구간 없음",
      note: "기록된 내역 기준 · 각 기원의 첫 5성은 최단 기록에서 제외됩니다.",
      seal: "spirifly.app에서 계산",
      heroSelectLabel: "대표 캐릭터",
      bestOptionPrefix: "★ 최단 기록:",
      showUidLabel: "UID 표시",
      copyBtn: "이미지 복사",
      copiedBtn: "복사됨!",
      copyError: "클립보드에 복사할 수 없습니다.",
      download: "PNG 다운로드",
      close: "닫기",
      error: "이미지를 생성할 수 없습니다. 다시 시도해 주세요.",
      banners: ["캐릭터", "무기", "상시", "묶음"],
      bannerShort: ["캐릭", "무기", "상시", "묶음"],
      bannerOf: "{banner} 기원",
      statusShort: {
        won5050: "50/50",
        lost5050: "픽뚫",
        guaranteed: "확정",
        radiance: "✦ 광휘",
        standard: "상시"
      },
      statusFull: {
        won5050: "반천장 승리",
        lost5050: "반천장 패배",
        guaranteed: "확정 천장",
        radiance: "빛나는 포착",
        standard: "상시"
      },
      active5050: "50/50"
    }
  };

  const KEYS = ["character", "weapon", "standard", "chronicled"];
  const GLOBAL_AVG_PITY = 62.5;
  const CARD_W = 1280;
  const CARD_H = 720;
  const LEFT_W = 460;
  const DPR = 2;
  const FONT_SANS = '"Plus Jakarta Sans", "Inter", "Segoe UI", system-ui, sans-serif';
  const FONT_MONO = '"JetBrains Mono", "Consolas", ui-monospace, monospace';

  const ELEMENT_THEMES = {
    Dendro: { accent: "#34d399", glow: "rgba(52, 211, 153, 0.16)", tint: "rgba(16, 42, 34, 0.34)", icon: "assets/elements/dendro.png" },
    Pyro: { accent: "#fb923c", glow: "rgba(239, 121, 56, 0.18)", tint: "rgba(52, 22, 14, 0.34)", icon: "assets/elements/pyro.png" },
    Hydro: { accent: "#38bdf8", glow: "rgba(76, 194, 241, 0.18)", tint: "rgba(14, 38, 56, 0.34)", icon: "assets/elements/hydro.png" },
    Cryo: { accent: "#7dd3fc", glow: "rgba(159, 214, 227, 0.18)", tint: "rgba(18, 40, 52, 0.34)", icon: "assets/elements/cryo.png" },
    Electro: { accent: "#c084fc", glow: "rgba(176, 143, 194, 0.2)", tint: "rgba(38, 22, 54, 0.36)", icon: "assets/elements/electro.png" },
    Geo: { accent: "#f5c26b", glow: "rgba(250, 182, 50, 0.17)", tint: "rgba(48, 34, 14, 0.34)", icon: "assets/elements/geo.png" },
    Anemo: { accent: "#5eead4", glow: "rgba(116, 194, 168, 0.17)", tint: "rgba(16, 44, 40, 0.34)", icon: "assets/elements/anemo.png" },
    Neutral: { accent: "#e6c67c", glow: "rgba(230, 198, 124, 0.15)", tint: "rgba(32, 28, 20, 0.32)", icon: null }
  };

  const CHAR_ALIASES = {
    "trotamundos": "wanderer",
    "shogun raiden": "raiden shogun",
    "raiden": "raiden shogun",
    "keching": "keqing",
    "nobile": "tartaglia",
    "childe": "tartaglia",
    "yumemizuki mizuki": "mizuki",
    "kaedehara kazuha": "kazuha",
    "kamisato ayaka": "ayaka",
    "kamisato ayato": "ayato",
    "sangonomiya kokomi": "kokomi",
    "arataki itto": "itto",
    "kujou sara": "sara",
    "kuki shinobu": "shinobu",
    "shikanoin heizou": "heizou",
    "kirara": "kirara",
    "skirk": "skirk"
  };

  const SHORT_NAMES = {
    "yumemizuki mizuki": "Mizuki",
    "raiden shogun": "Raiden",
    "shogun raiden": "Raiden",
    "kaedehara kazuha": "Kazuha",
    "sangonomiya kokomi": "Kokomi",
    "kamisato ayaka": "Ayaka",
    "kamisato ayato": "Ayato",
    "arataki itto": "Itto",
    "shikanoin heizou": "Heizou"
  };

  const IMAGE_CACHE = new Map();

  function getCopy(lang) {
    return COPY[lang] || COPY.es;
  }

  function normalizeName(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function formatTemplate(str, vars) {
    return String(str || "").replace(/\{(\w+)\}/g, (_, key) => (vars[key] !== undefined ? String(vars[key]) : ""));
  }

  function deriveSplashUrl(iconUrl) {
    if (!iconUrl || typeof iconUrl !== "string") return null;
    if (iconUrl.includes("UI_AvatarIcon_")) {
      return iconUrl.replace("UI_AvatarIcon_", "UI_Gacha_AvatarImg_");
    }
    return null;
  }

  function buildCharacterIndex(customBuildsDb, customRoster) {
    const map = new Map();
    const buildsDb = Array.isArray(customBuildsDb)
      ? customBuildsDb
      : (typeof CHARACTER_BUILDS_DB !== "undefined" && Array.isArray(CHARACTER_BUILDS_DB)
        ? CHARACTER_BUILDS_DB
        : (Array.isArray(root.CHARACTER_BUILDS_DB) ? root.CHARACTER_BUILDS_DB : []));

    const rosterDb = Array.isArray(customRoster)
      ? customRoster
      : (typeof SEELIE_CHARACTER_ROSTER !== "undefined" && Array.isArray(SEELIE_CHARACTER_ROSTER)
        ? SEELIE_CHARACTER_ROSTER
        : (Array.isArray(root.SEELIE_CHARACTER_ROSTER) ? root.SEELIE_CHARACTER_ROSTER : []));

    const register = (key, entry, overwrite) => {
      const norm = normalizeName(key);
      if (!norm) return;
      if (!overwrite && map.has(norm)) return;
      map.set(norm, entry);
    };

    for (const char of rosterDb) {
      if (!char || !char.name) continue;
      const entry = {
        name: char.name,
        element: char.element || "Neutral",
        icon: char.icon || null,
        splashUrl: deriveSplashUrl(char.icon)
      };
      register(char.name, entry, false);
    }

    for (const char of buildsDb) {
      if (!char) continue;
      const esName = char.name && char.name.es ? char.name.es : "";
      const enName = char.name && char.name.en ? char.name.en : "";
      const displayName = esName || enName || char.id || "";
      const entry = {
        name: displayName,
        element: char.element || "Neutral",
        icon: char.icon || null,
        splashUrl: deriveSplashUrl(char.icon)
      };
      if (esName) register(esName, entry, true);
      if (enName) register(enName, entry, true);
      if (char.id) register(char.id.replace(/_/g, " "), entry, false);
      const parts = normalizeName(enName || esName).split(" ");
      if (parts.length === 2 && parts[1].length >= 4) {
        register(parts[1], entry, false);
      }
    }

    return map;
  }

  function resolveCharacterMeta(name, indexOrDb) {
    const index = indexOrDb instanceof Map ? indexOrDb : buildCharacterIndex(indexOrDb);
    const norm = normalizeName(name);
    const alias = CHAR_ALIASES[norm];
    const found = index.get(norm) || (alias ? index.get(alias) : null) || null;
    const shortName = SHORT_NAMES[norm] || SHORT_NAMES[alias] || String(name || "—");

    if (found) {
      return {
        name: String(name || found.name),
        shortName,
        element: found.element || "Neutral",
        icon: found.icon || null,
        splashUrl: found.splashUrl || deriveSplashUrl(found.icon)
      };
    }

    return {
      name: String(name || "—"),
      shortName,
      element: "Neutral",
      icon: null,
      splashUrl: null
    };
  }

  function getItemStatusKey(item, bannerKey) {
    if (!item) return "standard";
    if (item.isCapturingRadiance) return "radiance";
    if (item.isGuaranteed) return "guaranteed";
    if (item.isWon5050 === true || item.isWon7525 === true) return "won5050";
    if (item.isWon5050 === false || item.isWon7525 === false) return "lost5050";
    if (bannerKey === "standard") return "standard";
    return "standard";
  }

  function maskUid(uid) {
    const clean = String(uid || "").trim();
    if (!clean || clean === "default") return "";
    if (clean.length <= 5) return clean;
    return `${clean.slice(0, 3)}•••${clean.slice(-3)}`;
  }

  function summarize(result) {
    const candidates = [];
    for (const key of KEYS) {
      // El motor entrega los más recientes primero: el último es el ciclo inicial incompleto.
      const history = result?.[key]?.stats?.fiveStarHistory || [];
      for (const item of history.slice(0, -1)) {
        if (Number.isInteger(item.pity) && item.pity > 0) candidates.push({ ...item, banner: key });
      }
    }
    candidates.sort((a, b) => a.pity - b.pity);
    return {
      total: result?.summary?.totalPullsAll || 0,
      stars: result?.summary?.total5StarsAll || 0,
      best: candidates[0] || null
    };
  }

  function computeMaxWinStreak(fiveStarHistory) {
    let cur = 0;
    let maxStreak = 0;
    const chronological = [...(fiveStarHistory || [])].reverse();
    for (const item of chronological) {
      if (item.isWon5050 === true || item.isWon7525 === true) {
        cur += 1;
        if (cur > maxStreak) maxStreak = cur;
      } else if (item.isWon5050 === false || item.isWon7525 === false) {
        cur = 0;
      }
    }
    return maxStreak;
  }

  function extractStats(result, options) {
    const base = summarize(result);
    const countsByBanner = {
      character: result?.character?.stats?.fiveStarsCount || 0,
      weapon: result?.weapon?.stats?.fiveStarsCount || 0,
      standard: result?.standard?.stats?.fiveStarsCount || 0,
      chronicled: result?.chronicled?.stats?.fiveStarsCount || 0
    };

    const completeCycles = [];
    for (const key of KEYS) {
      const history = result?.[key]?.stats?.fiveStarHistory || [];
      for (const item of history.slice(0, -1)) {
        if (Number.isInteger(item.pity) && item.pity > 0) {
          completeCycles.push({ ...item, banner: key, statusKey: getItemStatusKey(item, key) });
        }
      }
    }

    completeCycles.sort((a, b) => {
      if (b.pity !== a.pity) return b.pity - a.pity;
      return (a.banner === "character" ? 0 : 1) - (b.banner === "character" ? 0 : 1);
    });
    const worst = completeCycles[0] || null;

    const charStats = result?.character?.stats || {};
    const hasChar5 = (charStats.fiveStarsCount || 0) > 0;
    const rawAvg = hasChar5 ? parseFloat(charStats.avg5Pity || "0") : 0;
    let avg5Pity = Number.isFinite(rawAvg) ? rawAvg : 0;
    let avgFromChar = hasChar5;

    if (!avgFromChar) {
      let sumPity = 0;
      let countPity = 0;
      for (const key of KEYS) {
        const h = result?.[key]?.stats?.fiveStarHistory || [];
        for (const item of h) {
          if (Number.isInteger(item.pity) && item.pity > 0) {
            sumPity += item.pity;
            countPity += 1;
          }
        }
      }
      avg5Pity = countPity > 0 ? sumPity / countPity : 0;
    }

    const deltaVsGlobal = avg5Pity > 0 ? Number((avg5Pity - GLOBAL_AVG_PITY).toFixed(1)) : 0;
    const win5050Pct = parseFloat(charStats.win5050Pct || "0") || 0;
    const won5050Count = charStats.won5050Count || 0;
    const lost5050Count = charStats.lost5050Count || 0;
    const maxWinStreak = computeMaxWinStreak(charStats.fiveStarHistory);

    const pityBanners = {
      character: {
        current: result?.character?.stats?.currentPity5 || 0,
        max: 90,
        isGuaranteed: Boolean(result?.character?.stats?.isGuaranteed)
      },
      weapon: {
        current: result?.weapon?.stats?.currentPity5 || 0,
        max: 80,
        isGuaranteed: Boolean(result?.weapon?.stats?.isGuaranteed),
        fatePoints: result?.weapon?.stats?.fatePoints || 0
      },
      standard: {
        current: result?.standard?.stats?.currentPity5 || 0,
        max: 90
      },
      chronicled: {
        current: result?.chronicled?.stats?.currentPity5 || 0,
        max: 90,
        totalPulls: result?.chronicled?.stats?.totalPulls || 0
      }
    };

    let recentBanner = "character";
    let recentSource = result?.character?.stats?.fiveStarHistory || [];
    if (recentSource.length === 0) {
      for (const fallbackKey of ["standard", "chronicled", "weapon"]) {
        const list = result?.[fallbackKey]?.stats?.fiveStarHistory || [];
        if (list.length > 0) {
          recentBanner = fallbackKey;
          recentSource = list;
          break;
        }
      }
    }

    const recentFiveStars = recentSource.slice(0, 8).map((item) => ({
      ...item,
      banner: recentBanner,
      statusKey: getItemStatusKey(item, recentBanner)
    }));

    const bestWithStatus = base.best
      ? { ...base.best, statusKey: getItemStatusKey(base.best, base.best.banner) }
      : null;

    return {
      totalPulls: base.total,
      totalPrimos: result?.summary?.totalPrimosAll || base.total * 160,
      total5Stars: base.stars,
      countsByBanner,
      avg5Pity: Number(avg5Pity.toFixed(1)),
      avgFromChar,
      deltaVsGlobal,
      win5050Pct: Number(win5050Pct.toFixed(1)),
      won5050Count,
      lost5050Count,
      maxWinStreak,
      best: bestWithStatus,
      worst,
      pityBanners,
      recentBanner,
      recentFiveStars,
      maskedUid: maskUid(options?.uid)
    };
  }

  function getHeroCandidates(result) {
    const base = summarize(result);
    const list = [];
    const seenBestKey = base.best
      ? `${base.best.banner}|${base.best.name}|${base.best.pity}|${base.best.time || ""}`
      : null;

    if (base.best) {
      list.push({
        id: "best",
        name: base.best.name,
        pity: base.best.pity,
        banner: base.best.banner,
        time: base.best.time || "",
        statusKey: getItemStatusKey(base.best, base.best.banner),
        isRecord: true
      });
    }

    let skippedBestOnce = false;
    const charOrder = ["character", "standard", "chronicled", "weapon"];
    for (const key of charOrder) {
      if (key === "weapon" && list.length > 0) continue;
      const history = result?.[key]?.stats?.fiveStarHistory || [];
      history.forEach((item, idx) => {
        const itemKey = `${key}|${item.name}|${item.pity}|${item.time || ""}`;
        if (!skippedBestOnce && seenBestKey && itemKey === seenBestKey) {
          skippedBestOnce = true;
          return;
        }
        list.push({
          id: `${key}-${idx}`,
          name: item.name,
          pity: item.pity || 0,
          banner: key,
          time: item.time || "",
          statusKey: getItemStatusKey(item, key),
          isRecord: false
        });
      });
    }

    return list;
  }

  function loadImageSafe(url) {
    if (!url || typeof Image === "undefined") return Promise.resolve(null);
    if (IMAGE_CACHE.has(url)) return IMAGE_CACHE.get(url);

    const promise = new Promise((resolve) => {
      const img = new Image();
      if (/^https?:\/\//i.test(url)) {
        img.crossOrigin = "anonymous";
      }
      let settled = false;
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        resolve(null);
      }, 6000);

      img.onload = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(img.naturalWidth > 0 ? img : null);
      };
      img.onerror = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(null);
      };
      img.src = url;
    });

    IMAGE_CACHE.set(url, promise);
    return promise;
  }

  function pityPalette(pity) {
    if (pity > 0 && pity < 40) {
      return { fg: "#34d399", bg: "rgba(52, 211, 153, 0.14)", border: "rgba(52, 211, 153, 0.34)" };
    }
    if (pity >= 74) {
      return { fg: "#f87171", bg: "rgba(248, 113, 113, 0.14)", border: "rgba(248, 113, 113, 0.34)" };
    }
    return { fg: "#e6c67c", bg: "rgba(230, 198, 124, 0.14)", border: "rgba(230, 198, 124, 0.34)" };
  }

  function statusPalette(statusKey) {
    if (statusKey === "won5050") {
      return { fg: "#34d399", bg: "rgba(52, 211, 153, 0.12)", border: "rgba(52, 211, 153, 0.28)" };
    }
    if (statusKey === "lost5050") {
      return { fg: "#f87171", bg: "rgba(248, 113, 113, 0.12)", border: "rgba(248, 113, 113, 0.28)" };
    }
    if (statusKey === "radiance") {
      return { fg: "#a78bfa", bg: "rgba(167, 139, 250, 0.14)", border: "rgba(167, 139, 250, 0.32)" };
    }
    if (statusKey === "guaranteed") {
      return { fg: "#e6c67c", bg: "rgba(230, 198, 124, 0.12)", border: "rgba(230, 198, 124, 0.28)" };
    }
    return { fg: "#98a2b8", bg: "rgba(255, 255, 255, 0.05)", border: "rgba(255, 255, 255, 0.08)" };
  }

  function roundedRectPath(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function fillRoundedRect(ctx, x, y, w, h, r, fill, stroke, lineWidth = 1) {
    roundedRectPath(ctx, x, y, w, h, r);
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  }

  function drawCoverImage(ctx, img, dx, dy, dw, dh, alignX = 0.5, alignY = 0.5, scale = 1) {
    if (!img) return;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;

    const baseRatio = Math.max(dw / iw, dh / ih);
    const drawW = iw * baseRatio * scale;
    const drawH = ih * baseRatio * scale;
    const drawX = dx + (dw - drawW) * alignX;
    const drawY = dy + (dh - drawH) * alignY;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  function drawBadge(ctx, label, x, y, w, h, palette, font = `700 9.5px ${FONT_SANS}`) {
    fillRoundedRect(ctx, x, y, w, h, 4.5, palette.bg, palette.border, 1);
    ctx.fillStyle = palette.fg;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x + w / 2, y + h / 2 + 0.5, w - 8);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
  }

  function drawAutoBadge(ctx, label, rightX, centerY, palette, height = 22, paddingX = 9) {
    ctx.font = `700 10px ${FONT_SANS}`;
    const textW = ctx.measureText(label).width;
    const w = Math.max(46, Math.ceil(textW + paddingX * 2));
    const x = rightX - w;
    const y = centerY - height / 2;
    drawBadge(ctx, label, x, y, w, height, palette, `700 10px ${FONT_SANS}`);
    return x;
  }

  function truncateFit(ctx, text, maxWidth) {
    const raw = String(text || "");
    if (ctx.measureText(raw).width <= maxWidth) return raw;
    let out = raw;
    while (out.length > 1 && ctx.measureText(`${out}…`).width > maxWidth) {
      out = out.slice(0, -1);
    }
    return `${out}…`;
  }

  function drawButterflyGlyph(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x + size / 2, y + size / 2);
    const s = size / 24;
    ctx.scale(s, s);
    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.moveTo(0, -2);
    ctx.bezierCurveTo(-5, -11, -12, -8, -10, 0);
    ctx.bezierCurveTo(-11, 6, -5, 9, 0, 3);
    ctx.bezierCurveTo(5, 9, 11, 6, 10, 0);
    ctx.bezierCurveTo(12, -8, 5, -11, 0, -2);
    ctx.fill();
    ctx.restore();
  }

  function drawLeftHeroPanel(ctx, stats, hero, heroMeta, images, t, showUid) {
    const theme = ELEMENT_THEMES[heroMeta.element] || ELEMENT_THEMES.Neutral;
    const isRecord = Boolean(hero && hero.isRecord);
    const heroPity = hero && Number.isInteger(hero.pity) && hero.pity > 0 ? hero.pity : null;
    const heroPityCol = pityPalette(heroPity || 0);
    const bannerIdx = hero ? KEYS.indexOf(hero.banner) : -1;
    const bannerName = bannerIdx >= 0 ? t.banners[bannerIdx] : t.banners[0];
    const heroStatusKey = hero ? hero.statusKey : "standard";
    const statusLabel = t.statusFull[heroStatusKey] || t.statusFull.standard;
    const statusCol = statusPalette(heroStatusKey);

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, LEFT_W, CARD_H);
    ctx.clip();

    ctx.fillStyle = "#0d1219";
    ctx.fillRect(0, 0, LEFT_W, CARD_H);

    const aura = ctx.createRadialGradient(LEFT_W * 0.46, CARD_H * 0.36, 10, LEFT_W * 0.46, CARD_H * 0.36, 390);
    aura.addColorStop(0, theme.glow);
    aura.addColorStop(0.45, theme.tint);
    aura.addColorStop(1, "rgba(11, 14, 20, 0.96)");
    ctx.fillStyle = aura;
    ctx.fillRect(0, 0, LEFT_W, CARD_H);

    if (images.heroSplash) {
      drawCoverImage(ctx, images.heroSplash, 0, 0, LEFT_W, CARD_H, 0.5, 0.18, 1.16);
    } else if (images.heroIcon) {
      ctx.save();
      ctx.globalAlpha = 0.25;
      drawCoverImage(ctx, images.heroIcon, 40, 120, 380, 380, 0.5, 0.2, 1.0);
      ctx.restore();
    }

    const fadeRight = ctx.createLinearGradient(LEFT_W * 0.68, 0, LEFT_W, 0);
    fadeRight.addColorStop(0, "rgba(11, 14, 20, 0)");
    fadeRight.addColorStop(0.88, "rgba(11, 14, 20, 0.92)");
    fadeRight.addColorStop(1, "#0b0e14");
    ctx.fillStyle = fadeRight;
    ctx.fillRect(0, 0, LEFT_W, CARD_H);

    const scrimTop = ctx.createLinearGradient(0, 0, 0, 115);
    scrimTop.addColorStop(0, "rgba(11, 14, 20, 0.82)");
    scrimTop.addColorStop(1, "rgba(11, 14, 20, 0)");
    ctx.fillStyle = scrimTop;
    ctx.fillRect(0, 0, LEFT_W, 115);

    const scrimBottom = ctx.createLinearGradient(0, CARD_H - 250, 0, CARD_H);
    scrimBottom.addColorStop(0, "rgba(11, 14, 20, 0)");
    scrimBottom.addColorStop(0.48, "rgba(11, 14, 20, 0.86)");
    scrimBottom.addColorStop(1, "rgba(11, 14, 20, 0.99)");
    ctx.fillStyle = scrimBottom;
    ctx.fillRect(0, CARD_H - 250, LEFT_W, 250);

    if (images.butterfly) {
      ctx.drawImage(images.butterfly, 26, 23, 22, 22);
    } else {
      drawButterflyGlyph(ctx, 26, 23, 22);
    }
    ctx.fillStyle = "#f3f5f9";
    ctx.font = `800 13px ${FONT_SANS}`;
    ctx.fillText("SPIRIFLY", 57, 39);

    if (showUid && stats.maskedUid) {
      const uidText = `UID · ${stats.maskedUid}`;
      ctx.font = `600 11px ${FONT_MONO}`;
      const uidW = Math.ceil(ctx.measureText(uidText).width + 20);
      const uidX = LEFT_W - 26 - uidW;
      fillRoundedRect(ctx, uidX, 22, uidW, 24, 6, "rgba(11, 14, 20, 0.74)", "rgba(255, 255, 255, 0.08)");
      ctx.fillStyle = "#98a2b8";
      ctx.textBaseline = "middle";
      ctx.fillText(uidText, uidX + 10, 34);
      ctx.textBaseline = "alphabetic";
    }

    const kickerY = 594;
    let kickerX = 26;
    if (images.elementIcon) {
      ctx.drawImage(images.elementIcon, kickerX, kickerY - 12, 16, 16);
      kickerX += 23;
    }
    ctx.fillStyle = theme.accent;
    ctx.font = `700 11px ${FONT_SANS}`;
    const kickerText = isRecord ? t.bestKicker : t.featuredKicker;
    ctx.fillText(kickerText, kickerX, kickerY);

    const pillLabel = t.pityLabel;
    const pillVal = heroPity !== null ? String(heroPity) : "—";
    ctx.font = `700 11px ${FONT_SANS}`;
    const lblW = ctx.measureText(pillLabel).width;
    ctx.font = `700 24px ${FONT_MONO}`;
    const valW = ctx.measureText(pillVal).width;
    const pillW = Math.ceil(lblW + valW + 30);
    const pillX = LEFT_W - 26 - pillW;
    const pillY = 612;

    fillRoundedRect(ctx, pillX, pillY, pillW, 38, 8, "rgba(18, 23, 34, 0.92)", heroPityCol.border, 1);
    ctx.fillStyle = heroPityCol.fg;
    ctx.font = `700 11px ${FONT_SANS}`;
    ctx.fillText(pillLabel, pillX + 12, pillY + 25);
    ctx.font = `700 24px ${FONT_MONO}`;
    ctx.fillText(pillVal, pillX + 12 + lblW + 6, pillY + 27);

    const nameMaxW = pillX - 26 - 14;
    const displayName = hero ? hero.name : t.empty;
    let nameSize = 38;
    ctx.font = `800 ${nameSize}px ${FONT_SANS}`;
    while (nameSize > 22 && ctx.measureText(displayName).width > nameMaxW) {
      nameSize -= 2;
      ctx.font = `800 ${nameSize}px ${FONT_SANS}`;
    }
    ctx.fillStyle = "#f3f5f9";
    ctx.fillText(truncateFit(ctx, displayName, nameMaxW), 26, 646);

    const subLeft = formatTemplate(t.bannerOf, { banner: bannerName });
    ctx.font = `500 13px ${FONT_SANS}`;
    ctx.fillStyle = "#98a2b8";
    const subLeftText = hero ? `${subLeft}  ·  ` : t.empty;
    ctx.fillText(subLeftText, 26, 676);
    if (hero) {
      const wLeft = ctx.measureText(subLeftText).width;
      ctx.fillStyle = statusCol.fg;
      ctx.font = `600 13px ${FONT_SANS}`;
      ctx.fillText(statusLabel, 26 + wLeft, 676, LEFT_W - 52 - wLeft);
    }

    ctx.restore();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(LEFT_W + 0.5, 0);
    ctx.lineTo(LEFT_W + 0.5, CARD_H);
    ctx.stroke();
  }

  function drawRightTopBar(ctx, stats, images, t, locale) {
    const x0 = LEFT_W + 32;
    const rightX = CARD_W - 32;

    ctx.fillStyle = "#98a2b8";
    ctx.font = `700 12px ${FONT_SANS}`;
    ctx.fillText(t.summaryTotal, x0, 48);
    const titleW = ctx.measureText(t.summaryTotal).width;

    const numLocale = locale === "es" ? "es-CL" : locale;
    const pillX = x0 + titleW + 14;
    const wishesStr = Number(stats.totalPulls).toLocaleString(numLocale);
    const primosStr = Number(stats.totalPrimos).toLocaleString(numLocale);

    ctx.font = `700 13px ${FONT_SANS}`;
    const wValW = ctx.measureText(wishesStr).width;
    const pValW = ctx.measureText(primosStr).width;
    ctx.font = `500 13px ${FONT_SANS}`;
    const wLblW = ctx.measureText(` ${t.wishesWord}`).width;
    const pLblW = ctx.measureText(` ${t.primosWord}`).width;

    const pillW = Math.ceil(12 + 16 + 6 + wValW + wLblW + 25 + 16 + 6 + pValW + pLblW + 14);
    fillRoundedRect(ctx, pillX, 28, pillW, 30, 8, "#121722", "rgba(255, 255, 255, 0.08)");

    let cx = pillX + 12;
    if (images.fate) ctx.drawImage(images.fate, cx, 35, 16, 16);
    cx += 22;
    ctx.fillStyle = "#f3f5f9";
    ctx.font = `700 13px ${FONT_SANS}`;
    ctx.fillText(wishesStr, cx, 48);
    cx += wValW;
    ctx.fillStyle = "#98a2b8";
    ctx.font = `500 13px ${FONT_SANS}`;
    ctx.fillText(` ${t.wishesWord}`, cx, 48);
    cx += wLblW + 12;

    ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
    ctx.fillRect(cx, 36, 1, 14);
    cx += 13;

    if (images.primo) ctx.drawImage(images.primo, cx, 35, 16, 16);
    cx += 22;
    ctx.fillStyle = "#f3f5f9";
    ctx.font = `700 13px ${FONT_SANS}`;
    ctx.fillText(primosStr, cx, 48);
    cx += pValW;
    ctx.fillStyle = "#98a2b8";
    ctx.font = `500 13px ${FONT_SANS}`;
    ctx.fillText(` ${t.primosWord}`, cx, 48);

    ctx.fillStyle = "#667085";
    ctx.font = `600 12px ${FONT_MONO}`;
    ctx.textAlign = "right";
    ctx.fillText("spirifly.app", rightX, 47);
    ctx.textAlign = "left";

    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.fillRect(x0, 72, rightX - x0, 1);
  }

  function drawKpiRow(ctx, stats, images, t) {
    const x0 = LEFT_W + 32;
    const totalW = CARD_W - 32 - x0;
    const gap = 12;
    const cardW = (totalW - gap * 3) / 4;
    const y0 = 90;
    const cardH = 114;

    for (let i = 0; i < 4; i++) {
      fillRoundedRect(ctx, x0 + i * (cardW + gap), y0, cardW, cardH, 10, "#121722", "rgba(255, 255, 255, 0.08)");
    }

    const drawCardLabel = (idx, label) => {
      const cx = x0 + idx * (cardW + gap) + 15;
      ctx.fillStyle = "#98a2b8";
      ctx.font = `700 10px ${FONT_SANS}`;
      ctx.fillText(label, cx, y0 + 24, cardW - 30);
    };

    // 1. Cinco Estrellas
    {
      const cx = x0 + 15;
      drawCardLabel(0, t.stars);
      ctx.fillStyle = "#f3f5f9";
      ctx.font = `800 30px ${FONT_SANS}`;
      ctx.fillText(String(stats.total5Stars), cx, y0 + 68);
      drawAutoBadge(ctx, "5★", x0 + cardW - 15, y0 + 57, statusPalette("guaranteed"), 22, 9);

      const parts = [
        `${stats.countsByBanner.character} ${t.bannerShort[0]}`,
        `${stats.countsByBanner.weapon} ${t.bannerShort[1]}`,
        `${stats.countsByBanner.standard} ${t.bannerShort[2]}`
      ];
      if (stats.countsByBanner.chronicled > 0) {
        parts.push(`${stats.countsByBanner.chronicled} ${t.bannerShort[3]}`);
      }
      ctx.fillStyle = "#98a2b8";
      ctx.font = `500 11px ${FONT_SANS}`;
      ctx.fillText(parts.join(" · "), cx, y0 + 96, cardW - 30);
    }

    // 2. Promedio 5★
    {
      const bx = x0 + (cardW + gap);
      const cx = bx + 15;
      drawCardLabel(1, stats.avgFromChar ? t.avgChar : t.avgAll);
      const isGoodAvg = stats.avg5Pity > 0 && stats.avg5Pity <= GLOBAL_AVG_PITY;
      ctx.fillStyle = stats.avg5Pity === 0 ? "#98a2b8" : (isGoodAvg ? "#34d399" : "#e6c67c");
      ctx.font = `800 30px ${FONT_SANS}`;
      ctx.fillText(stats.avg5Pity > 0 ? stats.avg5Pity.toFixed(1) : "—", cx, y0 + 68);

      if (stats.avg5Pity > 0) {
        const sign = stats.deltaVsGlobal > 0 ? "+" : "";
        const badgeLabel = `${sign}${stats.deltaVsGlobal.toFixed(1)} ${t.pityLabel}`;
        const pal = stats.deltaVsGlobal <= 0 ? statusPalette("won5050") : statusPalette("lost5050");
        drawAutoBadge(ctx, badgeLabel, bx + cardW - 15, y0 + 57, pal, 22, 7);
      }

      ctx.fillStyle = "#98a2b8";
      ctx.font = `500 11px ${FONT_SANS}`;
      ctx.fillText(t.globalMedia, cx, y0 + 96, cardW - 30);
    }

    // 3. 50/50 Ganados
    {
      const bx = x0 + 2 * (cardW + gap);
      const cx = bx + 15;
      drawCardLabel(2, t.win5050);
      const hasRate = stats.won5050Count + stats.lost5050Count > 0;
      ctx.fillStyle = "#f3f5f9";
      ctx.font = `800 30px ${FONT_SANS}`;
      ctx.fillText(hasRate ? `${stats.win5050Pct}%` : "—", cx, y0 + 68);

      if (stats.maxWinStreak > 0) {
        drawAutoBadge(
          ctx,
          `${t.streakPrefix} ${stats.maxWinStreak}`,
          bx + cardW - 15,
          y0 + 57,
          statusPalette("won5050"),
          22,
          8
        );
      }

      ctx.fillStyle = "#98a2b8";
      ctx.font = `500 11px ${FONT_SANS}`;
      ctx.fillText(
        formatTemplate(t.wonLost, { w: stats.won5050Count, l: stats.lost5050Count }),
        cx,
        y0 + 96,
        cardW - 30
      );
    }

    // 4. Peor Pity
    {
      const bx = x0 + 3 * (cardW + gap);
      const cx = bx + 15;
      drawCardLabel(3, t.worstPity);
      const wItem = stats.worst;
      const wPal = pityPalette(wItem ? wItem.pity : 0);
      ctx.fillStyle = wItem ? wPal.fg : "#98a2b8";
      ctx.font = `800 30px ${FONT_SANS}`;
      ctx.fillText(wItem ? String(wItem.pity) : "—", cx, y0 + 68);

      if (wItem) {
        const avX = bx + cardW - 15 - 38;
        const avY = y0 + 38;
        ctx.save();
        roundedRectPath(ctx, avX, avY, 38, 38, 7);
        const avGrad = ctx.createLinearGradient(avX, avY, avX + 38, avY + 38);
        avGrad.addColorStop(0, "#7a5328");
        avGrad.addColorStop(1, "#c89347");
        ctx.fillStyle = avGrad;
        ctx.fill();
        ctx.clip();
        if (images.worstIcon) {
          drawCoverImage(ctx, images.worstIcon, avX, avY, 38, 38, 0.5, 0.25, 1.0);
        }
        ctx.restore();
        roundedRectPath(ctx, avX, avY, 38, 38, 7);
        ctx.strokeStyle = "rgba(230, 198, 124, 0.38)";
        ctx.lineWidth = 1;
        ctx.stroke();

        const wStatus = t.statusFull[wItem.statusKey] || t.statusFull.standard;
        ctx.fillStyle = "#98a2b8";
        ctx.font = `500 11px ${FONT_SANS}`;
        ctx.fillText(truncateFit(ctx, `${wItem.name} · ${wStatus}`, cardW - 30), cx, y0 + 96);
      } else {
        ctx.fillStyle = "#667085";
        ctx.font = `500 11px ${FONT_SANS}`;
        ctx.fillText(t.empty, cx, y0 + 96, cardW - 30);
      }
    }
  }

  function drawBannerPityBlock(ctx, stats, t) {
    const x0 = LEFT_W + 32;
    const totalW = CARD_W - 32 - x0;
    const y0 = 226;
    const blockH = 164;

    fillRoundedRect(ctx, x0, y0, totalW, blockH, 10, "#121722", "rgba(255, 255, 255, 0.08)");

    ctx.fillStyle = "#98a2b8";
    ctx.font = `700 11px ${FONT_SANS}`;
    ctx.fillText(t.currentPity, x0 + 18, y0 + 28);

    const chr = stats.pityBanners.chronicled;
    const metaText = chr.totalPulls > 0
      ? `${t.banners[3]}: ${chr.current} / ${chr.max}`
      : t.currentPityMeta;
    ctx.fillStyle = "#667085";
    ctx.font = `500 11px ${FONT_MONO}`;
    ctx.textAlign = "right";
    ctx.fillText(metaText, x0 + totalW - 18, y0 + 28);
    ctx.textAlign = "left";

    const rows = [
      {
        label: t.banners[0],
        current: stats.pityBanners.character.current,
        max: 90,
        grad: ["#34d399", "#e6c67c"],
        badge: stats.pityBanners.character.isGuaranteed ? t.statusFull.guaranteed.toUpperCase() : t.active5050,
        palette: stats.pityBanners.character.isGuaranteed ? statusPalette("won5050") : statusPalette("standard")
      },
      {
        label: t.banners[1],
        current: stats.pityBanners.weapon.current,
        max: 80,
        grad: ["#5865f2", "#e6c67c"],
        badge: stats.pityBanners.weapon.isGuaranteed ? t.statusFull.guaranteed.toUpperCase() : t.active5050,
        palette: stats.pityBanners.weapon.isGuaranteed ? statusPalette("guaranteed") : statusPalette("standard")
      },
      {
        label: t.banners[2],
        current: stats.pityBanners.standard.current,
        max: 90,
        grad: ["#64748b", "#98a2b8"],
        badge: t.statusShort.standard,
        palette: statusPalette("standard")
      }
    ];

    const nameW = 114;
    const pityW = 74;
    const badgeW = 108;
    const barX = x0 + 18 + nameW;
    const barW = totalW - 36 - nameW - pityW - badgeW - 24;

    rows.forEach((row, idx) => {
      const ry = y0 + 62 + idx * 36;
      ctx.fillStyle = "#f3f5f9";
      ctx.font = `600 13px ${FONT_SANS}`;
      ctx.fillText(row.label, x0 + 18, ry + 4, nameW - 8);

      fillRoundedRect(ctx, barX, ry - 4, barW, 8, 99, "#0e131c", "rgba(255, 255, 255, 0.08)");
      const ratio = Math.max(0, Math.min(1, row.current / row.max));
      if (ratio > 0) {
        const fillW = Math.max(8, barW * ratio);
        const grad = ctx.createLinearGradient(barX, ry, barX + fillW, ry);
        grad.addColorStop(0, row.grad[0]);
        grad.addColorStop(1, row.grad[1]);
        fillRoundedRect(ctx, barX, ry - 4, fillW, 8, 99, grad);
      }

      const pityX = barX + barW + 14;
      ctx.font = `700 12.5px ${FONT_MONO}`;
      ctx.textAlign = "right";
      ctx.fillStyle = "#f3f5f9";
      const curStr = `${row.current} `;
      const maxStr = `/ ${row.max}`;
      const maxW = ctx.measureText(maxStr).width;
      ctx.fillText(curStr, pityX + pityW - maxW, ry + 4);
      ctx.fillStyle = "#667085";
      ctx.font = `500 12.5px ${FONT_MONO}`;
      ctx.fillText(maxStr, pityX + pityW, ry + 4);
      ctx.textAlign = "left";

      drawBadge(
        ctx,
        row.badge,
        x0 + totalW - 18 - badgeW,
        ry - 10,
        badgeW,
        20,
        row.palette,
        `700 9.5px ${FONT_SANS}`
      );
    });
  }

  function drawRecentFiveStars(ctx, stats, recentMetas, images, t) {
    const x0 = LEFT_W + 32;
    const totalW = CARD_W - 32 - x0;
    const y0 = 412;
    const blockH = 232;

    fillRoundedRect(ctx, x0, y0, totalW, blockH, 10, "#121722", "rgba(255, 255, 255, 0.08)");

    const bIdx = KEYS.indexOf(stats.recentBanner);
    const bannerLabel = bIdx >= 0 ? t.banners[bIdx] : t.banners[0];
    ctx.fillStyle = "#98a2b8";
    ctx.font = `700 11px ${FONT_SANS}`;
    ctx.fillText(formatTemplate(t.recentChars, { banner: bannerLabel.toUpperCase() }), x0 + 18, y0 + 28);

    ctx.fillStyle = "#667085";
    ctx.font = `500 11px ${FONT_SANS}`;
    ctx.textAlign = "right";
    ctx.fillText(t.recentSub, x0 + totalW - 18, y0 + 28);
    ctx.textAlign = "left";

    const items = stats.recentFiveStars || [];
    if (items.length === 0) {
      ctx.fillStyle = "#667085";
      ctx.font = `500 13px ${FONT_SANS}`;
      ctx.fillText(t.empty, x0 + 18, y0 + 70);
      return;
    }

    const gap = 10;
    const innerW = totalW - 36;
    const chipW = (innerW - gap * 7) / 8;
    const chipH = 148;
    const chipY = y0 + 54;

    items.forEach((item, idx) => {
      const cx = x0 + 18 + idx * (chipW + gap);
      fillRoundedRect(ctx, cx, chipY, chipW, chipH, 9, "#171d2b", "rgba(255, 255, 255, 0.08)");

      const avX = cx + 6;
      const avY = chipY + 7;
      const avSize = chipW - 12;

      ctx.save();
      roundedRectPath(ctx, avX, avY, avSize, avSize, 7);
      const avGrad = ctx.createLinearGradient(avX, avY, avX + avSize, avY + avSize);
      avGrad.addColorStop(0, "#7a5328");
      avGrad.addColorStop(1, "#c89347");
      ctx.fillStyle = avGrad;
      ctx.fill();
      ctx.clip();

      const img = images.recentIcons[idx];
      if (img) {
        drawCoverImage(ctx, img, avX, avY, avSize, avSize, 0.5, 0.25, 1.0);
      } else {
        ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
        ctx.font = `800 22px ${FONT_SANS}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("★", avX + avSize / 2, avY + avSize / 2);
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
      }
      ctx.restore();

      roundedRectPath(ctx, avX, avY, avSize, avSize, 7);
      ctx.strokeStyle = "rgba(230, 198, 124, 0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Pity badge sobre esquina inferior derecha del avatar
      const pText = String(item.pity || "—");
      const pPal = pityPalette(item.pity || 0);
      ctx.font = `700 11px ${FONT_MONO}`;
      const pW = Math.max(20, Math.ceil(ctx.measureText(pText).width + 10));
      const pX = avX + avSize - 4 - pW;
      const pY = avY + avSize - 4 - 17;
      fillRoundedRect(ctx, pX, pY, pW, 17, 4.5, "rgba(11, 14, 20, 0.9)", "rgba(255, 255, 255, 0.16)");
      ctx.fillStyle = pPal.fg;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(pText, pX + pW / 2, pY + 9);
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      // Nombre corto debajo del avatar
      const meta = recentMetas[idx];
      ctx.fillStyle = "#f3f5f9";
      ctx.font = `600 11.5px ${FONT_SANS}`;
      ctx.textAlign = "center";
      ctx.fillText(truncateFit(ctx, meta ? meta.shortName : item.name, chipW - 10), cx + chipW / 2, avY + avSize + 20);
      ctx.textAlign = "left";

      // Badge de estado en la base de la tarjeta
      const stLabel = t.statusShort[item.statusKey] || t.statusShort.standard;
      drawBadge(
        ctx,
        stLabel,
        cx + 6,
        chipY + chipH - 27,
        chipW - 12,
        20,
        statusPalette(item.statusKey),
        `700 9.5px ${FONT_SANS}`
      );
    });
  }

  function drawFooter(ctx, t) {
    const x0 = LEFT_W + 32;
    const rightX = CARD_W - 32;
    ctx.fillStyle = "#667085";
    ctx.font = `500 11px ${FONT_SANS}`;
    ctx.fillText(t.note, x0, 690, rightX - x0 - 170);
    ctx.textAlign = "right";
    ctx.fillText(t.seal, rightX, 690);
    ctx.textAlign = "left";
  }

  async function loadCardAssets(stats, heroMeta, recentMetas, index) {
    const theme = ELEMENT_THEMES[heroMeta.element] || ELEMENT_THEMES.Neutral;
    const worstMeta = stats.worst ? resolveCharacterMeta(stats.worst.name, index) : null;

    const [butterfly, fate, primo, elementIcon, splashTry, iconTry, worstIcon, recentIcons] = await Promise.all([
      loadImageSafe("assets/ui/hu_tao_butterfly.svg"),
      loadImageSafe("assets/ui/icon_intertwined.png"),
      loadImageSafe("assets/ui/icon_primogem.png"),
      theme.icon ? loadImageSafe(theme.icon) : Promise.resolve(null),
      heroMeta.splashUrl ? loadImageSafe(heroMeta.splashUrl) : Promise.resolve(null),
      heroMeta.icon ? loadImageSafe(heroMeta.icon) : Promise.resolve(null),
      worstMeta && worstMeta.icon ? loadImageSafe(worstMeta.icon) : Promise.resolve(null),
      Promise.all(recentMetas.map((m) => (m && m.icon ? loadImageSafe(m.icon) : Promise.resolve(null))))
    ]);

    return {
      butterfly,
      fate,
      primo,
      elementIcon,
      heroSplash: splashTry,
      heroIcon: iconTry,
      worstIcon,
      recentIcons
    };
  }

  async function renderCanvas(result, lang, options) {
    const t = getCopy(lang);
    const opts = options || {};
    const stats = extractStats(result, opts);
    const candidates = getHeroCandidates(result);
    const selectedHero = candidates.find((c) => c.id === opts.heroId) || candidates[0] || null;
    const index = buildCharacterIndex();
    const heroMeta = selectedHero ? resolveCharacterMeta(selectedHero.name, index) : resolveCharacterMeta("", index);
    const recentMetas = (stats.recentFiveStars || []).map((item) => resolveCharacterMeta(item.name, index));

    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const images = await loadCardAssets(stats, heroMeta, recentMetas, index);

    const canvas = document.createElement("canvas");
    canvas.width = CARD_W * DPR;
    canvas.height = CARD_H * DPR;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D unavailable");

    ctx.scale(DPR, DPR);
    ctx.fillStyle = "#0b0e14";
    ctx.fillRect(0, 0, CARD_W, CARD_H);

    drawLeftHeroPanel(ctx, stats, selectedHero, heroMeta, images, t, opts.showUid !== false);
    drawRightTopBar(ctx, stats, images, t, lang || "es");
    drawKpiRow(ctx, stats, images, t);
    drawBannerPityBlock(ctx, stats, t);
    drawRecentFiveStars(ctx, stats, recentMetas, images, t);
    drawFooter(ctx, t);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, CARD_W - 1, CARD_H - 1);

    return canvas;
  }

  function makeCanvas(summary, lang) {
    const t = getCopy(lang);
    const canvas = document.createElement("canvas");
    canvas.width = CARD_W;
    canvas.height = CARD_H;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D unavailable");
    ctx.fillStyle = "#0b0e14";
    ctx.fillRect(0, 0, CARD_W, CARD_H);
    ctx.fillStyle = "#f3f5f9";
    ctx.font = `700 32px ${FONT_SANS}`;
    ctx.fillText(`SPIRIFLY · ${t.title}`, 48, 88);
    ctx.font = `700 64px ${FONT_MONO}`;
    ctx.fillStyle = "#e6c67c";
    ctx.fillText(String(summary?.best?.pity ?? "—"), 48, 210);
    return canvas;
  }

  function slugify(value) {
    return normalizeName(value).replace(/\s+/g, "-") || "resumen";
  }

  async function open(result, lang, options) {
    const stats = extractStats(result, options);
    if (!stats.totalPulls) return;
    const t = getCopy(lang);
    const candidates = getHeroCandidates(result);
    let currentHeroId = options?.heroId || (candidates[0] ? candidates[0].id : "best");
    let showUid = options?.showUid !== false && Boolean(stats.maskedUid);
    let currentUrl = "";
    let currentBlob = null;
    let renderSeq = 0;

    try {
      const dialog = document.createElement("dialog");
      dialog.className = "wish-share-dialog";
      dialog.setAttribute("aria-label", t.button);

      const header = document.createElement("div");
      header.className = "wish-share-header";
      const title = document.createElement("h2");
      title.textContent = t.button;
      const closeX = document.createElement("button");
      closeX.type = "button";
      closeX.className = "wish-share-close-x";
      closeX.setAttribute("aria-label", t.close);
      closeX.textContent = "×";
      closeX.addEventListener("click", () => dialog.close());
      header.append(title, closeX);

      const controls = document.createElement("div");
      controls.className = "wish-share-controls";

      if (candidates.length > 0) {
        const selectLabel = document.createElement("label");
        selectLabel.className = "wish-share-control-group";
        const spanLbl = document.createElement("span");
        spanLbl.textContent = t.heroSelectLabel;

        const select = document.createElement("select");
        select.id = "wishShareHeroSelect";
        select.className = "wish-share-select";

        candidates.forEach((cand) => {
          const opt = document.createElement("option");
          opt.value = cand.id;
          const bIdx = KEYS.indexOf(cand.banner);
          const bName = bIdx >= 0 ? t.bannerShort[bIdx] : "";
          const statusTxt = t.statusFull[cand.statusKey] || t.statusFull.standard;
          const pityPart = cand.pity > 0 ? `${t.pityLabel} ${cand.pity}` : "";
          const baseText = `${cand.name}${pityPart ? ` · ${pityPart}` : ""} (${statusTxt}${cand.banner !== "character" && bName ? ` · ${bName}` : ""})`;
          opt.textContent = cand.isRecord ? `${t.bestOptionPrefix} ${baseText}` : baseText;
          if (cand.id === currentHeroId) opt.selected = true;
          select.append(opt);
        });

        select.addEventListener("change", () => {
          currentHeroId = select.value;
          refreshPreview();
        });

        selectLabel.append(spanLbl, select);
        controls.append(selectLabel);
      }

      if (stats.maskedUid) {
        const uidLabel = document.createElement("label");
        uidLabel.className = "wish-share-toggle";
        const uidCheck = document.createElement("input");
        uidCheck.type = "checkbox";
        uidCheck.id = "wishShareShowUid";
        uidCheck.checked = showUid;
        uidCheck.addEventListener("change", () => {
          showUid = uidCheck.checked;
          refreshPreview();
        });
        const uidText = document.createElement("span");
        uidText.textContent = `${t.showUidLabel} (${stats.maskedUid})`;
        uidLabel.append(uidCheck, uidText);
        controls.append(uidLabel);
      }

      const previewWrap = document.createElement("div");
      previewWrap.className = "wish-share-preview-wrap is-loading";
      const image = document.createElement("img");
      image.id = "wishSharePreviewImg";
      previewWrap.append(image);

      const actions = document.createElement("div");
      actions.className = "wish-share-actions";

      const canCopy = typeof navigator !== "undefined"
        && navigator.clipboard
        && typeof navigator.clipboard.write === "function"
        && typeof ClipboardItem === "function";

      if (canCopy) {
        const copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.id = "btnCopyWishShare";
        copyBtn.className = "action-btn secondary";
        copyBtn.textContent = t.copyBtn;
        copyBtn.addEventListener("click", async () => {
          if (!currentBlob) return;
          try {
            await navigator.clipboard.write([new ClipboardItem({ "image/png": currentBlob })]);
            copyBtn.textContent = t.copiedBtn;
            setTimeout(() => { copyBtn.textContent = t.copyBtn; }, 1800);
          } catch (err) {
            console.error("Copy PNG failed:", err);
            alert(t.copyError);
          }
        });
        actions.append(copyBtn);
      }

      const download = document.createElement("a");
      download.className = "action-btn";
      download.id = "btnDownloadWishShare";
      download.textContent = t.download;

      const close = document.createElement("button");
      close.type = "button";
      close.className = "action-btn secondary";
      close.textContent = t.close;
      close.addEventListener("click", () => dialog.close());
      actions.append(download, close);

      dialog.append(header, controls, previewWrap, actions);
      document.body.append(dialog);
      dialog.addEventListener("close", () => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        dialog.remove();
      }, { once: true });

      async function refreshPreview() {
        const mySeq = ++renderSeq;
        previewWrap.classList.add("is-loading");
        try {
          const canvas = await renderCanvas(result, lang, {
            uid: options?.uid,
            heroId: currentHeroId,
            showUid
          });
          const blob = await new Promise((resolve, reject) =>
            canvas.toBlob((val) => (val ? resolve(val) : reject(new Error("PNG encoding failed"))), "image/png")
          );
          if (mySeq !== renderSeq || !dialog.isConnected) return;
          const nextUrl = URL.createObjectURL(blob);
          if (currentUrl) URL.revokeObjectURL(currentUrl);
          currentUrl = nextUrl;
          currentBlob = blob;

          const activeCand = candidates.find((c) => c.id === currentHeroId) || stats.best;
          image.src = nextUrl;
          image.alt = `${t.title}. ${t.stars}: ${stats.total5Stars}. ${activeCand ? `${activeCand.name} Pity ${activeCand.pity}` : ""}`;
          download.href = nextUrl;
          download.download = `spirifly-${activeCand ? slugify(activeCand.name) : "wishes"}.png`;
        } catch (err) {
          if (mySeq === renderSeq) {
            console.error("Wish share PNG:", err);
            alert(t.error);
          }
        } finally {
          if (mySeq === renderSeq) previewWrap.classList.remove("is-loading");
        }
      }

      dialog.showModal();
      await refreshPreview();
      close.focus();
    } catch (error) {
      console.error("Wish share modal:", error);
      alert(t.error);
    }
  }

  function update(result, lang) {
    const button = document.getElementById("btnShareWishes");
    if (!button) return;
    const t = getCopy(lang);
    button.textContent = t.button;
    button.disabled = !result?.summary?.totalPullsAll;
  }

  return {
    summarize,
    extractStats,
    getHeroCandidates,
    resolveCharacterMeta,
    makeCanvas,
    renderCanvas,
    open,
    update
  };
});
