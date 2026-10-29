// =====================================================================
// GARANTÍA DEFENSIVA DE escapeHtml Y PUENTE RETROCOMPATIBLE DE ALMACENAMIENTO
// =====================================================================
if (typeof window !== "undefined" && typeof window.escapeHtml !== "function") {
  window.escapeHtml = function (text) {
    if (text === null || text === undefined) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };
}
if (typeof escapeHtml !== "function") {
  var escapeHtml = typeof window !== "undefined" ? window.escapeHtml : function (text) {
    if (text === null || text === undefined) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };
}

function getSpiriflyStorage(key, fallback) {
  if (fallback === undefined) fallback = null;
  try {
    const val = localStorage.getItem(`spirifly_${key}`);
    if (val !== null) return val;
    const legacyVal = localStorage.getItem(`teyvat_${key}`);
    if (legacyVal !== null) {
      try { localStorage.setItem(`spirifly_${key}`, legacyVal); } catch (_) {}
      return legacyVal;
    }
  } catch (_) {}
  return fallback;
}

function setSpiriflyStorage(key, value) {
  try {
    const strVal = String(value);
    localStorage.setItem(`spirifly_${key}`, strVal);
    localStorage.setItem(`teyvat_${key}`, strVal);
  } catch (_) {}
}

function parseSpiriflyStorage(key, fallback) {
  try {
    const raw = getSpiriflyStorage(key, null);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (_) {
    return fallback;
  }
}

function loadActiveAccountResin() {
  const activeAcc = (typeof AccountManager !== "undefined") ? AccountManager.getActiveAccountId() : (localStorage.getItem("account") || "main");
  try {
    const raw = localStorage.getItem(`${activeAcc}-resin`);
    if (raw) {
      const d = JSON.parse(raw);
      if (typeof d === "object" && d !== null) {
        return { val: d.val !== undefined ? Number(d.val) : 200, updated: d.updated ? Number(d.updated) : Date.now() };
      }
    }
  } catch (e) {}
  if (activeAcc === "main") {
    const legacyVal = parseInt(getSpiriflyStorage("resin_val", "200"), 10);
    const legacyTime = parseInt(getSpiriflyStorage("resin_updated_time", "0"), 10);
    return { val: !isNaN(legacyVal) ? legacyVal : 200, updated: legacyTime > 0 ? legacyTime : Date.now() };
  }
  return { val: 200, updated: Date.now() };
}

function saveActiveAccountResin(val, updatedTime) {
  const activeAcc = (typeof AccountManager !== "undefined") ? AccountManager.getActiveAccountId() : (localStorage.getItem("account") || "main");
  const data = { val: Math.max(0, Math.min(200, val)), updated: updatedTime || Date.now() };
  localStorage.setItem(`${activeAcc}-resin`, JSON.stringify(data));
  if (activeAcc === "main") {
    setSpiriflyStorage("resin_val", data.val);
    setSpiriflyStorage("resin_updated_time", data.updated);
  }
}
/* =====================================================================
   METADATA DEL INVENTARIO OFICIAL SEELIE (508 MATERIALES + RECURSOS)
   ===================================================================== */
const DEFAULT_SEELIE_OWNED = {};

if (typeof REAL_MASTER_MATERIALS !== "undefined" && !REAL_MASTER_MATERIALS["113021"]) {
  REAL_MASTER_MATERIALS["113021"] = {
    id: "113021",
    name: "Solvente de sueños",
    rank: 4,
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113021.png"
  };
}

function safeParseLocal(key, fallback) {
  try {
    let raw = localStorage.getItem(key);
    if (!raw && key.startsWith("teyvat_")) {
      const spiriKey = key.replace("teyvat_", "spirifly_");
      raw = localStorage.getItem(spiriKey);
    }
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (e) {
    console.warn(`Error al leer ${key} desde localStorage, usando respaldo seguro.`, e);
    return fallback;
  }
}

function getInitialRealOwned() {
  const activeAcc = (typeof AccountManager !== "undefined") ? AccountManager.getActiveAccountId() : (localStorage.getItem("account") || "main");
  const saved = safeParseLocal(`${activeAcc}-inventory`, null) || (activeAcc === "main" ? safeParseLocal("teyvat_real_owned_v1", null) : null);
  if (saved && typeof saved === "object" && Object.keys(saved).length > 0) {
    if (saved["223"] !== undefined && saved["113021"] === undefined) {
      saved["113021"] = saved["223"];
      delete saved["223"];
    }
    return Object.assign({}, DEFAULT_SEELIE_OWNED, saved);
  }
  return Object.assign({}, DEFAULT_SEELIE_OWNED);
}

const SEELIE_ORDER_112 = [
  112014, 112005, 112020, 112032, 112011, 112008, 112002, 112023, 112026, 112029,
  112035, 112038, 112041, 112044, 112047, 112050, 112053, 112056, 112059, 112062,
  112065, 112068, 112071, 112074, 112077, 112080, 112083, 112086, 112089, 112092,
  112095, 112098, 112101, 112104, 112107, 112110, 112113, 112116, 112119, 112122,
  112125, 112128, 112131, 112134, 112137, 112140, 112143, 112146, 112149, 112152,
  112155, 112017
];

function buildRealInventoryItems() {
  const mats = typeof REAL_MASTER_MATERIALS !== "undefined" ? REAL_MASTER_MATERIALS : {};
  const items = [];

  // 1. Enemigos Comunes y Élite (112) en el orden exacto de Seelie.me
  SEELIE_ORDER_112.forEach((baseId) => {
    const famSlice = [];
    for (let s = 0; s < 3; s++) {
      const id = String(baseId + s);
      if (mats[id]) famSlice.push(mats[id]);
    }
    if (famSlice.length) {
      const cat = famSlice[0].rank === 1 ? "common" : "elite";
      const famId = "fam_" + baseId;
      famSlice.forEach((m, idx) => {
        items.push({
          id: m.id,
          name: m.name,
          rarity: m.rank,
          cat: cat,
          family: famId,
          tier: idx + 1,
          icon: m.icon
        });
      });
    }
  });

  // 2. Materiales de Dominio de Armas (114)
  const m114 = Object.values(mats).filter((m) => parseInt(m.id) >= 114000 && parseInt(m.id) < 115000);
  m114.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  for (let i = 0; i < m114.length; i += 4) {
    const famSlice = m114.slice(i, i + 4);
    const famId = "fam_" + famSlice[0].id;
    famSlice.forEach((m, idx) => {
      items.push({
        id: m.id,
        name: m.name,
        rarity: m.rank,
        cat: "domain",
        family: famId,
        tier: idx + 1,
        icon: m.icon
      });
    });
  }

  // 3. Jefes de Mundo (113 rank 4)
  const m113 = Object.values(mats).filter((m) => parseInt(m.id) >= 113000 && parseInt(m.id) < 114000);
  m113.filter((m) => m.rank < 5 && String(m.id) !== "113021" && String(m.id) !== "113063").sort((a, b) => parseInt(a.id) - parseInt(b.id)).forEach((m) => {
    items.push({
      id: m.id,
      name: m.name,
      rarity: m.rank,
      cat: "boss",
      family: null,
      tier: 1,
      icon: m.icon
    });
  });

  if (mats["113063"]) {
    const m = mats["113063"];
    items.push({id: m.id, name: m.name, rarity: m.rank, cat: "local", family: null, tier: 1, icon: m.icon});
  }

  // 4. Jefes Semanales (113 rank 5)
  m113.filter((m) => m.rank >= 5 && String(m.id) !== "113063").sort((a, b) => parseInt(a.id) - parseInt(b.id)).forEach((m) => {
    items.push({
      id: m.id,
      name: m.name,
      rarity: m.rank,
      cat: "weekly",
      family: null,
      tier: 1,
      icon: m.icon
    });
  });

  // 5. Gemas Elementales (1041)
  const m1041 = Object.values(mats).filter((m) => parseInt(m.id) >= 104100 && parseInt(m.id) < 104200);
  m1041.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  for (let i = 0; i < m1041.length; i += 4) {
    const famSlice = m1041.slice(i, i + 4);
    const famId = "fam_" + famSlice[0].id;
    famSlice.forEach((m, idx) => {
      items.push({
        id: m.id,
        name: m.name,
        rarity: m.rank,
        cat: "gem",
        family: famId,
        tier: idx + 1,
        icon: m.icon
      });
    });
  }

  // 6. Libros de Talento (1043)
  const m1043 = Object.values(mats).filter((m) => parseInt(m.id) >= 104300 && parseInt(m.id) < 104400 && m.id !== "104319");
  m1043.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  for (let i = 0; i < m1043.length; i += 3) {
    const famSlice = m1043.slice(i, i + 3);
    const famId = "fam_" + famSlice[0].id;
    famSlice.forEach((m, idx) => {
      items.push({
        id: m.id,
        name: m.name,
        rarity: m.rank,
        cat: "talent",
        family: famId,
        tier: idx + 1,
        icon: m.icon
      });
    });
  }
  // Corona de la Sabiduría
  if (mats["104319"]) {
    items.push({
      id: "104319",
      name: mats["104319"].name,
      rarity: 5,
      cat: "talent",
      family: null,
      tier: 1,
      icon: mats["104319"].icon
    });
  }

  // 7. Especialidades Locales (1000 & 1012)
  const mLocal = Object.values(mats).filter((m) => parseInt(m.id) >= 100000 && parseInt(m.id) < 104000);
  mLocal.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  mLocal.forEach((m) => {
    items.push({
      id: m.id,
      name: m.name,
      rarity: m.rank,
      cat: "local",
      family: null,
      tier: 1,
      icon: m.icon
    });
  });

  return items;
}

const REAL_INVENTORY_ITEMS = buildRealInventoryItems();
const ACTIVE_INVENTORY = REAL_INVENTORY_ITEMS;

const IS_ADMIN_VIEW = new URLSearchParams(window.location.search).get("admin") === "1";

const state = {
  lang: getSpiriflyStorage("lang", "es"),
  activeTab: (() => {
    try {
      const hash = (window.location.hash || "").replace("#", "").replace("sec-", "");
      const tab = hash || localStorage.getItem("spirifly_active_tab") || "planner";
      const valid = ["planner", "farming", "inventory", "wishes", "theory", "sync"];
      return valid.includes(tab) ? tab : "planner";
    } catch (e) {
      return "planner";
    }
  })(),
  invCategory: "all",
  invSearch: "",
  invOnlyNeeded: Boolean(parseSpiriflyStorage("inv_only_needed", false)),
  selectedDayGroup: getTodayDayGroup(),
  farmingDay: new Date().getDay(),
  farmingResinFilter: "all",
  farmingCharFilter: "all",
  farmingMatFilter: "all",
  starredChars: Array.isArray(parseSpiriflyStorage("starred", [])) ? parseSpiriflyStorage("starred", []) : [],
  selectedElement: "ALL",
  selectedRole: "ALL",
  searchQuery: "",
  showAds: true,
  autoResolveConflict: true,
  lastSyncTime: getSpiriflyStorage("last_sync", formatNow()),
  driveLinked: getSpiriflyStorage("drive_linked") === "true",
  userEmail: getSpiriflyStorage("drive_email", ""),
  wishData: parseSpiriflyStorage("wish_data", null) || JSON.parse(JSON.stringify(DEFAULT_WISH_DATA)),
  activeWishBanner: getSpiriflyStorage("active_wish_banner", "character"),
  wishTablePage: 1,
  wishTableRarityFilter: "ALL",
  wishTableSearch: "",
  activeWishUid: getSpiriflyStorage("active_wish_uid", "default"),
  rawWishes: [],
  topCurrency: parseSpiriflyStorage("top_currency", null) || getDefaultTopCurrency(),
  activePlans: (function() {
    const activeAcc = (typeof AccountManager !== "undefined") ? AccountManager.getActiveAccountId() : (localStorage.getItem("account") || "main");
    const raw = safeParseLocal(`${activeAcc}-goals`, null) || (activeAcc === "main" ? safeParseLocal("teyvat_active_plans_v4", null) : []);
    if (Array.isArray(raw)) {
      return raw;
    }
    return [];
  })(),
  realOwned: getInitialRealOwned(),
  tcCharKey: "Furina",
  tcTalentLevels: [9, 10, 10],
  // Filtros de la vista principal de Personajes
  mainCharFilter: {
    rarity: null,
    element: null,
    weapon: null,
    search: ""
  },
  // Filtros del Modal 1 (Catálogo de 113 Personajes en 5 columnas)
  rosterModalFilter: {
    rarity: null,
    element: null,
    weapon: null,
    hideAdded: false,
    search: ""
  },
  // Estado de edición temporal en el Modal 2 (Configuración del Personaje)
  cfgDraft: null,
  cfgActiveTab: "level",
  cfgOpenedFromRoster: false,

  // Filtros del Modal 1B (Catálogo de Armas Mejorables 4★ y 5★)
  weaponRosterFilter: {
    rarity: null,
    weapon: null,
    search: ""
  },
  // Estado de edición temporal en el Modal 2B (Configuración de Arma Independiente)
  soloWeapDraft: null,
  soloWeapOpenedFromRoster: false
};

function formatNow() {
  return new Date().toLocaleString("es-CL", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  });
}

function updateSyncDisplay() {
  if (typeof renderMultiAccountUI === "function") {
    renderMultiAccountUI();
    return;
  }
  const t = (typeof I18N !== "undefined" && (I18N[state.lang] || I18N.es)) || {};
  const ts = t.sync || {};
  const isLinked = Boolean(state.driveLinked && state.userEmail);

  const badgeBox = document.getElementById("gdriveAutoSyncStatus");
  const badgeLbl = document.getElementById("lblDriveStatusBadge");
  if (badgeLbl) {
    badgeLbl.textContent = isLinked
      ? (ts.statusSyncedBadge || "Drive: Sincronizado")
      : (ts.statusLocalBadge || "Drive: Desvinculado (Modo Local)");
  }
  if (badgeBox) {
    badgeBox.style.borderColor = isLinked ? "rgba(74, 222, 128, 0.35)" : "rgba(148, 163, 184, 0.35)";
    badgeBox.style.color = isLinked ? "#86efac" : "#cbd5e1";
    badgeBox.style.background = isLinked ? "rgba(34, 197, 94, 0.12)" : "rgba(148, 163, 184, 0.12)";
  }

  const emailEl = document.getElementById("lblCurrentDriveEmail");
  if (emailEl) {
    emailEl.textContent = isLinked
      ? state.userEmail
      : (ts.noAccountLinked || "Sin cuenta vinculada (Solo guardado local)");
    emailEl.style.color = isLinked ? "#ffffff" : "#94a3b8";
  }

  const stateEl = document.getElementById("lblDriveSyncStateText");
  if (stateEl) {
    if (isLinked) {
      stateEl.style.color = "#4ade80";
      stateEl.innerHTML = `<img src="assets/ui/check.svg" style="width:14px;height:14px;" alt="" /> ${escapeHtml(ts.stateSynced || "Sincronizado con Google Drive")}`;
    } else {
      stateEl.style.color = "#fbbf24";
      stateEl.innerHTML = `<img src="assets/ui/lock.svg" style="width:14px;height:14px;" alt="" /> ${escapeHtml(ts.stateUnlinked || "Desconectado de Google Drive (Guardado Local Activo)")}`;
    }
  }

  const s1 = document.getElementById("seelieSyncTimestamp");
  if (s1) {
    s1.textContent = `${ts.lastSyncPrefix || "Última sincronización:"} ${state.lastSyncTime}`;
  }

  const btnChange = document.getElementById("lblBtnChangeDrive");
  if (btnChange) {
    btnChange.textContent = isLinked
      ? (ts.btnSelectChange || "Seleccionar / Cambiar Cuenta")
      : (ts.btnConnectAccount || "Vincular Cuenta Google");
  }

  const btnUnlink = document.getElementById("btnUnlinkDrive");
  if (btnUnlink) {
    btnUnlink.style.display = isLinked ? "" : "none";
  }
  const btnSyncNow = document.getElementById("btnSyncDriveNow");
  if (btnSyncNow) {
    btnSyncNow.style.display = isLinked ? "" : "none";
  }
}

function triggerDriveSyncStamp() {
  setSpiriflyStorage("data_last_modified", new Date().toISOString());
  if (typeof GoogleDriveSyncEngine !== "undefined") GoogleDriveSyncEngine.scheduleSync();
}

function getDefaultTopCurrency() {
  const map = {};
  TOP_CURRENCY_ITEMS.forEach((item) => { map[item.id] = item.owned; });
  return map;
}

function getDefaultInventoryOwned() {
  const map = {};
  ACTIVE_INVENTORY.forEach((item) => { map[item.id] = item.owned; });
  return map;
}

function getTodayDayGroup() {
  const day = new Date().getDay();
  if (day === 0) return 0;
  if (day === 1 || day === 4) return 1;
  if (day === 2 || day === 5) return 2;
  return 3;
}

function getPityClass(pity) {
  if (pity <= 44) return "low";
  if (pity <= 73) return "mid";
  return "high";
}

function getRequiredMaterialsMap() {
  const totalReq = {};
  state.activePlans.forEach((plan) => {
    if (plan.active === false) return;
    const planReq = computePlanRequirements(plan);
    Object.entries(planReq).forEach(([matId, qty]) => {
      totalReq[matId] = (totalReq[matId] || 0) + qty;
    });
  });
  return totalReq;
}

function showSynthToast(msg) {
  const el = document.getElementById("synthFeedbackMsg");
  if (!el) return;
  el.innerHTML = msg;
  el.style.display = "block";
  clearTimeout(showSynthToast._timer);
  showSynthToast._timer = setTimeout(() => {
    el.style.display = "none";
  }, 4500);
}

/**
 * Calcula cuántos materiales de este ítem se pueden sintetizar 3:1
 * protegiendo estrictamente los materiales de menor rareza requeridos por tus personajes/armas.
 */
function getSafeCraftableCount(item, reqMap) {
  if (!item || !item.family || item.tier <= 1) return 0;
  const lowerItem = REAL_INVENTORY_ITEMS.find(
    (x) => x.family === item.family && x.tier === item.tier - 1
  );
  if (!lowerItem) return 0;

  const ownedLower = getRealOwned(lowerItem.id);
  const requiredLower = (reqMap && reqMap[lowerItem.id]) || 0;
  const safeSurplusLower = Math.max(0, ownedLower - requiredLower);

  return Math.floor(safeSurplusLower / 3);
}

function synthesizeSingleItem(targetItemId, maxSurplus = false) {
  const reqMap = getRequiredMaterialsMap();
  const targetItem = REAL_INVENTORY_ITEMS.find((x) => x.id === targetItemId);
  if (!targetItem || !targetItem.family || targetItem.tier <= 1) return;

  const lowerItem = REAL_INVENTORY_ITEMS.find(
    (x) => x.family === targetItem.family && x.tier === targetItem.tier - 1
  );
  if (!lowerItem) return;

  const safeCraftable = getSafeCraftableCount(targetItem, reqMap);
  if (safeCraftable <= 0) {
    showSynthToast(`<img src="assets/ui/sparkle.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> No tienes excedentes seguros de "${lowerItem.name}" para sintetizar.`);
    return;
  }

  const ownedTarget = getRealOwned(targetItem.id);
  const reqTarget = (reqMap && reqMap[targetItem.id]) || 0;
  const missingTarget = Math.max(0, reqTarget - ownedTarget);

  let amountToCraft = 1;
  if (maxSurplus) {
    amountToCraft = safeCraftable;
  } else if (missingTarget > 0) {
    amountToCraft = Math.min(safeCraftable, missingTarget);
  }
  amountToCraft = Math.max(1, Math.min(amountToCraft, safeCraftable));

  state.realOwned[lowerItem.id] = Math.max(0, getRealOwned(lowerItem.id) - (amountToCraft * 3));
  state.realOwned[targetItem.id] = ownedTarget + amountToCraft;

  saveRealOwned();
  triggerDriveSyncStamp();
  renderVisualInventory();
  renderCharacterWeaponPlanner();

  showSynthToast(`<img src="assets/ui/sparkle.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> <strong>Alquimia:</strong> Sintetizaste +${amountToCraft} de "${targetItem.name}" (usando ${amountToCraft * 3} de "${lowerItem.name}").`);
}

function synthesizeAllSafe() {
  let totalCrafted = 0;
  const reqMap = getRequiredMaterialsMap();

  for (let tierStep = 2; tierStep <= 5; tierStep++) {
    REAL_INVENTORY_ITEMS.filter((x) => x.tier === tierStep).forEach((item) => {
      const owned = getRealOwned(item.id);
      const needed = (reqMap && reqMap[item.id]) || 0;
      const missing = Math.max(0, needed - owned);
      const safeCraft = getSafeCraftableCount(item, reqMap);

      const higherItemsNeed = REAL_INVENTORY_ITEMS.some(
        (h) => h.family === item.family && h.tier > item.tier && ((reqMap && reqMap[h.id]) || 0) > getRealOwned(h.id)
      );

      if (safeCraft > 0 && (missing > 0 || higherItemsNeed)) {
        const lowerItem = REAL_INVENTORY_ITEMS.find((x) => x.family === item.family && x.tier === item.tier - 1);
        const qty = missing > 0 && !higherItemsNeed ? Math.min(safeCraft, missing) : safeCraft;
        if (qty > 0 && lowerItem) {
          state.realOwned[lowerItem.id] = Math.max(0, getRealOwned(lowerItem.id) - (qty * 3));
          state.realOwned[item.id] = owned + qty;
          totalCrafted += qty;
        }
      }
    });
  }

  saveRealOwned();
  triggerDriveSyncStamp();
  renderVisualInventory();
  renderCharacterWeaponPlanner();

  if (totalCrafted > 0) {
    showSynthToast(`<img src="assets/ui/check.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> <strong>¡Alquimia completada!</strong> Se sintetizaron ${totalCrafted} materiales de mayor nivel protegiendo todos los requerimientos de tus personajes.`);
  } else {
    showSynthToast(`<img src="assets/ui/sparkle.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> Todos tus materiales actuales están reservados para las metas de tus personajes o no hay excedentes 3:1 disponibles.`);
  }
}

/* =====================================================================
   INICIALIZACIÓN DE LA APLICACIÓN
   ===================================================================== */
function initApp() {
  const urlLang = new URLSearchParams(window.location.search).get("lang");
  if (urlLang && typeof I18N !== "undefined" && I18N[urlLang]) {
    state.lang = urlLang;
  }
  const langSelect = document.getElementById("langSelect");
  langSelect.value = state.lang;
  langSelect.addEventListener("change", (e) => {
    state.lang = e.target.value;
    setSpiriflyStorage("lang", state.lang);
    triggerDriveSyncStamp();
    document.documentElement.lang = state.lang;
    renderAll();
  });

  const tutorialLangSelect = document.getElementById("tutorialLangSelect");
  tutorialLangSelect.addEventListener("change", () => {
    langSelect.value = tutorialLangSelect.value;
    langSelect.dispatchEvent(new Event("change"));
  });

  // Sincronizar estado visual de navegación inicial sin parpadeos
  document.querySelectorAll(".nav-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === state.activeTab);
  });
  document.querySelectorAll(".tool-section").forEach((sec) => {
    sec.classList.toggle("active", sec.id === `sec-${state.activeTab}`);
  });
  document.documentElement.setAttribute("data-active-tab", state.activeTab);

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeTab = btn.dataset.tab;
      try {
        localStorage.setItem("spirifly_active_tab", state.activeTab);
      } catch (e) {}
      if (history.replaceState) {
        history.replaceState(null, null, `#${state.activeTab}`);
      }
      document.documentElement.setAttribute("data-active-tab", state.activeTab);
      document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".tool-section").forEach((sec) => {
        sec.classList.toggle("active", sec.id === `sec-${state.activeTab}`);
      });
      if (state.activeTab === "inventory") {
        renderVisualInventory();
      } else if (state.activeTab === "farming") {
        renderFarming();
      } else if (state.activeTab === "wishes") {
        renderWishesDashboard();
      } else if (state.activeTab === "theory") {
        renderTheorycraft();
      } else if (state.activeTab === "planner") {
        if (typeof renderCharacterWeaponPlanner === "function") {
          renderCharacterWeaponPlanner();
        }
      }
    });
  });

  const topPill = document.getElementById("topSyncPill");
  if (topPill) {
    topPill.addEventListener("click", () => {
      document.querySelector('[data-tab="sync"]').click();
    });
  }

  document.getElementById("adsToggleBtn").addEventListener("click", () => {
    state.showAds = !state.showAds;
    renderAdsState();
  });

  // Eventos de cuenta de Google Drive (Seleccionar/Cambiar cuenta, Sincronizar ahora, Quitar Drive)
  const btnOpenDriveForm = document.getElementById("btnOpenDriveAccountForm");
  const driveFormBox = document.getElementById("driveAccountFormBox");
  const inputDriveEmail = document.getElementById("inputDriveEmail");
  const btnSaveDriveEmail = document.getElementById("btnSaveDriveEmail");
  const btnCancelDriveEmail = document.getElementById("btnCancelDriveEmail");
  const btnSyncDriveNow = document.getElementById("btnSyncDriveNow");
  const btnUnlinkDrive = document.getElementById("btnUnlinkDrive");

  if (btnOpenDriveForm && driveFormBox) {
    btnOpenDriveForm.addEventListener("click", () => {
      const isHidden = driveFormBox.style.display === "none";
      driveFormBox.style.display = isHidden ? "block" : "none";
      if (isHidden && inputDriveEmail) {
        inputDriveEmail.value = state.driveLinked ? (state.userEmail || "") : "";
        inputDriveEmail.focus();
      }
    });
  }

  if (btnCancelDriveEmail && driveFormBox) {
    btnCancelDriveEmail.addEventListener("click", () => {
      driveFormBox.style.display = "none";
    });
  }

  if (btnSaveDriveEmail && inputDriveEmail && driveFormBox) {
    const saveEmailAction = () => {
      const val = inputDriveEmail.value.trim();
      if (!val || !val.includes("@")) {
        inputDriveEmail.focus();
        return;
      }
      setSpiriflyStorage("drive_email", val);
      driveFormBox.style.display = "none";
      connectGoogleDrive();
    };
    btnSaveDriveEmail.addEventListener("click", saveEmailAction);
    inputDriveEmail.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") saveEmailAction();
      if (ev.key === "Escape") driveFormBox.style.display = "none";
    });
  }

  // The Drive engine owns the sync button; clicking it is not a data edit.

  if (btnUnlinkDrive) {
    btnUnlinkDrive.addEventListener("click", () => {
      disconnectGoogleDrive();
      if (driveFormBox) driveFormBox.style.display = "none";
      updateSyncDisplay();
    });
  }

  // Buscador de Inventario
  document.getElementById("invSearchInput").addEventListener("input", (e) => {
    state.invSearch = e.target.value.trim().toLowerCase();
    renderInventoryMatrix();
  });

  // Botón Filtro Solo Necesarios
  const btnToggleNeeded = document.getElementById("btnToggleOnlyNeeded");
  if (btnToggleNeeded) {
    btnToggleNeeded.addEventListener("click", () => {
      state.invOnlyNeeded = !state.invOnlyNeeded;
      setSpiriflyStorage("inv_only_needed", JSON.stringify(state.invOnlyNeeded));
      triggerDriveSyncStamp();
      renderInventoryHeaderTabs();
      renderInventoryMatrix();
    });
  }

  document.getElementById("btnSmartSynthAll").addEventListener("click", synthesizeAllSafe);

  const helpBtn = document.getElementById("btnInvHelpModal");
  if (helpBtn) {
    helpBtn.addEventListener("click", () => {
      showSynthToast('<img src="assets/ui/sparkle.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> <strong>Atajos de Inventario:</strong> "Solo Necesarios" filtra los materiales requeridos por tus metas. Shift+Clic en [+] o [-] cambia de 10 en 10. Clic en el número para editar con teclado. El botón de Alquimia sintetiza 3:1 usando excedentes.');
    });
  }

  // Modal de Donaciones
  const donateModal = document.getElementById("seelieDonateModal");
  const openDonateModal = () => {
    if (donateModal) donateModal.classList.add("open");
  };
  const closeDonateModal = () => {
    if (donateModal) donateModal.classList.remove("open");
  };
  const btnOpenDonate = document.getElementById("btnOpenDonateModal");
  if (btnOpenDonate) btnOpenDonate.addEventListener("click", openDonateModal);
  const footerDonate = document.getElementById("footerDonateLink");
  if (footerDonate) {
    footerDonate.addEventListener("click", (e) => {
      e.preventDefault();
      openDonateModal();
    });
  }
  const btnCloseDonate = document.getElementById("btnCloseDonateModal");
  if (btnCloseDonate) btnCloseDonate.addEventListener("click", closeDonateModal);
  if (donateModal) {
    donateModal.addEventListener("click", (e) => {
      if (e.target === donateModal) closeDonateModal();
    });
  }

  // Controles de la Vista Principal de Personajes y Modales Seelie.me
  initSeelieCharacterSystem();

  // Controles del Simulador Completo de Theorycraft (si está presente en el DOM)
  const simSelect = document.getElementById("tcSimCharSelect");
  if (simSelect) {
    populateTheorycraftSimulatorSelect();
    simSelect.addEventListener("change", (e) => {
      state.tcCharKey = e.target.value;
      loadCharacterRecommendedStats(state.tcCharKey);
      calculateFullCharacterTheorycraft();
    });
    const btnLoad = document.getElementById("btnLoadPresetStats");
    if (btnLoad) {
      btnLoad.addEventListener("click", () => {
        loadCharacterRecommendedStats(state.tcCharKey);
        calculateFullCharacterTheorycraft();
      });
    }

    [
      "tcSimHp", "tcSimAtk", "tcSimDef", "tcSimEm",
      "tcSimCr", "tcSimCd", "tcSimEr", "tcSimDmgBonus",
      "tcSimEnemyLv", "tcSimEnemyRes", "tcSimReaction",
      "tcSimTal1", "tcSimTal2", "tcSimTal3", "tcSimCharLv"
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", calculateFullCharacterTheorycraft);
        el.addEventListener("change", calculateFullCharacterTheorycraft);
      }
    });
  }

  document.getElementById("tcSearch").addEventListener("input", (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    renderTheorycraft();
  });

  // Wish Counter events
  initWishCounterEvents();

  // Google Drive Sync toggle & AdSense Simulator
  document.getElementById("toggleConflictSwitch").addEventListener("click", () => {
    state.autoResolveConflict = !state.autoResolveConflict;
    document.getElementById("conflictSwitchPill").classList.toggle("off", !state.autoResolveConflict);
    triggerDriveSyncStamp();
  });

  ["simPageviews", "simMarket"].forEach((id) => {
    document.getElementById(id).addEventListener("input", calculateAdSenseSim);
  });

  // Profile Manager events
  initProfileManagerEvents();

  loadCharacterRecommendedStats(state.tcCharKey);
  renderAll();

  // Renderizado específico según la pestaña activa inicial
  if (state.activeTab === "inventory") {
    renderVisualInventory();
  } else if (state.activeTab === "farming") {
    renderFarming();
  } else if (state.activeTab === "wishes") {
    renderWishesDashboard();
  } else if (state.activeTab === "theory") {
    renderTheorycraft();
  }

  window.addEventListener("hashchange", () => {
    const hashTab = (window.location.hash || "").replace("#", "").replace("sec-", "");
    if (hashTab && hashTab !== state.activeTab && document.querySelector(`[data-tab="${hashTab}"]`)) {
      document.querySelector(`[data-tab="${hashTab}"]`).click();
    }
  });

  // Inicializar tutorial interactivo
  initInteractiveTutorial();
}

function setTextIfPresent(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}

function applyStaticTranslations(t) {
  translateInteractiveTutorial(state.lang);
  // 1. Navegación y Hero
  setTextIfPresent("navPlanner", t.nav.planner);
  setTextIfPresent("navFarming", t.nav.farming);
  setTextIfPresent("navInventory", t.nav.inventory);
  setTextIfPresent("navWishes", t.nav.wishes);
  setTextIfPresent("navTheory", t.nav.theory);
  setTextIfPresent("navSync", t.nav.sync);
  setTextIfPresent("heroTitle", t.heroTitle);
  if (t.donateBtn) setTextIfPresent("lblDonateBtn", t.donateBtn);

  // 2. Inventario
  if (t.inventory) {
    setTextIfPresent("invTitle", t.inventory.title);
    const invSearch = document.getElementById("invSearchInput");
    if (invSearch && t.inventory.searchPlaceholder) invSearch.placeholder = t.inventory.searchPlaceholder;
    const neededBtnSpan = document.querySelector("#btnToggleOnlyNeeded span:not(.seelie-filter-badge)");
    if (neededBtnSpan && t.inventory.onlyNeeded) neededBtnSpan.textContent = t.inventory.onlyNeeded;
  }

  // 3. Personajes y Armas (Planner)
  if (t.planner) {
    const plannerH2 = document.querySelector("#sec-planner .seelie-char-title-group h2");
    if (plannerH2) plannerH2.textContent = t.planner.title;
    setTextIfPresent("btnOpenRosterModal", t.planner.addCharBtn);
    setTextIfPresent("btnOpenWeaponRosterModal", t.planner.addWeapBtn);
    const filterLbl = document.querySelector("#mainCharFilterBar .seelie-filter-lbl");
    if (filterLbl) filterLbl.textContent = t.planner.filterLbl;
    const charSearch = document.getElementById("mainCharSearchInput");
    if (charSearch) charSearch.placeholder = t.planner.searchPlaceholder;
    setTextIfPresent("btnResetMainCharFilters", t.planner.clearBtn);
  }

  // 4. Farmeo
  if (t.farming) {
    const kpiTitles = document.querySelectorAll("#seelieResinCalcBox .seelie-kpi-title");
    if (kpiTitles[0]) kpiTitles[0].textContent = t.farming.immResinTitle;
    if (kpiTitles[1]) kpiTitles[1].textContent = t.farming.planDemandTitle;

    const dayFilterTitle = document.querySelector(".seelie-day-filter-title span");
    if (dayFilterTitle) dayFilterTitle.textContent = t.farming.filterByDayTitle;

    const dayPills = document.getElementById("seelieDayPills");
    if (dayPills && Array.isArray(t.farming.days)) {
      const todayIdx = new Date().getDay();
      const todayName = t.farming.days[todayIdx] || "";
      const curDayText = document.getElementById("seelieCurrentDayText");
      if (curDayText) {
        curDayText.innerHTML = `${escapeHtml(t.farming.todayIsPrefix)} <strong id="seelieTodayName">${escapeHtml(todayName)}</strong>`;
      }
      const btnToday = dayPills.querySelector('[data-day-filter="today"]');
      if (btnToday) {
        btnToday.innerHTML = `<span class="day-dot-active"></span> <img src="assets/ui/bolt.svg" class="seelie-inline-icon" alt="" /> ${escapeHtml(t.farming.todayBtnPrefix)} (<span id="btnTodayLabel">${escapeHtml(todayName)}</span>)`;
      }
      [1, 2, 3, 4, 5, 6].forEach((dIdx) => {
        const b = dayPills.querySelector(`[data-day-filter="${dIdx}"]`);
        if (b && t.farming.days[dIdx]) b.textContent = t.farming.days[dIdx];
      });
      const bSun = dayPills.querySelector('[data-day-filter="0"]');
      if (bSun) bSun.textContent = t.farming.sundayAll;
      const bAll = dayPills.querySelector('[data-day-filter="all"]');
      if (bAll) bAll.innerHTML = `<img src="assets/ui/globe.svg" class="seelie-inline-icon" alt="" /> ${escapeHtml(t.farming.viewAllDaysBtn)}`;
    }

    const costTabs = document.getElementById("seelieCostTabs");
    if (costTabs) {
      const tAll = costTabs.querySelector('[data-seelie-tab="all"]');
      if (tAll) tAll.textContent = t.farming.tabAll;
      const tZero = costTabs.querySelector('[data-seelie-tab="0"]');
      if (tZero) tZero.innerHTML = `<img src="assets/ui/resin.png" class="seelie-tab-resin-icon zero" alt="0" /> ${escapeHtml(t.farming.tabZero)}`;
    }
    setTextIfPresent("lblTabSchedule", t.farming.tabSchedule);
    setTextIfPresent("lblScheduleSub", t.farming.scheduleSub);
    setTextIfPresent("lblFilterResin", t.farming.filterResinLbl);
    const rFilters = document.getElementById("resinCostFilterButtons");
    if (rFilters) {
      const rfAll = rFilters.querySelector('[data-resin-filter="all"]');
      if (rfAll) rfAll.textContent = t.farming.costAll;
      const rf20 = rFilters.querySelector('[data-resin-filter="20"]');
      if (rf20) rf20.textContent = t.farming.cost20;
      const rf40 = rFilters.querySelector('[data-resin-filter="40"]');
      if (rf40) rf40.textContent = t.farming.cost40;
      const rf30 = rFilters.querySelector('[data-resin-filter="30"]');
      if (rf30) rf30.textContent = t.farming.cost30;
    }
  }

  // 5. Builds (Theorycraft)
  if (t.theory) {
    const thH2 = document.querySelector("#sec-theory .section-header h2");
    const thP = document.querySelector("#sec-theory .section-header p");
    if (thH2) thH2.textContent = t.theory.title;
    if (thP) thP.textContent = t.theory.subtitle;
    const tcSearch = document.getElementById("tcSearch");
    if (tcSearch) tcSearch.placeholder = t.theory.searchPlaceholder;
  }

  // 6. Contador de Deseos
  if (t.wishes) {
    setTextIfPresent("wishesMainTitle", t.wishes.title);
    setTextIfPresent("wishesMainSub", t.wishes.subtitle);
    setTextIfPresent("lblProfilePrefix", t.wishes.profilePrefix);
    setTextIfPresent("lblBtnImportWishes", t.wishes.importBtn);
    setTextIfPresent("lblBtnExportWishes", t.wishes.exportBtn);
    setTextIfPresent("lblBtnClearWishes", t.wishes.clearBtn);
    setTextIfPresent("lblTabImportPs", t.wishes.tabPs);
    setTextIfPresent("lblTabImportJson", t.wishes.tabJson);
    setTextIfPresent("lblTabImportManual", t.wishes.tabManual);
    const dzTitle = document.getElementById("lblDropzoneTitle");
    if (dzTitle) dzTitle.innerHTML = `<strong>${escapeHtml(t.wishes.dropzoneTitle)}</strong>`;
    setTextIfPresent("lblDropzoneSub", t.wishes.dropzoneSub);
    setTextIfPresent("btnBrowseJson", t.wishes.browseBtn);
    setTextIfPresent("lblCsvPaste", t.wishes.csvPasteLbl);

    const wbNav = document.getElementById("wishBannerNav");
    if (wbNav) {
      const bChar = wbNav.querySelector('[data-banner="character"] .wb-title');
      const bWeap = wbNav.querySelector('[data-banner="weapon"] .wb-title');
      const bStd = wbNav.querySelector('[data-banner="standard"] .wb-title');
      const bChr = wbNav.querySelector('[data-banner="chronicled"] .wb-title');
      if (bChar) bChar.textContent = t.wishes.bannerChar;
      if (bWeap) bWeap.textContent = t.wishes.bannerWeap;
      if (bStd) bStd.textContent = t.wishes.bannerStd;
      if (bChr) bChr.textContent = t.wishes.bannerChr;
    }

    const wSearch = document.getElementById("wishSearchInput");
    if (wSearch) wSearch.placeholder = t.wishes.searchNamePlaceholder;
    const wRar = document.getElementById("wishRarityFilter");
    if (wRar && wRar.options.length >= 4) {
      wRar.options[0].textContent = t.wishes.rarityAll;
      wRar.options[1].textContent = t.wishes.rarity5;
      wRar.options[2].textContent = t.wishes.rarity4;
      wRar.options[3].textContent = t.wishes.rarity3;
    }
    const ths = document.querySelectorAll(".wish-data-table thead th");
    if (ths.length >= 6) {
      ths[0].textContent = t.wishes.thPity;
      ths[1].textContent = t.wishes.thRarity;
      ths[2].textContent = t.wishes.thName;
      ths[3].textContent = t.wishes.thType;
      ths[4].textContent = t.wishes.thDate;
      ths[5].textContent = t.wishes.thMech;
    }
    setTextIfPresent("btnWishPagePrev", t.wishes.prevBtn);
    setTextIfPresent("btnWishPageNext", t.wishes.nextBtn);
  }

  // 7. Configuración (Google Drive & Perfiles)
  if (t.sync) {
    setTextIfPresent("syncMainTitle", t.sync.title);
    setTextIfPresent("syncMainSub", t.sync.subtitle);
    const syncDesc = document.getElementById("syncDriveDesc");
    if (syncDesc) syncDesc.innerHTML = t.sync.driveDesc;
    setTextIfPresent("lblDriveAccountHeader", t.sync.accountHeader);
    setTextIfPresent("lblSyncStatePrefix", t.sync.statePrefix);
    setTextIfPresent("lblBtnSyncNow", t.sync.btnSyncNow);
    setTextIfPresent("lblBtnUnlinkDrive", t.sync.btnUnlink);
    setTextIfPresent("lblDriveInputPrompt", t.sync.inputPrompt);
    setTextIfPresent("lblBtnConnectDrive", t.sync.btnSaveEmail);
    setTextIfPresent("lblBtnCancelDrive", t.sync.btnCancelEmail);
    setTextIfPresent("lblAutoResolveConflict", t.sync.autoResolve);
    const footerP = document.querySelector(".site-footer p");
    if (footerP) footerP.textContent = t.sync.footerDisclaimer;
  }

  // 8. Textos estáticos adicionales (Drawer de Deseos, Gestor Multi-UID, Rol en Builds y Footer)
  const EXTRA_UI_I18N = {
    es: {
      roleLbl: "Rol:",
      psBannerStrong: "Método Rápido y Seguro (Solo PC):",
      psBannerSub: "Sin contraseñas ni permisos de administrador. Abre Genshin Impact (F3 ➔ Historial) antes de ejecutar el comando.",
      psStep1: "1. Abre Windows PowerShell, copia y pega el siguiente comando:",
      psStep2: "2. Pulsa ENTRAR: el script descargará tus tiradas directamente desde HoYoverse y las copiará a tu portapapeles",
      psStep3: "3. Vuelve aquí y haz clic en el botón 'Pegar' (o pulsa Ctrl + V) abajo:",
      urlPlaceholder: "Haz clic en 'Pegar' o pega aquí tus deseos (Ctrl + V)...",
            btnPaste: "Pegar",
      btnImportNow: "Importar Deseos",
      btnClearTest: "Borrar Datos",
      btnPasteClip: "Pegar del Portapapeles",
      btnProcessCsv: "Procesar Texto Copiado",
      manBanner: "Banner",
      manName: "Nombre del 5★",
      manPity: "Pity (Tirada en que salió)",
      manCond: "Condición 50/50",
      manAddBtn: "Añadir al Historial",
      pmTitle: "Gestor de Perfiles de Cuenta (Multi-UID)",
      pmDesc: "Maneja diferentes cuentas de Genshin Impact (UIDs) como perfiles separados. Cada cuenta mantiene su historial de deseos, pity y planificación sin mezclarse.",
      pmActiveLbl: "Cuenta / UID Activo:",
      pmBtnSwitch: "Activar UID",
      pmBtnRename: "Asignar UID",
      pmBtnDelete: "Eliminar",
      pmNewTitle: "Registrar Nueva Cuenta por UID:",
      pmAutoSrv: "Servidor: Auto-detectado por 1er dígito",
      pmUidPlaceholder: "Ingresa el UID (ej: 700123456 o 605123456)",
      pmBtnCreate: "Registrar Cuenta (UID)",
      pmRegionNote: "* Los UIDs determinan automáticamente tu región: 6 = América, 7 = Europa, 8 = Asia, 9 = TW/HK/MO.",
      ftPrivacy: "Política de Privacidad",
      ftTerms: "Términos de Uso",
      ftCookies: "Política de Cookies",
      ftDonate: "☕ Donación",
      ftMap: "Mapa Oficial HoYoLAB"
    },
    en: {
      roleLbl: "Role:",
      psBannerStrong: "Fast & Safe Method (PC Only):",
      psBannerSub: "No passwords or admin rights needed. Open Genshin Impact (F3 ➔ History) before running the command.",
      psStep1: "1. Open Windows PowerShell, copy and paste the script below:",
      psStep2: "2. Press ENTER: the script will download your wishes directly from HoYoverse and copy them to your clipboard",
      psStep3: "3. Come back here and click 'Paste' (or press Ctrl + V) below:",
      urlPlaceholder: "Click 'Paste' or paste your wishes here (Ctrl + V)...",
            btnPaste: "Paste",
      btnImportNow: "Import Wishes",
      btnClearTest: "Clear Data",
      btnPasteClip: "Paste from Clipboard",
      btnProcessCsv: "Process Copied Text",
      manBanner: "Banner",
      manName: "5★ Name",
      manPity: "Pity (Pull number)",
      manCond: "50/50 Status",
      manAddBtn: "Add to History",
      pmTitle: "Account Profile Manager (Multi-UID)",
      pmDesc: "Manage multiple Genshin Impact accounts (UIDs) as separate profiles. Each account keeps its own wish history, pity, and planner data isolated.",
      pmActiveLbl: "Active Account / UID:",
      pmBtnSwitch: "Activate UID",
      pmBtnRename: "Assign UID",
      pmBtnDelete: "Delete",
      pmNewTitle: "Register New Account by UID:",
      pmAutoSrv: "Server: Auto-detected from 1st digit",
      pmUidPlaceholder: "Enter UID (e.g. 700123456 or 605123456)",
      pmBtnCreate: "Register Account (UID)",
      pmRegionNote: "* UIDs automatically determine your server region: 6 = America, 7 = Europe, 8 = Asia, 9 = TW/HK/MO.",
      ftPrivacy: "Privacy Policy",
      ftTerms: "Terms of Use",
      ftCookies: "Cookie Policy",
      ftDonate: "☕ Donate",
      ftMap: "Official HoYoLAB Map"
    },
    pt: {
      roleLbl: "Função:",
      psBannerStrong: "Método Rápido e Seguro (Apenas PC):",
      psBannerSub: "Sem senhas ou permissões de administrador. Abra o Genshin Impact (F3 ➔ Histórico) antes de executar o comando.",
      psStep1: "1. Abra o Windows PowerShell, copie e cole o comando abaixo:",
      psStep2: "2. Pressione ENTER: o script baixará suas orações diretamente da HoYoverse e as copiará para a área de transferência",
      psStep3: "3. Volte aqui e clique no botão 'Colar' (ou pressione Ctrl + V) abaixo:",
      urlPlaceholder: "Clique em 'Colar' ou cole suas orações aqui (Ctrl + V)...",
            btnPaste: "Colar",
      btnImportNow: "Importar Orações",
      btnClearTest: "Limpar Dados",
      btnPasteClip: "Colar da Área de Transferência",
      btnProcessCsv: "Processar Texto Copiado",
      manBanner: "Banner",
      manName: "Nome do 5★",
      manPity: "Pity (Tirada em que saiu)",
      manCond: "Condição 50/50",
      manAddBtn: "Adicionar ao Histórico",
      pmTitle: "Gerenciador de Perfis de Conta (Multi-UID)",
      pmDesc: "Gerencie diferentes contas de Genshin Impact (UIDs) como perfis separados. Cada conta mantém seu histórico de orações, pity e planejamento sem misturar.",
      pmActiveLbl: "Conta / UID Ativo:",
      pmBtnSwitch: "Ativar UID",
      pmBtnRename: "Atribuir UID",
      pmBtnDelete: "Excluir",
      pmNewTitle: "Registrar Nova Conta por UID:",
      pmAutoSrv: "Servidor: Auto-detectado pelo 1º dígito",
      pmUidPlaceholder: "Digite o UID (ex: 700123456 ou 605123456)",
      pmBtnCreate: "Registrar Conta (UID)",
      pmRegionNote: "* Os UIDs determinam automaticamente sua região: 6 = América, 7 = Europa, 8 = Ásia, 9 = TW/HK/MO.",
      ftPrivacy: "Política de Privacidade",
      ftTerms: "Termos de Uso",
      ftCookies: "Política de Cookies",
      ftDonate: "☕ Doação",
      ftMap: "Mapa Oficial HoYoLAB"
    },
    ja: {
      roleLbl: "ロール:",
      psBannerStrong: "高速＆安全なインポート (PC専用):",
      psBannerSub: "パスワードや管理者権限は不要です。コマンド実行前に原神を開き (F3 ➔ 履歴) を表示してください。",
      psStep1: "1. Windows PowerShellを開き、以下のスクリプトをコピー＆ペーストします:",
      psStep2: "2. Enterキーを押すと、スクリプトが祈願履歴を直接ダウンロードしてクリップボードにコピーします",
      psStep3: "3. ここに戻り、下の「貼り付け」ボタン（または Ctrl + V）をクリックします:",
      urlPlaceholder: "「貼り付け」をクリックするか、ここに祈願データを貼り付け (Ctrl + V)...",
            btnPaste: "貼り付け",
      btnImportNow: "祈願をインポート",
      btnClearTest: "データ消去",
      btnPasteClip: "クリップボードから貼り付け",
      btnProcessCsv: "テキストを処理",
      manBanner: "祈願バナー",
      manName: "★5 名前",
      manPity: "天井カウント (Pity)",
      manCond: "50/50 判定",
      manAddBtn: "履歴に追加",
      pmTitle: "アカウントプロファイル管理 (マルチUID)",
      pmDesc: "複数の原神アカウント (UID) を別々のプロファイルとして管理します。祈願履歴・天井・育成計画はアカウントごとに完全分離されます。",
      pmActiveLbl: "有効なアカウント / UID:",
      pmBtnSwitch: "UIDを切替",
      pmBtnRename: "UIDを設定",
      pmBtnDelete: "削除",
      pmNewTitle: "新しいUIDアカウントを登録:",
      pmAutoSrv: "サーバー: 先頭数字から自動判定",
      pmUidPlaceholder: "UIDを入力 (例: 800123456 または 605123456)",
      pmBtnCreate: "アカウント登録 (UID)",
      pmRegionNote: "* UIDの先頭数字でリージョンが自動判定されます: 6 = America, 7 = Europe, 8 = Asia, 9 = TW/HK/MO。",
      ftPrivacy: "プライバシーポリシー",
      ftTerms: "利用規約",
      ftCookies: "Cookieポリシー",
      ftDonate: "☕ 寄付",
      ftMap: "HoYoLAB公式テイワットマップ"
    },
    ko: {
      roleLbl: "역할:",
      psBannerStrong: "빠르고 안전한 가져오기 (PC 전용):",
      psBannerSub: "비밀번호나 관리자 권한이 필요 없습니다. 명령 실행 전에 원신을 열고 (F3 ➔ 내역)을 확인하세요.",
      psStep1: "1. Windows PowerShell을 열고 아래 스크립트를 복사하여 붙여넣으세요:",
      psStep2: "2. ENTER를 누르면 스크립트가 기원 기록을 직접 다운로드하여 클립보드에 복사합니다",
      psStep3: "3. 여기로 돌아와 아래의 '붙여넣기' 버튼(또는 Ctrl + V)을 클릭합니다:",
      urlPlaceholder: "'붙여넣기'를 클릭하거나 여기에 기원 데이터를 붙여넣기 (Ctrl + V)...",
            btnPaste: "붙여넣기",
      btnImportNow: "기원 가져오기",
      btnClearTest: "데이터 삭제",
      btnPasteClip: "클립보드에서 붙여넣기",
      btnProcessCsv: "복사한 텍스트 처리",
      manBanner: "기원 배너",
      manName: "5★ 이름",
      manPity: "천장 (획득한 뽑기 수)",
      manCond: "50/50 상태",
      manAddBtn: "내역에 추가",
      pmTitle: "계정 프로필 관리 (멀티 UID)",
      pmDesc: "여러 원신 계정(UID)을 개별 프로필로 관리합니다. 각 계정의 기원 내역, 천장 및 육성 계획은 섞이지 않고 안전하게 분리됩니다.",
      pmActiveLbl: "활성 계정 / UID:",
      pmBtnSwitch: "UID 활성화",
      pmBtnRename: "UID 지정",
      pmBtnDelete: "삭제",
      pmNewTitle: "새 UID 계정 등록:",
      pmAutoSrv: "서버: 첫 자리 숫자로 자동 감지",
      pmUidPlaceholder: "UID 입력 (예: 800123456 또는 605123456)",
      pmBtnCreate: "계정 등록 (UID)",
      pmRegionNote: "* UID 첫 숫자로 서버가 자동 결정됩니다: 6 = America, 7 = Europe, 8 = Asia, 9 = TW/HK/MO.",
      ftPrivacy: "개인정보 처리방침",
      ftTerms: "이용약관",
      ftCookies: "쿠키 정책",
      ftDonate: "☕ 후원하기",
      ftMap: "HoYoLAB 공식 티바트 월드맵"
    }
  };
  const ex = EXTRA_UI_I18N[state.lang] || EXTRA_UI_I18N.es;

  const roleBtnBox = document.getElementById("tcRoleButtons");
  if (roleBtnBox && roleBtnBox.previousElementSibling) {
    roleBtnBox.previousElementSibling.textContent = ex.roleLbl;
  }

  const psBanner = document.querySelector("#importPanelPs .stepper-banner-info");
  if (psBanner) {
    psBanner.innerHTML = `<strong style="color:var(--gold-bright);display:inline-flex;align-items:center;gap:4px;"><img src="assets/ui/sparkle.svg" class="seelie-inline-icon" alt="" /> ${escapeHtml(ex.psBannerStrong)}</strong> <span>${escapeHtml(ex.psBannerSub)}</span>`;
  }
  const stepBodies = document.querySelectorAll("#importPanelPs .wish-step-body > strong");
  if (stepBodies[0]) stepBodies[0].textContent = ex.psStep1;
  if (stepBodies[1]) stepBodies[1].textContent = ex.psStep2;
  if (stepBodies[2]) stepBodies[2].textContent = ex.psStep3;

  const urlInp = document.getElementById("wishUrlInput");
  if (urlInp) urlInp.placeholder = ex.urlPlaceholder;
  const setBtnLabelWithIcon = (id, label) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    const img = btn.querySelector("img");
    btn.innerHTML = (img ? img.outerHTML + " " : "") + escapeHtml(label);
  };
  setBtnLabelWithIcon("btnPasteClipboard", ex.btnPaste);
  setBtnLabelWithIcon("btnParseWishUrl", ex.btnImportNow);
  setBtnLabelWithIcon("btnDevClearWishes", ex.btnClearTest);
  setBtnLabelWithIcon("btnPasteTextClipboard", ex.btnPasteClip);
  setBtnLabelWithIcon("btnProcessCsvPaste", ex.btnProcessCsv);
  setBtnLabelWithIcon("btnAddManual5", ex.manAddBtn);

  const lblManBanner = document.querySelector('label[for="manualBanner"]');
  if (lblManBanner) lblManBanner.textContent = ex.manBanner;
  const lblManName = document.querySelector('label[for="manualCharName"]');
  if (lblManName) lblManName.textContent = ex.manName;
  const lblManPity = document.querySelector('label[for="manualCharPity"]');
  if (lblManPity) lblManPity.textContent = ex.manPity;
  const lblManCond = document.querySelector('label[for="manualWon5050"]');
  if (lblManCond) lblManCond.textContent = ex.manCond;

  const pmCard = document.getElementById("cardProfileManager");
  if (pmCard) {
    const h3 = pmCard.querySelector("h3");
    if (h3) h3.innerHTML = `<img src="assets/ui/user.svg" style="width:20px;height:20px;" alt="" /> ${escapeHtml(ex.pmTitle)}`;
    const descP = pmCard.querySelector("p");
    if (descP) descP.textContent = ex.pmDesc;
    const activeLbl = pmCard.querySelector('label[for="profileSelectDropdown"]');
    if (activeLbl) activeLbl.textContent = ex.pmActiveLbl;
    setBtnLabelWithIcon("btnSwitchProfile", ex.pmBtnSwitch);
    setBtnLabelWithIcon("btnRenameProfile", ex.pmBtnRename);
    setBtnLabelWithIcon("btnDeleteActiveProfile", ex.pmBtnDelete);
    setBtnLabelWithIcon("btnCreateNewProfile", ex.pmBtnCreate);
    const srvBadge = document.getElementById("newProfileServerBadge");
    if (srvBadge) {
      srvBadge.textContent = ex.pmAutoSrv;
      if (srvBadge.previousElementSibling) {
        srvBadge.previousElementSibling.innerHTML = `<img src="assets/ui/sparkle.svg" style="width:14px;height:14px;" alt="" /> ${escapeHtml(ex.pmNewTitle)}`;
      }
    }
    const uidInp = document.getElementById("newProfileUid");
    if (uidInp) uidInp.placeholder = ex.pmUidPlaceholder;
    const allPs = pmCard.querySelectorAll("p");
    if (allPs.length > 1) allPs[allPs.length - 1].textContent = ex.pmRegionNote;
  }

  const ftLinks = document.querySelectorAll(".site-footer .footer-links a");
  if (ftLinks.length >= 5) {
    ftLinks[0].textContent = ex.ftPrivacy;
    ftLinks[1].textContent = ex.ftTerms;
    ftLinks[2].textContent = ex.ftCookies;
    ftLinks[3].textContent = ex.ftDonate;
    ftLinks[4].textContent = ex.ftMap;
  }
}

function renderAll() {
  const t = I18N[state.lang] || I18N.es;
  document.title = t.siteTitle;

  applyStaticTranslations(t);

  const adsBtn = document.getElementById("adsToggleBtn");
  if (adsBtn) {
    adsBtn.style.display = IS_ADMIN_VIEW ? "" : "none";
  }
  const calcLayout = document.querySelector("#sec-sync .calc-layout");
  if (calcLayout) {
    calcLayout.style.display = IS_ADMIN_VIEW ? "" : "none";
  }

  updateSyncDisplay();
  renderVisualInventory();
  renderCharacterWeaponPlanner();
  Promise.resolve(renderWishesDashboard()).then(() => {
    renderProfileManager();
  });
  renderAdsState();
  renderTheorycraftFilters();
  renderTheorycraft();
  calculateFullCharacterTheorycraft();
  renderFarming();
  calculateAdSenseSim();
}

function renderAdsState() {
  const t = I18N[state.lang] || I18N.es;
  const btn = document.getElementById("adsToggleBtn");
  if (btn) {
    btn.textContent = `${t.adsToggle}: ${state.showAds ? "ON" : "OFF"}`;
    btn.classList.toggle("off", !state.showAds);
  }

  document.querySelectorAll(".ad-slot").forEach((slot) => {
    slot.classList.toggle("hidden", !state.showAds);
  });
}

/* =====================================================================
   RENDERIZADO DE INVENTARIO VISUAL (RÉPLICA EXACTA DE SEELIE.ME)
   ===================================================================== */
const INVENTORY_CATEGORIES = [
  { key: "all", label: "Todo", icon: '<img src="assets/ui/tab_all.png" class="seelie-tab-icon-img" alt="Todo" />' },
  { key: "common", label: "Común", icon: '<img src="assets/ui/tab_common.png" class="seelie-tab-icon-img" alt="Común" />' },
  { key: "elite", label: "Superior", icon: '<img src="assets/ui/tab_elite.png" class="seelie-tab-icon-img" alt="Superior" />' },
  { key: "domain", label: "Dominio", icon: '<img src="assets/ui/tab_domain.png" class="seelie-tab-icon-img" alt="Dominio" />' },
  { key: "boss", label: "Jefe", icon: '<img src="assets/ui/tab_boss.png" class="seelie-tab-icon-img" alt="Jefe" />' },
  { key: "weekly", label: "Semanal", icon: '<img src="assets/ui/tab_weekly.png" class="seelie-tab-icon-img" alt="Semanal" />' },
  { key: "gem", label: "Gema", icon: '<img src="assets/ui/tab_gem.png" class="seelie-tab-icon-img" alt="Gema" />' },
  { key: "talent", label: "Talento", icon: '<img src="assets/ui/tab_talent.png" class="seelie-tab-icon-img" alt="Talento" />' },
  { key: "local", label: "Flores y Locales", icon: '<img src="assets/ui/local_specialty.png" class="seelie-tab-icon-img" alt="Flores y Locales" />' }
];

function formatNumberDots(num) {
  return String(num == null ? 0 : num).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function wireInlineTopInput(contentBox, matId, formatDots) {
  contentBox.addEventListener("click", (e) => {
    if (e.target && e.target.closest(".seelie-top-target-pill")) return;
    if (contentBox.querySelector(".seelie-top-input")) return;
    const numDisplay = contentBox.querySelector(".seelie-top-num-display");
    const currentVal = getRealOwned(matId);
    const input = document.createElement("input");
    input.type = "number";
    input.className = "seelie-top-input";
    input.value = currentVal;
    input.min = "0";

    let closed = false;
    const saveAndClose = () => {
      if (closed) return;
      closed = true;
      const newVal = Math.max(0, parseInt(input.value || "0", 10) || 0);
      state.realOwned[matId] = newVal;
      saveRealOwned();
      triggerDriveSyncStamp();
      if (input.parentNode) input.remove();
      renderTopCurrencySection();
      renderCharacterWeaponPlanner();
      renderInventoryMatrix();
    };

    input.addEventListener("blur", saveAndClose);
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        input.blur();
      } else if (ev.key === "Escape") {
        closed = true;
        if (numDisplay) numDisplay.style.display = "";
        input.remove();
      }
    });

    if (numDisplay) numDisplay.style.display = "none";
    contentBox.insertBefore(input, numDisplay);
    input.focus();
    input.select();
  });
}

function getMaterialUsersMap() {
  const map = {};
  if (!state.activePlans) return map;
  state.activePlans.forEach((plan) => {
    if (plan.active === false) return;
    const reqs = computePlanRequirements(plan);
    Object.keys(reqs).forEach((matId) => {
      if (!map[matId]) map[matId] = [];
      const label = plan.kind === "weapon" ? `Arma: ${plan.key}` : plan.key;
      if (!map[matId].includes(label)) map[matId].push(label);
    });
  });
  return map;
}

function renderInventoryHeaderTabs() {
  const tabsWrap = document.getElementById("seelieInvTabs");
  if (!tabsWrap) return;
  tabsWrap.innerHTML = "";

  const reqMap = getRequiredMaterialsMap();
  const t = (typeof I18N !== "undefined" && (I18N[state.lang] || I18N.es)) || {};
  const catTrans = (t.inventory && t.inventory.cats) || {};

  INVENTORY_CATEGORIES.forEach((cat) => {
    const neededFamilies = new Set();
    REAL_INVENTORY_ITEMS.forEach((it) => {
      if (reqMap && (reqMap[it.id] || 0) > 0 && it.family) {
        neededFamilies.add(it.family);
      }
    });

    let pool = REAL_INVENTORY_ITEMS;
    if (state.invOnlyNeeded) {
      pool = pool.filter((i) => (reqMap && (reqMap[i.id] || 0) > 0) || (i.family && neededFamilies.has(i.family)));
    }
    const count = cat.key === "all"
      ? pool.length
      : pool.filter((i) => i.cat === cat.key).length;

    const translatedLabel = catTrans[cat.key] || cat.label;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `seelie-inv-tab ${state.invCategory === cat.key ? "active" : ""}`;
    btn.innerHTML = `<span>${cat.icon}</span> ${escapeHtml(translatedLabel)} <small style="opacity:0.65;font-size:0.75rem;">(${count})</small>`;
    btn.addEventListener("click", () => {
      state.invCategory = cat.key;
      renderInventoryHeaderTabs();
      renderInventoryMatrix();
    });
    tabsWrap.appendChild(btn);
  });
}

function buildTopCurrencySlot(matId, name, iconUrl, bgStyle, formatDots, reqMap, fallbackImg = null) {
  const owned = getRealOwned(matId);
  const required = (reqMap && reqMap[matId]) || 0;
  const missing = Math.max(0, required - owned);
  const hasTarget = required > 0;
  const targetOk = hasTarget && owned >= required;

  const slot = document.createElement("div");
  slot.className = `seelie-top-slot ${hasTarget ? "needed" : ""} ${targetOk ? "complete" : ""}`;
  slot.dataset.topMatId = matId;

  let tooltip = `${name}\nTienes: ${formatDots ? formatNumberDots(owned) : owned}`;
  if (hasTarget) {
    tooltip += `\nMeta requerida: ${formatDots ? formatNumberDots(required) : required}`;
    if (missing > 0) {
      tooltip += ` (Faltan: ${formatDots ? formatNumberDots(missing) : missing})`;
    } else {
      tooltip += " (Meta cubierta)";
    }
  } else {
    tooltip += "\nSin meta activa";
  }

  let targetHtml = "";
  if (hasTarget) {
    if (targetOk) {
      targetHtml = `<div class="seelie-top-target-pill target-ok" title="¡Meta cubierta!"><img src="assets/ui/check.svg" style="width:10px;height:10px;vertical-align:-1px;margin-right:2px;" alt="" /> ${formatDots ? formatNumberDots(required) : required}</div>`;
    } else {
      targetHtml = `<div class="seelie-top-target-pill has-target" title="Faltan ${formatDots ? formatNumberDots(missing) : missing}"><img src="assets/ui/sparkle.svg" style="width:10px;height:10px;vertical-align:-1px;margin-right:2px;" alt="" /> ${formatDots ? formatNumberDots(required) : required}</div>`;
    }
  } else {
    targetHtml = `<div class="seelie-top-target-pill no-target" title="Sin meta activa"><img src="assets/ui/check.svg" style="width:10px;height:10px;vertical-align:-1px;margin-right:2px;" alt="" /> 0</div>`;
  }

  const numId = matId === "202" ? "dispTopMora" : (matId === "113021" ? "dispTopSolvent" : (matId === "104003" ? "dispExpPurple" : (matId === "104002" ? "dispExpBlue" : (matId === "104001" ? "dispExpGreen" : (matId === "104013" ? "dispOrePurple" : (matId === "104012" ? "dispOreBlue" : "dispOreGray"))))));

  slot.title = tooltip;
  slot.innerHTML = `
    <div class="seelie-top-icon-box" style="${bgStyle}">
      <img src="${iconUrl}" alt="${escapeHtml(name)}" onerror="this.style.opacity='0.25';" />
    </div>
    <div class="seelie-top-content">
      <div class="seelie-top-num-display" id="${numId}" title="${escapeHtml(name)}: Haz clic para editar cantidad">${formatDots ? formatNumberDots(owned) : owned}</div>
      ${targetHtml}
    </div>
  `;

  if (fallbackImg) {
    const imgEl = slot.querySelector("img");
    if (imgEl) imgEl.onerror = () => { imgEl.src = fallbackImg; };
  }

  wireInlineTopInput(slot.querySelector(".seelie-top-content"), matId, formatDots);
  return slot;
}

function renderTopCurrencySection() {
  const container = document.getElementById("seelieTopResources");
  if (!container) return;
  container.innerHTML = "";

  const reqMap = getRequiredMaterialsMap();

  // Renglón 1: Mora y Solvente de sueños
  const row1 = document.createElement("div");
  row1.className = "seelie-top-row";
  const row1Strip = document.createElement("div");
  row1Strip.className = "seelie-top-card-strip";

  row1Strip.appendChild(buildTopCurrencySlot("202", "Mora", "assets/ui/mora.png", "background:#4a3b1a;", true, reqMap, "https://gi.yatta.moe/assets/UI/UI_ItemIcon_202.png"));
  row1Strip.appendChild(buildTopCurrencySlot("113021", "Solvente de sueños", "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113021.png", "background:#4d3b69;", false, reqMap, "https://enka.network/ui/UI_ItemIcon_113021.png"));
  row1.appendChild(row1Strip);
  container.appendChild(row1);

  // Renglón 2: Libros de EXP (Ingenio del Héroe, EXP Aventurero, Consejo Errante)
  const row2 = document.createElement("div");
  row2.className = "seelie-top-row";
  const expStrip = document.createElement("div");
  expStrip.className = "seelie-top-card-strip";

  expStrip.appendChild(buildTopCurrencySlot("104003", "Ingenio del Héroe", "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104003.png", "background:#4d3b69;", false, reqMap));
  expStrip.appendChild(buildTopCurrencySlot("104002", "EXP Aventurero", "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104002.png", "background:#294c71;", false, reqMap));
  expStrip.appendChild(buildTopCurrencySlot("104001", "Consejo Errante", "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104001.png", "background:#2b5046;", false, reqMap));
  row2.appendChild(expStrip);
  container.appendChild(row2);

  // Renglón 3: Minerales de Refinamiento (Mineral Místico, Mineral Fino, Mineral Normal)
  const row3 = document.createElement("div");
  row3.className = "seelie-top-row";
  const oreStrip = document.createElement("div");
  oreStrip.className = "seelie-top-card-strip";

  oreStrip.appendChild(buildTopCurrencySlot("104013", "Mineral Místico", "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104013.png", "background:#4d3b69;", false, reqMap));
  oreStrip.appendChild(buildTopCurrencySlot("104012", "Mineral Fino", "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104012.png", "background:#294c71;", false, reqMap));
  oreStrip.appendChild(buildTopCurrencySlot("104011", "Mineral Normal", "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104011.png", "background:#444c5c;", false, reqMap));
  row3.appendChild(oreStrip);
  container.appendChild(row3);
}

function createInventoryTile(item, reqMap, usersMap, catLabels) {
  const owned = getRealOwned(item.id);
  const required = (reqMap && reqMap[item.id]) || 0;
  const missing = Math.max(0, required - owned);
  const safeCraftable = getSafeCraftableCount(item, reqMap);
  const hasTarget = required > 0;
  const targetOk = hasTarget && owned >= required;
  const users = (usersMap && usersMap[item.id]) || [];

  const tile = document.createElement("div");
  tile.className = `seelie-card-tile ${hasTarget ? "needed" : ""} ${targetOk ? "complete" : ""}`;
  tile.dataset.matId = item.id;

  const tooltipLines = [
    `${item.name}`,
    `${item.rarity}★ • ${catLabels[item.cat] || item.cat}`,
    `Tienes: ${owned}`,
    required > 0 ? `Meta actual: ${required}${missing > 0 ? ` (Faltan: ${missing})` : " (Completo)"}` : "Sin requerimiento activo"
  ];
  if (users.length) {
    tooltipLines.push(`Usado por: ${users.join(", ")}`);
  }
  tile.title = tooltipLines.join("\n");

  const synthBtnHtml = safeCraftable > 0
    ? `<button type="button" class="seelie-card-synth-btn" data-synth-id="${item.id}" title="Alquimia: Sintetizar +${safeCraftable} seguro (Shift: todos)"><img src="assets/ui/sparkle.svg" style="width:10px;height:10px;vertical-align:-1px;margin-right:2px;" alt="" />+${safeCraftable}</button>`
    : "";

  let statusHtml = `<span class="seelie-card-status"><img src="assets/ui/check.svg" style="width:10px;height:10px;vertical-align:-1px;margin-right:2px;" alt="" /> 0</span>`;
  if (hasTarget) {
    if (targetOk) {
      statusHtml = `<span class="seelie-card-status target-ok" title="¡Meta cubierta!"><img src="assets/ui/check.svg" style="width:10px;height:10px;vertical-align:-1px;margin-right:2px;" alt="" /> ${required}</span>`;
    } else {
      statusHtml = `<span class="seelie-card-status has-target" title="Faltan ${missing}"><img src="assets/ui/sparkle.svg" style="width:10px;height:10px;vertical-align:-1px;margin-right:2px;" alt="" /> ${required}</span>`;
    }
  }

  tile.innerHTML = `
    <div class="seelie-card-head rar-${item.rarity}">
      ${synthBtnHtml}
      <img class="seelie-card-img" src="${item.icon}" alt="${escapeHtml(item.name)}" loading="lazy" onerror="this.style.opacity='0.25';" />
    </div>
    ${statusHtml}
    <div class="seelie-card-qty-row" data-qty-box="1" title="Haz clic para escribir la cantidad exacta">
      <span class="seelie-card-qty-num">${owned}</span>
    </div>
    <div class="seelie-card-stepper">
      <button type="button" class="seelie-stepper-btn" data-step="-1" title="Restar 1 (Shift: -10)">-</button>
      <div class="seelie-stepper-divider"></div>
      <button type="button" class="seelie-stepper-btn" data-step="1" title="Sumar 1 (Shift: +10)">+</button>
    </div>
  `;

  // Botón de síntesis rápida individual
  const synthBtn = tile.querySelector("[data-synth-id]");
  if (synthBtn) {
    synthBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      synthesizeSingleItem(item.id, e.shiftKey);
    });
  }

  // Botones stepper [-] y [+]
  tile.querySelectorAll(".seelie-stepper-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const delta = parseInt(btn.dataset.step, 10);
      const multiplier = e.shiftKey ? 10 : (e.ctrlKey ? 100 : 1);
      const cur = getRealOwned(item.id);
      const next = Math.max(0, cur + (delta * multiplier));
      state.realOwned[item.id] = next;
      saveRealOwned();
      tile.querySelector(".seelie-card-qty-num").textContent = next;

      const newOk = hasTarget && next >= required;
      tile.classList.toggle("complete", newOk);
      const statusEl = tile.querySelector(".seelie-card-status");
      if (hasTarget && statusEl) {
        if (newOk) {
          statusEl.className = "seelie-card-status target-ok";
          statusEl.innerHTML = `<img src="assets/ui/check.svg" style="width:10px;height:10px;vertical-align:-1px;margin-right:2px;" alt="" /> ${required}`;
        } else {
          statusEl.className = "seelie-card-status has-target";
          statusEl.innerHTML = `<img src="assets/ui/sparkle.svg" style="width:10px;height:10px;vertical-align:-1px;margin-right:2px;" alt="" /> ${required}`;
        }
      }
      renderCharacterWeaponPlanner();
    });
  });

  // Clic directo en el número de cantidad para editar inline
  const qtyRow = tile.querySelector("[data-qty-box]");
  qtyRow.addEventListener("click", () => {
    if (qtyRow.querySelector("input")) return;
    const currentVal = getRealOwned(item.id);
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.className = "seelie-card-qty-input";
    input.value = currentVal;

    const numSpan = qtyRow.querySelector(".seelie-card-qty-num");
    numSpan.style.display = "none";
    qtyRow.appendChild(input);
    input.focus();
    input.select();

    let closed = false;
    const finishEdit = () => {
      if (closed) return;
      closed = true;
      const parsed = Math.max(0, parseInt(input.value || "0", 10) || 0);
      state.realOwned[item.id] = parsed;
      saveRealOwned();
      numSpan.textContent = parsed;
      numSpan.style.display = "";
      input.remove();
      renderVisualInventory();
      renderCharacterWeaponPlanner();
    };

    input.addEventListener("blur", finishEdit);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        input.blur();
      } else if (e.key === "Escape") {
        closed = true;
        numSpan.style.display = "";
        input.remove();
      }
    });
  });

  return tile;
}

function updateOnlyNeededButton() {
  const btn = document.getElementById("btnToggleOnlyNeeded");
  const badge = document.getElementById("neededMatsBadge");
  if (!btn) return;

  const reqMap = getRequiredMaterialsMap();
  const neededFamilies = new Set();
  REAL_INVENTORY_ITEMS.forEach((i) => {
    if (reqMap && (reqMap[i.id] || 0) > 0) {
      if (i.family) neededFamilies.add(i.family);
    }
  });

  const totalNeededCount = REAL_INVENTORY_ITEMS.filter((i) => {
    const directNeeded = (reqMap && (reqMap[i.id] || 0) > 0);
    const familyNeeded = i.family && neededFamilies.has(i.family);
    return directNeeded || familyNeeded;
  }).length;

  if (badge) {
    badge.textContent = totalNeededCount;
  }

  btn.classList.toggle("active", Boolean(state.invOnlyNeeded));
  if (state.invOnlyNeeded) {
    btn.title = `Filtro ACTIVO: Mostrando solo ${totalNeededCount} materiales necesarios para los personajes y armas que estás subiendo. Haz clic para ver todo el inventario.`;
  } else {
    btn.title = `Ver solo materiales necesarios (${totalNeededCount} requeridos por tus metas activas de personajes y armas).`;
  }
}

function renderInventoryMatrix() {
  const container = document.getElementById("seelieMatrix");
  if (!container) return;
  container.innerHTML = "";

  updateOnlyNeededButton();

  const reqMap = getRequiredMaterialsMap();
  const usersMap = getMaterialUsersMap();

  const neededFamilies = new Set();
  REAL_INVENTORY_ITEMS.forEach((i) => {
    if (reqMap && (reqMap[i.id] || 0) > 0) {
      if (i.family) neededFamilies.add(i.family);
    }
  });

  const isItemNeeded = (item) => {
    const directNeeded = (reqMap && (reqMap[item.id] || 0) > 0);
    const familyNeeded = item.family && neededFamilies.has(item.family);
    return directNeeded || familyNeeded;
  };

  const totalNeededInAll = REAL_INVENTORY_ITEMS.filter((item) => isItemNeeded(item)).length;

  const filteredItems = REAL_INVENTORY_ITEMS.filter((item) => {
    const matchesCat = state.invCategory === "all" || item.cat === state.invCategory;
    const matchesSearch = !state.invSearch || item.name.toLowerCase().includes(state.invSearch);
    const matchesNeeded = !state.invOnlyNeeded || isItemNeeded(item);
    return matchesCat && matchesSearch && matchesNeeded;
  });

  const INV_EXTRA_I18N = {
    es: {
      showingPrefix: "Mostrando",
      showingSuffix: "materiales necesarios para los personajes y armas que estás subiendo",
      viewAllBtn: "Ver todo el inventario",
      emptyTitle: "No hay materiales necesarios en este momento",
      emptyDesc: "Actualmente no tienes personajes o armas con metas de mejora pendientes (o todos ya alcanzaron su nivel objetivo).",
      goPlannerBtn: "Ir a Personajes y Armas",
      noCatPrefix: "Sin materiales necesarios en",
      noCatDesc1: "Tus personajes y armas no necesitan materiales de esta categoría en este momento. Hay",
      noCatDesc2: "materiales necesarios en otras categorías.",
      viewAllCatsBtn: "Ver todas las categorías",
      noMatchFilter: "No se encontraron materiales con el filtro actual.",
      flowersTitle: "Flores y Especialidades Locales",
      flowersSub: "Flores, plantas y recolectables de mundo para ascensión de personajes (recolección en campo)."
    },
    en: {
      showingPrefix: "Showing",
      showingSuffix: "materials needed for the characters and weapons you are upgrading",
      viewAllBtn: "View full inventory",
      emptyTitle: "No materials needed right now",
      emptyDesc: "You currently have no characters or weapons with pending upgrade goals (or all have reached their target level).",
      goPlannerBtn: "Go to Characters & Weapons",
      noCatPrefix: "No needed materials in",
      noCatDesc1: "Your characters and weapons don't need materials from this category right now. There are",
      noCatDesc2: "needed materials in other categories.",
      viewAllCatsBtn: "View all categories",
      noMatchFilter: "No materials found matching the current filter.",
      flowersTitle: "Flowers & Local Specialties",
      flowersSub: "Flowers, plants, and open-world collectibles for character ascension (field gathering)."
    },
    pt: {
      showingPrefix: "Mostrando",
      showingSuffix: "materiais necessários para os personagens e armas que você está melhorando",
      viewAllBtn: "Ver todo o inventário",
      emptyTitle: "Nenhum material necessário no momento",
      emptyDesc: "Atualmente você não tem personagens ou armas com metas de melhoria pendentes (ou todos já atingiram o nível alvo).",
      goPlannerBtn: "Ir para Personagens e Armas",
      noCatPrefix: "Sem materiais necessários em",
      noCatDesc1: "Seus personagens e armas não precisam de materiais desta categoria agora. Há",
      noCatDesc2: "materiais necessários em outras categorias.",
      viewAllCatsBtn: "Ver todas as categorias",
      noMatchFilter: "Nenhum material encontrado com o filtro atual.",
      flowersTitle: "Flores e Especialidades Locais",
      flowersSub: "Flores, plantas e itens coletáveis do mundo para ascensão de personagens (coleta em campo)."
    },
    ja: {
      showingPrefix: "現在育成中のキャラ・武器に必要な素材を",
      showingSuffix: "件表示中",
      viewAllBtn: "全インベントリを表示",
      emptyTitle: "現在必要な素材はありません",
      emptyDesc: "育成目標が設定されたキャラクターや武器がないか、すべて目標レベルに到達しています。",
      goPlannerBtn: "キャラ＆武器へ移動",
      noCatPrefix: "このカテゴリに必要な素材はありません:",
      noCatDesc1: "現在このカテゴリの素材は必要ありません。他のカテゴリに",
      noCatDesc2: "件の必要素材があります。",
      viewAllCatsBtn: "全カテゴリを表示",
      noMatchFilter: "現在のフィルターに一致する素材が見つかりません。",
      flowersTitle: "特産品・地域の植物",
      flowersSub: "キャラクター突破用の特産品・植物・フィールド採集アイテム。"
    },
    ko: {
      showingPrefix: "현재 육성 중인 캐릭터 및 무기에 필요한 재료",
      showingSuffix: "개 표시 중",
      viewAllBtn: "전체 인벤토리 보기",
      emptyTitle: "현재 필요한 재료가 없습니다",
      emptyDesc: "육성 목표가 설정된 캐릭터나 무기가 없거나, 모두 목표 레벨에 도달했습니다.",
      goPlannerBtn: "캐릭터 & 무기로 이동",
      noCatPrefix: "필요한 재료 없음:",
      noCatDesc1: "현재 이 카테고리의 재료는 필요하지 않습니다. 다른 카테고리에",
      noCatDesc2: "개의 필요한 재료가 있습니다.",
      viewAllCatsBtn: "모든 카테고리 보기",
      noMatchFilter: "현재 필터와 일치하는 재료를 찾을 수 없습니다.",
      flowersTitle: "특산물 및 채집물",
      flowersSub: "캐릭터 돌파를 위한 월드 꽃, 식물 및 지역 특산물 (필드 채집)."
    }
  };
  const ie = INV_EXTRA_I18N[state.lang] || INV_EXTRA_I18N.es;
  const ti = (typeof I18N !== "undefined" && I18N[state.lang] && I18N[state.lang].inventory) || {};
  const catNames = ti.cats || {};

  if (state.invOnlyNeeded && totalNeededInAll > 0 && filteredItems.length > 0) {
    const banner = document.createElement("div");
    banner.className = "seelie-needed-filter-banner";
    banner.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <img src="assets/ui/sparkle.svg" class="seelie-inline-icon" alt="" />
        <span>${escapeHtml(ie.showingPrefix)} <strong>${filteredItems.length}</strong> ${escapeHtml(ie.showingSuffix)}</span>
      </div>
      <button type="button" class="seelie-banner-reset-btn" id="btnResetNeededFilter">
        ${escapeHtml(ie.viewAllBtn)}
      </button>
    `;
    const resetBtn = banner.querySelector("#btnResetNeededFilter");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state.invOnlyNeeded = false;
        setSpiriflyStorage("inv_only_needed", JSON.stringify(false));
        renderInventoryHeaderTabs();
        renderInventoryMatrix();
      });
    }
    container.appendChild(banner);
  }

  if (!filteredItems.length) {
    if (state.invOnlyNeeded && totalNeededInAll === 0) {
      container.innerHTML = `
        <div class="seelie-empty-needed-state">
          <img src="assets/ui/icon_primogem.png" style="width:48px;height:48px;margin:0 auto 0.5rem auto;display:block;" alt="" />
          <h3>${escapeHtml(ie.emptyTitle)}</h3>
          <p>${escapeHtml(ie.emptyDesc)}</p>
          <button type="button" class="seelie-btn-add" id="btnGoToPlannerFromInv" style="margin:0 auto; display:inline-flex; align-items:center; gap:0.4rem;">
            <img src="assets/ui/clipboard.svg" class="seelie-inline-icon" alt="" /> ${escapeHtml(ie.goPlannerBtn)}
          </button>
        </div>
      `;
      const goBtn = container.querySelector("#btnGoToPlannerFromInv");
      if (goBtn) {
        goBtn.addEventListener("click", () => {
          document.querySelector('[data-tab="planner"]').click();
        });
      }
      return;
    }

    if (state.invOnlyNeeded && totalNeededInAll > 0 && state.invCategory !== "all") {
      const catObj = INVENTORY_CATEGORIES.find((c) => c.key === state.invCategory);
      const catLabel = catNames[state.invCategory] || (catObj ? catObj.label : state.invCategory);
      container.innerHTML = `
        <div class="seelie-empty-needed-state">
          <img src="assets/ui/icon_primogem.png" style="width:48px;height:48px;margin:0 auto 0.5rem auto;display:block;" alt="" />
          <h3>${escapeHtml(ie.noCatPrefix)} "${escapeHtml(catLabel)}"</h3>
          <p>${escapeHtml(ie.noCatDesc1)} <strong>${totalNeededInAll}</strong> ${escapeHtml(ie.noCatDesc2)}</p>
          <button type="button" class="seelie-inv-tab active" id="btnShowAllNeededFromEmpty" style="margin:0 auto; padding:0.45rem 1rem; font-size:0.85rem;">
            ${escapeHtml(ie.viewAllCatsBtn)} (${totalNeededInAll})
          </button>
        </div>
      `;
      const allBtn = container.querySelector("#btnShowAllNeededFromEmpty");
      if (allBtn) {
        allBtn.addEventListener("click", () => {
          state.invCategory = "all";
          renderInventoryHeaderTabs();
          renderInventoryMatrix();
        });
      }
      return;
    }

    container.innerHTML = `<div style="text-align:center;color:#94a3b8;padding:2.5rem;">${escapeHtml(ie.noMatchFilter)}</div>`;
    return;
  }

  const catLabels = {
    common: catNames.common || "Común",
    elite: catNames.elite || "Superior",
    domain: catNames.domain || "Dominio",
    boss: catNames.boss || "Jefe",
    weekly: catNames.weekly || "Semanal",
    gem: catNames.gem || "Gema",
    talent: catNames.talent || "Talento",
    local: catNames.local || "Flor / Local"
  };

  const itemsMain = filteredItems.filter((item) => item.cat !== "local");
  const itemsLocal = filteredItems.filter((item) => item.cat === "local");

  // Cuadrícula 1: Materiales Principales (Enemigos, Dominio, Jefes, Gemas, Talentos)
  if (itemsMain.length > 0) {
    const mainGrid = document.createElement("div");
    mainGrid.className = "seelie-inv-matrix";
    itemsMain.forEach((item) => {
      mainGrid.appendChild(createInventoryTile(item, reqMap, usersMap, catLabels));
    });
    container.appendChild(mainGrid);
  }

  // Sección 2: Flores y Especialidades Locales (Apartado abajo, más separado)
  if (itemsLocal.length > 0) {
    const localSection = document.createElement("div");
    localSection.className = "seelie-flowers-section";

    const showHeader = state.invCategory === "all" || state.invCategory === "local" || itemsMain.length > 0;
    if (showHeader) {
      localSection.innerHTML = `
        <div class="seelie-flowers-header">
          <div class="seelie-flowers-title">
            <img src="assets/ui/local_specialty.png" class="seelie-flowers-title-icon" alt="" />
            <h3>${escapeHtml(ie.flowersTitle)}</h3>
            <span class="seelie-sec-count">${itemsLocal.length}</span>
          </div>
          <p class="seelie-flowers-sub">${escapeHtml(ie.flowersSub)}</p>
        </div>
        <div class="seelie-inv-matrix seelie-inv-matrix-flowers"></div>
      `;
    } else {
      localSection.innerHTML = `<div class="seelie-inv-matrix seelie-inv-matrix-flowers"></div>`;
    }

    const flowersGrid = localSection.querySelector(".seelie-inv-matrix-flowers");
    itemsLocal.forEach((item) => {
      flowersGrid.appendChild(createInventoryTile(item, reqMap, usersMap, catLabels));
    });

    container.appendChild(localSection);
  }
}

function renderVisualInventory() {
  renderInventoryHeaderTabs();
  renderTopCurrencySection();
  renderInventoryMatrix();
}

/* =====================================================================
   SISTEMA SEELIE.ME: MENÚ DE 113 PERSONAJES + MODAL CONFIGURACIÓN (FOTOS 1 Y 2)
   ===================================================================== */
function initSeelieCharacterSystem() {
  // Botón azul "+ Personaje" abre el Modal 1 (Catálogo de 113 personajes en 5 columnas)
  document.getElementById("btnOpenRosterModal").addEventListener("click", () => {
    openRosterModal();
  });

  // Botón violeta "+ Arma" abre el Modal 1B (Catálogo de armas mejorables de 4★ y 5★)
  const btnWeapRoster = document.getElementById("btnOpenWeaponRosterModal");
  if (btnWeapRoster) {
    btnWeapRoster.addEventListener("click", () => {
      openWeaponRosterModal();
    });
  }

  // Filtros de la barra principal "FILTRAR" en la vista de Personajes
  document.querySelectorAll("[data-main-rar]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const rar = parseInt(btn.dataset.mainRar, 10);
      state.mainCharFilter.rarity = state.mainCharFilter.rarity === rar ? null : rar;
      document.querySelectorAll("[data-main-rar]").forEach((b) =>
        b.classList.toggle("active", parseInt(b.dataset.mainRar, 10) === state.mainCharFilter.rarity)
      );
      renderCharacterWeaponPlanner();
    });
  });

  document.querySelectorAll("[data-main-el]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const el = btn.dataset.mainEl;
      state.mainCharFilter.element = state.mainCharFilter.element === el ? null : el;
      document.querySelectorAll("[data-main-el]").forEach((b) =>
        b.classList.toggle("active", b.dataset.mainEl === state.mainCharFilter.element)
      );
      renderCharacterWeaponPlanner();
    });
  });

  document.querySelectorAll("[data-main-wp]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wp = btn.dataset.mainWp;
      state.mainCharFilter.weapon = state.mainCharFilter.weapon === wp ? null : wp;
      document.querySelectorAll("[data-main-wp]").forEach((b) =>
        b.classList.toggle("active", b.dataset.mainWp === state.mainCharFilter.weapon)
      );
      renderCharacterWeaponPlanner();
    });
  });

  document.getElementById("mainCharSearchInput").addEventListener("input", (e) => {
    state.mainCharFilter.search = e.target.value.trim().toLowerCase();
    renderCharacterWeaponPlanner();
  });

  document.getElementById("btnResetMainCharFilters").addEventListener("click", () => {
    state.mainCharFilter = { rarity: null, element: null, weapon: null, search: "" };
    document.getElementById("mainCharSearchInput").value = "";
    document.querySelectorAll("#mainCharFilterBar .seelie-icon-filter").forEach((b) => b.classList.remove("active"));
    renderCharacterWeaponPlanner();
  });

  // Eventos del Modal 1: Catálogo de 113 Personajes en 5 Columnas
  document.getElementById("btnCloseRosterModal").addEventListener("click", closeRosterModal);
  document.getElementById("seelieRosterModal").addEventListener("click", (e) => {
    if (e.target.id === "seelieRosterModal") closeRosterModal();
  });

  document.querySelectorAll("[data-mod-el]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const el = btn.dataset.modEl;
      state.rosterModalFilter.element = state.rosterModalFilter.element === el ? null : el;
      document.querySelectorAll("[data-mod-el]").forEach((b) =>
        b.classList.toggle("active", b.dataset.modEl === state.rosterModalFilter.element)
      );
      renderRosterModalGrid();
    });
  });

  document.querySelectorAll("[data-mod-wp]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wp = btn.dataset.modWp;
      state.rosterModalFilter.weapon = state.rosterModalFilter.weapon === wp ? null : wp;
      document.querySelectorAll("[data-mod-wp]").forEach((b) =>
        b.classList.toggle("active", b.dataset.modWp === state.rosterModalFilter.weapon)
      );
      renderRosterModalGrid();
    });
  });

  document.querySelectorAll("[data-mod-rar]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const rar = parseInt(btn.dataset.modRar, 10);
      state.rosterModalFilter.rarity = state.rosterModalFilter.rarity === rar ? null : rar;
      document.querySelectorAll("[data-mod-rar]").forEach((b) =>
        b.classList.toggle("active", parseInt(b.dataset.modRar, 10) === state.rosterModalFilter.rarity)
      );
      renderRosterModalGrid();
    });
  });

  document.getElementById("btnToggleHideAddedChars").addEventListener("click", () => {
    state.rosterModalFilter.hideAdded = !state.rosterModalFilter.hideAdded;
    document.getElementById("btnToggleHideAddedChars").classList.toggle("active", state.rosterModalFilter.hideAdded);
    renderRosterModalGrid();
  });

  document.getElementById("rosterModalSearch").addEventListener("input", (e) => {
    state.rosterModalFilter.search = e.target.value.trim().toLowerCase();
    renderRosterModalGrid();
  });

  // Eventos del Modal 2: Configuración del Personaje (Foto 1)
  document.getElementById("btnCfgBackToRoster").addEventListener("click", () => {
    closeCharConfigModal(true);
    openRosterModal();
  });

  document.getElementById("btnCfgCloseModal").addEventListener("click", () => closeCharConfigModal(true));
  document.getElementById("seelieCharConfigModal").addEventListener("click", (e) => {
    if (e.target.id === "seelieCharConfigModal") closeCharConfigModal(true);
  });

  document.getElementById("btnCfgToggleActive").addEventListener("click", () => {
    if (!state.cfgDraft) return;
    state.cfgDraft.active = !state.cfgDraft.active;
    updateCharConfigModalUI();
  });

  document.getElementById("btnCfgDeleteChar").addEventListener("click", () => {
    if (!state.cfgDraft) return;
    const existingIdx = state.activePlans.findIndex(
      (p) => p.kind === "character" && p.key === state.cfgDraft.key
    );
    if (existingIdx !== -1) {
      state.activePlans.splice(existingIdx, 1);
      savePlansToStorage();
    }
    closeCharConfigModal(false);
  });

  document.getElementById("btnCfgToggleStar").addEventListener("click", () => {
    if (!state.cfgDraft) return;
    const k = state.cfgDraft.key;
    if (state.starredChars.includes(k)) {
      state.starredChars = state.starredChars.filter((x) => x !== k);
    } else {
      state.starredChars.push(k);
    }
    setSpiriflyStorage("starred", JSON.stringify(state.starredChars));
    triggerDriveSyncStamp();
    updateCharConfigModalUI();
  });

  // Cambio de las 3 pestañas internas del Modal 2: NIVEL | TALENTOS | ARMA
  document.querySelectorAll("[data-cfgtab]").forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      if (typeof closeAllLevelPopovers === "function") closeAllLevelPopovers();
      state.cfgActiveTab = tabBtn.dataset.cfgtab;
      document.querySelectorAll("[data-cfgtab]").forEach((b) =>
        b.classList.toggle("active", b.dataset.cfgtab === state.cfgActiveTab)
      );
      ["level", "talents", "weapon"].forEach((paneKey) => {
        const pane = document.getElementById(`cfgTabPane-${paneKey}`);
        if (pane) pane.style.display = paneKey === state.cfgActiveTab ? "block" : "none";
      });
    });
  });

  // Eventos del modal de configuracion (popover de 14 niveles, talentos, arma, guardar)
  initCfgModalExtras();

  // Eventos del Modal 1B: Catálogo de Armas Mejorables
  const closeWeapRosterBtn = document.getElementById("btnCloseWeaponRosterModal");
  if (closeWeapRosterBtn) closeWeapRosterBtn.addEventListener("click", closeWeaponRosterModal);
  const weapRosterModal = document.getElementById("seelieWeaponRosterModal");
  if (weapRosterModal) {
    weapRosterModal.addEventListener("click", (e) => {
      if (e.target.id === "seelieWeaponRosterModal") closeWeaponRosterModal();
    });
  }

  document.querySelectorAll("[data-weap-rar]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const rar = parseInt(btn.dataset.weapRar, 10);
      state.weaponRosterFilter.rarity = state.weaponRosterFilter.rarity === rar ? null : rar;
      document.querySelectorAll("[data-weap-rar]").forEach((b) =>
        b.classList.toggle("active", parseInt(b.dataset.weapRar, 10) === state.weaponRosterFilter.rarity)
      );
      renderWeaponRosterModalGrid();
    });
  });

  document.querySelectorAll("[data-weap-type]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.weapType;
      state.weaponRosterFilter.weapon = state.weaponRosterFilter.weapon === type ? null : type;
      document.querySelectorAll("[data-weap-type]").forEach((b) =>
        b.classList.toggle("active", b.dataset.weapType === state.weaponRosterFilter.weapon)
      );
      renderWeaponRosterModalGrid();
    });
  });

  const weapSearchInp = document.getElementById("weaponRosterModalSearch");
  if (weapSearchInp) {
    weapSearchInp.addEventListener("input", (e) => {
      state.weaponRosterFilter.search = e.target.value.trim().toLowerCase();
      renderWeaponRosterModalGrid();
    });
  }

  // Inicializar eventos de configuración de arma independiente (Modal 2B)
  if (typeof initSoloWeaponConfigEvents === "function") {
    initSoloWeaponConfigEvents();
  }
}

function savePlansToStorage() {
  const activeAcc = (typeof AccountManager !== "undefined") ? AccountManager.getActiveAccountId() : (localStorage.getItem("account") || "main");
  localStorage.setItem(`${activeAcc}-goals`, JSON.stringify(state.activePlans));
  if (activeAcc === "main") {
    setSpiriflyStorage("active_plans_v4", JSON.stringify(state.activePlans));
  }
  try { triggerDriveSyncStamp(); } catch (e) { console.error(e); }
  try { renderCharacterWeaponPlanner(); } catch (e) { console.error(e); }
  try { renderVisualInventory(); } catch (e) { console.error(e); }
  try { renderFarming(); } catch (e) { console.error(e); }
}

function openRosterModal() {
  if (typeof closeAllLevelPopovers === "function") closeAllLevelPopovers();
  document.getElementById("seelieRosterModal").classList.add("open");
  renderRosterModalGrid();
}

function closeRosterModal() {
  if (typeof closeAllLevelPopovers === "function") closeAllLevelPopovers();
  document.getElementById("seelieRosterModal").classList.remove("open");
}

/* =====================================================================
   SIMULADOR COMPLETO DE THEORYCRAFT (TODAS LAS ESTADÍSTICAS + TALENTOS 1-13)
   ===================================================================== */
function populateTheorycraftSimulatorSelect() {
  const sel = document.getElementById("tcSimCharSelect");
  if (!sel) return;

  if (typeof CHARACTER_BUILDS_DB !== "undefined") {
    CHARACTER_BUILDS_DB.forEach((build) => {
      const charKey = build.name.es;
      if (build.originalSource && CHARACTER_CATALOG[charKey]) {
        Object.assign(CHARACTER_CATALOG[charKey], {
          baseStats: build.baseStats, talentsData: build.talentsData,
          originalSource: build.originalSource
        });
      }
      if (!CHARACTER_CATALOG[charKey]) {
        CHARACTER_CATALOG[charKey] = {
          id: build.id,
          type: "character",
          element: build.element,
          rarity: build.rarity,
          icon: build.icon,
          scalingType: build.scalingType,
          scalingLabel: build.scalingLabel,
          baseStats: build.baseStats,
          recommendedPanel: build.recommendedPanel,
          talentsData: build.talentsData
        };
      }
    });
  }

  const sortedKeys = Object.keys(CHARACTER_CATALOG).sort((a, b) => a.localeCompare(b));
  sel.innerHTML = sortedKeys
    .map((k) => `<option value="${k}">${k} (${CHARACTER_CATALOG[k].element})</option>`)
    .join("");

  if (state.tcCharKey && CHARACTER_CATALOG[state.tcCharKey]) {
    sel.value = state.tcCharKey;
  }
}

function loadCharacterRecommendedStats(charKey) {
  if (!document.getElementById("tcSimHp")) return;
  const ch = CHARACTER_CATALOG[charKey];
  if (!ch || !ch.recommendedPanel) return;
  const p = ch.recommendedPanel;
  const panelNumber = (value, fallback) => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    const match = String(value ?? "").replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : fallback;
  };
  document.getElementById("tcSimHp").value = panelNumber(p.hp, 20000);
  document.getElementById("tcSimAtk").value = panelNumber(p.atk, 2000);
  document.getElementById("tcSimDef").value = panelNumber(p.def, 800);
  document.getElementById("tcSimEm").value = panelNumber(p.em, 80);
  document.getElementById("tcSimCr").value = panelNumber(p.cr, 70);
  document.getElementById("tcSimCd").value = panelNumber(p.cd, 160);
  document.getElementById("tcSimEr").value = panelNumber(p.er, 130);
  document.getElementById("tcSimDmgBonus").value = panelNumber(p.dmgBonus, 80);
}

function calculateFullCharacterTheorycraft() {
  if (!document.getElementById("tcSimTalentsTableBody")) return;
  const ch = CHARACTER_CATALOG[state.tcCharKey];
  if (!ch) return;

  const charLv = parseInt(document.getElementById("tcSimCharLv")?.value || "90", 10);
  if (!ch.baseStats || !ch.talentsData || charLv > 90) {
    const message = charLv > 90
      ? "Cálculo no disponible: faltan estadísticas y multiplicadores verificados para este nivel."
      : "Cálculo no disponible: faltan estadísticas y talentos específicos de este personaje.";
    document.getElementById("tcSimTalentsTableBody").innerHTML = `<tr><td colspan="5">${escapeHtml(message)}</td></tr>`;
    document.getElementById("tcSimBaseInfo").textContent = message;
    const title = document.getElementById("tcStellaTitle");
    const desc = document.getElementById("tcStellaDesc");
    const badge = document.getElementById("tcStellaDefBonus");
    if (title) title.textContent = "Datos pendientes de verificación";
    if (desc) desc.textContent = message;
    if (badge) badge.textContent = "—";
    document.getElementById("valCvScore").textContent = "—";
    return;
  }
  const hp = parseFloat(document.getElementById("tcSimHp").value || "20000");
  const atk = parseFloat(document.getElementById("tcSimAtk").value || "2000");
  const def = parseFloat(document.getElementById("tcSimDef").value || "850");
  const em = parseFloat(document.getElementById("tcSimEm").value || "100");
  const cr = parseFloat(document.getElementById("tcSimCr").value || "75");
  const cd = parseFloat(document.getElementById("tcSimCd").value || "180");
  const er = parseFloat(document.getElementById("tcSimEr").value || "130");
  const dmgBonus = parseFloat(document.getElementById("tcSimDmgBonus").value || "90");
  const enemyLv = parseFloat(document.getElementById("tcSimEnemyLv").value || "90");
  const enemyRes = parseFloat(document.getElementById("tcSimEnemyRes").value || "-26");
  const reactionMode = document.getElementById("tcSimReaction").value;

  const lvT1 = parseInt(document.getElementById("tcSimTal1").value || "9", 10);
  const lvT2 = parseInt(document.getElementById("tcSimTal2").value || "10", 10);
  const lvT3 = parseInt(document.getElementById("tcSimTal3").value || "10", 10);

  // Factor de escala de estadísticas base por Nivel (90 vs 95 vs 100)
  const statFactor = charLv === 100 ? 1.075 : (charLv === 95 ? 1.035 : 1.0);
  const hp90 = ch.baseStats?.hp90 ?? 12000;
  const atk90 = ch.baseStats?.atk90 ?? 250;
  const def90 = ch.baseStats?.def90 ?? 750;
  const curBaseHp = Math.round(hp90 * statFactor);
  const curBaseAtk = Math.round(atk90 * statFactor);
  const curBaseDef = Math.round(def90 * statFactor);

  const ascVal = ch.baseStats?.ascVal ?? "19.2%";
  const ascStat = ch.baseStats?.ascStat ?? "Crítico";
  const scalingLbl = ch.scalingLabel || "Escalado balanceado";

  const stellaBadge = charLv === 100 ? "Nivel 100 (3 Estelas)" : (charLv === 95 ? "Nivel 95 (1 Estela)" : "Nivel 90 (Fase 6)");

  document.getElementById("tcSimBaseInfo").innerHTML = `
    <img src="${ch.icon}" alt="${state.tcCharKey}" style="width:42px;height:42px;border-radius:10px;background:var(--rar-5);" onerror="this.style.display='none'" />
    <div>
      <strong style="color:var(--gold-bright);font-size:1rem;">${state.tcCharKey} — ${stellaBadge}</strong>
      <div style="font-size:0.76rem;color:var(--text-muted);">
        Base HP: <strong>${curBaseHp.toLocaleString()}</strong> ${charLv > 90 ? `<span style="color:#86efac;">(+${((statFactor-1)*100).toFixed(1)}%)</span>` : ""} • 
        Base ATQ: <strong>${curBaseAtk}</strong> • 
        Base DEF: <strong>${curBaseDef}</strong> • 
        Ascensión: <strong>+${ascVal} ${ascStat}</strong>
      </div>
      <div style="font-size:0.75rem;color:#7dd3fc;display:flex;align-items:center;gap:0.3rem;"><img src="assets/ui/sparkle.svg" style="width:11px;height:11px;" alt="" /> ${scalingLbl}</div>
    </div>
  `;

  // Multiplicador de Defensa del Enemigo (CharLv vs EnemyLv)
  // Fórmula oficial: (CharLv + 100) / ( (CharLv + 100) + (EnemyLv + 100) )
  const defMult = (charLv + 100) / ((charLv + 100) + (enemyLv + 100));
  const defMult90 = (90 + 100) / ((90 + 100) + (enemyLv + 100));
  const defGainPct = (((defMult / defMult90) - 1) * 100).toFixed(2);

  // Multiplicador de Resistencia del Enemigo (Fórmula oficial HoYoverse)
  const resDecimal = enemyRes / 100;
  let resMult = 1 - resDecimal;
  if (resDecimal < 0) resMult = 1 - resDecimal / 2;
  else if (resDecimal >= 0.75) resMult = 1 / (4 * resDecimal + 1);

  const clampedCr = Math.min(100, Math.max(0, cr)) / 100;
  const critHitMult = 1 + cd / 100;
  const avgCritMult = 1 + clampedCr * (cd / 100);
  const dmgBonusMult = 1 + dmgBonus / 100;

  // Actualización del Banner Dinámico de Estelas Sin Nombre
  const bannerTitle = document.getElementById("tcStellaTitle");
  const bannerDesc = document.getElementById("tcStellaDesc");
  const bannerDefBonus = document.getElementById("tcStellaDefBonus");
  if (bannerTitle && bannerDesc && bannerDefBonus) {
    if (charLv === 90) {
      bannerTitle.textContent = "Fase de Ascensión: Nivel 90 Estándar";
      bannerDesc.textContent = `Requiere 0 Estelas sin nombre. Mitigación DEF enemigo: ${(defMult * 100).toFixed(2)}% (vs enemigo Nv. ${enemyLv}). Daño base de reacción: 1446.85.`;
      bannerDefBonus.textContent = "+0.00% (Base Nv. 90)";
      bannerDefBonus.style.color = "var(--text-muted)";
    } else if (charLv === 95) {
      bannerTitle.innerHTML = `<img src="assets/ui/sparkle.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> Ascensión Especial: Nivel 95 (1 Estela sin nombre)`;
      bannerDesc.textContent = `Consumida 1 Estela sin nombre (obtenida por duplicado C7+ en gachapón). +3.5% Stats base. Mitigación DEF: ${(defMult * 100).toFixed(2)}%. Reacción base: 1563.2 (+8.0%).`;
      bannerDefBonus.textContent = `+${defGainPct}% Daño Neto DEF`;
      bannerDefBonus.style.color = "#86efac";
    } else {
      bannerTitle.innerHTML = `<img src="assets/ui/sparkle.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:2px;" alt="" /><img src="assets/ui/sparkle.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> Ascensión Suprema: Nivel 100 (3 Estelas sin nombre en total)`;
      bannerDesc.textContent = `Consumidas 3 Estelas sin nombre en total (duplicados C7+). +7.5% Stats base. Mitigación DEF: ${(defMult * 100).toFixed(2)}%. Reacción base: 1680.5 (+16.1%).`;
      bannerDefBonus.textContent = `+${defGainPct}% Daño Neto DEF`;
      bannerDefBonus.style.color = "#86efac";
    }
  }

  // Multiplicador de Reacción Amplificadora o Catalítica (Base de nivel escala a Nv. 95/100)
  const reactionBaseLv = charLv === 100 ? 1680.5 : (charLv === 95 ? 1563.2 : 1446.85);
  const emAmpBonus = (2.78 * em) / (em + 1400);
  const emCatBonus = (5 * em) / (em + 1200);
  let ampMult = 1.0;
  let flatAggravate = 0;

  if (reactionMode === "vape15") ampMult = 1.5 * (1 + emAmpBonus);
  else if (reactionMode === "melt20") ampMult = 2.0 * (1 + emAmpBonus);
  else if (reactionMode === "aggravate") flatAggravate = reactionBaseLv * 1.15 * (1 + emCatBonus);
  else if (reactionMode === "spread") flatAggravate = reactionBaseLv * 1.25 * (1 + emCatBonus);

  // Si el personaje está en Nv. 95 o Nv. 100, el pool de estadísticas total del panel recibe el incremento proporcional de base stat
  const effectiveHp = hp + (curBaseHp - hp90) * 1.85;
  const effectiveAtk = atk + (curBaseAtk - atk90) * 2.15;
  const effectiveDef = def + (curBaseDef - def90) * 1.85;

  const defaultTalents = {
    normal: { name: "Ataque Normal", scaleStat: "ATK", unit: "% ATQ", mvByLevel: [50, 54, 58, 63, 67, 72, 78, 84, 90, 97, 104, 111, 118] },
    skill: { name: "Habilidad Elemental", scaleStat: "ATK", unit: "% ATQ", mvByLevel: [120, 130, 140, 150, 160, 175, 190, 205, 220, 240, 260, 280, 300] },
    burst: { name: "Definitiva", scaleStat: "ATK", unit: "% ATQ", mvByLevel: [300, 325, 350, 380, 410, 440, 480, 520, 560, 610, 660, 710, 770] }
  };
  const tData = ch.talentsData || defaultTalents;

  const talentsList = [
    { key: "normal", lv: lvT1, data: tData.normal || defaultTalents.normal, badge: "Talento 1 (Normal/Cargado)" },
    { key: "skill", lv: lvT2, data: tData.skill || defaultTalents.skill, badge: "Talento 2 (Elemental E)" },
    { key: "burst", lv: lvT3, data: tData.burst || defaultTalents.burst, badge: "Talento 3 (Definitiva Q)" }
  ];

  const rowsHtml = talentsList
    .map((tObj) => {
      if (tObj.data.native) {
        const {labels, parameters} = tObj.data.native;
        return labels.map((label, index) => {
          const [name, template = ""] = label.split("|");
          const formatted = template.replace(/\{(param\d+):([^}]+)\}/g, (token, key, format) => {
            const value = parameters[key]?.[tObj.lv - 1];
            if (!Number.isFinite(value)) return "—";
            const percent = format.includes("P");
            const number = percent ? value * 100 : value;
            return `${Number(number.toFixed(2)).toLocaleString(state.lang || 'es')}${percent ? "%" : ""}`;
          }).replace(/<[^>]*>/g, "");
          return `<tr><td><strong>${escapeHtml(tObj.data.name)}</strong><div>${escapeHtml(name)} · Nv. ${tObj.lv}</div></td><td>${escapeHtml(formatted)}</td><td colspan="3" title="Parámetro del talento; el daño final requiere su fórmula específica">${index === 0 ? "Parámetros del talento original" : "—"}</td></tr>`;
        }).join("");
      }
      if (!["ATK", "HP", "DEF"].includes(tObj.data.scaleStat) || /\+|curaci|healing|escudo|shield/i.test(`${tObj.data.unit} ${tObj.data.name}`)) {
        return `<tr><td>${escapeHtml(tObj.data.name)}</td><td colspan="4">Fórmula especial pendiente de verificación.</td></tr>`;
      }
      const mvPct = tObj.data.mvByLevel[tObj.lv - 1] || tObj.data.mvByLevel[9];
      let statPool = effectiveAtk;
      if (tObj.data.scaleStat === "HP") statPool = effectiveHp;
      else if (tObj.data.scaleStat === "DEF") statPool = effectiveDef;

      const rawBaseDmg = statPool * (mvPct / 100) + flatAggravate;
      const nonCrit = Math.round(rawBaseDmg * dmgBonusMult * defMult * resMult * ampMult);
      const avgDmg = Math.round(nonCrit * avgCritMult);
      const critDmg = Math.round(nonCrit * critHitMult);

      return `
        <tr>
          <td>
            <strong style="color:var(--gold-bright);">${tObj.data.name}</strong>
            <div style="font-size:0.72rem;color:var(--text-muted);">${tObj.badge} • Nivel ${tObj.lv}</div>
          </td>
          <td style="color:#7dd3fc;font-weight:800;">${mvPct.toFixed(1)}${tObj.data.unit}</td>
          <td style="color:var(--text-muted);">${nonCrit.toLocaleString()}</td>
          <td style="color:#fde047;font-size:0.95rem;">${avgDmg.toLocaleString()}</td>
          <td style="color:#4ade80;font-size:1rem;font-weight:900;"><img src="assets/ui/sparkle.svg" style="width:12px;height:12px;vertical-align:-1px;margin-right:4px;" alt="" />${critDmg.toLocaleString()}</td>
        </tr>
      `;
    })
    .join("");

  document.getElementById("tcSimTalentsTableBody").innerHTML = rowsHtml;
  const cv = (cr * 2 + cd).toFixed(1);
  document.getElementById("valCvScore").textContent = `${cv} CV (ER: ${er}%)`;
}

/* =====================================================================
   TARJETAS ENCICLOPÉDICAS DE THEORYCRAFTING
   ===================================================================== */
function renderTheorycraftFilters() {
  const TC_FILTER_I18N = {
    es: { allEl: "Todos los Elementos", allRole: "Todos los Roles", main: "Main DPS", sub: "Sub-DPS Off-Field", sup: "Soporte / Buffer", heal: "Healer / Escudo" },
    en: { allEl: "All Elements", allRole: "All Roles", main: "Main DPS", sub: "Off-Field Sub-DPS", sup: "Support / Buffer", heal: "Healer / Shielder" },
    pt: { allEl: "Todos os Elementos", allRole: "Todas as Funções", main: "DPS Principal", sub: "Sub-DPS Off-Field", sup: "Suporte / Buffer", heal: "Healer / Escudo" },
    ja: { allEl: "全元素", allRole: "全ロール", main: "メインアタッカー", sub: "サブアタッカー", sup: "サポーター / バッファー", heal: "ヒーラー / シールダー" },
    ko: { allEl: "모든 원소", allRole: "모든 역할", main: "메인 딜러", sub: "서브 딜러 (오프필드)", sup: "서포터 / 버퍼", heal: "힐러 / 보호막" }
  };
  const tf = TC_FILTER_I18N[state.lang] || TC_FILTER_I18N.es;

  const elements = [
    { key: "ALL", label: tf.allEl, icon: null },
    { key: "Pyro", label: "Pyro", icon: "assets/elements/pyro.png" },
    { key: "Hydro", label: "Hydro", icon: "assets/elements/hydro.png" },
    { key: "Cryo", label: "Cryo", icon: "assets/elements/cryo.png" },
    { key: "Electro", label: "Electro", icon: "assets/elements/electro.png" },
    { key: "Anemo", label: "Anemo", icon: "assets/elements/anemo.png" },
    { key: "Dendro", label: "Dendro", icon: "assets/elements/dendro.png" },
    { key: "Geo", label: "Geo", icon: "assets/elements/geo.png" }
  ];
  const elContainer = document.getElementById("tcElementButtons");
  if (elContainer) {
    elContainer.innerHTML = "";
    elements.forEach((el) => {
      const btn = document.createElement("button");
      btn.className = `chip-btn tc-el-filter-btn ${state.selectedElement === el.key ? "active" : ""}`;
      if (el.icon) {
        btn.innerHTML = `<img src="${el.icon}" alt="${el.label}" class="tc-el-filter-icon" /><span>${el.label}</span>`;
      } else {
        btn.innerHTML = `<span>${el.label}</span>`;
      }
      btn.addEventListener("click", () => {
        state.selectedElement = el.key;
        renderTheorycraftFilters();
        renderTheorycraft();
      });
      elContainer.appendChild(btn);
    });
  }

  const roles = [
    { key: "ALL", label: tf.allRole },
    { key: "main_dps", label: tf.main },
    { key: "sub_dps", label: tf.sub },
    { key: "support", label: tf.sup },
    { key: "healer_shielder", label: tf.heal }
  ];
  const roleContainer = document.getElementById("tcRoleButtons");
  if (roleContainer) {
    roleContainer.innerHTML = "";
    roles.forEach((r) => {
      const btn = document.createElement("button");
      btn.className = `chip-btn ${state.selectedRole === r.key ? "active" : ""}`;
      btn.textContent = r.label;
      btn.addEventListener("click", () => {
        state.selectedRole = r.key;
        renderTheorycraftFilters();
        renderTheorycraft();
      });
      roleContainer.appendChild(btn);
    });
  }
}

// =====================================================================
// DICCIONARIOS Y HELPERS DE ICONOS VISUALES PARA BUILDS (ARMAS Y ARTEFACTOS)
// =====================================================================
const THREE_STAR_WEAPONS = {
  "espada del alba": { icon: "https://enka.network/ui/UI_EquipIcon_Sword_Dawn.png", rarity: 3, type: "Sword" },
  "harbinger of dawn": { icon: "https://enka.network/ui/UI_EquipIcon_Sword_Dawn.png", rarity: 3, type: "Sword" },
  "borla blanca": { icon: "https://enka.network/ui/UI_EquipIcon_Pole_Ruby.png", rarity: 3, type: "Polearm" },
  "white tassel": { icon: "https://enka.network/ui/UI_EquipIcon_Pole_Ruby.png", rarity: 3, type: "Polearm" },
  "borla negra": { icon: "https://enka.network/ui/UI_EquipIcon_Pole_Noire.png", rarity: 3, type: "Polearm" },
  "black tassel": { icon: "https://enka.network/ui/UI_EquipIcon_Pole_Noire.png", rarity: 3, type: "Polearm" },
  "cuento de cazadores de dragones": { icon: "https://enka.network/ui/UI_EquipIcon_Catalyst_Pulpfic.png", rarity: 3, type: "Catalyst" },
  "cuentos de cazadores de dragones": { icon: "https://enka.network/ui/UI_EquipIcon_Catalyst_Pulpfic.png", rarity: 3, type: "Catalyst" },
  "thrilling tales of dragon slayers": { icon: "https://enka.network/ui/UI_EquipIcon_Catalyst_Pulpfic.png", rarity: 3, type: "Catalyst" },
  "guía mágica": { icon: "https://enka.network/ui/UI_EquipIcon_Catalyst_Intro.png", rarity: 3, type: "Catalyst" },
  "guia magica": { icon: "https://enka.network/ui/UI_EquipIcon_Catalyst_Intro.png", rarity: 3, type: "Catalyst" },
  "magic guide": { icon: "https://enka.network/ui/UI_EquipIcon_Catalyst_Intro.png", rarity: 3, type: "Catalyst" },
  "tirachinas": { icon: "https://enka.network/ui/UI_EquipIcon_Bow_Sling.png", rarity: 3, type: "Bow" },
  "slingshot": { icon: "https://enka.network/ui/UI_EquipIcon_Bow_Sling.png", rarity: 3, type: "Bow" },
  "arco recurvo": { icon: "https://enka.network/ui/UI_EquipIcon_Bow_Curve.png", rarity: 3, type: "Bow" },
  "recurve bow": { icon: "https://enka.network/ui/UI_EquipIcon_Bow_Curve.png", rarity: 3, type: "Bow" },
  "gran espada de hierro blanco": { icon: "https://enka.network/ui/UI_EquipIcon_Claymore_Tin.png", rarity: 3, type: "Claymore" }
};

const EXTRA_WEAPONS_DIRECT = {
  // Signatures Nod-Krai, Snezhnaya, Fontaine, Natlan & Nuevos (Iconos Oficiales Yatta/Enka)
  "nocturne's curtain call": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Brisingamen.png", rarity: 5, type: "Catalyst" },
  "nocturnes curtain call": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Brisingamen.png", rarity: 5, type: "Catalyst" },
  "nocturno tras el velo": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Brisingamen.png", rarity: 5, type: "Catalyst" },
  "a teaspoon of transcendence": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_CrystallineSword.png", rarity: 5, type: "Claymore" },
  "llave de la trascendencia": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_CrystallineSword.png", rarity: 5, type: "Claymore" },
  "flame-forged insight": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Polilith.png", rarity: 4, type: "Claymore" },
  "sabiduria fraguada": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Polilith.png", rarity: 4, type: "Claymore" },
  "bloodsoaked ruins": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_TummaLyhty.png", rarity: 5, type: "Polearm" },
  "ruinas ensangrentadas": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_TummaLyhty.png", rarity: 5, type: "Polearm" },
  "nightweaver's looking glass": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_MenulisRing.png", rarity: 5, type: "Catalyst" },
  "espejo tejenoches": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_MenulisRing.png", rarity: 5, type: "Catalyst" },
  "beyond the chrysalis": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Samosvist.png", rarity: 5, type: "Sword" },
  "allende la crisalida": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Samosvist.png", rarity: 5, type: "Sword" },
  "hymn of the maelstrom": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Bludnye.png", rarity: 5, type: "Catalyst" },
  "himno del vortice": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Bludnye.png", rarity: 5, type: "Catalyst" },
  "azurelight": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_OuterSword.png", rarity: 5, type: "Sword" },
  "fulgor ceruleo": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_OuterSword.png", rarity: 5, type: "Sword" },
  "athame artis": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Motsognir.png", rarity: 5, type: "Sword" },
  "gest of the mighty wolf": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_EnsisAquilonis.png", rarity: 5, type: "Claymore" },
  "cantar de gesta del lobo": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_EnsisAquilonis.png", rarity: 5, type: "Claymore" },
  "sunny morning sleep-in": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_SakuraFan.png", rarity: 5, type: "Catalyst" },
  "hibernacion matutina de ano nuevo": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_SakuraFan.png", rarity: 5, type: "Catalyst" },
  "fractured halo": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Perdix.png", rarity: 5, type: "Polearm" },
  "halo fracturado": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Perdix.png", rarity: 5, type: "Polearm" },
  "golden frostbound oath": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Alkonost.png", rarity: 5, type: "Bow" },
  "rama del juramento escarchado": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Alkonost.png", rarity: 5, type: "Bow" },
  "reliquary of truth": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Sistrum.png", rarity: 5, type: "Catalyst" },
  "relicario de la verdad": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Sistrum.png", rarity: 5, type: "Catalyst" },
  "whitelake frostfeather": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Swanlake.png", rarity: 5, type: "Sword" },
  "pluma invernal lagoblanco": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Swanlake.png", rarity: 5, type: "Sword" },
  "vivid notions": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_VaresaTransformer.png", rarity: 5, type: "Catalyst" },
  "reflexion iridiscente": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_VaresaTransformer.png", rarity: 5, type: "Catalyst" },
  "lightbearing moonshard": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_SilverwareSaw.png", rarity: 5, type: "Sword" },
  "refulgencia de la luna": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_SilverwareSaw.png", rarity: 5, type: "Sword" },
  "symphonist of scents": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Trident.png", rarity: 5, type: "Polearm" },
  "sinfonista de aromas": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Trident.png", rarity: 5, type: "Polearm" },
  "disaster and remorse": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Carbine.png", rarity: 5, type: "Polearm" },
  "desastre y arrepentimiento": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Carbine.png", rarity: 5, type: "Polearm" },
  "angelos' heptades": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_FairyGarden.png", rarity: 5, type: "Catalyst" },
  "angelos heptades": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_FairyGarden.png", rarity: 5, type: "Catalyst" },
  "heptadas de los angeles": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_FairyGarden.png", rarity: 5, type: "Catalyst" },
  "exaiphanes blade": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_WeaponQuestSnezhnaya.png", rarity: 5, type: "Sword" },
  "hoja de exaifanes": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_WeaponQuestSnezhnaya.png", rarity: 5, type: "Sword" },
  "the daybreak chronicles": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Arianna.png", rarity: 5, type: "Bow" },
  "albores de la historia": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Arianna.png", rarity: 5, type: "Bow" },
  "starcaller's watch": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Figurines.png", rarity: 5, type: "Catalyst" },
  "voz de la calavera estelar": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Figurines.png", rarity: 5, type: "Catalyst" },
  "vigia de las estrellas": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Figurines.png", rarity: 5, type: "Catalyst" },
  "a thousand blazing suns": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_RadianceSword.png", rarity: 5, type: "Claymore" },
  "mil soles abrasadores": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_RadianceSword.png", rarity: 5, type: "Claymore" },
  "astral vulture's crimson plumage": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Qoyllorsnova.png", rarity: 5, type: "Bow" },
  "pluma carmesi del buitre astral": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Qoyllorsnova.png", rarity: 5, type: "Bow" },
  "silvershower heartstrings": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Arcdange.png", rarity: 5, type: "Bow" },
  "reposo de la pureza": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Arcdange.png", rarity: 5, type: "Bow" },
  "the first great magic": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Pledge.png", rarity: 5, type: "Bow" },
  "el primer gran truco magico": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Pledge.png", rarity: 5, type: "Bow" },
  "huella del arcoiris": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Isikhulu.png", rarity: 4, type: "Polearm" },
  "footprint of the rainbow": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Isikhulu.png", rarity: 4, type: "Polearm" },
  "earth shaker": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Isikhulu.png", rarity: 4, type: "Claymore" },
  "hacha de la mota del bosque": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Isikhulu.png", rarity: 4, type: "Claymore" },
  "chain breaker": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Isikhulu.png", rarity: 4, type: "Bow" },
  "rompecadenas": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Isikhulu.png", rarity: 4, type: "Bow" },
  "song of stillness": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Vorpal.png", rarity: 4, type: "Bow" },
  "cancion del silencio": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Vorpal.png", rarity: 4, type: "Bow" },
  "vado del rio ceniciento": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Machination.png", rarity: 4, type: "Sword" },
  "espada de madera": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Arakalari.png", rarity: 4, type: "Sword" },
  "sapwood blade": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Arakalari.png", rarity: 4, type: "Sword" },
  "espada real del bosque": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Arakalari.png", rarity: 4, type: "Claymore" },
  "flor aeromarina": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Fleurfair.png", rarity: 4, type: "Claymore" },
  "fierro floriorlado": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Fleurfair.png", rarity: 4, type: "Claymore" },
  "mailed flower": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Fleurfair.png", rarity: 4, type: "Claymore" },
  "gran espada de favonius": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Zephyrus.png", rarity: 4, type: "Claymore" },
  "gran espada del sacrificio": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Fossil.png", rarity: 4, type: "Claymore" },
  "gran espada de sacrificio": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Fossil.png", rarity: 4, type: "Claymore" },
  "diluvio de aguamarina": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Pleroma.png", rarity: 4, type: "Claymore" },
  "majaira aguamarina": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Pleroma.png", rarity: 4, type: "Claymore" },
  "oda a los pinos": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Claymore_Widsith.png", rarity: 5, type: "Claymore" },
  "arco del sacrificio": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Fossil.png", rarity: 4, type: "Bow" },
  "arco de sacrificio": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Fossil.png", rarity: 4, type: "Bow" },
  "espada del sacrificio": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Fossil.png", rarity: 4, type: "Sword" },
  "espada de sacrificio": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Fossil.png", rarity: 4, type: "Sword" },
  "memorias de sacrificio": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Fossil.png", rarity: 4, type: "Catalyst" },
  "luz de las olas": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Narukami.png", rarity: 5, type: "Polearm" },
  "engulfing lightning": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Narukami.png", rarity: 5, type: "Polearm" },
  "luz del segador": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Pole_Narukami.png", rarity: 5, type: "Polearm" },
  "absolución": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Estoc.png", rarity: 5, type: "Sword" },
  "absolucion": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Estoc.png", rarity: 5, type: "Sword" },
  "llamada del eco": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_MountainGale.png", rarity: 5, type: "Catalyst" },
  "estrella polar": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Bow_Worldbane.png", rarity: 5, type: "Bow" },
  "esplendor de las mil lluvias": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Sword_Regalis.png", rarity: 5, type: "Sword" },
  "centelleo jadecaido": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Morax.png", rarity: 5, type: "Catalyst" },
  "esplendor del jade caido": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Morax.png", rarity: 5, type: "Catalyst" },
  "anillo de yaxche": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Isikhulu.png", rarity: 4, type: "Catalyst" },
  "fluente pureza": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Vorpal.png", rarity: 4, type: "Catalyst" },
  "fluencia impoluta": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Vorpal.png", rarity: 4, type: "Catalyst" },
  "mil soles flotantes": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Ayus.png", rarity: 5, type: "Catalyst" },
  "atlas del cielo": { icon: "https://gi.yatta.moe/assets/UI/UI_EquipIcon_Catalyst_Dvalin.png", rarity: 5, type: "Catalyst" }
};

const WEAPON_NAME_ALIASES = {
  "urakusugiri": "Cortatelones de Urakusai",
  "semblanza de la luna carmesí": "Semblante de la Luna Carmesí",
  "semblanza de la luna carmesi": "Semblante de la Luna Carmesí",
  "canción patrullera de las cumbres": "Himno de las Cumbres",
  "cancion patrullera de las cumbres": "Himno de las Cumbres",
  "aleta cortamareas": "Aleta Cortaolas",
  "supervisión del tesoro": "Supervisor Flujoáurico",
  "supervision del tesoro": "Supervisor Flujoáurico",
  "reminiscencia de tulaytullah": "Reminiscencia de Tulaytulah",
  "hora del surf": "Hora de Surfear",
  "arco del prototipo crescendo": "Prototipo Luz de Luna"
};

function getWeaponFallbackIcon(type = "Sword") {
  return `assets/weapon_types/${String(type).toLowerCase()}.png`;
}

function getWeaponDisplayData(rawName, fallbackRarity = 5, charWeaponType = "Sword", weaponId = null) {
  if (weaponId && typeof REAL_WEAPONS_DB !== "undefined") {
    const exact = REAL_WEAPONS_DB.find(w => String(w.id) === String(weaponId) && w.type === charWeaponType);
    if (exact) return { icon: exact.icon, rarity: exact.rarity, name: exact.name };
  }
  const fallbackIcon = getWeaponFallbackIcon(charWeaponType);
  if (!rawName) return { icon: fallbackIcon, rarity: fallbackRarity, name: "Arma" };
  const clean = rawName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s*\([^)]*\)/g, "").replace(/\s*r[1-5]/gi, "").trim();

  // 1. Chequeo de 3★ respetando el tipo de arma del personaje
  for (const [k, v] of Object.entries(THREE_STAR_WEAPONS)) {
    if (charWeaponType && v.type && v.type.toLowerCase() !== charWeaponType.toLowerCase()) continue;
    const kClean = k.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (clean.includes(kClean) || kClean.includes(clean)) return { icon: v.icon, rarity: v.rarity, name: rawName };
  }

  // 2. Chequeo de armas directas / Firmas respetando el tipo de arma del personaje
  for (const [k, v] of Object.entries(EXTRA_WEAPONS_DIRECT)) {
    if (charWeaponType && v.type && v.type.toLowerCase() !== charWeaponType.toLowerCase()) continue;
    const kClean = k.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (clean.includes(kClean) || kClean.includes(clean)) return { icon: v.icon, rarity: v.rarity, name: rawName };
  }

  // 3. Normalizar por alias
  let targetName = clean;
  for (const [k, v] of Object.entries(WEAPON_NAME_ALIASES)) {
    const kClean = k.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (clean.includes(kClean)) { targetName = v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); break; }
  }

  // 4. Buscar en REAL_WEAPONS_DB priorizando estrictamente el tipo de arma del personaje
  if (typeof REAL_WEAPONS_DB !== "undefined" && Array.isArray(REAL_WEAPONS_DB)) {
    let candidateWeapons = charWeaponType 
      ? REAL_WEAPONS_DB.filter(w => !charWeaponType || w.type.toLowerCase() === charWeaponType.toLowerCase())
      : REAL_WEAPONS_DB;
    if (candidateWeapons.length === 0) candidateWeapons = REAL_WEAPONS_DB;

    let found = candidateWeapons.find(w => w.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === targetName);
    if (!found) {
      const parts = clean.split("/");
      for (const p of parts) {
        const sub = p.trim();
        if (!sub) continue;
        found = candidateWeapons.find(w => {
          const wn = w.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          return wn.includes(sub) || sub.includes(wn);
        });
        if (found) break;
      }
    }
    if (!found) {
      found = candidateWeapons.find(w => {
        const wn = w.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return wn.includes(targetName) || targetName.includes(wn);
      });
    }
    if (found) {
      return { icon: found.icon, rarity: found.rarity || fallbackRarity, name: found.name };
    }
  }

  return { icon: fallbackIcon, rarity: fallbackRarity, name: rawName };
}

// Diccionario Oficial y Verificado de Sets de Artefactos de Genshin Impact (Flores de la Vida en Enka/Yatta CDN)
const ARTIFACT_SETS_ICONS = {
  // Sets 5★ Clásicos y Universales
  "gladiador": "assets/artifacts/UI_RelicIcon_15001_4.png", // Final del Gladiador
  "gladiator": "assets/artifacts/UI_RelicIcon_15001_4.png",
  "gladeador": "assets/artifacts/UI_RelicIcon_15001_4.png",
  "orquesta del errante": "assets/artifacts/UI_RelicIcon_15003_4.png", // Orquesta del Errante
  "orquesta": "assets/artifacts/UI_RelicIcon_15003_4.png",
  "wanderer": "assets/artifacts/UI_RelicIcon_15003_4.png",
  "ritual antiguo de la nobleza": "assets/artifacts/UI_RelicIcon_15007_4.png", // Ritual Antiguo de la Nobleza
  "nobleza obligada": "assets/artifacts/UI_RelicIcon_15007_4.png",
  "nobleza": "assets/artifacts/UI_RelicIcon_15007_4.png",
  "noblesse": "assets/artifacts/UI_RelicIcon_15007_4.png",
  "caballeria sanguinaria": "assets/artifacts/UI_RelicIcon_15008_4.png", // Caballería Sanguinaria
  "caballeria": "assets/artifacts/UI_RelicIcon_15008_4.png",
  "bloodstained": "assets/artifacts/UI_RelicIcon_15008_4.png",

  // Sets Mondstadt & Liyue
  "sombra verde esmeralda": "assets/artifacts/UI_RelicIcon_15002_4.png", // Sombra Verde Esmeralda
  "sombra verde": "assets/artifacts/UI_RelicIcon_15002_4.png",
  "viridescent": "assets/artifacts/UI_RelicIcon_15002_4.png",
  "furia del trueno": "assets/artifacts/UI_RelicIcon_15005_4.png", // Furia del Trueno
  "thundering fury": "assets/artifacts/UI_RelicIcon_15005_4.png",
  "domador de truenos": "assets/artifacts/UI_RelicIcon_14002_4.png", // Domador de Truenos
  "thundersoother": "assets/artifacts/UI_RelicIcon_14002_4.png",
  "bruja carmesi en llamas": "assets/artifacts/UI_RelicIcon_15006_4.png", // Bruja Carmesí en Llamas
  "bruja carmesi": "assets/artifacts/UI_RelicIcon_15006_4.png",
  "crimson witch": "assets/artifacts/UI_RelicIcon_15006_4.png",
  "virtuoso corredor de lava": "assets/artifacts/UI_RelicIcon_14003_4.png", // Virtuoso Corredor de Lava
  "corredor de lava": "assets/artifacts/UI_RelicIcon_14003_4.png",
  "lavawalker": "assets/artifacts/UI_RelicIcon_14003_4.png",
  "petra arcaica": "assets/artifacts/UI_RelicIcon_15014_4.png", // Petra Arcaica
  "archaic petra": "assets/artifacts/UI_RelicIcon_15014_4.png",
  "retroceso del meteorito": "assets/artifacts/UI_RelicIcon_15015_4.png", // Retroceso del Meteorito
  "meteorito": "assets/artifacts/UI_RelicIcon_15015_4.png",
  "bolide": "assets/artifacts/UI_RelicIcon_15015_4.png",
  "doncella amada": "assets/artifacts/UI_RelicIcon_14004_4.png", // Doncella Amada
  "maiden": "assets/artifacts/UI_RelicIcon_14004_4.png",

  // Espinadragón & Inazuma
  "nomada del invierno": "assets/artifacts/UI_RelicIcon_14001_4.png", // Nómada del Invierno
  "blizzard strayer": "assets/artifacts/UI_RelicIcon_14001_4.png",
  "blizzard": "assets/artifacts/UI_RelicIcon_14001_4.png",
  "corazon de las profundidades": "assets/artifacts/UI_RelicIcon_15016_4.png", // Corazón de las Profundidades
  "heart of depth": "assets/artifacts/UI_RelicIcon_15016_4.png",
  "tenacidad de la geoarmada": "assets/artifacts/UI_RelicIcon_15017_4.png", // Tenacidad de la Geoarmada
  "tenacidad": "assets/artifacts/UI_RelicIcon_15017_4.png",
  "millelith": "assets/artifacts/UI_RelicIcon_15017_4.png",
  "llamas albinas": "assets/artifacts/UI_RelicIcon_15018_4.png", // Llamas Albinas
  "llama albina": "assets/artifacts/UI_RelicIcon_15018_4.png",
  "pale flame": "assets/artifacts/UI_RelicIcon_15018_4.png",
  "reminiscencia de la purificacion": "assets/artifacts/UI_RelicIcon_15019_4.png", // Reminiscencia de la Purificación
  "reminiscencia": "assets/artifacts/UI_RelicIcon_15019_4.png",
  "shimenawa": "assets/artifacts/UI_RelicIcon_15019_4.png",
  "emblema del destino": "assets/artifacts/UI_RelicIcon_15020_4.png", // Emblema del Destino
  "emblema": "assets/artifacts/UI_RelicIcon_15020_4.png",
  "emblem": "assets/artifacts/UI_RelicIcon_15020_4.png",
  "cascara de suenos opulentos": "assets/artifacts/UI_RelicIcon_15021_4.png", // Cáscara de Sueños Opulentos
  "cascara de suenos": "assets/artifacts/UI_RelicIcon_15021_4.png",
  "opulent": "assets/artifacts/UI_RelicIcon_15021_4.png",
  "husk": "assets/artifacts/UI_RelicIcon_15021_4.png",
  "perla oceanica": "assets/artifacts/UI_RelicIcon_15022_4.png", // Perla Oceánica
  "ocean-hued": "assets/artifacts/UI_RelicIcon_15022_4.png",
  "clam": "assets/artifacts/UI_RelicIcon_15022_4.png",

  // Sima & Sumeru
  "deceso del cinabrio": "assets/artifacts/UI_RelicIcon_15023_4.png", // Deceso del Cinabrio
  "cinabrio": "assets/artifacts/UI_RelicIcon_15023_4.png",
  "vermillion": "assets/artifacts/UI_RelicIcon_15023_4.png",
  "eco del sacrificio": "assets/artifacts/UI_RelicIcon_15024_4.png", // Eco del Sacrificio
  "echoes": "assets/artifacts/UI_RelicIcon_15024_4.png",
  "recuerdos del bosque": "assets/artifacts/UI_RelicIcon_15025_4.png", // Recuerdos del Bosque
  "deepwood": "assets/artifacts/UI_RelicIcon_15025_4.png",
  "suenos aureos": "assets/artifacts/UI_RelicIcon_15026_4.png", // Sueños Áureos
  "gilded": "assets/artifacts/UI_RelicIcon_15026_4.png",
  "pabellon del desierto": "assets/artifacts/UI_RelicIcon_15027_4.png", // Épica del Pabellón del Desierto
  "desert pavilion": "assets/artifacts/UI_RelicIcon_15027_4.png",
  "flor del paraiso perdido": "assets/artifacts/UI_RelicIcon_15028_4.png", // Flor del Paraíso Perdido
  "flor olvidada del paraiso": "assets/artifacts/UI_RelicIcon_15028_4.png",
  "paraiso perdido": "assets/artifacts/UI_RelicIcon_15028_4.png",
  "paradise lost": "assets/artifacts/UI_RelicIcon_15028_4.png",
  "sueno de la ninfa": "assets/artifacts/UI_RelicIcon_15029_4.png", // Sueño de la Ninfa
  "nymph": "assets/artifacts/UI_RelicIcon_15029_4.png",
  "fulgor de vurukasha": "assets/artifacts/UI_RelicIcon_15030_4.png", // Fulgor de Vurukasha
  "vurukasha": "assets/artifacts/UI_RelicIcon_15030_4.png",
  "vourukasha": "assets/artifacts/UI_RelicIcon_15030_4.png",

  // Fontaine
  "cazador sombrio": "assets/artifacts/UI_RelicIcon_15031_4.png", // Cazador Sombrío / Marechaussee
  "cazador fantasmal": "assets/artifacts/UI_RelicIcon_15031_4.png",
  "marechaussee": "assets/artifacts/UI_RelicIcon_15031_4.png",
  "compania dorada": "assets/artifacts/UI_RelicIcon_15032_4.png", // Compañía Dorada
  "golden troupe": "assets/artifacts/UI_RelicIcon_15032_4.png",
  "cancion de dias preteritos": "assets/artifacts/UI_RelicIcon_15033_4.png", // Canción de Días Pretéritos
  "sonata de dias preteritos": "assets/artifacts/UI_RelicIcon_15033_4.png",
  "dias preteritos": "assets/artifacts/UI_RelicIcon_15033_4.png",
  "son de antano": "assets/artifacts/UI_RelicIcon_15033_4.png",
  "song of days": "assets/artifacts/UI_RelicIcon_15033_4.png",
  "murmullo del bosque en la noche ecoica": "assets/artifacts/UI_RelicIcon_15034_4.png",
  "murmullo del bosque reverberante": "assets/artifacts/UI_RelicIcon_15034_4.png",
  "murmullo del bosque": "assets/artifacts/UI_RelicIcon_15034_4.png",
  "noche ecoica": "assets/artifacts/UI_RelicIcon_15034_4.png",
  "nighttime whispers": "assets/artifacts/UI_RelicIcon_15034_4.png",
  "fragmento de la armonia fantasmal": "assets/artifacts/UI_RelicIcon_15035_4.png", // Fragmento de la Armonía Fantasiosa
  "armonia fantasmal": "assets/artifacts/UI_RelicIcon_15035_4.png",
  "armonia fantas": "assets/artifacts/UI_RelicIcon_15035_4.png",
  "harmonic whimsy": "assets/artifacts/UI_RelicIcon_15035_4.png",
  "whimsy": "assets/artifacts/UI_RelicIcon_15035_4.png",
  "ensonacion inacabada": "assets/artifacts/UI_RelicIcon_15036_4.png", // Ensoñación Inacabada
  "suenos inacabados": "assets/artifacts/UI_RelicIcon_15036_4.png",
  "unfinished reverie": "assets/artifacts/UI_RelicIcon_15036_4.png",
  "reverie": "assets/artifacts/UI_RelicIcon_15036_4.png",

  // Natlan
  "pergamino del heroe de la ciudad de las cenizas": "assets/artifacts/UI_RelicIcon_15037_4.png",
  "pergamino del heroe": "assets/artifacts/UI_RelicIcon_15037_4.png",
  "cinder city": "assets/artifacts/UI_RelicIcon_15037_4.png",
  "hero of cinder": "assets/artifacts/UI_RelicIcon_15037_4.png",
  "codice de obsidiana": "assets/artifacts/UI_RelicIcon_15038_4.png", // Códice de Obsidiana
  "obsidian codex": "assets/artifacts/UI_RelicIcon_15038_4.png",

  // Sets Nuevos Oficiales (15039 - 15048: Nod-Krai, Snezhnaya & Hexerei)
  "long night's oath": "assets/artifacts/UI_RelicIcon_15039_4.png",
  "long night": "assets/artifacts/UI_RelicIcon_15039_4.png",
  "juramento de la noche": "assets/artifacts/UI_RelicIcon_15039_4.png",
  "finale of the deep galleries": "assets/artifacts/UI_RelicIcon_15040_4.png",
  "finale of the deep": "assets/artifacts/UI_RelicIcon_15040_4.png",
  "deep galleries": "assets/artifacts/UI_RelicIcon_15040_4.png",
  "requiem del corredor": "assets/artifacts/UI_RelicIcon_15040_4.png",
  "night of the sky's unveiling": "assets/artifacts/UI_RelicIcon_15041_4.png",
  "sky's unveiling": "assets/artifacts/UI_RelicIcon_15041_4.png",
  "revelacion del cielo": "assets/artifacts/UI_RelicIcon_15041_4.png",
  "silken moon's serenade": "assets/artifacts/UI_RelicIcon_15042_4.png",
  "serenata de la luna tejida": "assets/artifacts/UI_RelicIcon_15042_4.png",
  "serenata de la luna": "assets/artifacts/UI_RelicIcon_15042_4.png",
  "luna tejida": "assets/artifacts/UI_RelicIcon_15042_4.png",
  "silken moon": "assets/artifacts/UI_RelicIcon_15042_4.png",
  "aubade of morningstar and moon": "assets/artifacts/UI_RelicIcon_15043_4.png",
  "aubade": "assets/artifacts/UI_RelicIcon_15043_4.png",
  "morningstar": "assets/artifacts/UI_RelicIcon_15043_4.png",
  "alborada de la estrella": "assets/artifacts/UI_RelicIcon_15043_4.png",
  "a day carved from rising winds": "assets/artifacts/UI_RelicIcon_15044_4.png",
  "rising winds": "assets/artifacts/UI_RelicIcon_15044_4.png",
  "vientos alzantes": "assets/artifacts/UI_RelicIcon_15044_4.png",
  "dia de los vientos alzantes": "assets/artifacts/UI_RelicIcon_15044_4.png",
  "celestial gift": "assets/artifacts/UI_RelicIcon_15045_4.png",
  "dadiva celestial": "assets/artifacts/UI_RelicIcon_15045_4.png",
  "desencanto en las sombras profundas": "assets/artifacts/UI_RelicIcon_15046_4.png",
  "desencanto en las sombras": "assets/artifacts/UI_RelicIcon_15046_4.png",
  "desencanto": "assets/artifacts/UI_RelicIcon_15046_4.png",
  "desilusion congelada en las sombras": "assets/artifacts/UI_RelicIcon_15046_4.png",
  "desilusion congelada": "assets/artifacts/UI_RelicIcon_15046_4.png",
  "disenchantment in deep shadows": "assets/artifacts/UI_RelicIcon_15046_4.png",
  "disenchantment": "assets/artifacts/UI_RelicIcon_15046_4.png",
  "deep shadow": "assets/artifacts/UI_RelicIcon_15046_4.png",
  "scarlet proof": "assets/artifacts/UI_RelicIcon_15047_4.png",
  "testimonio escarlata": "assets/artifacts/UI_RelicIcon_15047_4.png",
  "heart of the furnace": "assets/artifacts/UI_RelicIcon_15048_4.png",
  "corazon forjado": "assets/artifacts/UI_RelicIcon_15048_4.png",

  // Sets 4★ Esenciales
  "instructor": "assets/artifacts/UI_RelicIcon_10007_4.png",
  "exiliado": "assets/artifacts/UI_RelicIcon_10009_4.png",
  "berserker": "assets/artifacts/UI_RelicIcon_10005_4.png"
};

function getArtifactSetIcon(setName) {
  const fallback = "";
  if (!setName) return fallback;
  const normalize = value => String(value).toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").replace(/[’']/g, "").trim();
  const clean = normalize(setName);
  // Priorizar el primer set de la combinación; si solo indica una estadística, usar un set real compatible.
  const primary = clean.split(/\s+\+\s+/)[0];
  const matches = Object.entries(ARTIFACT_SETS_ICONS)
    .map(([key, icon]) => ({ key: normalize(key), icon }))
    .filter(entry => primary.includes(entry.key))
    .sort((left, right) => right.key.length - left.key.length);
  if (matches.length) return matches[0].icon;
  const statIcons = [
    [/\bvida\b|\bhp\b/, "15017"],
    [/maestria|\bem\b/, "15003"],
    [/\batq\b|\batk\b/, "15001"],
    [/recarga|\ber\b/, "15020"],
    [/dendro/, "15025"],
    [/hydro/, "15016"]
  ];
  const statMatch = statIcons.find(([pattern]) => pattern.test(primary));
  return statMatch ? `assets/artifacts/UI_RelicIcon_${statMatch[1]}_4.png` : fallback;
}

const ARTIFACT_TWO_PIECE_SETS = {
  "10009": {name:"Exiliado", stat:"Recarga de Energía", amount:"20%"},
  "14001": {name:"Nómada del Invierno", stat:"Bono Cryo", amount:"15%"},
  "15001": {name:"Gladiador", stat:"ATQ", amount:"18%"},
  "15003": {name:"Orquesta del Errante", stat:"Maestría Elemental", amount:"80"},
  "15005": {name:"Furia del Trueno", stat:"Bono Electro", amount:"15%"},
  "15007": {name:"Nobleza Obligada", stat:"burst", amount:"20%"},
  "15008": {name:"Caballería Sanguinaria", stat:"Bono Físico", amount:"25%"},
  "15014": {name:"Petra Arcaica", stat:"Bono Geo", amount:"15%"},
  "15016": {name:"Corazón de las Profundidades", stat:"Bono Hydro", amount:"15%"},
  "15017": {name:"Tenacidad de la Geoarmada", stat:"Vida", amount:"20%"},
  "15018": {name:"Llamas Albinas", stat:"Bono Físico", amount:"25%"},
  "15019": {name:"Reminiscencia de la Purificación", stat:"ATQ", amount:"18%"},
  "15020": {name:"Emblema del Destino", stat:"Recarga de Energía", amount:"20%"},
  "15025": {name:"Recuerdos del Bosque", stat:"Bono Dendro", amount:"15%"},
  "15026": {name:"Sueños Áureos", stat:"Maestría Elemental", amount:"80"},
  "15030": {name:"Fulgor de Vurukasha", stat:"Vida", amount:"20%"},
  "15032": {name:"Compañía Dorada", stat:"skill", amount:"20%"}
};

function getArtifactPieceGroups(setName) {
  if (!/2\s*(?:p|piezas|pieces)/i.test(setName || "")) return [];
  const parts = String(setName).split(/\s+\+\s+/);
  const groups = parts.map(part => {
    const id = getArtifactSetIcon(part).match(/UI_RelicIcon_(\d+)_/)?.[1];
    return id && ARTIFACT_TWO_PIECE_SETS[id] ? {id, ...ARTIFACT_TWO_PIECE_SETS[id]} : null;
  });
  if (groups.some(group => !group)) return [];
  if (groups.length === 2 && groups[0].id === groups[1].id) {
    const alternative = {"15003":"15026", "15017":"15030", "15001":"15019", "15020":"10009"}[groups[0].id];
    if (alternative) groups[1] = {id:alternative, ...ARTIFACT_TWO_PIECE_SETS[alternative]};
  }
  return groups;
}

function getArtifactPieceCopy(lang) {
  return ({
    es:{title:"Combinación de 2 + 2 piezas", example:"Ejemplo compatible:", burst:"Daño de Habilidad Definitiva", skill:"Daño de Habilidad Elemental"},
    en:{title:"2 + 2-piece combination", example:"Compatible example:", burst:"Elemental Burst DMG", skill:"Elemental Skill DMG"},
    pt:{title:"Combinação de 2 + 2 peças", example:"Exemplo compatível:", burst:"Dano do Supremo", skill:"Dano da Habilidade Elemental"},
    ja:{title:"2セット＋2セット", example:"組み合わせ例：", burst:"元素爆発ダメージ", skill:"元素スキルダメージ"},
    ko:{title:"2세트 + 2세트 조합", example:"조합 예시:", burst:"원소폭발 피해", skill:"원소전투 스킬 피해"}
  })[lang] || getArtifactPieceCopy("es");
}

function renderArtifactPieceDetails(groups, lang) {
  if (!groups.length) return "";
  const copy = getArtifactPieceCopy(lang);
  return `<div class="tc-artifact-combination">${groups.length === 2 ? `<p>${escapeHtml(copy.example)}</p>` : ""}${groups.map(group => {
    const name = getArtifactTranslatedName(group.name, lang);
    const stat = copy[group.stat] || getBaseAscensionLabel(group.stat, lang);
    return `<div><span>2p ${escapeHtml(name)}</span><strong>+${escapeHtml(group.amount)} ${escapeHtml(stat)}</strong></div>`;
  }).join("")}</div>`;
}

function getCharacterTeammateAvatar(rawName) {
  if (!rawName) return null;
  const clean = rawName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  if (typeof CHARACTER_BUILDS_DB !== "undefined" && Array.isArray(CHARACTER_BUILDS_DB)) {
    const travelerElement = clean.match(/(?:viajer[oa]|traveler)\s*\(?\s*(anemo|geo|electro|dendro|hydro|pyro|cryo)/);
    if (travelerElement) {
      const traveler = CHARACTER_BUILDS_DB.find(c => c.id === `traveler_${travelerElement[1]}`);
      if (traveler) return traveler.icon;
    }
    const exact = CHARACTER_BUILDS_DB.find(c => [c.name?.es, c.name?.en].some(n => String(n || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === clean));
    if (exact?.icon) return exact.icon;
    const foundBuild = CHARACTER_BUILDS_DB.find(c => {
      const es = (c.name?.es || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const en = (c.name?.en || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return es === clean || en === clean || es.includes(clean) || clean.includes(es) || en.includes(clean) || clean.includes(en);
    });
    if (foundBuild && foundBuild.icon) return foundBuild.icon;
  }
  if (typeof CHARACTER_CATALOG !== "undefined" && CHARACTER_CATALOG[rawName.trim()]) {
    return CHARACTER_CATALOG[rawName.trim()].icon;
  }
  if (typeof CHARACTER_CATALOG !== "undefined") {
    const k = Object.keys(CHARACTER_CATALOG).find(key => {
      const kc = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return kc.includes(clean) || clean.includes(kc);
    });
    if (k) return CHARACTER_CATALOG[k].icon;
  }
  return null;
}

function formatOriginalTalentAttribute(template, parameters, level, lang) {
  return String(template || "").replace(/\{(param\d+):([^}]+)\}/g, (token, key, format) => {
    const value = parameters[key]?.[level - 1];
    if (!Number.isFinite(value)) return "—";
    const percent = format.includes("P");
    const number = percent ? value * 100 : value;
    return `${Number(number.toFixed(2)).toLocaleString(lang || 'es')}${percent ? "%" : ""}`;
  }).replace(/<[^>]*>/g, "");
}

const BASE_STATS_I18N = {
  es: {title:"Datos del juego: estadísticas base", level:"Nivel 90", hp:"Vida", atk:"ATQ", def:"DEF", asc:"Ascensión"},
  en: {title:"Game data: base stats", level:"Level 90", hp:"HP", atk:"ATK", def:"DEF", asc:"Ascension"},
  pt: {title:"Dados do jogo: atributos base", level:"Nível 90", hp:"Vida", atk:"ATQ", def:"DEF", asc:"Ascensão"},
  ja: {title:"ゲームデータ：基礎ステータス", level:"レベル90", hp:"HP", atk:"攻撃力", def:"防御力", asc:"突破ステータス"},
  ko: {title:"게임 데이터: 기초 능력치", level:"레벨 90", hp:"HP", atk:"공격력", def:"방어력", asc:"돌파 능력치"}
};

function getBaseAscensionLabel(rawStat, lang) {
  const normalized = String(rawStat || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const language = Math.max(0, ["es", "en", "pt", "ja", "ko"].indexOf(lang));
  const elements = {rock:"Geo",wind:"Anemo",fire:"Pyro",ice:"Cryo",grass:"Dendro",water:"Hydro",elec:"Electro"};
  const nativeElement = normalized.match(/fight_prop_(rock|wind|fire|ice|grass|water|elec)_add_hurt/);
  const element = nativeElement ? elements[nativeElement[1]] : normalized.match(/geo|anemo|pyro|cryo|dendro|hydro|electro/i)?.[0];
  if (element) {
    const name = element[0].toUpperCase() + element.slice(1);
    return [`Bono de Daño ${name}`, `${name} DMG Bonus`, `Bônus de Dano ${name}`, `${name}元素ダメージ`, `${name} 원소 피해 보너스`][language];
  }
  const definitions = [
    [/prob.*crit/, ["Prob. Crítica", "CRIT Rate", "Taxa Crítica", "会心率", "치명타 확률"]],
    [/dano.*crit/, ["Daño Crítico", "CRIT DMG", "Dano Crítico", "会心ダメージ", "치명타 피해"]],
    [/recarga/, ["Recarga de Energía", "Energy Recharge", "Recarga de Energia", "元素チャージ効率", "원소 충전 효율"]],
    [/maestria/, ["Maestría Elemental", "Elemental Mastery", "Proficiência Elemental", "元素熟知", "원소 마스터리"]],
    [/curacion/, ["Bono de Curación", "Healing Bonus", "Bônus de Cura", "与える治療効果", "주는 치유 보너스"]],
    [/fisico/, ["Bono de Daño Físico", "Physical DMG Bonus", "Bônus de Dano Físico", "物理ダメージ", "물리 피해 보너스"]],
    [/vida/, ["Vida", "HP", "Vida", "HP", "HP"]],
    [/atq/, ["ATQ", "ATK", "ATQ", "攻撃力", "공격력"]],
    [/def/, ["DEF", "DEF", "DEF", "防御力", "방어력"]]
  ];
  const entry = definitions.find(([pattern]) => pattern.test(normalized));
  return entry ? entry[1][language] : rawStat;
}

function renderOriginalBuildFacts(build) {
  const stats = build.baseStats;
  const labels = BASE_STATS_I18N[state.lang] || BASE_STATS_I18N.es;
  const format = value => Number(value).toLocaleString(state.lang || "es", { maximumFractionDigits: 2 });
  const ascStat = getBaseAscensionLabel(stats.ascStat, state.lang);
  return `<p class="tc-base-stats-level">${escapeHtml(labels.level)}</p><dl class="tc-base-stats">
    <div><dt>${escapeHtml(labels.hp)}</dt><dd>${format(stats.hp90)}</dd></div>
    <div><dt>${escapeHtml(labels.atk)}</dt><dd>${format(stats.atk90)}</dd></div>
    <div><dt>${escapeHtml(labels.def)}</dt><dd>${format(stats.def90)}</dd></div>
    <div><dt>${escapeHtml(labels.asc)}</dt><dd>${escapeHtml(ascStat)} +${escapeHtml(String(stats.ascVal))}</dd></div>
  </dl>`;
}

function renderTheorycraft() {
  const container = document.getElementById("tcCardsContainer");
  if (!container) return;
  container.innerHTML = "";

  const db = (typeof CHARACTER_BUILDS_DB !== "undefined" && CHARACTER_BUILDS_DB.length > 0)
    ? CHARACTER_BUILDS_DB
    : THEORYCRAFT_DB;

  const SEARCH_ALIASES = {
    "aether": ["traveler_"],
    "lumine": ["traveler_"],
    "viajera": ["traveler_"],
    "columbina": ["colombina", "damselette", "fatui"],
    "colombina": ["columbina", "damselette", "fatui"],
    "sandrone": ["marionette", "marioneta", "fatui"],
    "marionette": ["sandrone", "marioneta", "fatui"],
    "capitano": ["captain", "il capitano", "capitan", "fatui"],
    "arlecchino": ["arlechino", "peruere", "father", "padre", "fatui"],
    "arlechino": ["arlecchino", "father"],
    "scaramouche": ["trotamundos", "wanderer", "scara", "kunikuzushi"],
    "trotamundos": ["scaramouche", "wanderer", "scara"],
    "childe": ["tartaglia", "ajax", "fatui"],
    "tartaglia": ["childe", "ajax", "fatui"],
    "baal": ["raiden", "ei", "shogun"],
    "raiden": ["baal", "ei", "shogun", "inazuma"],
    "alhaitham": ["alhacen", "haitham"],
    "alhacen": ["alhaitham", "haitham"],
    "mizuki": ["yumemizuki", "yumemizuki mizuki"],
    "kokomi": ["sangonomiya kokomi", "sangonomiya"],
    "kazuha": ["kaedehara kazuha", "kaedehara"],
    "ayaka": ["kamisato ayaka"],
    "ayato": ["kamisato ayato"],
    "itto": ["arataki itto"],
    "mavuika": ["arconte pyro", "natlan", "fuego"],
    "furina": ["focalors", "arconte hydro", "fontaine"],
    "nahida": ["kusanali", "arconte dendro", "sumeru"],
    "zhongli": ["morax", "rex lapis", "arconte geo", "liyue"],
    "venti": ["barbatos", "arconte anemo", "mondstadt"],
    "citlali": ["citlali", "citlali"],
    "emilie": ["emilie", "émilie"],
    "ororon": ["olorun"]
  };

  function normalizeSearch(str) {
    if (!str) return "";
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[()_]/g, " ").replace(/\s+/g, " ").trim();
  }

  const rawQ = (state.searchQuery || "").trim();
  const q = normalizeSearch(rawQ);

  const filtered = db.filter((ch) => {
    const matchesEl = state.selectedElement === "ALL" || ch.element === state.selectedElement;
    const matchesRole = !state.selectedRole || state.selectedRole === "ALL" || ch.roleCategory === state.selectedRole;
    
    if (!matchesEl || !matchesRole) return false;
    if (!q) return true;

    const nameEs = normalizeSearch(ch.name.es || "");
    const nameEn = normalizeSearch(ch.name.en || "");
    const idStr = normalizeSearch(ch.id || "");
    const roleStr = normalizeSearch(typeof ch.role === "string" ? ch.role : (ch.role.es || ""));
    const weapStr = normalizeSearch(ch.weaponType || "");
    const elStr = normalizeSearch(ch.element || "");
    const tierStr = normalizeSearch(ch.tier || "");

    const baseMatch = nameEs.includes(q) || nameEn.includes(q) || idStr.includes(q) || 
                      roleStr.includes(q) || weapStr.includes(q) || elStr.includes(q) || tierStr.includes(q);

    if (baseMatch) return true;

    // Búsqueda cruzada por alias (ej: Columbina <-> Colombina, Arlechino <-> Arlecchino)
    const aliases = SEARCH_ALIASES[q] || [];
    const aliasMatched = aliases.some((al) => {
      const cleanAl = normalizeSearch(al);
      return nameEs.includes(cleanAl) || nameEn.includes(cleanAl) || idStr.includes(cleanAl);
    });

    return aliasMatched;
  });

  const TC_CARD_I18N = {
    es: {
      noMatchTitle: "No se encontraron personajes con los filtros seleccionados.",
      noMatchSub: "Prueba cambiando el elemento, el rol o el término de búsqueda.",
      bestWeaps: "Mejores Armas Recomendadas",
      bestArts: "Sets de Artefactos Óptimos",
      mainStats: "Estadísticas Principales por Pieza (Main Stats)",
      sands: "Arenas del Tiempo (Sands)",
      goblet: "Cáliz de Eonothem (Goblet)",
      circlet: "Tiara de Logos (Circlet)",
      talPrio: "Prioridad de Subida de Talentos",
      talSub: "Orden de Inversión y Coronas:",
      subPrio: "Prioridad de Substats en Artefactos",
      benchmarks: "Objetivos de Estadísticas Meta (Benchmarks)",
      teams: "Mejores Sinergias y Equipos Meta",
      bmHp: "Vida (HP)",
      bmAtk: "Ataque (ATQ)",
      bmDef: "Defensa (DEF)",
      bmEm: "Maestría (ME)",
      bmEr: "Recarga (RE)",
      recBadge: "Recomendada",
      optBadge: "Óptimo"
    },
    en: {
      noMatchTitle: "No characters found matching the selected filters.",
      noMatchSub: "Try changing the element, role, or search query.",
      bestWeaps: "Best Recommended Weapons",
      bestArts: "Optimal Artifact Sets",
      mainStats: "Main Stats by Piece",
      sands: "Sands of Eon",
      goblet: "Goblet of Eonothem",
      circlet: "Circlet of Logos",
      talPrio: "Talent Upgrade Priority",
      talSub: "Investment & Crown Order:",
      subPrio: "Artifact Substat Priority",
      benchmarks: "Target Stat Benchmarks",
      teams: "Best Synergies & Meta Teams",
      bmHp: "HP",
      bmAtk: "ATK",
      bmDef: "DEF",
      bmEm: "Elemental Mastery (EM)",
      bmEr: "Energy Recharge (ER)",
      recBadge: "Recommended",
      optBadge: "Optimal"
    },
    pt: {
      noMatchTitle: "Nenhum personagem encontrado com os filtros selecionados.",
      noMatchSub: "Tente alterar o elemento, a função ou o termo de busca.",
      bestWeaps: "Melhores Armas Recomendadas",
      bestArts: "Conjuntos de Artefatos Ideais",
      mainStats: "Atributos Principais por Peça (Main Stats)",
      sands: "Areias do Tempo (Sands)",
      goblet: "Cálice de Eonothem (Goblet)",
      circlet: "Tiara de Logos (Circlet)",
      talPrio: "Prioridade de Talentos",
      talSub: "Ordem de Investimento e Coroas:",
      subPrio: "Prioridade de Sub-atributos em Artefatos",
      benchmarks: "Metas de Atributos (Benchmarks)",
      teams: "Melhores Sinergias e Equipes Meta",
      bmHp: "Vida (HP)",
      bmAtk: "Ataque (ATQ)",
      bmDef: "Defesa (DEF)",
      bmEm: "Proficiência (EM)",
      bmEr: "Recarga (ER)",
      recBadge: "Recomendada",
      optBadge: "Ideal"
    },
    ja: {
      noMatchTitle: "選択した条件に一致するキャラクターが見つかりません。",
      noMatchSub: "元素・ロール・検索キーワードを変更してみてください。",
      bestWeaps: "おすすめ最適武器",
      bestArts: "おすすめ聖遺物セット",
      mainStats: "部位別メインステータス",
      sands: "時の砂 (時計)",
      goblet: "空の杯 (杯)",
      circlet: "理の冠 (冠)",
      talPrio: "天賦強化の優先度",
      talSub: "育成順序と知恵の冠:",
      subPrio: "聖遺物サブステータス優先度",
      benchmarks: "目標ステータス目安 (ベンチマーク)",
      teams: "おすすめ編成＆シナジー",
      bmHp: "HP",
      bmAtk: "攻撃力",
      bmDef: "防御力",
      bmEm: "元素熟知",
      bmEr: "元素チャージ効率",
      recBadge: "おすすめ",
      optBadge: "最適"
    },
    ko: {
      noMatchTitle: "선택한 필터와 일치하는 캐릭터가 없습니다.",
      noMatchSub: "원소, 역할 또는 검색어를 변경해 보세요.",
      bestWeaps: "추천 종결 및 대체 무기",
      bestArts: "최적 성유물 세트",
      mainStats: "부위별 주옵션 (Main Stats)",
      sands: "시간의 모래 (시계)",
      goblet: "공간의 성배 (성배)",
      circlet: "이성의 왕관 (왕관)",
      talPrio: "특성 육성 우선순위",
      talSub: "투자 순서 및 왕관:",
      subPrio: "성유물 부옵션 우선순위",
      benchmarks: "목표 스탯 기준 (Benchmarks)",
      teams: "최적 시너지 및 메타 파티",
      bmHp: "체력 (HP)",
      bmAtk: "공격력 (ATK)",
      bmDef: "방어력 (DEF)",
      bmEm: "원소 마스터리 (EM)",
      bmEr: "원소 충전 효율 (ER)",
      recBadge: "추천",
      optBadge: "최적"
    }
  };
  const tc = TC_CARD_I18N[state.lang] || TC_CARD_I18N.es;

  function trBuildStr(text) {
    if (typeof window.trBuildStr === "function") {
      return window.trBuildStr(text, state.lang);
    }
    if (!text || state.lang === "es") return text || "";
    let s = String(text);
    const map = {
      en: [
        [/4 piezas/gi, "4-Piece"],
        [/2 piezas/gi, "2-Piece"],
        [/Mejor F2P/gi, "Best F2P"],
        [/Opciones 5★/gi, "5★ Options"],
        [/Opciones 4★/gi, "4★ Options"],
        [/Arma BiS/gi, "BiS Weapon"],
        [/Prob\. Crítica/gi, "CRIT Rate"],
        [/Daño Crítico/gi, "CRIT DMG"],
        [/Recarga de Energía%/gi, "Energy Recharge%"],
        [/Recarga%/gi, "ER%"],
        [/Maestría Elemental/gi, "Elemental Mastery"],
        [/Bono Daño/gi, "DMG Bonus"],
        [/Bono Curación/gi, "Healing Bonus"],
        [/Habilidad Elemental/gi, "Elemental Skill"],
        [/Definitiva/gi, "Elemental Burst"],
        [/Ataques Normales/gi, "Normal Attacks"],
        [/Ataque Normal/gi, "Normal Attack"],
        [/Escala con/gi, "Scales with"],
        [/Cualquiera/gi, "Any"],
        [/ATQ%/g, "ATK%"],
        [/Vida%/gi, "HP%"]
      ],
      pt: [
        [/4 piezas/gi, "4 Peças"],
        [/2 piezas/gi, "2 Peças"],
        [/Mejor F2P/gi, "Melhor F2P"],
        [/Opciones 5★/gi, "Opções 5★"],
        [/Opciones 4★/gi, "Opções 4★"],
        [/Prob\. Crítica/gi, "Taxa Crítica"],
        [/Daño Crítico/gi, "Dano Crítico"],
        [/Recarga de Energía%/gi, "Recarga de Energia%"],
        [/Maestría Elemental/gi, "Proficiência Elemental"],
        [/Bono Daño/gi, "Bônus de Dano"],
        [/Bono Curación/gi, "Bônus de Cura"],
        [/Habilidad Elemental/gi, "Habilidade Elemental"],
        [/Definitiva/gi, "Supremo"],
        [/Ataques Normales/gi, "Ataques Normais"],
        [/Cualquiera/gi, "Qualquer"]
      ],
      ja: [
        [/4 piezas/gi, "4セット"],
        [/2 piezas/gi, "2セット"],
        [/Mejor F2P/gi, "無課金最適"],
        [/Opciones 5★/gi, "★5候補"],
        [/Opciones 4★/gi, "★4候補"],
        [/Prob\. Crítica/gi, "会心率"],
        [/Daño Crítico/gi, "会心ダメージ"],
        [/Recarga de Energía%/gi, "元素チャージ効率%"],
        [/Recarga%/gi, "元チャ効率%"],
        [/Maestría Elemental/gi, "元素熟知"],
        [/Bono Daño/gi, "ダメージバフ"],
        [/Bono Curación/gi, "与える治療効果"],
        [/Habilidad Elemental/gi, "元素スキル"],
        [/Definitiva/gi, "元素爆発"],
        [/Ataques Normales/gi, "通常攻撃"],
        [/Ataque Normal/gi, "通常攻撃"],
        [/Cualquiera/gi, "自由"],
        [/ATQ%/g, "攻撃力%"],
        [/Vida%/gi, "HP%"]
      ],
      ko: [
        [/4 piezas/gi, "4세트"],
        [/2 piezas/gi, "2세트"],
        [/Mejor F2P/gi, "무과금 종결"],
        [/Opciones 5★/gi, "5★ 옵션"],
        [/Opciones 4★/gi, "4★ 옵션"],
        [/Prob\. Crítica/gi, "치명타 확률"],
        [/Daño Crítico/gi, "치명타 피해"],
        [/Recarga de Energía%/gi, "원소 충전 효율%"],
        [/Recarga%/gi, "원충%"],
        [/Maestría Elemental/gi, "원소 마스터리"],
        [/Bono Daño/gi, "피해 보너스"],
        [/Bono Curación/gi, "치유 보너스"],
        [/Habilidad Elemental/gi, "원소전투 스킬"],
        [/Definitiva/gi, "원소폭발"],
        [/Ataques Normales/gi, "일반 공격"],
        [/Ataque Normal/gi, "일반 공격"],
        [/Cualquiera/gi, "자유"],
        [/ATQ%/g, "공격력%"],
        [/Vida%/gi, "HP%"]
      ]
    }[state.lang] || [];
    map.forEach(([rgx, rep]) => { s = s.replace(rgx, rep); });
    return s;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:2.5rem 1rem;background:var(--bg-card);border-radius:12px;color:var(--text-muted);border:1px dashed rgba(255,255,255,0.15);">
        <p style="font-size:1.15rem;font-weight:700;color:var(--gold-bright);display:flex;align-items:center;justify-content:center;gap:0.45rem;"><img src="assets/ui/sparkle.svg" style="width:16px;height:16px;" alt="" /> ${escapeHtml(tc.noMatchTitle)}</p>
        <p style="font-size:0.86rem;margin-top:0.35rem;">${escapeHtml(tc.noMatchSub)}</p>
      </div>
    `;
    return;
  }

  filtered.forEach((ch) => {
    const cName = ch.name[state.lang] || ch.name.es || ch.name.en;
    const rawRole = typeof ch.role === "object" ? (ch.role[state.lang] || ch.role.es || ch.role.en) : ch.role;
    const cRole = trBuildStr(rawRole);

    // Armas recomendadas con Foto y Rareza Oficial
    let weaponsHtml = "";
    if (ch.bestWeapons && ch.bestWeapons.length > 0) {
      weaponsHtml = ch.bestWeapons.map((w) => {
        const meta = getWeaponDisplayData(w.name, w.rarity || 5, ch.weaponType, w.weaponId);
        const starsStr = "★".repeat(meta.rarity || 5);
        const dispWName = (typeof getWeaponTranslatedName === "function") ? getWeaponTranslatedName(w.name, state.lang) : w.name;
        return `
          <div class="tc-weapon-item">
            <div class="tc-weap-icon-wrap rar-${meta.rarity || 5}" title="${meta.rarity || 5}★">
              <img src="${meta.icon}" alt="${dispWName}" class="tc-weap-img" onerror="this.src='${getWeaponFallbackIcon(ch.weaponType)}'" />
              <span class="tc-weap-stars">${starsStr}</span>
            </div>
            <div class="tc-weap-content">
              <div class="tc-weapon-header">
                <span class="tc-weapon-name">${dispWName}</span>
                <span class="tc-weapon-badge ${w.type && w.type.includes('BiS') ? 'bis' : ''}">${trBuildStr((w.type || tc.recBadge).replace(/\s*Game8\b/gi, '').trim() || tc.recBadge)}</span>
              </div>
              <div class="tc-weapon-note">${trBuildStr(w.reviewedNote === false ? '' : (w.note || ''))}</div>
            </div>
          </div>
        `;
      }).join("");
    } else if (ch.weaponRanking) {
      weaponsHtml = ch.weaponRanking.map((w) => {
        const meta = getWeaponDisplayData(w.weapon, 5, ch.weaponType);
        const dispWName = (typeof getWeaponTranslatedName === "function") ? getWeaponTranslatedName(w.weapon, state.lang) : w.weapon;
        return `
          <div class="tc-weapon-item">
            <div class="tc-weap-icon-wrap rar-${meta.rarity || 5}">
              <img src="${meta.icon}" alt="${dispWName}" class="tc-weap-img" onerror="this.src='${getWeaponFallbackIcon(ch.weaponType)}'" />
              <span class="tc-weap-stars">${'★'.repeat(meta.rarity || 5)}</span>
            </div>
            <div class="tc-weap-content">
              <div class="tc-weapon-header">
                <span class="tc-weapon-name">${dispWName}</span>
                <span class="tc-weapon-badge">${trBuildStr(w.dps)}</span>
              </div>
              <div class="tc-weapon-note">${trBuildStr(w.reviewedNote === false ? '' : (w.note || ''))}</div>
            </div>
          </div>
        `;
      }).join("");
    }

    // Sets de Artefactos con Foto de la Flor/Reliquia y Bonos
    let artifactsHtml = "";
    if (ch.bestArtifacts && ch.bestArtifacts.length > 0) {
      artifactsHtml = ch.bestArtifacts.map((a) => {
        const aIcon = getArtifactSetIcon(a.set);
        const pieceGroups = getArtifactPieceGroups(a.set);
        const pieceBadge = pieceGroups.length === 2 ? "2p+2p" : pieceGroups.length === 1 ? "2p" : "4p";
        const dispASet = pieceGroups.length === 2 ? getArtifactPieceCopy(state.lang).title : (typeof getArtifactTranslatedName === "function") ? getArtifactTranslatedName(a.set, state.lang) : trBuildStr(a.set);
        return `
          <div class="tc-artifact-set-item">
            <div class="tc-arti-icon-wrap" title="${dispASet}">
              <img src="${aIcon}" alt="${dispASet}" class="tc-arti-img" onerror="this.onerror=null;this.style.display='none'" />
              <span class="tc-arti-piece-badge">${pieceBadge}</span>
            </div>
            <div class="tc-arti-content">
              <div class="tc-artifact-set-title">
                <strong>${dispASet}</strong>
                <span class="tc-arti-role-badge">${trBuildStr(/indiscutible|absoluto|oficial/i.test(a.type || '') ? 'Opción por rol' : (a.type || a.role || tc.optBadge))}</span>
              </div>
              ${renderArtifactPieceDetails(pieceGroups, state.lang)}
              <div class="tc-artifact-set-desc">${trBuildStr(a.reviewedBonus === false ? '' : (a.bonus || a.dps || ''))}</div>
            </div>
          </div>
        `;
      }).join("");
    } else if (ch.artifactRanking) {
      artifactsHtml = ch.artifactRanking.map((a) => {
        const aIcon = getArtifactSetIcon(a.set);
        const pieceGroups = getArtifactPieceGroups(a.set);
        const dispASet = pieceGroups.length === 2 ? getArtifactPieceCopy(state.lang).title : (typeof getArtifactTranslatedName === "function") ? getArtifactTranslatedName(a.set, state.lang) : trBuildStr(a.set);
        return `
          <div class="tc-artifact-set-item">
            <div class="tc-arti-icon-wrap">
              <img src="${aIcon}" alt="${dispASet}" class="tc-arti-img" onerror="this.onerror=null;this.style.display='none'" />
              <span class="tc-arti-piece-badge">${pieceGroups.length === 2 ? "2p+2p" : pieceGroups.length === 1 ? "2p" : "4p"}</span>
            </div>
            <div class="tc-arti-content">
              <div class="tc-artifact-set-title">
                <strong>${dispASet}</strong>
                <span class="tc-arti-role-badge">${trBuildStr(a.dps)}</span>
              </div>
              ${renderArtifactPieceDetails(pieceGroups, state.lang)}
            </div>
          </div>
        `;
      }).join("");
    }

    // Main Stats con soporte para mainStats y statPriority, y fallback inteligente por tipo de escalado
    const mStats = ch.mainStats || ch.statPriority || {};
    const defaultSands = (ch.scalingType === "HP" || ch.scalingType === "Vida")
      ? "Vida%"
      : ((ch.scalingType === "DEF" || ch.scalingType === "Defensa")
        ? "DEF%"
        : ((ch.scalingType === "EM" || ch.scalingType === "Maestría Elemental")
          ? "Maestría Elemental"
          : "ATQ%"));
    const sands = trBuildStr(mStats.sands || defaultSands);
    const goblet = trBuildStr(mStats.goblet || (mStats.cup) || `Bono Daño ${ch.element}%`);
    const circlet = trBuildStr(mStats.circlet || (mStats.crown) || "Prob. Crítica / Daño Crítico");

    // Substats Priority
    let substatsHtml = "";
    if (ch.substatsPriority && ch.substatsPriority.length > 0) {
      substatsHtml = ch.substatsPriority.map((s) => `
        <div class="tc-substat-row ${(s.includes('❌') || s.includes('✕')) ? 'dead-stat' : ''}">${trBuildStr(s.replace(/❌/g, '✕'))}</div>
      `).join("");
    }

    // Talent Priority
    const talentPrio = trBuildStr(ch.talentPriority || "Prioridad pendiente de contraste para este rol");
    const travelerTalentNotes = {
      es: "Talento adicional de Nod-Krai: se desbloquea al completar la misión de Arconte «Luna verdadera». Cada elemento con el que hayas resonado aporta estadísticas adicionales y habilita un ataque cargado especial con condiciones propias. Ajusta las estadísticas del equipo según los bonos ya desbloqueados.",
      en: "Nod-Krai additional talent: unlocked by completing the Archon Quest ‘True Moon’. Each element you have resonated with grants extra stats, and each elemental form has a special Charged Attack with its own conditions. Adjust your build for the bonuses you have unlocked.",
      pt: "Talento adicional de Nod-Krai: desbloqueado ao concluir a Missão do Arconte ‘Lua Verdadeira’. Cada elemento com que você ressoou concede atributos extras, e cada forma elemental tem um Ataque Carregado especial com suas próprias condições. Ajuste a build aos bônus desbloqueados.",
      ja: "ナド・クライの追加天賦：魔神任務「真月」クリア後に解放。共鳴した元素ごとにステータスが上昇し、元素ごとに条件の異なる特殊な重撃を使用できます。解放済みの効果に合わせて装備を調整してください。",
      ko: "노드크라이 추가 특성: 마신 임무 ‘진월’ 완료 후 해금됩니다. 공명한 원소마다 추가 능력치를 얻고, 원소별 조건을 충족하면 특별한 강공격을 사용할 수 있습니다. 해금한 보너스에 맞춰 세팅을 조정하세요."
    };
    const travelerTalentNote = ch.id.startsWith("traveler_") ? (travelerTalentNotes[state.lang] || travelerTalentNotes.es) : "";

    // Benchmarks (con soporte seguro para benchmarks y recommendedPanel)
    let benchmarksHtml = "";
    const bmData = ch.benchmarks || ch.recommendedPanel;
    if (bmData && !ch.review?.hideUnverifiedBenchmarks) {
      const bHp = bmData.hp || bmData.VIDA || bmData.HP || 'Cualquiera';
      const bAtk = bmData.atk || bmData.ATQ || bmData.ATK || 'Base';
      const bDef = bmData.def || bmData.DEF || bmData.DEFENSA || 'Base';
      const bEm = bmData.em || bmData.EM || bmData.MAESTRÍA || bmData.MAESTRIA || '0';
      const bEr = bmData.er || bmData.RECARGA || bmData.ER || '120%';
      const bCrit = bmData.crit || bmData.CRÍTICOS || bmData.CRÍTICO || bmData['DAÑO CRÍTICO'] || '60/120';

      benchmarksHtml = `
        <div class="tc-benchmarks-list">
          <div class="tc-bm-pill"><div class="tc-bm-lbl">${escapeHtml(tc.bmHp)}</div><div class="tc-bm-val">${trBuildStr(bHp)}</div></div>
          <div class="tc-bm-pill"><div class="tc-bm-lbl">${escapeHtml(tc.bmAtk)}</div><div class="tc-bm-val">${trBuildStr(bAtk)}</div></div>
          <div class="tc-bm-pill"><div class="tc-bm-lbl">${escapeHtml(tc.bmDef)}</div><div class="tc-bm-val">${trBuildStr(bDef)}</div></div>
          <div class="tc-bm-pill"><div class="tc-bm-lbl">${escapeHtml(tc.bmEm)}</div><div class="tc-bm-val">${trBuildStr(bEm)}</div></div>
          <div class="tc-bm-pill"><div class="tc-bm-lbl">${escapeHtml(tc.bmEr)}</div><div class="tc-bm-val">${trBuildStr(bEr)}</div></div>
          <div class="tc-bm-pill"><div class="tc-bm-lbl">CRIT Rate/DMG</div><div class="tc-bm-val">${trBuildStr(bCrit)}</div></div>
        </div>
      `;
    }


    // Meta Teams con mini avatares
    let teamsHtml = "";
    if (ch.metaTeams && ch.metaTeams.length > 0) {
      teamsHtml = ch.metaTeams.map(tm => {
        const members = Array.isArray(tm.members)
          ? tm.members
          : (tm.comp ? tm.comp.split(/[•·,/]| {2,}/).map(s => s.trim()).filter(Boolean) : []);
        const membersHtml = members.map(mem => {
          const avatar = getCharacterTeammateAvatar(mem);
          const dispMem = (typeof getCharacterTranslatedName === "function") ? getCharacterTranslatedName(mem, state.lang) : mem;
          return `
            <div class="tc-team-member" title="${dispMem}">
              ${avatar ? `<img src="${avatar}" alt="${dispMem}" class="tc-team-avatar" onerror="this.style.display='none'" />` : ''}
              <span class="tc-team-mem-name">${dispMem}</span>
            </div>
          `;
        }).join("");

        return `
          <div class="tc-team-row">
            <span class="tc-team-name"><img src="assets/weapon_types/sword.png" style="width:13px;height:13px;vertical-align:-1px;margin-right:4px;" alt="" />${trBuildStr(tm.name)}</span>
            <div class="tc-team-members-row">${membersHtml}</div>${tm.note ? `<p class="tc-review-note">${escapeHtml(tm.note)}</p>` : ""}
          </div>
        `;
      }).join("");
    }

    const weapBadgeText = (typeof getWeaponTypeLabel === "function") ? getWeaponTypeLabel(ch.weaponType || "Sword") : (ch.weaponType || "Sword");

    const card = document.createElement("div");
    card.className = "tc-card";
    card.innerHTML = `
      <div class="tc-char-header">
        <div class="tc-avatar-group">
          <img src="${ch.icon}" alt="${cName}" class="tc-avatar" onerror="this.style.display='none'" />
          <div>
            <div style="display:flex;align-items:center;gap:0.55rem;flex-wrap:wrap;">
              <span class="book-title" style="font-size:1.35rem;">${cName}</span>
              <span class="el-badge el-${ch.element}"><img src="assets/elements/${(ch.element || 'Pyro').toLowerCase()}.png" alt="${ch.element}" class="tc-card-el-icon" />${ch.element}</span>
            </div>
            <div style="font-size:0.84rem;color:var(--text-muted);margin-top:0.15rem;">${cRole}</div>
            <span class="scaling-pill scale-${ch.scalingType}"><img src="assets/ui/sparkle.svg" style="width:11px;height:11px;vertical-align:-1px;margin-right:4px;" alt="" />${trBuildStr(ch.scalingLabel)}</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <span class="tc-card-wpn-badge">
            <img src="assets/weapon_types/${(ch.weaponType || 'Sword').toLowerCase()}.png" alt="${ch.weaponType}" class="tc-card-wpn-icon" />
            <span>${escapeHtml(weapBadgeText)}</span>
          </span>
        </div>
      </div>

      ${ch.baseStats ? `<details class="tc-original-facts"><summary>${escapeHtml((BASE_STATS_I18N[state.lang] || BASE_STATS_I18N.es).title)}</summary><div class="tc-original-values">${renderOriginalBuildFacts(ch)}</div></details>` : ""}

      <div class="tc-build-grid">
        <!-- COLUMNA 1: EQUIPAMIENTO ÓPTIMO (ARMAS Y ARTEFACTOS) -->
        <div>
          <div class="tc-block-title"><img src="assets/weapon_types/sword.png" style="width:16px;height:16px;vertical-align:-2px;margin-right:4px;" alt="" /> ${escapeHtml(tc.bestWeaps)}</div>
          ${weaponsHtml}

          <div class="tc-block-title" style="margin-top:0.9rem;"><img src="assets/ui/tab_domain.png" style="width:16px;height:16px;vertical-align:-2px;margin-right:4px;" alt="" /> ${escapeHtml(tc.bestArts)}</div>
          ${artifactsHtml}

          <div class="tc-block-title" style="margin-top:0.9rem;"><img src="assets/ui/sparkle.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> ${escapeHtml(tc.mainStats)}</div>
          <div class="tc-main-stats-grid">
            <div class="tc-stat-slot">
              <div class="tc-stat-slot-label"><img src="assets/ui/clock.svg" style="width:13px;height:13px;vertical-align:-1px;margin-right:3px;" alt="" /> ${escapeHtml(tc.sands)}</div>
              <div class="tc-stat-slot-val">${sands}</div>
            </div>
            <div class="tc-stat-slot">
              <div class="tc-stat-slot-label">${escapeHtml(tc.goblet)}</div>
              <div class="tc-stat-slot-val">${goblet}</div>
            </div>
            <div class="tc-stat-slot">
              <div class="tc-stat-slot-label"><img src="assets/ui/icon_crown.png" style="width:14px;height:14px;vertical-align:-2px;margin-right:3px;" alt="" /> ${escapeHtml(tc.circlet)}</div>
              <div class="tc-stat-slot-val">${circlet}</div>
            </div>
          </div>
        </div>

        <!-- COLUMNA 2: TALENTOS, SUBSTATS, BENCHMARKS Y EQUIPOS -->
        <div>
          <div class="tc-block-title"><img src="assets/ui/tab_talent.png" style="width:16px;height:16px;vertical-align:-2px;margin-right:4px;" alt="" /> ${escapeHtml(tc.talPrio)}</div>
          <div class="tc-talent-box">
            <div style="font-size:0.75rem;color:var(--text-muted);">${escapeHtml(tc.talSub)}</div>
            <div class="tc-talent-arrow-flow">${talentPrio}</div>
            ${travelerTalentNote ? `<p class="tc-review-note">${escapeHtml(travelerTalentNote)}</p>` : ""}
          </div>

          <div class="tc-block-title"><img src="assets/ui/clipboard.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> ${escapeHtml(tc.subPrio)}</div>
          <div class="tc-substats-chip-list">
            ${substatsHtml}
          </div>

          ${benchmarksHtml ? `<div class="tc-block-title"><img src="assets/ui/sparkle.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> ${escapeHtml(tc.benchmarks)}</div>${benchmarksHtml}` : ""}

          <div class="tc-block-title" style="margin-top:0.75rem;"><img src="assets/ui/user.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> ${escapeHtml(tc.teams)}</div>
          <div class="tc-teams-container">
            ${teamsHtml}
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function loadBuildIntoSimulator(charKey) {
  state.tcCharKey = charKey;
  const sel = document.getElementById("tcSimCharSelect");
  if (sel) sel.value = charKey;
  loadCharacterRecommendedStats(charKey);
  calculateFullCharacterTheorycraft();
  document.getElementById("sec-theory").scrollIntoView({ behavior: "smooth" });
  showSynthToast(`¡Cargadas estadísticas meta de ${charKey} en el Simulador de Daño!`);
}


/* =====================================================================
   PAIMON.MOE + UIGF v4.0 WISH COUNTER DASHBOARD (PASO 3)
   ===================================================================== */

let cachedFullWishResults = null;

function initWishCounterEvents() {
  document.getElementById("btnShareWishes").addEventListener("click", () => WishShare.open(cachedFullWishResults, state.lang));
  // 1. Abrir y Cerrar Drawer
  const btnToggle = document.getElementById("btnToggleImport");
  const drawer = document.getElementById("importDrawer");
  const btnClose = document.getElementById("btnCloseImportDrawer");
  if (btnToggle && drawer) {
    btnToggle.addEventListener("click", () => {
      drawer.classList.toggle("open");
      const fileWarn = document.getElementById("fileProtocolWarning");
      if (fileWarn) {
        fileWarn.style.display = (window.location.protocol === "file:") ? "block" : "none";
      }
    });
  }
  if (btnClose && drawer) {
    btnClose.addEventListener("click", () => drawer.classList.remove("open"));
  }

  // 2. Tabs del Drawer de Importación (PowerShell, JSON, Manual)
  const tabBtns = document.querySelectorAll(".import-tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.importTab;
      document.getElementById("importPanelPs").style.display = target === "powershell" ? "block" : "none";
      document.getElementById("importPanelJson").style.display = target === "json" ? "block" : "none";
      document.getElementById("importPanelManual").style.display = target === "manual" ? "block" : "none";
    });
  });

  // 3. Copiar comando de PowerShell
  const btnCopy = document.getElementById("btnCopyPs");
  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      const code = document.getElementById("psCommandText").textContent;
      navigator.clipboard.writeText(code).then(() => {
        btnCopy.innerHTML = '<img src="assets/ui/check.svg" style="width:13px;height:13px;vertical-align:-2px;margin-right:4px;" alt="" /> ¡Copiado!';
        setTimeout(() => { btnCopy.innerHTML = '<img src="assets/ui/clipboard.svg" style="width:13px;height:13px;vertical-align:-2px;margin-right:4px;" alt="" /> Copiar'; }, 2000);
      });
    });
  }

  // 4. Pegar enlace o datos JSON desde portapapeles
  const btnPaste = document.getElementById("btnPasteClipboard");
  if (btnPaste) {
    btnPaste.addEventListener("click", async () => {
      const msgEl = document.getElementById("importStatusMsg");
      try {
        const text = await navigator.clipboard.readText();
        const trimmed = (text || "").trim();
        const isJson = trimmed.startsWith("{") || trimmed.startsWith("[") || trimmed.includes('"uigf_version"') || trimmed.includes('"list"');
        const isUrl = trimmed.includes("authkey=");

        if (isJson || isUrl) {
          document.getElementById("wishUrlInput").value = trimmed;
          msgEl.style.color = "#4ade80";
          if (isJson) {
            msgEl.innerHTML = '<img src="assets/ui/check.svg" style="width:13px;height:13px;vertical-align:-2px;margin-right:4px;" alt="" /> ¡Deseos detectados en el portapapeles! Haz clic en <strong>Importar Deseos</strong>.';
          } else {
            msgEl.innerHTML = '<img src="assets/ui/check.svg" style="width:13px;height:13px;vertical-align:-2px;margin-right:4px;" alt="" /> Enlace con authkey detectado en tu portapapeles.';
          }
        } else {
          msgEl.style.color = "#f87171";
          msgEl.textContent = "El portapapeles no contiene tiradas ni enlace. Ejecuta primero el comando de PowerShell (Paso 1).";
        }
      } catch (err) {
        msgEl.style.color = "#facc15";
        msgEl.textContent = "Permiso de portapapeles no concedido por el navegador. Usa Ctrl + V para pegar.";
      }
    });
  }

  // 4b. Cargar deseos recién extraídos por el script
  const btnLoadRecent = document.getElementById("btnLoadRecentWishes");
  if (btnLoadRecent) {
    btnLoadRecent.addEventListener("click", handleLoadRecentWishes);
  }

  // 5. Procesar URL de deseos
  const btnParse = document.getElementById("btnParseWishUrl");
  if (btnParse) {
    btnParse.addEventListener("click", handleWishUrlImport);
  }

  // 5b. Borrado de deseos para pruebas de desarrollo
  const btnDevClear = document.getElementById("btnDevClearWishes");
  if (btnDevClear) {
    btnDevClear.addEventListener("click", handleDevClearWishes);
  }
  const btnHeaderClear = document.getElementById("btnHeaderClearWishes");
  if (btnHeaderClear) {
    btnHeaderClear.addEventListener("click", handleDevClearWishes);
  }

  // 6. Subir archivo Excel / JSON / CSV (Paimon.moe / UIGF v4.0)
  const jsonInput = document.getElementById("jsonFileInput");
  const btnBrowse = document.getElementById("btnBrowseJson");
  const dropzone = document.getElementById("jsonDropzone");
  if (btnBrowse && jsonInput) {
    btnBrowse.addEventListener("click", () => jsonInput.click());
  }
  if (jsonInput) {
    jsonInput.addEventListener("change", handleFileUpload);
  }
  if (dropzone) {
    dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
    dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processWishFile(e.dataTransfer.files[0]);
      }
    });
  }

  // 6b. Pegar texto/CSV copiado desde Paimon.moe
  const btnProcessCsv = document.getElementById("btnProcessCsvPaste");
  const btnPasteClipboardText = document.getElementById("btnPasteTextClipboard");
  if (btnProcessCsv) {
    btnProcessCsv.addEventListener("click", handlePasteCsvImport);
  }
  if (btnPasteClipboardText) {
    btnPasteClipboardText.addEventListener("click", async () => {
      try {
        const text = await navigator.clipboard.readText();
        const area = document.getElementById("csvPasteInput");
        if (area && text) {
          area.value = text;
        }
      } catch (err) {
        console.warn("No se pudo leer del portapapeles:", err);
      }
    });
  }

  // 7. Exportar backup UIGF v4.0
  const btnExport = document.getElementById("btnExportJson");
  if (btnExport) {
    btnExport.addEventListener("click", handleExportUIGF);
  }

  // 8. Registro Manual de 5★
  const btnManual = document.getElementById("btnAddManual5");
  if (btnManual) {
    btnManual.addEventListener("click", handleAddManual5Star);
  }

  // 9. Selector de Banners (Pestañas)
  const bannerTabs = document.querySelectorAll(".wish-banner-tab");
  bannerTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      bannerTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      state.activeWishBanner = tab.dataset.banner;
      setSpiriflyStorage("active_wish_banner", state.activeWishBanner);
      triggerDriveSyncStamp();
      state.wishTablePage = 1;
      renderWishesDashboard();
    });
  });

  // 10. Filtros y Búsqueda en la Tabla
  const searchInput = document.getElementById("wishSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.wishTableSearch = e.target.value.trim().toLowerCase();
      state.wishTablePage = 1;
      renderWishHistoryTable();
    });
  }
  const raritySelect = document.getElementById("wishRarityFilter");
  if (raritySelect) {
    raritySelect.addEventListener("change", (e) => {
      state.wishTableRarityFilter = e.target.value;
      state.wishTablePage = 1;
      renderWishHistoryTable();
    });
  }

  // 11. Paginación de Tabla
  const btnPrev = document.getElementById("btnWishPagePrev");
  const btnNext = document.getElementById("btnWishPageNext");
  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      if (state.wishTablePage > 1) {
        state.wishTablePage--;
        renderWishHistoryTable();
      }
    });
  }
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      state.wishTablePage++;
      renderWishHistoryTable();
    });
  }

  // 12. Acceso directo a Perfiles (en panel Google Drive)
  const btnGoProfiles = document.getElementById("btnGoToProfiles");
  if (btnGoProfiles) {
    btnGoProfiles.addEventListener("click", () => {
      const navSync = document.getElementById("navSync");
      if (navSync) navSync.click();
      const card = document.getElementById("cardProfileManager");
      if (card) card.scrollIntoView({ behavior: "smooth" });
    });
  }
}

/**
 * Genera el set semilla inicial desde DEFAULT_WISH_DATA para que la web
 * inicie con estadísticas de prueba ricas y coherentes.
 */
function getSeedWishesFromDefaultData() {
  const seed = [];
  const baseTime = new Date("2026-01-01T10:00:00Z").getTime();
  let counter = 0;

  // Personajes
  const charHistory = DEFAULT_WISH_DATA.character.history5 || [];
  let totalPullAcc = 0;
  for (let i = 0; i < charHistory.length; i++) {
    const h = charHistory[i];
    // Rellenar tiradas intermedias (3★ y 4★)
    for (let p = 1; p < h.pity; p++) {
      totalPullAcc++;
      counter++;
      const isFour = (p % 8 === 0);
      seed.push({
        id: "seed_char_" + counter,
        uid: "700123456",
        gacha_type: "301",
        item_id: "",
        count: "1",
        time: new Date(baseTime + totalPullAcc * 3600000).toISOString().replace("T", " ").substring(0, 19),
        name: isFour ? "Bennett" : "Garrote del Debate",
        lang: "es-es",
        item_type: isFour ? "Personaje" : "Arma",
        rank_type: isFour ? "4" : "3"
      });
    }
    // La tirada 5★
    totalPullAcc++;
    counter++;
    seed.push({
      id: "seed_char_" + counter,
      uid: "700123456",
      gacha_type: "301",
      item_id: "",
      count: "1",
      time: new Date(baseTime + totalPullAcc * 3600000).toISOString().replace("T", " ").substring(0, 19),
      name: h.name,
      lang: "es-es",
      item_type: "Personaje",
      rank_type: "5"
    });
  }

  // Tiradas actuales acumuladas sin 5★
  for (let p = 1; p <= DEFAULT_WISH_DATA.character.pity5; p++) {
    totalPullAcc++;
    counter++;
    const isFour = (p === DEFAULT_WISH_DATA.character.pity4);
    seed.push({
      id: "seed_char_" + counter,
      uid: "700123456",
      gacha_type: "301",
      item_id: "",
      count: "1",
      time: new Date(baseTime + totalPullAcc * 3600000).toISOString().replace("T", " ").substring(0, 19),
      name: isFour ? "Xingchiu" : "Espada de Hierro Blanco",
      lang: "es-es",
      item_type: isFour ? "Personaje" : "Arma",
      rank_type: isFour ? "4" : "3"
    });
  }

  // Armas
  const weapHistory = DEFAULT_WISH_DATA.weapon.history5 || [];
  for (let i = 0; i < weapHistory.length; i++) {
    const h = weapHistory[i];
    for (let p = 1; p < h.pity; p++) {
      counter++;
      seed.push({
        id: "seed_weap_" + counter,
        uid: "700123456",
        gacha_type: "302",
        item_id: "",
        count: "1",
        time: new Date(baseTime + counter * 3600000).toISOString().replace("T", " ").substring(0, 19),
        name: (p % 9 === 0) ? "Óxido" : "Tirachinas",
        lang: "es-es",
        item_type: "Arma",
        rank_type: (p % 9 === 0) ? "4" : "3"
      });
    }
    counter++;
    seed.push({
      id: "seed_weap_" + counter,
      uid: "700123456",
      gacha_type: "302",
      item_id: "",
      count: "1",
      time: new Date(baseTime + counter * 3600000).toISOString().replace("T", " ").substring(0, 19),
      name: h.name,
      lang: "es-es",
      item_type: "Arma",
      rank_type: "5"
    });
  }

  return seed;
}

/**
 * Renderizado maestro del Contador de Deseos y Tracker de Pity
 */
async function renderWishesDashboard() {
  if (!document.getElementById("sec-wishes")) return;

  // 1. Cargar deseos crudos estrictamente para el UID de la cuenta activa
  if (typeof WishEngine !== "undefined") {
    if (state.activeWishUid && state.activeWishUid !== "default") {
      let stored = await WishEngine.loadWishesFromStorage(state.activeWishUid);
      state.rawWishes = stored || [];
    } else {
      state.rawWishes = [];
    }
  } else {
    state.rawWishes = [];
  }

  // 2. Procesar con WishEngine
  const fullResult = WishEngine.processFullHistory(state.rawWishes);
  cachedFullWishResults = fullResult;
  WishShare.update(fullResult, state.lang);

  // 3. Actualizar Selector de Cuentas / UIDs
  const accSelect = document.getElementById("wishAccountSelect");
  if (accSelect) {
    const accounts = WishEngine.getStoredAccounts();
    if (accounts.length === 0) accounts.push(state.activeWishUid || "default");
    accSelect.innerHTML = accounts.map((uid) => `<option value="${uid}" ${uid === state.activeWishUid ? "selected" : ""}>UID: ${uid}</option>`).join("");
  }

  // 4. Actualizar subtítulos en las 4 pestañas de banner
  const bChar = fullResult.character.stats;
  const bWeap = fullResult.weapon.stats;
  const bStd = fullResult.standard.stats;
  const bChr = fullResult.chronicled.stats;

  const guarShort = { es: "Garantizado ↑", en: "Guaranteed ↑", pt: "Garantido ↑", ja: "確定 ↑", ko: "확정 ↑" }[state.lang] || "Garantizado ↑";
  const fpShort = { es: "1 Punto", en: "1 Fate Pt", pt: "1 Ponto", ja: "命定値1", ko: "운명 1pt" }[state.lang] || "1 Punto";
  const charBadge = document.getElementById("wbBadgeChar");
  if (charBadge) {
    charBadge.textContent = `Pity: ${bChar.currentPity5} | ${bChar.isGuaranteed ? guarShort : "50/50"}`;
  }
  const weapBadge = document.getElementById("wbBadgeWeap");
  if (weapBadge) {
    weapBadge.textContent = `Pity: ${bWeap.currentPity5} | ${bWeap.isGuaranteed ? guarShort : (bWeap.fatePoints ? fpShort : "75/25")}`;
  }
  const stdBadge = document.getElementById("wbBadgeStd");
  if (stdBadge) {
    stdBadge.textContent = `Pity: ${bStd.currentPity5} | Hard: 90`;
  }
  const chrBadge = document.getElementById("wbBadgeChr");
  if (chrBadge) {
    chrBadge.textContent = `Pity: ${bChr.currentPity5} | Hard: 90`;
  }

  // 5. Renderizar Banner Activo
  const activeData = fullResult[state.activeWishBanner] || fullResult.character;
  const stats = activeData.stats;
  const config = WishEngine.PITY_CONFIG[state.activeWishBanner] || WishEngine.PITY_CONFIG.character;

  // 6. Tarjetas KPI
  const t = (typeof I18N !== "undefined" && (I18N[state.lang] || I18N.es)) || {};
  const tw = t.wishes || {};
  const kpiGrid = document.getElementById("wishKpiGrid");
  if (kpiGrid) {
    const pctToHard = Math.min(100, (stats.currentPity5 / config.hardPity) * 100);
    const pctTo4 = Math.min(100, (stats.currentPity4 / 10) * 100);
    const guarBadge = stats.isGuaranteed
      ? `<span class="wish-status-badge badge-guar-active">${escapeHtml(tw.kpiGuar || "↑ 100% Garantizado")}</span>`
      : `<span class="wish-status-badge badge-5050-active">${escapeHtml(tw.kpi5050 || "50/50 Activo")}</span>`;

    kpiGrid.innerHTML = `
      <div class="wish-kpi-card gold">
        <div class="wish-kpi-header"><span>${escapeHtml(tw.kpi5Title || "5★ Pity Actual")}</span>${guarBadge}</div>
        <div class="wish-kpi-value-row">
          <span class="wish-kpi-big-num" style="color:#fbbf24;">${stats.currentPity5}</span>
          <span style="font-size:0.95rem;color:var(--text-muted);font-weight:700;">/ ${config.hardPity}</span>
        </div>
        <div class="wish-kpi-subtext">${escapeHtml(tw.kpiToSoft || "Faltan")} <strong>${stats.pullsToSoft}</strong> ${escapeHtml(tw.kpiForSoft || "para Soft Pity")} (${config.softPity})</div>
        <div class="wish-kpi-progress"><div class="wish-kpi-progress-fill fill-gold" style="width:${pctToHard}%;"></div></div>
      </div>

      <div class="wish-kpi-card purple">
        <div class="wish-kpi-header"><span>${escapeHtml(tw.kpi4Title || "4★ Pity Actual")}</span><span style="font-size:0.75rem;color:var(--text-muted);">${escapeHtml(tw.kpi4Guar || "Garantizado a 10")}</span></div>
        <div class="wish-kpi-value-row">
          <span class="wish-kpi-big-num" style="color:var(--fourstar-purple);">${stats.currentPity4}</span>
          <span style="font-size:0.95rem;color:var(--text-muted);font-weight:700;">/ 10</span>
        </div>
        <div class="wish-kpi-subtext">${escapeHtml(tw.kpi4Total || "Total 4★ obtenidos:")} <strong>${stats.fourStarsCount}</strong></div>
        <div class="wish-kpi-progress"><div class="wish-kpi-progress-fill fill-purple" style="width:${pctTo4}%;"></div></div>
      </div>

      <div class="wish-kpi-card blue">
        <div class="wish-kpi-header"><span>${escapeHtml(tw.kpiTotalPulls || "Tiradas Totales")}</span><span style="color:#60a5fa;font-weight:800;">✦</span></div>
        <div class="wish-kpi-value-row">
          <span class="wish-kpi-big-num" style="color:#ffffff;">${stats.totalPulls}</span>
          <span style="font-size:0.95rem;color:var(--text-muted);font-weight:700;">${escapeHtml(tw.kpiWishesWord || "deseos")}</span>
        </div>
        <div class="wish-kpi-subtext">${escapeHtml(tw.kpiInvest || "Inversión:")} <strong style="color:#93c5fd;">✦ ${stats.primoCost.toLocaleString()}</strong> ${escapeHtml(tw.kpiPrimos || "protogemas")}</div>
        <div style="font-size:0.72rem;color:var(--text-muted);margin-top:0.4rem;">${escapeHtml(tw.kpiEquiv || "Equivalente a")} ${Math.floor(stats.primoCost / 160)} ${escapeHtml(tw.kpiFates || "Destinos Entrelazados")}</div>
      </div>

      <div class="wish-kpi-card green">
        <div class="wish-kpi-header"><span>${escapeHtml(tw.kpiLuckTitle || "Rendimiento y Suerte")}</span><span style="color:#34d399;font-weight:800;">50/50: ${stats.win5050Pct}%</span></div>
        <div class="wish-kpi-value-row">
          <span class="wish-kpi-big-num" style="color:#34d399;">${stats.avg5Pity}</span>
          <span style="font-size:0.95rem;color:var(--text-muted);font-weight:700;">${escapeHtml(tw.kpiPullsPer5 || "tiradas / 5★")}</span>
        </div>
        <div class="wish-kpi-subtext">${escapeHtml(tw.kpiWon || "50/50 Ganados:")} <strong>${stats.won5050Count}</strong> | ${escapeHtml(tw.kpiLost || "Perdidos:")} <strong>${stats.lost5050Count}</strong></div>
        <div style="font-size:0.72rem;color:var(--text-muted);margin-top:0.4rem;">${escapeHtml(tw.kpiNextProb || "Probabilidad tirada")} #${stats.currentPity5 + 1}: <strong>${stats.nextPullProb}%</strong></div>
      </div>
    `;
  }

  // 7. Histograma de Suerte
  const luckCard = document.getElementById("cardLuckDistribution");
  if (luckCard && tw.luckDistTitle) {
    const hdrSpan = luckCard.querySelector(".paimon-card-header span");
    const hdrSmall = luckCard.querySelector(".paimon-card-header small");
    if (hdrSpan) hdrSpan.innerHTML = `<img src="assets/ui/sparkle.svg" class="seelie-inline-icon" alt="" /> ${escapeHtml(tw.luckDistTitle)}`;
    if (hdrSmall) hdrSmall.textContent = tw.luckDistSub || "";
  }
  const monthlyCard = document.getElementById("cardMonthlyTrend");
  if (monthlyCard && tw.monthlyTitle) {
    const mSpan = monthlyCard.querySelector(".paimon-card-header span:first-child");
    if (mSpan) mSpan.innerHTML = `<img src="assets/ui/calendar.svg" class="seelie-inline-icon" alt="" /> ${escapeHtml(tw.monthlyTitle)}`;
  }

  const histEl = document.getElementById("wishLuckHistogram");
  if (histEl) {
    const total5 = Math.max(1, stats.fiveStarsCount);
    const bEarlyPct = ((stats.luckBuckets.early / total5) * 100).toFixed(1);
    const bMidPct = ((stats.luckBuckets.mid / total5) * 100).toFixed(1);
    const bSoftPct = ((stats.luckBuckets.soft / total5) * 100).toFixed(1);
    const bHardPct = ((stats.luckBuckets.hard / total5) * 100).toFixed(1);

    histEl.innerHTML = `
      <div class="wish-histogram-row">
        <span class="wish-histogram-lbl"><img src="assets/ui/sparkle.svg" class="seelie-inline-icon" alt="" /> Early (1-30):</span>
        <div class="wish-histogram-track"><div class="wish-histogram-bar bar-early" style="width:${bEarlyPct}%;"></div></div>
        <span class="wish-histogram-count" style="color:#34d399;">${stats.luckBuckets.early} (${bEarlyPct}%)</span>
      </div>
      <div class="wish-histogram-row">
        <span class="wish-histogram-lbl"><img src="assets/ui/calendar.svg" class="seelie-inline-icon" alt="" /> Mid (${state.activeWishBanner === 'weapon' ? '31-62' : '31-73'}):</span>
        <div class="wish-histogram-track"><div class="wish-histogram-bar bar-mid" style="width:${bMidPct}%;"></div></div>
        <span class="wish-histogram-count" style="color:#60a5fa;">${stats.luckBuckets.mid} (${bMidPct}%)</span>
      </div>
      <div class="wish-histogram-row">
        <span class="wish-histogram-lbl"><img src="assets/ui/bolt.svg" class="seelie-inline-icon" alt="" /> Soft (${state.activeWishBanner === 'weapon' ? '63-73' : '74-82'}):</span>
        <div class="wish-histogram-track"><div class="wish-histogram-bar bar-soft" style="width:${bSoftPct}%;"></div></div>
        <span class="wish-histogram-count" style="color:#fbbf24;">${stats.luckBuckets.soft} (${bSoftPct}%)</span>
      </div>
      <div class="wish-histogram-row">
        <span class="wish-histogram-lbl"><img src="assets/ui/clock.svg" class="seelie-inline-icon" alt="" /> Hard (${state.activeWishBanner === 'weapon' ? '74-80' : '83-90'}):</span>
        <div class="wish-histogram-track"><div class="wish-histogram-bar bar-hard" style="width:${bHardPct}%;"></div></div>
        <span class="wish-histogram-count" style="color:#f87171;">${stats.luckBuckets.hard} (${bHardPct}%)</span>
      </div>
    `;
  }

  // 8. Gráfico Mensual SVG
  const chartEl = document.getElementById("wishMonthlyChartContainer");
  if (chartEl) {
    chartEl.innerHTML = buildMonthlyChartSvg(stats.monthlyChart);
  }

  // 9. Vitrina de 5★
  const countBadge = document.getElementById("wish5CountBadge");
  if (countBadge) {
    countBadge.textContent = `${stats.fiveStarsCount} ${tw.obtainedWord || "obtenidos"}`;
    const prevSpan = countBadge.previousElementSibling;
    if (prevSpan && tw.showcaseTitle) {
      prevSpan.innerHTML = `<img src="assets/ui/icon_primogem.png" style="width:18px;height:18px;" alt="" /> ${escapeHtml(tw.showcaseTitle)}`;
    }
  }

  const WISH_EXTRA_I18N = {
    es: {
      empty5: "No hay registros 5★ en este banner aún.",
      guar: "Garantizado",
      won: "Ganado",
      lost: "Perdido",
      won50: "Ganado 50/50",
      lost50: "Perdido 50/50",
      noPullsMatch: "No hay tiradas que coincidan con los filtros.",
      typeChar: "Personaje",
      typeWeap: "Arma",
      noMonthly: "No hay suficientes datos mensuales registrados.",
      avgPrefix: "Promedio:",
      perMonth: "tiradas/mes",
      recPrefix: "Récord:",
      pullsWord: "tiradas"
    },
    en: {
      empty5: "No 5★ records in this banner yet.",
      guar: "Guaranteed",
      won: "Won",
      lost: "Lost",
      won50: "Won 50/50",
      lost50: "Lost 50/50",
      noPullsMatch: "No pulls match the current filters.",
      typeChar: "Character",
      typeWeap: "Weapon",
      noMonthly: "Not enough monthly data recorded.",
      avgPrefix: "Average:",
      perMonth: "pulls/mo",
      recPrefix: "Record:",
      pullsWord: "pulls"
    },
    pt: {
      empty5: "Nenhum registro 5★ neste banner ainda.",
      guar: "Garantido",
      won: "Ganho",
      lost: "Perdido",
      won50: "Ganho 50/50",
      lost50: "Perdido 50/50",
      noPullsMatch: "Nenhuma oração corresponde aos filtros.",
      typeChar: "Personagem",
      typeWeap: "Arma",
      noMonthly: "Não há dados mensais suficientes registrados.",
      avgPrefix: "Média:",
      perMonth: "orações/mês",
      recPrefix: "Recorde:",
      pullsWord: "orações"
    },
    ja: {
      empty5: "この祈願にはまだ★5履歴がありません。",
      guar: "確定枠",
      won: "すり抜けなし",
      lost: "すり抜け",
      won50: "50/50 勝利",
      lost50: "すり抜け",
      noPullsMatch: "条件に一致する祈願履歴がありません。",
      typeChar: "キャラクター",
      typeWeap: "武器",
      noMonthly: "月別データがまだ十分ではありません。",
      avgPrefix: "月平均:",
      perMonth: "回/月",
      recPrefix: "最高記録:",
      pullsWord: "回"
    },
    ko: {
      empty5: "이 배너에는 아직 5★ 기록이 없습니다.",
      guar: "확정 천장",
      won: "픽뚫 없음",
      lost: "픽뚫",
      won50: "50/50 승리",
      lost50: "50/50 패배",
      noPullsMatch: "필터와 일치하는 기원 내역이 없습니다.",
      typeChar: "캐릭터",
      typeWeap: "무기",
      noMonthly: "월별 데이터가 충분하지 않습니다.",
      avgPrefix: "월 평균:",
      perMonth: "회/월",
      recPrefix: "최고 기록:",
      pullsWord: "회"
    }
  };
  const we = WISH_EXTRA_I18N[state.lang] || WISH_EXTRA_I18N.es;

  const showcaseEl = document.getElementById("wish5StarShowcase");
  if (showcaseEl) {
    if (stats.fiveStarHistory.length === 0) {
      showcaseEl.innerHTML = `<span style="font-size:0.8rem;color:var(--text-muted);font-style:italic;">${escapeHtml(we.empty5)}</span>`;
    } else {
      showcaseEl.innerHTML = stats.fiveStarHistory.map((h) => {
        let condBadge = "";
        if (h.isCapturingRadiance) {
          condBadge = `<span class="badge-mechanic radiance"><img src="assets/ui/sparkle.svg" style="width:11px;height:11px;vertical-align:-1px;margin-right:2px;" alt="" /> Radiance</span>`;
        } else if (h.isGuaranteed) {
          condBadge = `<span class="badge-mechanic guar">${escapeHtml(we.guar)}</span>`;
        } else if (h.isWon5050 === true || h.isWon7525 === true) {
          condBadge = `<span class="badge-mechanic won"><img src="assets/ui/check.svg" style="width:10px;height:10px;vertical-align:-1px;margin-right:2px;" alt="" /> ${escapeHtml(we.won)}</span>`;
        } else if (h.isWon5050 === false || h.isWon7525 === false) {
          condBadge = `<span class="badge-mechanic lost">${escapeHtml(we.lost)}</span>`;
        }
        return `
          <span class="h-pill">
            <strong>${escapeHtml(h.name)}</strong>
            <span class="p-num ${getPityClass(h.pity)}">${h.pity}</span>
            ${condBadge}
          </span>
        `;
      }).join("");
    }
  }

  // 10. Tabla de Historial Paginada
  renderWishHistoryTable();

}

/**
 * Renderizado de la tabla paginada y filtrada del historial de deseos
 */
function renderWishHistoryTable() {
  if (!cachedFullWishResults) return;

  const t = (typeof I18N !== "undefined" && (I18N[state.lang] || I18N.es)) || {};
  const tw = t.wishes || {};
  const WISH_TBL_I18N = {
    es: { guar: "Garantizado", won50: "Ganado 50/50", lost50: "Perdido 50/50", noMatch: "No hay tiradas que coincidan con los filtros.", char: "Personaje", weap: "Arma" },
    en: { guar: "Guaranteed", won50: "Won 50/50", lost50: "Lost 50/50", noMatch: "No pulls match the filters.", char: "Character", weap: "Weapon" },
    pt: { guar: "Garantido", won50: "Ganho 50/50", lost50: "Perdido 50/50", noMatch: "Nenhuma oração corresponde aos filtros.", char: "Personagem", weap: "Arma" },
    ja: { guar: "確定枠", won50: "50/50 勝利", lost50: "すり抜け", noMatch: "条件に一致する履歴がありません。", char: "キャラクター", weap: "武器" },
    ko: { guar: "확정 천장", won50: "50/50 승리", lost50: "50/50 패배", noMatch: "필터와 일치하는 내역이 없습니다.", char: "캐릭터", weap: "무기" }
  };
  const wt = WISH_TBL_I18N[state.lang] || WISH_TBL_I18N.es;

  const activeData = cachedFullWishResults[state.activeWishBanner] || cachedFullWishResults.character;
  const list = activeData.processedList || [];

  // Filtrado
  const search = state.wishTableSearch || "";
  const rarity = state.wishTableRarityFilter || "ALL";

  const filtered = list.filter((item) => {
    if (rarity !== "ALL" && String(item.rank_type) !== rarity) return false;
    if (search && !item.name.toLowerCase().includes(search)) return false;
    return true;
  });

  const countEl = document.getElementById("wishTableCount");
  if (countEl) {
    countEl.textContent = `(${filtered.length} ${tw.pullsWord || "tiradas"})`;
    const titleSpan = countEl.previousElementSibling;
    if (titleSpan && tw.tableTitle) {
      titleSpan.innerHTML = `<img src="assets/ui/clipboard.svg" class="seelie-inline-icon" alt="" /> ${escapeHtml(tw.tableTitle)}`;
    }
  }

  // Paginación (20 por página)
  const pageSize = 20;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (state.wishTablePage > totalPages) state.wishTablePage = totalPages;
  if (state.wishTablePage < 1) state.wishTablePage = 1;

  const pageIndicator = document.getElementById("wishPageIndicator");
  if (pageIndicator) {
    pageIndicator.textContent = `${tw.pageWord || "Página"} ${state.wishTablePage} ${tw.ofWord || "de"} ${totalPages}`;
  }

  const btnPrev = document.getElementById("btnWishPagePrev");
  const btnNext = document.getElementById("btnWishPageNext");
  if (btnPrev) btnPrev.disabled = state.wishTablePage <= 1;
  if (btnNext) btnNext.disabled = state.wishTablePage >= totalPages;

  const startIndex = (state.wishTablePage - 1) * pageSize;
  const pageItems = filtered.slice(startIndex, startIndex + pageSize);

  const tbody = document.getElementById("wishTableBody");
  if (!tbody) return;

  if (pageItems.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-muted);font-style:italic;">${escapeHtml(wt.noMatch)}</td></tr>`;
    return;
  }

  tbody.innerHTML = pageItems.map((wish) => {
    const rank = String(wish.rank_type || "3");
    let rarityBadge = `<span class="badge-rarity star3">3★</span>`;
    if (rank === "5") rarityBadge = `<span class="badge-rarity star5">5★</span>`;
    if (rank === "4") rarityBadge = `<span class="badge-rarity star4">4★</span>`;

    let pityDisplay = "-";
    if (rank === "5") {
      let pClass = "mid";
      if (wish.pity <= 30) pClass = "early";
      else if (wish.pity <= 73) pClass = "mid";
      else if (wish.pity <= 82) pClass = "soft";
      else pClass = "hard";
      pityDisplay = `<span class="pity-pill-highlight ${pClass}">${wish.pity}</span>`;
    } else if (rank === "4") {
      pityDisplay = `<span style="font-weight:700;color:var(--fourstar-purple);">${wish.pity4}</span>`;
    }

    let mechBadge = "";
    if (rank === "5") {
      if (wish.isCapturingRadiance) {
        mechBadge = `<span class="badge-mechanic radiance"><img src="assets/ui/sparkle.svg" style="width:11px;height:11px;vertical-align:-1px;margin-right:2px;" alt="" /> Radiance (5.0+)</span>`;
      } else if (wish.isGuaranteed) {
        mechBadge = `<span class="badge-mechanic guar">${escapeHtml(wt.guar)}</span>`;
      } else if (wish.isWon5050 === true || wish.isWon7525 === true) {
        mechBadge = `<span class="badge-mechanic won"><img src="assets/ui/check.svg" style="width:10px;height:10px;vertical-align:-1px;margin-right:2px;" alt="" /> ${escapeHtml(wt.won50)}</span>`;
      } else if (wish.isWon5050 === false || wish.isWon7525 === false) {
        mechBadge = `<span class="badge-mechanic lost">${escapeHtml(wt.lost50)}</span>`;
      }
    }

    const itemNameStyle = rank === "5" ? "color:#fbbf24;font-weight:800;" : (rank === "4" ? "color:var(--fourstar-purple);font-weight:700;" : "color:#e2e8f0;");
    const rawType = wish.item_type || (rank === "5" ? "Personaje" : "Arma");
    const localizedType = (rawType === "Personaje" || rawType === "Character") ? wt.char : ((rawType === "Arma" || rawType === "Weapon") ? wt.weap : rawType);

    return `
      <tr>
        <td style="font-weight:800;font-size:0.82rem;color:var(--text-muted);">${pityDisplay}</td>
        <td>${rarityBadge}</td>
        <td style="${itemNameStyle}">${escapeHtml(wish.name)}</td>
        <td style="color:var(--text-muted);font-size:0.78rem;">${escapeHtml(localizedType)}</td>
        <td style="color:var(--text-muted);font-size:0.75rem;font-family:Consolas,monospace;">${escapeHtml(wish.time || '-')}</td>
        <td style="text-align:right;">${mechBadge}</td>
      </tr>
    `;
  }).join("");
}

function buildMonthlyChartSvg(monthlyData) {
  const CHART_I18N = {
    es: { noData: "No hay suficientes datos mensuales registrados.", avg: "Promedio:", perMo: "tiradas/mes", rec: "Récord:", pulls: "tiradas" },
    en: { noData: "Not enough monthly data recorded.", avg: "Average:", perMo: "pulls/mo", rec: "Record:", pulls: "pulls" },
    pt: { noData: "Não há dados mensais suficientes.", avg: "Média:", perMo: "orações/mês", rec: "Recorde:", pulls: "orações" },
    ja: { noData: "月別データがまだ十分ではありません。", avg: "月平均:", perMo: "回/月", rec: "最高記録:", pulls: "回" },
    ko: { noData: "월별 데이터가 충분하지 않습니다.", avg: "월 평균:", perMo: "회/월", rec: "최고 기록:", pulls: "회" }
  };
  const ci = CHART_I18N[state.lang] || CHART_I18N.es;

  if (!monthlyData || monthlyData.length === 0) {
    return `<div style="text-align:center;padding:2rem;color:var(--text-muted);font-size:0.85rem;">${escapeHtml(ci.noData)}</div>`;
  }

  // Dimensiones responsivas sobrias
  const width = 560;
  const height = 185;
  const padLeft = 38;
  const padBottom = 30;
  const padTop = 18;
  const padRight = 18;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const maxVal = Math.max(50, ...monthlyData.map((d) => d.pulls || 0));
  const yTicksCount = 4;
  const yStep = Math.ceil(maxVal / yTicksCount / 25) * 25 || 25;
  const yMax = yStep * yTicksCount;

  const monthNames = {
    "01": "01", "02": "02", "03": "03", "04": "04",
    "05": "05", "06": "06", "07": "07", "08": "08",
    "09": "09", "10": "10", "11": "11", "12": "12"
  };
  if (state.lang === "es" || state.lang === "pt") {
    Object.assign(monthNames, { "01": "Ene", "02": "Feb", "03": "Mar", "04": "Abr", "05": "May", "06": "Jun", "07": "Jul", "08": "Ago", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dic" });
  } else if (state.lang === "en") {
    Object.assign(monthNames, { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" });
  }

  const points = monthlyData.map((d, i) => {
    const x = padLeft + (i / Math.max(1, monthlyData.length - 1)) * plotW;
    const y = padTop + plotH - ((d.pulls || 0) / yMax) * plotH;
    const parts = (d.month || "").split("-");
    const mLabel = (monthNames[parts[1]] || parts[1]) + "/" + (parts[0] ? parts[0].substring(2) : "");
    return {
      x, y,
      month: d.month,
      label: mLabel,
      pulls: d.pulls || 0,
      star5: d.star5 || 0,
      star4: d.star4 || 0
    };
  });

  // Generar curva suave SVG (Spline cúbica suave)
  let pathD = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  if (points.length === 1) {
    pathD += ` L ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  } else {
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      pathD += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
  }

  const lastPt = points[points.length - 1];
  const areaD = `${pathD} L ${lastPt.x.toFixed(1)} ${(padTop + plotH).toFixed(1)} L ${points[0].x.toFixed(1)} ${(padTop + plotH).toFixed(1)} Z`;

  // Líneas de cuadrícula horizontales
  let gridLinesSvg = "";
  for (let step = 0; step <= yTicksCount; step++) {
    const val = step * yStep;
    const yPos = padTop + plotH - (val / yMax) * plotH;
    gridLinesSvg += `
      <line x1="${padLeft}" y1="${yPos.toFixed(1)}" x2="${width - padRight}" y2="${yPos.toFixed(1)}" stroke="rgba(255, 255, 255, 0.07)" stroke-dasharray="3,3" />
      <text x="${padLeft - 8}" y="${(yPos + 3.5).toFixed(1)}" fill="#94a3b8" font-size="9" text-anchor="end" font-family="Consolas, monospace">${val}</text>
    `;
  }

  // Selección espaciada de etiquetas del eje X para evitar CUALQUIER superposición
  const totalMonths = points.length;
  const labelStep = Math.max(1, Math.ceil(totalMonths / 6));
  let xLabelsSvg = "";
  points.forEach((p, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === totalMonths - 1;
    const isStep = idx % labelStep === 0;

    if ((isStep && (totalMonths - 1 - idx) > Math.floor(labelStep / 2)) || isFirst || isLast) {
      xLabelsSvg += `
        <text x="${p.x.toFixed(1)}" y="${height - 8}" fill="#94a3b8" font-size="9" font-weight="600" text-anchor="middle">${p.label}</text>
        <line x1="${p.x.toFixed(1)}" y1="${padTop + plotH}" x2="${p.x.toFixed(1)}" y2="${padTop + plotH + 4}" stroke="rgba(255, 255, 255, 0.2)" />
      `;
    }
  });

  // Marcadores de puntos y estrellas doradas de 5★
  let pointsSvg = "";
  points.forEach((p) => {
    const has5 = p.star5 > 0;
    const strokeColor = has5 ? "#fbbf24" : "#60a5fa";
    const fillColor = has5 ? "#fbbf24" : "#1e293b";
    const radius = has5 ? 4.2 : 3.0;

    pointsSvg += `
      <g class="chart-point-group">
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${radius}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="1.8">
          <title>${p.month}: ${p.pulls} ${escapeHtml(ci.pulls)}</title>
        </circle>
        ${has5 ? `<text x="${p.x.toFixed(1)}" y="${(p.y - 7).toFixed(1)}" fill="#fbbf24" font-size="9" font-weight="900" text-anchor="middle">★${p.star5 > 1 ? p.star5 : ''}</text>` : ""}
      </g>
    `;
  });

  const recordMonth = [...points].sort((a, b) => b.pulls - a.pulls)[0];
  const totalPullsSum = points.reduce((acc, curr) => acc + curr.pulls, 0);
  const avgMonthly = Math.round(totalPullsSum / Math.max(1, points.length));

  return `
    <div class="chart-header-summary">
      <div class="chart-stat-pill"><span class="chart-stat-dot blue"></span> ${escapeHtml(ci.avg)} <strong>~${avgMonthly} ${escapeHtml(ci.perMo)}</strong></div>
      <div class="chart-stat-pill"><span class="chart-stat-dot gold"></span> ${escapeHtml(ci.rec)} <strong>${recordMonth ? recordMonth.label : "-"} (${recordMonth ? recordMonth.pulls : 0} ${escapeHtml(ci.pulls)})</strong></div>
    </div>
    <div class="chart-svg-wrapper">
      <svg viewBox="0 0 ${width} ${height}" class="modern-monthly-svg">
        <defs>
          <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.28" />
            <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.0" />
          </linearGradient>
          <filter id="glowLine" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" flood-color="#3b82f6" flood-opacity="0.3"/>
          </filter>
        </defs>

        <!-- Cuadrícula horizontal -->
        ${gridLinesSvg}

        <!-- Área degradada -->
        <path d="${areaD}" fill="url(#chartAreaGrad)" />

        <!-- Línea curva suave -->
        <path d="${pathD}" fill="none" stroke="#60a5fa" stroke-width="2.2" filter="url(#glowLine)" />

        <!-- Puntos y marcadores -->
        ${pointsSvg}

        <!-- Etiquetas de meses -->
        ${xLabelsSvg}
      </svg>
    </div>
  `;
}

/**
 * Carga directa en 1 clic del archivo 'deseos_recientes.json' generado por Get-GenshinWishes.ps1
 */
async function handleLoadRecentWishes() {
  const msgEl = document.getElementById("importStatusMsg");
  const progressWrapper = document.getElementById("importProgressWrapper");
  const progressFill = document.getElementById("importProgressFill");
  const progressText = document.getElementById("importProgressText");

  if (progressWrapper) progressWrapper.style.display = "block";
  if (progressFill) progressFill.style.width = "40%";
  if (progressText) progressText.textContent = "Leyendo deseos_recientes.json...";

  if (msgEl) {
    msgEl.style.color = "#60a5fa";
    msgEl.innerHTML = '<img src="assets/ui/clock.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> Leyendo tiradas oficiales desde "deseos_recientes.json"...';
  }

  try {
    const resp = await fetch("deseos_recientes.json?t=" + Date.now());
    if (!resp.ok) {
      throw new Error("No se pudo cargar 'deseos_recientes.json'. Ejecuta primero 'Extraer-Deseos.bat' o el script PowerShell.");
    }

    if (progressFill) progressFill.style.width = "75%";
    const jsonText = await resp.text();
    const importedWishes = WishEngine.importFromUniversalJSON(jsonText);

    if (!importedWishes || importedWishes.length === 0) {
      throw new Error("El archivo 'deseos_recientes.json' no contiene tiradas.");
    }

    let fileUid = importedWishes[0].uid || state.activeWishUid || "default";
    state.activeWishUid = fileUid;
    WishEngine.setActiveAccountUid(fileUid);
    if (typeof AccountManager !== "undefined" && fileUid !== "default") {
      AccountManager.setAccountUid(AccountManager.getActiveAccountId(), fileUid);
    }

    // Auto-registrar perfil con UID oficial y servidor detectado
    WishEngine.saveProfile({
      uid: fileUid,
      name: "UID: " + fileUid,
      server: WishEngine.detectServerFromUid(fileUid),
      createdAt: new Date().toISOString()
    });

    const isOnlySeed = state.rawWishes.length > 0 && state.rawWishes.every((w) => w.id && w.id.startsWith("seed_"));
    state.rawWishes = isOnlySeed ? importedWishes : WishEngine.mergeWishes(state.rawWishes, importedWishes);
    await WishEngine.saveWishesToStorage(fileUid, state.rawWishes);

    if (progressFill) progressFill.style.width = "100%";
    if (progressText) progressText.textContent = `¡${importedWishes.length.toLocaleString()} tiradas cargadas!`;

    if (msgEl) {
      msgEl.style.color = "#4ade80";
      msgEl.innerHTML = `<img src="assets/ui/check.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> ¡${importedWishes.length.toLocaleString()} deseos del UID ${fileUid} cargados con éxito! Pity y estadísticas actualizados.`;
    }

    setTimeout(() => { if (progressWrapper) progressWrapper.style.display = "none"; }, 1200);

    triggerDriveSyncStamp();
    renderWishesDashboard();
    if (typeof renderProfileManager === "function") renderProfileManager();
  } catch (err) {
    console.warn("Fallo lectura fetch:", err);
    if (progressWrapper) progressWrapper.style.display = "none";
    if (msgEl) {
      msgEl.style.color = "#f87171";
      msgEl.innerHTML = `<img src="assets/ui/sparkle.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> ${err.message}<br><span style="font-size:0.75rem;color:#94a3b8;">Si abres la web directamente como archivo local (file://), arrastra <strong>deseos_recientes.json</strong> o <strong>deseos_genshin_backup.json</strong> desde tu Escritorio a la pestaña de Archivos.</span>`;
    }
  }
}

/**
 * Descarga en vivo e importador del historial de deseos desde el enlace oficial de HoYoverse
 */
async function handleWishUrlImport() {
  const inputEl = document.getElementById("wishUrlInput");
  const rawInput = inputEl ? inputEl.value.trim() : "";
  const msgEl = document.getElementById("importStatusMsg");
  const progressWrapper = document.getElementById("importProgressWrapper");
  const progressFill = document.getElementById("importProgressFill");
  const progressText = document.getElementById("importProgressText");

  if (!rawInput) {
    if (msgEl) {
      msgEl.style.color = "#f87171";
      msgEl.innerHTML = '<img src="assets/ui/sparkle.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> Por favor pega el resultado copiado por el script de PowerShell (Paso 1) o haz clic en "Pegar".';
    }
    return;
  }

  // CASO 1: Es un JSON directo copiado por el script de PowerShell o un backup UIGF
  const isJson = rawInput.startsWith("{") || rawInput.startsWith("[") || rawInput.includes('"uigf_version"') || rawInput.includes('"list"') || rawInput.includes('"gacha_type"');

  if (isJson) {
    if (progressWrapper) progressWrapper.style.display = "block";
    if (progressFill) progressFill.style.width = "40%";
    if (progressText) progressText.textContent = "Procesando tiradas de Genshin Impact...";

    try {
      if (typeof WishEngine === "undefined") {
        throw new Error("El motor WishEngine no está disponible.");
      }

      const importedWishes = WishEngine.importFromUniversalJSON(rawInput);
      if (!importedWishes || importedWishes.length === 0) {
        throw new Error("No se encontraron tiradas válidas en los datos pegados.");
      }

      const activeUid = importedWishes[0].uid || state.activeWishUid || "";
      state.activeWishUid = activeUid;
      WishEngine.setActiveAccountUid(activeUid);
      WishEngine.saveProfile({
        uid: activeUid,
        name: "UID: " + activeUid,
        server: WishEngine.detectServerFromUid(activeUid),
        createdAt: new Date().toISOString()
      });

      const isOnlySeed = state.rawWishes.length > 0 && state.rawWishes.every((w) => w.id && w.id.startsWith("seed_"));
      const mergeResult = isOnlySeed
        ? { mergedWishes: importedWishes, addedCount: importedWishes.length, duplicatesCount: 0, totalCount: importedWishes.length }
        : WishEngine.mergeWishesDetailed(state.rawWishes, importedWishes);

      state.rawWishes = mergeResult.mergedWishes;
      await WishEngine.saveWishesToStorage(activeUid, state.rawWishes);

      if (progressFill) progressFill.style.width = "100%";
      if (progressText) {
        progressText.textContent = mergeResult.addedCount > 0
          ? `¡Completado! +${mergeResult.addedCount.toLocaleString()} tiradas nuevas agregadas`
          : `¡Historial al día! Sin tiradas nuevas que duplicar`;
      }

      if (msgEl) {
        msgEl.style.color = "#4ade80";
        if (mergeResult.addedCount > 0) {
          msgEl.innerHTML = `<img src="assets/ui/check.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> ¡<strong>${mergeResult.addedCount.toLocaleString()}</strong> tiradas nuevas agregadas al historial!<br><span style="font-size:0.8rem;color:#cbd5e1;">• ${mergeResult.duplicatesCount.toLocaleString()} tiradas ya existían previamente y se mantuvieron sin duplicar.<br>• Total en tu cuenta: <strong>${mergeResult.totalCount.toLocaleString()} tiradas</strong> (UID ${activeUid}).</span>`;
        } else {
          msgEl.innerHTML = `<img src="assets/ui/check.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> Tu historial ya estaba al día con HoYoverse.<br><span style="font-size:0.8rem;color:#cbd5e1;">Se verificaron <strong>${importedWishes.length.toLocaleString()}</strong> tiradas y no hubo registros nuevos.<br>• Historial total conservado: <strong>${mergeResult.totalCount.toLocaleString()} tiradas</strong> (UID ${activeUid}).</span>`;
        }
      }

      setTimeout(() => { if (progressWrapper) progressWrapper.style.display = "none"; }, 1500);

      triggerDriveSyncStamp();
      renderWishesDashboard();
      if (typeof renderProfileManager === "function") renderProfileManager();
      return;
    } catch (err) {
      console.error("Error al importar JSON de deseos:", err);
      if (progressWrapper) progressWrapper.style.display = "none";
      if (msgEl) {
        msgEl.style.color = "#f87171";
        msgEl.textContent = "Error al procesar tiradas: " + err.message;
      }
      return;
    }
  }

  // CASO 2: Es una URL de autenticación de HoYoverse
  if (!rawInput.includes("authkey=")) {
    if (msgEl) {
      msgEl.style.color = "#f87171";
      msgEl.innerHTML = '<img src="assets/ui/sparkle.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> Pega el resultado copiado por el script de PowerShell (Paso 1) o un enlace con \'authkey=\'.';
    }
    return;
  }

  if (progressWrapper) progressWrapper.style.display = "block";
  if (progressFill) progressFill.style.width = "5%";
  if (progressText) progressText.textContent = "Iniciando conexión con HoYoverse...";

  if (msgEl) {
    msgEl.style.color = "#60a5fa";
    msgEl.innerHTML = '<img src="assets/ui/clock.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> Conectando con los servidores oficiales de HoYoverse...';
  }

  try {
    let parsedUrl;
    try {
      parsedUrl = new URL(rawInput);
    } catch (e) {
      throw new Error("El enlace pegado no tiene un formato de URL válido.");
    }

    const isCn = rawInput.includes("game_biz=hk4e_cn") || rawInput.includes("mihoyo.com");
    const apiHost = isCn ? "public-operation-hk4e.mihoyo.com" : "public-operation-hk4e-sg.hoyoverse.com";
    const baseApi = `https://${apiHost}/gacha_info/api/getGachaLog`;

    const banners = [
      { key: "301", name: "Personaje Promocional" },
      { key: "302", name: "Gachapón de Armas" },
      { key: "200", name: "Gachapón Permanente" },
      { key: "500", name: "Búsqueda de las Crónicas" }
    ];

    let downloadedWishes = [];
    let detectedUid = null;

    for (let b = 0; b < banners.length; b++) {
      const banner = banners[b];
      let page = 1;
      let lastEndId = "0";
      let countThisBanner = 0;

      while (true) {
        const percent = Math.min(95, Math.round(((b + (page > 1 ? 0.7 : 0.2)) / banners.length) * 100));
        if (progressFill) progressFill.style.width = `${percent}%`;
        if (progressText) {
          progressText.textContent = `Descargando ${banner.name}: pág. ${page} (${countThisBanner} tiradas encontradas)...`;
        }

        const params = new URLSearchParams(parsedUrl.search);
        params.set("gacha_type", banner.key);
        params.set("size", "20");
        params.set("page", String(page));
        params.set("end_id", lastEndId);
        params.set("lang", "es-es");

        const targetUrl = `${baseApi}?${params.toString()}`;
        
        // Proxy CORS nativo en Cloudflare (/api/corsproxy), idéntico al mecanismo de Paimon.moe
        const isSpiriflyOrigin = window.location.hostname.includes("spirifly.app");
        const proxyEndpoint = isSpiriflyOrigin
          ? `/api/corsproxy`
          : `https://spirifly.app/api/corsproxy`;

        let res;
        try {
          res = await fetch(proxyEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: targetUrl }) });
        } catch (proxyErr) {
          res = await fetch(targetUrl);
        }

        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status} al conectar con HoYoverse.`);
        }

        const data = await res.json();
        if (data.retcode !== 0) {
          if (data.retcode === -101) {
            throw new Error("La clave de autorización (authkey) ha expirado (>24h). Abre el Historial en Genshin Impact y vuelve a ejecutar el comando en PowerShell.");
          }
          console.warn(`[HoYoverse API] Aviso en banner ${banner.key}:`, data.message);
          break;
        }

        const list = (data.data && data.data.list) ? data.data.list : [];
        if (list.length === 0) {
          break; // Fin de este banner
        }

        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          downloadedWishes.push(item);
          countThisBanner++;
          if (!detectedUid && item.uid) detectedUid = item.uid;
        }

        lastEndId = list[list.length - 1].id;
        page++;

        // Pequeña pausa de 220ms para respetar el rate limit de HoYoverse
        await new Promise((r) => setTimeout(r, 220));
      }
    }

    if (downloadedWishes.length === 0) {
      throw new Error("No se encontraron tiradas en los últimos 6 meses en tu historial.");
    }

    const activeUid = detectedUid || state.activeWishUid || "default";
    state.activeWishUid = activeUid;
    if (typeof AccountManager !== "undefined" && activeUid !== "default") {
      AccountManager.setAccountUid(AccountManager.getActiveAccountId(), activeUid);
    }
    if (typeof WishEngine !== "undefined") {
      WishEngine.setActiveAccountUid(activeUid);
      WishEngine.saveProfile({
        uid: activeUid,
        name: "UID: " + activeUid,
        server: WishEngine.detectServerFromUid(activeUid),
        createdAt: new Date().toISOString()
      });
    }

    const normalizedWishes = downloadedWishes.map((w) => ({
      uid: String(w.uid || activeUid),
      gacha_type: String(w.gacha_type),
      item_id: String(w.item_id || ""),
      count: String(w.count || "1"),
      time: String(w.time || ""),
      name: String(w.name || "").trim(),
      lang: String(w.lang || "es-es"),
      item_type: String(w.item_type || ""),
      rank_type: String(w.rank_type || "3"),
      id: String(w.id || "")
    }));

    const isOnlySeed = state.rawWishes.length > 0 && state.rawWishes.every((w) => w.id && w.id.startsWith("seed_"));
    const mergeResult = isOnlySeed
      ? { mergedWishes: normalizedWishes, addedCount: normalizedWishes.length, duplicatesCount: 0, totalCount: normalizedWishes.length }
      : WishEngine.mergeWishesDetailed(state.rawWishes, normalizedWishes);

    state.rawWishes = mergeResult.mergedWishes;
    await WishEngine.saveWishesToStorage(activeUid, state.rawWishes);

    if (progressFill) progressFill.style.width = "100%";
    if (progressText) {
      progressText.textContent = mergeResult.addedCount > 0
        ? `¡Completado! +${mergeResult.addedCount.toLocaleString()} tiradas nuevas agregadas`
        : `¡Historial verificado! Sin tiradas nuevas`;
    }

    if (msgEl) {
      msgEl.style.color = "#4ade80";
      if (mergeResult.addedCount > 0) {
        msgEl.innerHTML = `<img src="assets/ui/check.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> ¡<strong>${mergeResult.addedCount.toLocaleString()}</strong> tiradas nuevas agregadas al historial!<br><span style="font-size:0.8rem;color:#cbd5e1;">• ${mergeResult.duplicatesCount.toLocaleString()} tiradas ya existían previamente y se mantuvieron sin duplicar.<br>• Total en tu cuenta: <strong>${mergeResult.totalCount.toLocaleString()} tiradas</strong> (UID ${activeUid}).</span>`;
      } else {
        msgEl.innerHTML = `<img src="assets/ui/check.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> Tu historial ya estaba al día con HoYoverse.<br><span style="font-size:0.8rem;color:#cbd5e1;">Se verificaron <strong>${downloadedWishes.length.toLocaleString()}</strong> tiradas y no hubo registros nuevos que duplicar.<br>• Historial total conservado: <strong>${mergeResult.totalCount.toLocaleString()} tiradas</strong> (UID ${activeUid}).</span>`;
      }
    }

    setTimeout(() => { if (progressWrapper) progressWrapper.style.display = "none"; }, 1500);

    triggerDriveSyncStamp();
    renderWishesDashboard();
    if (typeof renderProfileManager === "function") renderProfileManager();
  } catch (err) {
    console.error("Error en handleWishUrlImport:", err);
    if (progressWrapper) progressWrapper.style.display = "none";
    if (msgEl) {
      msgEl.style.color = "#f87171";
      const isFetchFail = err.message && err.message.toLowerCase().includes("failed to fetch");
      if (isFetchFail || window.location.protocol === "file:") {
        msgEl.innerHTML = `
          <div style="background:rgba(59, 130, 246, 0.12); border:1px solid rgba(59, 130, 246, 0.4); border-radius:8px; padding:0.85rem; margin-top:0.6rem; text-align:left;">
            <strong style="color:#93c5fd;font-size:0.9rem;display:flex;align-items:center;gap:0.4rem;">
              <img src="assets/ui/sparkle.svg" style="width:14px;height:14px;" alt="" /> ¡Descarga directa disponible con PowerShell!
            </strong>
            <p style="font-size:0.82rem;color:#cbd5e1;line-height:1.45;margin:0.35rem 0 0.5rem 0;">
              Por políticas de seguridad del navegador (CORS), las páginas web no pueden consultar directamente la API de HoYoverse.<br><br>
              <strong>Solución recomendada (1 clic):</strong> Ejecuta el script de PowerShell del <strong>Paso 1</strong>. El script descargará automáticamente todas tus tiradas directamente desde HoYoverse y las copiará a tu portapapeles de forma 100% segura y privada. Luego vuelve aquí y haz clic en <strong>Pegar</strong>.
            </p>
          </div>
        `;
      } else {
        msgEl.textContent = "Error al descargar tiradas: " + err.message;
      }
    }
  }
}

/**
 * Borrado rápido de deseos importados para pruebas de desarrollo
 */
async function handleDevClearWishes() {
  const activeUid = state.activeWishUid || (typeof WishEngine !== "undefined" ? WishEngine.getActiveAccountUid() : "default");
  const ok = confirm(`[MODO PRUEBAS]\n¿Deseas borrar todos los deseos guardados del UID ${activeUid} para probar la importación limpia desde cero?`);
  if (!ok) return;

  if (typeof WishEngine !== "undefined") {
    await WishEngine.clearWishesForTesting(activeUid);
  } else {
    localStorage.removeItem("teyvat_wishes_" + activeUid);
    localStorage.setItem("teyvat_wishes_cleared_" + activeUid, "true");
  }

  state.rawWishes = [];
  triggerDriveSyncStamp();
  cachedFullWishResults = null;
  state.wishTablePage = 1;

  await renderWishesDashboard();
  if (typeof renderProfileManager === "function") renderProfileManager();

  const msgEl = document.getElementById("importStatusMsg");
  if (msgEl) {
    msgEl.style.color = "#fbbf24";
    msgEl.innerHTML = `<img src="assets/ui/trash.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> Deseos del UID ${activeUid} borrados con éxito. El historial está vacío para tus pruebas.`;
  }
  
  const urlInput = document.getElementById("wishUrlInput");
  if (urlInput) urlInput.value = "";

  alert(`Datos de deseos borrados exitosamente para el UID ${activeUid}. Ahora puedes probar la importación limpia.`);
}

/**
 * Procesamiento unificado de archivos (.xlsx, .xls, .json, .uigf, .csv)
 */
function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  processWishFile(file);
}

function processWishFile(file) {
  const msgEl = document.getElementById("importStatusMsg");
  const fileName = (file.name || "").toLowerCase();
  const isExcel = fileName.endsWith(".xlsx") || fileName.endsWith(".xls");
  const isCsv = fileName.endsWith(".csv");

  const reader = new FileReader();

  reader.onload = async (ev) => {
    try {
      if (typeof WishEngine === "undefined") {
        throw new Error("El motor de deseos (WishEngine) no está disponible.");
      }

      let importedWishes = [];
      if (isExcel) {
        if (typeof window !== "undefined" && !window.XLSX && typeof require === "undefined") {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "xlsx.full.min.js";
            script.onload = resolve;
            script.onerror = () => reject(new Error("No se pudo cargar la librería SheetJS (XLSX)."));
            document.head.appendChild(script);
          });
        }
        importedWishes = WishEngine.importFromPaimonMoeXLSX(ev.target.result);
      } else if (isCsv) {
        importedWishes = WishEngine.importFromPaimonMoeCSV(ev.target.result);
      } else {
        // Formato JSON / UIGF
        importedWishes = WishEngine.importFromUniversalJSON(ev.target.result);
      }

      if (!importedWishes || importedWishes.length === 0) {
        throw new Error("No se encontraron tiradas válidas en el archivo seleccionado.");
      }

      let fileUid = importedWishes[0].uid || state.activeWishUid;
      if (fileUid) state.activeWishUid = fileUid;

      const isOnlySeed = state.rawWishes.length > 0 && state.rawWishes.every((w) => w.id && w.id.startsWith("seed_"));
      const mergeResult = isOnlySeed
        ? { mergedWishes: importedWishes, addedCount: importedWishes.length, duplicatesCount: 0, totalCount: importedWishes.length }
        : WishEngine.mergeWishesDetailed(state.rawWishes, importedWishes);

      state.rawWishes = mergeResult.mergedWishes;
      await WishEngine.saveWishesToStorage(state.activeWishUid, state.rawWishes);

      if (msgEl) {
        msgEl.style.color = "#4ade80";
        if (mergeResult.addedCount > 0) {
          msgEl.innerHTML = `<img src="assets/ui/check.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> ¡<strong>${mergeResult.addedCount.toLocaleString()}</strong> tiradas nuevas importadas!<br><span style="font-size:0.8rem;color:#cbd5e1;">• ${mergeResult.duplicatesCount.toLocaleString()} tiradas ya existían y se mantuvieron sin duplicar.<br>• Total en tu cuenta: <strong>${mergeResult.totalCount.toLocaleString()} tiradas</strong>.</span>`;
        } else {
          msgEl.innerHTML = `<img src="assets/ui/check.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> Todas las tiradas del archivo (<strong>${importedWishes.length.toLocaleString()}</strong>) ya existían en tu historial.<br><span style="font-size:0.8rem;color:#cbd5e1;">No se generaron duplicados. Total conservado: <strong>${mergeResult.totalCount.toLocaleString()} tiradas</strong>.</span>`;
        }
      }

      triggerDriveSyncStamp();
      renderWishesDashboard();
    } catch (err) {
      console.error("Error al procesar archivo de deseos:", err);
      if (msgEl) {
        msgEl.style.color = "#f87171";
        msgEl.textContent = "Error al procesar archivo: " + err.message;
      }
      alert("Error al importar archivo de deseos: " + err.message);
    }
  };

  if (isExcel) {
    reader.readAsArrayBuffer(file);
  } else {
    reader.readAsText(file);
  }
}

/**
 * Procesa el texto / CSV pegado directamente en el cuadro de texto
 */
async function handlePasteCsvImport() {
  const area = document.getElementById("csvPasteInput");
  const msgEl = document.getElementById("importStatusMsg");
  const text = (area ? area.value : "").trim();

  if (!text) {
    if (msgEl) {
      msgEl.style.color = "#f87171";
      msgEl.innerHTML = '<img src="assets/ui/sparkle.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> Por favor pega el texto o CSV de tu historial en el cuadro de texto.';
    }
    return;
  }

  try {
    if (typeof WishEngine === "undefined") {
      throw new Error("El motor WishEngine no está cargado.");
    }

    const importedWishes = WishEngine.importFromPaimonMoeCSV(text);
    if (!importedWishes || importedWishes.length === 0) {
      throw new Error("No se detectaron columnas de deseos válidas (se requiere encabezado Type,Name,Time...).");
    }

    let fileUid = importedWishes[0].uid || state.activeWishUid;
    if (fileUid) state.activeWishUid = fileUid;

    const isOnlySeed = state.rawWishes.length > 0 && state.rawWishes.every((w) => w.id && w.id.startsWith("seed_"));
    const mergeResult = isOnlySeed
      ? { mergedWishes: importedWishes, addedCount: importedWishes.length, duplicatesCount: 0, totalCount: importedWishes.length }
      : WishEngine.mergeWishesDetailed(state.rawWishes, importedWishes);

    state.rawWishes = mergeResult.mergedWishes;
    await WishEngine.saveWishesToStorage(state.activeWishUid, state.rawWishes);

    if (msgEl) {
      msgEl.style.color = "#4ade80";
      if (mergeResult.addedCount > 0) {
        msgEl.innerHTML = `<img src="assets/ui/check.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> ¡<strong>${mergeResult.addedCount.toLocaleString()}</strong> tiradas nuevas integradas desde texto pegado!<br><span style="font-size:0.8rem;color:#cbd5e1;">• ${mergeResult.duplicatesCount.toLocaleString()} tiradas ya existían previamente y se mantuvieron sin duplicar.<br>• Total en tu cuenta: <strong>${mergeResult.totalCount.toLocaleString()} tiradas</strong>.</span>`;
      } else {
        msgEl.innerHTML = `<img src="assets/ui/check.svg" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" alt="" /> Todas las tiradas pegadas (<strong>${importedWishes.length.toLocaleString()}</strong>) ya existían en tu historial.<br><span style="font-size:0.8rem;color:#cbd5e1;">No se duplicó ninguna tirada. Total conservado: <strong>${mergeResult.totalCount.toLocaleString()} tiradas</strong>.</span>`;
      }
    }

    if (area) area.value = "";
    triggerDriveSyncStamp();
    renderWishesDashboard();
  } catch (err) {
    console.error("Error al procesar texto CSV:", err);
    if (msgEl) {
      msgEl.style.color = "#f87171";
      msgEl.textContent = "Error al procesar texto copiado: " + err.message;
    }
    alert("Error al procesar texto de deseos: " + err.message);
  }
}

/**
 * Exportador oficial a estándar UIGF v4.0
 */
function handleExportUIGF() {
  if (typeof WishEngine === "undefined") return;

  const uigfData = WishEngine.exportToUIGF(state.rawWishes, state.activeWishUid, state.lang === "en" ? "en-us" : "es-es");
  const blob = new Blob([JSON.stringify(uigfData, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const timestamp = new Date().toISOString().substring(0, 10).replace(/-/g, "");
  a.href = url;
  a.download = `UIGF_Genshin_Wishes_${state.activeWishUid}_${timestamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Registro Manual de un 5★
 */
async function handleAddManual5Star() {
  const bannerKey = document.getElementById("manualBanner").value;
  const name = document.getElementById("manualCharName").value.trim();
  const pity = Math.max(1, Math.min(90, parseInt(document.getElementById("manualCharPity").value || "75", 10)));
  const condition = document.getElementById("manualWon5050").value;

  if (!name) {
    alert("Por favor ingresa el nombre del personaje o arma 5★.");
    return;
  }

  const gachaTypeMap = { character: "301", weapon: "302", standard: "200", chronicled: "500" };
  const gachaType = gachaTypeMap[bannerKey] || "301";
  const nowStr = new Date().toISOString().replace("T", " ").substring(0, 19);

  const newWishes = [];
  for (let p = 1; p < pity; p++) {
    newWishes.push({
      id: "man_" + Date.now() + "_" + p,
      uid: state.activeWishUid || "700123456",
      gacha_type: gachaType,
      item_id: "",
      count: "1",
      time: nowStr,
      name: p % 9 === 0 ? "Bennett" : "Garrote del Debate",
      lang: "es-es",
      item_type: p % 9 === 0 ? "Personaje" : "Arma",
      rank_type: p % 9 === 0 ? "4" : "3"
    });
  }

  const isRadiance = condition === "radiance";
  const isGuar = condition === "guaranteed";
  newWishes.push({
    id: "man_5star_" + Date.now(),
    uid: state.activeWishUid || "700123456",
    gacha_type: gachaType,
    item_id: "",
    count: "1",
    time: nowStr,
    name: name,
    lang: "es-es",
    item_type: WishEngine.STANDARD_5STAR_WEAPONS.has(name) ? "Arma" : "Personaje",
    rank_type: "5",
    isCapturingRadiance: isRadiance,
    isGuaranteed: isGuar
  });

  if (typeof WishEngine !== "undefined") {
    state.rawWishes = WishEngine.mergeWishes(state.rawWishes, newWishes);
    await WishEngine.saveWishesToStorage(state.activeWishUid, state.rawWishes);
  }

  document.getElementById("manualCharName").value = "";
  triggerDriveSyncStamp();
  renderWishesDashboard();
}

/* =====================================================================
   PLANIFICADOR DE FARMEO & GASTO DE RESINA (RÉPLICA EXACTA DE SEELIE.ME)
   ===================================================================== */
let farmingEventsInitialized = false;

function initFarmingEventsOnce() {
  if (farmingEventsInitialized) return;
  farmingEventsInitialized = true;

  if (state.currentResin === undefined) {
    const rData = loadActiveAccountResin();
    const savedResin = rData.val;
    const savedTime = rData.updated;
    if (savedTime > 0 && savedResin < 200) {
      const elapsedMs = Math.max(0, Date.now() - savedTime);
      const generated = Math.floor(elapsedMs / (8 * 60 * 1000));
      if (generated > 0) {
        state.currentResin = Math.min(200, savedResin + generated);
        // Derive regeneration without changing the persisted timer origin.
      } else {
        state.currentResin = savedResin;
      }
    } else {
      state.currentResin = savedResin;

    }
  }
  if (state.farmingCostTab === undefined) {
    state.farmingCostTab = "all";
  }
  if (state.farmingCharFilter === undefined) {
    state.farmingCharFilter = "all";
  }
  if (state.farmingCollapsible === undefined) {
    state.farmingCollapsible = { none: true, resin20: true, resin40: true, resin60: true };
  }

  // 1. Botones de Ajuste Rápido de Resina: [-60] [-40] [-30] [-20] [-1] [+1] [+10] [+60]
  document.querySelectorAll(".seelie-btn-resin-adjust").forEach((btn) => {
    btn.addEventListener("click", () => {
      const delta = parseInt(btn.dataset.resinDelta, 10) || 0;
      state.currentResin = Math.max(0, Math.min(200, (state.currentResin ?? 200) + delta));
      saveActiveAccountResin(state.currentResin, Date.now());
      triggerDriveSyncStamp();
      updateResinWidgetUI();
    });
  });

  // 2. Botón de Resina Concentrada
  const btnCond = document.getElementById("btnSeelieCondensedResin");
  if (btnCond) {
    btnCond.addEventListener("click", () => {
      const cur = state.currentResin ?? 200;
      if (cur >= 60) {
        state.currentResin = Math.max(0, cur - 60);
        saveActiveAccountResin(state.currentResin, Date.now());
        triggerDriveSyncStamp();
        updateResinWidgetUI();
      } else {
        const add60 = confirm(`Tienes ${cur} de Resina (se requieren 60 para concentrar).\n\n¿Deseas consumir 1 Resina Frágil para restaurar +60?`);
        if (add60) {
          state.currentResin = Math.min(200, cur + 60);
          saveActiveAccountResin(state.currentResin, Date.now());
          triggerDriveSyncStamp();
          updateResinWidgetUI();
        }
      }
    });
  }

  // 3. Botón de Configuración de Resina
  const btnSettings = document.getElementById("btnSeelieResinSettings");
  if (btnSettings) {
    btnSettings.addEventListener("click", () => {
      const input = prompt("Ingresa tu cantidad actual de Resina Original (0 a 200):", state.currentResin ?? 200);
      if (input !== null) {
        const val = parseInt(input.trim(), 10);
        if (!isNaN(val)) {
          state.currentResin = Math.max(0, Math.min(200, val));
          saveActiveAccountResin(state.currentResin, Date.now());
          triggerDriveSyncStamp();
          updateResinWidgetUI();
        }
      }
    });
  }

  // 4. Barra de Pestañas de Coste Seelie.me
  const costTabs = document.getElementById("seelieCostTabs");
  if (costTabs) {
    costTabs.querySelectorAll(".seelie-cost-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.farmingCostTab = btn.dataset.seelieTab || "all";
        costTabs.querySelectorAll(".seelie-cost-tab").forEach((b) => b.classList.toggle("active", b === btn));
        applyFarmingTabVisibility();
      });
    });
  }

  // 5. Filtros de coste en la vista Schedule (Calendario)
  const resinFilters = document.getElementById("resinCostFilterButtons");
  if (resinFilters) {
    resinFilters.querySelectorAll(".chip-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.farmingResinFilter = btn.dataset.resinFilter || "all";
        resinFilters.querySelectorAll(".chip-btn").forEach((b) => b.classList.toggle("active", b === btn));
        renderFarmingWeeklyDomains();
      });
    });
  }

  // 6. Barra de Selección de Días de Farmeo (Lunes a Domingo / Hoy / Todos)
  const dayPills = document.getElementById("seelieDayPills");
  if (dayPills) {
    dayPills.querySelectorAll(".seelie-day-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.farmingDayFilter = btn.dataset.dayFilter || "today";
        dayPills.querySelectorAll(".seelie-day-pill").forEach((b) => b.classList.toggle("active", b === btn));
        renderFarming();
      });
    });
  }
}

function updateResinWidgetUI() {
  const elVal = document.getElementById("seelieCurResinVal");
  const elStatus = document.getElementById("seelieResinStatusText");
  const curKpi = document.getElementById("seelieCurResinKpi");
  const condKpi = document.getElementById("seelieCurCondKpi");

  // Si hay resina menor a 200 y tiempo guardado, computar avance en tiempo real
  const rData = loadActiveAccountResin();
  const savedTime = rData.updated;
  let cur = rData.val;
  let remainingMsToNext = 8 * 60 * 1000;

  if (savedTime > 0 && cur < 200) {
    const elapsedMs = Math.max(0, Date.now() - savedTime);
    const generated = Math.floor(elapsedMs / (8 * 60 * 1000));
    const remainderMs = elapsedMs % (8 * 60 * 1000);
    remainingMsToNext = (8 * 60 * 1000) - remainderMs;

    if (generated > 0) {
      cur = Math.min(200, cur + generated);
      state.currentResin = cur;
      // Keep the persisted origin unchanged until the user edits resin.
    }
  }

  const t = (typeof I18N !== "undefined" && (I18N[state.lang] || I18N.es)) || {};
  const tf = t.farming || {};

  if (elVal) elVal.textContent = cur;
  if (curKpi) curKpi.textContent = cur;
  if (condKpi) condKpi.textContent = Math.min(5, Math.floor(cur / 60));

  const elProgressBar = document.getElementById("seelieResinProgressBar");
  if (elProgressBar) {
    const pct = Math.max(0, Math.min(100, (cur / 200) * 100));
    elProgressBar.style.width = `${pct}%`;
    if (cur >= 200) {
      elProgressBar.style.background = "linear-gradient(90deg, #3b82f6, #fbbf24 75%, #ef4444 100%)";
    } else {
      elProgressBar.style.background = "linear-gradient(90deg, #3b82f6, #60a5fa 60%, #fbbf24 100%)";
    }
  }

  if (elStatus) {
    if (cur >= 200) {
      elStatus.innerHTML = `<span>${escapeHtml(tf.maxResinReached || "Límite máx. de Resina original alcanzado")}</span>`;
      elStatus.style.color = "#94a3b8";
    } else {
      const deficit = 200 - cur;
      // El primer punto recupera en remainingMsToNext, los (deficit - 1) restantes en 8 minutos cada uno
      const totalRemainingMs = remainingMsToNext + ((deficit - 1) * 8 * 60 * 1000);
      const totalMinutes = Math.ceil(totalRemainingMs / 60000);
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      const targetTime = new Date(Date.now() + totalRemainingMs);
      const timeStr = targetTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      elStatus.innerHTML = `${escapeHtml(tf.recoversIn || "Completamente recuperada en")} <strong style="color:#60a5fa;margin:0 3px;">${hours}h ${mins}m</strong> (${timeStr})`;
      elStatus.style.color = "#cbd5e1";
    }
  }
}

function renderFarming() {
  initFarmingEventsOnce();
  updateResinWidgetUI();

  if (typeof FarmingEngine === "undefined") {
    console.warn("[Farming] FarmingEngine no está cargado.");
    return;
  }

  const t = (typeof I18N !== "undefined" && (I18N[state.lang] || I18N.es)) || {};
  const tf = t.farming || {};

  // 1. Detectar día actual de la semana
  const dayNames = Array.isArray(tf.days) && tf.days.length === 7
    ? tf.days
    : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const currentDayIdx = getActiveServerDay();
  const currentDayName = dayNames[currentDayIdx];

  const elTodayName = document.getElementById("seelieTodayName");
  const elBtnTodayLabel = document.getElementById("btnTodayLabel");
  if (elTodayName) elTodayName.textContent = currentDayName;
  if (elBtnTodayLabel) elBtnTodayLabel.textContent = currentDayName;

  state.farmingDayFilter = state.farmingDayFilter || "today";

  // Determinar el día objetivo de filtrado
  let activeFilterDay = null;
  if (state.farmingDayFilter === "today") {
    activeFilterDay = currentDayIdx;
  } else if (state.farmingDayFilter === "all") {
    activeFilterDay = null; // Ver todos los días
  } else {
    activeFilterDay = parseInt(state.farmingDayFilter, 10);
  }

  // Refrescar selector de días activo
  const dayPills = document.getElementById("seelieDayPills");
  if (dayPills) {
    dayPills.querySelectorAll(".seelie-day-pill").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.dayFilter === state.farmingDayFilter);
    });
  }

  const data = FarmingEngine.getSeelieFarmingData(state.farmingCharFilter || "all");

  // 2. Actualizar panel KPI de Resina Original y Concentrada
  const tp = t.planner || {};
  const resinWord = { es: "Resina", en: "Resin", pt: "Resina", ja: "樹脂", ko: "레진" }[state.lang] || "Resina";
  const totalResinWord = { es: "Resina Total", en: "Total Resin", pt: "Resina Total", ja: "合計樹脂", ko: "총 레진" }[state.lang] || "Resina Total";
  const craftCondWord = {
    es: "Concentradas fabricables",
    en: "Craftable Condensed",
    pt: " Condensadas fabricáveis",
    ja: "濃縮樹脂作成可能",
    ko: "농축 레진 합성 가능"
  }[state.lang] || "Concentradas fabricables";
  const condWord = tp.condensedWord || "Concentradas";

  const pillCurResin = document.querySelector("#seelieResinCalcBox .kpi-resin");
  if (pillCurResin) {
    const curVal = state.currentResin !== undefined ? state.currentResin : 200;
    pillCurResin.innerHTML = `<img src="assets/ui/resin.png" class="kpi-icon" alt="Resina" /> <strong id="seelieCurResinKpi">${curVal}</strong> ${escapeHtml(resinWord)}`;
  }
  const pillCurCond = document.querySelector("#seelieResinCalcBox .kpi-cond");
  if (pillCurCond) {
    const curVal = state.currentResin !== undefined ? state.currentResin : 200;
    pillCurCond.innerHTML = `<img src="assets/ui/condensed_resin.png" class="kpi-icon" alt="Concentrada" /> <strong id="seelieCurCondKpi">${Math.min(5, Math.floor(curVal / 60))}</strong> ${escapeHtml(craftCondWord)}`;
  }
  const pillPlanResin = document.querySelector("#seelieResinCalcBox .kpi-resin-plan");
  if (pillPlanResin) {
    pillPlanResin.innerHTML = `<img src="assets/ui/resin.png" class="kpi-icon" alt="Resina Requerida" /> <strong id="seeliePlanResinKpi">${data.totals.totalResin.toLocaleString()}</strong> ${escapeHtml(totalResinWord)}`;
  }
  const pillPlanCond = document.querySelector("#seelieResinCalcBox .kpi-cond-plan");
  if (pillPlanCond) {
    pillPlanCond.innerHTML = `<img src="assets/ui/condensed_resin.png" class="kpi-icon" alt="Concentrada Requerida" /> <strong id="seeliePlanCondKpi">${data.totals.condResin.toLocaleString()}</strong> ${escapeHtml(condWord)}`;
  }
  const elPlanDaysKpi = document.getElementById("seeliePlanDaysKpi");
  if (elPlanDaysKpi) elPlanDaysKpi.textContent = `${data.totals.days} ${tf.daysWord || "días"}`;

  // 3. Fila horizontal de avatares de personajes/armas activos
  renderFarmingCharAvatarBar(data.activeCharList);

  // 4. Renderizar las secciones colapsables Seelie (Ninguno, 20, 40, 60) con filtrado de día
  renderSeelieFarmingSections(data.sections, activeFilterDay, currentDayIdx);

  // 5. Renderizar vista de Calendario
  renderFarmingWeeklyTabs();
  renderFarmingWeeklyDomains();

  // 6. Aplicar visibilidad de la pestaña activa (Toda, 0, 20, 40, 60, schedule)
  applyFarmingTabVisibility();
}

function renderFarmingCharAvatarBar(activeCharList) {
  const pauseLabels = {
    es: ["Clic derecho para pausar el farmeo", "Pausado: clic derecho para reactivar"],
    en: ["Right-click to pause farming", "Paused: right-click to resume"],
    pt: ["Clique direito para pausar o farm", "Pausado: clique direito para reativar"],
    ja: ["右クリックで周回を一時停止", "一時停止中: 右クリックで再開"],
    ko: ["우클릭으로 파밍 일시 중지", "일시 중지됨: 우클릭으로 재개"]
  };
  const pauseHint = pauseLabels[state.lang] || pauseLabels.es;
  const container = document.getElementById("seelieCharAvatarBar");
  if (!container) return;

  const t = (typeof I18N !== "undefined" && (I18N[state.lang] || I18N.es)) || {};
  const tf = t.farming || {};
  const currentFilter = state.farmingCharFilter || "all";
  const isAll = (currentFilter === "all");

  let html = `
    <button type="button" class="seelie-avatar-all-chip ${isAll ? "active" : ""}" id="btnFarmingCharAll" title="Ver farmeo de todos los personajes y armas">
      <img src="assets/ui/sparkle.svg" style="width:15px;height:15px;display:block;margin:0 auto 2px auto;" alt="Todos" />
      <span style="font-size:0.54rem;letter-spacing:0.2px;line-height:1;">${escapeHtml(tf.allBtn || "TODOS")}</span>
    </button>
  `;

  (activeCharList || []).forEach((ch) => {
    const isSelected = (currentFilter === ch.key);
    const fallback = ch.isWeapon ? "assets/weapon_types/sword.png" : "assets/elements/pyro.png";
    html += `
      <div class="seelie-avatar-chip ${isSelected ? "active" : ""} ${ch.active === false ? "farming-paused" : ""}" data-avatar-key="${escapeHtml(ch.key)}" title="${escapeHtml(ch.name)} · ${escapeHtml(pauseHint[ch.active === false ? 1 : 0])}">
        <img src="${ch.icon || fallback}" alt="${escapeHtml(ch.name)}" onerror="this.src='${fallback}'" />
      </div>
    `;
  });

  container.innerHTML = html;

  const btnAll = document.getElementById("btnFarmingCharAll");
  if (btnAll) {
    btnAll.addEventListener("click", () => {
      state.farmingCharFilter = "all";
      renderFarming();
    });
  }

  container.querySelectorAll("[data-avatar-key]").forEach((chip) => {
    chip.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const key = chip.dataset.avatarKey;
      const plans = (state.activePlans || []).filter((p) => (p.key || p.name) === key);
      const active = !plans.some((p) => p.active !== false);
      plans.forEach((p) => { p.active = active; });
      if (!active && state.farmingCharFilter === key) state.farmingCharFilter = "all";
      savePlansToStorage();
    });
    chip.addEventListener("click", () => {
      const k = chip.dataset.avatarKey;
      state.farmingCharFilter = (state.farmingCharFilter === k) ? "all" : k;
      renderFarming();
    });
  });
}

function renderSeelieFarmingSections(sections, activeFilterDay, currentDayIdx) {
  const container = document.getElementById("seelieFarmingSectionsContainer");
  if (!container) return;

  if (typeof currentDayIdx === "undefined") {
    currentDayIdx = getActiveServerDay();
  }

  if (!sections || sections.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:3rem 1.5rem;background:#141a29;border-radius:12px;border:1px dashed rgba(255,255,255,0.15);margin-top:1rem;">
        <img src="assets/ui/icon_primogem.png" style="width:48px;height:48px;display:block;margin:0 auto 0.5rem auto;" alt="Completado" />
        <h3 style="color:var(--gold-bright);margin:0.5rem 0 0.3rem 0;">¡Inventario al 100% o Sin Personajes Activos!</h3>
        <p style="color:var(--text-muted);font-size:0.88rem;margin:0;">
          No tienes déficit de materiales para los personajes seleccionados. Configura metas en la pestaña <strong>Personajes y Armas</strong>.
        </p>
      </div>
    `;
    return;
  }

  let html = "";
  let totalVisibleCards = 0;

  sections.forEach((sec) => {
    // Filtrar tarjetas según el día seleccionado
    const visibleCards = sec.cards.filter((card) => {
      if (activeFilterDay !== null) {
        // Si la tarjeta rota por días específicos (talentos y armas)
        if (card.scheduleDays && card.scheduleDays.length < 7) {
          return card.scheduleDays.includes(activeFilterDay);
        }
      }
      // Líneas ley, jefes, semanales y materiales de mundo están disponibles siempre
      return true;
    });

    if (visibleCards.length === 0) return;
    totalVisibleCards += visibleCards.length;

    const isOpen = (state.farmingCollapsible && state.farmingCollapsible[sec.id] !== false);
    const arrowClass = isOpen ? "" : "closed";
    const contentDisplay = isOpen ? "grid" : "none";

    // Icono oficial de Resina para la cabecera
    const t = (typeof I18N !== "undefined" && (I18N[state.lang] || I18N.es)) || {};
    const tf = t.farming || {};
    const resinIcon = sec.resinCost > 0
      ? `<img src="assets/ui/resin.png" class="seelie-sec-resin-icon" alt="Resina" />`
      : `<img src="assets/ui/resin.png" class="seelie-sec-resin-icon zero" alt="Sin Resina" />`;
    const resinWordMap = { es: "Resina", en: "Resin", pt: "Resina", ja: "樹脂", ko: "레진" };
    const noResinMap = {
      es: "Ninguno (Sin Resina)",
      en: "None (0 Resin)",
      pt: "Nenhum (Sem Resina)",
      ja: "なし (樹脂不要)",
      ko: "없음 (레진 불필요)"
    };
    const rWord = resinWordMap[state.lang] || "Resina";
    const labelText = sec.costLabel === "Ninguno" ? (noResinMap[state.lang] || "Ninguno (Sin Resina)") : `${sec.costLabel} ${rWord}`;

    html += `
      <div class="seelie-section-wrapper" data-section-id="${sec.id}">
        <!-- Barra de Cabecera Colapsable con Icono Oficial -->
        <div class="seelie-collapsible-bar" data-toggle-sec="${sec.id}">
          <div class="seelie-collapsible-title">
            <span class="seelie-collapsible-arrow ${arrowClass}">▼</span>
            <span>${resinIcon} ${escapeHtml(labelText)}</span>
          </div>
          <span class="seelie-collapsible-count">${visibleCards.length}</span>
        </div>

        <!-- Rejilla de Tarjetas Seelie -->
        <div class="seelie-cards-grid" id="gridSec_${sec.id}" style="display:${contentDisplay};">
          ${visibleCards.map((c) => renderSeelieSourceCard(c, currentDayIdx, activeFilterDay)).join("")}
        </div>
      </div>
    `;
  });

  if (totalVisibleCards === 0) {
    const t = (typeof I18N !== "undefined" && (I18N[state.lang] || I18N.es)) || {};
    const tf = t.farming || {};
    const dayNames = Array.isArray(tf.days) ? tf.days : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const dName = activeFilterDay !== null ? dayNames[activeFilterDay] : "hoy";
    container.innerHTML = `
      <div style="text-align:center;padding:3rem 1.5rem;background:#141a29;border-radius:12px;border:1px dashed rgba(255,255,255,0.15);margin-top:1rem;">
        <img src="assets/ui/clock.svg" style="width:48px;height:48px;display:block;margin:0 auto 0.5rem auto;" alt="Día Libre" />
        <h3 style="color:#38bdf8;margin:0.5rem 0 0.3rem 0;">¡Día Libre de Dominios para tu Plan!</h3>
        <p style="color:var(--text-muted);font-size:0.88rem;margin:0;">
          Ninguno de los dominios de talentos o armas de tus personajes activos rota el <strong>${escapeHtml(dName)}</strong>.<br />
          Puedes seleccionar otro día en la barra superior o hacer clic en <strong>${escapeHtml(tf.viewAllDaysBtn || "Ver Todos los Días")}</strong>.
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = html;

  // Eventos de toggle colapsable
  container.querySelectorAll("[data-toggle-sec]").forEach((bar) => {
    bar.addEventListener("click", () => {
      const secId = bar.dataset.toggleSec;
      if (!state.farmingCollapsible) state.farmingCollapsible = {};
      state.farmingCollapsible[secId] = !(state.farmingCollapsible[secId] !== false);

      const grid = document.getElementById(`gridSec_${secId}`);
      const arrow = bar.querySelector(".seelie-collapsible-arrow");
      const open = state.farmingCollapsible[secId];

      if (grid) grid.style.display = open ? "grid" : "none";
      if (arrow) arrow.classList.toggle("closed", !open);
    });
  });

  // Eventos para filtrar al hacer clic en los avatares al pie de las tarjetas
  container.querySelectorAll(".seelie-card-avatar").forEach((av) => {
    av.addEventListener("click", (e) => {
      e.stopPropagation();
      const charKey = av.dataset.charKey;
      if (charKey) {
        state.farmingCharFilter = (state.farmingCharFilter === charKey) ? "all" : charKey;
        renderFarming();
      }
    });
  });
}

function renderSeelieSourceCard(card, currentDayIdx, activeFilterDay) {
  if (typeof currentDayIdx === "undefined") {
    currentDayIdx = getActiveServerDay();
  }

  const t = (typeof I18N !== "undefined" && (I18N[state.lang] || I18N.es)) || {};
  const tf = t.farming || {};
  const tp = t.planner || {};
  const dayNames = Array.isArray(tf.days) ? tf.days : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  const isResin = card.cost > 0;
  const tagClass = `tag-${card.tagType || "elite"}`;

  // Horario y disponibilidad del dominio
  const isAllDays = (!card.scheduleDays || card.scheduleDays.length >= 7);
  const isOpenToday = isAllDays || card.scheduleDays.includes(currentDayIdx);
  const isOpenOnFilterDay = (activeFilterDay !== null && card.scheduleDays && card.scheduleDays.includes(activeFilterDay));

  let nextDayName = "";
  if (!isOpenToday && card.scheduleDays) {
    for (let offset = 1; offset <= 7; offset++) {
      const d = (currentDayIdx + offset) % 7;
      if (card.scheduleDays.includes(d)) {
        nextDayName = dayNames[d];
        break;
      }
    }
  }

  const dailyWord = { es: "Diario", en: "Daily", pt: "Diário", ja: "毎日", ko: "매일" }[state.lang] || "Diario";
  const openTodayWord = { es: "¡Disponible Hoy!", en: "Open Today!", pt: "Disponível Hoje!", ja: "本日開放中！", ko: "오늘 개방!" }[state.lang] || "¡Disponible Hoy!";
  const closedTodayWord = { es: "Cerrado hoy", en: "Closed today", pt: "Fechado hoje", ja: "本日閉鎖", ko: "오늘 닫힘" }[state.lang] || "Cerrado hoy";
  const runsWord = { es: "tiradas", en: "runs", pt: "tentativas", ja: "周回", ko: "회" }[state.lang] || "tiradas";
  const resinWord = { es: "Resina", en: "Resin", pt: "Resina", ja: "樹脂", ko: "레진" }[state.lang] || "Resina";

  let scheduleBadge = "";
  if (isAllDays) {
    scheduleBadge = `<span class="badge-avail-always"><img src="assets/ui/calendar.svg" class="seelie-inline-icon" alt="Diario" /> ${escapeHtml(dailyWord)}</span>`;
  } else if (isOpenToday) {
    scheduleBadge = `<span class="badge-avail-open"><img src="assets/ui/bolt.svg" class="seelie-inline-icon" alt="Hoy" /> ${escapeHtml(openTodayWord)}</span>`;
  } else if (activeFilterDay !== null && isOpenOnFilterDay) {
    scheduleBadge = `<span class="badge-avail-open" style="background:rgba(56,189,248,0.22);border-color:#38bdf8;color:#7dd3fc;box-shadow:0 0 8px rgba(56,189,248,0.35);"><img src="assets/ui/sparkle.svg" class="seelie-inline-icon" alt="Abierto" /> ${escapeHtml(dayNames[activeFilterDay])}</span>`;
  } else {
    scheduleBadge = `<span class="badge-avail-closed"><img src="assets/ui/lock.svg" class="seelie-inline-icon" alt="Cerrado" /> ${escapeHtml(closedTodayWord)} (${escapeHtml(nextDayName)})</span>`;
  }

  const scheduleRowHtml = `
    <div class="seelie-card-schedule-row">
      <span class="seelie-card-schedule-days">
        <img src="assets/ui/calendar.svg" class="seelie-inline-icon" alt="Calendario" />
        <strong>${escapeHtml(card.scheduleText || dailyWord)}</strong>
      </span>
      ${scheduleBadge}
    </div>
  `;

  // Subheader de Resina Original & Resina Concentrada
  const daysNum = card.daysNeeded !== undefined ? card.daysNeeded : (card.days || 0);
  const subheaderHtml = isResin
    ? `
      <div class="seelie-card-subheader">
        <div class="seelie-sub-group">
          <span class="sub-item sub-runs" title="Tiradas necesarias estimadas">x${card.runs} ${escapeHtml(runsWord)}</span>
          <span class="sub-item sub-resin" title="Gasto total en Resina Original">
            <img src="assets/ui/resin.png" class="seelie-stat-icon" alt="Resina Original" />
            ${card.resin.toLocaleString()} ${escapeHtml(resinWord)}
          </span>
          ${card.cost === 20 ? `<span class="sub-item sub-cond" title="Equivalencia en Resinas Concentradas (60 ✦ c/u)">
            <img src="assets/ui/condensed_resin.png" class="seelie-stat-icon" alt="Resina Concentrada" />
            ${card.condResin} ${escapeHtml(tp.condensedWord || "Concentradas")}
          </span>` : ""}
        </div>
        <div class="sub-days" title="Tiempo de recarga natural estimado a 180 resina al día">
          <img src="assets/ui/clock.svg" class="seelie-inline-icon" alt="Tiempo" /> ~${daysNum} ${escapeHtml(tf.daysWord || "días")}
        </div>
      </div>
    `
    : "";

  // Grid de materiales
  const matsHtml = card.items.map((it) => {
    const isCompleted = it.deficit <= 0;
    const rarClass = `rar-${Math.max(1, Math.min(5, it.rank || 1))}`;
    const badgeText = isCompleted ? `x${it.required}` : `x${it.deficit}`;
    const checkBadge = isCompleted ? `<span class="seelie-mat-check-badge" title="Completado"><img src="assets/ui/check.svg" style="width:11px;height:11px;vertical-align:top;" alt="✓" /></span>` : "";
    const tooltip = `${it.name}\nTienes: ${it.owned.toLocaleString()} / Requeridos: ${it.required.toLocaleString()}${it.deficit > 0 ? ` (Faltan ${it.deficit.toLocaleString()})` : " (Completo)"}`;

    return `
      <div class="seelie-mat-box ${rarClass}" title="${escapeHtml(tooltip)}">
        <img src="${it.icon}" alt="${escapeHtml(it.name)}" onerror="this.src='https://gi.yatta.moe/assets/UI/UI_ItemIcon_202.png'" />
        ${checkBadge}
        <span class="seelie-mat-deficit-badge">${badgeText}</span>
      </div>
    `;
  }).join("");

  // Avatares al pie
  const avatarsHtml = (card.characters && card.characters.length > 0)
    ? `
      <div class="seelie-card-footer-avatars">
        ${card.characters.map((ch) => {
          const fallback = ch.isWeapon ? "assets/weapon_types/sword.png" : "assets/elements/pyro.png";
          return `
            <img src="${ch.icon || fallback}" alt="${escapeHtml(ch.name)}" class="seelie-card-avatar" data-char-key="${escapeHtml(ch.key)}" title="Lo necesita: ${escapeHtml(ch.name)} (Haz clic para filtrar)" onerror="this.src='${fallback}'" />
          `;
        }).join("")}
      </div>
    `
    : "";

  const regionBadge = card.region ? `<span class="seelie-card-region">${escapeHtml(card.region)}</span>` : "";

  return `
    <div class="seelie-source-card">
      <div class="seelie-card-top">
        <div class="seelie-card-top-meta">
          <span class="seelie-tag-pill ${tagClass}">${escapeHtml(card.tag)}</span>
          ${regionBadge}
        </div>
        <div class="seelie-card-title" title="${escapeHtml(card.title)}">${escapeHtml(card.title)}</div>
        ${card.subTitle ? `<div class="seelie-card-subtitle">${escapeHtml(card.subTitle)}</div>` : ""}
      </div>

      ${scheduleRowHtml}

      ${subheaderHtml}

      <div class="seelie-mat-grid">
        ${matsHtml}
      </div>

      ${avatarsHtml}
    </div>
  `;
}

function applyFarmingTabVisibility() {
  const tab = state.farmingCostTab || "all";
  const secContainer = document.getElementById("seelieFarmingSectionsContainer");
  const scheduleView = document.getElementById("seelieScheduleView");
  const artifactsView = document.getElementById("seelieArtifactsView");

  if (tab === "schedule") {
    if (secContainer) secContainer.style.display = "none";
    if (artifactsView) artifactsView.style.display = "none";
    if (scheduleView) scheduleView.style.display = "block";
    renderFarmingWeeklyDomains();
  } else if (tab === "artifacts") {
    if (secContainer) secContainer.style.display = "none";
    if (scheduleView) scheduleView.style.display = "none";
    if (artifactsView) artifactsView.style.display = "block";
  } else {
    if (scheduleView) scheduleView.style.display = "none";
    if (artifactsView) artifactsView.style.display = "none";
    if (secContainer) secContainer.style.display = "block";

    if (secContainer) {
      secContainer.querySelectorAll(".seelie-section-wrapper").forEach((wrap) => {
        const secId = wrap.dataset.sectionId;
        if (tab === "all") {
          wrap.style.display = "block";
        } else if (tab === "0" && secId === "none") {
          wrap.style.display = "block";
        } else if (tab === "20" && secId === "resin20") {
          wrap.style.display = "block";
        } else if (tab === "40" && secId === "resin40") {
          wrap.style.display = "block";
        } else if (tab === "60" && secId === "resin60") {
          wrap.style.display = "block";
        } else {
          wrap.style.display = "none";
        }
      });
    }
  }
}

function renderSeelieArtifacts() {
  const grid = document.getElementById("seelieArtifactsGrid");
  if (!grid) return;

  const plans = (state.activePlans || []).filter((p) => p.active !== false);
  const activeCharKeys = plans.map((p) => p.key || p.name);

  const ARTIFACT_DOMAINS = [
    {
      name: "Fin del Pecado (Fontaine)",
      resinCost: 20,
      sets: "Cazador Fantasmal / Compañía Dorada",
      icon: null,
      suitedChars: ["Furina", "Neuvillette", "Wriothesley", "Lyney", "Fischl", "Navia"]
    },
    {
      name: "Arboleda de la Reconciliación (Natlan)",
      resinCost: 20,
      sets: "Códice de Obsidiana / Pergamino del Héroe de la Ciudad Cenicienta",
      icon: null,
      suitedChars: ["Mavuika", "Mualani", "Kinich", "Xilonen", "Citlali", "Chasca"]
    },
    {
      name: "Jardín de Otoño (Inazuma)",
      resinCost: 20,
      sets: "Emblema del Destino / Reminiscencia de la Purificación",
      icon: null,
      suitedChars: ["Shogun Raiden", "Xiangling", "Xingchiu", "Yelan", "Beidou"]
    },
    {
      name: "Púspata de la Iluminación (Sumeru)",
      resinCost: 20,
      sets: "Recuerdos del Bosque / Sueños Áureos",
      icon: null,
      suitedChars: ["Nahida", "Alhacén", "Tignari", "Nilou", "Kuki Shinobu"]
    },
    {
      name: "Palacio de Guyun (Liyue)",
      resinCost: 20,
      sets: "Petra Arcaica / Retroceso del Meteorito",
      icon: null,
      suitedChars: ["Zhongli", "Albedo", "Ninguang", "Navia"]
    },
    {
      name: "Valle de los Recuerdos (Mondstadt)",
      resinCost: 20,
      sets: "Sombra Verde Esmeralda / Doncella Amada",
      icon: null,
      suitedChars: ["Kaedehara Kazuha", "Sacarosa", "Venti", "Jean", "Sayu"]
    }
  ];

  grid.innerHTML = ARTIFACT_DOMAINS.map((dom) => {
    const matches = dom.suitedChars.filter((c) => activeCharKeys.includes(c));
    const isPriority = matches.length > 0;
    const cardClass = isPriority ? "farm-domain-card priority" : "farm-domain-card";
    const banner = isPriority
      ? `<div class="farm-priority-banner"><img src="assets/ui/sparkle.svg" class="seelie-inline-icon" alt="" /> ¡Recomendado para tu Plan! (${escapeHtml(matches.join(", "))})</div>`
      : "";

    return `
      <div class="${cardClass}">
        ${banner}
        <div class="card-top">
          <div style="font-weight:800;font-size:1.02rem;color:var(--gold-bright);">${escapeHtml(dom.name)}</div>
          <span class="farm-resin-cost-badge">${dom.resinCost} ✦</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.6rem;margin:0.4rem 0;">
          <img src="${getArtifactSetIcon(dom.sets)}" alt="${escapeHtml(dom.sets)}" style="width:38px;height:38px;object-fit:contain;border-radius:6px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);" onerror="this.onerror=null;this.style.display='none'" />
          <div>
            <div style="font-weight:700;font-size:0.86rem;color:var(--text-main);">${escapeHtml(dom.sets)}</div>
            <div style="font-size:0.75rem;color:var(--gold-primary);">Abierto los 7 días (24/7)</div>
          </div>
        </div>
        <div class="char-pills">
          ${dom.suitedChars.map((ch) => {
            const isPlanned = activeCharKeys.includes(ch);
            const style = isPlanned ? "background:rgba(234,179,8,0.25);border-color:var(--gold-primary);color:var(--gold-bright);font-weight:800;" : "";
            const starIcon = isPlanned ? '<img src="assets/ui/sparkle.svg" style="width:11px;height:11px;display:inline-block;vertical-align:-1px;margin-right:2px;" alt="" />' : '☆';
            return `<span class="char-pill" style="${style}">${starIcon} ${escapeHtml(ch)}</span>`;
          }).join("")}
        </div>
      </div>
    `;
  }).join("");
}

const FARM_DOMAIN_UI_I18N = {
  es: {
    daysFull: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    today: "(Hoy)",
    noDomains: "No hay dominios que coincidan con los filtros seleccionados.",
    gResin20: "Dominios de Talentos & Armas (20 ✦ de Resina por tirada)",
    gResin40: "Jefes de Mundo (40 ✦ de Resina por combate)",
    gResin30: "Jefes Semanales (30 ✦ los primeros 3 / 60 ✦ habitual)",
    gLeylines: "Líneas Ley de Teyvat (20 ✦ de Resina por brote)",
    sundayTitle: "¡DOMINGO DE TEYVAT: TODOS LOS DOMINIOS ABIERTOS!",
    sundayDesc: "Hoy puedes farmear cualquier libro de talento o material de arma a libre elección.",
    available: "disponibles",
    reqPlan: "¡Requerido para tu Plan!",
    neededBy: "Lo necesita:",
    missing: "Faltan",
    everyDay247: "Todos los días (24/7)",
    compatWeapons: "Armas compatibles:"
  },
  en: {
    daysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    today: "(Today)",
    noDomains: "No domains match the selected filters.",
    gResin20: "Talent & Weapon Domains (20 ✦ Resin per run)",
    gResin40: "World Bosses (40 ✦ Resin per battle)",
    gResin30: "Weekly Bosses (30 ✦ first 3 / 60 ✦ regular)",
    gLeylines: "Teyvat Ley Lines (20 ✦ Resin per blossom)",
    sundayTitle: "TEYVAT SUNDAY: ALL DOMAINS OPEN!",
    sundayDesc: "Today you can farm any talent book or weapon material of your choice.",
    available: "available",
    reqPlan: "Required for your Plan!",
    neededBy: "Needed by:",
    missing: "Missing",
    everyDay247: "Every day (24/7)",
    compatWeapons: "Compatible weapons:"
  },
  pt: {
    daysFull: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    today: "(Hoje)",
    noDomains: "Nenhum domínio corresponde aos filtros selecionados.",
    gResin20: "Domínios de Talentos & Armas (20 ✦ de Resina por tentativa)",
    gResin40: "Chefes de Mundo (40 ✦ de Resina por combate)",
    gResin30: "Chefes Semanais (30 ✦ nos primeiros 3 / 60 ✦ normal)",
    gLeylines: "Linhas Ley de Teyvat (20 ✦ de Resina por flor)",
    sundayTitle: "DOMINGO DE TEYVAT: TODOS OS DOMÍNIOS ABERTOS!",
    sundayDesc: "Hoje você pode farmar qualquer livro de talento ou material de arma de sua escolha.",
    available: "disponíveis",
    reqPlan: "Necessário para seu Plano!",
    neededBy: "Necessário para:",
    missing: "Faltam",
    everyDay247: "Todos os dias (24/7)",
    compatWeapons: "Armas compatíveis:"
  },
  ja: {
    daysFull: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
    daysShort: ["日", "月", "火", "水", "木", "金", "土"],
    today: "(今日)",
    noDomains: "選択したフィルターに一致する秘境がありません。",
    gResin20: "天賦＆武器秘境 (1回 樹脂 20 ✦)",
    gResin40: "フィールドボス (1回 樹脂 40 ✦)",
    gResin30: "週ボス (最初の3回 30 ✦ / 通常 60 ✦)",
    gLeylines: "地脈の花 (1回 樹脂 20 ✦)",
    sundayTitle: "テイワットの日曜日：全秘境開放！",
    sundayDesc: "今日はすべての天賦本や武器突破素材を自由に周回できます。",
    available: "件利用可能",
    reqPlan: "育成計画に必要！",
    neededBy: "対象:",
    missing: "不足",
    everyDay247: "毎日 (24/7)",
    compatWeapons: "対応武器:"
  },
  ko: {
    daysFull: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    daysShort: ["일", "월", "화", "수", "목", "금", "토"],
    today: "(오늘)",
    noDomains: "선택한 필터와 일치하는 비경이 없습니다.",
    gResin20: "특성 & 무기 비경 (1회 레진 20 ✦)",
    gResin40: "필드 보스 (1회 레진 40 ✦)",
    gResin30: "주간 보스 (최초 3회 30 ✦ / 일반 60 ✦)",
    gLeylines: "티바트 지맥의 꽃 (1회 레진 20 ✦)",
    sundayTitle: "티바트 일요일: 모든 비경 개방!",
    sundayDesc: "오늘은 원하는 모든 특성 책과 무기 돌파 소재를 자유롭게 파밍할 수 있습니다.",
    available: "개 이용 가능",
    reqPlan: "육성 계획에 필요!",
    neededBy: "필요 캐릭터:",
    missing: "부족",
    everyDay247: "매일 (24/7)",
    compatWeapons: "호환 무기:"
  }
};

function renderFarmingWeeklyTabs() {
  const container = document.getElementById("dayButtons");
  if (!container) return;

  const lang = state.lang || "es";
  const fd = FARM_DOMAIN_UI_I18N[lang] || FARM_DOMAIN_UI_I18N.es;
  const todayIdx = new Date().getDay();
  container.innerHTML = "";

  FARMING_DAYS_META.forEach((day) => {
    const btn = document.createElement("button");
    const isToday = day.idx === todayIdx;
    const isSelected = state.farmingDay === day.idx;
    const dayName = fd.daysFull[day.idx] || day.name;

    btn.className = `chip-btn ${isSelected ? "active" : ""}`;
    btn.innerHTML = `${dayName} ${isToday ? `<strong style="color:var(--gold-bright);">${fd.today}</strong>` : ''}`;

    btn.addEventListener("click", () => {
      state.farmingDay = day.idx;
      container.querySelectorAll(".chip-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderFarmingWeeklyDomains();
    });

    container.appendChild(btn);
  });
}

function renderFarmingWeeklyDomains() {
  const container = document.getElementById("farmingDomainsByResinContainer");
  if (!container || typeof FarmingEngine === "undefined") return;

  const lang = state.lang || "es";
  const fd = FARM_DOMAIN_UI_I18N[lang] || FARM_DOMAIN_UI_I18N.es;
  const dayIdx = state.farmingDay !== undefined ? state.farmingDay : new Date().getDay();
  const costFilter = state.farmingResinFilter || "all";
  const domains = FarmingEngine.getDomainsForDay(dayIdx, costFilter);

  if (domains.length === 0) {
    container.innerHTML = `<div style="padding:2rem;text-align:center;color:var(--text-muted);">${fd.noDomains}</div>`;
    return;
  }

  // Agrupar por coste de resina
  const groups = {
    resin20: { title: fd.gResin20, icon: "assets/ui/tab_domain.png", items: [] },
    resin40: { title: fd.gResin40, icon: "assets/ui/tab_boss.png", items: [] },
    resin30: { title: fd.gResin30, icon: "assets/ui/tab_weekly.png", items: [] },
    leylines: { title: fd.gLeylines, icon: "assets/ui/tab_common.png", items: [] }
  };

  domains.forEach((d) => {
    if (d.type === "leylines") groups.leylines.items.push(d);
    else if (d.resinCost === 20) groups.resin20.items.push(d);
    else if (d.resinCost === 40) groups.resin40.items.push(d);
    else if (d.type === "weekly") groups.resin30.items.push(d);
  });

  const isSunday = dayIdx === 0;
  let html = "";

  if (isSunday) {
    html += `
      <div class="status-banner ready" style="margin-bottom:0.8rem;border-left:4px solid var(--gold-bright);display:flex;align-items:center;gap:0.5rem;">
        <img src="assets/ui/sparkle.svg" class="seelie-inline-icon" alt="Abierto" /> <strong>${fd.sundayTitle}</strong> ${fd.sundayDesc}
      </div>
    `;
  }

  Object.values(groups).forEach((g) => {
    if (g.items.length === 0) return;

    html += `
      <div>
        <div class="farm-section-header-resin">
          <h4 style="margin:0;font-size:1.02rem;color:var(--gold-bright);display:flex;align-items:center;gap:0.45rem;">
            <img src="${g.icon}" style="width:20px;height:20px;object-fit:contain;" alt="" />
            ${escapeHtml(g.title)}
          </h4>
          <span style="font-size:0.8rem;color:var(--text-muted);font-weight:700;">${g.items.length} ${fd.available}</span>
        </div>
        <div class="cards-grid">
          ${g.items.map((dom) => renderSingleDomainCard(dom)).join("")}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderSingleDomainCard(dom) {
  const lang = state.lang || "es";
  const fd = FARM_DOMAIN_UI_I18N[lang] || FARM_DOMAIN_UI_I18N.es;
  const isPriority = dom.isPriority;
  const cardClass = isPriority ? "farm-domain-card priority" : "farm-domain-card";

  const priorityBanner = isPriority
    ? `
      <div class="farm-priority-banner">
        <span style="display:inline-flex;align-items:center;gap:4px;"><img src="assets/ui/sparkle.svg" class="seelie-inline-icon" alt="" /> ${fd.reqPlan}</span>
        <span style="font-size:0.75rem;font-weight:700;">${fd.neededBy} ${escapeHtml(dom.priorityMatches.map(m => m.charName).join(", "))} (${fd.missing} ${dom.totalDeficit.toLocaleString()})</span>
      </div>
    `
    : "";

  const resinBadgeClass = dom.resinCost === 40 ? "purple" : dom.type === "weekly" ? "orange" : "";
  const daysText = dom.days && dom.days.length === 7 ? fd.everyDay247 : (dom.days ? dom.days.map(d => fd.daysShort[d]).join(" / ") : "");

  let contentHtml = "";
  if (dom.characters && dom.characters.length > 0) {
    contentHtml = `
      <div class="char-pills">
        ${dom.characters.map((ch) => {
          const isStarred = (state.starredChars || []).includes(ch);
          const isPlanned = (state.activePlans || []).some(p => p.active !== false && (p.key === ch || p.name === ch));
          const starIcon = isPlanned ? '<img src="assets/ui/sparkle.svg" style="width:12px;height:12px;display:inline-block;vertical-align:-1px;margin-right:2px;" alt="" />' : isStarred ? '★' : '☆';
          const style = isPlanned ? "background:rgba(234,179,8,0.25);border-color:var(--gold-primary);color:var(--gold-bright);font-weight:800;" : "";
          return `<span class="char-pill ${isStarred ? 'starred' : ''}" style="${style}">${starIcon} ${escapeHtml(ch)}</span>`;
        }).join("")}
      </div>
    `;
  } else if (dom.weaponsDesc) {
    contentHtml = `
      <div style="font-size:0.8rem;color:var(--text-muted);line-height:1.4;">
        <strong style="color:var(--text-main);">${fd.compatWeapons}</strong> ${escapeHtml(dom.weaponsDesc)}
      </div>
    `;
  } else if (dom.note) {
    contentHtml = `
      <div style="font-size:0.8rem;color:var(--text-muted);line-height:1.4;">
        ${escapeHtml(dom.note)}
      </div>
    `;
  }

  return `
    <div class="${cardClass}">
      ${priorityBanner}
      <div class="card-top" style="margin-bottom:0.4rem;">
        <div>
          <span class="region-tag">${escapeHtml(dom.region)}</span>
          <div style="font-size:1.02rem;font-weight:800;color:var(--gold-bright);margin-top:0.15rem;">
            ${escapeHtml(dom.name)}
          </div>
        </div>
        <span class="farm-resin-cost-badge ${resinBadgeClass}">
          <img src="assets/ui/resin.png" style="width:14px;height:14px;object-fit:contain;vertical-align:middle;margin-right:2px;" alt="" /> ${dom.resinCost}
        </span>
      </div>

      <div style="display:flex;align-items:center;gap:0.6rem;padding:0.45rem 0;border-bottom:1px solid rgba(255,255,255,0.06);margin-bottom:0.4rem;">
        <img src="${dom.icon}" alt="${escapeHtml(dom.matName)}" style="width:36px;height:36px;object-fit:contain;border-radius:6px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);" onerror="this.style.display='none'" />
        <div>
          <div style="font-weight:700;font-size:0.88rem;color:var(--text-main);">${escapeHtml(dom.matName)}</div>
          <div style="font-size:0.75rem;color:var(--gold-primary);">${escapeHtml(daysText)}</div>
        </div>
      </div>

      ${contentHtml}
    </div>
  `;
}

/* =====================================================================
   GESTOR DE PERFILES Y CUENTAS (MULTI-UID) - INTEGRADO EN PANEL DRIVE
   ===================================================================== */
const PROFILE_MGR_I18N = {
  es: {
    srvAuto: "Servidor: Auto-detectado por 1er dígito",
    srvLbl: "Servidor",
    accCount: (n) => `${n} Cuenta${n === 1 ? '' : 's'} (UID) Registrada${n === 1 ? '' : 's'}`,
    activeAcc: "Cuenta Activa:",
    savedWishes: "Deseos Guardados:",
    statusLbl: "Estado:",
    statusIsolated: "Datos 100% Aislados sin Mezclar"
  },
  en: {
    srvAuto: "Server: Auto-detected by 1st digit",
    srvLbl: "Server",
    accCount: (n) => `${n} Registered Account${n === 1 ? '' : 's'} (UID)`,
    activeAcc: "Active Account:",
    savedWishes: "Saved Wishes:",
    statusLbl: "Status:",
    statusIsolated: "100% Isolated Data without Mixing"
  },
  pt: {
    srvAuto: "Servidor: Auto-detectado pelo 1º dígito",
    srvLbl: "Servidor",
    accCount: (n) => `${n} Conta${n === 1 ? '' : 's'} (UID) Registrada${n === 1 ? '' : 's'}`,
    activeAcc: "Conta Ativa:",
    savedWishes: "Desejos Salvos:",
    statusLbl: "Status:",
    statusIsolated: "Dados 100% Isolados sem Misturar"
  },
  ja: {
    srvAuto: "サーバー: 最初の数字から自動検出",
    srvLbl: "サーバー",
    accCount: (n) => `${n} 件の登録アカウント (UID)`,
    activeAcc: "アクティブアカウント:",
    savedWishes: "保存された祈願:",
    statusLbl: "状態:",
    statusIsolated: "100% 独立して分離されたデータ"
  },
  ko: {
    srvAuto: "서버: 첫 번째 숫자로 자동 감지",
    srvLbl: "서버",
    accCount: (n) => `${n}개 등록된 계정 (UID)`,
    activeAcc: "활성 계정:",
    savedWishes: "저장된 기원:",
    statusLbl: "상태:",
    statusIsolated: "100% 독립 분리된 데이터"
  }
};

function initProfileManagerEvents() {
  const select = document.getElementById("profileSelectDropdown");
  const btnSwitch = document.getElementById("btnSwitchProfile");
  const btnRename = document.getElementById("btnRenameProfile");
  const btnDelete = document.getElementById("btnDeleteActiveProfile");
  const btnCreate = document.getElementById("btnCreateNewProfile");
  const newUidInput = document.getElementById("newProfileUid");
  const serverBadge = document.getElementById("newProfileServerBadge");

  // Auto-detección en vivo de servidor según el primer dígito del UID
  if (newUidInput && serverBadge) {
    newUidInput.addEventListener("input", (e) => {
      const pm = PROFILE_MGR_I18N[state.lang || "es"] || PROFILE_MGR_I18N.es;
      const val = e.target.value.trim();
      if (!val) {
        serverBadge.textContent = pm.srvAuto;
      } else if (typeof WishEngine !== "undefined") {
        const srv = WishEngine.detectServerFromUid(val);
        serverBadge.textContent = `${pm.srvLbl}: ${srv}`;
      }
    });
  }

  if (select) {
    select.addEventListener("change", (e) => {
      handleSwitchProfile(e.target.value);
    });
  }
  if (btnSwitch) {
    btnSwitch.addEventListener("click", () => {
      if (select) handleSwitchProfile(select.value);
    });
  }
  if (btnRename) {
    btnRename.addEventListener("click", handleRenameActiveProfileUid);
  }
  if (btnDelete) {
    btnDelete.addEventListener("click", handleDeleteActiveProfile);
  }
  if (btnCreate) {
    btnCreate.addEventListener("click", handleCreateNewProfile);
  }
}

async function renderProfileManager() {
  if (typeof WishEngine !== "undefined") {
    const pm = PROFILE_MGR_I18N[state.lang || "es"] || PROFILE_MGR_I18N.es;
    const profiles = WishEngine.getStoredProfiles();
    const activeUid = state.activeWishUid || WishEngine.getActiveAccountUid() || "default";
    const activeProfile = profiles.find((p) => p.uid === activeUid) || profiles[0] || { uid: activeUid, name: `UID: ${activeUid}`, server: "América" };

    // Obtener nombre y UID de la cuenta activa
    let customAccountName = "";
    let assignedAccountUid = "";
    if (typeof AccountManager !== "undefined") {
      const activeAccId = AccountManager.getActiveAccountId();
      const names = AccountManager.getAccountNamesMap();
      if (names && names[activeAccId]) {
        customAccountName = String(names[activeAccId]).trim();
      }
      assignedAccountUid = AccountManager.getAccountUid(activeAccId);
    }
    if (!customAccountName) {
      try {
        const storedNames = JSON.parse(localStorage.getItem("accountNames") || "{}");
        const activeAccId = localStorage.getItem("account") || "main";
        if (storedNames && storedNames[activeAccId]) {
          customAccountName = String(storedNames[activeAccId]).trim();
        }
        const storedUids = JSON.parse(localStorage.getItem("accountUids") || "{}");
        if (storedUids && storedUids[activeAccId]) {
          assignedAccountUid = String(storedUids[activeAccId]).trim();
        }
      } catch (e) {}
    }

    const effectiveUid = assignedAccountUid || (activeProfile.uid !== "default" ? activeProfile.uid : "") || "";
    const hasValidUid = !!effectiveUid;
    const serverName = hasValidUid ? WishEngine.detectServerFromUid(effectiveUid) : (activeProfile.server || "América");

    // 1. Actualizar el indicador del perfil activo en el header del contador de deseos
    const lblName = document.getElementById("lblActiveProfileName");
    if (lblName) {
      if (customAccountName) {
        if (hasValidUid) {
          lblName.innerHTML = `<span style="color:#ffffff;font-weight:700;">${escapeHtml(customAccountName)}</span> <span style="opacity:0.85;font-size:0.8rem;font-weight:500;">(UID: ${escapeHtml(effectiveUid)} &bull; ${escapeHtml(serverName)})</span>`;
        } else {
          lblName.innerHTML = `<span style="color:#ffffff;font-weight:700;">${escapeHtml(customAccountName)}</span> <span style="opacity:0.65;font-size:0.8rem;font-weight:500;">(Sin UID)</span>`;
        }
      } else {
        if (hasValidUid) {
          lblName.textContent = `UID: ${effectiveUid} (${serverName})`;
        } else {
          lblName.textContent = "Cuenta Principal (Sin UID)";
        }
      }
    }

    const btnGoProfiles = document.getElementById("btnGoToProfiles");
    if (btnGoProfiles) {
      const tooltipName = customAccountName || `UID ${activeProfile.uid}`;
      btnGoProfiles.title = `${pm.activeAcc}: ${tooltipName} — Clic para ver y cambiar cuentas`;
    }

    // 2. Poblar el dropdown de perfiles en el panel de Drive (estrictamente por UID)
    const select = document.getElementById("profileSelectDropdown");
    if (select) {
      select.innerHTML = profiles.map((p) => {
        const isSel = p.uid === activeProfile.uid ? "selected" : "";
        const safeUid = escapeHtml(p.uid);
        const safeServer = escapeHtml(p.server);
        const prefix = customAccountName ? `${escapeHtml(customAccountName)} — ` : "";
        return `<option value="${safeUid}" ${isSel}>${prefix}UID: ${safeUid} — ${pm.srvLbl} ${safeServer}</option>`;
      }).join("");
    }

    // 3. Actualizar badge de cantidad de perfiles
    const countBadge = document.getElementById("profileCountBadge");
    if (countBadge) {
      countBadge.textContent = pm.accCount(profiles.length);
    }

    // 4. Resumen del perfil activo
    const summaryBox = document.getElementById("activeProfileSummary");
    if (summaryBox) {
      const totalWishes = (state.rawWishes || []).length;
      const safeActiveUid = escapeHtml(activeProfile.uid);
      const safeActiveServer = escapeHtml(activeProfile.server);
      const accBadge = customAccountName ? `<strong style="color:#ffffff;margin-right:6px;">${escapeHtml(customAccountName)}</strong> &bull; ` : "";
      summaryBox.innerHTML = `
        <div class="chart-stat-pill" style="padding:0.4rem 0.8rem;background:rgba(59,130,246,0.12);border-color:rgba(59,130,246,0.3);color:#93c5fd;display:inline-flex;align-items:center;gap:4px;">
          <img src="assets/ui/user.svg" class="seelie-inline-icon" alt="" /> ${accBadge}${pm.activeAcc} <strong style="color:#ffffff;font-family:Consolas,monospace;">UID ${safeActiveUid}</strong>
        </div>
        <div class="chart-stat-pill" style="padding:0.4rem 0.8rem;display:inline-flex;align-items:center;gap:4px;">
          <img src="assets/ui/globe.svg" class="seelie-inline-icon" alt="" /> ${pm.srvLbl}: <strong style="color:#ffffff;">${safeActiveServer}</strong>
        </div>
        <div class="chart-stat-pill" style="padding:0.4rem 0.8rem;display:inline-flex;align-items:center;gap:4px;">
          <img src="assets/ui/clipboard.svg" class="seelie-inline-icon" alt="" /> ${pm.savedWishes} <strong style="color:#fbbf24;">${totalWishes.toLocaleString()}</strong>
        </div>
        <div class="chart-stat-pill" style="padding:0.4rem 0.8rem;border-color:rgba(34,197,94,0.3);color:#86efac;display:inline-flex;align-items:center;gap:4px;">
          <img src="assets/ui/lock.svg" class="seelie-inline-icon" alt="" /> ${pm.statusLbl} <strong>${pm.statusIsolated}</strong>
        </div>
      `;
    }
  }
}

async function handleSwitchProfile(newUid) {
  if (!newUid || typeof WishEngine === "undefined") return;
  if (newUid === state.activeWishUid && state.rawWishes && state.rawWishes.length > 0) return;

  state.activeWishUid = newUid;
  WishEngine.setActiveAccountUid(newUid);

  // Cargar los deseos aislados correspondientes a este UID
  const loaded = await WishEngine.loadWishesFromStorage(newUid);
  state.rawWishes = loaded || [];
  state.wishTablePage = 1;

  renderWishesDashboard();
  renderProfileManager();
  triggerDriveSyncStamp();

  console.log(`[ProfileManager] Cuenta activa cambiada a UID: ${newUid}`);
}

async function handleRenameActiveProfileUid() {
  if (typeof WishEngine === "undefined") return;
  const currentUid = state.activeWishUid;
  const initialVal = (currentUid === "PaimonMoe_User" || currentUid === "Spirifly_User" || currentUid === "default") ? "" : currentUid;

  const inputUid = prompt("Ingresa tu UID oficial de Genshin Impact (9 dígitos):", initialVal);
  if (!inputUid) return;

  const cleanUid = inputUid.trim();
  if (!/^\d{9,10}$/.test(cleanUid)) {
    const ok = confirm(`El UID ingresado "${cleanUid}" no tiene el formato usual de 9 dígitos de Genshin Impact.\n\n¿Deseas guardarlo de todos modos?`);
    if (!ok) return;
  }

  const newUid = await WishEngine.renameProfileUid(currentUid, cleanUid);
  await handleSwitchProfile(newUid);
  alert(`Tu historial de deseos quedó asignado oficialmente a tu UID: ${newUid}`);
}

async function handleCreateNewProfile() {
  const uidInput = document.getElementById("newProfileUid");
  const uid = (uidInput ? uidInput.value : "").trim();

  if (!uid) {
    alert("Por favor ingresa el UID numérico de la cuenta.");
    return;
  }

  if (typeof WishEngine !== "undefined") {
    const server = WishEngine.detectServerFromUid(uid);
    WishEngine.saveProfile({
      uid: uid,
      name: `UID: ${uid}`,
      server: server,
      createdAt: new Date().toISOString()
    });

    if (uidInput) uidInput.value = "";
    await handleSwitchProfile(uid);
  }
}

async function handleDeleteActiveProfile() {
  if (typeof WishEngine === "undefined") return;

  const profiles = WishEngine.getStoredProfiles();
  if (profiles.length <= 1) {
    alert("No puedes eliminar la única cuenta existente.");
    return;
  }

  const activeUid = state.activeWishUid;
  const ok = confirm(`¿Estás seguro de que deseas eliminar la cuenta con UID "${activeUid}" y todos sus deseos guardados?\n\nEsta acción no se puede deshacer.`);
  if (!ok) return;

  const remaining = await WishEngine.deleteProfile(activeUid);
  const nextUid = remaining.length > 0 ? remaining[0].uid : "default";

  await handleSwitchProfile(nextUid);
}

function calculateAdSenseSim() {
  const pv = Math.max(1000, parseInt(document.getElementById("simPageviews").value || "50000", 10));
  const rpm = parseFloat(document.getElementById("simMarket").value || "7.5");
  document.getElementById("pvDisplay").textContent = pv.toLocaleString();
  const monthlyUsd = (pv / 1000) * rpm;
  document.getElementById("valEstMonthly").textContent = `$${monthlyUsd.toFixed(0)} USD`;
  document.getElementById("valEstYearly").textContent = `$${(monthlyUsd * 12).toFixed(0)} USD`;
}

document.addEventListener("DOMContentLoaded", initApp);


// =====================================================================
// GUÍA RÁPIDA / TUTORIAL INTERACTIVO DE SPIRIFLY
// =====================================================================
function initInteractiveTutorial() {
  const modal = document.getElementById("modalInteractiveTutorial");
  if (!modal) return;

  const totalSteps = 6;
  let currentStep = 0;

  const slides = modal.querySelectorAll(".tutorial-slide");
  const chips = modal.querySelectorAll(".step-chip");
  const stepCounter = document.getElementById("tutorialStepCounter");
  const btnPrev = document.getElementById("btnTutorialPrev");
  const btnNext = document.getElementById("btnTutorialNext");
  const btnFinish = document.getElementById("btnTutorialFinish");
  const btnSkip = document.getElementById("btnTutorialSkip");
  const btnCloseX = document.getElementById("btnCloseTutorialX");
  const btnOpenHeader = document.getElementById("btnOpenTutorialModal");

  function updateTutorialStep(step) {
    currentStep = Math.max(0, Math.min(totalSteps - 1, step));

    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === currentStep);
    });

    chips.forEach((chip, idx) => {
      chip.classList.toggle("active", idx === currentStep);
      chip.classList.toggle("completed", idx < currentStep);
    });

    modal.dataset.step = String(currentStep);
    chips.forEach((chip, idx) => {
      if (idx === currentStep) chip.setAttribute("aria-current", "step");
      else chip.removeAttribute("aria-current");
    });
    if (stepCounter) stepCounter.textContent = formatTutorialStep(state.lang, currentStep + 1, totalSteps);
    modal.querySelector(".tutorial-body").scrollTop = 0;
    if (modal.classList.contains("open")) chips[currentStep].scrollIntoView({ block: "nearest", inline: "nearest" });

    if (btnPrev) btnPrev.style.display = currentStep > 0 ? "inline-flex" : "none";
    if (btnNext && btnFinish) {
      if (currentStep === totalSteps - 1) {
        btnNext.style.display = "none";
        btnFinish.style.display = "inline-flex";
      } else {
        btnNext.style.display = "inline-flex";
        btnFinish.style.display = "none";
      }
    }
  }

  let previousFocus = null;
  let previousBodyOverflow = "";
  function openTutorial() {
    if (modal.classList.contains("open")) return;
    previousFocus = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    translateInteractiveTutorial(state.lang);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    updateTutorialStep(0);
    btnCloseX.focus({ preventScroll: true });
  }

  function closeTutorial() {
    modal.classList.remove("open");
    document.body.style.overflow = previousBodyOverflow;
    if (previousFocus && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    sessionStorage.setItem("spirifly_tut_dismissed", "true");
  }

  if (btnNext) btnNext.addEventListener("click", () => updateTutorialStep(currentStep + 1));
  if (btnPrev) btnPrev.addEventListener("click", () => updateTutorialStep(currentStep - 1));

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const step = parseInt(chip.dataset.step, 10);
      updateTutorialStep(step);
    });
  });

  if (btnFinish) btnFinish.addEventListener("click", closeTutorial);
  if (btnSkip) btnSkip.addEventListener("click", closeTutorial);
  if (btnCloseX) btnCloseX.addEventListener("click", closeTutorial);
  if (btnOpenHeader) btnOpenHeader.addEventListener("click", openTutorial);

  // Soporte para teclado (flechas y Escape)
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Tab") {
      const focusable = [...modal.querySelectorAll("button:not([disabled]), a[href], input, select, [tabindex='0']")].filter(el => el.getClientRects().length);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.target.matches("select, input, textarea") && e.key !== "Escape") return;
    if (e.key === "ArrowRight" && currentStep < totalSteps - 1) updateTutorialStep(currentStep + 1);
    if (e.key === "ArrowLeft" && currentStep > 0) updateTutorialStep(currentStep - 1);
    if (e.key === "Escape") closeTutorial();
  });

  // Requisito estricto: solo sale cuando detecte que NO hay una cuenta iniciada en Google
  const isDriveLinked = getSpiriflyStorage("drive_linked") === "true";
  const dismissedThisSession = sessionStorage.getItem("spirifly_tut_dismissed") === "true";

  if (!isDriveLinked && !dismissedThisSession) {
    setTimeout(() => {
      openTutorial();
    }, 450);
  }
}
