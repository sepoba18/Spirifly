/* Costos por salto: fuentes contrastadas en Genshin Builds y tablas de talentos
 * https://genshin-builds.com/es/character/traveler_cryo (y variantes por elemento)
 * https://genshin-impact.fandom.com/wiki/Traveler_(Geo)
 * Constelaciones: https://wiki.hoyolab.com/pc/genshin/entry/19?lang=en-us
 * Pyro usa una Piedra angular piroastral por salto desde nivel 6.
 */
(() => {
  const original = REAL_CHARACTERS_DB.find(c => c.id === "10000005-pyro");
  if (!original) throw new Error("Falta la ficha base del Viajero");
  const specs = {
    Anemo: [104301, 112008, 113005, [2, 1]],
    Geo: [104310, 112011, 113006, [2, 1]],
    Electro: [104320, 112044, 113017, [2, 1]],
    Dendro: [104329, 112059, 113032, [1, 2]],
    Hydro: [104338, 112080, 113046, [1, 2]],
    Pyro: [104347, 112104, 113063, [1, 2]],
    Cryo: [104365, 112149, 113075, [2, 1]]
  };
  const mora = [12500,17500,25000,30000,37500,120000,260000,450000,700000];
  const bookOffsets = [0,4,7,1,4,8,2,5,8];
  const bookCounts = [3,2,4,6,9,4,6,12,16];
  const enemyOffsets = [0,1,1,1,1,2,2,2,2];
  const enemyCounts = [6,3,4,6,9,4,6,9,12];
  function costs(element) {
    const [book, enemy, special] = specs[element];
    return Object.fromEntries(mora.map((coinCost, i) => {
      const costItems = {[book + bookOffsets[i]]: bookCounts[i], [enemy + enemyOffsets[i]]: enemyCounts[i]};
      if (i >= 5) costItems[special] = element === "Pyro" ? 1 : (i >= 7 ? 2 : 1);
      if (i === 8) costItems[104319] = 1;
      for (const id of Object.keys(costItems)) {
        if (!REAL_MASTER_MATERIALS[id]) throw new Error(`Material del Viajero ausente: ${id}`);
      }
      return [i + 2, {coinCost, costItems}];
    }));
  }
  for (const [element, spec] of Object.entries(specs)) {
    const ch = element === "Pyro" ? original : JSON.parse(JSON.stringify(original));
    ch.id = `10000005-${element.toLowerCase()}`;
    ch.name = element === "Pyro" ? "Viajero" : `Viajero (${element})`;
    ch.element = element;
    ch.sharedProgression = "traveler";
    ch.talents = ["Ataques normales", "Habilidad elemental", "Definitiva"].map((name, i) => ({
      name, icon: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><text x="24" y="32" text-anchor="middle" fill="white" font-family="Arial" font-size="24">${["NA","E","Q"][i]}</text></svg>`)}`,
      costs: costs(element === "Geo" && i === 0 ? "Anemo" : element)
    }));
    REAL_CHAR_TALENT_BOOSTS[ch.name] = {C3: spec[3][0], C5: spec[3][1]};
    if (element !== "Pyro") REAL_CHARACTERS_DB.push(ch);
  }
})();
