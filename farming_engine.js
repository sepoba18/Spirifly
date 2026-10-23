// El día de farmeo cambia a las 04:00 del servidor de la cuenta activa.
function getActiveServerDay(now = new Date()) {
  let uid = typeof AccountManager !== "undefined"
    ? AccountManager.getAccountUid(AccountManager.getActiveAccountId()) : "";
  if (!uid && typeof state !== "undefined") uid = state.activeWishUid || "";
  if (!uid && typeof WishEngine !== "undefined") uid = WishEngine.getActiveAccountUid() || "";
  uid = String(uid).trim();
  let offset;
  if (/^6\d{8}$/.test(uid)) offset = -5;
  else if (/^7\d{8}$/.test(uid)) offset = 1;
  else if (/^[89]\d{8}$/.test(uid) || /^18\d{8}$/.test(uid)) offset = 8;
  else return now.getDay();
  return new Date(now.getTime() + (offset - 4) * 3600000).getUTCDay();
}

/* =====================================================================
   TEYVAT COMPANION PRO - MOTOR DE FARMEO & GASTO DE RESINA
   Gestiona el cálculo de materiales para personajes/armas seleccionados,
   desglose exacto de Resina por Dominio y Calendario Semanal (Lunes a Domingo).
   ===================================================================== */

const FARMING_DAYS_META = [
  { idx: 1, name: "Lunes", short: "Lun", rotGroup: 1 },
  { idx: 2, name: "Martes", short: "Mar", rotGroup: 2 },
  { idx: 3, name: "Miércoles", short: "Mié", rotGroup: 3 },
  { idx: 4, name: "Jueves", short: "Jue", rotGroup: 1 },
  { idx: 5, name: "Viernes", short: "Vie", rotGroup: 2 },
  { idx: 6, name: "Sábado", short: "Sáb", rotGroup: 3 },
  { idx: 0, name: "Domingo", short: "Dom", rotGroup: 0, allOpen: true }
];

