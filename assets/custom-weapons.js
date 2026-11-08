/* Armas personalizadas: costos y familias derivados del catálogo local. */
let customWeaponDraft = null;

function openCustomTypeModal() {
  document.getElementById("seelieCustomTypeModal").classList.add("open");
  document.getElementById("btnCustomTypeCharacter").focus();
}

function closeCustomTypeModal() {
  document.getElementById("seelieCustomTypeModal").classList.remove("open");
}

function getPlannerWeapons() {
  return [...REAL_UPGRADABLE_WEAPONS, ...state.activePlans
    .filter((p) => p.kind === "weapon" && p.isCustom)
    .map((p) => buildCustomWeaponObject(p.customConfig))];
}

function getDefaultCustomWeaponConfig() {
  return { name: "Arma personalizada", type: "Sword", rarity: 5,
    domainMatId: "unknown", commonMatId: "unknown", eliteMatId: "unknown" };
}

function getWeaponMaterialRegion(id) {
  const n = Number(id);
  if (n === 112149) return "Nod-Krai";
  if (n >= 112146) return "Snezhnaya";
  if (n >= 112122) return "Nod-Krai";
  if (n >= 112101) return "Natlan";
  if (n >= 112080) return "Fontaine";
  if (n >= 112059) return "Sumeru";
  if (n >= 112044) return "Inazuma";
  if (n === 112041) return "Liyue";
  return "Varias regiones";
}

function getCustomWeaponFamilies(field) {
  const domain = field === "domainMatId";
  const bases = new Set();
  REAL_UPGRADABLE_WEAPONS.forEach((w) => {
    Object.keys(w.ascensionCosts["1"].costItems).forEach((id) => {
      const m = getMat(id);
      if (domain ? id.startsWith("114") : id.startsWith("112") && m?.rank === (field === "commonMatId" ? 1 : 2)) bases.add(id);
    });
  });
  return [...bases].map((baseId) => {
    const items = Array.from({ length: domain ? 4 : 3 }, (_, i) => getMat(String(Number(baseId) + i))).filter(Boolean);
    const source = domain && FARMING_DOMAINS_REGISTRY.find((s) => s.type === "weapon" && s.matIds.map(String).includes(baseId));
    return { baseId, items, name: items.map((m) => m.name).join(" / "),
      region: domain ? source?.region || "Otras" : getWeaponMaterialRegion(baseId) };
  }).sort((a, b) => {
    const order = (region) => region === "Varias regiones" ? -1 : REGION_ORDER.includes(region) ? REGION_ORDER.indexOf(region) : 999;
    return order(a.region) - order(b.region) || a.name.localeCompare(b.name, "es");
  });
}

function buildCustomWeaponObject(cfg) {
  const rarity = [3, 4, 5].includes(Number(cfg.rarity)) ? Number(cfg.rarity) : 5;
  const template = REAL_UPGRADABLE_WEAPONS.find((w) => w.rarity === rarity);
  const fields = ["domainMatId", "commonMatId", "eliteMatId"];
  const selected = Object.fromEntries(fields.map((field) => [field,
    getCustomWeaponFamilies(field).find((f) => f.baseId === cfg[field])]));
  const first = Object.keys(template.ascensionCosts["1"].costItems);
  const bases = { domainMatId: first.find((id) => id.startsWith("114")),
    commonMatId: first.find((id) => id.startsWith("112") && getMat(id).rank === 1),
    eliteMatId: first.find((id) => id.startsWith("112") && getMat(id).rank === 2) };
  const ascensionCosts = {};
  Object.entries(template.ascensionCosts).forEach(([phase, step]) => {
    const costItems = {};
    Object.entries(step.costItems).forEach(([id, qty]) => {
      const field = fields.find((f) => Number(id) >= Number(bases[f]) && Number(id) < Number(bases[f]) + (f === "domainMatId" ? 4 : 3));
      if (!field || !selected[field]) return;
      const material = selected[field].items[Number(id) - Number(bases[field])];
      if (material) costItems[material.id] = (costItems[material.id] || 0) + qty;
    });
    ascensionCosts[phase] = { coinCost: step.coinCost, costItems };
  });
  return { name: cfg.name, id: `custom_weapon_${cfg.name}`, type: cfg.type, rarity,
    icon: `assets/weapon_types/${cfg.type.toLowerCase()}.png`, isCustom: true, ascensionCosts };
}

