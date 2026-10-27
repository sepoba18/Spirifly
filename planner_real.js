/* =====================================================================
   PLANIFICADOR DE PERSONAJES (REPLICA DE SEELIE.ME) - DATOS 100% OFICIALES
   Depende de data_real_genshin.js (se carga antes que app.js).
   - Personajes, armas, talentos, costos y materiales: oficiales (gi.yatta.moe, es).
   - Niveles: 14 estados (1, 20, 20+asc, 40, 40+asc, ... 80+asc, 90).
   ===================================================================== */

const ELEMENT_BANNERS = {
  Anemo: "linear-gradient(135deg, #1b4d44 0%, #172a3a 65%, #243b4a 100%)",
  Cryo: "linear-gradient(135deg, #244b6b 0%, #1b283d 65%, #283a52 100%)",
  Dendro: "linear-gradient(135deg, #2d4f25 0%, #1a2c24 65%, #263d29 100%)",
  Electro: "linear-gradient(135deg, #432863 0%, #211d3a 65%, #342652 100%)",
  Geo: "linear-gradient(135deg, #5c451c 0%, #29231e 65%, #423522 100%)",
  Hydro: "linear-gradient(135deg, #1e426e 0%, #19263c 65%, #243957 100%)",
  Pyro: "linear-gradient(135deg, #632923 0%, #2b1d24 65%, #472524 100%)"
};

const WEAPON_TYPE_LABELS = {
  Sword: "Espada ligera",
  Claymore: "Mandoble",
  Polearm: "Lanza",
  Bow: "Arco",
  Catalyst: "Catalizador"
};

const WEAPON_TYPE_I18N = {
  es: { Sword: "Espada ligera", Claymore: "Mandoble", Polearm: "Lanza", Bow: "Arco", Catalyst: "Catalizador" },
  en: { Sword: "Sword", Claymore: "Claymore", Polearm: "Polearm", Bow: "Bow", Catalyst: "Catalyst" },
  pt: { Sword: "Espada", Claymore: "Espadão", Polearm: "Lança", Bow: "Arco", Catalyst: "Catalisador" },
  ja: { Sword: "片手剣", Claymore: "両手剣", Polearm: "長柄武器", Bow: "弓", Catalyst: "法器" },
  ko: { Sword: "한손검", Claymore: "양손검", Polearm: "장병기", Bow: "활", Catalyst: "법구" }
};

const TALENT_ROLE_I18N = {
  es: ["Ataque normal", "Habilidad elemental", "Habilidad definitiva"],
  en: ["Normal Attack", "Elemental Skill", "Elemental Burst"],
  pt: ["Ataque Normal", "Habilidade Elemental", "Supremo"],
  ja: ["通常攻撃", "元素スキル", "元素爆発"],
  ko: ["일반 공격", "원소전투 스킬", "원소폭발"]
};

const PLANNER_MODAL_I18N = {
  es: {
    filter: "FILTRAR",
    filterWeapons: "FILTRAR ARMAS",
    search: "Buscar...",
    searchWeapon: "Buscar arma...",
    noCharMatch: "Ningún personaje coincide con los filtros.",
    noWeapMatch: "Ninguna arma coincide con los filtros.",
    emptyPlanner: 'Aún no tienes personajes ni armas. Pulsa "+ Personaje" o "+ Arma" para elegir del catálogo oficial.',
    notesPlaceholder: "Notas (ej. DPS principal, build EM...)",
    weapNotesPlaceholder: "Notas (ej. Equipada en Furina, subir a R5...)",
    tabLevel: "NIVEL",
    tabTalents: "TALENTOS",
    tabWeapon: "ARMA",
    incLevel: "Incluir mejora de Nivel",
    curLabel: "Actual",
    tarLabel: "Objetivo",
    talHeader: "TALENTOS DEL PERSONAJE (ACTUAL » OBJETIVO)",
    presets: "Presets rápidos:",
    weapHeader: "ARMA EQUIPADA Y SUBIDA DE NIVEL",
    incWeapon: "Incluir mejora de Arma",
    curWeapLvl: "Nivel Actual del Arma",
    tarWeapLvl: "Nivel Objetivo del Arma",
    charLabel: "PERSONAJE",
    weapLabel: "ARMA",
    totalLabel: "TOTAL",
    soloWeapHeader: "MEJORA DE NIVEL Y ASCENSIÓN (1 A 90)",
    starHint: "Estrella tenue = Sin ascender • Estrella blanca brillante = Ascendido (✦)",
    crown: "Corona",
    lvPrefix: "Nv.",
    noWeaponEquipped: "Sin arma equipada · elige un icono",
    pickWeaponHint: "Elige un arma para ver sus materiales de subida.",
    weapSameLvl: "el nivel objetivo es igual al actual",
    noMatsNeeded: "No necesitas materiales.",
    weapUpMats: "materiales de subida",
    lvlMatsTitle: "Materiales de nivel y ascensión (lo que tienes / lo que necesitas). Puedes editar lo que tienes.",
    lvlDisabledMsg: "La mejora de nivel está desactivada.",
    lvlPickHigherMsg: "Elige un nivel objetivo superior al actual para ver los materiales de ascensión.",
    talMatsTitle: "Materiales de talentos (lo que tienes / lo que necesitas). Puedes editar lo que tienes.",
    talPickHigherMsg: "Sube el nivel objetivo de algún talento para ver sus materiales.",
    soloSameLvl: "El nivel objetivo es igual al actual",
    soloMatsTitle: "Materiales de ascensión y minerales",
    canEditOwned: "Puedes editar lo que tienes.",
    popCharCur: "Seleccionar nivel actual",
    popCharTar: "Seleccionar nivel objetivo",
    popWeapCur: "Seleccionar nivel actual del arma",
    popWeapTar: "Seleccionar nivel objetivo del arma",
    ascendedWord: "ascendido",
    unascendedWord: "sin ascender"
  },
  en: {
    filter: "FILTER",
    filterWeapons: "FILTER WEAPONS",
    search: "Search...",
    searchWeapon: "Search weapon...",
    noCharMatch: "No characters match the filters.",
    noWeapMatch: "No weapons match the filters.",
    emptyPlanner: 'You have no characters or weapons yet. Click "+ Character" or "+ Weapon" to choose from the official catalog.',
    notesPlaceholder: "Notes (e.g. Main DPS, EM build...)",
    weapNotesPlaceholder: "Notes (e.g. Equipped on Furina, refine to R5...)",
    tabLevel: "LEVEL",
    tabTalents: "TALENTS",
    tabWeapon: "WEAPON",
    incLevel: "Include Level upgrade",
    curLabel: "Current",
    tarLabel: "Target",
    talHeader: "CHARACTER TALENTS (CURRENT » TARGET)",
    presets: "Quick presets:",
    weapHeader: "EQUIPPED WEAPON & LEVEL UP",
    incWeapon: "Include Weapon upgrade",
    curWeapLvl: "Current Weapon Level",
    tarWeapLvl: "Target Weapon Level",
    charLabel: "CHARACTER",
    weapLabel: "WEAPON",
    totalLabel: "TOTAL",
    soloWeapHeader: "LEVEL & ASCENSION UPGRADE (1 TO 90)",
    starHint: "Dim star = Unascended • Bright white star = Ascended (✦)",
    crown: "Crown",
    lvPrefix: "Lv.",
    noWeaponEquipped: "No weapon equipped · pick an icon",
    pickWeaponHint: "Pick a weapon to see its upgrade materials.",
    weapSameLvl: "target level equals current level",
    noMatsNeeded: "No materials needed.",
    weapUpMats: "upgrade materials",
    lvlMatsTitle: "Level & ascension materials (owned / needed). Click to edit owned amounts.",
    lvlDisabledMsg: "Level upgrade is disabled.",
    lvlPickHigherMsg: "Choose a target level higher than current to see ascension materials.",
    talMatsTitle: "Talent materials (owned / needed). Click to edit owned amounts.",
    talPickHigherMsg: "Raise a talent's target level to see its required materials.",
    soloSameLvl: "Target level equals current level",
    soloMatsTitle: "Ascension materials & enhancement ores",
    canEditOwned: "Click to edit owned amounts.",
    popCharCur: "Select current level",
    popCharTar: "Select target level",
    popWeapCur: "Select current weapon level",
    popWeapTar: "Select target weapon level",
    ascendedWord: "ascended",
    unascendedWord: "unascended"
  },
  pt: {
    filter: "FILTRAR",
    filterWeapons: "FILTRAR ARMAS",
    search: "Buscar...",
    searchWeapon: "Buscar arma...",
    noCharMatch: "Nenhum personagem corresponde aos filtros.",
    noWeapMatch: "Nenhuma arma corresponde aos filtros.",
    emptyPlanner: 'Você ainda não tem personagens nem armas. Clique em "+ Personagem" ou "+ Arma" para escolher do catálogo oficial.',
    notesPlaceholder: "Notas (ex. DPS principal, build Proficiência...)",
    weapNotesPlaceholder: "Notas (ex. Equipada na Furina, subir para R5...)",
    tabLevel: "NÍVEL",
    tabTalents: "TALENTOS",
    tabWeapon: "ARMA",
    incLevel: "Incluir melhoria de Nível",
    curLabel: "Atual",
    tarLabel: "Alvo",
    talHeader: "TALENTOS DO PERSONAGEM (ATUAL » ALVO)",
    presets: "Predefinições rápidas:",
    weapHeader: "ARMA EQUIPADA E ELEVAÇÃO DE NÍVEL",
    incWeapon: "Incluir melhoria de Arma",
    curWeapLvl: "Nível Atual da Arma",
    tarWeapLvl: "Nível Alvo da Arma",
    charLabel: "PERSONAGEM",
    weapLabel: "ARMA",
    totalLabel: "TOTAL",
    soloWeapHeader: "MELHORIA DE NÍVEL E ASCENSÃO (1 A 90)",
    starHint: "Estrela apagada = Sem ascensão • Estrela brilhante = Ascendido (✦)",
    crown: "Coroa",
    lvPrefix: "Nv.",
    noWeaponEquipped: "Sem arma equipada · escolha um ícone",
    pickWeaponHint: "Escolha uma arma para ver seus materiais de elevação.",
    weapSameLvl: "o nível alvo é igual ao atual",
    noMatsNeeded: "Nenhum material necessário.",
    weapUpMats: "materiais de elevação",
    lvlMatsTitle: "Materiais de nível e ascensão (possuídos / necessários). Você pode editar o que tem.",
    lvlDisabledMsg: "A melhoria de nível está desativada.",
    lvlPickHigherMsg: "Escolha um nível alvo superior ao atual para ver os materiais de ascensão.",
    talMatsTitle: "Materiais de talentos (possuídos / necessários). Você pode editar o que tem.",
    talPickHigherMsg: "Aumente o nível alvo de algum talento para ver seus materiais.",
    soloSameLvl: "O nível alvo é igual ao atual",
    soloMatsTitle: "Materiais de ascensão e minérios",
    canEditOwned: "Você pode editar o que tem.",
    popCharCur: "Selecionar nível atual",
    popCharTar: "Selecionar nível alvo",
    popWeapCur: "Selecionar nível atual da arma",
    popWeapTar: "Selecionar nível alvo da arma",
    ascendedWord: "ascendido",
    unascendedWord: "sem ascensão"
  },
  ja: {
    filter: "フィルター",
    filterWeapons: "武器フィルター",
    search: "検索...",
    searchWeapon: "武器を検索...",
    noCharMatch: "条件に一致するキャラクターがいません。",
    noWeapMatch: "条件に一致する武器がありません。",
    emptyPlanner: "キャラクターや武器がまだ登録されていません。「+ キャラ」または「+ 武器」から追加してください。",
    notesPlaceholder: "メモ (例: メインアタッカー、熟知ビルド...)",
    weapNotesPlaceholder: "メモ (例: フリーナ装備、完凸目標...)",
    tabLevel: "レベル",
    tabTalents: "天賦",
    tabWeapon: "武器",
    incLevel: "レベル強化を含める",
    curLabel: "現在",
    tarLabel: "目標",
    talHeader: "キャラクター天賦 (現在 » 目標)",
    presets: "クイック設定:",
    weapHeader: "装備武器・レベル強化",
    incWeapon: "武器強化を含める",
    curWeapLvl: "現在の武器レベル",
    tarWeapLvl: "目標の武器レベル",
    charLabel: "キャラクター",
    weapLabel: "武器",
    totalLabel: "合計",
    soloWeapHeader: "レベル＆突破強化 (1〜90)",
    starHint: "暗い星 = 未突破 • 輝く白い星 = 突破済み (✦)",
    crown: "知恵の冠",
    lvPrefix: "Lv.",
    noWeaponEquipped: "武器未装備 · アイコンを選択",
    pickWeaponHint: "武器を選択すると強化素材が表示されます。",
    weapSameLvl: "目標レベルが現在と同じです",
    noMatsNeeded: "素材は必要ありません。",
    weapUpMats: "強化素材",
    lvlMatsTitle: "レベル・突破素材 (所持数 / 必要数)。クリックして所持数を編集できます。",
    lvlDisabledMsg: "レベル強化は無効になっています。",
    lvlPickHigherMsg: "現在より高い目標レベルを選択すると突破素材が表示されます。",
    talMatsTitle: "天賦素材 (所持数 / 必要数)。クリックして所持数を編集できます。",
    talPickHigherMsg: "天賦の目標レベルを上げると必要素材が表示されます。",
    soloSameLvl: "目標レベルが現在と同じです",
    soloMatsTitle: "突破素材＆仕上げ用魔鉱",
    canEditOwned: "所持数を直接編集できます。",
    popCharCur: "現在のレベルを選択",
    popCharTar: "目標レベルを選択",
    popWeapCur: "現在の武器レベルを選択",
    popWeapTar: "目標の武器レベルを選択",
    ascendedWord: "突破済み",
    unascendedWord: "未突破"
  },
  ko: {
    filter: "필터",
    filterWeapons: "무기 필터",
    search: "검색...",
    searchWeapon: "무기 검색...",
    noCharMatch: "필터와 일치하는 캐릭터가 없습니다.",
    noWeapMatch: "필터와 일치하는 무기가 없습니다.",
    emptyPlanner: '아직 등록된 캐릭터나 무기가 없습니다. "+ 캐릭터" 또는 "+ 무기" 버튼을 눌러 추가하세요.',
    notesPlaceholder: "메모 (예: 메인 딜러, 원소 마스터리 빌드...)",
    weapNotesPlaceholder: "메모 (예: 푸리나 장착, 5재련 목표...)",
    tabLevel: "레벨",
    tabTalents: "특성",
    tabWeapon: "무기",
    incLevel: "레벨 육성 포함",
    curLabel: "현재",
    tarLabel: "목표",
    talHeader: "캐릭터 특성 (현재 » 목표)",
    presets: "빠른 프리셋:",
    weapHeader: "장착 무기 및 레벨 육성",
    incWeapon: "무기 육성 포함",
    curWeapLvl: "현재 무기 레벨",
    tarWeapLvl: "목표 무기 레벨",
    charLabel: "캐릭터",
    weapLabel: "무기",
    totalLabel: "합계",
    soloWeapHeader: "레벨 및 돌파 육성 (1 ~ 90)",
    starHint: "어두운 별 = 미돌파 • 밝은 하얀 별 = 돌파 완료 (✦)",
    crown: "지식의 왕관",
    lvPrefix: "Lv.",
    noWeaponEquipped: "장착된 무기 없음 · 아이콘 선택",
    pickWeaponHint: "무기를 선택하면 육성 재료가 표시됩니다.",
    weapSameLvl: "목표 레벨이 현재 레벨과 같습니다",
    noMatsNeeded: "필요한 재료가 없습니다.",
    weapUpMats: "육성 재료",
    lvlMatsTitle: "레벨 및 돌파 재료 (보유량 / 필요량). 클릭하여 보유량을 수정할 수 있습니다.",
    lvlDisabledMsg: "레벨 육성이 비활성화되어 있습니다.",
    lvlPickHigherMsg: "현재보다 높은 목표 레벨을 선택하면 돌파 재료가 표시됩니다.",
    talMatsTitle: "특성 재료 (보유량 / 필요량). 클릭하여 보유량을 수정할 수 있습니다.",
    talPickHigherMsg: "특성의 목표 레벨을 올리면 필요한 재료가 표시됩니다.",
    soloSameLvl: "목표 레벨이 현재 레벨과 같습니다",
    soloMatsTitle: "돌파 재료 및 정제용 마법 광물",
    canEditOwned: "보유량을 직접 수정할 수 있습니다.",
    popCharCur: "현재 레벨 선택",
    popCharTar: "목표 레벨 선택",
    popWeapCur: "현재 무기 레벨 선택",
    popWeapTar: "목표 무기 레벨 선택",
    ascendedWord: "돌파 완료",
    unascendedWord: "미돌파"
  }
};

