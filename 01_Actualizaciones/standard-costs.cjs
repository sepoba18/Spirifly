// Cantidades por salto contrastadas con la fixture real de 7.1 y el catalogo local.
// No define que materiales usa un personaje: sus IDs deben venir de la fuente.
const ASCENSION = {
  1: { mora: 20000, gem: 1, specialty: 3, enemy: 3 },
  2: { mora: 40000, gem: 3, specialty: 10, enemy: 15, boss: 2 },
  3: { mora: 60000, gem: 6, specialty: 20, enemy: 12, boss: 4 },
  4: { mora: 80000, gem: 3, specialty: 30, enemy: 18, boss: 8 },
  5: { mora: 100000, gem: 6, specialty: 45, enemy: 12, boss: 12 },
  6: { mora: 120000, gem: 6, specialty: 60, enemy: 24, boss: 20 }
};
const TALENTS = {
  2: { mora: 12500, book: 3, enemy: 6 },
  3: { mora: 17500, book: 2, enemy: 3 },
  4: { mora: 25000, book: 4, enemy: 4 },
  5: { mora: 30000, book: 6, enemy: 6 },
  6: { mora: 37500, book: 9, enemy: 9 },
  7: { mora: 120000, book: 4, enemy: 4, boss: 1 },
  8: { mora: 260000, book: 6, enemy: 6, boss: 1 },
  9: { mora: 450000, book: 12, enemy: 9, boss: 2 },
  10: { mora: 700000, book: 16, enemy: 12, boss: 2, crown: 1 }
};
const EXCLUDED = new Set(['10000005', '10000007', '10000117', '10000118']);

function role(id, prefix) {
  id = String(id);
  if (id === '202') return 'mora';
  if (id === '104319') return prefix === 'lvl' ? 'crown' : null;
  if (/^112\d+$/.test(id)) return 'enemy';
  if (/^113\d+$/.test(id)) return 'boss';
  if (prefix === 'lvl' && /^1043\d+$/.test(id)) return 'book';
  if (prefix === 'ascend' && /^1041\d+$/.test(id)) return 'gem';
  if (prefix === 'ascend' && /^(100|101)\d+$/.test(id)) return 'specialty';
  return null;
}

function complete(costs, prefix, character, audit = []) {
  if (EXCLUDED.has(String(character.id).split('-')[0]) || ![4, 5].includes(character.rarity)) return costs;
  const template = prefix === 'ascend' ? ASCENSION : TALENTS;
  const candidates = [];
  let nonstandard = false;
  for (const [level, expected] of Object.entries(template)) {
    const rows = costs?.[`${prefix}${level}`];
    if (!Array.isArray(rows) || !rows.length) continue;
    const roles = rows.map(item => role(item.id, prefix));
    // Una familia desconocida, duplicada o incompleta necesita datos de la fuente.
    if (roles.some(item => !item) || new Set(roles).size !== roles.length || roles.length !== Object.keys(expected).length || roles.some(item => expected[item] == null)) {
      nonstandard = true;
      continue;
    }
    for (let index = 0; index < rows.length; index++) {
      const item = rows[index], amount = expected[roles[index]];
      if (item.count == null) candidates.push({ key: `${prefix}${level}`, index, id: String(item.id), count: amount, role: roles[index] });
      else if (item.count !== amount) nonstandard = true;
    }
  }
  // Nunca mezclar cantidades estandar con una progresion explicitamente diferente.
  if (nonstandard) {
    audit.push({ kind: 'source-exception', profile: 'source-only', table: prefix, reason: 'La fuente no sigue el perfil estandar; se conservan sus cantidades y no se completan faltantes.' });
    return costs;
  }
  if (!candidates.length) return costs;
  const result = JSON.parse(JSON.stringify(costs));
  for (const item of candidates) {
    result[item.key][item.index].count = item.count;
    audit.push({ kind: 'standard-quantity', profile: 'standard-character-v1', step: item.key, materialId: item.id, role: item.role, count: item.count });
  }
  return result;
}

module.exports = { ASCENSION, TALENTS, complete, role };