function openCustomWeaponModal(key) {
  const existing = state.activePlans.find((p) => p.kind === "weapon" && p.isCustom && p.key === key);
  customWeaponDraft = existing ? { ...existing.customConfig, originalKey: key } : getDefaultCustomWeaponConfig();
  const cfg = customWeaponDraft;
  document.getElementById("customWeaponName").value = cfg.name;
  document.getElementById("customWeaponType").value = cfg.type;
  document.getElementById("customWeaponRarity").value = cfg.rarity;
  document.getElementById("customWeaponMaterialPanel").hidden = true;
  updateCustomWeaponSlots();
  document.getElementById("seelieCustomWeaponModal").classList.add("open");
}

function closeCustomWeaponModal() {
  document.getElementById("seelieCustomWeaponModal").classList.remove("open");
  customWeaponDraft = null;
}

function customWeaponMaterialSummary(family, slot = false) {
  const material = family.items[family.items.length - 1];
  const details = `<span class="seelie-custom-slot-details"><span class="${slot ? "seelie-custom-slot-title" : "seelie-picker-item-name"}">${escapeHtml(material.name)}</span><small class="seelie-custom-slot-sub">${escapeHtml(family.region)}</small></span>`;
  const icon = `<img class="${slot ? "" : "seelie-picker-item-img"} rar-bg-${material.rank}" src="${material.icon}" alt="${escapeHtml(material.name)}" width="38" height="38" loading="lazy" />`;
  return slot ? `<span class="seelie-custom-slot-left">${icon}${details}</span><span class="chip-btn">Cambiar</span>` : `${icon}${details}`;
}

function updateCustomWeaponSlots() {
  for (const field of ["domainMatId", "commonMatId", "eliteMatId"]) {
    const family = getCustomWeaponFamilies(field).find((f) => f.baseId === customWeaponDraft[field]);
    const slot = document.getElementById(`customWeapon_${field}`);
    slot.style.color = "inherit";
    slot.style.textAlign = "left";
    slot.innerHTML = family ? customWeaponMaterialSummary(family, true) : "Por confirmar · sin incluir en el cálculo";
  }
}

function renderCustomWeaponMaterials(field, search = "") {
  const panel = document.getElementById("customWeaponMaterialPanel");
  panel.hidden = false;
  panel.dataset.field = field;
  const grid = document.getElementById("customWeaponMaterialGrid");
  grid.innerHTML = "";
  const addChoice = (label, id, family) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `seelie-picker-item-card${customWeaponDraft[field] === id ? " selected" : ""}`;
    button.style.color = "inherit";
    button.style.textAlign = "left";
    button.innerHTML = family ? customWeaponMaterialSummary(family) : escapeHtml(label);
    button.onclick = () => { customWeaponDraft[field] = id; panel.hidden = true; updateCustomWeaponSlots(); };
    grid.appendChild(button);
  };
  addChoice("Por confirmar · no incluir este material", "unknown");
  let region = null;
  const matches = getCustomWeaponFamilies(field).filter((f) => normalizeMaterialSearch(`${f.name} ${f.region}`).includes(normalizeMaterialSearch(search)));
  matches.forEach((f) => {
    if (region !== f.region) {
      region = f.region;
      const header = document.createElement("div");
      header.className = "seelie-picker-section-header";
      header.textContent = region;
      grid.appendChild(header);
    }
    addChoice(f.name, f.baseId, f);
  });
  if (!matches.length) {
    const empty = document.createElement("p");
    empty.textContent = "No hay materiales que coincidan.";
    grid.appendChild(empty);
  }
}