function getPlannerModalI18n() {
  const lang = (typeof state !== "undefined" && state.lang) || "es";
  return PLANNER_MODAL_I18N[lang] || PLANNER_MODAL_I18N.es;
}

function getWeaponTypeLabel(type) {
  const lang = (typeof state !== "undefined" && state.lang) || "es";
  const dict = WEAPON_TYPE_I18N[lang] || WEAPON_TYPE_I18N.es;
  return dict[type] || type;
}

function getTalentRoleLabel(idx) {
  const lang = (typeof state !== "undefined" && state.lang) || "es";
  const arr = TALENT_ROLE_I18N[lang] || TALENT_ROLE_I18N.es;
  return arr[idx] || arr[0];
}

function setLastTextNode(el, text) {
  if (!el) return;
  for (let i = el.childNodes.length - 1; i >= 0; i--) {
    if (el.childNodes[i].nodeType === 3 && el.childNodes[i].textContent.trim().length > 0) {
      el.childNodes[i].textContent = " " + text;
      return;
    }
  }
  el.appendChild(document.createTextNode(" " + text));
}

function applyPlannerModalStaticTranslations() {
  const pm = getPlannerModalI18n();
  const rosterTitle = document.querySelector("#seelieRosterModal .seelie-filter-lbl");
  if (rosterTitle) rosterTitle.textContent = pm.filter;
  const weapRosterTitle = document.querySelector("#seelieWeaponRosterModal .seelie-filter-lbl");
  if (weapRosterTitle) weapRosterTitle.textContent = pm.filterWeapons;
  const rSearch = document.getElementById("rosterModalSearch");
  if (rSearch) rSearch.placeholder = pm.search;
  const wSearch = document.getElementById("weaponRosterModalSearch");
  if (wSearch) wSearch.placeholder = pm.searchWeapon;
  const cNotes = document.getElementById("cfgModalNotes");
  if (cNotes) cNotes.placeholder = pm.notesPlaceholder;
  const wNotes = document.getElementById("soloWeapNotes");
  if (wNotes) wNotes.placeholder = pm.weapNotesPlaceholder;

  setLastTextNode(document.querySelector('[data-cfgtab="level"]'), pm.tabLevel);
  setLastTextNode(document.querySelector('[data-cfgtab="talents"]'), pm.tabTalents);
  setLastTextNode(document.querySelector('[data-cfgtab="weapon"]'), pm.tabWeapon);

  const lvBar = document.querySelector("#cfgTabPane-level .seelie-blue-section-bar");
  if (lvBar) lvBar.textContent = pm.tabLevel;
  const talBar = document.querySelector("#cfgTabPane-talents .seelie-blue-section-bar");
  if (talBar) talBar.textContent = pm.talHeader;
  const weapBar = document.querySelector("#cfgTabPane-weapon .seelie-blue-section-bar");
  if (weapBar) weapBar.textContent = pm.weapHeader;
  const soloWeapBar = document.querySelector("#seelieSoloWeaponConfigModal .seelie-blue-section-bar");
  if (soloWeapBar) soloWeapBar.textContent = pm.soloWeapHeader || pm.weapHeader;

  const incLvCheck = document.getElementById("cfgIncludeLevelCheck");
  if (incLvCheck && incLvCheck.parentElement) {
    setLastTextNode(incLvCheck.parentElement, pm.incLevel);
  }
  const incWeapCheck = document.getElementById("cfgIncludeWeaponCheck");
  if (incWeapCheck && incWeapCheck.parentElement) {
    setLastTextNode(incWeapCheck.parentElement, pm.incWeapon);
  }

  const curCharLbl = document.querySelector("#btnOpenCurCharLvlPopover .seelie-level-trigger-lbl");
  if (curCharLbl) curCharLbl.textContent = pm.curLabel;
  const tarCharLbl = document.querySelector("#btnOpenTarCharLvlPopover .seelie-level-trigger-lbl");
  if (tarCharLbl) tarCharLbl.textContent = pm.tarLabel;

  const curWeapLbl = document.querySelector("#btnOpenCurWeapLvlPopover .seelie-level-trigger-lbl");
  if (curWeapLbl) curWeapLbl.textContent = pm.curWeapLvl;
  const tarWeapLbl = document.querySelector("#btnOpenTarWeapLvlPopover .seelie-level-trigger-lbl");
  if (tarWeapLbl) tarWeapLbl.textContent = pm.tarWeapLvl;

  const curSoloLbl = document.querySelector("#btnOpenCurSoloWeapLvlPopover .seelie-level-trigger-lbl");
  if (curSoloLbl) curSoloLbl.textContent = pm.curWeapLvl;
  const tarSoloLbl = document.querySelector("#btnOpenTarSoloWeapLvlPopover .seelie-level-trigger-lbl");
  if (tarSoloLbl) tarSoloLbl.textContent = pm.tarWeapLvl;

  const presetSpan = document.querySelector("#cfgTabPane-talents > div:nth-child(3) > span");
  if (presetSpan) presetSpan.textContent = pm.presets;

  const charResinPill = document.getElementById("cfgModalCharResinPill");
  if (charResinPill && charResinPill.previousElementSibling) charResinPill.previousElementSibling.textContent = pm.charLabel;
  const totResinPill = document.getElementById("cfgModalTotalResinPill");
  if (totResinPill && totResinPill.previousElementSibling) totResinPill.previousElementSibling.textContent = pm.totalLabel;

  const soloCharResinPill = document.getElementById("soloWeapModalCharResinPill");
  if (soloCharResinPill && soloCharResinPill.previousElementSibling) soloCharResinPill.previousElementSibling.textContent = pm.weapLabel;
  const soloTotResinPill = document.getElementById("soloWeapModalTotalResinPill");
  if (soloTotResinPill && soloTotResinPill.previousElementSibling) soloTotResinPill.previousElementSibling.textContent = pm.totalLabel;
}

const TALENT_ROLE_LABELS = ["Ataque normal", "Habilidad elemental", "Habilidad definitiva"];
const MAX_LEVEL_STATE = 13;
const ASC_STAR_PATH = "M12 1.5 L14.8 9.2 L22.5 12 L14.8 14.8 L12 22.5 L9.2 14.8 L1.5 12 L9.2 9.2 Z";
const MORA_ID = "202";
const EXP_BOOK_IDS = ["104001", "104002", "104003"];
const EXP_BOOK_VALUE = { "104001": 1000, "104002": 5000, "104003": 20000 };