// REGISTRO MAESTRO DE DOMINIOS Y FUENTES DE RESINA DE TEYVAT
const FARMING_DOMAINS_REGISTRY = [
  // --- DOMINIOS DE TALENTO (20 ✦ RESINA) ---
  // Mondstadt (Cañón de la Corona Brillante)
  {
    id: "mond_talent_freedom",
    name: "Cañón de la Corona Brillante",
    region: "Mondstadt",
    type: "talent",
    resinCost: 20,
    days: [1, 4, 0],
    familyKey: "freedom",
    matName: "Libros de la Libertad",
    matIds: ["104301", "104302", "104303"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104303.png",
    characters: ["Tartaglia", "Klee", "Sacarosa", "Bárbara", "Amber", "Diona", "Aloy"]
  },
  {
    id: "mond_talent_resistance",
    name: "Cañón de la Corona Brillante",
    region: "Mondstadt",
    type: "talent",
    resinCost: 20,
    days: [2, 5, 0],
    familyKey: "resistance",
    matName: "Libros de la Resistencia",
    matIds: ["104304", "104305", "104306"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104306.png",
    characters: ["Bennett", "Diluc", "Eula", "Jean", "Mona", "Noelle", "Razor"]
  },
  {
    id: "mond_talent_ballad",
    name: "Cañón de la Corona Brillante",
    region: "Mondstadt",
    type: "talent",
    resinCost: 20,
    days: [3, 6, 0],
    familyKey: "ballad",
    matName: "Libros de la Poesía",
    matIds: ["104307", "104308", "104309"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104309.png",
    characters: ["Albedo", "Fischl", "Kaeya", "Lisa", "Rosaria", "Venti", "Mika"]
  },

  // Liyue (Mansión Taishan)
  {
    id: "liyue_talent_prosperity",
    name: "Mansión Taishan",
    region: "Liyue",
    type: "talent",
    resinCost: 20,
    days: [1, 4, 0],
    familyKey: "prosperity",
    matName: "Libros de la Prosperidad",
    matIds: ["104310", "104311", "104312"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104312.png",
    characters: ["Keching", "Ninguang", "Qiqi", "Shenhe", "Xiao", "Yelan"]
  },
  {
    id: "liyue_talent_diligence",
    name: "Mansión Taishan",
    region: "Liyue",
    type: "talent",
    resinCost: 20,
    days: [2, 5, 0],
    familyKey: "diligence",
    matName: "Libros de la Diligencia",
    matIds: ["104313", "104314", "104315"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104315.png",
    characters: ["Chongyun", "Ganyu", "Hu Tao", "Kaedehara Kazuha", "Xiangling", "Yun Jin", "Yaoyao"]
  },
  {
    id: "liyue_talent_gold",
    name: "Mansión Taishan",
    region: "Liyue",
    type: "talent",
    resinCost: 20,
    days: [3, 6, 0],
    familyKey: "gold",
    matName: "Libros del Oro",
    matIds: ["104316", "104317", "104318"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104318.png",
    characters: ["Beidou", "Xingchiu", "Xinyan", "Yanfei", "Zhongli", "Baizhu", "Gaming"]
  },

  // Inazuma (Jardín Violeta)
  {
    id: "inazuma_talent_transience",
    name: "Jardín Violeta",
    region: "Inazuma",
    type: "talent",
    resinCost: 20,
    days: [1, 4, 0],
    familyKey: "transience",
    matName: "Libros de la Transitoriedad",
    matIds: ["104320", "104321", "104322"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104322.png",
    characters: ["Yoimiya", "Thoma", "Sangonomiya Kokomi", "Shikanoin Heizou", "Kirara"]
  },
  {
    id: "inazuma_talent_elegance",
    name: "Jardín Violeta",
    region: "Inazuma",
    type: "talent",
    resinCost: 20,
    days: [2, 5, 0],
    familyKey: "elegance",
    matName: "Libros de la Elegancia",
    matIds: ["104323", "104324", "104325"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104325.png",
    characters: ["Kamisato Ayaka", "Kamisato Ayato", "Kujou Sara", "Arataki Itto", "Kuki Shinobu"]
  },
  {
    id: "inazuma_talent_light",
    name: "Jardín Violeta",
    region: "Inazuma",
    type: "talent",
    resinCost: 20,
    days: [3, 6, 0],
    familyKey: "light",
    matName: "Libros de la Luz",
    matIds: ["104326", "104327", "104328"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104328.png",
    characters: ["Shogun Raiden", "Sayu", "Yae Miko", "Gorou"]
  },

  // Sumeru (Campanario de la Ignorancia)
  {
    id: "sumeru_talent_admonition",
    name: "Campanario de la Ignorancia",
    region: "Sumeru",
    type: "talent",
    resinCost: 20,
    days: [1, 4, 0],
    familyKey: "admonition",
    matName: "Libros de la Admonición",
    matIds: ["104329", "104330", "104331"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104331.png",
    characters: ["Tignari", "Candace", "Cyno", "Faruzán"]
  },
  {
    id: "sumeru_talent_ingenuity",
    name: "Campanario de la Ignorancia",
    region: "Sumeru",
    type: "talent",
    resinCost: 20,
    days: [2, 5, 0],
    familyKey: "ingenuity",
    matName: "Libros del Ingenio",
    matIds: ["104332", "104333", "104334"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104334.png",
    characters: ["Dori", "Nahida", "Laila", "Alhacén", "Kaveh"]
  },
  {
    id: "sumeru_talent_praxis",
    name: "Campanario de la Ignorancia",
    region: "Sumeru",
    type: "talent",
    resinCost: 20,
    days: [3, 6, 0],
    familyKey: "praxis",
    matName: "Libros de la Praxis",
    matIds: ["104335", "104336", "104337"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104337.png",
    characters: ["Collei", "Nilou", "Trotamundos", "Dehya", "Sethos"]
  },

  // Fontaine (Campanario de la Calma Marina)
  {
    id: "fontaine_talent_equity",
    name: "Campanario de la Calma Marina",
    region: "Fontaine",
    type: "talent",
    resinCost: 20,
    days: [1, 4, 0],
    familyKey: "equity",
    matName: "Libros de la Equidad",
    matIds: ["104338", "104339", "104340"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104340.png",
    characters: ["Lyney", "Neuvillette", "Navia", "Sigewinne"]
  },
  {
    id: "fontaine_talent_justice",
    name: "Campanario de la Calma Marina",
    region: "Fontaine",
    type: "talent",
    resinCost: 20,
    days: [2, 5, 0],
    familyKey: "justice",
    matName: "Libros de la Justicia",
    matIds: ["104341", "104342", "104343"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104343.png",
    characters: ["Furina", "Clorinde", "Charlotte", "Fréminet", "Escoffier"]
  },
  {
    id: "fontaine_talent_order",
    name: "Campanario de la Calma Marina",
    region: "Fontaine",
    type: "talent",
    resinCost: 20,
    days: [3, 6, 0],
    familyKey: "order",
    matName: "Libros del Orden",
    matIds: ["104344", "104345", "104346"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104346.png",
    characters: ["Wriothesley", "Arlecchino", "Lynette", "Chevreuse", "Émilie"]
  },

  // Natlan (Ruinas del Fuego Primigenio)
  {
    id: "natlan_talent_contention",
    name: "Ruinas del Fuego Primigenio",
    region: "Natlan",
    type: "talent",
    resinCost: 20,
    days: [1, 4, 0],
    familyKey: "contention",
    matName: "Libros de la Contienda",
    matIds: ["104347", "104348", "104349"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104349.png",
    characters: ["Mualani", "Mavuika", "Skirk", "Iansán"]
  },
  {
    id: "natlan_talent_kindling",
    name: "Ruinas del Fuego Primigenio",
    region: "Natlan",
    type: "talent",
    resinCost: 20,
    days: [2, 5, 0],
    familyKey: "kindling",
    matName: "Libros de la Incandescencia",
    matIds: ["104350", "104351", "104352"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104352.png",
    characters: ["Kinich", "Xilonen", "Citlalí", "Ororon"]
  },
  {
    id: "natlan_talent_conflict",
    name: "Ruinas del Fuego Primigenio",
    region: "Natlan",
    type: "talent",
    resinCost: 20,
    days: [3, 6, 0],
    familyKey: "conflict",
    matName: "Libros del Conflicto",
    matIds: ["104353", "104354", "104355"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104355.png",
    characters: ["Chasca", "Varesa", "Capitano"]
  },

  // --- DOMINIOS DE ARMAS (20 ✦ RESINA) ---
  // Mondstadt (Jardín de las Cecilias)
  {
    id: "mond_weap_decarabian",
    name: "Jardín de las Cecilias",
    region: "Mondstadt",
    type: "weapon",
    resinCost: 20,
    days: [1, 4, 0],
    familyKey: "decarabian",
    matName: "Materiales de Decarabian",
    matIds: ["114001", "114002", "114003", "114004"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114004.png",
    weaponsDesc: "Espadas de Favonius, Arco del Callejón, Oración Perdida a los Vientos Sagrados, Espada de Madera"
  },
  {
    id: "mond_weap_boreal",
    name: "Jardín de las Cecilias",
    region: "Mondstadt",
    type: "weapon",
    resinCost: 20,
    days: [2, 5, 0],
    familyKey: "boreal",
    matName: "Colmillo de Lobo Boreal",
    matIds: ["114005", "114006", "114007", "114008"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114008.png",
    weaponsDesc: "Último Acorde, Flauta, Lanza de Favonius, Espada Real, Aquila Favonia"
  },
  {
    id: "mond_weap_dandelion",
    name: "Jardín de las Cecilias",
    region: "Mondstadt",
    type: "weapon",
    resinCost: 20,
    days: [3, 6, 0],
    familyKey: "dandelion",
    matName: "Grillete de Diente de León",
    matIds: ["114009", "114010", "114011", "114012"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114012.png",
    weaponsDesc: "Alas Celestiales, Espada del Sacrificio, Espada de Hierro, Gran Espada del Sacrificio"
  },

  // Liyue (Palacio Oculto de Lianshan)
  {
    id: "liyue_weap_guyun",
    name: "Palacio Oculto de Lianshan",
    region: "Liyue",
    type: "weapon",
    resinCost: 20,
    days: [1, 4, 0],
    familyKey: "guyun",
    matName: "Cuerpo Divino de Guyun",
    matIds: ["114013", "114014", "114015", "114016"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114016.png",
    weaponsDesc: "Halcón de Jade, Peñasco Oscuro, Prototipo Rencor, Espina de Hierro"
  },
  {
    id: "liyue_weap_mist",
    name: "Palacio Oculto de Lianshan",
    region: "Liyue",
    type: "weapon",
    resinCost: 20,
    days: [2, 5, 0],
    familyKey: "mist",
    matName: "Plomo de Niebla",
    matIds: ["114017", "114018", "114019", "114020"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114020.png",
    weaponsDesc: "Lanza del Duelo, Prototipo Arcaico, Cuento de Cazadores de Dragones, Prototipo Luz de Luna"
  },
  {
    id: "liyue_weap_aerosiderite",
    name: "Palacio Oculto de Lianshan",
    region: "Liyue",
    type: "weapon",
    resinCost: 20,
    days: [3, 6, 0],
    familyKey: "aerosiderite",
    matName: "Siderita Oscura",
    matIds: ["114021", "114022", "114023", "114024"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114024.png",
    weaponsDesc: "Vórtice del Destructor, Memoria de Polvo, Espada Negra, Prototipo Estelar"
  },

  // Inazuma (Corte de la Arena Fluida)
  {
    id: "inazuma_weap_branch",
    name: "Corte de la Arena Fluida",
    region: "Inazuma",
    type: "weapon",
    resinCost: 20,
    days: [1, 4, 0],
    familyKey: "branch",
    matName: "Rama Dorada del Mar Distante",
    matIds: ["114025", "114026", "114027", "114028"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114028.png",
    weaponsDesc: "Luna Inmutable, Espada Amenoma Gemela, Anillo de Hakushin, Cruz de Kitain"
  },
  {
    id: "inazuma_weap_narukami",
    name: "Corte de la Arena Fluida",
    region: "Inazuma",
    type: "weapon",
    resinCost: 20,
    days: [2, 5, 0],
    familyKey: "narukami",
    matName: "Valentía de Narukami",
    matIds: ["114029", "114030", "114031", "114032"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114032.png",
    weaponsDesc: "Reflejo de las Tinieblas, Pulso de la Noche Estrellada, Segador de la Calamidad"
  },
  {
    id: "inazuma_weap_mask",
    name: "Corte de la Arena Fluida",
    region: "Inazuma",
    type: "weapon",
    resinCost: 20,
    days: [3, 6, 0],
    familyKey: "mask",
    matName: "Máscara de Kijin",
    matIds: ["114033", "114034", "114035", "114036"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114036.png",
    weaponsDesc: "Luz de las Olas Rojas, Caza del Viento, Akuoumaru, Onda de la Luna"
  },

  // Sumeru (Torre del Orgullo)
  {
    id: "sumeru_weap_forest",
    name: "Torre del Orgullo",
    region: "Sumeru",
    type: "weapon",
    resinCost: 20,
    days: [1, 4, 0],
    familyKey: "forest",
    matName: "Talismán de Oro del Rocío",
    matIds: ["114037", "114038", "114039", "114040"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114040.png",
    weaponsDesc: "Espada de Madera, Clave de la Coronación, Espina Floral, Sendero de la Cazadora"
  },
  {
    id: "sumeru_weap_oasis",
    name: "Torre del Orgullo",
    region: "Sumeru",
    type: "weapon",
    resinCost: 20,
    days: [2, 5, 0],
    familyKey: "oasis",
    matName: "Esencia del Oasis Exuberante",
    matIds: ["114041", "114042", "114043", "114044"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114044.png",
    weaponsDesc: "Luz del Exterminio, Sueño de las Mil Noches, Diluvio de la Noche"
  },
  {
    id: "sumeru_weap_deshret",
    name: "Torre del Orgullo",
    region: "Sumeru",
    type: "weapon",
    resinCost: 20,
    days: [3, 6, 0],
    familyKey: "deshret",
    matName: "Poder del Sol del Desierto",
    matIds: ["114045", "114046", "114047", "114048"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114048.png",
    weaponsDesc: "Báculo de las Arenas Escarlatas, Luz Lunar de Xifos, Orgullo de las Flores"
  },

  // Fontaine (Ecos de las Mareas Profundas)
  {
    id: "fontaine_weap_echo",
    name: "Ecos de las Mareas Profundas",
    region: "Fontaine",
    type: "weapon",
    resinCost: 20,
    days: [1, 4, 0],
    familyKey: "echo",
    matName: "Eco Puro de Serenata Arcaica",
    matIds: ["114049", "114050", "114051", "114052"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114052.png",
    weaponsDesc: "Fulgor de las Aguas Calmas (Furina), Espada de Madera de Fontaine, Vado del Río Ceniciento"
  },
  {
    id: "fontaine_weap_dewdrop",
    name: "Ecos de las Mareas Profundas",
    region: "Fontaine",
    type: "weapon",
    resinCost: 20,
    days: [2, 5, 0],
    familyKey: "dewdrop",
    matName: "Esencia de Rocío Sagrado",
    matIds: ["114053", "114054", "114055", "114056"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114056.png",
    weaponsDesc: "Escritura del Flujo Eterno (Neuvillette), Razón del Solsticio, Diálogo de los Sabios del Desierto"
  },
  {
    id: "fontaine_weap_chalice",
    name: "Ecos de las Mareas Profundas",
    region: "Fontaine",
    type: "weapon",
    resinCost: 20,
    days: [3, 6, 0],
    familyKey: "chalice",
    matName: "Copa de Oro del Mar Impoluto",
    matIds: ["114057", "114058", "114059", "114060"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114060.png",
    weaponsDesc: "Sentencia (Navia), Supervisor del Flujo, Portador de la Llama, Lanza de los Vientos"
  },

  // Natlan (Dominio de la Forja de Natlan)
  {
    id: "natlan_weap_blazing_heart",
    name: "Dominio de Armas de Natlan",
    region: "Natlan",
    type: "weapon",
    resinCost: 20,
    days: [1, 4, 0],
    familyKey: "blazing_heart",
    matName: "Honor del Corazón Sacrificial Ardiente",
    matIds: ["114061", "114062", "114063", "114064"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114064.png",
    weaponsDesc: "Mil Soles Abrasadores (Mavuika), Flauta de Ezpitzal, Huella del Arco Iris"
  },
  {
    id: "natlan_weap_sacred_flower",
    name: "Dominio de Armas de Natlan",
    region: "Natlan",
    type: "weapon",
    resinCost: 20,
    days: [2, 5, 0],
    familyKey: "sacred_flower",
    matName: "Máscara Divina del Sagrado Señor Delirante",
    matIds: ["114065", "114066", "114067", "114068"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114068.png",
    weaponsDesc: "Colmillo de la Montaña (Kinich), Rueda de los Días, Gancho de la Tierra"
  },
  {
    id: "natlan_weap_obsidian",
    name: "Dominio de Armas de Natlan",
    region: "Natlan",
    type: "weapon",
    resinCost: 20,
    days: [3, 6, 0],
    familyKey: "obsidian",
    matName: "Revelación Espiritista de Obsidiana",
    matIds: ["114069", "114070", "114071", "114072"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114072.png",
    weaponsDesc: "Canción del Silencio, Astro del Destino, Garra de la Cazadora"
  },

  // Familias de armas posteriores a Natlan.
  {
      "id": "nodkrai_weap_artful_device",
      "name": "Corte lunar perdida",
      "region": "Nod-Krai",
      "type": "weapon",
      "resinCost": 20,
      "days": [
          1,
          4,
          0
      ],
      "familyKey": "artful_device",
      "matName": "Instrumento misterioso",
      "matIds": [
          "114073",
          "114074",
          "114075",
          "114076"
      ],
      "icon": "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114076.png"
  },
  {
      "id": "nodkrai_weap_long_night",
      "name": "Corte lunar perdida",
      "region": "Nod-Krai",
      "type": "weapon",
      "resinCost": 20,
      "days": [
          2,
          5,
          0
      ],
      "familyKey": "long_night",
      "matName": "Fuego de la larga noche",
      "matIds": [
          "114077",
          "114078",
          "114079",
          "114080"
      ],
      "icon": "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114080.png"
  },
  {
      "id": "nodkrai_weap_far_north",
      "name": "Corte lunar perdida",
      "region": "Nod-Krai",
      "type": "weapon",
      "resinCost": 20,
      "days": [
          3,
          6,
          0
      ],
      "familyKey": "far_north",
      "matName": "Hijos del Lejano Norte",
      "matIds": [
          "114081",
          "114082",
          "114083",
          "114084"
      ],
      "icon": "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114084.png"
  },
  {
      "id": "snezhnaya_weap_pale_star",
      "name": "Scars of Cursed Obsession",
      "region": "Snezhnaya",
      "type": "weapon",
      "resinCost": 20,
      "days": [
          1,
          4,
          0
      ],
      "familyKey": "pale_star",
      "matName": "Ejército de la Estrella Albina",
      "matIds": [
          "114085",
          "114086",
          "114087",
          "114088"
      ],
      "icon": "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114088.png"
  },
  {
      "id": "snezhnaya_weap_spiritual_nectar",
      "name": "Scars of Cursed Obsession",
      "region": "Snezhnaya",
      "type": "weapon",
      "resinCost": 20,
      "days": [
          2,
          5,
          0
      ],
      "familyKey": "spiritual_nectar",
      "matName": "Néctar espiritual de la bodega",
      "matIds": [
          "114089",
          "114090",
          "114091",
          "114092"
      ],
      "icon": "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114092.png"
  },
  {
      "id": "snezhnaya_weap_frost_emperor",
      "name": "Scars of Cursed Obsession",
      "region": "Snezhnaya",
      "type": "weapon",
      "resinCost": 20,
      "days": [
          3,
          6,
          0
      ],
      "familyKey": "frost_emperor",
      "matName": "Emperador de la escarcha",
      "matIds": [
          "114093",
          "114094",
          "114095",
          "114096"
      ],
      "icon": "https://gi.yatta.moe/assets/UI/UI_ItemIcon_114096.png"
  },

  // --- LÍNEAS LEY (20 ✦ RESINA) - TODOS LOS DÍAS ---
  {
    id: "leyline_mora",
    name: "Líneas Ley: Brote de la Riqueza",
    region: "Teyvat (Todas las Regiones)",
    type: "leylines",
    resinCost: 20,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Mora (60,000 por brote)",
    matIds: ["202"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_202.png",
    note: "Aporta ~60,000 Mora por 20 ✦ de Resina (o 120,000 por Resina Concentrada)."
  },
  {
    id: "leyline_exp",
    name: "Líneas Ley: Brote de la Revelación",
    region: "Teyvat (Todas las Regiones)",
    type: "leylines",
    resinCost: 20,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Libros de EXP (Ingenio del Héroe)",
    matIds: ["104001", "104002", "104003"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_104003.png",
    note: "Aporta ~4-5 Ingenios del Héroe + ~6-7 EXP del Aventurero (~90,000 EXP de personaje) por 20 ✦."
  },

  // --- JEFES DE MUNDO (40 ✦ RESINA) - TODOS LOS DÍAS ---
  {
    id: "boss_tulpa",
    name: "Tulpa del Placer",
    region: "Fontaine",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Agua intrascendible",
    matIds: ["113057"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113057.png",
    characters: ["Furina"]
  },
  {
    id: "boss_golem_legatus",
    name: "Gólem Legatus / Estatua de Mármol",
    region: "Fontaine",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Núcleo de las ruinas arcanas",
    matIds: ["113059"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113059.png",
    characters: ["Arlecchino", "Clorinde"]
  },
  {
    id: "boss_coppelius",
    name: "Suite Crioceleste (Coppelius / Coppelia)",
    region: "Fontaine",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Recambio mecánico de suite",
    matIds: ["113024"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113024.png",
    characters: ["Navia", "Lynette", "Fréminet"]
  },
  {
    id: "boss_emperor_fire",
    name: "Emperador de Fuego Férreo",
    region: "Fontaine",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Resolución del juicio",
    matIds: ["113025"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113025.png",
    characters: ["Lyney", "Chevreuse"]
  },
  {
    id: "boss_gravity_generator",
    name: "Generador de Campo Experimental",
    region: "Fontaine",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Dispositivo de gravedad",
    matIds: ["113026"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113026.png",
    characters: ["Wriothesley"]
  },
  {
    id: "boss_millennial_seahorse",
    name: "Caballito de Mar Milenario",
    region: "Fontaine",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Escala de caballito de mar",
    matIds: ["113027"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113027.png",
    characters: ["Neuvillette"]
  },
  {
    id: "boss_natlan_yumkasaur",
    name: "Glotón Yumkasaurio de la Montaña",
    region: "Natlan",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Corazón ignívomo",
    matIds: ["113060"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113060.png",
    characters: ["Kinich"]
  },
  {
    id: "boss_natlan_lava_golem",
    name: "Gólem de Lava de las Cumbres",
    region: "Natlan",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Marca dorada de la cima",
    matIds: ["113061"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113061.png",
    characters: ["Xilonen", "Mavuika"]
  },
  {
    id: "boss_natlan_qucusaur",
    name: "Tiranocéfalo Qucusaurio de las Cenizas",
    region: "Natlan",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Ojo del cielo ceniciento",
    matIds: ["113062"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113062.png",
    characters: ["Chasca", "Citlalí"]
  },
  {
    id: "boss_natlan_kukusaur",
    name: "Kukusaurio Acorazado",
    region: "Natlan",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Agallas secretas de las profundidades",
    matIds: ["113063"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113063.png",
    characters: ["Mualani", "Ororon"]
  },
  {
    id: "boss_suanni",
    name: "Suanni Solitario",
    region: "Liyue",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Ala de pluma pétrea",
    matIds: ["113058"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113058.png",
    characters: ["Xianyun", "Gaming"]
  },
  {
    id: "boss_setekh_wenut",
    name: "Gusano de Setekh",
    region: "Sumeru",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Seudomartillo de arena",
    matIds: ["113022"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113022.png",
    characters: ["Alhacén", "Mika"]
  },
  {
    id: "boss_dendro_hypo",
    name: "Hipóstasis Dendro",
    region: "Sumeru",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Trepadora supresora",
    matIds: ["113020"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113020.png",
    characters: ["Nahida", "Yaoyao"]
  },
  {
    id: "boss_ruin_serpent",
    name: "Serpiente de las Ruinas",
    region: "Liyue (Sima)",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Colmillo de la sombra rúbica",
    matIds: ["113016"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113016.png",
    characters: ["Yelan", "Shikanoin Heizou", "Kuki Shinobu"]
  },
  {
    id: "boss_maguu_kenki",
    name: "Maguu Kenki",
    region: "Inazuma",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Engranaje marión",
    matIds: ["113009"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113009.png",
    characters: ["Kaedehara Kazuha", "Sayu"]
  },
  {
    id: "boss_thunder_manifestation",
    name: "Manifestación del Trueno",
    region: "Inazuma",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Rencor de la tempestad",
    matIds: ["113013"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113013.png",
    characters: ["Shogun Raiden", "Kujou Sara"]
  },
  {
    id: "boss_primo_geovishap",
    name: "Protodragarto Geo",
    region: "Liyue",
    type: "boss",
    resinCost: 40,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Cuerno juvenil",
    matIds: ["113007"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113007.png",
    characters: ["Xiao", "Hu Tao", "Yanfei"]
  },

  // --- JEFES SEMANALES (30 ✦ / 60 ✦ RESINA) - TODOS LOS DÍAS ---
  {
    id: "weekly_narwhal",
    name: "Sombra del Mar Primitivo (Narval Devorador)",
    region: "Fontaine",
    type: "weekly",
    resinCost: 30,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Materiales del Devorador Narval",
    matIds: ["113054", "113055", "113056"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113056.png",
    characters: ["Furina", "Navia", "Clorinde", "Sigewinne", "Chiori", "Chevreuse"]
  },
  {
    id: "weekly_arlecchino",
    name: "Teatro de la Vela Solitaria (Arlecchino)",
    region: "Fontaine",
    type: "weekly",
    resinCost: 30,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Materiales de Arlecchino",
    matIds: ["113064", "113065", "113066"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113064.png",
    characters: ["Arlecchino", "Émilie", "Clorinde", "Sethos"]
  },
  {
    id: "weekly_apep",
    name: "Guardián del Oasis de Apep",
    region: "Sumeru",
    type: "weekly",
    resinCost: 30,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Materiales del Guardián Apep",
    matIds: ["113046", "113047", "113048"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113046.png",
    characters: ["Baizhu", "Kaveh", "Alhacén", "Dehya", "Lyney", "Fréminet", "Wriothesley", "Neuvillette"]
  },
  {
    id: "weekly_scaramouche",
    name: "Taller de Joururi (Scaramouche)",
    region: "Sumeru",
    type: "weekly",
    resinCost: 30,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Materiales de Scaramouche",
    matIds: ["113041", "113042", "113043"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113041.png",
    characters: ["Nahida", "Trotamundos", "Alhacén", "Faruzán", "Laila", "Dehya"]
  },
  {
    id: "weekly_raiden",
    name: "Fin del Paraíso Ilusorio (Shogun Raiden)",
    region: "Inazuma",
    type: "weekly",
    resinCost: 30,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Materiales de la Shogun Raiden",
    matIds: ["113032", "113033", "113034"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113032.png",
    characters: ["Kamisato Ayato", "Yae Miko", "Shikanoin Heizou", "Kuki Shinobu", "Tignari", "Collei", "Cyno", "Nilou"]
  },
  {
    id: "weekly_signora",
    name: "Mansión Tenshukaku (La Signora)",
    region: "Inazuma",
    type: "weekly",
    resinCost: 30,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Materiales de La Signora",
    matIds: ["113028", "113029", "113030"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113028.png",
    characters: ["Shogun Raiden", "Kujou Sara", "Sangonomiya Kokomi", "Thoma", "Arataki Itto", "Gorou", "Yelan"]
  },
  {
    id: "weekly_azhdaha",
    name: "Bajo el Dragón Queller (Azhdaha)",
    region: "Liyue",
    type: "weekly",
    resinCost: 30,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Materiales de Azhdaha",
    matIds: ["113017", "113018", "113019"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113017.png",
    characters: ["Eula", "Kaedehara Kazuha", "Yanfei", "Kamisato Ayaka", "Yoimiya", "Sayu"]
  },
  {
    id: "weekly_childe",
    name: "Casa Dorada (Tartaglia)",
    region: "Liyue",
    type: "weekly",
    resinCost: 30,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Materiales de Tartaglia",
    matIds: ["113011", "113012", "113013"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113011.png",
    characters: ["Xiao", "Ganyu", "Hu Tao", "Rosaria", "Zhongli", "Diona", "Xinyan"]
  },
  {
    id: "weekly_andrius",
    name: "Lobo del Norte (Andrius)",
    region: "Mondstadt",
    type: "weekly",
    resinCost: 30,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Materiales de Andrius",
    matIds: ["113004", "113005", "113006"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113004.png",
    characters: ["Venti", "Klee", "Mona", "Jean", "Diluc", "Qiqi", "Keching"]
  },
  {
    id: "weekly_dvalin",
    name: "Guarida de Stormterror (Dvalin)",
    region: "Mondstadt",
    type: "weekly",
    resinCost: 30,
    days: [0, 1, 2, 3, 4, 5, 6],
    matName: "Materiales de Dvalin",
    matIds: ["113001", "113002", "113003"],
    icon: "https://gi.yatta.moe/assets/UI/UI_ItemIcon_113001.png",
    characters: ["Bennett", "Diluc", "Jean", "Bárbara", "Xiangling", "Razor"]
  }
];

const FarmingEngine = {
  /**
   * Obtiene la lista de planes a consultar (todos o filtrados por nombre de personaje/arma).
   */
  getTargetPlans(charFilter) {
    if (!state.activePlans || !Array.isArray(state.activePlans)) return [];
    const active = state.activePlans.filter((p) => p.active !== false);
    if (!charFilter || charFilter === "all") return active;
    return active.filter((p) => (p.key === charFilter || p.name === charFilter));
  },

  /**
   * Calcula los requerimientos consolidados de materiales y el desglose de Resina.
   */
  calcDetailedFarming(charFilter) {
    const plans = this.getTargetPlans(charFilter);
    const totalReqs = {};
    const planBreakdown = [];

    plans.forEach((p) => {
      const planReq = (typeof computePlanRequirements === "function") ? computePlanRequirements(p) : {};
      Object.entries(planReq).forEach(([id, qty]) => {
        totalReqs[id] = (totalReqs[id] || 0) + qty;
      });
      planBreakdown.push({
        plan: p,
        reqs: planReq
      });
    });

    const owned = state.realOwned || {};
    const matsMaster = typeof REAL_MASTER_MATERIALS !== "undefined" ? REAL_MASTER_MATERIALS : {};

    // Clasificación y déficit
    const materialsList = [];
    const resinCategories = {
      talent: { name: "Dominios de Libros de Talento", costPerRun: 20, items: [], totalRuns: 0, totalResin: 0 },
      weapon: { name: "Dominios de Ascensión de Armas", costPerRun: 20, items: [], totalRuns: 0, totalResin: 0 },
      boss: { name: "Jefes de Mundo (Ascensión de Personaje)", costPerRun: 40, items: [], totalRuns: 0, totalResin: 0 },
      weekly: { name: "Jefes Semanales (Talentos 7 al 10)", costPerRun: 30, items: [], totalRuns: 0, totalResin: 0 },
      mora: { name: "Líneas Ley: Brotes de la Riqueza (Mora)", costPerRun: 20, items: [], totalRuns: 0, totalResin: 0 },
      exp: { name: "Líneas Ley: Brotes de la Revelación (EXP)", costPerRun: 20, items: [], totalRuns: 0, totalResin: 0 },
      world: { name: "Recolección de Mundo Abierto & Enemigos", costPerRun: 0, items: [], totalRuns: 0, totalResin: 0 }
    };

    let totalResinNeeded = 0;
    const todayDayIdx = typeof getActiveServerDay === "function" ? getActiveServerDay() : new Date().getDay();

    Object.entries(totalReqs).forEach(([matId, reqQty]) => {
      const curOwned = owned[matId] || 0;
      const deficit = Math.max(0, reqQty - curOwned);
      const matInfo = matsMaster[matId] || { id: matId, name: `Material #${matId}`, rank: 3, icon: "" };
      const idStr = String(matId);

      // Determinar actividad y costo de resina
      let cat = "world";
      let runs = 0;
      let resin = 0;
      let sourceName = "Mundo Abierto / Enemigos";
      let days = [0, 1, 2, 3, 4, 5, 6];

      if (idStr === "202") {
        cat = "mora";
        sourceName = "Líneas Ley de Mora";
        runs = Math.ceil(deficit / 60000);
        resin = runs * 20;
      } else if (typeof EXP_BOOK_IDS !== "undefined" && EXP_BOOK_IDS.includes(idStr)) {
        cat = "exp";
        sourceName = "Líneas Ley de EXP";
        const val = typeof EXP_BOOK_VALUE !== "undefined" ? (EXP_BOOK_VALUE[idStr] || 20000) : 20000;
        const totalExpDef = deficit * val;
        runs = Math.ceil(totalExpDef / 90000);
        resin = runs * 20;
      } else if (idStr.startsWith("1043") && idStr !== "104319") { // Excluir Corona de la Sabiduría (evento/árbol)
        cat = "talent";
        const rank = matInfo.rank || 3;
        const purpleEq = deficit * Math.pow(1 / 3, Math.max(0, 4 - rank));
        runs = Math.ceil(purpleEq / 1.12);
        resin = runs * 20;

        // Buscar dominio correspondiente
        const dom = FARMING_DOMAINS_REGISTRY.find((d) => d.type === "talent" && d.matIds.includes(idStr));
        if (dom) {
          sourceName = `${dom.name} (${dom.region})`;
          days = dom.days;
        } else {
          sourceName = "Dominio de Talentos";
        }
      } else if (idStr.startsWith("114")) {
        cat = "weapon";
        const rank = matInfo.rank || 4;
        const goldEq = deficit * Math.pow(1 / 3, Math.max(0, 5 - rank));
        runs = Math.ceil(goldEq / 1.05);
        resin = runs * 20;

        const dom = FARMING_DOMAINS_REGISTRY.find((d) => d.type === "weapon" && d.matIds.includes(idStr));
        if (dom) {
          sourceName = `${dom.name} (${dom.region})`;
          days = dom.days;
        } else {
          sourceName = "Dominio de Armas";
        }
      } else if (idStr.startsWith("113")) {
        const rank = matInfo.rank || 4;
        if (rank >= 5) {
          cat = "weekly";
          runs = Math.ceil(deficit / 2.4);
          resin = runs * 30; // 30 resina con descuento semanal
          const dom = FARMING_DOMAINS_REGISTRY.find((d) => d.type === "weekly" && d.matIds.includes(idStr));
          sourceName = dom ? dom.name : "Jefe Semanal";
        } else {
          cat = "boss";
          runs = Math.ceil(deficit / 2.55);
          resin = runs * 40;
          const dom = FARMING_DOMAINS_REGISTRY.find((d) => d.type === "boss" && d.matIds.includes(idStr));
          sourceName = dom ? dom.name : "Jefe de Mundo";
        }
      } else if (idStr === "104319") {
        cat = "world";
        sourceName = "Corona (Eventos / Árboles Sagrados)";
      } else if (idStr.startsWith("101")) {
        cat = "world";
        sourceName = "Especialidad Local (Recolección en Mapa)";
      } else {
        cat = "world";
        sourceName = "Drop de Enemigos Comunes";
      }

      totalResinNeeded += resin;

      // Saber qué personajes del plan lo necesitan
      const usedBy = [];
      planBreakdown.forEach((pb) => {
        if (pb.reqs[matId]) {
          const charName = pb.plan.key || pb.plan.name || "Personaje";
          usedBy.push(`${charName} (x${pb.reqs[matId]})`);
        }
      });

      const isOpenToday = days.includes(todayDayIdx);

      const itemRecord = {
        id: matId,
        name: matInfo.name,
        rank: matInfo.rank || 1,
        icon: matInfo.icon || "",
        required: reqQty,
        owned: curOwned,
        deficit: deficit,
        cat: cat,
        sourceName: sourceName,
        resinCost: resin,
        runsNeeded: runs,
        days: days,
        isOpenToday: isOpenToday,
        usedBy: usedBy
      };

      materialsList.push(itemRecord);

      if (deficit > 0 && cat !== "world") {
        resinCategories[cat].items.push(itemRecord);
        resinCategories[cat].totalRuns += runs;
        resinCategories[cat].totalResin += resin;
      }
    });

    // Ordenar materiales: primero los que tienen déficit > 0, luego rareza descendente
    materialsList.sort((a, b) => {
      if ((a.deficit > 0) !== (b.deficit > 0)) return a.deficit > 0 ? -1 : 1;
      return (b.rank || 0) - (a.rank || 0);
    });

    const daysResin = Math.ceil(totalResinNeeded / 180 * 10) / 10;
    const condResin = Math.ceil(totalResinNeeded / 60);

    // Contar cuántos dominios prioritarios están abiertos hoy
    let todayMatchesCount = 0;
    FARMING_DOMAINS_REGISTRY.forEach((dom) => {
      if (dom.days.includes(todayDayIdx)) {
        const hasReq = dom.matIds.some((mid) => (totalReqs[mid] || 0) > (owned[mid] || 0));
        if (hasReq) todayMatchesCount++;
      }
    });

    return {
      plansCount: plans.length,
      totalResinNeeded,
      daysResin,
      condResin,
      todayMatchesCount,
      resinCategories,
      materialsList
    };
  },

  /**
   * Obtiene los dominios para un día específico (0 a 6) filtrado por costo de resina (all, 20, 40, 30).
   */
  getDomainsForDay(dayIdx, costFilter) {
    const activePlans = (state.activePlans || []).filter((p) => p.active !== false);
    const owned = state.realOwned || {};

    // Obtener qué materialIds necesita el plan actual
    const neededMatIds = new Map();
    activePlans.forEach((p) => {
      const planReq = (typeof computePlanRequirements === "function") ? computePlanRequirements(p) : {};
      Object.entries(planReq).forEach(([mid, qty]) => {
        const cur = owned[mid] || 0;
        const def = Math.max(0, qty - cur);
        if (def > 0) {
          if (!neededMatIds.has(mid)) neededMatIds.set(mid, []);
          neededMatIds.get(mid).push({ charName: p.key || p.name, deficit: def });
        }
      });
    });

    return FARMING_DOMAINS_REGISTRY.filter((dom) => {
      // Filtro de día (si es domingo, todos los días abren)
      const dayMatch = dayIdx === 0 ? true : dom.days.includes(dayIdx);
      if (!dayMatch) return false;

      // Filtro de costo
      if (costFilter && costFilter !== "all") {
        if (costFilter === "20" && dom.resinCost !== 20) return false;
        if (costFilter === "40" && dom.resinCost !== 40) return false;
        if (costFilter === "30" && dom.resinCost !== 30) return false;
      }
      return true;
    }).map((dom) => {
      // Verificar si coincide con personajes activos del plan
      const priorityMatches = [];
      let totalDeficit = 0;

      dom.matIds.forEach((mid) => {
        if (neededMatIds.has(mid)) {
          const list = neededMatIds.get(mid);
          list.forEach((entry) => {
            priorityMatches.push(entry);
            totalDeficit += entry.deficit;
          });
        }
      });

      const isPriority = priorityMatches.length > 0;
      return {
        ...dom,
        isPriority,
        priorityMatches,
        totalDeficit
      };
    });
  },

  /**
   * Obtiene la estructura idéntica a Seelie.me agrupada por secciones de costo de Resina
   * (Ninguno, 20, 40, 60) y tarjetas de fuentes/dominios con sus materiales, requerimientos,
   * déficit, equivalencia en runs/resina/concentradas/días y avatares de personajes/armas.
   */
  getSeelieFarmingData(charFilter) {
    const plans = (state.activePlans || []).filter((p) => p.active !== false);
    const owned = state.realOwned || {};
    const matsMaster = (typeof REAL_MASTER_MATERIALS !== "undefined") ? REAL_MASTER_MATERIALS : {};

    // Mantener visibles los planes pausados para poder reactivarlos.
    const activeCharList = [];
    (state.activePlans || []).forEach((p) => {
      const key = p.key || p.name;
      if (!key) return;
      let icon = "";
      const isWeapon = (p.kind === "weapon");
      if (isWeapon) {
        const wp = (typeof getWeaponInfo === "function") ? getWeaponInfo(key) : null;
        icon = wp ? wp.icon : (p.icon || "");
      } else {
        const ch = (typeof getRosterCharInfo === "function") ? getRosterCharInfo(key) : null;
        icon = ch ? ch.icon : (p.icon || "");
      }
      activeCharList.push({
        key,
        name: key,
        icon,
        isWeapon,
        active: p.active !== false
      });
    });

    // 2. Filtrar planes si el usuario seleccionó un personaje específico
    const filteredPlans = (charFilter && charFilter !== "all")
      ? plans.filter((p) => (p.key === charFilter || p.name === charFilter))
      : plans;

    // 3. Acumular requerimientos y los personajes que usan cada material
    const totalReqs = {};
    const matUsers = {}; // matId -> Map de key -> { key, name, icon }

    filteredPlans.forEach((p) => {
      const planReq = (typeof computePlanRequirements === "function") ? computePlanRequirements(p) : {};
      const key = p.key || p.name;
      let icon = "";
      if (p.kind === "weapon") {
        const wp = (typeof getWeaponInfo === "function") ? getWeaponInfo(key) : null;
        icon = wp ? wp.icon : (p.icon || "");
      } else {
        const ch = (typeof getRosterCharInfo === "function") ? getRosterCharInfo(key) : null;
        icon = ch ? ch.icon : (p.icon || "");
      }

      Object.entries(planReq).forEach(([mid, qty]) => {
        if (!qty || qty <= 0) return;
        totalReqs[mid] = (totalReqs[mid] || 0) + qty;
        if (!matUsers[mid]) matUsers[mid] = new Map();
        matUsers[mid].set(key, { key, name: key, icon, isWeapon: p.kind === "weapon" });
      });
    });

    // 4. Mapear cada material a su tarjeta de origen Seelie
    const sourceCardsMap = new Map();

    function getOrCreateCard(sourceId, defaults) {
      if (!sourceCardsMap.has(sourceId)) {
        sourceCardsMap.set(sourceId, {
          id: sourceId,
          title: defaults.title || "Fuente",
          subTitle: defaults.subTitle || "",
          tag: defaults.tag || "Élites",
          tagType: defaults.tagType || "elite",
          cost: defaults.cost || 0,
          order: defaults.order || 50,
          runs: 0,
          resin: 0,
          condResin: 0,
          daysNeeded: 0,
          scheduleDays: defaults.days || [0, 1, 2, 3, 4, 5, 6],
          items: [],
          charactersMap: new Map()
        });
      }
      const card = sourceCardsMap.get(sourceId);
      if (defaults.days && (!card.scheduleDays || card.scheduleDays.length >= 7)) {
        card.scheduleDays = defaults.days;
      }
      return card;
    }

    const lang = (typeof state !== "undefined" && state.lang) || "es";
    const FE_I18N = {
      es: {
        tagLeyline: "Líneas ley",
        tagExpedition: "Zona de expedición",
        tagTalent: "Dominio de la maestría",
        tagWeapon: "Dominio de la forja",
        tagSpecialty: "Especialidades de Teyvat",
        tagWeekly: "Jefe semanal",
        tagBoss: "Jefe de mundo",
        tagElite: "Élites",
        moraTitle: "Brote de línea ley - Flor de riqueza",
        moraSub: "Líneas Ley de Mora (Teyvat)",
        expTitle: "Brote de línea ley - Flor de revelación",
        expSub: "Líneas Ley de EXP (Teyvat)",
        oreTitle: "Mineral de refinamiento",
        oreSub: "Forja & Expediciones mineras",
        crownTitle: "Corona de la sabiduría",
        crownSub: "Eventos & Árboles Sagrados de Teyvat",
        talMiscTitle: "Dominio de Maestría",
        talMiscSub: "Libros de Talento • Teyvat",
        weapMiscTitle: "Dominio de la Forja",
        weapMiscSub: "Materiales de Armas • Teyvat",
        ascMats: "Materiales de ascensión",
        weeklySub: "Jefe Semanal de Teyvat",
        bossSub: "Jefe de Mundo de Teyvat",
        gemPrefix: "Gemas Elementales",
        gemSub: "Jefes de Mundo y Semanales • Teyvat",
        specSub: "Recolección en Teyvat",
        worldSub: "Mundial",
        openWorldSub: "Mundo Abierto",
        everyDay: "Todos los días",
        dayNames: { 1: "Lun", 2: "Mar", 3: "Mié", 4: "Jue", 5: "Vie", 6: "Sáb", 0: "Dom" }
      },
      en: {
        tagLeyline: "Ley Lines",
        tagExpedition: "Expedition Zone",
        tagTalent: "Domain of Mastery",
        tagWeapon: "Domain of Forgery",
        tagSpecialty: "Local Specialties",
        tagWeekly: "Trounce Domain",
        tagBoss: "World Boss",
        tagElite: "Elites & Common",
        moraTitle: "Ley Line Outcrop - Blossom of Wealth",
        moraSub: "Mora Ley Lines (Teyvat)",
        expTitle: "Ley Line Outcrop - Blossom of Revelation",
        expSub: "EXP Ley Lines (Teyvat)",
        oreTitle: "Mystic Enhancement Ore",
        oreSub: "Forging & Mining Expeditions",
        crownTitle: "Crown of Insight",
        crownSub: "Events & Sacred Trees of Teyvat",
        talMiscTitle: "Domain of Mastery",
        talMiscSub: "Talent Books • Teyvat",
        weapMiscTitle: "Domain of Forgery",
        weapMiscSub: "Weapon Materials • Teyvat",
        ascMats: "Ascension Materials",
        weeklySub: "Weekly Trounce Boss",
        bossSub: "Teyvat World Boss",
        gemPrefix: "Elemental Gems",
        gemSub: "World & Weekly Bosses • Teyvat",
        specSub: "Local Specialty Gathering",
        worldSub: "Worldwide",
        openWorldSub: "Open World",
        everyDay: "Every day",
        dayNames: { 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat", 0: "Sun" }
      },
      pt: {
        tagLeyline: "Linhas Ley",
        tagExpedition: "Zona de Expedição",
        tagTalent: "Domínio da Proficiência",
        tagWeapon: "Domínio da Forja",
        tagSpecialty: "Especialidades de Teyvat",
        tagWeekly: "Chefe Semanal",
        tagBoss: "Chefe de Mundo",
        tagElite: "Elites",
        moraTitle: "Afloramento da Linha Ley - Flor da Riqueza",
        moraSub: "Linhas Ley de Mora (Teyvat)",
        expTitle: "Afloramento da Linha Ley - Flor da Revelação",
        expSub: "Linhas Ley de EXP (Teyvat)",
        oreTitle: "Minério de Refinamento Místico",
        oreSub: "Forja e Expedições de Mineração",
        crownTitle: "Coroa da Sabedoria",
        crownSub: "Eventos e Árvores Sagradas de Teyvat",
        talMiscTitle: "Domínio da Proficiência",
        talMiscSub: "Livros de Talento • Teyvat",
        weapMiscTitle: "Domínio da Forja",
        weapMiscSub: "Materiais de Armas • Teyvat",
        ascMats: "Materiais de Ascensão",
        weeklySub: "Chefe Semanal de Teyvat",
        bossSub: "Chefe de Mundo de Teyvat",
        gemPrefix: "Gemas Elementais",
        gemSub: "Chefes de Mundo e Semanais • Teyvat",
        specSub: "Coleta em Teyvat",
        worldSub: "Mundial",
        openWorldSub: "Mundo Aberto",
        everyDay: "Todos os dias",
        dayNames: { 1: "Seg", 2: "Ter", 3: "Qua", 4: "Qui", 5: "Sex", 6: "Sáb", 0: "Dom" }
      },
      ja: {
        tagLeyline: "地脈の花",
        tagExpedition: "探索派遣・鍛造",
        tagTalent: "熟知秘境 (天賦)",
        tagWeapon: "煉武秘境 (武器)",
        tagSpecialty: "特産品",
        tagWeekly: "週ボス (征討領域)",
        tagBoss: "フィールドボス",
        tagElite: "精鋭・一般エネミー",
        moraTitle: "地脈の花芽・蔵金の花",
        moraSub: "モラ地脈 (テイワット)",
        expTitle: "地脈の花芽・啓示の花",
        expSub: "経験値地脈 (テイワット)",
        oreTitle: "仕上げ用魔鉱",
        oreSub: "鍛造＆探索派遣",
        crownTitle: "知恵の冠",
        crownSub: "イベント＆奉納報酬",
        talMiscTitle: "熟知秘境",
        talMiscSub: "天賦育成素材 • テイワット",
        weapMiscTitle: "煉武秘境",
        weapMiscSub: "武器突破素材 • テイワット",
        ascMats: "突破素材",
        weeklySub: "週ボス (テイワット)",
        bossSub: "フィールドボス (テイワット)",
        gemPrefix: "元素宝石",
        gemSub: "フィールドボス＆週ボス • テイワット",
        specSub: "テイワット各地で採集",
        worldSub: "全域",
        openWorldSub: "フィールド全域",
        everyDay: "毎日",
        dayNames: { 1: "月", 2: "火", 3: "水", 4: "木", 5: "金", 6: "土", 0: "日" }
      },
      ko: {
        tagLeyline: "지맥의 꽃",
        tagExpedition: "탐사 파견·단조",
        tagTalent: "숙달 비경 (특성)",
        tagWeapon: "연무 비경 (무기)",
        tagSpecialty: "특산물",
        tagWeekly: "주간 보스 (영역 토벌)",
        tagBoss: "필드 보스",
        tagElite: "정예·일반 몬스터",
        moraTitle: "지맥의 꽃봉오리 · 장금의 꽃",
        moraSub: "모라 지맥 (티바트)",
        expTitle: "지맥의 꽃봉오리 · 계시의 꽃",
        expSub: "경험치 지맥 (티바트)",
        oreTitle: "정제용 마법 광물",
        oreSub: "단조 및 채광 파견",
        crownTitle: "지식의 왕관",
        crownSub: "이벤트 및 신성한 나무 보상",
        talMiscTitle: "숙달 비경",
        talMiscSub: "특성 육성 소재 • 티바트",
        weapMiscTitle: "연무 비경",
        weapMiscSub: "무기 돌파 소재 • 티바트",
        ascMats: "돌파 소재",
        weeklySub: "티바트 주간 보스",
        bossSub: "티바트 필드 보스",
        gemPrefix: "원소 보석",
        gemSub: "필드 보스 및 주간 보스 • 티바트",
        specSub: "티바트 채집",
        worldSub: "전 지역",
        openWorldSub: "오픈 월드",
        everyDay: "매일",
        dayNames: { 1: "월", 2: "화", 3: "수", 4: "목", 5: "금", 6: "토", 0: "일" }
      }
    };
    const fe = FE_I18N[lang] || FE_I18N.es;

    const ENEMY_TITLE_I18N = {
      "Slimes": { en: "Slimes", pt: "Slimes", ja: "スライム", ko: "슬라임" },
      "Hilichurls (Máscaras)": { en: "Hilichurls (Masks)", pt: "Hilichurls (Máscaras)", ja: "ヒルチャール (仮面)", ko: "츄츄족 (가면)" },
      "Megafloras": { en: "Whopperflowers", pt: "Megafloras", ja: "トリックフラワー", ko: "구라구라꽃" },
      "Samachurls": { en: "Samachurls", pt: "Samachurls", ja: "ヒルチャールシャーマン", ko: "츄츄 샤먼" },
      "Hilichurls Tiradores": { en: "Hilichurl Shooters", pt: "Hilichurls Atiradores", ja: "ヒルチャール・射手", ko: "츄츄 궁수" },
      "Magos del Abismo (Ramas)": { en: "Abyss Mages (Branches)", pt: "Magos do Abismo (Ramos)", ja: "アビスの魔術師 (地脈の枝)", ko: "심연 메이지 (지맥의 가지)" },
      "Soldados Fatui": { en: "Fatui Skirmishers", pt: "Soldados Fatui", ja: "ファデュイ先遣隊", ko: "우인단 선발대" },
      "Ladrones de Tesoros": { en: "Treasure Hoarders", pt: "Ladrões de Tesouros", ja: "宝盗団", ko: "보물사냥단" },
      "Guardias de las Ruinas": { en: "Ruin Guards & Sentinels", pt: "Guardas das Ruínas", ja: "遺跡守衛・機兵", ko: "유적 가디언·기계병사" },
      "Nobushi & Kairagi": { en: "Nobushi & Kairagi", pt: "Nobushi e Kairagi", ja: "野伏・海乱鬼", ko: "노부시·해란귀" },
      "Doncellas del Espejo": { en: "Fatui Mirror Maidens", pt: "Donzelas do Espelho", ja: "ファデュイ・ミラーメイデン", ko: "우인단 거울의 여인" },
      "Espectros": { en: "Specters", pt: "Espectros", ja: "フライム", ko: "떠도는 정령" },
      "Sabuesos del Cañón": { en: "Rifthounds", pt: "Sabujos da Fenda", ja: "獣域ウルブズ", ko: "수계 사냥개" },
      "Caballeros de la Serpiente Negra": { en: "Shadowy Husks", pt: "Cavaleiros da Serpente Negra", ja: "黒蛇騎士・シャドウハスク", ko: "흑뱀 기사" },
      "Flotadores Hongos": { en: "Floating Fungi", pt: "Fungos Flutuantes", ja: "キノコン (胞子)", ko: "둥실 버섯몬" },
      "Hongos Inactivos": { en: "Activated/Scorched Fungi", pt: "Fungos Inativos", ja: "キノコン (菌核)", ko: "활력/건조 버섯몬" },
      "Eremitas": { en: "The Eremites", pt: "Eremitas", ja: "エルマイト旅団", ko: "도금 여단" },
      "Constructos Primigenios": { en: "Primal Constructs", pt: "Constructos Primordiais", ja: "プライマル構造体", ko: "태고의 구조체" },
      "Mecabots de Fontaine": { en: "Clockwork Meka", pt: "Mecautômatos de Fontaine", ja: "マシナリー (フォンテーヌ)", ko: "태엽 장치 (폰타인)" },
      "Engendros Fontamarinos": { en: "Fontemer Aberrants", pt: "Aberrações Fontemer", ja: "原海アベラント", ko: "원류바다 이종" },
      "Operativos Fatui": { en: "Fatui Operatives", pt: "Operativos Fatui", ja: "ファデュイ・従者", ko: "우인단 심부름꾼" },
      "Saurios de Natlan": { en: "Natlan Saurians", pt: "Saurianos de Natlan", ja: "ナタの竜 (牙)", ko: "나타 용 (송곳니)" },
      "Avatares de Lava": { en: "Avatars of Lava", pt: "Avatares de Lava", ja: "溶岩の像", ko: "용암 형상" },
      "Guerreros Saurios de Natlan": { en: "Sauroform Tribal Warriors", pt: "Guerreiros Saurianos de Natlan", ja: "部族竜戦士 (ナタ)", ko: "부족 용전사 (나타)" }
    };

    function trEnemyTitle(esTitle) {
      if (lang === "es") return esTitle;
      const entry = ENEMY_TITLE_I18N[esTitle];
      return (entry && entry[lang]) || esTitle;
    }

    function trEnemySub(esSub) {
      if (esSub === "Mundial") return fe.worldSub;
      return esSub;
    }

    // Diccionario de familias de enemigos para nombres amigables
    const ENEMY_FAMILIES = {
      "112001": { title: "Slimes", subTitle: "Mundial" },
      "112002": { title: "Slimes", subTitle: "Mundial" },
      "112003": { title: "Slimes", subTitle: "Mundial" },
      "112005": { title: "Hilichurls (Máscaras)", subTitle: "Mundial" },
      "112006": { title: "Hilichurls (Máscaras)", subTitle: "Mundial" },
      "112007": { title: "Hilichurls (Máscaras)", subTitle: "Mundial" },
      "112008": { title: "Megafloras", subTitle: "Mundial" },
      "112009": { title: "Megafloras", subTitle: "Mundial" },
      "112010": { title: "Megafloras", subTitle: "Mundial" },
      "112011": { title: "Samachurls", subTitle: "Mundial" },
      "112012": { title: "Samachurls", subTitle: "Mundial" },
      "112013": { title: "Samachurls", subTitle: "Mundial" },
      "112014": { title: "Hilichurls Tiradores", subTitle: "Mundial" },
      "112015": { title: "Hilichurls Tiradores", subTitle: "Mundial" },
      "112016": { title: "Hilichurls Tiradores", subTitle: "Mundial" },
      "112023": { title: "Magos del Abismo (Ramas)", subTitle: "Mundial" },
      "112024": { title: "Magos del Abismo (Ramas)", subTitle: "Mundial" },
      "112025": { title: "Magos del Abismo (Ramas)", subTitle: "Mundial" },
      "112032": { title: "Soldados Fatui", subTitle: "Mundial" },
      "112033": { title: "Soldados Fatui", subTitle: "Mundial" },
      "112034": { title: "Soldados Fatui", subTitle: "Mundial" },
      "112035": { title: "Ladrones de Tesoros", subTitle: "Liyue / Inazuma / Fontaine" },
      "112036": { title: "Ladrones de Tesoros", subTitle: "Liyue / Inazuma / Fontaine" },
      "112037": { title: "Ladrones de Tesoros", subTitle: "Liyue / Inazuma / Fontaine" },
      "112038": { title: "Megafloras", subTitle: "Mundial" },
      "112039": { title: "Megafloras", subTitle: "Mundial" },
      "112040": { title: "Megafloras", subTitle: "Mundial" },
      "112041": { title: "Guardias de las Ruinas", subTitle: "Mundial" },
      "112042": { title: "Guardias de las Ruinas", subTitle: "Mundial" },
      "112043": { title: "Guardias de las Ruinas", subTitle: "Mundial" },
      "112044": { title: "Nobushi & Kairagi", subTitle: "Inazuma" },
      "112045": { title: "Nobushi & Kairagi", subTitle: "Inazuma" },
      "112046": { title: "Nobushi & Kairagi", subTitle: "Inazuma" },
      "112047": { title: "Doncellas del Espejo", subTitle: "Inazuma / Fontaine" },
      "112048": { title: "Doncellas del Espejo", subTitle: "Inazuma / Fontaine" },
      "112049": { title: "Doncellas del Espejo", subTitle: "Inazuma / Fontaine" },
      "112053": { title: "Espectros", subTitle: "Inazuma / Enkanomiya" },
      "112054": { title: "Espectros", subTitle: "Inazuma / Enkanomiya" },
      "112055": { title: "Espectros", subTitle: "Inazuma / Enkanomiya" },
      "112056": { title: "Sabuesos del Cañón", subTitle: "Inazuma / Sumeru" },
      "112057": { title: "Sabuesos del Cañón", subTitle: "Inazuma / Sumeru" },
      "112058": { title: "Sabuesos del Cañón", subTitle: "Inazuma / Sumeru" },
      "112059": { title: "Caballeros de la Serpiente Negra", subTitle: "Sima / Sumeru" },
      "112060": { title: "Caballeros de la Serpiente Negra", subTitle: "Sima / Sumeru" },
      "112061": { title: "Caballeros de la Serpiente Negra", subTitle: "Sima / Sumeru" },
      "112062": { title: "Flotadores Hongos", subTitle: "Sumeru / Sima" },
      "112063": { title: "Flotadores Hongos", subTitle: "Sumeru / Sima" },
      "112064": { title: "Flotadores Hongos", subTitle: "Sumeru / Sima" },
      "112065": { title: "Hongos Inactivos", subTitle: "Sumeru" },
      "112066": { title: "Hongos Inactivos", subTitle: "Sumeru" },
      "112067": { title: "Hongos Inactivos", subTitle: "Sumeru" },
      "112068": { title: "Eremitas", subTitle: "Sumeru" },
      "112069": { title: "Eremitas", subTitle: "Sumeru" },
      "112070": { title: "Eremitas", subTitle: "Sumeru" },
      "112071": { title: "Constructos Primigenios", subTitle: "Desierto de Sumeru" },
      "112072": { title: "Constructos Primigenios", subTitle: "Desierto de Sumeru" },
      "112073": { title: "Constructos Primigenios", subTitle: "Desierto de Sumeru" },
      "112080": { title: "Mecabots de Fontaine", subTitle: "Fontaine" },
      "112081": { title: "Mecabots de Fontaine", subTitle: "Fontaine" },
      "112082": { title: "Mecabots de Fontaine", subTitle: "Fontaine" },
      "112083": { title: "Engendros Fontamarinos", subTitle: "Aguas de Fontaine" },
      "112084": { title: "Engendros Fontamarinos", subTitle: "Aguas de Fontaine" },
      "112085": { title: "Engendros Fontamarinos", subTitle: "Aguas de Fontaine" },
      "112086": { title: "Operativos Fatui", subTitle: "Fontaine" },
      "112087": { title: "Operativos Fatui", subTitle: "Fontaine" },
      "112088": { title: "Operativos Fatui", subTitle: "Fontaine" },
      "112098": { title: "Saurios de Natlan", subTitle: "Natlan" },
      "112099": { title: "Saurios de Natlan", subTitle: "Natlan" },
      "112100": { title: "Saurios de Natlan", subTitle: "Natlan" },
      "112101": { title: "Avatares de Lava", subTitle: "Natlan" },
      "112102": { title: "Avatares de Lava", subTitle: "Natlan" },
      "112103": { title: "Avatares de Lava", subTitle: "Natlan" },
      "112104": { title: "Guerreros Saurios de Natlan", subTitle: "Natlan" },
      "112105": { title: "Guerreros Saurios de Natlan", subTitle: "Natlan" },
      "112106": { title: "Guerreros Saurios de Natlan", subTitle: "Natlan" }
    };

    Object.entries(totalReqs).forEach(([mid, reqQty]) => {
      const curOwned = owned[mid] || 0;
      const deficit = Math.max(0, reqQty - curOwned);
      const matInfo = matsMaster[mid] || { id: mid, name: `Material #${mid}`, rank: 3, icon: "" };
      const idStr = String(mid);

      let sourceId = "";
      let cardDef = null;

      // 1. Mora
      if (idStr === "202") {
        sourceId = "leyline_mora";
        cardDef = {
          title: fe.moraTitle,
          subTitle: fe.moraSub,
          tag: fe.tagLeyline,
          tagType: "leyline",
          cost: 20,
          order: 1
        };
      }
      // 2. EXP de Personaje
      else if (idStr === "104001" || idStr === "104002" || idStr === "104003") {
        sourceId = "leyline_exp";
        cardDef = {
          title: fe.expTitle,
          subTitle: fe.expSub,
          tag: fe.tagLeyline,
          tagType: "leyline",
          cost: 20,
          order: 2
        };
      }
      // 3. Minerales de Forja
      else if (idStr === "104011" || idStr === "104012" || idStr === "104013") {
        sourceId = "expedition_ore";
        cardDef = {
          title: fe.oreTitle,
          subTitle: fe.oreSub,
          tag: fe.tagExpedition,
          tagType: "expedition",
          cost: 0,
          order: 1
        };
      }
      // 4. Libros de Talentos (1043xx excluyendo 104319)
      else if (idStr.startsWith("1043") && idStr !== "104319") {
        const dom = FARMING_DOMAINS_REGISTRY.find((d) => d.type === "talent" && d.matIds.includes(idStr));
        if (dom) {
          sourceId = "talent_" + dom.id;
          cardDef = {
            title: dom.name,
            subTitle: `${dom.matName} • ${dom.region}`,
            region: dom.region,
            tag: fe.tagTalent,
            tagType: "talent",
            cost: 20,
            order: 20,
            days: dom.days || [1, 4, 0]
          };
        } else {
          sourceId = "talent_misc";
          cardDef = { title: fe.talMiscTitle, subTitle: fe.talMiscSub, region: "Teyvat", tag: fe.tagTalent, tagType: "talent", cost: 20, order: 25, days: [1, 4, 0] };
        }
      }
      // 5. Materiales de Armas (114xxx)
      else if (idStr.startsWith("114")) {
        const dom = FARMING_DOMAINS_REGISTRY.find((d) => d.type === "weapon" && d.matIds.includes(idStr));
        if (dom) {
          sourceId = "weapon_" + dom.id;
          cardDef = {
            title: dom.name,
            subTitle: `${dom.matName} • ${dom.region}`,
            region: dom.region,
            tag: fe.tagWeapon,
            tagType: "weapon",
            cost: 20,
            order: 10,
            days: dom.days || [1, 4, 0]
          };
        } else {
          sourceId = "weapon_misc";
          cardDef = { title: fe.weapMiscTitle, subTitle: fe.weapMiscSub, region: "Teyvat", tag: fe.tagWeapon, tagType: "weapon", cost: 20, order: 15, days: [1, 4, 0] };
        }
      }
      // 6. Corona de la Sabiduría (104319)
      else if (idStr === "104319") {
        sourceId = "special_crown";
        cardDef = {
          title: fe.crownTitle,
          subTitle: fe.crownSub,
          tag: fe.tagSpecialty,
          tagType: "specialty",
          cost: 0,
          order: 90
        };
      }
      // 7. Jefes Semanales (1130xx rank >= 5)
      else if (idStr.startsWith("113") && (matInfo.rank || 4) >= 5) {
        const dom = FARMING_DOMAINS_REGISTRY.find((d) => d.type === "weekly" && d.matIds.includes(idStr));
        sourceId = dom ? ("weekly_" + dom.id) : ("weekly_" + idStr);
        cardDef = {
          title: dom ? dom.name : matInfo.name,
          subTitle: dom ? `${fe.ascMats} • ${dom.region}` : fe.weeklySub,
          region: dom ? dom.region : "Teyvat",
          tag: fe.tagWeekly,
          tagType: "weekly",
          cost: 60,
          order: 1
        };
      }
      // 8. Jefes de Mundo (1130xx rank < 5)
      else if (idStr.startsWith("113")) {
        const dom = FARMING_DOMAINS_REGISTRY.find((d) => d.type === "boss" && d.matIds.includes(idStr));
        sourceId = dom ? ("boss_" + dom.id) : ("boss_" + idStr);
        cardDef = {
          title: dom ? dom.name : matInfo.name,
          subTitle: dom ? `${fe.ascMats} • ${dom.region}` : fe.bossSub,
          region: dom ? dom.region : "Teyvat",
          tag: fe.tagBoss,
          tagType: "boss",
          cost: 40,
          order: 1
        };
      }
      // 9. Gemas elementales (1041xx)
      else if (idStr.startsWith("1041")) {
        const elemKey = idStr.slice(0, 5);
        const elemNames = {
          "10411": "Pyro (Agnidus)",
          "10412": "Hydro (Varunada)",
          "10413": "Dendro (Nagadus)",
          "10414": "Electro (Vajrada)",
          "10415": "Anemo (Vayuda)",
          "10416": "Cryo (Shivada)",
          "10417": "Geo (Prithiva)"
        };
        sourceId = "boss_gem_" + elemKey;
        cardDef = {
          title: `${fe.gemPrefix}: ${elemNames[elemKey] || "Teyvat"}`,
          subTitle: fe.gemSub,
          region: "Teyvat",
          tag: fe.tagBoss,
          tagType: "boss",
          cost: 40,
          order: 10
        };
      }
      // 10. Especialidades de Teyvat (101xxx)
      else if (idStr.startsWith("101")) {
        sourceId = "specialty_" + idStr;
        cardDef = {
          title: matInfo.name,
          subTitle: fe.specSub,
          tag: fe.tagSpecialty,
          tagType: "specialty",
          cost: 0,
          order: 40
        };
      }
      // 11. Drops de Enemigos Comunes y Élites (112xxx)
      else if (idStr.startsWith("112")) {
        const fam = ENEMY_FAMILIES[idStr];
        if (fam) {
          sourceId = "elite_" + fam.title.toLowerCase().replace(/[^a-z0-9]/g, "_");
          cardDef = {
            title: trEnemyTitle(fam.title),
            subTitle: trEnemySub(fam.subTitle),
            tag: fe.tagElite,
            tagType: "elite",
            cost: 0,
            order: 20
          };
        } else {
          const cleanTitle = matInfo.name.replace(/^(Condensado|Secreción|Esencia|Máscara|Pergamino|Flecha|Insignia|Néctar|Guardamano|Prisma|Caparazón|Corazón|Núcleo|Espora|Polen|Polvo|Seda|Engranaje|Gota|Reloj|Diente|Colmillo|Silbato)\s+(de\s+|del\s+)?/i, "");
          const baseTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
          sourceId = "elite_" + idStr.slice(0, 5);
          cardDef = {
            title: baseTitle || fe.tagElite,
            subTitle: fe.worldSub,
            tag: fe.tagElite,
            tagType: "elite",
            cost: 0,
            order: 25
          };
        }
      }
      // 12. Cualquier otro ítem
      else {
        sourceId = "misc_" + idStr;
        cardDef = {
          title: matInfo.name,
          subTitle: fe.openWorldSub,
          tag: fe.tagElite,
          tagType: "elite",
          cost: 0,
          order: 30
        };
      }

      const card = getOrCreateCard(sourceId, cardDef);
      card.items.push({
        id: idStr,
        name: matInfo.name,
        rank: matInfo.rank || 1,
        icon: matInfo.icon || "",
        required: reqQty,
        owned: curOwned,
        deficit: deficit
      });

      const users = matUsers[idStr];
      if (users) {
        users.forEach((u) => {
          card.charactersMap.set(u.key, u);
        });
      }
    });

    // 5. Calcular tiradas y costos de resina por tarjeta
    let totalResinNeeded = 0;

    sourceCardsMap.forEach((card) => {
      card.items.sort((a, b) => (a.rank || 0) - (b.rank || 0));
      card.characters = Array.from(card.charactersMap.values());

      let maxDeficit = 0;
      let totalCardDeficit = 0;
      card.items.forEach((it) => {
        totalCardDeficit += it.deficit;
        if (it.deficit > maxDeficit) maxDeficit = it.deficit;
      });

      if (card.cost === 20) {
        if (card.id === "leyline_mora") {
          card.runs = Math.ceil(totalCardDeficit / 60000);
          card.resin = card.runs * 20;
        } else if (card.id === "leyline_exp") {
          let expDef = 0;
          card.items.forEach((it) => {
            const val = (typeof EXP_BOOK_VALUE !== "undefined" && EXP_BOOK_VALUE[it.id]) ? EXP_BOOK_VALUE[it.id] : 20000;
            expDef += it.deficit * val;
          });
          card.runs = Math.ceil(expDef / 90000);
          card.resin = card.runs * 20;
        } else if (card.tagType === "talent") {
          let purpleEq = 0;
          card.items.forEach((it) => {
            const rank = it.rank || 3;
            purpleEq += it.deficit * Math.pow(1 / 3, Math.max(0, 4 - rank));
          });
          card.runs = Math.ceil(purpleEq / 1.12);
          card.resin = card.runs * 20;
        } else if (card.tagType === "weapon") {
          let goldEq = 0;
          card.items.forEach((it) => {
            const rank = it.rank || 4;
            goldEq += it.deficit * Math.pow(1 / 3, Math.max(0, 5 - rank));
          });
          card.runs = Math.ceil(goldEq / 1.05);
          card.resin = card.runs * 20;
        } else {
          card.runs = Math.ceil(totalCardDeficit / 2);
          card.resin = card.runs * 20;
        }
      } else if (card.cost === 40) {
        const bossMat = card.items.find((it) => it.id.startsWith("113"));
        const bossDef = bossMat ? bossMat.deficit : totalCardDeficit;
        // Escala real de drops por Nivel de Mundo (WL):
        // Mundo 9 (AR 58+): 3.0 garantizados
        // Mundo 8 (AR 55-57): 2.55 promedio
        // Mundo 7 (AR 50-54): 2.45 promedio
        // Mundo 6 (AR 45-49): 2.25 promedio
        // Mundo 5 (AR 40-44): 2.10 promedio
        // Mundo 4 (AR 35-39): 1.85 promedio
        // Mundo 3 (AR 30-34): 1.60 promedio
        // Mundo 2 (AR 25-29): 1.35 promedio
        // Mundo 1 (AR 20-24): 1.20 promedio
        // Mundo 0 (AR 1-19): 1.00 promedio
        let bossDropRate = 3.0;
        try {
          const selWlEl = document.getElementById("selAccountWL");
          const wl = selWlEl ? parseInt(selWlEl.value, 10) : 9;
          if (wl >= 9) bossDropRate = 3.0;
          else if (wl === 8) bossDropRate = 2.55;
          else if (wl === 7) bossDropRate = 2.45;
          else if (wl === 6) bossDropRate = 2.25;
          else if (wl === 5) bossDropRate = 2.10;
          else if (wl === 4) bossDropRate = 1.85;
          else if (wl === 3) bossDropRate = 1.60;
          else if (wl === 2) bossDropRate = 1.35;
          else if (wl === 1) bossDropRate = 1.20;
          else bossDropRate = 1.0;
        } catch (err) {
          bossDropRate = 3.0;
        }
        card.runs = Math.ceil(bossDef / bossDropRate);
        card.resin = card.runs * 40;
      } else if (card.cost === 60 || card.tagType === "weekly") {
        card.cost = 60;
        const weeklyMat = card.items.find((it) => it.id.startsWith("113"));
        const weekDef = weeklyMat ? weeklyMat.deficit : totalCardDeficit;
        card.runs = Math.ceil(weekDef / 2.4);
        card.resin = card.runs * 30; // 30 resina con bono semanal
      } else {
        card.runs = 0;
        card.resin = 0;
      }

      if (card.resin > 0) {
        card.condResin = Math.ceil(card.resin / 60);
        card.daysNeeded = Math.ceil(card.resin / 180 * 10) / 10;
        card.days = card.daysNeeded;
        totalResinNeeded += card.resin;
      } else {
        card.condResin = 0;
        card.daysNeeded = 0;
        card.days = 0;
      }

      if (!card.scheduleDays) {
        card.scheduleDays = [0, 1, 2, 3, 4, 5, 6];
      }

      card.scheduleText = (function(days) {
        if (!days || days.length >= 7) return fe.everyDay;
        const ordered = [1, 2, 3, 4, 5, 6, 0].filter((d) => days.includes(d));
        return ordered.map((d) => fe.dayNames[d]).join(" / ");
      })(card.scheduleDays);
    });

    // 6. Agrupar en las 4 secciones oficiales de Seelie
    const sections = [
      { id: "none", costLabel: "Ninguno", costBadge: "0 ✦", resinCost: 0, cards: [] },
      { id: "resin20", costLabel: "20", costBadge: "20 ✦", resinCost: 20, cards: [] },
      { id: "resin40", costLabel: "40", costBadge: "40 ✦", resinCost: 40, cards: [] },
      { id: "resin60", costLabel: "60", costBadge: "60 ✦", resinCost: 60, cards: [] }
    ];

    sourceCardsMap.forEach((card) => {
      if (card.cost === 0) sections[0].cards.push(card);
      else if (card.cost === 20) sections[1].cards.push(card);
      else if (card.cost === 40) sections[2].cards.push(card);
      else sections[3].cards.push(card);
    });

    // Ordenar tarjetas dentro de cada sección: primero por orden lógico, luego por título
    sections.forEach((sec) => {
      sec.cards.sort((a, b) => {
        if ((a.order || 50) !== (b.order || 50)) return (a.order || 50) - (b.order || 50);
        return a.title.localeCompare(b.title);
      });
    });

    const daysResin = Math.ceil(totalResinNeeded / 180 * 10) / 10;
    const condResin = Math.ceil(totalResinNeeded / 60);

    return {
      activeCharList,
      totals: {
        totalResin: totalResinNeeded,
        days: daysResin,
        condResin: condResin
      },
      sections
    };
  }
};