function saveCustomWeaponModal() {
  if (!customWeaponDraft) return;
  const name = document.getElementById("customWeaponName").value.trim().slice(0, 32) || "Arma personalizada";
  const originalKey = customWeaponDraft.originalKey;
  if (REAL_WEAPONS_DB.some((w) => normalizeMaterialSearch(w.name) === normalizeMaterialSearch(name)) ||
      state.activePlans.some((p) => p.kind === "weapon" && p.key !== originalKey && normalizeMaterialSearch(p.key) === normalizeMaterialSearch(name))) {
    alert(`Ya existe un arma llamada "${name}". Elige otro nombre.`);
    return;
  }
  const type = document.getElementById("customWeaponType").value;
  const rarity = Number(document.getElementById("customWeaponRarity").value);
  if (!Object.hasOwn(WEAPON_TYPE_LABELS, type) || ![3, 4, 5].includes(rarity)) return;
  const cfg = { ...customWeaponDraft, name, type, rarity };
  delete cfg.originalKey;
  const existing = state.activePlans.find((p) => p.kind === "weapon" && p.isCustom && p.key === originalKey);
  const plan = existing || { uid: `plan_custom_weapon_${Date.now()}`, kind: "weapon", active: true,
    notes: "", weapRefine: 1, curState: 0, tarState: getArProgressionLimits().maxStateIdx };
  Object.assign(plan, { key: name, weaponKey: name, isCustom: true, customConfig: cfg });
  if (!existing) state.activePlans.unshift(plan);
  if (originalKey) state.activePlans.filter((p) => p.kind === "character" && p.weaponKey === originalKey).forEach((p) => {
    p.weaponKey = getRosterCharInfo(p.key)?.weapon === type ? name : "none";
  });
  savePlansToStorage();
  closeCustomWeaponModal();
  openSoloWeaponConfigModal(name, false);
}

function initCustomWeaponEvents() {
  const chooser = document.getElementById("seelieCustomTypeModal");
  if (chooser && !chooser.dataset.initialized) {
    chooser.dataset.initialized = "true";
    document.getElementById("btnCustomTypeCharacter").onclick = () => { closeCustomTypeModal(); openCustomCharModal(); };
    document.getElementById("btnCustomTypeWeapon").onclick = () => { closeCustomTypeModal(); openCustomWeaponModal(); };
    document.getElementById("btnCloseCustomType").onclick = closeCustomTypeModal;
    chooser.addEventListener("click", (e) => { if (e.target === chooser) closeCustomTypeModal(); });
    chooser.addEventListener("keydown", (e) => { if (e.key === "Escape") { e.stopPropagation(); closeCustomTypeModal(); } });
  }
  const modal = document.getElementById("seelieCustomWeaponModal");
  if (!modal || modal.dataset.initialized) return;
  modal.dataset.initialized = "true";
  document.getElementById("btnSaveCustomWeapon").onclick = saveCustomWeaponModal;
  modal.querySelectorAll("[data-close-custom-weapon]").forEach((b) => { b.onclick = closeCustomWeaponModal; });
  modal.addEventListener("click", (e) => { if (e.target === modal) closeCustomWeaponModal(); });
  modal.addEventListener("keydown", (e) => { if (e.key === "Escape") { e.stopPropagation(); closeCustomWeaponModal(); } });
  modal.querySelectorAll("[data-custom-weapon-material]").forEach((b) => {
    b.onclick = () => { document.getElementById("customWeaponMaterialSearch").value = ""; renderCustomWeaponMaterials(b.dataset.customWeaponMaterial); };
  });
  document.getElementById("customWeaponMaterialSearch").oninput = (e) => renderCustomWeaponMaterials(document.getElementById("customWeaponMaterialPanel").dataset.field, e.target.value);
}