/* ---------- Pequeños generadores de HTML con iconos reales ---------- */
function escapeHtml(text) {
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ascStarSvg(bright, size) {
  const px = size || 18;
  return `<svg class="asc-star-svg ${bright ? "asc-star-bright" : "asc-star-dim"}" style="width:${px}px;height:${px}px;" viewBox="0 0 24 24"><path d="${ASC_STAR_PATH}"/></svg>`;
}

function elementImgHtml(element, size) {
  const px = size || 20;
  if (!element) return "";
  return `<img src="assets/elements/${element.toLowerCase()}.png" alt="${element}" style="width:${px}px;height:${px}px;object-fit:contain;" />`;
}

function weaponTypeImgHtml(type, size) {
  const px = size || 18;
  if (!type) return "";
  return `<img src="assets/weapon_types/${type.toLowerCase()}.png" alt="${getWeaponTypeLabel(type)}" style="width:${px}px;height:${px}px;object-fit:contain;" />`;
}

function resinImgHtml(condensed, size) {
  const px = size || 16;
  return `<img src="assets/ui/${condensed ? "condensed_resin" : "resin"}.png" alt="Resina" style="width:${px}px;height:${px}px;object-fit:contain;" />`;
}

/**
 * Requisitos oficiales de Rango de Aventura (AR) para cada uno de los 14 estados de nivel:
 * idx 0: Lv. 1 (AR 1)
 * idx 1: Lv. 20 (AR 1)
 * idx 2: Lv. 20 ✦ (Ascensión 1 -> AR 15)
 * idx 3: Lv. 40 (AR 15)
 * idx 4: Lv. 40 ✦ (Ascensión 2 -> AR 25)
 * idx 5: Lv. 50 (AR 25)
 * idx 6: Lv. 50 ✦ (Ascensión 3 -> AR 30)
 * idx 7: Lv. 60 (AR 30)
 * idx 8: Lv. 60 ✦ (Ascensión 4 -> AR 35)
 * idx 9: Lv. 70 (AR 35)
 * idx 10: Lv. 70 ✦ (Ascensión 5 -> AR 40)
 * idx 11: Lv. 80 (AR 40)
 * idx 12: Lv. 80 ✦ (Ascensión 6 -> AR 50)
 * idx 13: Lv. 90 (AR 50)
 */
const STATE_REQ_AR = [1, 1, 15, 15, 25, 25, 30, 30, 35, 35, 40, 40, 50, 50];

// Requisitos oficiales de AR para los 10 niveles base de talentos:
const TALENT_REQ_AR = [1, 25, 30, 30, 35, 35, 40, 40, 50, 50];

function getArProgressionLimits() {
  let ar = 60;
  try {
    if (typeof getActiveAccountSettings === "function") {
      const s = getActiveAccountSettings();
      if (s && s.ar) ar = Number(s.ar);
    } else {
      const input = document.getElementById("inputAccountAR");
      if (input && input.value) ar = Number(input.value);
    }
  } catch (e) {
    ar = 60;
  }
  if (isNaN(ar) || ar < 1) ar = 60;

  if (ar >= 50) return { ar, maxAsc: 6, maxLv: 90, maxStateIdx: 13, maxTalent: 10, reqNextAr: null };
  if (ar >= 40) return { ar, maxAsc: 5, maxLv: 80, maxStateIdx: 11, maxTalent: 8, reqNextAr: 50 };
  if (ar >= 35) return { ar, maxAsc: 4, maxLv: 70, maxStateIdx: 9, maxTalent: 6, reqNextAr: 40 };
  if (ar >= 30) return { ar, maxAsc: 3, maxLv: 60, maxStateIdx: 7, maxTalent: 4, reqNextAr: 35 };
  if (ar >= 25) return { ar, maxAsc: 2, maxLv: 50, maxStateIdx: 5, maxTalent: 2, reqNextAr: 30 };
  if (ar >= 15) return { ar, maxAsc: 1, maxLv: 40, maxStateIdx: 3, maxTalent: 1, reqNextAr: 25 };
  return { ar, maxAsc: 0, maxLv: 20, maxStateIdx: 1, maxTalent: 1, reqNextAr: 15 };
}

function levelStateInline(idx) {
  const s = REAL_LEVEL_14_STATES[idx] || REAL_LEVEL_14_STATES[0];
  return `<span style="display:inline-flex;align-items:center;gap:2px;">${s.lv}${s.ascended ? ascStarSvg(true, 12) : ""}</span>`;
}

function levelCircleInnerHtml(idx) {
  const s = REAL_LEVEL_14_STATES[idx] || REAL_LEVEL_14_STATES[0];
  return `<span>${s.lv}</span>${ascStarSvg(s.ascended, 18)}`;
}

/**
 * Avatar SVG de respaldo: solo se usa si la imagen oficial no carga (sin conexión).
 */
function makeAvatarSvgDataUri(name, element, rarity) {
  const bg = rarity === 5 ? "%23b88235" : "%237452a8";
  const bg2 = rarity === 5 ? "%23734d1d" : "%2346306b";
  const initials = (name || "PJ").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='${bg}'/><stop offset='100%' stop-color='${bg2}'/></linearGradient></defs><rect width='120' height='120' rx='18' fill='url(%23g)'/><circle cx='60' cy='46' r='22' fill='rgba(255,255,255,0.22)'/><path d='M24 112 C24 84 96 84 96 112 Z' fill='rgba(255,255,255,0.22)'/><text x='60' y='54' text-anchor='middle' fill='%23ffffff' font-family='Segoe UI, sans-serif' font-weight='900' font-size='22'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${svg}`;
}

/* ---------- Acceso a la base de datos oficial ---------- */
const REAL_CHAR_LIST = REAL_CHARACTERS_DB.filter((c) => c.id !== "custom");
const REAL_CHAR_BY_NAME = {};
REAL_CHAR_LIST.forEach((c) => { REAL_CHAR_BY_NAME[c.name] = c; });
const REAL_WEAP_BY_NAME = {};
REAL_WEAPONS_DB.forEach((w) => { REAL_WEAP_BY_NAME[w.name] = w; });

/**
 * Armas que realmente se suben con materiales: descarta skins/variantes (IDs 3xxxxx sin ascensión)
 * y armas sin coste de ascensión real (ej. armas de misión).
 */
function isUpgradableWeapon(w) {
  const asc6 = w.ascensionCosts && w.ascensionCosts["6"];
  return !!asc6 && Object.keys(asc6.costItems || {}).length > 0;
}
const REAL_UPGRADABLE_WEAPONS = REAL_WEAPONS_DB.filter(isUpgradableWeapon);

function getRosterCharInfo(charName) {
  const c = REAL_CHAR_BY_NAME[charName];
  if (!c) return null;
  if (!c.fallbackAvatar) c.fallbackAvatar = makeAvatarSvgDataUri(c.name, c.element, c.rarity);
  return c;
}

function getWeaponInfo(weaponName) {
  if (!weaponName || weaponName === "none") return null;
  return REAL_WEAP_BY_NAME[weaponName] || null;
}

function getMat(matId) {
  return REAL_MASTER_MATERIALS[String(matId)] || null;
}

/* ---------- Planes por defecto (inicialmente vacío para usuarios nuevos) ---------- */
const REAL_DEFAULT_PLANS = [];

/* =====================================================================
   MOTOR DE CALCULO (COSTOS REALES POR PASO DE NIVEL, TALENTO Y ARMA)
   ===================================================================== */
function addLevelStepsToReq(addReq, curState, tarState, expSteps, ascCosts) {
  for (let s = curState; s < tarState; s++) {
    if (s % 2 === 0) {
      // Subida de nivel con libros de EXP / minerales + Mora
      const step = expSteps[String(s)];
      if (!step) continue;
      Object.entries(step).forEach(([key, qty]) => {
        const id = key === "mora" ? MORA_ID : key.replace(/^(exp|ore)_/, "");
        addReq(id, qty);
      });
    } else {
      // Ascension (estrella): fase = (s + 1) / 2
      const c = ascCosts && ascCosts[String((s + 1) / 2)];
      if (!c) continue;
      addReq(MORA_ID, c.coinCost);
      Object.entries(c.costItems || {}).forEach(([id, qty]) => addReq(id, qty));
    }
  }
}

/**
 * Retorna el bono de niveles (+3) que otorga la constelación configurada para este talento.
 * Si el personaje tiene C3 o C5 y dicha constelación potencia este talento (0, 1 o 2), retorna 3; de lo contrario 0.
 */
function getTalentConstBonus(charName, talentIdx, constellation) {
  const cNum = constellation || 0;
  const boosts = (typeof REAL_CHAR_TALENT_BOOSTS !== "undefined" && REAL_CHAR_TALENT_BOOSTS[charName]) || null;
  if (!boosts) return 0;
  let bonus = 0;
  if (cNum >= 3 && boosts.C3 === talentIdx) bonus += 3;
  if (cNum >= 5 && boosts.C5 === talentIdx) bonus += 3;
  return bonus;
}

/**
 * Retorna qué constelación desbloquea el +3 para este talento (3 o 5), o null si no aplica.
 */
function getTalentRequiredConstellation(charName, talentIdx) {
  const boosts = (typeof REAL_CHAR_TALENT_BOOSTS !== "undefined" && REAL_CHAR_TALENT_BOOSTS[charName]) || null;
  if (!boosts) return null;
  if (boosts.C3 === talentIdx) return 3;
  if (boosts.C5 === talentIdx) return 5;
  return null;
}

/**
 * Convierte un nivel seleccionado (1 a 13) a nivel base de costos (1 a 10).
 * Con bono de constelación activo (+3), Nv. 1..4 corresponden a nivel base 1,
 * y Nv. 13 equivale a Nivel Base 10 con Corona.
 */
function talentLevelToBase(lv, bonus) {
  if (!bonus || bonus <= 0) return Math.max(1, Math.min(10, lv || 1));
  if (lv <= bonus + 1) return 1;
  return Math.max(1, Math.min(10, lv - bonus));
}

/**
 * Calcula materiales de un plan. `parts` (opcional) limita el calculo a
 * "level", "talents" y/o "weapon"; sin `parts` suma todo.
 */
// La ascensión del Viajero pertenece a un solo personaje; los talentos no.
function isTravelerPlan(plan) {
  return plan && plan.kind === "character" && getRosterCharInfo(plan.key)?.sharedProgression === "traveler";
}

function travelerPlansWithDraft(plan) {
  const plans = (state.activePlans || []).filter(isTravelerPlan).map(p =>
    p.key === plan.key ? plan : p);
  if (!plans.some(p => p.key === plan.key)) plans.push(plan);
  return plans;
}

function addTravelerLevelRequirements(plan, addReq, ascensionCosts) {
  const all = travelerPlansWithDraft(plan);
  // El nivel actual es compartido incluso si una variante está pausada.
  const current = Math.max(...all.map(p => p.curState || 0));
  const active = all.filter(p => p.active !== false && p.incLevel !== false);
  for (let step = current; step < (plan.tarState || 0); step++) {
    // Cada salto se asigna una sola vez, también con objetivos diferentes.
    const owner = active.find(p => (p.tarState || 0) > step);
    if (plan.travelerFullLevel || owner?.key === plan.key) {
      addLevelStepsToReq(addReq, step, step + 1, REAL_CHAR_EXP_STEPS, ascensionCosts);
    }
  }
}

function syncTravelerLevel(plan) {
  if (!isTravelerPlan(plan)) return;
  (state.activePlans || []).filter(isTravelerPlan).forEach(p => {
    p.curState = plan.curState;
    p.tarState = plan.tarState;
    p.incLevel = plan.incLevel;
  });
}

function computePlanRequirements(plan, parts) {
  const req = {};
  if (plan.active === false) return req;
  const want = (p) => !parts || parts.includes(p);
  const addReq = (id, qty) => {
    if (!id || !qty || qty <= 0) return;
    req[id] = (req[id] || 0) + qty;
  };

  // 0. Arma independiente (sin personaje asignado)
  if (plan.kind === "weapon") {
    const wp = getWeaponInfo(plan.key || plan.weaponKey);
    if (wp) {
      const steps = wp.rarity >= 5 ? REAL_WEAP5_ORE_STEPS : (wp.rarity === 3 && typeof REAL_WEAP3_ORE_STEPS !== "undefined" ? REAL_WEAP3_ORE_STEPS : REAL_WEAP4_ORE_STEPS);
      addLevelStepsToReq(addReq, plan.curState || 0, plan.tarState || 0, steps, wp.ascensionCosts);
    }
    return req;
  }

  if (plan.kind !== "character") return req;
  const ch = getRosterCharInfo(plan.key);
  if (!ch) return req;

  // 1. Nivel y ascension del personaje
  if (want("level") && plan.incLevel !== false) {
    if (isTravelerPlan(plan)) addTravelerLevelRequirements(plan, addReq, ch.ascensionCosts);
    else addLevelStepsToReq(addReq, plan.curState || 0, plan.tarState || 0, REAL_CHAR_EXP_STEPS, ch.ascensionCosts);
  }

  // 2. Cada talento por separado (con soporte de constelaciones C3/C5 para niveles 1..13)
  for (let t = 0; t < 3 && want("talents"); t++) {
    if (plan.talInc && plan.talInc[t] === false) continue;
    const talent = ch.talents[t];
    if (!talent) continue;
    const bonus = getTalentConstBonus(plan.key, t, plan.constellation);
    const rawCur = (plan.talCur && plan.talCur[t]) || (bonus > 0 ? 1 + bonus : 1);
    const rawTar = (plan.talTar && plan.talTar[t]) || (bonus > 0 ? 1 + bonus : 1);
    const from = talentLevelToBase(rawCur, bonus);
    const to = talentLevelToBase(rawTar, bonus);

    for (let lv = from + 1; lv <= to; lv++) {
      const c = talent.costs[String(lv)];
      if (!c) continue;
      addReq(MORA_ID, c.coinCost);
      Object.entries(c.costItems || {}).forEach(([id, qty]) => addReq(id, qty));
    }
  }

  // 3. Arma equipada
  if (want("weapon") && plan.incWeapon !== false && plan.weaponKey && plan.weaponKey !== "none") {
    const wp = getWeaponInfo(plan.weaponKey);
    if (wp) {
      const steps = wp.rarity >= 5 ? REAL_WEAP5_ORE_STEPS : (wp.rarity === 3 && typeof REAL_WEAP3_ORE_STEPS !== "undefined" ? REAL_WEAP3_ORE_STEPS : REAL_WEAP4_ORE_STEPS);
      addLevelStepsToReq(addReq, plan.weapCurState || 0, plan.weapTarState || 0, steps, wp.ascensionCosts);
    }
  }
  return req;
}

function getRealOwned(matId) {
  return state.realOwned[matId] || 0;
}

function saveRealOwned() {
  const activeAcc = (typeof AccountManager !== "undefined") ? AccountManager.getActiveAccountId() : "main";
  localStorage.setItem(`${activeAcc}-inventory`, JSON.stringify(state.realOwned));
  if (activeAcc === "main") {
    localStorage.setItem("teyvat_real_owned_v1", JSON.stringify(state.realOwned));
  }
  if (typeof triggerDriveSyncStamp === "function") {
    triggerDriveSyncStamp();
  }
}

/**
 * Clasifica un material oficial para estimar la resina necesaria (estimacion aproximada).
 */
function getMatKind(matId) {
  const id = String(matId);
  const mat = getMat(id);
  const rank = mat ? mat.rank : 1;
  if (id === MORA_ID) return "mora";
  if (EXP_BOOK_IDS.includes(id)) return "exp";
  if (id === "104319") return "crown";
  if (id === "113063") return "other";
  if (id.startsWith("1043")) return "book";
  if (id.startsWith("114")) return "wdomain";
  if (id.startsWith("113")) return rank >= 5 ? "weekly" : "boss";
  return "other";
}

function computeMissingResinForReqs(reqs) {
  return FarmingEngine.getSeelieFarmingData("all", reqs).totals.totalResin;
}

function computeGlobalMissingResin() {
  return computeMissingResinForReqs(getRequiredMaterialsMap());
}

function resinPillHtml(resin, extraCondensed) {
  const tp = (typeof I18N !== "undefined" && I18N[state.lang] && I18N[state.lang].planner) || {};
  if (resin <= 0) return `${resinImgHtml(false, 16)} ${tp.nothingPending || "Nada pendiente"}`;
  const days = Math.max(1, Math.ceil(resin / 180));
  const dWord = tp.daysWord || (days === 1 ? "día" : "días");
  let html = `${resinImgHtml(false, 16)} ${resin.toLocaleString()} • ${days} ${dWord}`;
  if (extraCondensed) html += ` &nbsp;${resinImgHtml(true, 16)} ${Math.ceil(resin / 60)}`;
  return html;
}

/* =====================================================================
   PILDORAS DE MATERIALES (ICONOS OFICIALES)
   ===================================================================== */
const MAT_KIND_ORDER = ["mora", "exp", "boss", "other", "book", "wdomain", "weekly", "crown"];

function sortedReqEntries(reqs) {
  return Object.entries(reqs).sort((a, b) => {
    const ka = MAT_KIND_ORDER.indexOf(getMatKind(a[0]));
    const kb = MAT_KIND_ORDER.indexOf(getMatKind(b[0]));
    if (ka !== kb) return ka - kb;
    return Number(a[0]) - Number(b[0]);
  });
}

function buildMatPillsHtml(reqs, editable) {
  return sortedReqEntries(reqs)
    .map(([matId, reqQty]) => {
      const mat = getMat(matId);
      const owned = getRealOwned(matId);
      const done = owned >= reqQty;
      const name = escapeHtml(mat ? mat.name : matId);
      const ownedHtml = editable
        ? `<input type="number" min="0" class="mat-owned-input" data-matid="${matId}" value="${owned}" title="Cantidad que tienes de ${name}" />`
        : `<span>${owned.toLocaleString()}</span>`;
      return `
        <div class="mat-pill ${done ? "done" : "missing"}" title="${name}">
          <img src="${mat ? mat.icon : ""}" alt="${name}" onerror="this.style.visibility='hidden'" />
          ${ownedHtml}
          <span class="mat-pill-req">/ ${reqQty.toLocaleString()}</span>
        </div>`;
    })
    .join("");
}

/* ---------- Pestana ARMA: iconos de las armas mejorables y materiales completos ---------- */
function selectDraftWeapon(weaponKey) {
  const d = state.cfgDraft;
  if (!d) return;
  d.weaponKey = weaponKey;
  if (weaponKey !== "none" && (d.weapTarState || 0) === 0) d.weapTarState = MAX_LEVEL_STATE;
  updateCharConfigModalUI();
}

function renderWeaponIconGrid(weapons, selectedKey) {
  const grid = document.getElementById("cfgWeaponGrid");
  const info = state.cfgDraft ? getRosterCharInfo(state.cfgDraft.key) : null;
  const typeIcon = info ? `assets/weapon_types/${info.weapon.toLowerCase()}.png` : "";
  const noneSelected = !selectedKey || selectedKey === "none";
  grid.innerHTML =
    `<button type="button" class="weapon-icon-btn none ${noneSelected ? "selected" : ""}" data-weapname="none" title="Sin arma equipada">
       <img src="${typeIcon}" alt="Sin arma" style="opacity:0.35;" onerror="this.style.visibility='hidden'" />
     </button>` +
    weapons
      .map((w) => {
        const curLang = (typeof state !== "undefined" && state.lang) || "es";
        const dispWName = (typeof getWeaponTranslatedName === "function") ? getWeaponTranslatedName(w.name, curLang) : w.name;
        return `
        <button type="button" class="weapon-icon-btn r${w.rarity} ${selectedKey === w.name ? "selected" : ""}" data-weapname="${escapeHtml(w.name)}" title="${escapeHtml(dispWName)} (${w.rarity}★)">
          <img src="${w.icon}" alt="${escapeHtml(dispWName)}" loading="lazy" onerror="this.style.visibility='hidden'" />
        </button>`;
      })
      .join("");
  grid.querySelectorAll(".weapon-icon-btn").forEach((btn) => {
    btn.addEventListener("click", () => selectDraftWeapon(btn.dataset.weapname));
  });
}

function weaponLevelLabel(stateIdx) {
  const s = REAL_LEVEL_14_STATES[stateIdx] || REAL_LEVEL_14_STATES[0];
  return `${s.lv}${s.ascended ? "✦" : ""}`;
}

function renderWeaponFullMats(weapon) {
  const el = document.getElementById("cfgWeaponFullMats");
  const d = state.cfgDraft;
  const pm = getPlannerModalI18n();
  if (!weapon || !d) {
    el.innerHTML = `<div class="weapon-full-mats-title">${escapeHtml(pm.pickWeaponHint)}</div>`;
    return;
  }
  const from = d.weapCurState || 0;
  const to = Math.max(from, d.weapTarState || 0);
  const range = `${pm.lvPrefix} ${weaponLevelLabel(from)} → ${weaponLevelLabel(to)}`;
  const curLang = (typeof state !== "undefined" && state.lang) || "es";
  const dispWeapName = (typeof getWeaponTranslatedName === "function") ? getWeaponTranslatedName(weapon.name, curLang) : weapon.name;
  if (to <= from) {
    el.innerHTML = `<div class="weapon-full-mats-title">${escapeHtml(dispWeapName)}: ${escapeHtml(pm.weapSameLvl)} (${range}). ${escapeHtml(pm.noMatsNeeded)}</div>`;
    return;
  }
  const req = {};
  const steps = weapon.rarity >= 5 ? REAL_WEAP5_ORE_STEPS : (weapon.rarity === 3 && typeof REAL_WEAP3_ORE_STEPS !== "undefined" ? REAL_WEAP3_ORE_STEPS : REAL_WEAP4_ORE_STEPS);
  addLevelStepsToReq((id, qty) => { if (id && qty > 0) req[id] = (req[id] || 0) + qty; }, from, to, steps, weapon.ascensionCosts);
  el.innerHTML = `
    <div class="weapon-full-mats-title">${escapeHtml(dispWeapName)}: ${escapeHtml(pm.weapUpMats)} (${range})</div>
    <div class="mat-pill-wrap">${buildMatPillsHtml(req, true)}</div>`;
  el.querySelectorAll(".mat-owned-input").forEach((inp) => {
    inp.addEventListener("change", () => {
      state.realOwned[inp.dataset.matid] = Math.max(0, parseInt(inp.value || "0", 10) || 0);
      saveRealOwned();
      updateCharConfigModalUI();
    });
  });
}

/* =====================================================================
   MODAL 1: CATALOGO OFICIAL
   ===================================================================== */
function renderRosterModalGrid() {
  applyPlannerModalStaticTranslations();
  const gridEl = document.getElementById("rosterModalGrid");
  gridEl.innerHTML = "";

  const addedKeys = new Set(state.activePlans.filter((p) => p.kind === "character").map((p) => p.key));
  const f = state.rosterModalFilter;
  const search = f.search ? f.search.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

  const filtered = REAL_CHAR_LIST.filter((ch) => {
    if (f.element && ch.element !== f.element) return false;
    if (f.weapon && ch.weapon !== f.weapon) return false;
    if (f.rarity && ch.rarity !== f.rarity) return false;
    if (f.hideAdded && addedKeys.has(ch.name)) return false;
    if (search) {
      const curLang = (typeof state !== "undefined" && state.lang) || "es";
      const plain = ch.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const trans = (typeof getCharacterTranslatedName === "function") ? getCharacterTranslatedName(ch.name, curLang).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
      let matches = plain.includes(search) || trans.includes(search) || (ch.sharedProgression === "traveler" && ["traveler", "traveller", "aether", "lumine", "viajera"].some(alias => alias.includes(search)));
      if (!matches) {
        if (search === "columbina" && plain.includes("colombina")) matches = true;
        else if (search === "arlechino" && plain.includes("arlecchino")) matches = true;
        else if (search === "scaramouche" && plain.includes("trotamundos")) matches = true;
        else if (search === "childe" && plain.includes("tartaglia")) matches = true;
        else if (search === "baal" && plain.includes("raiden")) matches = true;
        else if (search === "alhaitham" && plain.includes("alhacen")) matches = true;
        else if (search === "marionette" && plain.includes("sandrone")) matches = true;
      }
      if (!matches) return false;
    }
    return true;
  });

  filtered.forEach((ch) => {
    const info = getRosterCharInfo(ch.name);
    const existingPlan = state.activePlans.find((p) => p.kind === "character" && p.key === ch.name);
    const tile = document.createElement("div");
    tile.className = "seelie-roster-tile";
    const curLang = (typeof state !== "undefined" && state.lang) || "es";
    const dispName = (typeof getCharacterTranslatedName === "function") ? getCharacterTranslatedName(ch.name, curLang) : ch.name;
    tile.title = `${dispName} (${ch.element}, ${ch.rarity}★, ${getWeaponTypeLabel(ch.weapon)})`;
    const addedBadgeHtml = existingPlan ? `<span class="seelie-roster-added-tag">C${existingPlan.constellation || 0}</span>` : "";
    tile.innerHTML = `
      <div class="seelie-roster-portrait rar-bg-${info.rarity}">
        ${addedBadgeHtml}
        <img src="${info.icon}" alt="${escapeHtml(dispName)}" loading="lazy" onerror="this.onerror=null;this.src='${info.fallbackAvatar}';" />
        <span class="seelie-roster-el-badge" title="${info.element}">${elementImgHtml(info.element, 18)}</span>
      </div>
      <div class="seelie-roster-name">${escapeHtml(dispName)}</div>
    `;
    tile.addEventListener("click", () => {
      closeRosterModal();
      openCharConfigModal(ch.name, true);
    });
    gridEl.appendChild(tile);
  });

  if (filtered.length === 0) {
    const pm = getPlannerModalI18n();
    gridEl.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:#94a3b8;padding:1.5rem;">${escapeHtml(pm.noCharMatch)}</div>`;
  }
}

/* =====================================================================
   MODAL 2: CONFIGURACION DEL PERSONAJE
   ===================================================================== */
function openCharConfigModal(charName, openedFromRoster) {
  applyPlannerModalStaticTranslations();
  state.cfgOpenedFromRoster = !!openedFromRoster;
  const existing = state.activePlans.find((p) => p.kind === "character" && p.key === charName);
  const limits = getArProgressionLimits();

  if (existing) {
    state.cfgDraft = JSON.parse(JSON.stringify(existing));
    if (!state.cfgDraft.talInc) state.cfgDraft.talInc = [true, true, true];
    // Ajustar niveles objetivo al tope real si exceden el AR del usuario
    if (state.cfgDraft.tarState > limits.maxStateIdx) state.cfgDraft.tarState = limits.maxStateIdx;
    if (state.cfgDraft.curState > limits.maxStateIdx) state.cfgDraft.curState = limits.maxStateIdx;
    if (state.cfgDraft.weapTarState > limits.maxStateIdx) state.cfgDraft.weapTarState = limits.maxStateIdx;
    if (state.cfgDraft.weapCurState > limits.maxStateIdx) state.cfgDraft.weapCurState = limits.maxStateIdx;
    if (state.cfgDraft.talTar) {
      state.cfgDraft.talTar = state.cfgDraft.talTar.map((lvl) => Math.min(lvl, limits.maxTalent));
    }
  } else {
    state.cfgDraft = {
      uid: `plan_${Date.now()}`, kind: "character", key: charName, active: true,
      constellation: 0, notes: "", curState: 0, tarState: limits.maxStateIdx, incLevel: true,
      talCur: [1, 1, 1], talTar: [Math.min(1, limits.maxTalent), Math.min(8, limits.maxTalent), Math.min(8, limits.maxTalent)], talInc: [true, true, true],
      weaponKey: "none", weapRefine: 1, weapCurState: 0, weapTarState: limits.maxStateIdx, incWeapon: true
    };
  }

  if (isTravelerPlan(state.cfgDraft)) {
    const shared = state.activePlans.find(isTravelerPlan);
    if (shared) {
      state.cfgDraft.curState = shared.curState;
      state.cfgDraft.tarState = shared.tarState;
      state.cfgDraft.incLevel = shared.incLevel;
    }
  }
  closeAllLevelPopovers();
  state.cfgActiveTab = "level";
  document.querySelectorAll("[data-cfgtab]").forEach((b) => b.classList.toggle("active", b.dataset.cfgtab === "level"));
  ["level", "talents", "weapon"].forEach((paneKey) => {
    const pane = document.getElementById(`cfgTabPane-${paneKey}`);
    if (pane) pane.style.display = paneKey === "level" ? "block" : "none";
  });

  document.getElementById("seelieCharConfigModal").classList.add("open");
  updateCharConfigModalUI();
}

function closeCharConfigModal(autoSave = true) {
  closeAllLevelPopovers();
  const modalEl = document.getElementById("seelieCharConfigModal");
  if (modalEl) modalEl.classList.remove("open");
  const d = state.cfgDraft;
  state.cfgDraft = null;
  if (autoSave && d) {
    syncTravelerLevel(d);
    const idx = state.activePlans.findIndex((p) => p.kind === "character" && p.key === d.key);
    if (idx !== -1) {
      state.activePlans[idx] = JSON.parse(JSON.stringify(d));
    } else {
      state.activePlans.unshift(JSON.parse(JSON.stringify(d)));
    }
    try {
      savePlansToStorage();
    } catch (err) {
      console.error("Error al guardar planes de personaje:", err);
    }
  }
}

function updateCharConfigModalUI() {
  applyPlannerModalStaticTranslations();
  const d = state.cfgDraft;
  if (!d) return;
  const info = getRosterCharInfo(d.key);
  if (!info) return;
  const pm = getPlannerModalI18n();

  // 1. Cabecera: Namecard oficial + avatar + elemento real
  const bannerGradient = ELEMENT_BANNERS[info.element] || ELEMENT_BANNERS.Hydro;
  document.getElementById("cfgModalBanner").style.background = info.namecard
    ? `linear-gradient(90deg, rgba(10,14,25,0.82) 0%, rgba(10,14,25,0.35) 100%), url('${info.namecard}') center/cover no-repeat, ${bannerGradient}`
    : bannerGradient;

  document.getElementById("cfgModalAvatarWrap").className = `seelie-config-avatar rar-bg-${info.rarity}`;
  const avatarImg = document.getElementById("cfgModalAvatarImg");
  avatarImg.src = info.icon;
  avatarImg.onerror = () => { avatarImg.onerror = null; avatarImg.src = info.fallbackAvatar; };
  document.getElementById("cfgModalElBadge").innerHTML = elementImgHtml(info.element, 18);
  const curLang = (typeof state !== "undefined" && state.lang) || "es";
  const dispCharName = (typeof getCharacterTranslatedName === "function") ? getCharacterTranslatedName(d.key, curLang) : d.key;
  document.getElementById("cfgModalCharName").textContent = dispCharName.toUpperCase();
  document.getElementById("btnCfgToggleActive").classList.toggle("off", d.active === false);

  // 2. Notas, constelacion y favorito
  document.getElementById("cfgModalNotes").value = d.notes || "";
  document.getElementById("cfgModalConstVal").textContent = `C${d.constellation || 0}`;
  const starBtn = document.getElementById("btnCfgToggleStar");
  const isStarred = state.starredChars.includes(d.key);
  starBtn.classList.toggle("active", isStarred);
  starBtn.style.color = isStarred ? "#fbbf24" : "#cbd5e1";

  // 3. Pestana NIVEL (circulos de nivel actual / objetivo)
  const limits = getArProgressionLimits();
  if (d.tarState > limits.maxStateIdx) d.tarState = limits.maxStateIdx;
  if (d.curState > limits.maxStateIdx) d.curState = limits.maxStateIdx;
  if (d.weapTarState > limits.maxStateIdx) d.weapTarState = limits.maxStateIdx;
  if (d.weapCurState > limits.maxStateIdx) d.weapCurState = limits.maxStateIdx;

  const arBadge = document.getElementById("cfgModalArLimitBadge");
  if (arBadge) {
    if (limits.ar < 50) {
      arBadge.style.display = "inline-block";
      arBadge.textContent = `Tope AR ${limits.ar}: Nivel Máx ${limits.maxLv}`;
      arBadge.title = `Para ascender a personajes sobre Nivel ${limits.maxLv} se requiere alcanzar AR ${limits.reqNextAr}.`;
    } else {
      arBadge.style.display = "none";
    }
  }

  document.getElementById("cfgIncludeLevelCheck").checked = d.incLevel !== false;
  document.getElementById("previewCurCharLvlCircle").innerHTML = levelCircleInnerHtml(d.curState);
  document.getElementById("previewTarCharLvlCircle").innerHTML = levelCircleInnerHtml(d.tarState);
  document.getElementById("cfgTabPane-level").style.setProperty("opacity", "1");
  document.getElementById("btnOpenCurCharLvlPopover").style.opacity = d.incLevel === false ? "0.45" : "1";
  document.getElementById("btnOpenTarCharLvlPopover").style.opacity = d.incLevel === false ? "0.45" : "1";

  // 4. Pestana TALENTOS: los 3 talentos oficiales, con soporte de constelaciones (+3 hasta Nv. 13)
  const talContainer = document.getElementById("cfgTalentsRowsContainer");
  const makeTalentLevelOptions = (selected, bonus) => {
    const maxLv = bonus > 0 ? 13 : 10;
    const maxAllowedByAr = limits.maxTalent;
    const opts = [];
    for (let n = 1; n <= maxLv; n++) {
      const baseLv = Math.max(1, n - bonus);
      const reqAr = TALENT_REQ_AR[baseLv - 1] || 1;
      const exceedsAr = baseLv > maxAllowedByAr;
      let label = `${pm.lvPrefix} ${n}`;
      if (exceedsAr) {
        label += ` (Req. AR ${reqAr})`;
      } else if (bonus > 0 && n === 13) {
        label = `${pm.lvPrefix} 13 (${pm.crown})`;
      } else if (n === 10) {
        label = `${pm.lvPrefix} 10 (${pm.crown})`;
      }
      opts.push(`<option value="${n}" ${selected === n ? "selected" : ""} ${exceedsAr ? 'disabled style="color:#64748b;background:#1e293b;"' : ""}>${label}</option>`);
    }
    return opts.join("");
  };

  talContainer.innerHTML = info.talents
    .slice(0, 3)
    .map((tal, t) => {
      const included = !d.talInc || d.talInc[t] !== false;
      const bonus = getTalentConstBonus(d.key, t, d.constellation);
      const reqC = getTalentRequiredConstellation(d.key, t);
      const maxAllowed = bonus > 0 ? 13 : 10;
      const maxAllowedByAr = Math.min(maxAllowed, limits.maxTalent + bonus);

      // Ajustar si el borrador excedía el límite por constelación o por AR
      if (d.talCur[t] > maxAllowedByAr) d.talCur[t] = maxAllowedByAr;
      if (d.talTar[t] > maxAllowedByAr) d.talTar[t] = maxAllowedByAr;

      // Solo mostrar badge cuando la constelación realmente está activa
      const tagHtml = (bonus > 0 && reqC !== null)
        ? `<span class="seelie-const-talent-tag active" title="C${reqC} (+3)">C${reqC} (+3)</span>`
        : "";

      return `
        <div class="seelie-talent-real-row ${included ? "" : "disabled-part"}" style="grid-template-columns:auto auto 1fr 88px auto 88px;gap:0.45rem;">
          <input type="checkbox" class="cfg-tal-inc" data-tidx="${t}" ${included ? "checked" : ""} style="accent-color:#3b82f6;width:16px;height:16px;cursor:pointer;" />
          <div class="seelie-talent-icon-circle"><img src="${tal.icon}" alt="${escapeHtml(tal.name)}" onerror="this.style.visibility='hidden'" /></div>
          <div style="min-width:0;overflow:hidden;">
            <div style="font-size:0.83rem;font-weight:800;color:#e2e8f0;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${escapeHtml(tal.name)}">
              ${escapeHtml(tal.name)}
            </div>
            <div style="font-size:0.7rem;color:#94a3b8;display:flex;align-items:center;gap:0.35rem;margin-top:1px;">
              <span>${escapeHtml(getTalentRoleLabel(t))}</span>
              ${tagHtml}
            </div>
          </div>
          <select class="seelie-big-level-select cfg-tal-cur" data-tidx="${t}" style="padding:0.35rem 0.2rem;font-size:0.82rem;text-align:center;width:100%;">${makeTalentLevelOptions(d.talCur[t] || 1, bonus)}</select>
          <span style="font-weight:900;color:#94a3b8;padding:0 1px;">»</span>
          <select class="seelie-big-level-select cfg-tal-tar" data-tidx="${t}" style="padding:0.35rem 0.2rem;font-size:0.82rem;text-align:center;width:100%;">${makeTalentLevelOptions(d.talTar[t] || 1, bonus)}</select>
        </div>`;
    })
    .join("");

  talContainer.querySelectorAll(".cfg-tal-inc").forEach((chk) => {
    chk.addEventListener("change", () => {
      const t = parseInt(chk.dataset.tidx, 10);
      if (!d.talInc) d.talInc = [true, true, true];
      d.talInc[t] = chk.checked;
      updateCharConfigModalUI();
    });
  });
  talContainer.querySelectorAll(".cfg-tal-cur").forEach((sel) => {
    sel.addEventListener("change", (e) => {
      const t = parseInt(sel.dataset.tidx, 10);
      d.talCur[t] = parseInt(e.target.value, 10);
      if (d.talTar[t] < d.talCur[t]) d.talTar[t] = d.talCur[t];
      updateCharConfigModalUI();
    });
  });
  talContainer.querySelectorAll(".cfg-tal-tar").forEach((sel) => {
    sel.addEventListener("change", (e) => {
      const t = parseInt(sel.dataset.tidx, 10);
      d.talTar[t] = Math.max(d.talCur[t], parseInt(e.target.value, 10));
      updateCharConfigModalUI();
    });
  });

  // 5. Pestana ARMA: solo armas mejorables del tipo del personaje (seleccion por icono)
  const typeWeapons = REAL_UPGRADABLE_WEAPONS
    .filter((w) => w.type === info.weapon)
    .sort((a, b) => b.rarity - a.rarity || a.name.localeCompare(b.name, "es"));

  const curWeapon = getWeaponInfo(d.weaponKey);
  const weapIcon = document.getElementById("cfgWeaponIconPreview");
  weapIcon.src = curWeapon ? curWeapon.icon : `assets/weapon_types/${info.weapon.toLowerCase()}.png`;
  const dispWpName = curWeapon ? ((typeof getWeaponTranslatedName === "function") ? getWeaponTranslatedName(curWeapon.name, curLang) : curWeapon.name) : "";
  document.getElementById("cfgWeaponNameLabel").innerHTML = curWeapon
    ? `${escapeHtml(dispWpName)} <span class="weapon-name-rarity r${curWeapon.rarity}">${curWeapon.rarity}★</span>`
    : `<span style="color:#94a3b8;">${escapeHtml(pm.noWeaponEquipped)} (${escapeHtml(getWeaponTypeLabel(info.weapon))})</span>`;
  renderWeaponIconGrid(typeWeapons, d.weaponKey);
  renderWeaponFullMats(curWeapon);
  document.getElementById("cfgWeapRefVal").textContent = `R${d.weapRefine || 1}`;
  document.getElementById("cfgIncludeWeaponCheck").checked = d.incWeapon !== false;
  document.getElementById("previewCurWeapLvlCircle").innerHTML = levelCircleInnerHtml(d.weapCurState || 0);
  document.getElementById("previewTarWeapLvlCircle").innerHTML = levelCircleInnerHtml(d.weapTarState || 0);
  const weapOpacity = d.incWeapon === false || !curWeapon ? "0.45" : "1";
  document.getElementById("btnOpenCurWeapLvlPopover").style.opacity = weapOpacity;
  document.getElementById("btnOpenTarWeapLvlPopover").style.opacity = weapOpacity;

  // 6. Resina PERSONAJE vs TOTAL + vista previa de materiales (con cantidades editables)
  const charReqs = computePlanRequirements(d);
  const charResin = computeMissingResinForReqs(charReqs);
  document.getElementById("cfgModalCharResinPill").innerHTML = resinPillHtml(charResin, false);

  const totalReqs = { ...charReqs };
  state.activePlans.forEach((p) => {
    if (p.active === false) return;
    if (p.kind === "character" && p.key === d.key) return;
    Object.entries(computePlanRequirements(p)).forEach(([m, q]) => { totalReqs[m] = (totalReqs[m] || 0) + q; });
  });
  document.getElementById("cfgModalTotalResinPill").innerHTML = resinPillHtml(computeMissingResinForReqs(totalReqs), true);

  renderMatSection(
    document.getElementById("cfgModalMaterialsPreview"),
    computePlanRequirements(d, ["level"]),
    pm.lvlMatsTitle,
    d.incLevel === false ? pm.lvlDisabledMsg : pm.lvlPickHigherMsg
  );
  renderMatSection(
    document.getElementById("cfgTalentMaterialsPreview"),
    computePlanRequirements(d, ["talents"]),
    pm.talMatsTitle,
    pm.talPickHigherMsg
  );
}

/** Pinta un bloque de pildoras de materiales editables, o un mensaje si no hay nada pendiente. */
function renderMatSection(el, reqs, title, emptyMsg) {
  if (!el) return;
  if (Object.keys(reqs).length === 0) {
    el.innerHTML = `<div style="text-align:center;color:#94a3b8;font-size:0.8rem;padding:0.4rem;">${emptyMsg}</div>`;
    return;
  }
  el.innerHTML = `
    <div style="font-size:0.78rem;color:#94a3b8;font-weight:700;margin-bottom:0.4rem;text-align:center;">${title}</div>
    <div class="mat-pill-wrap" style="max-height:300px;overflow-y:auto;">${buildMatPillsHtml(reqs, true)}</div>`;
  el.querySelectorAll(".mat-owned-input").forEach((inp) => {
    inp.addEventListener("change", () => {
      state.realOwned[inp.dataset.matid] = Math.max(0, parseInt(inp.value || "0", 10) || 0);
      saveRealOwned();
      updateCharConfigModalUI();
    });
  });
}

/* ---------- Popover de 14 circulos (con y sin ascension) ---------- */
const LEVEL_POPOVERS = {
  charCur: { pop: "charLevel14Popover", grid: "charLevel14Grid", title: "charLevel14PopoverTitle", trigger: "btnOpenCurCharLvlPopover", pane: "cfgTabPane-level", field: "curState", other: "tarState", isCur: true, labelKey: "popCharCur" },
  charTar: { pop: "charLevel14Popover", grid: "charLevel14Grid", title: "charLevel14PopoverTitle", trigger: "btnOpenTarCharLvlPopover", pane: "cfgTabPane-level", field: "tarState", other: "curState", isCur: false, labelKey: "popCharTar" },
  weapCur: { pop: "weapLevel14Popover", grid: "weapLevel14Grid", title: "weapLevel14PopoverTitle", trigger: "btnOpenCurWeapLvlPopover", pane: "cfgTabPane-weapon", field: "weapCurState", other: "weapTarState", isCur: true, labelKey: "popWeapCur" },
  weapTar: { pop: "weapLevel14Popover", grid: "weapLevel14Grid", title: "weapLevel14PopoverTitle", trigger: "btnOpenTarWeapLvlPopover", pane: "cfgTabPane-weapon", field: "weapTarState", other: "weapCurState", isCur: false, labelKey: "popWeapTar" },
  soloWeapCur: { pop: "soloWeapLevel14Popover", grid: "soloWeapLevel14Grid", title: "soloWeapLevel14PopoverTitle", trigger: "btnOpenCurSoloWeapLvlPopover", pane: "soloWeapModalMaterialsPreview", field: "curState", other: "tarState", isCur: true, isSolo: true, labelKey: "popWeapCur" },
  soloWeapTar: { pop: "soloWeapLevel14Popover", grid: "soloWeapLevel14Grid", title: "soloWeapLevel14PopoverTitle", trigger: "btnOpenTarSoloWeapLvlPopover", pane: "soloWeapModalMaterialsPreview", field: "tarState", other: "curState", isCur: false, isSolo: true, labelKey: "popWeapTar" }
};
let openLevelPopoverKey = null;

function closeAllLevelPopovers() {
  ["charLevel14Popover", "weapLevel14Popover", "soloWeapLevel14Popover"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("open");
  });
  document.querySelectorAll(".seelie-level-trigger-box").forEach((b) => b.classList.remove("active-open"));
  openLevelPopoverKey = null;
}

function openLevelPopover(key) {
  const cfg = LEVEL_POPOVERS[key];
  if (!cfg) return;
  const d = cfg.isSolo ? state.soloWeapDraft : state.cfgDraft;
  if (!d) return;
  if (openLevelPopoverKey === key) { closeAllLevelPopovers(); return; }
  closeAllLevelPopovers();
  if (!cfg.isSolo && cfg.field.startsWith("weap") && (!getWeaponInfo(d.weaponKey))) return; // sin arma no hay nivel que elegir

  const pop = document.getElementById(cfg.pop);
  const grid = document.getElementById(cfg.grid);
  const triggerEl = document.getElementById(cfg.trigger);
  const paneEl = document.getElementById(cfg.pane);
  if (!pop || !grid || !triggerEl || !paneEl) return;
  const pm = getPlannerModalI18n();
  document.getElementById(cfg.title).textContent = pm[cfg.labelKey] || cfg.labelKey;

  const current = d[cfg.field] || 0;
  const minAllowed = cfg.isCur ? 0 : d[cfg.other] || 0;
  const limits = getArProgressionLimits();

  grid.innerHTML = REAL_LEVEL_14_STATES.map((s) => {
    const exceedsAr = s.idx > limits.maxStateIdx;
    const belowMin = s.idx < minAllowed;
    const disabled = belowMin || exceedsAr;
    const reqAr = STATE_REQ_AR[s.idx] || 1;
    let title = `${pm.lvPrefix} ${s.lv} (${s.ascended ? pm.ascendedWord : pm.unascendedWord})`;
    if (exceedsAr) {
      title += ` — Bloqueado por AR (Requiere AR ${reqAr}, tu AR actual es ${limits.ar})`;
    }
    const extraStyle = exceedsAr
      ? "opacity:0.22;cursor:not-allowed;filter:grayscale(1);"
      : (belowMin ? "opacity:0.3;cursor:not-allowed;" : "");
    return `<button type="button" class="seelie-14-circle-btn ${s.idx === current ? "selected" : ""} ${s.idx === 12 ? "col-start-2" : ""}" data-lvidx="${s.idx}" ${disabled ? `disabled style="${extraStyle}"` : ""} title="${title}">${levelCircleInnerHtml(s.idx)}</button>`;
  }).join("");

  grid.querySelectorAll("[data-lvidx]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.lvidx, 10);
      d[cfg.field] = idx;
      if (cfg.isCur && (d[cfg.other] || 0) < idx) d[cfg.other] = idx;
      closeAllLevelPopovers();
      if (cfg.isSolo) {
        updateSoloWeaponConfigModalUI();
      } else {
        updateCharConfigModalUI();
      }
    });
  });

  pop.classList.add("open");
  triggerEl.classList.add("active-open");
  openLevelPopoverKey = key;
  positionFloatingPopover(pop, triggerEl, paneEl);
}

/**
 * Coloca el popover flotante al costado del modal (derecha, luego izquierda) alineado con el boton.
 * Si no hay espacio lateral, lo pone arriba o abajo del boton. Siempre queda dentro de la pantalla.
 */
function positionFloatingPopover(pop, triggerEl, paneEl) {
  if (pop.parentElement !== document.body) document.body.appendChild(pop);
  pop.classList.add("floating");
  const margin = 10;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const tr = triggerEl.getBoundingClientRect();
  const modalEl = paneEl.closest(".modal-content, .modal-box, [role='dialog']") || paneEl;
  const mr = modalEl.getBoundingClientRect();
  const pw = pop.offsetWidth;
  const ph = pop.offsetHeight;
  const clampTop = (t) => Math.max(margin, Math.min(t, vh - ph - margin));
  const clampLeft = (l) => Math.max(margin, Math.min(l, vw - pw - margin));

  let left;
  let top = clampTop(tr.top + tr.height / 2 - ph / 2);
  if (mr.right + margin + pw <= vw - margin) {
    left = mr.right + margin;
  } else if (mr.left - margin - pw >= margin) {
    left = mr.left - margin - pw;
  } else {
    left = clampLeft(tr.left + tr.width / 2 - pw / 2);
    top = tr.bottom + 6 + ph <= vh - margin ? tr.bottom + 6 : clampTop(tr.top - 6 - ph);
  }
  pop.style.left = `${left}px`;
  pop.style.top = `${top}px`;
}

/* ---------- Eventos propios del modal de configuracion ---------- */
function initCfgModalExtras() {
  const bindPopover = (btnId, key) => {
    document.getElementById(btnId).addEventListener("click", (e) => {
      e.stopPropagation();
      openLevelPopover(key);
    });
  };
  bindPopover("btnOpenCurCharLvlPopover", "charCur");
  bindPopover("btnOpenTarCharLvlPopover", "charTar");
  bindPopover("btnOpenCurWeapLvlPopover", "weapCur");
  bindPopover("btnOpenTarWeapLvlPopover", "weapTar");
  document.getElementById("btnCloseCharLvlPopover").addEventListener("click", closeAllLevelPopovers);
  document.getElementById("btnCloseWeapLvlPopover").addEventListener("click", closeAllLevelPopovers);
  document.addEventListener("click", (e) => {
    if (openLevelPopoverKey && !e.target.closest(".seelie-14-popover")) closeAllLevelPopovers();
  });
  const repositionOpenPopover = (e) => {
    if (!openLevelPopoverKey) return;
    if (e && e.target && e.target.closest && e.target.closest(".seelie-14-popover")) return;
    const cfg = LEVEL_POPOVERS[openLevelPopoverKey];
    positionFloatingPopover(document.getElementById(cfg.pop), document.getElementById(cfg.trigger), document.getElementById(cfg.pane));
  };
  window.addEventListener("resize", repositionOpenPopover);
  document.addEventListener("scroll", repositionOpenPopover, true);

  document.querySelectorAll("[data-cfgtab]").forEach((tabBtn) => {
    tabBtn.addEventListener("click", closeAllLevelPopovers);
  });

  document.getElementById("cfgIncludeLevelCheck").addEventListener("change", (e) => {
    if (!state.cfgDraft) return;
    state.cfgDraft.incLevel = e.target.checked;
    updateCharConfigModalUI();
  });
  document.getElementById("cfgIncludeWeaponCheck").addEventListener("change", (e) => {
    if (!state.cfgDraft) return;
    state.cfgDraft.incWeapon = e.target.checked;
    updateCharConfigModalUI();
  });

  document.querySelectorAll("[data-talpreset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const d = state.cfgDraft;
      if (!d) return;
      const limits = getArProgressionLimits();
      const parts = btn.dataset.talpreset.split(",").map((n) => parseInt(n, 10));
      d.talTar = [0, 1, 2].map((i) => {
        const bonus = getTalentConstBonus(d.key, i, d.constellation);
        const baseTarget = parts[i];
        const effectiveTarget = bonus > 0 && baseTarget > 1 ? Math.min(13, baseTarget + bonus) : baseTarget;
        const maxAllowedByAr = limits.maxTalent + (bonus > 0 ? bonus : 0);
        return Math.min(maxAllowedByAr, Math.max(d.talCur[i], effectiveTarget));
      });
      d.talInc = [true, true, true];
      updateCharConfigModalUI();
    });
  });

  document.getElementById("btnConstPrev").addEventListener("click", () => {
    if (!state.cfgDraft) return;
    const cur = state.cfgDraft.constellation || 0;
    if (cur > 0) {
      state.cfgDraft.constellation = cur - 1;
      updateCharConfigModalUI();
    }
  });
  document.getElementById("btnConstNext").addEventListener("click", () => {
    if (!state.cfgDraft) return;
    const cur = state.cfgDraft.constellation || 0;
    if (cur < 6) {
      state.cfgDraft.constellation = cur + 1;
      updateCharConfigModalUI();
    }
  });
  document.getElementById("cfgModalNotes").addEventListener("input", (e) => {
    if (state.cfgDraft) state.cfgDraft.notes = e.target.value;
  });

  document.getElementById("btnWeapRefPrev").addEventListener("click", () => {
    if (!state.cfgDraft) return;
    state.cfgDraft.weapRefine = Math.max(1, (state.cfgDraft.weapRefine || 1) - 1);
    updateCharConfigModalUI();
  });
  document.getElementById("btnWeapRefNext").addEventListener("click", () => {
    if (!state.cfgDraft) return;
    state.cfgDraft.weapRefine = Math.min(5, (state.cfgDraft.weapRefine || 1) + 1);
    updateCharConfigModalUI();
  });

  document.getElementById("btnCfgHelp").addEventListener("click", () => {
    alert(
      "Guía rápida:\n\n" +
      "• NIVEL: toca el círculo Actual u Objetivo y elige entre los 14 niveles. La estrella blanca brillante indica que el personaje ya está ascendido en ese nivel.\n" +
      "• TALENTOS: cada talento se calcula por separado (marca o desmarca su casilla) con su nivel actual y objetivo.\n" +
      "• ARMA: elige el arma equipada, su refinamiento y su nivel actual y objetivo.\n" +
      "• Botón verde: guarda el personaje en tu planificador.\n" +
      "• Botón morado (flecha): úsalo cuando ya subiste todo en el juego; descuenta los materiales y deja Actual = Objetivo."
    );
  });
  document.getElementById("btnCfgSaveChar").addEventListener("click", () => saveDraftCharacterToPlans(false));
  document.getElementById("btnCfgConsumeLevelUp").addEventListener("click", () => saveDraftCharacterToPlans(true));
}

/* =====================================================================
   GUARDAR / CONSUMIR
   ===================================================================== */
function consumeRequirementsFromOwned(reqs) {
  Object.entries(reqs).forEach(([matId, qty]) => {
    state.realOwned[matId] = Math.max(0, getRealOwned(matId) - qty);
  });
  saveRealOwned();
}

function markPlanAsCompleted(plan) {
  if (plan.kind === "weapon") {
    plan.curState = plan.tarState;
    return;
  }
  if (plan.incLevel !== false) {
    plan.curState = plan.tarState;
    syncTravelerLevel(plan);
  }
  for (let t = 0; t < 3; t++) {
    if (!plan.talInc || plan.talInc[t] !== false) plan.talCur[t] = plan.talTar[t];
  }
  if (plan.incWeapon !== false && plan.weaponKey && plan.weaponKey !== "none") {
    plan.weapCurState = plan.weapTarState;
  }
}

function saveDraftCharacterToPlans(consumeMaterialsNow) {
  const d = state.cfgDraft;
  if (!d) return;
  if (consumeMaterialsNow) {
    consumeRequirementsFromOwned(computePlanRequirements({ ...d, travelerFullLevel: true }));
    markPlanAsCompleted(d);
  }
  closeCharConfigModal(true);
}

function completeAndConsumePlan(idx) {
  const plan = state.activePlans[idx];
  if (!plan) return;
  consumeRequirementsFromOwned(computePlanRequirements({ ...plan, travelerFullLevel: true }));
  markPlanAsCompleted(plan);
  savePlansToStorage();
}

/* =====================================================================
   CATÁLOGO OFICIAL DE ARMAS INDEPENDIENTES (MODAL 1B)
   ===================================================================== */
function openWeaponRosterModal() {
  applyPlannerModalStaticTranslations();
  closeAllLevelPopovers();
  document.getElementById("seelieWeaponRosterModal").classList.add("open");
  renderWeaponRosterModalGrid();
}

function closeWeaponRosterModal() {
  document.getElementById("seelieWeaponRosterModal").classList.remove("open");
}

function renderWeaponRosterModalGrid() {
  applyPlannerModalStaticTranslations();
  const gridEl = document.getElementById("weaponRosterModalGrid");
  if (!gridEl) return;
  gridEl.innerHTML = "";

  const f = state.weaponRosterFilter || { rarity: null, weapon: null, search: "" };
  const search = f.search ? f.search.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

  const filtered = REAL_UPGRADABLE_WEAPONS.filter((w) => {
    if (f.rarity && w.rarity !== f.rarity) return false;
    if (f.weapon && w.type !== f.weapon) return false;
    if (search) {
      const curLang = (typeof state !== "undefined" && state.lang) || "es";
      const plain = w.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const trans = (typeof getWeaponTranslatedName === "function") ? getWeaponTranslatedName(w.name, curLang).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
      if (!plain.includes(search) && !trans.includes(search)) return false;
    }
    return true;
  });

  filtered.forEach((w) => {
    const existingPlan = state.activePlans.find((p) => p.kind === "weapon" && (p.key === w.name || p.weaponKey === w.name));
    const tile = document.createElement("div");
    tile.className = "seelie-roster-tile";
    const curLang = (typeof state !== "undefined" && state.lang) || "es";
    const dispWpName = (typeof getWeaponTranslatedName === "function") ? getWeaponTranslatedName(w.name, curLang) : w.name;
    tile.title = `${dispWpName} (${w.rarity}★, ${getWeaponTypeLabel(w.type)})`;
    const addedBadgeHtml = existingPlan ? `<span class="seelie-roster-added-tag" style="background:#4338ca;">R${existingPlan.weapRefine || 1}</span>` : "";
    tile.innerHTML = `
      <div class="seelie-roster-portrait rar-bg-${w.rarity}">
        ${addedBadgeHtml}
        <img src="${w.icon}" alt="${escapeHtml(dispWpName)}" loading="lazy" onerror="this.style.visibility='hidden';" />
        <span class="seelie-roster-el-badge" title="${getWeaponTypeLabel(w.type)}" style="padding:2px;">
          ${weaponTypeImgHtml(w.type, 16)}
        </span>
      </div>
      <div class="seelie-roster-name">${escapeHtml(dispWpName)}</div>
    `;
    tile.addEventListener("click", () => {
      closeWeaponRosterModal();
      openSoloWeaponConfigModal(w.name, true);
    });
    gridEl.appendChild(tile);
  });

  if (filtered.length === 0) {
    const pm = getPlannerModalI18n();
    gridEl.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:#94a3b8;padding:1.5rem;">${escapeHtml(pm.noWeapMatch)}</div>`;
  }
}

/* =====================================================================
   CONFIGURACIÓN DE ARMA INDEPENDIENTE (MODAL 2B)
   ===================================================================== */
function openSoloWeaponConfigModal(weaponName, openedFromRoster) {
  applyPlannerModalStaticTranslations();
  state.soloWeapOpenedFromRoster = !!openedFromRoster;
  const existing = state.activePlans.find((p) => p.kind === "weapon" && (p.key === weaponName || p.weaponKey === weaponName));
  const limits = getArProgressionLimits();

  if (existing) {
    state.soloWeapDraft = JSON.parse(JSON.stringify(existing));
    if (state.soloWeapDraft.tarState > limits.maxStateIdx) state.soloWeapDraft.tarState = limits.maxStateIdx;
    if (state.soloWeapDraft.curState > limits.maxStateIdx) state.soloWeapDraft.curState = limits.maxStateIdx;
  } else {
    state.soloWeapDraft = {
      uid: `plan_weap_${Date.now()}`,
      kind: "weapon",
      key: weaponName,
      weaponKey: weaponName,
      active: true,
      notes: "",
      weapRefine: 1,
      curState: 0,
      tarState: limits.maxStateIdx
    };
  }

  closeAllLevelPopovers();
  document.getElementById("seelieSoloWeaponConfigModal").classList.add("open");
  updateSoloWeaponConfigModalUI();
}

function closeSoloWeaponConfigModal(autoSave = true) {
  closeAllLevelPopovers();
  const modalEl = document.getElementById("seelieSoloWeaponConfigModal");
  if (modalEl) modalEl.classList.remove("open");
  const d = state.soloWeapDraft;
  state.soloWeapDraft = null;
  if (autoSave && d) {
    const idx = state.activePlans.findIndex((p) => p.kind === "weapon" && (p.key === d.key || p.weaponKey === d.key));
    if (idx !== -1) {
      state.activePlans[idx] = JSON.parse(JSON.stringify(d));
    } else {
      state.activePlans.unshift(JSON.parse(JSON.stringify(d)));
    }
    try {
      savePlansToStorage();
    } catch (err) {
      console.error("Error al guardar planes de arma:", err);
    }
  }
}

function updateSoloWeaponConfigModalUI() {
  applyPlannerModalStaticTranslations();
  const d = state.soloWeapDraft;
  if (!d) return;
  const wp = getWeaponInfo(d.key || d.weaponKey);
  if (!wp) return;
  const pm = getPlannerModalI18n();

  const limits = getArProgressionLimits();
  if (d.tarState > limits.maxStateIdx) d.tarState = limits.maxStateIdx;
  if (d.curState > limits.maxStateIdx) d.curState = limits.maxStateIdx;

  const weapArBadge = document.getElementById("soloWeapArLimitBadge");
  if (weapArBadge) {
    if (limits.ar < 50) {
      weapArBadge.style.display = "inline-block";
      weapArBadge.textContent = `Tope AR ${limits.ar}: Nivel Máx ${limits.maxLv}`;
      weapArBadge.title = `Para ascender armas sobre Nivel ${limits.maxLv} se requiere alcanzar AR ${limits.reqNextAr}.`;
    } else {
      weapArBadge.style.display = "none";
    }
  }

  // Cabecera
  const banner = document.getElementById("soloWeapModalBanner");
  banner.className = `seelie-config-banner ${wp.rarity >= 5 ? "weap-card-banner-5" : (wp.rarity === 4 ? "weap-card-banner-4" : "weap-card-banner-3")}`;
  document.getElementById("soloWeapModalAvatarWrap").className = `seelie-config-avatar rar-bg-${wp.rarity}`;
  const avatarImg = document.getElementById("soloWeapModalAvatarImg");
  avatarImg.src = wp.icon;
  avatarImg.onerror = () => { avatarImg.style.visibility = "hidden"; };

  const curLang = (typeof state !== "undefined" && state.lang) || "es";
  const dispWpName = (typeof getWeaponTranslatedName === "function") ? getWeaponTranslatedName(d.key, curLang) : d.key;
  document.getElementById("soloWeapModalName").textContent = dispWpName.toUpperCase();
  document.getElementById("soloWeapModalRarityBadge").innerHTML = `${wp.rarity}★ • ${weaponTypeImgHtml(wp.type, 14)} ${getWeaponTypeLabel(wp.type)}`;
  document.getElementById("btnSoloWeapToggleActive").classList.toggle("off", d.active === false);

  // Notas y refinamiento
  document.getElementById("soloWeapNotes").value = d.notes || "";
  document.getElementById("soloWeapRefVal").textContent = `R${d.weapRefine || 1}`;

  // Círculos de 14 niveles
  document.getElementById("previewCurSoloWeapLvlCircle").innerHTML = levelCircleInnerHtml(d.curState);
  document.getElementById("previewTarSoloWeapLvlCircle").innerHTML = levelCircleInnerHtml(d.tarState);

  // Materiales en vivo
  const reqs = computePlanRequirements(d);
  const weapResin = computeMissingResinForReqs(reqs);
  document.getElementById("soloWeapModalCharResinPill").innerHTML = resinPillHtml(weapResin, false);

  const totalReqs = { ...reqs };
  state.activePlans.forEach((p) => {
    if (p.kind === "weapon" && (p.key === d.key || p.weaponKey === d.key)) return;
    Object.entries(computePlanRequirements(p)).forEach(([m, q]) => { totalReqs[m] = (totalReqs[m] || 0) + q; });
  });
  document.getElementById("soloWeapModalTotalResinPill").innerHTML = resinPillHtml(computeMissingResinForReqs(totalReqs), true);

  const from = d.curState || 0;
  const to = Math.max(from, d.tarState || 0);
  const range = `${pm.lvPrefix} ${weaponLevelLabel(from)} → ${weaponLevelLabel(to)}`;
  const subtitle = to <= from
    ? `${pm.soloSameLvl} (${range}). ${pm.noMatsNeeded}`
    : `${pm.soloMatsTitle} (${range}). ${pm.canEditOwned}`;

  renderMatSection(
    document.getElementById("soloWeapModalMaterialsPreview"),
    reqs,
    subtitle,
    pm.lvlPickHigherMsg
  );
}

function saveDraftWeaponToPlans(consumeMaterialsNow) {
  const d = state.soloWeapDraft;
  if (!d) return;
  if (consumeMaterialsNow) {
    consumeRequirementsFromOwned(computePlanRequirements(d));
    markPlanAsCompleted(d);
  }
  closeSoloWeaponConfigModal(true);
}

function initSoloWeaponConfigEvents() {
  const bindPopover = (btnId, key) => {
    const el = document.getElementById(btnId);
    if (!el) return;
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      openLevelPopover(key);
    });
  };
  bindPopover("btnOpenCurSoloWeapLvlPopover", "soloWeapCur");
  bindPopover("btnOpenTarSoloWeapLvlPopover", "soloWeapTar");

  const closeBtn = document.getElementById("btnCloseSoloWeapLvlPopover");
  if (closeBtn) closeBtn.addEventListener("click", closeAllLevelPopovers);

  const refPrev = document.getElementById("btnSoloWeapRefPrev");
  if (refPrev) refPrev.addEventListener("click", () => {
    if (!state.soloWeapDraft) return;
    state.soloWeapDraft.weapRefine = Math.max(1, (state.soloWeapDraft.weapRefine || 1) - 1);
    updateSoloWeaponConfigModalUI();
  });
  const refNext = document.getElementById("btnSoloWeapRefNext");
  if (refNext) refNext.addEventListener("click", () => {
    if (!state.soloWeapDraft) return;
    state.soloWeapDraft.weapRefine = Math.min(5, (state.soloWeapDraft.weapRefine || 1) + 1);
    updateSoloWeaponConfigModalUI();
  });

  const notesInp = document.getElementById("soloWeapNotes");
  if (notesInp) notesInp.addEventListener("input", (e) => {
    if (state.soloWeapDraft) state.soloWeapDraft.notes = e.target.value;
  });

  const actBtn = document.getElementById("btnSoloWeapToggleActive");
  if (actBtn) actBtn.addEventListener("click", () => {
    if (!state.soloWeapDraft) return;
    state.soloWeapDraft.active = !state.soloWeapDraft.active;
    updateSoloWeaponConfigModalUI();
  });

  const delBtn = document.getElementById("btnSoloWeapDelete");
  if (delBtn) delBtn.addEventListener("click", () => {
    if (!state.soloWeapDraft) return;
    const existingIdx = state.activePlans.findIndex(
      (p) => p.kind === "weapon" && (p.key === state.soloWeapDraft.key || p.weaponKey === state.soloWeapDraft.key)
    );
    if (existingIdx !== -1) {
      state.activePlans.splice(existingIdx, 1);
      savePlansToStorage();
    }
    closeSoloWeaponConfigModal(false);
  });

  const backBtn = document.getElementById("btnSoloWeapBackToRoster");
  if (backBtn) backBtn.addEventListener("click", () => {
    closeSoloWeaponConfigModal(true);
    openWeaponRosterModal();
  });

  const closeModalBtn = document.getElementById("btnSoloWeapClose");
  if (closeModalBtn) closeModalBtn.addEventListener("click", () => closeSoloWeaponConfigModal(true));

  const backdrop = document.getElementById("seelieSoloWeaponConfigModal");
  if (backdrop) backdrop.addEventListener("click", (e) => {
    if (e.target.id === "seelieSoloWeaponConfigModal") closeSoloWeaponConfigModal(true);
  });

  const saveBtn = document.getElementById("btnSoloWeapSave");
  if (saveBtn) saveBtn.addEventListener("click", () => saveDraftWeaponToPlans(false));

  const consumeBtn = document.getElementById("btnSoloWeapConsumeLevelUp");
  if (consumeBtn) consumeBtn.addEventListener("click", () => saveDraftWeaponToPlans(true));
}

/* =====================================================================
   TARJETAS DE PERSONAJES EN LA VISTA PRINCIPAL
   ===================================================================== */
function renderCharacterWeaponPlanner() {
  applyPlannerModalStaticTranslations();
  const gridEl = document.getElementById("plannerCardsGrid");
  if (!gridEl) return;
  gridEl.innerHTML = "";
  const curLang = (typeof state !== "undefined" && state.lang) || "es";
  const tp = (typeof I18N !== "undefined" && I18N[curLang] && I18N[curLang].planner) || {};
  const pm = getPlannerModalI18n();
  const noMatsTxt = tp.noMatsPending || "Sin materiales pendientes";
  const cfgCharTxt = tp.cfgCharBtn || "Configurar nivel, constelación, talentos y arma";
  const cfgWeapTxt = tp.cfgWeapBtn || "Configurar nivel y refinamiento";
  const f = state.mainCharFilter;
  const search = (f.search || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  state.activePlans.forEach((plan, idx) => {
    // -------------------------------------------------------------
    // CASO A: ARMA INDEPENDIENTE (plan.kind === "weapon")
    // -------------------------------------------------------------
    if (plan.kind === "weapon") {
      const wp = getWeaponInfo(plan.key || plan.weaponKey);
      if (!wp) return;
      if (f.rarity && wp.rarity !== f.rarity) return;
      if (f.weapon && wp.type !== f.weapon) return;
      if (f.element) return; // Las armas no tienen elemento; si hay filtro elemental, se ocultan
      const dispWpPlanKey = (typeof getWeaponTranslatedName === "function") ? getWeaponTranslatedName(plan.key, curLang) : plan.key;
      if (search) {
        const plain = `${plan.key} ${dispWpPlanKey} ${plan.notes || ""}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!plain.includes(search)) return;
      }

      // Mostrar las metas incluso cuando el plan está pausado.
    const reqs = computePlanRequirements({ ...plan, active: true });
      const weapResin = computeMissingResinForReqs(reqs);
      const bannerClass = wp.rarity >= 5 ? "weap-card-banner-5" : (wp.rarity === 4 ? "weap-card-banner-4" : "weap-card-banner-3");

      const notesHtml = plan.notes
        ? `<div style="font-size:0.75rem;color:#c084fc;background:rgba(192,132,252,0.1);padding:0.28rem 0.55rem;border-radius:6px;">${escapeHtml(plan.notes)}</div>`
        : "";

      const card = document.createElement("div");
      card.className = `seelie-char-card ${plan.active === false ? "inactive-plan" : ""}`;
      card.innerHTML = `
        <div class="seelie-char-card-banner ${bannerClass}" data-open-solo-weap="1" title="${escapeHtml(dispWpPlanKey)}">
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <div class="seelie-avatar-wrap rar-bg-${wp.rarity}">
              <span class="seelie-const-badge" style="background:#4338ca;">R${plan.weapRefine || 1}</span>
              <img class="seelie-avatar-img" src="${wp.icon}" alt="${escapeHtml(dispWpPlanKey)}" onerror="this.style.visibility='hidden'" />
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:0.4rem;">
                <strong style="font-size:1.05rem;color:#ffffff;text-transform:uppercase;letter-spacing:0.3px;">${escapeHtml(dispWpPlanKey)}</strong>
                <span style="display:inline-flex;align-items:center;gap:0.25rem;font-size:0.72rem;color:#cbd5e1;background:rgba(0,0,0,0.35);padding:1px 6px;border-radius:4px;">
                  ${weaponTypeImgHtml(wp.type, 14)} ${escapeHtml(getWeaponTypeLabel(wp.type))}
                </span>
              </div>
              <div style="font-size:0.82rem;color:#fbbf24;font-weight:800;margin-top:0.2rem;display:flex;align-items:center;gap:0.35rem;">
                ${levelStateInline(plan.curState || 0)} <span style="color:#cbd5e1;">»</span> ${levelStateInline(plan.tarState || 0)}
                <span style="font-size:0.72rem;color:#e9d5ff;margin-left:0.25rem;">(R${plan.weapRefine || 1})</span>
              </div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:0.38rem;">
            <span class="seelie-resin-pill" style="font-size:0.7rem;padding:0.22rem 0.55rem;">${resinPillHtml(weapResin, false)}</span>
          </div>
        </div>

        <div class="seelie-char-card-body">
          ${notesHtml}
          <div class="mat-pill-wrap">
            ${Object.keys(reqs).length ? buildMatPillsHtml(reqs, false) : `<span style="color:#4ade80;font-size:0.78rem;font-weight:700;">${escapeHtml(noMatsTxt)}</span>`}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;margin-top:auto;padding-top:0.55rem;border-top:1px solid rgba(255,255,255,0.06);">
            <button type="button" class="chip-btn" data-edit-solo-weap="1" style="flex:1;text-align:center;">${escapeHtml(cfgWeapTxt)}</button>
            <button type="button" class="seelie-fab-levelup" data-consume-idx="${idx}" style="width:34px;height:34px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </button>
          </div>
        </div>`;

      bindPlannerCardPause(card, plan);
      card.querySelector("[data-open-solo-weap]").addEventListener("click", () => openSoloWeaponConfigModal(plan.key, false));
      card.querySelector("[data-edit-solo-weap]").addEventListener("click", () => openSoloWeaponConfigModal(plan.key, false));
      card.querySelector("[data-consume-idx]").addEventListener("click", (e) => {
        e.stopPropagation();
        completeAndConsumePlan(idx);
      });
      gridEl.appendChild(card);
      return;
    }

    // -------------------------------------------------------------
    // CASO B: PERSONAJE (plan.kind === "character")
    // -------------------------------------------------------------
    if (plan.kind !== "character") return;
    const info = getRosterCharInfo(plan.key);
    if (!info) return;
    if (f.rarity && info.rarity !== f.rarity) return;
    if (f.element && info.element !== f.element) return;
    if (f.weapon && info.weapon !== f.weapon) return;
    const dispCharPlanKey = (typeof getCharacterTranslatedName === "function") ? getCharacterTranslatedName(plan.key, curLang) : plan.key;
    if (search) {
      const plain = `${plan.key} ${dispCharPlanKey} ${plan.notes || ""}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (!plain.includes(search)) return;
    }

    // Mostrar las metas incluso cuando el plan está pausado.
    const reqs = computePlanRequirements({ ...plan, active: true });
    const charResin = computeMissingResinForReqs(reqs);
    const bannerGradient = ELEMENT_BANNERS[info.element] || ELEMENT_BANNERS.Hydro;
    const bannerBg = info.namecard
      ? `linear-gradient(90deg, rgba(10,14,25,0.82) 0%, rgba(10,14,25,0.3) 100%), url('${info.namecard}') center/cover no-repeat, ${bannerGradient}`
      : bannerGradient;

    const talentsHtml = info.talents.slice(0, 3).map((tal, t) => {
      const off = plan.talInc && plan.talInc[t] === false;
      return `<span style="display:inline-flex;align-items:center;gap:0.3rem;${off ? "opacity:0.4;" : ""}" title="${escapeHtml(tal.name)}">
        <span class="seelie-talent-icon-circle" style="width:26px;height:26px;padding:2px;"><img src="${tal.icon}" alt="" onerror="this.style.visibility='hidden'" /></span>
        <strong style="color:var(--gold-bright);font-size:0.8rem;">${plan.talCur[t]}»${plan.talTar[t]}</strong>
      </span>`;
    }).join("");

    const curWeapon = plan.weaponKey ? getWeaponInfo(plan.weaponKey) : null;
    const dispCurWp = curWeapon ? ((typeof getWeaponTranslatedName === "function") ? getWeaponTranslatedName(curWeapon.name, curLang) : curWeapon.name) : "";
    const weapSummaryHtml = curWeapon
      ? `<div class="seelie-prog-row" style="${plan.incWeapon === false ? "opacity:0.45;" : ""}">
          <span style="display:inline-flex;align-items:center;gap:0.4rem;color:#cbd5e1;font-weight:700;">
            <img src="${curWeapon.icon}" alt="" style="width:26px;height:26px;object-fit:contain;" onerror="this.style.visibility='hidden'" />
            ${escapeHtml(dispCurWp)} <strong style="color:#fbbf24;">R${plan.weapRefine || 1}</strong>
          </span>
          <strong style="color:#e2e8f0;display:inline-flex;align-items:center;gap:0.3rem;">${levelStateInline(plan.weapCurState || 0)} » ${levelStateInline(plan.weapTarState || 0)}</strong>
        </div>`
      : "";

    const notesHtml = plan.notes
      ? `<div style="font-size:0.75rem;color:#93c5fd;background:rgba(59,130,246,0.1);padding:0.28rem 0.55rem;border-radius:6px;">${escapeHtml(plan.notes)}</div>`
      : "";

    const card = document.createElement("div");
    card.className = `seelie-char-card ${plan.active === false ? "inactive-plan" : ""}`;
    card.innerHTML = `
      <div class="seelie-char-card-banner" style="background:${bannerBg};" data-open-cfg="1" title="${escapeHtml(dispCharPlanKey)}">
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <div class="seelie-avatar-wrap rar-bg-${info.rarity}">
            <span class="seelie-const-badge">C${plan.constellation || 0}</span>
            <img class="seelie-avatar-img" src="${info.icon}" alt="${escapeHtml(dispCharPlanKey)}" onerror="this.onerror=null;this.src='${info.fallbackAvatar}';" />
            <span class="seelie-el-corner">${elementImgHtml(info.element, 18)}</span>
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:0.4rem;">
              <strong style="font-size:1.1rem;color:#ffffff;text-transform:uppercase;letter-spacing:0.3px;">${escapeHtml(dispCharPlanKey)}</strong>
              <span style="display:inline-flex;align-items:center;gap:0.25rem;font-size:0.72rem;color:#cbd5e1;background:rgba(0,0,0,0.35);padding:1px 6px;border-radius:4px;">
                ${weaponTypeImgHtml(info.weapon, 14)} ${escapeHtml(getWeaponTypeLabel(info.weapon))}
              </span>
            </div>
            <div style="font-size:0.82rem;color:#fbbf24;font-weight:800;margin-top:0.2rem;display:flex;align-items:center;gap:0.35rem;flex-wrap:wrap;${plan.incLevel === false ? "opacity:0.45;" : ""}">
              ${levelStateInline(plan.curState || 0)} <span style="color:#cbd5e1;">»</span> ${levelStateInline(plan.tarState || 0)}
              ${(plan.tarState > getArProgressionLimits().maxStateIdx && getArProgressionLimits().ar < 50) ? `<span style="font-size:0.68rem;color:#f59e0b;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.35);padding:1px 5px;border-radius:4px;" title="Supera tu Rango de Aventura actual">⚠️ Tope AR ${getArProgressionLimits().ar}: Nv. ${getArProgressionLimits().maxLv}</span>` : ""}
            </div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:0.38rem;">
          <span class="seelie-resin-pill" style="font-size:0.7rem;padding:0.22rem 0.55rem;">${resinPillHtml(charResin, false)}</span>
        </div>
      </div>

      <div class="seelie-char-card-body">
        ${notesHtml}
        <div class="seelie-prog-row" style="gap:0.4rem;flex-wrap:wrap;justify-content:space-between;">${talentsHtml}</div>
        ${weapSummaryHtml}
        <div class="mat-pill-wrap">
          ${Object.keys(reqs).length ? buildMatPillsHtml(reqs, false) : `<span style="color:#4ade80;font-size:0.78rem;font-weight:700;">${escapeHtml(noMatsTxt)}</span>`}
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;margin-top:auto;padding-top:0.55rem;border-top:1px solid rgba(255,255,255,0.06);">
          <button type="button" class="chip-btn" data-edit-char="1" style="flex:1;text-align:center;">${escapeHtml(cfgCharTxt)}</button>
          <button type="button" class="seelie-fab-levelup" data-consume-idx="${idx}" style="width:34px;height:34px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          </button>
        </div>
      </div>`;

    bindPlannerCardPause(card, plan);
    card.querySelector("[data-open-cfg]").addEventListener("click", () => openCharConfigModal(plan.key, false));
    card.querySelector("[data-edit-char]").addEventListener("click", () => openCharConfigModal(plan.key, false));
    card.querySelector("[data-consume-idx]").addEventListener("click", (e) => {
      e.stopPropagation();
      completeAndConsumePlan(idx);
    });
    gridEl.appendChild(card);
  });

  if (!gridEl.children.length) {
    gridEl.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:#94a3b8;padding:2rem;">${escapeHtml(pm.emptyPlanner)}</div>`;
  }

  const totalMissing = computeGlobalMissingResin();
  document.getElementById("valPlannerResin").innerHTML = resinPillHtml(totalMissing, false);
  document.getElementById("valPlannerDays").innerHTML = `${resinImgHtml(true, 18)} ${FarmingEngine.getSeelieFarmingData("all").totals.condResin} ${escapeHtml(tp.condensedWord || "Concentradas")}`;
}

function bindPlannerCardPause(card, plan) {
  const labels = {
    es: ["Clic derecho para pausar el farmeo", "Pausado: clic derecho para reactivar"],
    en: ["Right-click to pause farming", "Paused: right-click to resume"],
    pt: ["Clique direito para pausar o farm", "Pausado: clique direito para reativar"],
    ja: ["右クリックで周回を一時停止", "一時停止中: 右クリックで再開"],
    ko: ["우클릭으로 파밍 일시 중지", "일시 중지됨: 우클릭으로 재개"]
  };
  card.title = (labels[state.lang] || labels.es)[plan.active === false ? 1 : 0];
  card.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const key = plan.key || plan.name;
    const plans = (state.activePlans || []).filter((p) => (p.key || p.name) === key);
    const active = !plans.some((p) => p.active !== false);
    plans.forEach((p) => { p.active = active; });
    if (!active && state.farmingCharFilter === key) state.farmingCharFilter = "all";
    savePlansToStorage();
  });
}
