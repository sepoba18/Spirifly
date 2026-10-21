// =====================================================================
// BASE DE DATOS MODULAR DE BUILDS META & SIMULADOR DE THEORYCRAFTING
// Estándar de la Comunidad Global (KeqingMains, Game8, GenshinLab)
// Total de Personajes Jugables Integrados: 127
// =====================================================================

const CHARACTER_BUILDS_DB = [
  {
    "id": "albedo",
    "name": {
      "es": "Albedo",
      "en": "Albedo"
    },
    "element": "Geo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Albedo.png",
    "tier": "T1 Sub-DPS Geo",
    "role": "Sub-DPS Geo Off-Field (Flor Solar de Defensa) & Buffer de EM (+125 EM en Q)",
    "roleCategory": "sub_dps",
    "scalingType": "DEF",
    "scalingLabel": "Habilidad E escala 100% con Defensa (DEF%)",
    "bestWeapons": [
      {
        "name": "Huso de Cinabrio (Cinnabar Spindle)",
        "rarity": 4,
        "type": "BiS Absoluto Evento",
        "note": "Aumenta el daño de la Flor Solar según su DEF total."
      },
      {
        "name": "Urakusugiri / Cortador de Jade",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Stat-sticks de Crítico y DEF."
      },
      {
        "name": "Espada del Alba (Harbinger of Dawn R5)",
        "rarity": 3,
        "type": "Mejor F2P",
        "note": "+28% CR y +46.9% CD gratis si se mantiene fuera de campo >90% HP."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Compañía Dorada (4 piezas)",
        "type": "BiS Flor Solar",
        "bonus": "+70% Daño de Habilidad Elemental continuo fuera de campo."
      },
      {
        "set": "Cáscara de Sueños Opulentos (4 piezas)",
        "type": "Máxima DEF",
        "bonus": "+54% DEF y +24% Bono Geo."
      }
    ],
    "mainStats": {
      "sands": "DEF%",
      "goblet": "Bono Daño Geo%",
      "circlet": "DEF% o Prob. Crítica / Daño Crítico"
    },
    "substatsPriority": [
      "1. DEF% y DEF Plana (2,400 – 2,800 DEF)",
      "2. Prob. Crítica / Daño Crítico (1:2)",
      "3. Recarga de Energía%"
    ],
    "talentPriority": "Habilidad Elemental (E - Flor Solar) >>> Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "16,000",
      "atk": "1,200",
      "def": "2,400 – 2,800 DEF",
      "em": "0",
      "er": "110% ER",
      "crit": "70%+ CR / 140%+ CD"
    },
    "metaTeams": [
      {
        "name": "Itto Mono Geo",
        "comp": "Arataki Itto • Gorou • Albedo • Zhongli",
        "members": [
          "Arataki Itto",
          "Gorou",
          "Albedo",
          "Zhongli"
        ]
      },
      {
        "name": "Hu Tao Double Geo Clásico",
        "comp": "Hu Tao • Xingqiu • Albedo • Zhongli",
        "members": [
          "Hu Tao",
          "Xingqiu",
          "Albedo",
          "Zhongli"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "1,200",
      "def": "2,400 – 2,800 DEF",
      "em": "0",
      "er": "110% ER",
      "crit": "70%+ CR / 140%+ CD"
    },
    "baseStats": {
      "hp90": 13226,
      "atk90": 251,
      "def90": 876,
      "ascStat": "Bono Geo",
      "ascVal": "28.8%"
    },
    "talentsData": {
      "normal": {
        "name": "Esgrima Favonius",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          36.7,
          40.8,
          44.9,
          48.9,
          53,
          57.1,
          61.2,
          65.2,
          69.3,
          73.4,
          77.8,
          82.2,
          86.6
        ]
      },
      "skill": {
        "name": "Génesis: Flor Solar E (Daño Flor Efímera)",
        "scaleStat": "DEF",
        "unit": "% DEF",
        "mvByLevel": [
          134,
          145.8,
          157.7,
          169.5,
          181.3,
          193.2,
          205,
          216.8,
          228.7,
          240.5,
          254.9,
          269.4,
          283.8
        ]
      },
      "burst": {
        "name": "Evolución Divina Q",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          367,
          399.7,
          432.3,
          465,
          497.7,
          530.3,
          563,
          595.7,
          628.3,
          661,
          700.7,
          740.3,
          780
        ]
      }
    },
    "statPriority": {
      "sands": "DEF%",
      "goblet": "Bono Daño Geo%",
      "circlet": "DEF% o Prob. Crítica / Daño Crítico",
      "substats": "1. DEF% y DEF Plana (2,400 – 2,800 DEF) > 2. Prob. Crítica / Daño Crítico (1:2) > 3. Recarga de Energía%"
    }
  },
  {
    "id": "alhaitham",
    "name": {
      "es": "Alhacén (Alhaitham)",
      "en": "Alhaitham"
    },
    "element": "Dendro",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Alhatham.png",
    "tier": "T0 Spread Hypercarry",
    "role": "Hypercarry Dendro en Campo (Lluvia de Espadas de Espejos Chisel-Light)",
    "roleCategory": "main_dps",
    "scalingType": "EM_ATK",
    "scalingLabel": "Escalado Dual: Maestría Elemental (Mayor peso pasiva A4) + ATQ%",
    "bestWeapons": [
      {
        "name": "Clorofilo Refulgente (Light of Foliar Incision)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+88.2% Daño Crítico, +4% CR y convierte Maestría Elemental en enorme daño plano para normales y E."
      },
      {
        "name": "Cortador de Jade Primordial / Reflejo de las Tinieblas",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Stat-sticks de Crítico y ATQ masivos."
      },
      {
        "name": "Espina de Hierro / Diluvio Florífero",
        "rarity": 4,
        "type": "Mejores F2P",
        "note": "Forja y evento gratuitos con +165 de Maestría Elemental y daño elemental."
      },
      {
        "name": "Espada del Alba (Harbinger of Dawn R5)",
        "rarity": 3,
        "type": "F2P 3★ Dios",
        "note": "+28% CR y +46.9% CD si se mantiene >90% HP con escudos o curación de Kuki/Baizhu."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sueños Áureos (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+Hasta 230 de Maestría Elemental y +14% ATQ continuo en combate."
      },
      {
        "set": "Recuerdos del Bosque (4 piezas)",
        "type": "Solo si va Solo Dendro",
        "bonus": "-30% RES Dendro si ningún compañero del equipo puede llevar este set."
      },
      {
        "set": "2p EM+80 + 2p Dendro+15%",
        "type": "Alternativa 2p+2p",
        "bonus": "Excelente alternativa con buenos substats de crítico."
      }
    ],
    "mainStats": {
      "sands": "Maestría Elemental",
      "goblet": "Bono Daño Dendro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. Maestría Elemental (250 – 400 EM)",
      "3. Recarga de Energía% (120% – 135% ER)",
      "4. ATQ%"
    ],
    "talentPriority": "Habilidad Elemental (E - Espejos) = Ataque Normal > Definitiva (Q)",
    "benchmarks": {
      "hp": "18,000",
      "atk": "1,300 – 1,500 ATQ",
      "def": "800",
      "em": "350 – 450 EM",
      "er": "125% – 135% ER",
      "crit": "75%+ CR / 170%+ CD"
    },
    "metaTeams": [
      {
        "name": "Alhaitham Quickbloom (Top Meta)",
        "comp": "Alhaitham • Nahida • Yelan • Xingqiu",
        "members": [
          "Alhaitham",
          "Nahida",
          "Yelan",
          "Xingqiu"
        ]
      },
      {
        "name": "Alhaitham Pure Spread",
        "comp": "Alhaitham • Yae Miko • Nahida • Zhongli",
        "members": [
          "Alhaitham",
          "Yae Miko",
          "Nahida",
          "Zhongli"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "1,300 – 1,500 ATQ",
      "def": "800",
      "em": "350 – 450 EM",
      "er": "125% – 135% ER",
      "crit": "75%+ CR / 170%+ CD"
    },
    "baseStats": {
      "hp90": 13348,
      "atk90": 313,
      "def90": 782,
      "ascStat": "Bono Dendro",
      "ascVal": "28.8%"
    },
    "talentsData": {
      "normal": {
        "name": "Razonamiento Abductivo",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          58.3,
          64.8,
          71.3,
          77.7,
          84.2,
          90.7,
          97.2,
          103.6,
          110.1,
          116.6,
          123.6,
          130.6,
          137.6
        ]
      },
      "skill": {
        "name": "Universalidad: Proyección de 3 Espejos E",
        "scaleStat": "EM",
        "unit": "% ATQ + % EM",
        "mvByLevel": [
          217,
          241.1,
          265.2,
          289.3,
          313.4,
          337.6,
          361.7,
          385.8,
          409.9,
          434,
          460,
          486.1,
          512.1
        ]
      },
      "burst": {
        "name": "Atadura Particular Q (Por Golpe de Espejo)",
        "scaleStat": "EM",
        "unit": "% ATQ + % EM",
        "mvByLevel": [
          121,
          134.4,
          147.9,
          161.3,
          174.8,
          188.2,
          201.7,
          215.1,
          228.6,
          242,
          256.5,
          271,
          285.6
        ]
      }
    },
    "statPriority": {
      "sands": "Maestría Elemental",
      "goblet": "Bono Daño Dendro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. Maestría Elemental (250 – 400 EM) > 3. Recarga de Energía% (120% – 135% ER) > 4. ATQ%"
    }
  },
  {
    "id": "itto",
    "name": {
      "es": "Arataki Itto",
      "en": "Arataki Itto"
    },
    "element": "Geo",
    "rarity": 5,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Itto.png",
    "tier": "T0.5 DEF Hypercarry",
    "role": "Hypercarry Geo en Campo (Ataques Cargados Kesagiri Devastadores)",
    "roleCategory": "main_dps",
    "scalingType": "DEF",
    "scalingLabel": "Definitiva Q convierte toda su DEF en ATQ gigantesco (4,000+ ATQ en combate)",
    "bestWeapons": [
      {
        "name": "Espadón Cornirrojo (Redhorn Stonethresher)",
        "rarity": 5,
        "type": "BiS Absoluto",
        "note": "+88.2% Daño Crítico, +28% DEF y enorme aumento de daño plano en normales y cargados."
      },
      {
        "name": "Médula de la Serpiente Marina",
        "rarity": 4,
        "type": "Mejor 4★ Pase",
        "note": "+Prob. Crítica y hasta +50% daño directo en sus golpes Kesagiri."
      },
      {
        "name": "Sombra Blanca (Whiteblind R5)",
        "rarity": 4,
        "type": "Mejor F2P Forja",
        "note": "Forja accesible que aporta hasta +99.7% DEF total con acumulaciones."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Cáscara de Sueños Opulentos (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+54% DEF y +24% Bono Daño Geo continuo."
      },
      {
        "set": "Cazador Fantasmal (4 piezas)",
        "type": "BiS con Furina",
        "bonus": "+36% Prob. Crítica si juega en equipo con Furina."
      }
    ],
    "mainStats": {
      "sands": "DEF%",
      "goblet": "Bono Daño Geo%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. DEF%",
      "3. Recarga de Energía% (125% – 140% ER)",
      "4. ATQ%"
    ],
    "talentPriority": "Ataque Normal (Cargados Kesagiri) = Definitiva (Q) > Habilidad Elemental (E - Ushi)",
    "benchmarks": {
      "hp": "18,000",
      "atk": "Panel Base: 1,200 (Buff Q: 4,000+)",
      "def": "2,300 – 2,700 DEF",
      "em": "0",
      "er": "130% – 140% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "metaTeams": [
      {
        "name": "Mono Geo Clásico",
        "comp": "Arataki Itto • Gorou • Albedo • Chiori",
        "members": [
          "Arataki Itto",
          "Gorou",
          "Albedo",
          "Chiori"
        ]
      },
      {
        "name": "Itto-Furina Core",
        "comp": "Arataki Itto • Gorou • Furina • Chiori",
        "members": [
          "Arataki Itto",
          "Gorou",
          "Furina",
          "Chiori"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "Panel Base: 1,200 (Buff Q: 4,000+)",
      "def": "2,300 – 2,700 DEF",
      "em": "0",
      "er": "130% – 140% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "baseStats": {
      "hp90": 12858,
      "atk90": 227,
      "def90": 959,
      "ascStat": "Prob. Crítica",
      "ascVal": "19.2%"
    },
    "talentsData": {
      "normal": {
        "name": "Golpe Kesagiri (Cargado Continuo)",
        "scaleStat": "DEF",
        "unit": "% ATQ + Bono DEF",
        "mvByLevel": [
          91.2,
          101.1,
          111,
          120.9,
          130.8,
          140.6,
          150.5,
          160.4,
          170.3,
          180.2,
          191,
          201.8,
          212.6
        ]
      },
      "skill": {
        "name": "Ushi el Toro Dorado E (Nuke)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          305,
          332.4,
          359.9,
          387.3,
          414.8,
          442.2,
          469.7,
          497.1,
          524.6,
          552,
          585.1,
          618.2,
          651.4
        ]
      },
      "burst": {
        "name": "Rey Demonio Q: Conversión DEF en ATQ (% DEF)",
        "scaleStat": "DEF",
        "unit": "% Conversión",
        "mvByLevel": [
          57,
          62.2,
          67.4,
          72.6,
          77.8,
          82.9,
          88.1,
          93.3,
          98.5,
          103.7,
          109.9,
          116.1,
          122.4
        ]
      }
    },
    "statPriority": {
      "sands": "DEF%",
      "goblet": "Bono Daño Geo%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. DEF% > 3. Recarga de Energía% (125% – 140% ER) > 4. ATQ%"
    }
  },
  {
    "id": "arlecchino",
    "name": {
      "es": "Arlecchino",
      "en": "Arlecchino"
    },
    "element": "Pyro",
    "rarity": 5,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Arlecchino.png",
    "tier": "T0 Hypercarry DPS",
    "role": "Hypercarry Pyro On-Field (Pacto Perpetuo / Bond of Life)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% & Multiplicador de Pacto Perpetuo",
    "bestWeapons": [
      {
        "name": "Semblanza de la Luna Carmesí",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Prob. Crítica, genera +25% de Pacto Perpetuo y hasta +36% de daño universal."
      },
      {
        "name": "Halcón de Jade Primordial / Báculo de Homa",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Stat-sticks excepcionales de Crítico y ATQ."
      },
      {
        "name": "Balada de los Fiordos / Lanza del Duelo",
        "rarity": 4,
        "type": "Pase de Batalla",
        "note": "+Prob. Crítica altísima; Balada otorga 120 EM en Vaporizado."
      },
      {
        "name": "Borla Blanca (White Tassel R5)",
        "rarity": 3,
        "type": "Mejor F2P",
        "note": "Arma 3★ de cofre (+23.4% CR y +48% daño en Ataques Normales, compite con 4★)."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Fragmento de la Armonía Fantasmal (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+54% Daño constante al aumentar o disminuir el Pacto Perpetuo."
      },
      {
        "set": "Gladiador (4 piezas)",
        "type": "Alternativa Top",
        "bonus": "+35% Daño en Ataques Normales (solo ~6% por detrás de Armonía)."
      }
    ],
    "mainStats": {
      "sands": "ATQ% (o EM en Vaporizado)",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ%",
      "3. Maestría Elemental (80 – 160 EM)",
      "4. Recarga de Energía (100% – 120%)"
    ],
    "talentPriority": "Ataque Normal (NA) >>> Habilidad Elemental (E) = Definitiva (Q)",
    "benchmarks": {
      "hp": "18,000",
      "atk": "2,100 – 2,400 ATQ",
      "def": "800",
      "em": "80 – 160 EM",
      "er": "110% – 125% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "metaTeams": [
      {
        "name": "Arlecchino Vape",
        "comp": "Arlecchino • Yelan • Bennett • Kazuha",
        "members": [
          "Arlecchino",
          "Yelan",
          "Bennett",
          "Kazuha"
        ]
      },
      {
        "name": "Arlecchino Overload",
        "comp": "Arlecchino • Chevreuse • Fischl • Bennett",
        "members": [
          "Arlecchino",
          "Chevreuse",
          "Fischl",
          "Bennett"
        ]
      },
      {
        "name": "Arlecchino Mono Pyro",
        "comp": "Arlecchino • Bennett • Xiangling • Kazuha",
        "members": [
          "Arlecchino",
          "Bennett",
          "Xiangling",
          "Kazuha"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "2,100 – 2,400 ATQ",
      "def": "800",
      "em": "80 – 160 EM",
      "er": "110% – 125% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "baseStats": {
      "hp90": 13103,
      "atk90": 342,
      "def90": 765,
      "ascStat": "Daño Crítico",
      "ascVal": "38.4%"
    },
    "talentsData": {
      "normal": {
        "name": "Invitación a la Masacre (Normal con BoL)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          93.2,
          103.6,
          113.9,
          124.3,
          134.6,
          145,
          155.3,
          165.7,
          176,
          186.4,
          197.6,
          208.8,
          220
        ]
      },
      "skill": {
        "name": "Cenizas de la Deuda E (Golpe + Cobro)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          88,
          97.8,
          107.6,
          117.3,
          127.1,
          136.9,
          146.7,
          156.4,
          166.2,
          176,
          186.6,
          197.1,
          207.7
        ]
      },
      "burst": {
        "name": "Ascenso Fatídico Q (Curación + Nuke)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          370,
          403,
          436,
          469,
          502,
          535,
          568,
          601,
          634,
          667,
          707,
          747,
          787.1
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ% (o EM en Vaporizado)",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% > 3. Maestría Elemental (80 – 160 EM) > 4. Recarga de Energía (100% – 120%)"
    }
  },
  {
    "id": "baizhu",
    "name": {
      "es": "Baizhu",
      "en": "Baizhu"
    },
    "element": "Dendro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Baizhuer.png",
    "tier": "T0 Dendro Healer",
    "role": "Healer de Equipo Instantáneo, Escudo Anti-Interrupción & Buffer de Reacciones",
    "roleCategory": "healer_shielder",
    "scalingType": "HP",
    "scalingLabel": "Escalado 100% Vida Máxima (Tope Pasiva A4 en 50,000 HP: +100% Bloom, +40% Spread)",
    "bestWeapons": [
      {
        "name": "Centelleo Jadecaído (Jadefall's Splendor)",
        "rarity": 5,
        "type": "BiS Firma",
        "note": "49.6% Vida, restaura energía tras cada Definitiva y da Bono Elemental al equipo."
      },
      {
        "name": "Prototipo Ámbar (Prototype Amber R5)",
        "rarity": 4,
        "type": "Mejor F2P (Idéntico a Firma)",
        "note": "41.3% Vida + 18 de Energía devuelta + curación adicional grupal."
      },
      {
        "name": "Cuentos de Cazadores de Dragones (TTDS R5)",
        "rarity": 3,
        "type": "Opción Buffer ATQ",
        "note": "35.2% Vida y +48% ATQ al DPS principal."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Recuerdos del Bosque (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "-30% Resistencia Dendro a los enemigos para potenciar al carry Dendro o semillas."
      },
      {
        "set": "Perla Oceánica (4 piezas)",
        "type": "Alternativa Daño",
        "bonus": "Convierte su gigantesca curación en daño físico de burbuja."
      }
    ],
    "mainStats": {
      "sands": "Vida% o Recarga ER%",
      "goblet": "Vida%",
      "circlet": "Vida% o Bono de Curación%"
    },
    "substatsPriority": [
      "1. Vida% y Vida Plana (Meta estricto: 50,000 HP para tope pasiva A4)",
      "2. Recarga de Energía% (160% - 190% ER)",
      "3. Prob. Crítica (con Favonius)"
    ],
    "talentPriority": "Habilidad Elemental (E) = Definitiva (Q) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "48,000 – 52,000 HP",
      "atk": "1,100",
      "def": "700",
      "em": "0",
      "er": "165% – 190% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "Neuvillette Hypercarry",
        "comp": "Neuvillette • Furina • Kazuha • Baizhu",
        "members": [
          "Neuvillette",
          "Furina",
          "Kazuha",
          "Baizhu"
        ]
      },
      {
        "name": "Alhaitham Spread",
        "comp": "Alhaitham • Yae Miko • Nahida • Baizhu",
        "members": [
          "Alhaitham",
          "Yae Miko",
          "Nahida",
          "Baizhu"
        ]
      },
      {
        "name": "Cyno Quickbloom",
        "comp": "Cyno • Furina • Nahida • Baizhu",
        "members": [
          "Cyno",
          "Furina",
          "Nahida",
          "Baizhu"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "48,000 – 52,000 HP",
      "atk": "1,100",
      "def": "700",
      "em": "0",
      "er": "165% – 190% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 13348,
      "atk90": 193,
      "def90": 500,
      "ascStat": "Vida%",
      "ascVal": "28.8%"
    },
    "talentsData": {
      "normal": {
        "name": "Acupuntura Dorada",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          37.4,
          41.6,
          45.7,
          49.9,
          54,
          58.2,
          62.3,
          66.5,
          70.6,
          74.8,
          79.3,
          83.8,
          88.3
        ]
      },
      "skill": {
        "name": "Diagnóstico Universal E: Curación de Equipo",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          8,
          8.7,
          9.4,
          10.1,
          10.8,
          11.6,
          12.3,
          13,
          13.7,
          14.4,
          15.3,
          16.1,
          17
        ]
      },
      "burst": {
        "name": "Sanación Holística Q: Escudo de Bambú y Cura por Tick",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          5.5,
          6,
          6.5,
          7,
          7.5,
          7.9,
          8.4,
          8.9,
          9.4,
          9.9,
          10.5,
          11.1,
          11.7
        ]
      }
    },
    "statPriority": {
      "sands": "Vida% o Recarga ER%",
      "goblet": "Vida%",
      "circlet": "Vida% o Bono de Curación%",
      "substats": "1. Vida% y Vida Plana (Meta estricto: 50,000 HP para tope pasiva A4) > 2. Recarga de Energía% (160% - 190% ER) > 3. Prob. Crítica (con Favonius)"
    }
  },
  {
    "id": "beidou",
    "name": {
      "es": "Beidou",
      "en": "Beidou"
    },
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Beidou.png",
    "tier": "T0.5 Chain Lightning AoE",
    "role": "Sub-DPS Electro en Área de Rebotes Eléctricos (Hasta 5 rebotes en C2)",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Multiplicadores Masivos de Descarga Rayo Q",
    "bestWeapons": [
      {
        "name": "Lápida del Lobo (Wolf's Gravestone)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+ATQ% masivo y buff al equipo."
      },
      {
        "name": "Médula de la Serpiente Marina (Serpent Spine)",
        "rarity": 4,
        "type": "BiS Pase",
        "note": "+Prob. Crítica y hasta +50% daño."
      },
      {
        "name": "Gran Espada de Favonius (Favonius Greatsword)",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Soluciona costo de 80 energía."
      },
      {
        "name": "Rey del Mal (Akuoumaru)",
        "rarity": 4,
        "type": "Daño de Burst",
        "note": "Escala con costo total de energía."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Emblema del Destino (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "Convierte su alta recarga en hasta +75% de daño en cada descarga de rayo de su Q."
      },
      {
        "set": "Furia del Trueno (2p) + Nobleza (2p)",
        "type": "Alternativa 2p+2p",
        "bonus": "Buena opción con excelentes substats."
      }
    ],
    "mainStats": {
      "sands": "Recarga de Energía% o ATQ%",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (180% - 200% ER)",
      "2. Prob. Crítica / Daño Crítico (1:2)",
      "3. ATQ%",
      "4. Maestría Elemental"
    ],
    "talentPriority": "Definitiva (Q - Rayos) >>> Habilidad Elemental (E - Contraataque Perfecto) >>> Ataques Normales",
    "benchmarks": {
      "hp": "18,000",
      "atk": "1,600 – 1,900 ATQ",
      "def": "750",
      "em": "50 – 100 EM",
      "er": "180% – 200% ER",
      "crit": "65%+ CR / 140%+ CD"
    },
    "metaTeams": [
      {
        "name": "Taser Clásico",
        "comp": "Sucrose • Xingqiu • Beidou • Fischl",
        "members": [
          "Sucrose",
          "Xingqiu",
          "Beidou",
          "Fischl"
        ]
      },
      {
        "name": "Neuvillette Taser F2P",
        "comp": "Neuvillette • Beidou • Fischl • Kazuha",
        "members": [
          "Neuvillette",
          "Beidou",
          "Fischl",
          "Kazuha"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "1,600 – 1,900 ATQ",
      "def": "750",
      "em": "50 – 100 EM",
      "er": "180% – 200% ER",
      "crit": "65%+ CR / 140%+ CD"
    },
    "baseStats": {
      "hp90": 13050,
      "atk90": 225,
      "def90": 648,
      "ascStat": "Bono Electro",
      "ascVal": "24.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Conquistadora de Olas",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          71.1,
          79,
          86.9,
          94.8,
          102.7,
          110.6,
          118.5,
          126.4,
          134.3,
          142.2,
          150.7,
          159.3,
          167.8
        ]
      },
      "skill": {
        "name": "Invocadora de Mareas E (Contraataque Máximo)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          288,
          313.6,
          339.2,
          364.8,
          390.4,
          416,
          441.6,
          467.2,
          492.8,
          518.4,
          549.5,
          580.6,
          611.7
        ]
      },
      "burst": {
        "name": "Quebrantatormentas Q: Daño por Rayo Relámpago",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          96,
          104.5,
          113.1,
          121.6,
          130.1,
          138.7,
          147.2,
          155.7,
          164.3,
          172.8,
          183.2,
          193.5,
          203.9
        ]
      }
    },
    "statPriority": {
      "sands": "Recarga de Energía% o ATQ%",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Recarga de Energía% (180% - 200% ER) > 2. Prob. Crítica / Daño Crítico (1:2) > 3. ATQ% > 4. Maestría Elemental"
    }
  },
  {
    "id": "bennett",
    "name": {
      "es": "Bennett",
      "en": "Bennett"
    },
    "element": "Pyro",
    "rarity": 4,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Bennett.png",
    "tier": "T0 Buffer Universal",
    "role": "Buffer de ATQ Masivo (+1,200 ATQ Plano) & Healer Veloz",
    "roleCategory": "support",
    "scalingType": "ATK_HP",
    "scalingLabel": "Buff Q escala SOLO con ATQ BASE (Arma + Nivel) • Curación escala con HP",
    "bestWeapons": [
      {
        "name": "Hoja Afilada Celestial (Skyward Blade)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "Alto ATQ Base (608) y +55.1% Recarga de Energía."
      },
      {
        "name": "Aquila Favonia / Reflejo de las Tinieblas",
        "rarity": 5,
        "type": "Máximo Buff",
        "note": "ATQ Base máximo del juego (674) para el mayor buff posible."
      },
      {
        "name": "Espada de Madera (Sapwood Blade)",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "Forja de Sumeru: 565 ATQ Base alto y +30.6% Recarga de Energía."
      },
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "Batería",
        "note": "Genera partículas blancas adicionales para el equipo."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Nobleza Obligada (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+20% ATQ adicional para todo el equipo tras activar su Definitiva."
      },
      {
        "set": "Instructor (4 piezas)",
        "type": "Alternativa Reacciones",
        "bonus": "+120 Maestría Elemental para equipos de Vaporizado o Derretido."
      }
    ],
    "mainStats": {
      "sands": "Recarga de Energía%",
      "goblet": "Vida%",
      "circlet": "Bono de Curación% o Vida%"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (220% - 250% ER)",
      "2. Vida% y Vida Plana",
      "3. Prob. Crítica (si usa Favonius)",
      "❌ ATQ% en artefactos NO aumenta el buff de su Q"
    ],
    "talentPriority": "Definitiva (Q) >>> Habilidad Elemental (E) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "28,000 – 34,000 HP",
      "atk": "700 – 865 ATQ Base",
      "def": "750",
      "em": "0",
      "er": "220% – 260% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "National Team",
        "comp": "Xiangling • Xingqiu • Bennett • Kazuha",
        "members": [
          "Xiangling",
          "Xingqiu",
          "Bennett",
          "Kazuha"
        ]
      },
      {
        "name": "Hypercarry Buffer",
        "comp": "Mavuika • Arlecchino • Navia • Bennett",
        "members": [
          "Mavuika",
          "Arlecchino",
          "Navia",
          "Bennett"
        ]
      },
      {
        "name": "Sunfire Jean Core",
        "comp": "Jean • Bennett • Furina • Raiden",
        "members": [
          "Jean",
          "Bennett",
          "Furina",
          "Raiden"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "28,000 – 34,000 HP",
      "atk": "700 – 865 ATQ Base",
      "def": "750",
      "em": "0",
      "er": "220% – 260% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 12397,
      "atk90": 191,
      "def90": 771,
      "ascStat": "Recarga Energía",
      "ascVal": "26.7%"
    },
    "talentsData": {
      "normal": {
        "name": "Espada de la Buena Suerte",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          44.5,
          49.4,
          54.4,
          59.3,
          64.3,
          69.2,
          74.2,
          79.1,
          84.1,
          89,
          94.3,
          99.7,
          105
        ]
      },
      "skill": {
        "name": "Sobrecarga de Pasión E",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          138,
          153.3,
          168.7,
          184,
          199.3,
          214.7,
          230,
          245.3,
          260.7,
          276,
          292.6,
          309.1,
          325.7
        ]
      },
      "burst": {
        "name": "Viaje Fantástico: Buff ATQ Base Q (% del ATQ Base)",
        "scaleStat": "ATK",
        "unit": "% ATQ Base",
        "mvByLevel": [
          56,
          63,
          70,
          77,
          84,
          91,
          98,
          105,
          112,
          119,
          126.1,
          133.3,
          140.4
        ]
      }
    },
    "statPriority": {
      "sands": "Recarga de Energía%",
      "goblet": "Vida%",
      "circlet": "Bono de Curación% o Vida%",
      "substats": "1. Recarga de Energía% (220% - 250% ER) > 2. Vida% y Vida Plana > 3. Prob. Crítica (si usa Favonius) > ❌ ATQ% en artefactos NO aumenta el buff de su Q"
    }
  },
  {
    "id": "barbara",
    "name": {
      "es": "Bárbara",
      "en": "Barbara"
    },
    "element": "Hydro",
    "rarity": 4,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Barbara.png",
    "tier": "T2 Healer F2P",
    "role": "Healer Básica F2P & Aplicadora Hydro Cercana",
    "roleCategory": "healer_shielder",
    "scalingType": "HP",
    "scalingLabel": "Escalado 100% por Vida Máxima",
    "bestWeapons": [
      {
        "name": "Cuento de Cazadores de Dragones (TTDS)",
        "rarity": 3,
        "type": "BiS Soporte",
        "note": "+48% ATQ para el carry y +35.2% Vida Máxima."
      },
      {
        "name": "Prototipo Ámbar",
        "rarity": 4,
        "type": "F2P",
        "note": "Cura adicional y recarga automática."
      },
      {
        "name": "Memorias de Sacrificio",
        "rarity": 4,
        "type": "Nilou Bloom",
        "note": "Reinicia su aro de agua E."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Doncella Amada (4 piezas)",
        "type": "Máxima Curación",
        "bonus": "Multiplica toda la curación recibida por el equipo."
      },
      {
        "set": "Perla Oceánica (4 piezas)",
        "type": "Daño Pasivo",
        "bonus": "Convierte su curación continua en burbujas de daño físico de hasta 30k."
      }
    ],
    "mainStats": {
      "sands": "Vida%",
      "goblet": "Vida%",
      "circlet": "Bono de Curación% o Vida%"
    },
    "substatsPriority": [
      "1. Vida%",
      "2. Recarga de Energía%",
      "3. Maestría Elemental (en Bloom)"
    ],
    "talentPriority": "Habilidad Elemental (E) = Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "30,000 – 35,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0 – 100 EM",
      "er": "140% – 160% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "Nilou Bloom F2P",
        "comp": "Nilou • Viajero Dendro • Collei • Bárbara",
        "members": [
          "Nilou",
          "Viajero Dendro",
          "Collei",
          "Bárbara"
        ]
      },
      {
        "name": "Freeze Principiante",
        "comp": "Kaeya • Rosaria • Bárbara • Sacarosa",
        "members": [
          "Kaeya",
          "Rosaria",
          "Bárbara",
          "Sacarosa"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "30,000 – 35,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0 – 100 EM",
      "er": "140% – 160% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 9787,
      "atk90": 159,
      "def90": 669,
      "ascStat": "Vida%",
      "ascVal": "24.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Murmullo del Agua",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          37.8,
          42,
          46.2,
          50.4,
          54.6,
          58.8,
          63,
          67.2,
          71.4,
          75.6,
          80.1,
          84.7,
          89.2
        ]
      },
      "skill": {
        "name": "Que Empiece el Concierto: Aro Curativo E",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          4,
          4.4,
          4.7,
          5.1,
          5.4,
          5.8,
          6.1,
          6.5,
          6.8,
          7.2,
          7.6,
          8.1,
          8.5
        ]
      },
      "burst": {
        "name": "Milagro Brillante: Curación Instantánea Q",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          17.6,
          19.2,
          20.7,
          22.3,
          23.9,
          25.4,
          27,
          28.6,
          30.1,
          31.7,
          33.6,
          35.5,
          37.4
        ]
      }
    },
    "statPriority": {
      "sands": "Vida%",
      "goblet": "Vida%",
      "circlet": "Bono de Curación% o Vida%",
      "substats": "1. Vida% > 2. Recarga de Energía% > 3. Maestría Elemental (en Bloom)"
    }
  },
  {
    "id": "candace",
    "name": {
      "es": "Candace",
      "en": "Candace"
    },
    "element": "Hydro",
    "rarity": 4,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Candace.png",
    "tier": "T2 Buffer / Infusión",
    "role": "Infusora Hydro & Buffer de Daño Elemental en Normales",
    "roleCategory": "support",
    "scalingType": "HP",
    "scalingLabel": "Escalado por Vida Máxima (Pasiva A4: +0.5% daño por cada 1,000 HP)",
    "bestWeapons": [
      {
        "name": "Lanza de Favonius",
        "rarity": 4,
        "type": "BiS Batería",
        "note": "Garantiza recarga constante para activar su Definitiva cada rotación."
      },
      {
        "name": "La Captura (The Catch)",
        "rarity": 4,
        "type": "F2P",
        "note": "Recarga de energía y daño en su golpe de Definitiva."
      },
      {
        "name": "Borla Negra",
        "rarity": 3,
        "type": "Vida Pura",
        "note": "+46.9% Vida Máxima para maximizar el buff de su pasiva A4."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Nobleza Obligada (4 piezas)",
        "type": "BiS Soporte",
        "bonus": "+20% ATQ para todo el equipo tras activar su Definitiva."
      },
      {
        "set": "2p Vida+20% + 2p Vida+20%",
        "type": "Máximo Buff",
        "bonus": "Maximiza su Vida Máxima para llevar el buff de normales al tope."
      }
    ],
    "mainStats": {
      "sands": "Vida% o Recarga de Energía%",
      "goblet": "Vida%",
      "circlet": "Vida% o Prob. Crítica (con Favonius)"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (180% - 210%)",
      "2. Vida%",
      "3. Prob. Crítica (para Favonius)"
    ],
    "talentPriority": "Definitiva (Q) > Habilidad Elemental (E) >>> Ataques Normales",
    "benchmarks": {
      "hp": "35,000 – 40,000 HP",
      "atk": "1,200",
      "def": "700",
      "em": "0",
      "er": "190% – 210% ER",
      "crit": "40%+ CR"
    },
    "metaTeams": [
      {
        "name": "Nilou Bloom con Yaoyao",
        "comp": "Nilou • Nahida • Candace • Yaoyao",
        "members": [
          "Nilou",
          "Nahida",
          "Candace",
          "Yaoyao"
        ]
      },
      {
        "name": "Arlecchino Hydro Infusion",
        "comp": "Arlecchino • Candace • Kazuha • Bennett",
        "members": [
          "Arlecchino",
          "Candace",
          "Kazuha",
          "Bennett"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "35,000 – 40,000 HP",
      "atk": "1,200",
      "def": "700",
      "em": "0",
      "er": "190% – 210% ER",
      "crit": "40%+ CR"
    },
    "baseStats": {
      "hp90": 10875,
      "atk90": 212,
      "def90": 683,
      "ascStat": "Vida%",
      "ascVal": "24.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Lanza Radiante",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          54.4,
          60.4,
          66.5,
          72.5,
          78.6,
          84.6,
          90.7,
          96.7,
          102.8,
          108.8,
          115.3,
          121.9,
          128.4
        ]
      },
      "skill": {
        "name": "Rito Sagrado: Garzaletazo E (Golpe Cargado)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          12,
          13.3,
          14.7,
          16,
          17.3,
          18.7,
          20,
          21.3,
          22.7,
          24,
          25.4,
          26.9,
          28.3
        ]
      },
      "burst": {
        "name": "Rito Sagrado: Marea de las Agaveñas Q (Daño Inicial)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          6.6,
          7.3,
          8.1,
          8.8,
          9.5,
          10.3,
          11,
          11.7,
          12.5,
          13.2,
          14,
          14.8,
          15.6
        ]
      }
    },
    "statPriority": {
      "sands": "Vida% o Recarga de Energía%",
      "goblet": "Vida%",
      "circlet": "Vida% o Prob. Crítica (con Favonius)",
      "substats": "1. Recarga de Energía% (180% - 210%) > 2. Vida% > 3. Prob. Crítica (para Favonius)"
    }
  },
  {
    "id": "chevreuse",
    "name": {
      "es": "Chevreuse",
      "en": "Chevreuse"
    },
    "element": "Pyro",
    "rarity": 4,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Chevreuse.png",
    "tier": "T0 Overload Buffer",
    "role": "Buffer de Sobrecarga (-40% RES Pyro/Electro, +40% ATQ) & Healer",
    "roleCategory": "support",
    "scalingType": "HP",
    "scalingLabel": "Escalado por Vida Máxima (Meta: 40,000 HP para activar el +40% ATQ)",
    "bestWeapons": [
      {
        "name": "Borla Negra",
        "rarity": 3,
        "type": "BiS Vida F2P",
        "note": "+46.9% Vida Máxima para alcanzar fácilmente los 40,000 HP."
      },
      {
        "name": "Lanza de Favonius",
        "rarity": 4,
        "type": "Batería",
        "note": "Si ya alcanza 40,000 HP con artefactos, aporta partículas para el equipo."
      },
      {
        "name": "Retribución de la Justicia",
        "rarity": 4,
        "type": "Forja Fontaine",
        "note": "+Vida Máx y regenera energía al recibir curación."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Nobleza Obligada (4 piezas)",
        "type": "BiS Soporte",
        "bonus": "+20% ATQ acumulable al activar su Definitiva."
      },
      {
        "set": "2p Vida+20% + 2p Vida+20%",
        "type": "Fácil 40k HP",
        "bonus": "+40% Vida Máxima para asegurar el bono máximo de la pasiva A4."
      }
    ],
    "mainStats": {
      "sands": "Vida% o Recarga ER%",
      "goblet": "Vida%",
      "circlet": "Vida% o Bono de Curación%"
    },
    "substatsPriority": [
      "1. Vida% y Vida Plana (Meta estricto: 40,000 HP)",
      "2. Recarga de Energía% (140% - 160%)",
      "3. Prob. Crítica (con Favonius)"
    ],
    "talentPriority": "Habilidad Elemental (E) >>> Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "40,000 HP (Exacto o más)",
      "atk": "1,100",
      "def": "700",
      "em": "0",
      "er": "150% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "Arlecchino Overload",
        "comp": "Arlecchino • Chevreuse • Fischl • Bennett",
        "members": [
          "Arlecchino",
          "Chevreuse",
          "Fischl",
          "Bennett"
        ]
      },
      {
        "name": "Raiden Overload",
        "comp": "Raiden Shogun • Chevreuse • Sara • Bennett",
        "members": [
          "Raiden Shogun",
          "Chevreuse",
          "Sara",
          "Bennett"
        ]
      },
      {
        "name": "Clorinde Overload",
        "comp": "Clorinde • Chevreuse • Fischl • Thoma",
        "members": [
          "Clorinde",
          "Chevreuse",
          "Fischl",
          "Thoma"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "40,000 HP (Exacto o más)",
      "atk": "1,100",
      "def": "700",
      "em": "0",
      "er": "150% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 11956,
      "atk90": 193,
      "def90": 605,
      "ascStat": "Vida%",
      "ascVal": "24.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Línea de Fuego Frontal",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          53.2,
          59.1,
          65,
          70.9,
          76.8,
          82.8,
          88.7,
          94.6,
          100.5,
          106.4,
          112.8,
          119.2,
          125.6
        ]
      },
      "skill": {
        "name": "Disparo E (Curación continua por tick)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          2.7,
          2.9,
          3.1,
          3.4,
          3.6,
          3.8,
          4.1,
          4.3,
          4.6,
          4.8,
          5.1,
          5.4,
          5.7
        ]
      },
      "burst": {
        "name": "Granada de Detonación Q",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          223,
          247.8,
          272.6,
          297.3,
          322.1,
          346.9,
          371.7,
          396.4,
          421.2,
          446,
          472.8,
          499.5,
          526.3
        ]
      }
    },
    "statPriority": {
      "sands": "Vida% o Recarga ER%",
      "goblet": "Vida%",
      "circlet": "Vida% o Bono de Curación%",
      "substats": "1. Vida% y Vida Plana (Meta estricto: 40,000 HP) > 2. Recarga de Energía% (140% - 160%) > 3. Prob. Crítica (con Favonius)"
    }
  },
  {
    "id": "chiori",
    "name": {
      "es": "Chiori",
      "en": "Chiori"
    },
    "element": "Geo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Chiori.png",
    "tier": "T0.5 Sub-DPS Geo",
    "role": "Sub-DPS Geo Off-Field (Muñecas Sode Sincronizadas)",
    "roleCategory": "sub_dps",
    "scalingType": "DEF_ATK",
    "scalingLabel": "Escalado Dual: DEF% (Mayor peso) + ATQ%",
    "bestWeapons": [
      {
        "name": "Urakusugiri",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+88.2% Daño Crítico, +DEF% y +48% Daño de Habilidad Elemental al hacer daño Geo."
      },
      {
        "name": "Huso de Cinabrio (Cinnabar Spindle)",
        "rarity": 4,
        "type": "BiS 4★ Evento",
        "note": "Aumenta el daño de Habilidad Elemental según su DEF."
      },
      {
        "name": "Colmillo Lupino (Wolf-Fang)",
        "rarity": 4,
        "type": "Pase de Batalla",
        "note": "+Prob. Crítica y daño en Habilidad Elemental."
      },
      {
        "name": "Flauta de Ezpitzal / Espada del Alba",
        "rarity": 3,
        "type": "F2P",
        "note": "Espada del Alba 3★ da +28% CR y +46.9% CD si se mantiene >90% HP."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Compañía Dorada (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+70% Daño de Habilidad Elemental permanente para las muñecas Sode."
      },
      {
        "set": "Cáscara de Sueños Opulentos (4 piezas)",
        "type": "Alternativa Equilibrada",
        "bonus": "+54% DEF y +24% Bono Daño Geo."
      }
    ],
    "mainStats": {
      "sands": "DEF%",
      "goblet": "Bono Daño Geo%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. DEF%",
      "3. ATQ%",
      "4. Recarga de Energía (110% - 120%)"
    ],
    "talentPriority": "Habilidad Elemental (E) >>> Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "16,000",
      "atk": "1,300",
      "def": "2,200 – 2,600+ DEF",
      "em": "0",
      "er": "110% – 120% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "metaTeams": [
      {
        "name": "Navia + Chiori Geo Core",
        "comp": "Navia • Chiori • Furina • Bennett",
        "members": [
          "Navia",
          "Chiori",
          "Furina",
          "Bennett"
        ]
      },
      {
        "name": "Itto Mono Geo",
        "comp": "Arataki Itto • Gorou • Chiori • Zhongli",
        "members": [
          "Arataki Itto",
          "Gorou",
          "Chiori",
          "Zhongli"
        ]
      },
      {
        "name": "Noelle Hypercarry",
        "comp": "Noelle • Furina • Chiori • Gorou",
        "members": [
          "Noelle",
          "Furina",
          "Chiori",
          "Gorou"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "1,300",
      "def": "2,200 – 2,600+ DEF",
      "em": "0",
      "er": "110% – 120% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "baseStats": {
      "hp90": 11438,
      "atk90": 323,
      "def90": 953,
      "ascStat": "Prob. Crítica",
      "ascVal": "19.2%"
    },
    "talentsData": {
      "normal": {
        "name": "Tejedora de Espadas",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          54.1,
          60.1,
          66.1,
          72.1,
          78.1,
          84.2,
          90.2,
          96.2,
          102.2,
          108.2,
          114.7,
          121.2,
          127.7
        ]
      },
      "skill": {
        "name": "Caricia de Mangas E: Daño Muñeca Sode",
        "scaleStat": "DEF",
        "unit": "% DEF + % ATQ",
        "mvByLevel": [
          148,
          161.1,
          174.2,
          187.3,
          200.4,
          213.6,
          226.7,
          239.8,
          252.9,
          266,
          282,
          297.9,
          313.9
        ]
      },
      "burst": {
        "name": "Kiyoku: Doble Filo Q",
        "scaleStat": "DEF",
        "unit": "% DEF + % ATQ",
        "mvByLevel": [
          446,
          485.6,
          525.1,
          564.7,
          604.2,
          643.8,
          683.3,
          722.9,
          762.4,
          802,
          850.1,
          898.2,
          946.4
        ]
      }
    },
    "statPriority": {
      "sands": "DEF%",
      "goblet": "Bono Daño Geo%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. DEF% > 3. ATQ% > 4. Recarga de Energía (110% - 120%)"
    }
  },
  {
    "id": "citlali",
    "name": {
      "es": "Citlali",
      "en": "Citlali"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Citlali.png",
    "tier": "T0 Escudo & Buffer Melt",
    "role": "Escudera Cryo Noctámbula, Reductora de Resistencias & Buffer de Derretido",
    "roleCategory": "healer_shielder",
    "scalingType": "EM_ATK",
    "scalingLabel": "Escalado por Maestría Elemental (Escudo y Bonos escalan con EM)",
    "bestWeapons": [
      {
        "name": "Starcaller's Watch",
        "rarity": 5,
        "type": "BiS Firma 5★",
        "note": "Firma oficial de Citlali con bono Cryo y buff."
      },
      {
        "name": "Sinfonía de los Merodeadores (The Widsith)",
        "rarity": 4,
        "type": "Opción Crítico",
        "note": "+Daño Crítico y buff aleatorio."
      },
      {
        "name": "Cuentos de Cazadores de Dragones (TTDS)",
        "rarity": 3,
        "type": "BiS Buffer F2P",
        "note": "+48% ATQ al carry principal."
      },
      {
        "name": "Memorias de Sacrificio",
        "rarity": 4,
        "type": "Utilidad EM",
        "note": "Reset de escudo/habilidad y alta EM."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Pergamino del Héroe de la Ciudad de las Cenizas (4p)",
        "type": "BiS Indiscutible",
        "bonus": "+40% Daño Elemental a los elementos que reaccionan con Noctámbulo."
      },
      {
        "set": "Instructor (4 piezas)",
        "type": "Alternativa EM",
        "bonus": "+120 Maestría Elemental para todo el equipo tras causar una reacción."
      }
    ],
    "mainStats": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental (o Prob. CR con Favonius)"
    },
    "substatsPriority": [
      "1. Maestría Elemental (Meta: 800 – 1,000 EM)",
      "2. Recarga de Energía% (150% - 170% ER)",
      "3. Prob. Crítica (para Favonius)"
    ],
    "talentPriority": "Habilidad Elemental (E - Escudo) >>> Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "17,000",
      "atk": "1,200",
      "def": "750",
      "em": "850 – 1,000 EM",
      "er": "160% – 180% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "Mavuika Melt Core",
        "comp": "Mavuika • Citlali • Bennett • Xilonen",
        "members": [
          "Mavuika",
          "Citlali",
          "Bennett",
          "Xilonen"
        ]
      },
      {
        "name": "Arlecchino Melt",
        "comp": "Arlecchino • Citlali • Bennett • Kazuha",
        "members": [
          "Arlecchino",
          "Citlali",
          "Bennett",
          "Kazuha"
        ]
      },
      {
        "name": "Gaming Melt",
        "comp": "Gaming • Xianyun • Citlali • Bennett",
        "members": [
          "Gaming",
          "Xianyun",
          "Citlali",
          "Bennett"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "17,000",
      "atk": "1,200",
      "def": "750",
      "em": "850 – 1,000 EM",
      "er": "160% – 180% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 11200,
      "atk90": 260,
      "def90": 680,
      "ascStat": "Maestría Elemental",
      "ascVal": "115.2"
    },
    "talentsData": {
      "normal": {
        "name": "Orbe Estelar",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          42,
          46.7,
          51.3,
          56,
          60.7,
          65.3,
          70,
          74.7,
          79.3,
          84,
          89,
          94.1,
          99.1
        ]
      },
      "skill": {
        "name": "Llamada de Itzpapa E: Absorción de Escudo",
        "scaleStat": "EM",
        "unit": "% EM Escudo",
        "mvByLevel": [
          250,
          272.2,
          294.4,
          316.7,
          338.9,
          361.1,
          383.3,
          405.6,
          427.8,
          450,
          477,
          504,
          531
        ]
      },
      "burst": {
        "name": "Lluvia de Obsidiana Q",
        "scaleStat": "EM",
        "unit": "% EM Daño",
        "mvByLevel": [
          180,
          200,
          220,
          240,
          260,
          280,
          300,
          320,
          340,
          360,
          381.6,
          403.2,
          424.8
        ]
      }
    },
    "statPriority": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental (o Prob. CR con Favonius)",
      "substats": "1. Maestría Elemental (Meta: 800 – 1,000 EM) > 2. Recarga de Energía% (150% - 170% ER) > 3. Prob. Crítica (para Favonius)"
    }
  },
  {
    "id": "clorinde",
    "name": {
      "es": "Clorinde",
      "en": "Clorinde"
    },
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Clorinde.png",
    "tier": "T0 Rapid-Fire Hypercarry",
    "role": "Hypercarry Electro en Campo (Disparos de Pistola y Estocadas de Espada)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Mecánica de Pacto Perpetuo (Bond of Life)",
    "bestWeapons": [
      {
        "name": "Absolución (Absolution)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+44.1% Daño Crítico, +20% ATQ y hasta +48% Daño con fluctuaciones de Pacto Perpetuo."
      },
      {
        "name": "Reflejo de las Tinieblas / Cortador de Jade",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Stat-sticks excepcionales de Crítico."
      },
      {
        "name": "Espada Negra (The Black Sword)",
        "rarity": 4,
        "type": "Mejor 4★ Pase",
        "note": "+Prob. Crítica y aumento directo a sus disparos y estocadas normales."
      },
      {
        "name": "Vado del Río Ceniciento / Espada de Madera",
        "rarity": 4,
        "type": "F2P",
        "note": "Opciones F2P funcionales."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Fragmento de la Armonía Fantasmal (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+54% Daño constante al aumentar o consumir Pacto Perpetuo en cada disparo."
      },
      {
        "set": "Furia del Trueno (4 piezas)",
        "type": "Alternativa Aggravate",
        "bonus": "+15% Bono Electro y reduce el enfriamiento de su habilidad E para rotaciones continuas."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Electro%",
      "circlet": "Daño Crítico% (o Prob. CR)"
    },
    "substatsPriority": [
      "1. Daño Crítico / Prob. Crítica (tope 80% con pasiva de ascensión)",
      "2. ATQ%",
      "3. Maestría Elemental (80 – 160 EM en Aggravate)",
      "4. Recarga de Energía%"
    ],
    "talentPriority": "Habilidad Elemental (E) >>> Definitiva (Q) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "18,000",
      "atk": "2,000 – 2,300 ATQ",
      "def": "800",
      "em": "80 – 150 EM",
      "er": "115% – 125% ER",
      "crit": "75%+ CR / 190%+ CD"
    },
    "metaTeams": [
      {
        "name": "Clorinde Aggravate",
        "comp": "Clorinde • Nahida • Fischl • Zhongli",
        "members": [
          "Clorinde",
          "Nahida",
          "Fischl",
          "Zhongli"
        ]
      },
      {
        "name": "Clorinde Overload con Chevreuse",
        "comp": "Clorinde • Chevreuse • Fischl • Thoma",
        "members": [
          "Clorinde",
          "Chevreuse",
          "Fischl",
          "Thoma"
        ]
      },
      {
        "name": "Clorinde Quickbloom",
        "comp": "Clorinde • Furina • Nahida • Baizhu",
        "members": [
          "Clorinde",
          "Furina",
          "Nahida",
          "Baizhu"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "2,000 – 2,300 ATQ",
      "def": "800",
      "em": "80 – 150 EM",
      "er": "115% – 125% ER",
      "crit": "75%+ CR / 190%+ CD"
    },
    "baseStats": {
      "hp90": 12956,
      "atk90": 337,
      "def90": 784,
      "ascStat": "Prob. Crítica",
      "ascVal": "19.2%"
    },
    "talentsData": {
      "normal": {
        "name": "Esgrima de la Justa",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          52.5,
          58.3,
          64.2,
          70,
          75.8,
          81.7,
          87.5,
          93.3,
          99.2,
          105,
          111.3,
          117.6,
          123.9
        ]
      },
      "skill": {
        "name": "Disparo Caza de Sombras E (Por Disparo)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          37.4,
          40.7,
          44,
          47.4,
          50.7,
          54,
          57.3,
          60.7,
          64,
          67.3,
          71.3,
          75.4,
          79.4
        ]
      },
      "burst": {
        "name": "Luz Resplandeciente Q (5 Golpes de Nuke)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          136,
          148.1,
          160.2,
          172.3,
          184.4,
          196.4,
          208.5,
          220.6,
          232.7,
          244.8,
          259.5,
          274.2,
          288.9
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Electro%",
      "circlet": "Daño Crítico% (o Prob. CR)",
      "substats": "1. Daño Crítico / Prob. Crítica (tope 80% con pasiva de ascensión) > 2. ATQ% > 3. Maestría Elemental (80 – 160 EM en Aggravate) > 4. Recarga de Energía%"
    }
  },
  {
    "id": "diluc",
    "name": {
      "es": "Diluc",
      "en": "Diluc"
    },
    "element": "Pyro",
    "rarity": 5,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Diluc.png",
    "tier": "T1 Plunge / Classic DPS",
    "role": "Carry Pyro Tradicional & Plunge Hypercarry con Xianyun",
    "roleCategory": "main_dps",
    "scalingType": "ATK_EM",
    "scalingLabel": "Escalado por ATQ% y Maestría Elemental (Multiplicador de Plunge altísimo)",
    "bestWeapons": [
      {
        "name": "Lápida del Lobo (Wolf's Gravestone)",
        "rarity": 5,
        "type": "BiS 5★ Icónico",
        "note": "+ATQ% masivo para él y todo el equipo."
      },
      {
        "name": "Médula de la Serpiente Marina",
        "rarity": 4,
        "type": "Mejor 4★ Pase",
        "note": "+Prob. Crítica y hasta +50% daño directo."
      },
      {
        "name": "Prototipo Arcaico / Floresbor",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "Opciones accesibles de forja y evento con buen ATQ y EM."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Bruja Carmesí en Llamas (4 piezas)",
        "type": "BiS Clásico",
        "bonus": "+15% Bono Pyro y +15% Daño en Vaporizados continuos."
      },
      {
        "set": "Cazador Fantasmal (4 piezas)",
        "type": "BiS con Furina",
        "bonus": "+36% Prob. Crítica si se juega junto a Furina."
      }
    ],
    "mainStats": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. Maestría Elemental (120 – 180 EM)",
      "3. ATQ%",
      "4. Recarga de Energía%"
    ],
    "talentPriority": "Habilidad Elemental (E) = Ataque Normal > Definitiva (Q)",
    "benchmarks": {
      "hp": "18,000",
      "atk": "2,000 – 2,400 ATQ",
      "def": "800",
      "em": "120 – 180 EM",
      "er": "115% – 125% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "metaTeams": [
      {
        "name": "Diluc Plunge Vape",
        "comp": "Diluc • Xianyun • Furina • Bennett",
        "members": [
          "Diluc",
          "Xianyun",
          "Furina",
          "Bennett"
        ]
      },
      {
        "name": "Diluc Vape Clásico",
        "comp": "Diluc • Xingqiu • Yelan • Bennett",
        "members": [
          "Diluc",
          "Xingqiu",
          "Yelan",
          "Bennett"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "2,000 – 2,400 ATQ",
      "def": "800",
      "em": "120 – 180 EM",
      "er": "115% – 125% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "baseStats": {
      "hp90": 12981,
      "atk90": 335,
      "def90": 784,
      "ascStat": "Prob. Crítica",
      "ascVal": "19.2%"
    },
    "talentsData": {
      "normal": {
        "name": "Espada Templada",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          89.7,
          99.7,
          109.6,
          119.6,
          129.6,
          139.5,
          149.5,
          159.5,
          169.4,
          179.4,
          190.2,
          200.9,
          211.7
        ]
      },
      "skill": {
        "name": "Filo Ardiente E (Combo 3 Golpes)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          94.4,
          104.9,
          115.4,
          125.9,
          136.4,
          146.8,
          157.3,
          167.8,
          178.3,
          188.8,
          200.1,
          211.5,
          222.8
        ]
      },
      "burst": {
        "name": "Amanecer Q (Fénix de Fuego Nuke)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          204,
          222.1,
          240.3,
          258.4,
          276.5,
          294.7,
          312.8,
          330.9,
          349.1,
          367.2,
          389.2,
          411.3,
          433.3
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. Maestría Elemental (120 – 180 EM) > 3. ATQ% > 4. Recarga de Energía%"
    }
  },
  {
    "id": "eula",
    "name": {
      "es": "Eula",
      "en": "Eula"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Eula.png",
    "tier": "T1 Physical Nuke",
    "role": "Hypercarry de Daño Físico Brutal (Espada de Fulgor Luminoso Millonaria)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Daño Físico (Acumula hasta 30 cargas con ataques normales)",
    "bestWeapons": [
      {
        "name": "Oda de los Pinos (Song of Broken Pines)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "741 ATQ Base descomunal, +Daño Físico, +ATQ% y +12% Velocidad de Ataque para sacar más cargas en Q."
      },
      {
        "name": "Lápida del Lobo / Espadón Cornirrojo",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Stat-sticks de ATQ y Daño Crítico."
      },
      {
        "name": "Médula de la Serpiente Marina",
        "rarity": 4,
        "type": "Mejor 4★ Pase",
        "note": "+Prob. Crítica y aumento universal de daño."
      },
      {
        "name": "Argento Estelar de las Nieves / Prototipo Arcaico",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "Forja accesible con Bono de Daño Físico."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Llamas Albinas (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+50% Daño Físico y +18% ATQ permanente con 2 cargas de su habilidad E."
      },
      {
        "set": "2p Llamas Albinas + 2p Caballería Sanguinaria",
        "type": "Alternativa 2p+2p",
        "bonus": "+50% Bono de Daño Físico incondicional."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Físico%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ%",
      "3. Recarga de Energía% (130% – 145% ER)",
      "4. DEF%"
    ],
    "talentPriority": "Definitiva (Q - Espada de Fulgor) >>> Ataque Normal = Habilidad Elemental (E)",
    "benchmarks": {
      "hp": "19,000",
      "atk": "2,200 – 2,600 ATQ",
      "def": "800",
      "em": "0",
      "er": "130% – 145% ER",
      "crit": "70%+ CR / 160%+ CD"
    },
    "metaTeams": [
      {
        "name": "Eula Superconduct Premium",
        "comp": "Eula • Raiden Shogun • Rosaria • Bennett",
        "members": [
          "Eula",
          "Raiden Shogun",
          "Rosaria",
          "Bennett"
        ]
      },
      {
        "name": "Eula-Furina Core",
        "comp": "Eula • Furina • Raiden Shogun • Mika",
        "members": [
          "Eula",
          "Furina",
          "Raiden Shogun",
          "Mika"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "19,000",
      "atk": "2,200 – 2,600 ATQ",
      "def": "800",
      "em": "0",
      "er": "130% – 145% ER",
      "crit": "70%+ CR / 160%+ CD"
    },
    "baseStats": {
      "hp90": 13226,
      "atk90": 342,
      "def90": 751,
      "ascStat": "Daño Crítico",
      "ascVal": "38.4%"
    },
    "talentsData": {
      "normal": {
        "name": "Esgrima Favonius: Nobleza",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          89.7,
          99.7,
          109.6,
          119.6,
          129.6,
          139.5,
          149.5,
          159.5,
          169.4,
          179.4,
          190.2,
          200.9,
          211.7
        ]
      },
      "skill": {
        "name": "Vórtice Frío E (Mantener - Marca de Hielo)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          245,
          266.8,
          288.6,
          310.3,
          332.1,
          353.9,
          375.7,
          397.4,
          419.2,
          441,
          467.5,
          493.9,
          520.4
        ]
      },
      "burst": {
        "name": "Espada de Fulgor Luminoso Q (Daño Base + Por Cada Carga)",
        "scaleStat": "ATK",
        "unit": "% ATQ Físico",
        "mvByLevel": [
          442,
          473.4,
          504.9,
          536.3,
          567.8,
          599.2,
          630.7,
          662.1,
          693.6,
          725,
          768.5,
          812,
          855.5
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Físico%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% > 3. Recarga de Energía% (130% – 145% ER) > 4. DEF%"
    }
  },
  {
    "id": "faruzan",
    "name": {
      "es": "Faruzan",
      "en": "Faruzan"
    },
    "element": "Anemo",
    "rarity": 4,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Faruzan.png",
    "tier": "T0 Buffer Anemo",
    "role": "Buffer de Daño Anemo (+Daño Crítico Anemo en C6, -30% RES Anemo)",
    "roleCategory": "support",
    "scalingType": "ATK_ER",
    "scalingLabel": "Buff A4 escala según su ATQ Base • Requiere alta ER en C0-C5 (250%+)",
    "bestWeapons": [
      {
        "name": "Elegía del Fin (Elegy for the End)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "Batería y buff al equipo."
      },
      {
        "name": "Arco de Favonius (Favonius Warbow)",
        "rarity": 4,
        "type": "BiS F2P",
        "note": "Indispensable antes de C6."
      },
      {
        "name": "Arco del Sacrificio (Sacrificial Bow)",
        "rarity": 4,
        "type": "Opción ER",
        "note": "Doble uso de E para partículas."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Tenacidad de la Geoarmada (4 piezas)",
        "type": "BiS en C6",
        "bonus": "En C6 sus flechas de derrumbe activan Tenacidad de forma constante (+20% ATQ)."
      },
      {
        "set": "Emblema del Destino (2p) + Recarga (2p)",
        "type": "BiS en C0-C5",
        "bonus": "Prioriza alcanzar los 250%+ de Recarga de Energía antes de C6."
      }
    ],
    "mainStats": {
      "sands": "Recarga de Energía%",
      "goblet": "Bono Daño Anemo% o ATQ%",
      "circlet": "Prob. Crítica% (para Favonius) o Daño Crítico"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (250%+ en C0-C5 / 200%+ en C6)",
      "2. Prob. Crítica (para Favonius)",
      "3. ATQ% y Crítico"
    ],
    "talentPriority": "Definitiva (Q) >>> Habilidad Elemental (E) >>> Ataques Normales",
    "benchmarks": {
      "hp": "16,000",
      "atk": "1,400",
      "def": "700",
      "em": "0",
      "er": "230% – 270% ER",
      "crit": "50%+ CR"
    },
    "metaTeams": [
      {
        "name": "Xiao Hypercarry (FFXX)",
        "comp": "Xiao • Faruzan • Xianyun • Furina",
        "members": [
          "Xiao",
          "Faruzan",
          "Xianyun",
          "Furina"
        ]
      },
      {
        "name": "Wanderer Hypercarry",
        "comp": "Wanderer • Faruzan • Bennett • Zhongli",
        "members": [
          "Wanderer",
          "Faruzan",
          "Bennett",
          "Zhongli"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "1,400",
      "def": "700",
      "em": "0",
      "er": "230% – 270% ER",
      "crit": "50%+ CR"
    },
    "baseStats": {
      "hp90": 9570,
      "atk90": 196,
      "def90": 628,
      "ascStat": "ATQ%",
      "ascVal": "24.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Disparo Parto",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          44.8,
          49.8,
          54.8,
          59.7,
          64.7,
          69.7,
          74.7,
          79.6,
          84.6,
          89.6,
          95,
          100.4,
          105.7
        ]
      },
      "skill": {
        "name": "Maniobra Aerodinámica E",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          149,
          162.2,
          175.4,
          188.7,
          201.9,
          215.1,
          228.3,
          241.6,
          254.8,
          268,
          284.1,
          300.2,
          316.2
        ]
      },
      "burst": {
        "name": "Dodecaedro Polifacético Q: Reducción RES Anemo (-30%)",
        "scaleStat": "ATK",
        "unit": "% RES Shred",
        "mvByLevel": [
          377,
          410.4,
          443.9,
          477.3,
          510.8,
          544.2,
          577.7,
          611.1,
          644.6,
          678,
          718.7,
          759.4,
          800
        ]
      }
    },
    "statPriority": {
      "sands": "Recarga de Energía%",
      "goblet": "Bono Daño Anemo% o ATQ%",
      "circlet": "Prob. Crítica% (para Favonius) o Daño Crítico",
      "substats": "1. Recarga de Energía% (250%+ en C0-C5 / 200%+ en C6) > 2. Prob. Crítica (para Favonius) > 3. ATQ% y Crítico"
    }
  },
  {
    "id": "fischl",
    "name": {
      "es": "Fischl",
      "en": "Fischl"
    },
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Fischl.png",
    "tier": "T0 Sub-DPS Off-Field",
    "role": "Reina del Sub-DPS Electro (Oz Incesante, Batería & Pasiva A4 en Aggravate)",
    "roleCategory": "sub_dps",
    "scalingType": "ATK_EM",
    "scalingLabel": "Escalado por ATQ% y Maestría Elemental (La pasiva A4 no tiene ICD)",
    "bestWeapons": [
      {
        "name": "Estrella Polar / Aqua Simulacra",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "Stat-sticks de Crítico y aumentos directos de daño elemental para Oz."
      },
      {
        "name": "Último Acorde (The Stringless R5)",
        "rarity": 4,
        "type": "BiS 4★ Indiscutible",
        "note": "+165 Maestría Elemental y +48% Daño constante en Oz con su Habilidad Elemental."
      },
      {
        "name": "Cazador del Callejón / Vals de la Noche",
        "rarity": 4,
        "type": "Opciones 4★",
        "note": "Aumentan el daño mientras está fuera de campo."
      },
      {
        "name": "Prototipo Luz de Luna",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "Forja accesible con buen ATQ%."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Compañía Dorada (4 piezas)",
        "type": "BiS Absoluto",
        "bonus": "+70% Daño de Habilidad Elemental continuo para Oz desde fuera de campo."
      },
      {
        "set": "Furia del Trueno (2p) + ATQ+18% (2p)",
        "type": "Alternativa 2p+2p",
        "bonus": "Opción transitoria con buenos substats de crítico."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ%",
      "3. Maestría Elemental (80 – 160 EM en Aggravate)",
      "4. Recarga de Energía (115% – 125% ER)"
    ],
    "talentPriority": "Habilidad Elemental (E - Oz) >>> Definitiva (Q) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "16,000",
      "atk": "1,900 – 2,300 ATQ",
      "def": "700",
      "em": "100 – 160 EM",
      "er": "115% – 125% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "metaTeams": [
      {
        "name": "Aggravate Machine",
        "comp": "Alhaitham • Keqing • Fischl • Nahida",
        "members": [
          "Alhaitham",
          "Keqing",
          "Fischl",
          "Nahida"
        ]
      },
      {
        "name": "Arlecchino Overload",
        "comp": "Arlecchino • Chevreuse • Fischl • Bennett",
        "members": [
          "Arlecchino",
          "Chevreuse",
          "Fischl",
          "Bennett"
        ]
      },
      {
        "name": "Taser Clásico",
        "comp": "Sucrose • Xingqiu • Beidou • Fischl",
        "members": [
          "Sucrose",
          "Xingqiu",
          "Beidou",
          "Fischl"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "1,900 – 2,300 ATQ",
      "def": "700",
      "em": "100 – 160 EM",
      "er": "115% – 125% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "baseStats": {
      "hp90": 9189,
      "atk90": 244,
      "def90": 594,
      "ascStat": "ATQ%",
      "ascVal": "24.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Flecha Culminante",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          44.1,
          49,
          53.9,
          58.8,
          63.7,
          68.6,
          73.5,
          78.4,
          83.3,
          88.2,
          93.5,
          98.8,
          104.1
        ]
      },
      "skill": {
        "name": "Alas de Vigilancia E: Daño de Ataque de Oz",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          88.8,
          96.7,
          104.6,
          112.5,
          120.4,
          128.2,
          136.1,
          144,
          151.9,
          159.8,
          169.4,
          179,
          188.6
        ]
      },
      "burst": {
        "name": "Ilusión Nocturna Q (Daño de Nube de Rayos)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          208,
          226.4,
          244.9,
          263.3,
          281.8,
          300.2,
          318.7,
          337.1,
          355.6,
          374,
          396.4,
          418.9,
          441.3
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% > 3. Maestría Elemental (80 – 160 EM en Aggravate) > 4. Recarga de Energía (115% – 125% ER)"
    }
  },
  {
    "id": "furina",
    "name": {
      "es": "Furina",
      "en": "Furina"
    },
    "element": "Hydro",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Furina.png",
    "tier": "T0 Meta Universal",
    "role": "Off-Field Sub-DPS & Buffer Universal (Fanfarria)",
    "roleCategory": "sub_dps",
    "scalingType": "HP",
    "scalingLabel": "Escalado 100% Vida Máxima (HP%) — El ATQ es inútil",
    "bestWeapons": [
      {
        "name": "Fulgor de las Aguas Calmas",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "Mayor daño personal (+Críticos y Vida). Requiere reloj ER%."
      },
      {
        "name": "Deseo Ponzoñoso",
        "rarity": 4,
        "type": "Mejor 4★",
        "note": "Batería ideal (+ER%) con +32% Daño y +12% CR en Habilidad Elemental."
      },
      {
        "name": "Vado del Río Ceniciento",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "Gratis pescando en Fontaine (+Recarga de Energía y +Prob. CRIT en E)."
      },
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "Utilidad",
        "note": "Batería para todo el equipo en rotaciones de alta demanda de recarga."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Compañía Dorada (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+70% Daño de Habilidad Elemental Off-Field continuo."
      },
      {
        "set": "Tenacidad de la Geoarmada (4 piezas)",
        "type": "Soporte Carry",
        "bonus": "+20% ATQ continuo para el Hypercarry del equipo."
      },
      {
        "set": "2p Compañía Dorada + 2p Vida+20%",
        "type": "Alternativa 2p+2p",
        "bonus": "Excelente consistencia si faltan piezas con buenos substats."
      }
    ],
    "mainStats": {
      "sands": "Vida% (con arma ER) o Recarga ER% (con arma de daño)",
      "goblet": "Bono Daño Hydro% o Vida%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (hasta 160% - 200%)",
      "2. Prob. Crítica / Daño Crítico (Ratio 1:2)",
      "3. Vida% (hasta 40,000 HP)",
      "❌ ATQ y DEF son estadísticas muertas"
    ],
    "talentPriority": "Habilidad Elemental (E) > Definitiva (Q) >>> Ataques Básicos",
    "benchmarks": {
      "hp": "36,000 – 40,000 HP",
      "atk": "Ignorar (Base baja)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0 – 80 EM",
      "er": "160% – 200% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "metaTeams": [
      {
        "name": "Neuvillette Hypercarry",
        "comp": "Neuvillette • Furina • Kazuha • Xilonen",
        "members": [
          "Neuvillette",
          "Furina",
          "Kazuha",
          "Xilonen"
        ]
      },
      {
        "name": "Arlecchino Vape",
        "comp": "Arlecchino • Furina • Yelan • Bennett",
        "members": [
          "Arlecchino",
          "Furina",
          "Yelan",
          "Bennett"
        ]
      },
      {
        "name": "Alhaitham Quickbloom",
        "comp": "Alhaitham • Furina • Nahida • Kuki Shinobu",
        "members": [
          "Alhaitham",
          "Furina",
          "Nahida",
          "Kuki Shinobu"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "36,000 – 40,000 HP",
      "atk": "Ignorar (Base baja)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0 – 80 EM",
      "er": "160% – 200% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "baseStats": {
      "hp90": 15307,
      "atk90": 244,
      "def90": 696,
      "ascStat": "Prob. Crítica",
      "ascVal": "19.2%"
    },
    "talentsData": {
      "normal": {
        "name": "Solo de la Solista (Ataque Normal)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          48.4,
          53.6,
          58.9,
          64.1,
          69.4,
          74.6,
          79.9,
          85.1,
          90.4,
          95.6,
          101.3,
          107.1,
          112.8
        ]
      },
      "skill": {
        "name": "Salón Solitario: Mademoiselle Crabaletta (E)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          8.3,
          9,
          9.8,
          10.5,
          11.2,
          12,
          12.7,
          13.4,
          14.2,
          14.9,
          15.8,
          16.7,
          17.6
        ]
      },
      "burst": {
        "name": "¡Que el Mundo Entero Festeje! (Daño Q + Fanfarria)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          11.4,
          12.4,
          13.4,
          14.5,
          15.5,
          16.5,
          17.5,
          18.5,
          19.5,
          20.5,
          21.7,
          23,
          24.2
        ]
      }
    },
    "statPriority": {
      "sands": "Vida% (con arma ER) o Recarga ER% (con arma de daño)",
      "goblet": "Bono Daño Hydro% o Vida%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Recarga de Energía% (hasta 160% - 200%) > 2. Prob. Crítica / Daño Crítico (Ratio 1:2) > 3. Vida% (hasta 40,000 HP) > ❌ ATQ y DEF son estadísticas muertas"
    }
  },
  {
    "id": "gaming",
    "name": {
      "es": "Gaming",
      "en": "Gaming"
    },
    "element": "Pyro",
    "rarity": 4,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Gaming.png",
    "tier": "T0.5 Plunge Carry",
    "role": "Hypercarry Pyro de Ataques Descendentes (Danza Suanni)",
    "roleCategory": "main_dps",
    "scalingType": "ATK_EM",
    "scalingLabel": "Escalado por ATQ% y Multiplicador de Ataques Descendentes",
    "bestWeapons": [
      {
        "name": "Médula de la Serpiente Marina (Serpent Spine)",
        "rarity": 4,
        "type": "BiS 4★",
        "note": "+Prob. Crítica y hasta +50% daño directo en sus saltos descendentes."
      },
      {
        "name": "Lápida del Lobo / Emblema del Mar de Juncos",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Stat-sticks de ATQ y Crítico."
      },
      {
        "name": "Floresbor / Sombra de la Marea",
        "rarity": 4,
        "type": "Mejores F2P",
        "note": "Floresbor otorga +ATQ% y +110 EM; Sombra de la Marea rinde excelente con healers."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Cazador Fantasmal (4 piezas)",
        "type": "BiS Absoluto",
        "bonus": "+36% Prob. Crítica gratuita al perder y recuperar vida con sus saltos E."
      },
      {
        "set": "Bruja Carmesí en Llamas (4 piezas)",
        "type": "Alternativa Vape",
        "bonus": "+15% Bono Pyro y +15% Daño en Vaporizados de salto descendente."
      }
    ],
    "mainStats": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Daño Crítico% (o Prob. CR)"
    },
    "substatsPriority": [
      "1. Daño Crítico / Prob. Crítica (tope 64% CR con Cazador)",
      "2. Maestría Elemental (120 – 200 EM)",
      "3. ATQ%",
      "4. Recarga (120% – 135% ER)"
    ],
    "talentPriority": "Habilidad Elemental (E) > Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "19,000",
      "atk": "1,900 – 2,200 ATQ",
      "def": "750",
      "em": "150 – 220 EM",
      "er": "125% – 140% ER",
      "crit": "60% CR / 180%+ CD"
    },
    "metaTeams": [
      {
        "name": "Gaming Plunge Vape",
        "comp": "Gaming • Xianyun • Furina • Bennett",
        "members": [
          "Gaming",
          "Xianyun",
          "Furina",
          "Bennett"
        ]
      },
      {
        "name": "Gaming Melt Nuke",
        "comp": "Gaming • Xianyun • Rosaria • Bennett",
        "members": [
          "Gaming",
          "Xianyun",
          "Rosaria",
          "Bennett"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "19,000",
      "atk": "1,900 – 2,200 ATQ",
      "def": "750",
      "em": "150 – 220 EM",
      "er": "125% – 140% ER",
      "crit": "60% CR / 180%+ CD"
    },
    "baseStats": {
      "hp90": 11419,
      "atk90": 302,
      "def90": 703,
      "ascStat": "ATQ%",
      "ascVal": "24.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Zarpas Estelares",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          81.2,
          90.2,
          99.2,
          108.3,
          117.3,
          126.3,
          135.3,
          144.4,
          153.4,
          162.4,
          172.1,
          181.9,
          191.6
        ]
      },
      "skill": {
        "name": "Salto Suanni: Ataque Descendente E",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          232,
          257.8,
          283.6,
          309.3,
          335.1,
          360.9,
          386.7,
          412.4,
          438.2,
          464,
          491.8,
          519.7,
          547.5
        ]
      },
      "burst": {
        "name": "Danza del León Dorado Q (Golpe Inicial + Reseteo Man Chai)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          370,
          403,
          436,
          469,
          502,
          535,
          568,
          601,
          634,
          667,
          707,
          747,
          787.1
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Daño Crítico% (o Prob. CR)",
      "substats": "1. Daño Crítico / Prob. Crítica (tope 64% CR con Cazador) > 2. Maestría Elemental (120 – 200 EM) > 3. ATQ% > 4. Recarga (120% – 135% ER)"
    }
  },
  {
    "id": "ganyu",
    "name": {
      "es": "Ganyu",
      "en": "Ganyu"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Ganyu.png",
    "tier": "T0.5 Charged Sniper DPS",
    "role": "Sniper Cryo en Campo (Flechas Flor de Escarcha en Área) & Sub-DPS Q",
    "roleCategory": "main_dps",
    "scalingType": "ATK_EM",
    "scalingLabel": "Escalado por ATQ% y Multiplicadores de Flechas Cargadas (A2 da +20% CR)",
    "bestWeapons": [
      {
        "name": "Arco de Amos",
        "rarity": 5,
        "type": "BiS 5★ Icónico",
        "note": "+49.6% ATQ y hasta +52% de daño en Flechas Cargadas según tiempo de vuelo."
      },
      {
        "name": "La Primera Gran Magia / Aqua Simulacra",
        "rarity": 5,
        "type": "BiS 5★ Crítico",
        "note": "+66.2% Daño Crítico y bono de daño cargado."
      },
      {
        "name": "Arco del Prototipo Crescendo (Prototype Crescent R5)",
        "rarity": 4,
        "type": "Mejor 4★ F2P",
        "note": "Forja accesible: +72% ATQ al acertar en punto débil."
      },
      {
        "name": "Masacrademonios (Hamayumi R5)",
        "rarity": 4,
        "type": "Mejor 4★ Melt",
        "note": "Forja de Inazuma: +48% Daño en Ataques Cargados con la energía al 100%."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Orquesta del Errante (4 piezas)",
        "type": "BiS Derretido (Melt)",
        "bonus": "+80 Maestría Elemental y +35% Daño permanente en Ataques Cargados."
      },
      {
        "set": "Nómada del Invierno (4 piezas)",
        "type": "BiS Congelación (Freeze)",
        "bonus": "+Hasta 40% Prob. Crítica contra enemigos congelados."
      }
    ],
    "mainStats": {
      "sands": "ATQ% (en Freeze) o Maestría Elemental (en Melt)",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Daño Crítico% (o Prob. CR)"
    },
    "substatsPriority": [
      "1. Daño Crítico / Prob. Crítica (1:2)",
      "2. ATQ%",
      "3. Maestría Elemental (150 – 250 EM en Melt)",
      "4. Recarga de Energía%"
    ],
    "talentPriority": "Ataque Normal (Flecha Flor de Escarcha) >>> Definitiva (Q) >>> Habilidad Elemental (E)",
    "benchmarks": {
      "hp": "16,000",
      "atk": "2,100 – 2,500 ATQ",
      "def": "700",
      "em": "180 – 250 EM (en Melt)",
      "er": "110% – 125% ER",
      "crit": "65%+ CR / 210%+ CD"
    },
    "metaTeams": [
      {
        "name": "Ganyu Melt Clásico",
        "comp": "Ganyu • Xiangling • Bennett • Zhongli",
        "members": [
          "Ganyu",
          "Xiangling",
          "Bennett",
          "Zhongli"
        ]
      },
      {
        "name": "Ganyu Burn-Melt con Nahida",
        "comp": "Ganyu • Nahida • Bennett • Dehya",
        "members": [
          "Ganyu",
          "Nahida",
          "Bennett",
          "Dehya"
        ]
      },
      {
        "name": "Morgana Freeze",
        "comp": "Ganyu • Mona • Venti • Diona",
        "members": [
          "Ganyu",
          "Mona",
          "Venti",
          "Diona"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "2,100 – 2,500 ATQ",
      "def": "700",
      "em": "180 – 250 EM (en Melt)",
      "er": "110% – 125% ER",
      "crit": "65%+ CR / 210%+ CD"
    },
    "baseStats": {
      "hp90": 9797,
      "atk90": 335,
      "def90": 630,
      "ascStat": "Daño Crítico",
      "ascVal": "38.4%"
    },
    "talentsData": {
      "normal": {
        "name": "Flecha Flor de Escarcha (Impacto + Explosión)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          230,
          247.9,
          265.8,
          283.7,
          301.6,
          319.4,
          337.3,
          355.2,
          373.1,
          391,
          414.5,
          437.9,
          461.4
        ]
      },
      "skill": {
        "name": "Loto de Kirin E (Señuelo)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          132,
          143.7,
          155.5,
          167.2,
          178.9,
          190.7,
          202.4,
          214.1,
          225.9,
          237.6,
          251.9,
          266.1,
          280.4
        ]
      },
      "burst": {
        "name": "Lluvia Celestial Q (Por Fragmento de Hielo)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          70,
          76.2,
          82.4,
          88.7,
          94.9,
          101.1,
          107.3,
          113.6,
          119.8,
          126,
          133.6,
          141.1,
          148.7
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ% (en Freeze) o Maestría Elemental (en Melt)",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Daño Crítico% (o Prob. CR)",
      "substats": "1. Daño Crítico / Prob. Crítica (1:2) > 2. ATQ% > 3. Maestría Elemental (150 – 250 EM en Melt) > 4. Recarga de Energía%"
    }
  },
  {
    "id": "gorou",
    "name": {
      "es": "Gorou",
      "en": "Gorou"
    },
    "element": "Geo",
    "rarity": 4,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Gorou.png",
    "tier": "T0.5 Buffer Mono Geo",
    "role": "Buffer Especializado de Defensa (DEF Plano + % Daño Crítico Geo en C6)",
    "roleCategory": "support",
    "scalingType": "DEF_ER",
    "scalingLabel": "Buff E escala por Nivel de Talento (DEF Plana fija) • No depende de sus stats",
    "bestWeapons": [
      {
        "name": "Arco de Favonius",
        "rarity": 4,
        "type": "BiS Absoluto",
        "note": "Genera partículas neutras para recargar las Definitivas de Itto y Noelle."
      },
      {
        "name": "Arco del Sacrificio",
        "rarity": 4,
        "type": "Alternativa",
        "note": "Recarga de energía y reseteo de E."
      },
      {
        "name": "Elegía del Fin (Elegy for the End)",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+Recarga y +100 EM / +20% ATQ para todo el equipo."
      },
      {
        "name": "Desvanecimiento del Crepúsculo",
        "rarity": 4,
        "type": "Opción Evento",
        "note": "+30.6% Recarga de Energía."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Exiliado (4 piezas)",
        "type": "BiS Batería Equipo",
        "bonus": "Restaura 2 puntos de energía a todo el equipo cada 2s tras usar su Definitiva."
      },
      {
        "set": "Cáscara de Sueños Opulentos (4 piezas)",
        "type": "Alternativa DEF",
        "bonus": "+54% DEF para aumentar su daño personal y curación en C4."
      }
    ],
    "mainStats": {
      "sands": "Recarga de Energía%",
      "goblet": "DEF%",
      "circlet": "Prob. Crítica% (para Favonius)"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (200% - 230% ER)",
      "2. Prob. Crítica (para Favonius)",
      "3. DEF%"
    ],
    "talentPriority": "Habilidad Elemental (E) >>> Definitiva (Q) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "15,000",
      "atk": "1,000",
      "def": "1,800+ DEF",
      "em": "0",
      "er": "210% – 240% ER",
      "crit": "55%+ CR"
    },
    "metaTeams": [
      {
        "name": "Itto Mono Geo",
        "comp": "Arataki Itto • Gorou • Chiori • Albedo",
        "members": [
          "Arataki Itto",
          "Gorou",
          "Chiori",
          "Albedo"
        ]
      },
      {
        "name": "Noelle Hypercarry",
        "comp": "Noelle • Gorou • Furina • Chiori",
        "members": [
          "Noelle",
          "Gorou",
          "Furina",
          "Chiori"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "15,000",
      "atk": "1,000",
      "def": "1,800+ DEF",
      "em": "0",
      "er": "210% – 240% ER",
      "crit": "55%+ CR"
    },
    "baseStats": {
      "hp90": 9570,
      "atk90": 183,
      "def90": 648,
      "ascStat": "Bono Geo",
      "ascVal": "24.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Flecha Dentada",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          37.8,
          42,
          46.2,
          50.4,
          54.6,
          58.8,
          63,
          67.2,
          71.4,
          75.6,
          80.1,
          84.7,
          89.2
        ]
      },
      "skill": {
        "name": "Defensa Integral Inuzaka E: Buff DEF Plana",
        "scaleStat": "DEF",
        "unit": "DEF Plana",
        "mvByLevel": [
          206,
          224.3,
          242.7,
          261,
          279.3,
          297.7,
          316,
          334.3,
          352.7,
          371,
          393.3,
          415.5,
          437.8
        ]
      },
      "burst": {
        "name": "Colmillos de la Victoria Q",
        "scaleStat": "DEF",
        "unit": "% DEF",
        "mvByLevel": [
          61,
          66.4,
          71.9,
          77.3,
          82.8,
          88.2,
          93.7,
          99.1,
          104.6,
          110,
          116.6,
          123.2,
          129.8
        ]
      }
    },
    "statPriority": {
      "sands": "Recarga de Energía%",
      "goblet": "DEF%",
      "circlet": "Prob. Crítica% (para Favonius)",
      "substats": "1. Recarga de Energía% (200% - 230% ER) > 2. Prob. Crítica (para Favonius) > 3. DEF%"
    }
  },
  {
    "id": "hu_tao",
    "name": {
      "es": "Hu Tao",
      "en": "Hu Tao"
    },
    "element": "Pyro",
    "rarity": 5,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Hutao.png",
    "tier": "T0 Vaporize Carry",
    "role": "Hypercarry Pyro en Campo (Ataques Cargados Vaporizados)",
    "roleCategory": "main_dps",
    "scalingType": "HP_EM",
    "scalingLabel": "Escalado por Vida Máx (Pasiva E convierte HP en ATQ masivo) + EM",
    "bestWeapons": [
      {
        "name": "Báculo de Homa",
        "rarity": 5,
        "type": "BiS Absoluto",
        "note": "+66.2% Daño Crítico, +20% Vida Máx y enorme bono de ATQ bajo el 50% HP."
      },
      {
        "name": "Balada de los Fiordos",
        "rarity": 4,
        "type": "Mejor 4★ Pase",
        "note": "+27.6% Prob. Crítica y +120 a 240 de Maestría Elemental en equipos tri-elementales."
      },
      {
        "name": "Perdición del Dragón (Dragon's Bane)",
        "rarity": 4,
        "type": "Mejor 4★ Gacha",
        "note": "+221 Maestría Elemental y +36% Daño continuo contra enemigos con Hydro/Pyro."
      },
      {
        "name": "Borla Blanca (White Tassel R5)",
        "rarity": 3,
        "type": "F2P",
        "note": "Stat-stick de Prob. Crítica gratuito."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Bruja Carmesí en Llamas (4 piezas)",
        "type": "BiS Reacciones",
        "bonus": "+15% Bono Pyro y +15% Daño en Vaporizados/Derretidos."
      },
      {
        "set": "Reminiscencia de la Purificación (4 piezas)",
        "type": "BiS Ataques Cargados",
        "bonus": "+50% Daño en normales/cargados a cambio de 15 puntos de energía."
      },
      {
        "set": "Cazador Fantasmal (4 piezas)",
        "type": "BiS con Furina",
        "bonus": "+36% Prob. Crítica gratuita al jugarla con Furina."
      }
    ],
    "mainStats": {
      "sands": "Vida% o Maestría Elemental (si tiene <150 EM)",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. Maestría Elemental (150 – 250 EM)",
      "3. Vida% (hasta 30,000 – 35,000 HP)",
      "4. ATQ%",
      "❌ ATQ Plano y DEF son muy débiles"
    ],
    "talentPriority": "Ataque Normal (Cargado) = Habilidad Elemental (E) > Definitiva (Q)",
    "benchmarks": {
      "hp": "30,000 – 35,000 HP",
      "atk": "Buff E: 3,000+ ATQ",
      "def": "850",
      "em": "180 – 250 EM",
      "er": "100% – 115% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "metaTeams": [
      {
        "name": "Hu Tao Double Hydro",
        "comp": "Hu Tao • Xingqiu • Yelan • Zhongli",
        "members": [
          "Hu Tao",
          "Xingqiu",
          "Yelan",
          "Zhongli"
        ]
      },
      {
        "name": "Hu Tao Plunge con Xianyun",
        "comp": "Hu Tao • Xianyun • Furina • Yelan",
        "members": [
          "Hu Tao",
          "Xianyun",
          "Furina",
          "Yelan"
        ]
      },
      {
        "name": "Hu Tao VV Vape",
        "comp": "Hu Tao • Kazuha • Yelan • Bennett",
        "members": [
          "Hu Tao",
          "Kazuha",
          "Yelan",
          "Bennett"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "30,000 – 35,000 HP",
      "atk": "Buff E: 3,000+ ATQ",
      "def": "850",
      "em": "180 – 250 EM",
      "er": "100% – 115% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "baseStats": {
      "hp90": 15552,
      "atk90": 106,
      "def90": 876,
      "ascStat": "Daño Crítico",
      "ascVal": "38.4%"
    },
    "talentsData": {
      "normal": {
        "name": "Lanza de las Rosas (Ataque Cargado)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          135.9,
          147.7,
          159.5,
          171.3,
          183.1,
          194.8,
          206.6,
          218.4,
          230.2,
          242,
          256.5,
          271,
          285.6
        ]
      },
      "skill": {
        "name": "Guía hacia el Más Allá (Bono ATQ según HP)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          3.8,
          4.1,
          4.4,
          4.6,
          4.9,
          5.2,
          5.5,
          5.7,
          6,
          6.3,
          6.7,
          7.1,
          7.4
        ]
      },
      "burst": {
        "name": "Calma de los Espíritus Q (Golpe Nuke <50% HP)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          303,
          337.9,
          372.8,
          407.7,
          442.6,
          477.4,
          512.3,
          547.2,
          582.1,
          617,
          654,
          691,
          728.1
        ]
      }
    },
    "statPriority": {
      "sands": "Vida% o Maestría Elemental (si tiene <150 EM)",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. Maestría Elemental (150 – 250 EM) > 3. Vida% (hasta 30,000 – 35,000 HP) > 4. ATQ% > ❌ ATQ Plano y DEF son muy débiles"
    }
  },
  {
    "id": "jean",
    "name": {
      "es": "Jean",
      "en": "Jean"
    },
    "element": "Anemo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Qin.png",
    "tier": "T1 Teamwide Healer",
    "role": "Healer Instantánea de Equipo (Carga Fanfarria Furina al 100%), VV Shred & Sunfire",
    "roleCategory": "healer_shielder",
    "scalingType": "ATK",
    "scalingLabel": "Curación masiva de Definitiva escala con ATQ Total",
    "bestWeapons": [
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "BiS Utilidad F2P",
        "note": "Partículas de recarga constantes para lanzar su Definitiva cada rotación."
      },
      {
        "name": "Espada Amenoma Gemela",
        "rarity": 4,
        "type": "Mejor Forja",
        "note": "+ATQ% para curación y regenera energía pasiva."
      },
      {
        "name": "Hoja Afilada Celestial / Aquila Favonia",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Alto ATQ Base y recarga."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "type": "BiS Obligatorio",
        "bonus": "-40% RES Elemental para potenciar al carry del equipo."
      },
      {
        "set": "Nobleza Obligada (4 piezas)",
        "type": "Soporte ATQ",
        "bonus": "+20% ATQ para todo el equipo si nadie más lo lleva."
      }
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga de Energía%",
      "goblet": "ATQ% o Bono Daño Anemo%",
      "circlet": "Bono de Curación% o Prob. Crítica (con Favonius)"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (170% - 190% ER)",
      "2. ATQ%",
      "3. Prob. Crítica (para Favonius)"
    ],
    "talentPriority": "Definitiva (Q) >>> Habilidad Elemental (E) >>> Ataques Normales",
    "benchmarks": {
      "hp": "19,000",
      "atk": "1,900 – 2,300 ATQ",
      "def": "800",
      "em": "0",
      "er": "175% – 195% ER",
      "crit": "50%+ CR"
    },
    "metaTeams": [
      {
        "name": "Furina Core Healer",
        "comp": "Jean • Furina • Neuvillette • Yelan",
        "members": [
          "Jean",
          "Furina",
          "Neuvillette",
          "Yelan"
        ]
      },
      {
        "name": "Sunfire Clásico",
        "comp": "Jean • Bennett • Xingqiu • Raiden",
        "members": [
          "Jean",
          "Bennett",
          "Xingqiu",
          "Raiden"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "19,000",
      "atk": "1,900 – 2,300 ATQ",
      "def": "800",
      "em": "0",
      "er": "175% – 195% ER",
      "crit": "50%+ CR"
    },
    "baseStats": {
      "hp90": 14695,
      "atk90": 239,
      "def90": 769,
      "ascStat": "Bono Curación",
      "ascVal": "22.1%"
    },
    "talentsData": {
      "normal": {
        "name": "Esgrima Favonius",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          48.3,
          53.7,
          59,
          64.4,
          69.8,
          75.1,
          80.5,
          85.9,
          91.2,
          96.6,
          102.4,
          108.2,
          114
        ]
      },
      "skill": {
        "name": "Espada de Torbellino E (Lanzamiento)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          292,
          318,
          344,
          370,
          396,
          422,
          448,
          474,
          500,
          526,
          557.6,
          589.1,
          620.7
        ]
      },
      "burst": {
        "name": "Brisa de Diente de León Q: Curación de Equipo Instantánea",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          251,
          273.3,
          295.7,
          318,
          340.3,
          362.7,
          385,
          407.3,
          429.7,
          452,
          479.1,
          506.2,
          533.4
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ% o Recarga de Energía%",
      "goblet": "ATQ% o Bono Daño Anemo%",
      "circlet": "Bono de Curación% o Prob. Crítica (con Favonius)",
      "substats": "1. Recarga de Energía% (170% - 190% ER) > 2. ATQ% > 3. Prob. Crítica (para Favonius)"
    }
  },
  {
    "id": "kazuha",
    "name": {
      "es": "Kaedehara Kazuha",
      "en": "Kaedehara Kazuha"
    },
    "element": "Anemo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Kazuha.png",
    "tier": "T0 Buffer Universal",
    "role": "Buffer de Daño Elemental (+40% DMG), Control de Masas (CC) & Reductor de Resistencias (-40% VV)",
    "roleCategory": "support",
    "scalingType": "EM",
    "scalingLabel": "Escalado por Maestría Elemental (1,000 EM = +40% Bono Daño Elemental al equipo)",
    "bestWeapons": [
      {
        "name": "Juramento por la Libertad (Freedom-Sworn)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+198 Maestría Elemental y buff de +20% ATQ y +16% daño en normales/cargados/descendentes."
      },
      {
        "name": "Luz Lunar de Xifos (Xiphos' Moonlight)",
        "rarity": 4,
        "type": "BiS 4★ Gacha",
        "note": "Convierte su altísima EM en recarga de energía pasiva para él y todo el equipo."
      },
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "BiS Batería F2P",
        "note": "Resuelve cualquier problema de recarga de energía con partículas blancas para el equipo."
      },
      {
        "name": "Espina de Hierro / Diluvio Florífero",
        "rarity": 4,
        "type": "Mejor F2P EM",
        "note": "Forja accesible que aporta +165 de Maestría Elemental pura."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda / Viridescent Venerer (4 piezas)",
        "type": "BiS Obligatorio",
        "bonus": "-40% Resistencia Elemental al elemento que hace Torbellino (el debuff más fuerte del juego)."
      },
      {
        "set": "Instructor (4 piezas)",
        "type": "Soporte Reacciones",
        "bonus": "+120 de Maestría Elemental a todo el equipo al activar una reacción elemental."
      },
      {
        "set": "2p Maestría Elemental + 2p Maestría Elemental",
        "type": "Transición F2P",
        "bonus": "+160 de Maestría Elemental pasiva para maximizar el bono elemental transferido."
      }
    ],
    "mainStats": {
      "sands": "Maestría Elemental (o Recarga si falta ER)",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental (o Prob. CR con Favonius)"
    },
    "substatsPriority": [
      "1. Maestría Elemental (Meta: 900 – 1,000 EM)",
      "2. Recarga de Energía% (160% - 190% ER)",
      "3. Prob. Crítica (si lleva Favonius)"
    ],
    "talentPriority": "Habilidad Elemental (E) = Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "19,000",
      "atk": "1,200",
      "def": "800",
      "em": "950 – 1,050 EM",
      "er": "160% – 190% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "International Team",
        "comp": "Tartaglia • Xiangling • Kazuha • Bennett",
        "members": [
          "Tartaglia",
          "Xiangling",
          "Kazuha",
          "Bennett"
        ]
      },
      {
        "name": "Neuvillette Hyper",
        "comp": "Neuvillette • Furina • Kazuha • Xilonen",
        "members": [
          "Neuvillette",
          "Furina",
          "Kazuha",
          "Xilonen"
        ]
      },
      {
        "name": "Raiden Hypercarry",
        "comp": "Raiden Shogun • Sara • Kazuha • Bennett",
        "members": [
          "Raiden Shogun",
          "Sara",
          "Kazuha",
          "Bennett"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "19,000",
      "atk": "1,200",
      "def": "800",
      "em": "950 – 1,050 EM",
      "er": "160% – 190% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 13348,
      "atk90": 297,
      "def90": 807,
      "ascStat": "Maestría Elemental",
      "ascVal": "115.2"
    },
    "talentsData": {
      "normal": {
        "name": "Técnica de Espada Garyu",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          45,
          50,
          55,
          60,
          65,
          70,
          75,
          80,
          85,
          90,
          95.4,
          100.8,
          106.2
        ]
      },
      "skill": {
        "name": "Chihayaburu E (Salto + Succión en Área)",
        "scaleStat": "ATK",
        "unit": "% ATQ + Torbellino",
        "mvByLevel": [
          192,
          209.1,
          226.2,
          243.3,
          260.4,
          277.6,
          294.7,
          311.8,
          328.9,
          346,
          366.8,
          387.5,
          408.3
        ]
      },
      "burst": {
        "name": "Filo de las Mil Hojas Q (Campo Viento + Absorción)",
        "scaleStat": "ATK",
        "unit": "% ATQ + Torbellino",
        "mvByLevel": [
          262,
          285.3,
          308.7,
          332,
          355.3,
          378.7,
          402,
          425.3,
          448.7,
          472,
          500.3,
          528.6,
          557
        ]
      }
    },
    "statPriority": {
      "sands": "Maestría Elemental (o Recarga si falta ER)",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental (o Prob. CR con Favonius)",
      "substats": "1. Maestría Elemental (Meta: 900 – 1,000 EM) > 2. Recarga de Energía% (160% - 190% ER) > 3. Prob. Crítica (si lleva Favonius)"
    }
  },
  {
    "id": "ayaka",
    "name": {
      "es": "Kamisato Ayaka",
      "en": "Kamisato Ayaka"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Ayaka.png",
    "tier": "T0 Permafrost DPS",
    "role": "Hypercarry Cryo de Tormenta de Nieve Nuke (20 Ticks de Ventisca)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Multiplicadores de Definitiva Soumetsu",
    "bestWeapons": [
      {
        "name": "Reflejo de las Tinieblas (Mistsplitter Reforged)",
        "rarity": 5,
        "type": "BiS Absoluto 5★",
        "note": "+44.1% Daño Crítico, 674 ATQ Base y hasta +40% Bono Daño Elemental con cargas."
      },
      {
        "name": "Espada Amenoma Gemela (Amenoma Kageuchi R5)",
        "rarity": 4,
        "type": "BiS F2P Forja",
        "note": "Forja accesible de Inazuma: restaura hasta 36 de energía, resolviendo toda su recarga."
      },
      {
        "name": "Cortador de Jade Primordial / Luna Ondulante",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Stat-sticks de Crítico y ATQ."
      },
      {
        "name": "Espada Negra / Vado del Río Ceniciento",
        "rarity": 4,
        "type": "Opciones 4★",
        "note": "Alternativas viables."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Nómada del Invierno / Blizzard Strayer (4 piezas)",
        "type": "BiS Obligatorio",
        "bonus": "+15% Bono Cryo y hasta +40% Prob. Crítica contra enemigos congelados (+55% con consonancia Cryo)."
      },
      {
        "set": "Cazador Sombrío (4 piezas)",
        "type": "BiS con Furina",
        "bonus": "+36% Prob. Crítica pasiva con fluctuaciones de vida en equipos con Furina."
      },
      {
        "set": "Reminiscencia de la Purificación (4 piezas)",
        "type": "Alternativa Nuke",
        "bonus": "+18% ATQ y +50% Daño de Ataques Normales y Cargados."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Daño Crítico%"
    },
    "substatsPriority": [
      "1. Daño Crítico (Meta: 220% – 270%+ CD)",
      "2. ATQ% (2,000 – 2,300 ATQ)",
      "3. Recarga de Energía% (130% - 145% con Amenoma / 140%+ sin Amenoma)",
      "4. Prob. Crítica (tope 35% - 45% con Nómada)"
    ],
    "talentPriority": "Definitiva (Q - Soumetsu) >>> Ataque Normal/Cargado = Habilidad Elemental (E)",
    "benchmarks": {
      "hp": "18,000",
      "atk": "2,100 – 2,400 ATQ",
      "def": "800",
      "em": "0",
      "er": "135% – 145% ER",
      "crit": "40% CR / 240%+ CD"
    },
    "metaTeams": [
      {
        "name": "Ayaka Permafrost Clásico",
        "comp": "Ayaka • Shenhe • Kazuha • Kokomi",
        "members": [
          "Ayaka",
          "Shenhe",
          "Kazuha",
          "Kokomi"
        ]
      },
      {
        "name": "Ayaka Freeze F2P",
        "comp": "Ayaka • Rosaria • Sucrose • Bárbara",
        "members": [
          "Ayaka",
          "Rosaria",
          "Sucrose",
          "Bárbara"
        ]
      },
      {
        "name": "Ayaka-Furina Core",
        "comp": "Ayaka • Furina • Kazuha • Charlotte",
        "members": [
          "Ayaka",
          "Furina",
          "Kazuha",
          "Charlotte"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "2,100 – 2,400 ATQ",
      "def": "800",
      "em": "0",
      "er": "135% – 145% ER",
      "crit": "40% CR / 240%+ CD"
    },
    "baseStats": {
      "hp90": 12858,
      "atk90": 342,
      "def90": 784,
      "ascStat": "Daño Crítico",
      "ascVal": "38.4%"
    },
    "talentsData": {
      "normal": {
        "name": "Estilo Kamisato: Naname",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          45.7,
          50.8,
          55.9,
          60.9,
          66,
          71.1,
          76.2,
          81.2,
          86.3,
          91.4,
          96.9,
          102.4,
          107.9
        ]
      },
      "skill": {
        "name": "Hyouka E (Flor de Hielo)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          239,
          260.2,
          281.4,
          302.7,
          323.9,
          345.1,
          366.3,
          387.6,
          408.8,
          430,
          455.8,
          481.6,
          507.4
        ]
      },
      "burst": {
        "name": "Soumetsu Q (20 Ticks de Tormenta Helada)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          112,
          122,
          132,
          142,
          152,
          162,
          172,
          182,
          192,
          202,
          214.1,
          226.2,
          238.4
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Daño Crítico%",
      "substats": "1. Daño Crítico (Meta: 220% – 270%+ CD) > 2. ATQ% (2,000 – 2,300 ATQ) > 3. Recarga de Energía% (130% - 145% con Amenoma / 140%+ sin Amenoma) > 4. Prob. Crítica (tope 35% - 45% con Nómada)"
    }
  },
  {
    "id": "ayato",
    "name": {
      "es": "Kamisato Ayato",
      "en": "Kamisato Ayato"
    },
    "element": "Hydro",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Ayato.png",
    "tier": "T1 On-Field DPS",
    "role": "On-Field DPS Hydro Cómodo (Cortes Shunsuiken en Área)",
    "roleCategory": "main_dps",
    "scalingType": "ATK_HP",
    "scalingLabel": "Escalado Principal por ATQ% con Bono Secundario por Vida Máxima",
    "bestWeapons": [
      {
        "name": "Luna Ondulante de Futsu",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Prob. Crítica, Bono Daño Elemental y +40% Daño en Ataques Normales."
      },
      {
        "name": "Cortador de Jade Primordial / Reflejo de las Tinieblas",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Jade Cutter sinergiza a la perfección con su vida y ATQ."
      },
      {
        "name": "Espada Negra",
        "rarity": 4,
        "type": "Pase de Batalla",
        "note": "+Prob. Crítica y aumento directo a sus cortes normales."
      },
      {
        "name": "Espada Amenoma Gemela / Espada de Madera",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "Amenoma resuelve toda su recarga de forma gratuita."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Eco del Sacrificio (4 piezas)",
        "type": "BiS (Bajo Ping)",
        "bonus": "Probabilidad de +70% de daño en cada golpe Shunsuiken."
      },
      {
        "set": "Gladiador (4 piezas)",
        "type": "BiS Universal",
        "bonus": "+35% Daño en Ataques Normales consistente sin depender del ping."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Hydro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ%",
      "3. Recarga de Energía% (120% - 135%)",
      "4. Vida%"
    ],
    "talentPriority": "Habilidad Elemental (E) > Definitiva (Q) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "20,000 – 23,000 HP",
      "atk": "1,900 – 2,200 ATQ",
      "def": "750",
      "em": "0 – 80 EM",
      "er": "125% – 140% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "metaTeams": [
      {
        "name": "Ayato Hypercarry",
        "comp": "Ayato • Yun Jin • Kazuha • Bennett",
        "members": [
          "Ayato",
          "Yun Jin",
          "Kazuha",
          "Bennett"
        ]
      },
      {
        "name": "Ayato Burgeon",
        "comp": "Ayato • Nahida • Thoma • Baizhu",
        "members": [
          "Ayato",
          "Nahida",
          "Thoma",
          "Baizhu"
        ]
      },
      {
        "name": "Ayato Soup",
        "comp": "Ayato • Fischl • Bennett • Kazuha",
        "members": [
          "Ayato",
          "Fischl",
          "Bennett",
          "Kazuha"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "20,000 – 23,000 HP",
      "atk": "1,900 – 2,200 ATQ",
      "def": "750",
      "em": "0 – 80 EM",
      "er": "125% – 140% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "baseStats": {
      "hp90": 13715,
      "atk90": 299,
      "def90": 769,
      "ascStat": "Daño Crítico",
      "ascVal": "38.4%"
    },
    "talentsData": {
      "normal": {
        "name": "Estilo Kamisato: Marobashi",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          44.9,
          49.9,
          54.9,
          59.9,
          64.9,
          69.9,
          74.9,
          79.9,
          84.9,
          89.9,
          95.3,
          100.7,
          106.1
        ]
      },
      "skill": {
        "name": "Cortes Shunsuiken (3 Golpes E)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          52.8,
          58.7,
          64.6,
          70.4,
          76.3,
          82.2,
          88.1,
          93.9,
          99.8,
          105.7,
          112,
          118.4,
          124.7
        ]
      },
      "burst": {
        "name": "Estilo Kamisato: Jardín del Agua (Lluvia Q)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          66.5,
          73.9,
          81.3,
          88.7,
          96.1,
          103.4,
          110.8,
          118.2,
          125.6,
          133,
          141,
          149,
          156.9
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Hydro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% > 3. Recarga de Energía% (120% - 135%) > 4. Vida%"
    }
  },
  {
    "id": "keqing",
    "name": {
      "es": "Keqing",
      "en": "Keqing"
    },
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Keqing.png",
    "tier": "T1 Aggravate Driver",
    "role": "Driver Electro Ágil de Ataques Rápidos & Detonadora de Intensificación (Aggravate)",
    "roleCategory": "main_dps",
    "scalingType": "ATK_EM",
    "scalingLabel": "Escalado por ATQ% y Maestría Elemental (Reacciona frecuentemente con Dendro)",
    "bestWeapons": [
      {
        "name": "Reflejo de las Tinieblas (Mistsplitter)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Daño Crítico y hasta +40% Bono Daño Elemental al golpear con E y Q."
      },
      {
        "name": "Cortador de Jade Primordial",
        "rarity": 5,
        "type": "BiS 5★ Alternativa",
        "note": "+44.1% Prob. Crítica masiva y ATQ% adicional según Vida."
      },
      {
        "name": "Rugido del León (Lion's Roar R5)",
        "rarity": 4,
        "type": "Mejor 4★ Gacha",
        "note": "+36% Daño continuo contra enemigos afectados por Electro."
      },
      {
        "name": "Espada de Madera / Espina de Hierro",
        "rarity": 4,
        "type": "F2P",
        "note": "Maestría Elemental para Intensificación."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Furia del Trueno (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+15% Bono Electro, +20% Daño en Intensificación y reduce el cooldown de su habilidad E a casi 0s."
      },
      {
        "set": "Sueños Áureos (4 piezas)",
        "type": "Alternativa EM",
        "bonus": "+Hasta 230 de Maestría Elemental para daño de reacción."
      }
    ],
    "mainStats": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ%",
      "3. Maestría Elemental (100 – 180 EM)",
      "4. Recarga de Energía%"
    ],
    "talentPriority": "Definitiva (Q) = Ataque Normal (Cargados) = Habilidad Elemental (E)",
    "benchmarks": {
      "hp": "17,000",
      "atk": "1,900 – 2,200 ATQ",
      "def": "750",
      "em": "120 – 180 EM",
      "er": "115% ER",
      "crit": "75%+ CR / 175%+ CD"
    },
    "metaTeams": [
      {
        "name": "Keqing Aggravate Clásico",
        "comp": "Keqing • Fischl • Nahida • Baizhu",
        "members": [
          "Keqing",
          "Fischl",
          "Nahida",
          "Baizhu"
        ]
      },
      {
        "name": "Keqing Quickbloom",
        "comp": "Keqing • Furina • Nahida • Baizhu",
        "members": [
          "Keqing",
          "Furina",
          "Nahida",
          "Baizhu"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "17,000",
      "atk": "1,900 – 2,200 ATQ",
      "def": "750",
      "em": "120 – 180 EM",
      "er": "115% ER",
      "crit": "75%+ CR / 175%+ CD"
    },
    "baseStats": {
      "hp90": 13103,
      "atk90": 323,
      "def90": 799,
      "ascStat": "Daño Crítico",
      "ascVal": "38.4%"
    },
    "talentsData": {
      "normal": {
        "name": "Esgrima Yunlai (Ataque Cargado Doble)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          76.8,
          85.3,
          93.9,
          102.4,
          110.9,
          119.5,
          128,
          136.5,
          145.1,
          153.6,
          162.8,
          172,
          181.2
        ]
      },
      "skill": {
        "name": "Retorno Estelar E (Corte Translocador)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          168,
          182.9,
          197.9,
          212.8,
          227.7,
          242.7,
          257.6,
          272.5,
          287.5,
          302.4,
          320.5,
          338.7,
          356.8
        ]
      },
      "burst": {
        "name": "Paseo Celestial Q (8 Cortes + Nuke Final)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          189,
          205.8,
          222.6,
          239.4,
          256.2,
          273,
          289.8,
          306.6,
          323.4,
          340.2,
          360.6,
          381,
          401.4
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% > 3. Maestría Elemental (100 – 180 EM) > 4. Recarga de Energía%"
    }
  },
  {
    "id": "kinich",
    "name": {
      "es": "Kinich",
      "en": "Kinich"
    },
    "element": "Dendro",
    "rarity": 5,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Kinich.png",
    "tier": "T0 Loop Hypercarry",
    "role": "Hypercarry Dendro en Campo (Enganche de Gancho & Cañonazos de Escamas)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Multiplicadores Masivos de Cañón E (Escamas Noctámbulas)",
    "bestWeapons": [
      {
        "name": "Colmillo del Rey de la Montaña (Fang of the Mountain King)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Prob. Crítica, genera acumulaciones de daño al causar Quemadura o Crepitar."
      },
      {
        "name": "Médula de la Serpiente Marina (Serpent Spine)",
        "rarity": 4,
        "type": "Mejor 4★ Pase",
        "note": "+Prob. Crítica y hasta +50% daño directo en sus cañonazos de escamas."
      },
      {
        "name": "Terragitador (Earth Shaker R5)",
        "rarity": 4,
        "type": "Mejor F2P Forja",
        "note": "Forja de Natlan: +32% Daño de Habilidad Elemental al causar reacciones Pyro."
      },
      {
        "name": "Lápida del Lobo",
        "rarity": 5,
        "type": "Alternativa 5★",
        "note": "Enorme bono de ATQ%."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Códice de Obsidiana (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+40% Prob. Crítica garantizada al gastar puntos de Noctambulismo en su gancho."
      },
      {
        "set": "Sueños Inacabados (4 piezas)",
        "type": "Alternativa Quemadura",
        "bonus": "+50% Daño permanente si hay enemigos afectados por Quemadura en combate."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Dendro%",
      "circlet": "Daño Crítico% (o Prob. CR)"
    },
    "substatsPriority": [
      "1. Daño Crítico / Prob. Crítica (tope 60% CR con Obsidiana)",
      "2. ATQ%",
      "3. Recarga de Energía% (120% – 130% ER)",
      "4. Maestría Elemental"
    ],
    "talentPriority": "Habilidad Elemental (E - Cañón) >>> Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "18,000",
      "atk": "2,200 – 2,500 ATQ",
      "def": "800",
      "em": "60 – 120 EM",
      "er": "120% – 135% ER",
      "crit": "55% CR / 230%+ CD"
    },
    "metaTeams": [
      {
        "name": "Kinich Burning-Burgeon",
        "comp": "Kinich • Mavuika • Emilie • Bennett",
        "members": [
          "Kinich",
          "Mavuika",
          "Emilie",
          "Bennett"
        ]
      },
      {
        "name": "Kinich Vape-Burgeon",
        "comp": "Kinich • Furina • Xiangling • Bennett",
        "members": [
          "Kinich",
          "Furina",
          "Xiangling",
          "Bennett"
        ]
      },
      {
        "name": "Kinich F2P",
        "comp": "Kinich • Xiangling • Bennett • Dehya",
        "members": [
          "Kinich",
          "Xiangling",
          "Bennett",
          "Dehya"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "2,200 – 2,500 ATQ",
      "def": "800",
      "em": "60 – 120 EM",
      "er": "120% – 135% ER",
      "crit": "55% CR / 230%+ CD"
    },
    "baseStats": {
      "hp90": 12858,
      "atk90": 332,
      "def90": 815,
      "ascStat": "Daño Crítico",
      "ascVal": "38.4%"
    },
    "talentsData": {
      "normal": {
        "name": "Caza Noctámbula",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          84,
          93.3,
          102.7,
          112,
          121.3,
          130.7,
          140,
          149.3,
          158.7,
          168,
          178.1,
          188.2,
          198.2
        ]
      },
      "skill": {
        "name": "Disparo de Escamas E (Cañonazo Nuke)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          680,
          740.4,
          800.9,
          861.3,
          921.8,
          982.2,
          1042.7,
          1103.1,
          1163.6,
          1224,
          1297.4,
          1370.9,
          1444.3
        ]
      },
      "burst": {
        "name": "Homenaje a Ajaw Q (Aliento de Fuego Láser)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          154,
          167.7,
          181.4,
          195.1,
          208.8,
          222.4,
          236.1,
          249.8,
          263.5,
          277.2,
          293.8,
          310.5,
          327.1
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Dendro%",
      "circlet": "Daño Crítico% (o Prob. CR)",
      "substats": "1. Daño Crítico / Prob. Crítica (tope 60% CR con Obsidiana) > 2. ATQ% > 3. Recarga de Energía% (120% – 130% ER) > 4. Maestría Elemental"
    }
  },
  {
    "id": "kuki_shinobu",
    "name": {
      "es": "Kuki Shinobu",
      "en": "Kuki Shinobu"
    },
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Shinobu.png",
    "tier": "T0 Hyperbloom Queen",
    "role": "Reina de Sobreflorecimiento (Hyperbloom) & Healer de Aro Continuo",
    "roleCategory": "healer_shielder",
    "scalingType": "EM_HP",
    "scalingLabel": "Escalado 100% Maestría Elemental para Hyperbloom (35k+ por semilla) + HP para curación",
    "bestWeapons": [
      {
        "name": "Espina de Hierro (Iron Sting)",
        "rarity": 4,
        "type": "BiS F2P Forja",
        "note": "Forja accesible que otorga +165 de Maestría Elemental pura de forma gratuita."
      },
      {
        "name": "Luz Lunar de Xifos (Xiphos)",
        "rarity": 4,
        "type": "BiS Gacha",
        "note": "+Maestría Elemental y convierte EM en recarga para todo el equipo."
      },
      {
        "name": "Diluvio Florífero (Toukabou Shigure)",
        "rarity": 4,
        "type": "Evento EM",
        "note": "+165 de Maestría Elemental y daño extra contra enemigos marcados."
      },
      {
        "name": "Llave de la Coronación / Juramento por la Libertad",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "La Llave da Vida% descomunal y comparte hasta 150 EM con el equipo."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Flor Olvidada del Paraíso (4 piezas)",
        "type": "BiS Daño Hyperbloom",
        "bonus": "+80% Daño en reacciones de Sobreflorecimiento (máximo daño por semilla)."
      },
      {
        "set": "Sueños Áureos (4 piezas)",
        "type": "Alternativa Eficiente",
        "bonus": "+Hasta 230 de Maestría Elemental total (más fácil de farmear junto a Recuerdos)."
      },
      {
        "set": "2p EM+80 + 2p EM+80",
        "type": "Transición F2P",
        "bonus": "+160 Maestría Elemental permanente."
      }
    ],
    "mainStats": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental"
    },
    "substatsPriority": [
      "1. Maestría Elemental (Meta estricto: 950 – 1,050 EM)",
      "2. Vida% y Vida Plana (para mayor curación pasiva)",
      "3. Recarga de Energía%"
    ],
    "talentPriority": "Habilidad Elemental (E) >>> Definitiva (Q) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "24,000 – 30,000 HP",
      "atk": "1,100",
      "def": "750",
      "em": "950 – 1,050 EM",
      "er": "115% ER",
      "crit": "Ignorar (Hyperbloom no hace crítico salvo Nahida C2)"
    },
    "metaTeams": [
      {
        "name": "Alhaitham Quickbloom",
        "comp": "Alhaitham • Nahida • Xingqiu • Yelan",
        "members": [
          "Alhaitham",
          "Nahida",
          "Xingqiu",
          "Yelan"
        ]
      },
      {
        "name": "Nahida Hyperbloom F2P",
        "comp": "Nahida • Xingqiu • Kuki Shinobu • Yelan",
        "members": [
          "Nahida",
          "Xingqiu",
          "Kuki Shinobu",
          "Yelan"
        ]
      },
      {
        "name": "Ayato Hyperbloom",
        "comp": "Ayato • Nahida • Kuki Shinobu • Kazuha",
        "members": [
          "Ayato",
          "Nahida",
          "Kuki Shinobu",
          "Kazuha"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "24,000 – 30,000 HP",
      "atk": "1,100",
      "def": "750",
      "em": "950 – 1,050 EM",
      "er": "115% ER",
      "crit": "Ignorar (Hyperbloom no hace crítico salvo Nahida C2)"
    },
    "baseStats": {
      "hp90": 12288,
      "atk90": 212,
      "def90": 751,
      "ascStat": "Vida%",
      "ascVal": "24.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Espada de Shinobu",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          48.8,
          54.2,
          59.6,
          65.1,
          70.5,
          75.9,
          81.3,
          86.8,
          92.2,
          97.6,
          103.5,
          109.3,
          115.2
        ]
      },
      "skill": {
        "name": "Aro Santificador E: Curación por Pulso",
        "scaleStat": "HP",
        "unit": "% Vida Máx + Bono EM",
        "mvByLevel": [
          3,
          3.3,
          3.5,
          3.8,
          4.1,
          4.3,
          4.6,
          4.9,
          5.1,
          5.4,
          5.7,
          6,
          6.4
        ]
      },
      "burst": {
        "name": "Rito de Exorcismo Q (Daño por Tick <50% HP)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          3.6,
          3.9,
          4.2,
          4.6,
          4.9,
          5.2,
          5.5,
          5.8,
          6.2,
          6.5,
          6.9,
          7.3,
          7.7
        ]
      }
    },
    "statPriority": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental",
      "substats": "1. Maestría Elemental (Meta estricto: 950 – 1,050 EM) > 2. Vida% y Vida Plana (para mayor curación pasiva) > 3. Recarga de Energía%"
    }
  },
  {
    "id": "layla",
    "name": {
      "es": "Layla",
      "en": "Layla"
    },
    "element": "Cryo",
    "rarity": 4,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Layla.png",
    "tier": "T0.5 Cryo Shielder",
    "role": "Escudo Cryo Casi Impenetrable (Escala 100% Vida) & Disparo de Estrellas",
    "roleCategory": "healer_shielder",
    "scalingType": "HP",
    "scalingLabel": "Escudo escala 100% con Vida Máxima (Segundo escudo más resistente tras Zhongli)",
    "bestWeapons": [
      {
        "name": "Llave de la Coronación",
        "rarity": 5,
        "type": "BiS 5★ Vida",
        "note": "+86.2% Vida Máxima para un escudo descomunal y comparte EM."
      },
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "BiS Utilidad F2P",
        "note": "Batería para el equipo."
      },
      {
        "name": "Vado del Río Ceniciento / Espada del Alba",
        "rarity": 4,
        "type": "F2P",
        "note": "Recarga de energía y crítico."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Tenacidad de la Geoarmada (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+20% ATQ para todo el equipo y +30% Protección de Escudo con sus estrellas fugaces."
      },
      {
        "set": "2p Vida+20% + 2p Vida+20%",
        "type": "Escudo Puro (45k+ HP)",
        "bonus": "+40% Vida Máxima total."
      }
    ],
    "mainStats": {
      "sands": "Vida%",
      "goblet": "Vida%",
      "circlet": "Vida% (o Prob. CR con Favonius)"
    },
    "substatsPriority": [
      "1. Vida% y Vida Plana (Meta: 38,000 – 44,000 HP)",
      "2. Recarga de Energía% (130% - 150% ER)",
      "3. Prob. Crítica (para Favonius)"
    ],
    "talentPriority": "Habilidad Elemental (E - Escudo) >>> Definitiva (Q) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "38,000 – 45,000 HP",
      "atk": "1,100",
      "def": "750",
      "em": "0",
      "er": "135% – 150% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "Wanderer Escudo Freeze",
        "comp": "Wanderer • Faruzan • Layla • Xingqiu",
        "members": [
          "Wanderer",
          "Faruzan",
          "Layla",
          "Xingqiu"
        ]
      },
      {
        "name": "Hu Tao Melt Escudo",
        "comp": "Hu Tao • Xingqiu • Layla • Yelan",
        "members": [
          "Hu Tao",
          "Xingqiu",
          "Layla",
          "Yelan"
        ]
      },
      {
        "name": "Ganyu Melt Escudo",
        "comp": "Ganyu • Xiangling • Bennett • Layla",
        "members": [
          "Ganyu",
          "Xiangling",
          "Bennett",
          "Layla"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "38,000 – 45,000 HP",
      "atk": "1,100",
      "def": "750",
      "em": "0",
      "er": "135% – 150% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 11092,
      "atk90": 216,
      "def90": 655,
      "ascStat": "Vida%",
      "ascVal": "24.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Espada de la Luz",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          51.2,
          56.9,
          62.6,
          68.3,
          74,
          79.6,
          85.3,
          91,
          96.7,
          102.4,
          108.5,
          114.7,
          120.8
        ]
      },
      "skill": {
        "name": "Noche de la Floración E: Absorción de Escudo",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          10.8,
          11.8,
          12.7,
          13.7,
          14.6,
          15.6,
          16.6,
          17.5,
          18.5,
          19.4,
          20.6,
          21.7,
          22.9
        ]
      },
      "burst": {
        "name": "Sueño del Firmamento Q (Daño por Rayo Estelar)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          4.6,
          5,
          5.4,
          5.8,
          6.2,
          6.6,
          7.1,
          7.5,
          7.9,
          8.3,
          8.8,
          9.3,
          9.8
        ]
      }
    },
    "statPriority": {
      "sands": "Vida%",
      "goblet": "Vida%",
      "circlet": "Vida% (o Prob. CR con Favonius)",
      "substats": "1. Vida% y Vida Plana (Meta: 38,000 – 44,000 HP) > 2. Recarga de Energía% (130% - 150% ER) > 3. Prob. Crítica (para Favonius)"
    }
  },
  {
    "id": "mavuika",
    "name": {
      "es": "Mavuika",
      "en": "Mavuika"
    },
    "element": "Pyro",
    "rarity": 5,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Mavuika.png",
    "tier": "T0 Arconte Pyro",
    "role": "Hypercarry DPS en Campo & Aplicadora Pyro Off-Field",
    "roleCategory": "main_dps",
    "scalingType": "ATK_EM",
    "scalingLabel": "Escalado por ATQ% + Maestría Elemental • 0% ER necesaria",
    "bestWeapons": [
      {
        "name": "A Thousand Blazing Suns",
        "rarity": 5,
        "type": "BiS Firma Oficial",
        "note": "+Crítico colosal y daño Nightsoul Pyro."
      },
      {
        "name": "Lápida del Lobo (Wolf's Gravestone)",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+ATQ% brutal para el equipo."
      },
      {
        "name": "Médula de la Serpiente Marina (Serpent Spine)",
        "rarity": 4,
        "type": "BiS 4★ Pase",
        "note": "+Prob. Crítica y bono de daño universal."
      },
      {
        "name": "Hacha de la Mota del Bosque (Earth Shaker)",
        "rarity": 4,
        "type": "Mejor Forja Natlan",
        "note": "+ATQ% y bono de habilidad tras reacción Pyro."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Códice de Obsidiana (4 piezas)",
        "type": "BiS On-Field Carry",
        "bonus": "+40% Prob. Crítica garantizada al gastar puntos de Noctámbulo."
      },
      {
        "set": "Pergamino del Héroe de la Ciudad de las Cenizas (4p)",
        "type": "BiS Off-Field Buffer",
        "bonus": "+40% Daño Elemental para todo el equipo."
      }
    ],
    "mainStats": {
      "sands": "ATQ% o Maestría Elemental (en Melt con Bennett)",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Daño Crítico% (o Prob. CR)"
    },
    "substatsPriority": [
      "1. Daño Crítico",
      "2. Prob. Crítica (tope 60% en panel con Obsidiana)",
      "3. ATQ%",
      "4. Maestría Elemental (150-250 EM)",
      "❌ ER% es 100% inútil"
    ],
    "talentPriority": "Definitiva (Q) = Habilidad Elemental (E) >>> Ataques Normales",
    "benchmarks": {
      "hp": "18,000",
      "atk": "2,200 – 2,600+ ATQ",
      "def": "800",
      "em": "180 – 260 EM",
      "er": "100% (No usa energía)",
      "crit": "55% CR / 230%+ CD"
    },
    "metaTeams": [
      {
        "name": "Mavuika Melt Nuke",
        "comp": "Mavuika • Citlali • Bennett • Xilonen",
        "members": [
          "Mavuika",
          "Citlali",
          "Bennett",
          "Xilonen"
        ]
      },
      {
        "name": "Mualani-Mavuika Core",
        "comp": "Mualani • Mavuika • Xilonen • Emilie",
        "members": [
          "Mualani",
          "Mavuika",
          "Xilonen",
          "Emilie"
        ]
      },
      {
        "name": "Kinich Burning-Burgeon",
        "comp": "Kinich • Mavuika • Emilie • Bennett",
        "members": [
          "Kinich",
          "Mavuika",
          "Emilie",
          "Bennett"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "2,200 – 2,600+ ATQ",
      "def": "800",
      "em": "180 – 260 EM",
      "er": "100% (No usa energía)",
      "crit": "55% CR / 230%+ CD"
    },
    "baseStats": {
      "hp90": 12552,
      "atk90": 359,
      "def90": 792,
      "ascStat": "Daño Crítico",
      "ascVal": "38.4%"
    },
    "talentsData": {
      "normal": {
        "name": "Llama del Dragón",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          82.4,
          91.6,
          100.7,
          109.9,
          119,
          128.2,
          137.3,
          146.5,
          155.6,
          164.8,
          174.7,
          184.6,
          194.5
        ]
      },
      "skill": {
        "name": "Anillo de Llamas E",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          92,
          102.2,
          112.4,
          122.7,
          132.9,
          143.1,
          153.3,
          163.6,
          173.8,
          184,
          195,
          206.1,
          217.1
        ]
      },
      "burst": {
        "name": "Nuke Inicial de Definitiva Q (200 Espíritu)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          688,
          764.5,
          841,
          917.5,
          994,
          1070.6,
          1147.1,
          1223.6,
          1300.1,
          1376.6,
          1459.2,
          1541.8,
          1624.4
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ% o Maestría Elemental (en Melt con Bennett)",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Daño Crítico% (o Prob. CR)",
      "substats": "1. Daño Crítico > 2. Prob. Crítica (tope 60% en panel con Obsidiana) > 3. ATQ% > 4. Maestría Elemental (150-250 EM) > ❌ ER% es 100% inútil"
    }
  },
  {
    "id": "mona",
    "name": {
      "es": "Mona",
      "en": "Mona"
    },
    "element": "Hydro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Mona.png",
    "tier": "T1 Buffer / Nuke",
    "role": "Buffer de Daño Omen (+60% DMG) & Nuke Vaporizado",
    "roleCategory": "support",
    "scalingType": "ATK_ER",
    "scalingLabel": "Escalado por ATQ% y Recarga de Energía (Pasiva A4: ER a Bono Hydro)",
    "bestWeapons": [
      {
        "name": "Cuento de Cazadores de Dragones (TTDS)",
        "rarity": 3,
        "type": "Soporte Carry",
        "note": "+48% ATQ para el atacante principal del equipo."
      },
      {
        "name": "Códice de Favonius / Prototipo Ámbar",
        "rarity": 4,
        "type": "Batería / Cura",
        "note": "Favonius asegura recarga fluida de la Definitiva."
      },
      {
        "name": "Sinfonía de los Merodeadores",
        "rarity": 4,
        "type": "Nuke DPS",
        "note": "Convierte la burbuja de la Q en una explosión millonaria."
      },
      {
        "name": "Oración Perdida",
        "rarity": 5,
        "type": "Stat-stick 5★",
        "note": "Alta Prob. Crítica y velocidad."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Nobleza Obligada (4 piezas)",
        "type": "BiS Soporte",
        "bonus": "+20% ATQ para todo el equipo al activar su Presagio (Q)."
      },
      {
        "set": "Emblema del Destino (4 piezas)",
        "type": "BiS Daño Nuke",
        "bonus": "Convierte su alta recarga en daño directo en la burbuja ilusoria."
      }
    ],
    "mainStats": {
      "sands": "Recarga de Energía%",
      "goblet": "Bono Daño Hydro% o ATQ%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (200% - 240% ER)",
      "2. Prob. Crítica (para activar Favonius)",
      "3. Daño Crítico",
      "4. ATQ%"
    ],
    "talentPriority": "Definitiva (Q) >>> Habilidad Elemental (E) >>> Ataques Normales",
    "benchmarks": {
      "hp": "17,000",
      "atk": "1,400 – 1,700 ATQ",
      "def": "650",
      "em": "50 – 120 EM",
      "er": "210% – 250% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Morgana Permafrost Clásico",
        "comp": "Ganyu • Mona • Venti • Diona",
        "members": [
          "Ganyu",
          "Mona",
          "Venti",
          "Diona"
        ]
      },
      {
        "name": "Freeze Premium",
        "comp": "Ayaka • Mona • Kazuha • Diona",
        "members": [
          "Ayaka",
          "Mona",
          "Kazuha",
          "Diona"
        ]
      },
      {
        "name": "Nuke Showcase",
        "comp": "Hu Tao • Bennett • Mona • Kazuha",
        "members": [
          "Hu Tao",
          "Bennett",
          "Mona",
          "Kazuha"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "17,000",
      "atk": "1,400 – 1,700 ATQ",
      "def": "650",
      "em": "50 – 120 EM",
      "er": "210% – 250% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "baseStats": {
      "hp90": 10409,
      "atk90": 287,
      "def90": 653,
      "ascStat": "Recarga Energía",
      "ascVal": "32.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Ondas del Destino",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          37.6,
          41.8,
          46,
          50.1,
          54.3,
          58.5,
          62.7,
          66.8,
          71,
          75.2,
          79.7,
          84.2,
          88.7
        ]
      },
      "skill": {
        "name": "Espejo del Destino (E)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          32,
          35.6,
          39.1,
          42.7,
          46.2,
          49.8,
          53.3,
          56.9,
          60.4,
          64,
          67.8,
          71.7,
          75.5
        ]
      },
      "burst": {
        "name": "Órbita del Destino: Daño de Explosión Burbuja Q",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          442,
          481.3,
          520.7,
          560,
          599.3,
          638.7,
          678,
          717.3,
          756.7,
          796,
          843.8,
          891.5,
          939.3
        ]
      }
    },
    "statPriority": {
      "sands": "Recarga de Energía%",
      "goblet": "Bono Daño Hydro% o ATQ%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Recarga de Energía% (200% - 240% ER) > 2. Prob. Crítica (para activar Favonius) > 3. Daño Crítico > 4. ATQ%"
    }
  },
  {
    "id": "mualani",
    "name": {
      "es": "Mualani",
      "en": "Mualani"
    },
    "element": "Hydro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Mualani.png",
    "tier": "T0 Hypercarry DPS",
    "role": "Hypercarry DPS en Campo (Mordiscos Vaporizados Masivos)",
    "roleCategory": "main_dps",
    "scalingType": "HP_EM",
    "scalingLabel": "Escalado por Vida Máxima (HP%) + Maestría Elemental (EM en Vape)",
    "bestWeapons": [
      {
        "name": "Hora del Surf",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Daño Crítico, +Vida Máx y +48% daño en Ataques Normales de Noctambulismo."
      },
      {
        "name": "Anillo de Yaxche",
        "rarity": 4,
        "type": "Mejor 4★ / Forja F2P",
        "note": "Forja de Natlan: escala daño de Ataques Normales según Vida Máxima."
      },
      {
        "name": "Jade Sacrificial",
        "rarity": 4,
        "type": "Pase de Batalla",
        "note": "Excelente stat-stick de Prob. Crítica y gran aumento de Vida Máxima."
      },
      {
        "name": "Sinfonía de los Merodeadores",
        "rarity": 4,
        "type": "Alternativa Gacha",
        "note": "Enorme Daño Crítico y buff masivo con canción de EM o Daño Elemental."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Códice de Obsidiana (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+40% Prob. Crítica permanente al consumir puntos de Noctambulismo."
      },
      {
        "set": "Sueños Áureos (4 piezas)",
        "type": "Alternativa Vape",
        "bonus": "+Maestría Elemental masiva para aumentar los multiplicadores de Vaporizado."
      }
    ],
    "mainStats": {
      "sands": "Vida% o Maestría Elemental",
      "goblet": "Bono Daño Hydro%",
      "circlet": "Daño Crítico% (o Vida% si ya supera 50% CR)"
    },
    "substatsPriority": [
      "1. Daño Crítico (con Códice de Obsidiana)",
      "2. Vida% (hasta 35,000+ HP)",
      "3. Maestría Elemental (150 – 250 EM)",
      "4. Prob. Crítica (tope 60%)"
    ],
    "talentPriority": "Habilidad Elemental (E) >>> Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "35,000 – 42,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "180 – 260 EM",
      "er": "100% – 115% ER",
      "crit": "50% CR / 240%+ CD"
    },
    "metaTeams": [
      {
        "name": "Mualani Vape con Mavuika",
        "comp": "Mualani • Mavuika • Xilonen • Sucrose",
        "members": [
          "Mualani",
          "Mavuika",
          "Xilonen",
          "Sucrose"
        ]
      },
      {
        "name": "Mualani Burn-Vape",
        "comp": "Mualani • Xiangling • Emilie • Zhongli",
        "members": [
          "Mualani",
          "Xiangling",
          "Emilie",
          "Zhongli"
        ]
      },
      {
        "name": "Mualani F2P",
        "comp": "Mualani • Xiangling • Lynette • Dehya",
        "members": [
          "Mualani",
          "Xiangling",
          "Lynette",
          "Dehya"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "35,000 – 42,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "180 – 260 EM",
      "er": "100% – 115% ER",
      "crit": "50% CR / 240%+ CD"
    },
    "baseStats": {
      "hp90": 15185,
      "atk90": 194,
      "def90": 580,
      "ascStat": "Prob. Crítica",
      "ascVal": "19.2%"
    },
    "talentsData": {
      "normal": {
        "name": "Enfriamiento (Ataque Normal)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          42.1,
          46.8,
          51.5,
          56.1,
          60.8,
          65.5,
          70.2,
          74.8,
          79.5,
          84.2,
          89.3,
          94.3,
          99.4
        ]
      },
      "skill": {
        "name": "Surfeando las Olas: Mordisco de Tiburón E (3 Cargas)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          15.4,
          17.1,
          18.8,
          20.5,
          22.2,
          24,
          25.7,
          27.4,
          29.1,
          30.8,
          32.6,
          34.5,
          36.3
        ]
      },
      "burst": {
        "name": "Misil Devoratiburones (Golpe Nuke Q)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          42.6,
          47.3,
          52.1,
          56.8,
          61.5,
          66.3,
          71,
          75.7,
          80.5,
          85.2,
          90.3,
          95.4,
          100.5
        ]
      }
    },
    "statPriority": {
      "sands": "Vida% o Maestría Elemental",
      "goblet": "Bono Daño Hydro%",
      "circlet": "Daño Crítico% (o Vida% si ya supera 50% CR)",
      "substats": "1. Daño Crítico (con Códice de Obsidiana) > 2. Vida% (hasta 35,000+ HP) > 3. Maestría Elemental (150 – 250 EM) > 4. Prob. Crítica (tope 60%)"
    }
  },
  {
    "id": "nahida",
    "name": {
      "es": "Nahida",
      "en": "Nahida"
    },
    "element": "Dendro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Nahida.png",
    "tier": "T0 Arconte Dendro",
    "role": "Aplicadora Dendro Suprema, Sub-DPS Off-Field (Tri-Karma) & Buffer (+250 EM)",
    "roleCategory": "sub_dps",
    "scalingType": "EM_ATK",
    "scalingLabel": "Escalado Principal por Maestría Elemental (Tope Pasivas A1 y A4 en 1,000 EM) + ATQ%",
    "bestWeapons": [
      {
        "name": "Sueños de las Mil Noches (A Thousand Floating Dreams)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+265 Maestría Elemental, +Daño Elemental y +40 EM adicional para todo el equipo."
      },
      {
        "name": "Memorias de Sacrificio (Sacrificial Fragments)",
        "rarity": 4,
        "type": "Mejor 4★ Gacha",
        "note": "+221 Maestría Elemental pura para llegar fácilmente a 1,000 EM."
      },
      {
        "name": "Guía Mágica (Magic Guide R5)",
        "rarity": 3,
        "type": "Mejor F2P 3★",
        "note": "+187 Maestría Elemental y +24% daño contra enemigos afectados por Hydro o Electro."
      },
      {
        "name": "Sinfonía de los Merodeadores / Estrella del Vagabundo",
        "rarity": 4,
        "type": "Opciones 4★",
        "note": "Vagabundo comparte ATQ según su EM; Sinfonía otorga Daño Crítico alto."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Recuerdos del Bosque / Deepwood Memories (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "-30% Resistencia Dendro a los enemigos marcados con la habilidad E (crucial para todo equipo Dendro)."
      },
      {
        "set": "Sueños Áureos (4 piezas)",
        "type": "Alternativa Sub-DPS",
        "bonus": "Solo si otro compañero del equipo (ej. Zhongli, Kuki o Baizhu) ya lleva Recuerdos del Bosque."
      }
    ],
    "mainStats": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental o Bono Daño Dendro%",
      "circlet": "Maestría Elemental o Prob. Crítica%"
    },
    "substatsPriority": [
      "1. Maestría Elemental (Meta: 800 – 1,000 EM)",
      "2. Prob. Crítica / Daño Crítico (A4 otorga hasta +24% CR y +80% Daño en Tri-Karma)",
      "3. Recarga de Energía% (120% – 135%)",
      "4. ATQ%"
    ],
    "talentPriority": "Habilidad Elemental (E - Tri-Karma) >>> Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "16,000",
      "atk": "1,200",
      "def": "700",
      "em": "850 – 1,000 EM",
      "er": "125% – 135% ER",
      "crit": "50%+ CR / 130%+ CD"
    },
    "metaTeams": [
      {
        "name": "Alhaitham Quickbloom",
        "comp": "Alhaitham • Nahida • Xingqiu • Yelan",
        "members": [
          "Alhaitham",
          "Nahida",
          "Xingqiu",
          "Yelan"
        ]
      },
      {
        "name": "Nilou Bountiful Bloom",
        "comp": "Nilou • Nahida • Kokomi • Baizhu",
        "members": [
          "Nilou",
          "Nahida",
          "Kokomi",
          "Baizhu"
        ]
      },
      {
        "name": "Cyno / Clorinde Quickbloom",
        "comp": "Cyno • Clorinde • Nahida • Furina",
        "members": [
          "Cyno",
          "Clorinde",
          "Nahida",
          "Furina"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "1,200",
      "def": "700",
      "em": "850 – 1,000 EM",
      "er": "125% – 135% ER",
      "crit": "50%+ CR / 130%+ CD"
    },
    "baseStats": {
      "hp90": 10349,
      "atk90": 299,
      "def90": 630,
      "ascStat": "Maestría Elemental",
      "ascVal": "115.2"
    },
    "talentsData": {
      "normal": {
        "name": "Forma Akádika",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          40,
          44.4,
          48.9,
          53.3,
          57.8,
          62.2,
          66.7,
          71.1,
          75.6,
          80,
          84.8,
          89.6,
          94.4
        ]
      },
      "skill": {
        "name": "Esquemas Universales: Purificación Tri-Karma E",
        "scaleStat": "EM",
        "unit": "% ATQ + % EM",
        "mvByLevel": [
          185,
          205.6,
          226.1,
          246.7,
          267.2,
          287.8,
          308.3,
          328.9,
          349.4,
          370,
          392.2,
          414.4,
          436.6
        ]
      },
      "burst": {
        "name": "Corazón Ilusorio Q (Bono de Daño de Tri-Karma)",
        "scaleStat": "EM",
        "unit": "% Bono Daño",
        "mvByLevel": [
          20,
          22.2,
          24.4,
          26.7,
          28.9,
          31.1,
          33.3,
          35.6,
          37.8,
          40,
          42.4,
          44.8,
          47.2
        ]
      }
    },
    "statPriority": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental o Bono Daño Dendro%",
      "circlet": "Maestría Elemental o Prob. Crítica%",
      "substats": "1. Maestría Elemental (Meta: 800 – 1,000 EM) > 2. Prob. Crítica / Daño Crítico (A4 otorga hasta +24% CR y +80% Daño en Tri-Karma) > 3. Recarga de Energía% (120% – 135%) > 4. ATQ%"
    }
  },
  {
    "id": "navia",
    "name": {
      "es": "Navia",
      "en": "Navia"
    },
    "element": "Geo",
    "rarity": 5,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Navia.png",
    "tier": "T0 Quickswap DPS",
    "role": "Hypercarry Geo de Disparos de Escopeta Paragüas (Cristalización)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% & Multiplicador de Balas de Fragmentación (Shrapnel)",
    "bestWeapons": [
      {
        "name": "Sentencia (Verdict)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Prob. Crítica, +20% ATQ y hasta +36% daño en Habilidad Elemental con Cristalización."
      },
      {
        "name": "Médula de la Serpiente Marina",
        "rarity": 4,
        "type": "Mejor 4★",
        "note": "+Prob. Crítica y hasta +50% daño directo en sus disparos de escopeta."
      },
      {
        "name": "Lápida del Lobo / Espadón Cornirrojo",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Stat-sticks descomunales de ATQ% o Daño Crítico."
      },
      {
        "name": "Superespada Mágica Suprema (Ultimate Overlord)",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "Arma de evento con recarga y hasta +48% ATQ% pasivo."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Murmullo del Bosque Reverberante (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+18% ATQ y hasta +50% Bono Daño Geo continuo con escudos de Cristalización."
      },
      {
        "set": "Cazador Fantasmal (4 piezas)",
        "type": "BiS con Furina",
        "bonus": "+36% Prob. Crítica si se juega junto a Furina."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Geo%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ%",
      "3. Recarga de Energía% (120% – 135% ER)",
      "4. DEF%"
    ],
    "talentPriority": "Habilidad Elemental (E) >>> Definitiva (Q) = Ataques Normales",
    "benchmarks": {
      "hp": "18,000",
      "atk": "2,200 – 2,600 ATQ",
      "def": "800",
      "em": "0",
      "er": "125% – 135% ER",
      "crit": "75%+ CR / 170%+ CD"
    },
    "metaTeams": [
      {
        "name": "Navia Double Pyro",
        "comp": "Navia • Zhongli • Chiori • Bennett",
        "members": [
          "Navia",
          "Zhongli",
          "Chiori",
          "Bennett"
        ]
      },
      {
        "name": "Navia-Furina Core",
        "comp": "Navia • Furina • Xilonen • Bennett",
        "members": [
          "Navia",
          "Furina",
          "Xilonen",
          "Bennett"
        ]
      },
      {
        "name": "Navia Plunge",
        "comp": "Navia • Xianyun • Furina • Chiori",
        "members": [
          "Navia",
          "Xianyun",
          "Furina",
          "Chiori"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "2,200 – 2,600 ATQ",
      "def": "800",
      "em": "0",
      "er": "125% – 135% ER",
      "crit": "75%+ CR / 170%+ CD"
    },
    "baseStats": {
      "hp90": 12648,
      "atk90": 352,
      "def90": 793,
      "ascStat": "Daño Crítico",
      "ascVal": "38.4%"
    },
    "talentsData": {
      "normal": {
        "name": "Rechazo Blunt",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          93.5,
          103.9,
          114.3,
          124.7,
          135.1,
          145.4,
          155.8,
          166.2,
          176.6,
          187,
          198.2,
          209.4,
          220.7
        ]
      },
      "skill": {
        "name": "Disparo Rosácea E (11 Balas de Fragmentación)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          398,
          432.7,
          467.3,
          502,
          536.7,
          571.3,
          606,
          640.7,
          675.3,
          710,
          752.6,
          795.2,
          837.8
        ]
      },
      "burst": {
        "name": "Salva de Cañonazos Q (Por Bombardeo)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          75,
          83.3,
          91.7,
          100,
          108.3,
          116.7,
          125,
          133.3,
          141.7,
          150,
          159,
          168,
          177
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Geo%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% > 3. Recarga de Energía% (120% – 135% ER) > 4. DEF%"
    }
  },
  {
    "id": "neuvillette",
    "name": {
      "es": "Neuvillette",
      "en": "Neuvillette"
    },
    "element": "Hydro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Neuvillette.png",
    "tier": "T0 Hypercarry DPS",
    "role": "Hypercarry DPS en Campo (Rayo Cargado en Área)",
    "roleCategory": "main_dps",
    "scalingType": "HP",
    "scalingLabel": "Escalado 100% Vida Máxima (HP%) — Ignorar ATQ",
    "bestWeapons": [
      {
        "name": "Escrituras del Fluir Sempiterno",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+88.2% Daño Crítico, +Vida% y regeneración masiva de energía."
      },
      {
        "name": "Jade Sacrificial",
        "rarity": 4,
        "type": "Mejor 4★",
        "note": "+36.8% Prob. Crítica y +64% Vida Máxima tras estar fuera de campo."
      },
      {
        "name": "Prototipo Ámbar",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "Forja accesible (+41.3% Vida Máx, cura al equipo y genera energía)."
      },
      {
        "name": "Oración Perdida a los Vientos Sagrados",
        "rarity": 5,
        "type": "Alternativa 5★",
        "note": "Stat-stick de Prob. Crítica y bono de velocidad/daño."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Cazador Fantasmal (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+36% Prob. Crítica permanente por fluctuaciones de Vida."
      },
      {
        "set": "Corazón de las Profundidades (4 piezas)",
        "type": "Alternativa",
        "bonus": "+15% Bono Hydro y +30% Daño en Ataques Cargados."
      },
      {
        "set": "2p Vida+20% + 2p Hydro+15%",
        "type": "Transición 2p+2p",
        "bonus": "Excelente alternativa mientras se farmea Cazador Fantasmal."
      }
    ],
    "mainStats": {
      "sands": "Vida%",
      "goblet": "Bono Daño Hydro% o Vida% (con Furina + Kazuha)",
      "circlet": "Daño Crítico% (o Prob. CR si falta)"
    },
    "substatsPriority": [
      "1. Prob. Crítica (tope 64% con Cazador) / Daño Crítico",
      "2. Vida% (hasta 40,000+ HP)",
      "3. Recarga de Energía% (110% - 130%)",
      "❌ ATQ% no tiene ningún impacto"
    ],
    "talentPriority": "Ataque Normal/Cargado (NA) >>> Habilidad Elemental (E) = Definitiva (Q)",
    "benchmarks": {
      "hp": "38,000 – 45,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0 – 80 EM",
      "er": "115% – 130% ER",
      "crit": "60% CR / 240%+ CD"
    },
    "metaTeams": [
      {
        "name": "Neuvillette Hyper Solo Carry",
        "comp": "Neuvillette • Furina • Kazuha • Baizhu",
        "members": [
          "Neuvillette",
          "Furina",
          "Kazuha",
          "Baizhu"
        ]
      },
      {
        "name": "Neuvillette Taser F2P",
        "comp": "Neuvillette • Fischl • Beidou • Sucrose",
        "members": [
          "Neuvillette",
          "Fischl",
          "Beidou",
          "Sucrose"
        ]
      },
      {
        "name": "Neuvillette Vaporize",
        "comp": "Neuvillette • Xiangling • Kazuha • Zhongli",
        "members": [
          "Neuvillette",
          "Xiangling",
          "Kazuha",
          "Zhongli"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "38,000 – 45,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0 – 80 EM",
      "er": "115% – 130% ER",
      "crit": "60% CR / 240%+ CD"
    },
    "baseStats": {
      "hp90": 14695,
      "atk90": 208,
      "def90": 576,
      "ascStat": "Daño Crítico",
      "ascVal": "38.4%"
    },
    "talentsData": {
      "normal": {
        "name": "Sentencia Firme (Rayo Cargado por Tick)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          7.3,
          8.1,
          8.9,
          9.7,
          10.5,
          11.3,
          12.1,
          12.9,
          13.7,
          14.5,
          15.4,
          16.2,
          17.1
        ]
      },
      "skill": {
        "name": "Lágrimas de la Catarsis (Golpe E)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          12.9,
          14,
          15.1,
          16.3,
          17.4,
          18.6,
          19.7,
          20.9,
          22,
          23.1,
          24.5,
          25.9,
          27.3
        ]
      },
      "burst": {
        "name": "Retorno a la Marea (Golpe Primario Q)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          22.3,
          24.2,
          26.2,
          28.2,
          30.2,
          32.2,
          34.1,
          36.1,
          38.1,
          40.1,
          42.5,
          44.9,
          47.3
        ]
      }
    },
    "statPriority": {
      "sands": "Vida%",
      "goblet": "Bono Daño Hydro% o Vida% (con Furina + Kazuha)",
      "circlet": "Daño Crítico% (o Prob. CR si falta)",
      "substats": "1. Prob. Crítica (tope 64% con Cazador) / Daño Crítico > 2. Vida% (hasta 40,000+ HP) > 3. Recarga de Energía% (110% - 130%) > ❌ ATQ% no tiene ningún impacto"
    }
  },
  {
    "id": "nilou",
    "name": {
      "es": "Nilou",
      "en": "Nilou"
    },
    "element": "Hydro",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Nilou.png",
    "tier": "T0 Bloom Driver",
    "role": "Reina del Florecimiento Abundante (Bountiful Cores)",
    "roleCategory": "sub_dps",
    "scalingType": "HP",
    "scalingLabel": "Escalado Puro por Vida Máxima (Tope Pasiva A4 en 74,444 HP)",
    "bestWeapons": [
      {
        "name": "Llave de la Coronación",
        "rarity": 5,
        "type": "BiS Absoluto",
        "note": "+86.2% Vida Máxima y convierte Vida en Maestría Elemental masiva para el equipo."
      },
      {
        "name": "Espada de Madera / Luz Lunar de Xifos",
        "rarity": 4,
        "type": "Mejores 4★",
        "note": "Aportan recarga y Maestría Elemental."
      },
      {
        "name": "Vado del Río Ceniciento / Espina de Hierro",
        "rarity": 4,
        "type": "F2P",
        "note": "Espina de Hierro da EM pura; Vado da recarga."
      }
    ],
    "bestArtifacts": [
      {
        "set": "2p Vida+20% (Tenacidad) + 2p Vida+20% (Vourukasha)",
        "type": "BiS Óptimo",
        "bonus": "+40% Vida Máxima total para maximizar daño de núcleos de Florecimiento."
      },
      {
        "set": "Flor Olvidada del Paraíso (4 piezas)",
        "type": "Alternativa EM",
        "bonus": "Solo si Nilou detona la mayoría de los núcleos (poco habitual)."
      }
    ],
    "mainStats": {
      "sands": "Vida%",
      "goblet": "Vida%",
      "circlet": "Vida%"
    },
    "substatsPriority": [
      "1. Vida% y Vida Plana (Meta: acercarse lo más posible a 74,444 HP)",
      "2. Maestría Elemental",
      "3. Recarga de Energía%"
    ],
    "talentPriority": "Habilidad Elemental (E) = Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "65,000 – 74,400 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "200 – 400 EM",
      "er": "130% – 150% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "Nilou Superbloom Premium",
        "comp": "Nilou • Nahida • Kokomi • Baizhu",
        "members": [
          "Nilou",
          "Nahida",
          "Kokomi",
          "Baizhu"
        ]
      },
      {
        "name": "Nilou Bloom F2P",
        "comp": "Nilou • Viajero Dendro • Collei • Bárbara",
        "members": [
          "Nilou",
          "Viajero Dendro",
          "Collei",
          "Bárbara"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "65,000 – 74,400 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "200 – 400 EM",
      "er": "130% – 150% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 15185,
      "atk90": 230,
      "def90": 729,
      "ascStat": "Vida%",
      "ascVal": "28.8%"
    },
    "talentsData": {
      "normal": {
        "name": "Danza de la Luna Creciente",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          50.3,
          55.9,
          61.5,
          67.1,
          72.7,
          78.2,
          83.8,
          89.4,
          95,
          100.6,
          106.6,
          112.7,
          118.7
        ]
      },
      "skill": {
        "name": "Danza de los Siete Reinos: Paso Giratorio E",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          5.5,
          6,
          6.5,
          7,
          7.5,
          7.9,
          8.4,
          8.9,
          9.4,
          9.9,
          10.5,
          11.1,
          11.7
        ]
      },
      "burst": {
        "name": "Danza de Abzendegi: Lirio Lejano Q",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          24.7,
          26.9,
          29.1,
          31.3,
          33.5,
          35.7,
          37.9,
          40.1,
          42.3,
          44.5,
          47.2,
          49.8,
          52.5
        ]
      }
    },
    "statPriority": {
      "sands": "Vida%",
      "goblet": "Vida%",
      "circlet": "Vida%",
      "substats": "1. Vida% y Vida Plana (Meta: acercarse lo más posible a 74,444 HP) > 2. Maestría Elemental > 3. Recarga de Energía%"
    }
  },
  {
    "id": "noelle",
    "name": {
      "es": "Noelle",
      "en": "Noelle"
    },
    "element": "Geo",
    "rarity": 4,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Noel.png",
    "tier": "T1 Furina Driver / DPS",
    "role": "Carry Geo de Barrido Masivo, Healer de Equipo & Escudo en C6",
    "roleCategory": "main_dps",
    "scalingType": "DEF",
    "scalingLabel": "Definitiva en C6 convierte más del 130% de su DEF en ATQ gigante",
    "bestWeapons": [
      {
        "name": "Espadón Cornirrojo (Redhorn)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+88.2% Daño Crítico, +DEF% y aumento de daño plano en sus barridos normales."
      },
      {
        "name": "Médula de la Serpiente Marina",
        "rarity": 4,
        "type": "Mejor 4★ Pase",
        "note": "+Prob. Crítica y hasta +50% daño directo continuo."
      },
      {
        "name": "Sombra Blanca (Whiteblind R5)",
        "rarity": 4,
        "type": "Mejor F2P Forja",
        "note": "Aporte masivo de hasta +99.7% DEF total de forma gratuita."
      },
      {
        "name": "Gran Espada de Favonius",
        "rarity": 4,
        "type": "Batería Cómoda",
        "note": "Si el equipo no tiene baterías Geo externas."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Cazador Fantasmal (4 piezas)",
        "type": "BiS con Furina",
        "bonus": "+36% Prob. Crítica permanente al jugarla como Healer/Driver junto a Furina."
      },
      {
        "set": "Cáscara de Sueños Opulentos (4 piezas)",
        "type": "BiS Tradicional",
        "bonus": "+54% DEF y +24% Bono Daño Geo."
      }
    ],
    "mainStats": {
      "sands": "DEF%",
      "goblet": "Bono Daño Geo%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. DEF%",
      "3. Recarga de Energía% (130% - 145% ER)",
      "4. ATQ%"
    ],
    "talentPriority": "Ataque Normal (Barridos) = Definitiva (Q) > Habilidad Elemental (E)",
    "benchmarks": {
      "hp": "18,000",
      "atk": "Base 1,200 (Buff Q: 4,000+)",
      "def": "2,200 – 2,600 DEF",
      "em": "0",
      "er": "135% – 145% ER",
      "crit": "70%+ CR / 160%+ CD"
    },
    "metaTeams": [
      {
        "name": "Noelle-Furina Hypercarry",
        "comp": "Noelle • Furina • Chiori • Albedo",
        "members": [
          "Noelle",
          "Furina",
          "Chiori",
          "Albedo"
        ]
      },
      {
        "name": "Noelle Triple Hydro",
        "comp": "Noelle • Furina • Yelan • Xingqiu",
        "members": [
          "Noelle",
          "Furina",
          "Yelan",
          "Xingqiu"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "Base 1,200 (Buff Q: 4,000+)",
      "def": "2,200 – 2,600 DEF",
      "em": "0",
      "er": "135% – 145% ER",
      "crit": "70%+ CR / 160%+ CD"
    },
    "baseStats": {
      "hp90": 12071,
      "atk90": 191,
      "def90": 799,
      "ascStat": "DEF%",
      "ascVal": "30.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Técnica de Espada Favonius: Doncella",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          79.2,
          88,
          96.8,
          105.6,
          114.4,
          123.2,
          132,
          140.8,
          149.6,
          158.4,
          167.9,
          177.4,
          186.9
        ]
      },
      "skill": {
        "name": "Guardia del Corazón E: Escudo y Curación",
        "scaleStat": "DEF",
        "unit": "% DEF",
        "mvByLevel": [
          160,
          174.2,
          188.4,
          202.7,
          216.9,
          231.1,
          245.3,
          259.6,
          273.8,
          288,
          305.3,
          322.6,
          339.8
        ]
      },
      "burst": {
        "name": "Brazo Fantasma Q: Conversión DEF a ATQ (% DEF C6)",
        "scaleStat": "DEF",
        "unit": "% Conversión DEF",
        "mvByLevel": [
          40,
          43.6,
          47.1,
          50.7,
          54.2,
          57.8,
          61.3,
          64.9,
          68.4,
          72,
          76.3,
          80.6,
          85
        ]
      }
    },
    "statPriority": {
      "sands": "DEF%",
      "goblet": "Bono Daño Geo%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. DEF% > 3. Recarga de Energía% (130% - 145% ER) > 4. ATQ%"
    }
  },
  {
    "id": "raiden",
    "name": {
      "es": "Raiden Shogun",
      "en": "Raiden Shogun"
    },
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Shougun.png",
    "tier": "T0 Battery & Burst DPS",
    "role": "Batería Universal de Equipo, Buffer de Definitivas & Burst DPS",
    "roleCategory": "main_dps",
    "scalingType": "ER",
    "scalingLabel": "Escalado por Recarga de Energía (Pasiva A4 convierte ER en Bono Electro y regeneración)",
    "bestWeapons": [
      {
        "name": "Luz del Segador (Engulfing Lightning)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+55.1% Recarga de Energía, convierte ER en hasta +80% ATQ y da +30% ER al tirar Q."
      },
      {
        "name": "La Captura (The Catch R5)",
        "rarity": 4,
        "type": "Mejor 4★ F2P",
        "note": "+45.9% Recarga de Energía, +32% Daño en la Definitiva y +12% Prob. Crítica en Q."
      },
      {
        "name": "Halcón de Jade Primordial / Báculo de Homa",
        "rarity": 5,
        "type": "Opciones 5★ Daño",
        "note": "Stat-sticks de Crítico descomunales."
      },
      {
        "name": "Lanza de Favonius",
        "rarity": 4,
        "type": "Batería Máxima",
        "note": "Aporte masivo de partículas blancas para el equipo."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Emblema del Destino (4 piezas)",
        "type": "BiS Obligatorio",
        "bonus": "Convierte el 25% de su Recarga de Energía en hasta +75% de Daño en su Definitiva Musou no Hitotachi."
      },
      {
        "set": "Flor Olvidada del Paraíso (4 piezas)",
        "type": "Solo en Hyperbloom",
        "bonus": "Solo si se juega como activadora de Hyperbloom a Full EM con su habilidad E."
      }
    ],
    "mainStats": {
      "sands": "Recarga de Energía% (con La Captura) o ATQ% (con Luz del Segador)",
      "goblet": "Bono Daño Electro% o ATQ%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. Recarga de Energía% (250% - 280% ER)",
      "3. ATQ%",
      "4. Maestría Elemental"
    ],
    "talentPriority": "Definitiva (Q) >>> Habilidad Elemental (E) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "19,000",
      "atk": "1,800 – 2,200 ATQ",
      "def": "800",
      "em": "0 – 80 EM",
      "er": "250% – 280% ER",
      "crit": "65%+ CR / 150%+ CD"
    },
    "metaTeams": [
      {
        "name": "Raiden National (Rational)",
        "comp": "Raiden Shogun • Xiangling • Xingqiu • Yelan",
        "members": [
          "Raiden Shogun",
          "Xiangling",
          "Xingqiu",
          "Yelan"
        ]
      },
      {
        "name": "Raiden Hypercarry",
        "comp": "Raiden Shogun • Sara • Kazuha • Bennett",
        "members": [
          "Raiden Shogun",
          "Sara",
          "Kazuha",
          "Bennett"
        ]
      },
      {
        "name": "Raiden Hyperbloom (EM)",
        "comp": "Raiden • Nahida • Xingqiu • Baizhu",
        "members": [
          "Raiden",
          "Nahida",
          "Xingqiu",
          "Baizhu"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "19,000",
      "atk": "1,800 – 2,200 ATQ",
      "def": "800",
      "em": "0 – 80 EM",
      "er": "250% – 280% ER",
      "crit": "65%+ CR / 150%+ CD"
    },
    "baseStats": {
      "hp90": 12907,
      "atk90": 337,
      "def90": 789,
      "ascStat": "Recarga Energía",
      "ascVal": "32.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Técnica de Lanza Genryuu",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          39.6,
          44,
          48.4,
          52.8,
          57.2,
          61.6,
          66,
          70.4,
          74.8,
          79.2,
          84,
          88.7,
          93.5
        ]
      },
      "skill": {
        "name": "Ojo de la Penitencia E (% Daño Coordinado)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          42,
          45.7,
          49.5,
          53.2,
          56.9,
          60.7,
          64.4,
          68.1,
          71.9,
          75.6,
          80.1,
          84.7,
          89.2
        ]
      },
      "burst": {
        "name": "Musou no Hitotachi Q (Golpe Inicial Nuke con 60 Cargas de Resuelto)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          441,
          472.1,
          503.2,
          534.3,
          565.4,
          596.6,
          627.7,
          658.8,
          689.9,
          721,
          764.3,
          807.5,
          850.8
        ]
      }
    },
    "statPriority": {
      "sands": "Recarga de Energía% (con La Captura) o ATQ% (con Luz del Segador)",
      "goblet": "Bono Daño Electro% o ATQ%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. Recarga de Energía% (250% - 280% ER) > 3. ATQ% > 4. Maestría Elemental"
    }
  },
  {
    "id": "kokomi",
    "name": {
      "es": "Sangonomiya Kokomi",
      "en": "Sangonomiya Kokomi"
    },
    "element": "Hydro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Kokomi.png",
    "tier": "T0 Healer / Enabler",
    "role": "Healer Universal, Aplicadora Hydro en Área & Driver",
    "roleCategory": "healer_shielder",
    "scalingType": "HP",
    "scalingLabel": "Escalado por Vida Máx y Bono de Curación (-100% Prob. Crítica)",
    "bestWeapons": [
      {
        "name": "Luna Inalterable",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Vida Máx, Bono de Curación y regeneración de energía al golpear en Q."
      },
      {
        "name": "Prototipo Ámbar",
        "rarity": 4,
        "type": "Mejor 4★ / F2P",
        "note": "Mejor arma global: genera energía para la Q y cura a todo el equipo."
      },
      {
        "name": "Cuento de Cazadores de Dragones (TTDS)",
        "rarity": 3,
        "type": "Buffer 3★",
        "note": "+48% ATQ para el Hypercarry al cambiar de personaje."
      },
      {
        "name": "Memorias de Sacrificio",
        "rarity": 4,
        "type": "Nilou Bloom",
        "note": "Reinicia la medusa E y aporta gran Maestría Elemental."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Perla Oceánica (4 piezas)",
        "type": "BiS Daño/Cura",
        "bonus": "Burbuja de daño físico de hasta 30,000 cada 3.5 segundos con curación."
      },
      {
        "set": "Tenacidad de la Geoarmada (4 piezas)",
        "type": "Soporte Freeze",
        "bonus": "+20% ATQ constante para Ayaka o Ganyu con la medusa E."
      }
    ],
    "mainStats": {
      "sands": "Vida% o Recarga de Energía%",
      "goblet": "Vida% o Bono Daño Hydro%",
      "circlet": "Bono de Curación%"
    },
    "substatsPriority": [
      "1. Bono de Curación (Pasiva A4 convierte cura en daño)",
      "2. Vida%",
      "3. Recarga de Energía% (140% - 160%)",
      "❌ El Crítico es matemáticamente inútil"
    ],
    "talentPriority": "Habilidad Elemental (E) = Definitiva (Q) > Ataques Normales",
    "benchmarks": {
      "hp": "35,000 – 42,000 HP",
      "atk": "1,100",
      "def": "700",
      "em": "0 – 100 EM",
      "er": "150% – 170% ER",
      "crit": "-100% CR (Ignorar)"
    },
    "metaTeams": [
      {
        "name": "Nilou Bountiful Bloom",
        "comp": "Nilou • Nahida • Kokomi • Alhaitham",
        "members": [
          "Nilou",
          "Nahida",
          "Kokomi",
          "Alhaitham"
        ]
      },
      {
        "name": "Ayaka Permafrost",
        "comp": "Ayaka • Shenhe • Kazuha • Kokomi",
        "members": [
          "Ayaka",
          "Shenhe",
          "Kazuha",
          "Kokomi"
        ]
      },
      {
        "name": "Sukokomon",
        "comp": "Kokomi • Xiangling • Fischl • Sucrose",
        "members": [
          "Kokomi",
          "Xiangling",
          "Fischl",
          "Sucrose"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "35,000 – 42,000 HP",
      "atk": "1,100",
      "def": "700",
      "em": "0 – 100 EM",
      "er": "150% – 170% ER",
      "crit": "-100% CR (Ignorar)"
    },
    "baseStats": {
      "hp90": 13471,
      "atk90": 222,
      "def90": 657,
      "ascStat": "Bono Hydro",
      "ascVal": "28.8%"
    },
    "talentsData": {
      "normal": {
        "name": "Forma del Agua (Ataque Normal)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          68.4,
          74.5,
          80.6,
          86.6,
          92.7,
          98.8,
          104.9,
          110.9,
          117,
          123.1,
          130.5,
          137.9,
          145.3
        ]
      },
      "skill": {
        "name": "Juramento de Kurage: Curación Medusa E",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          4.4,
          4.8,
          5.2,
          5.6,
          6,
          6.4,
          6.7,
          7.1,
          7.5,
          7.9,
          8.4,
          8.8,
          9.3
        ]
      },
      "burst": {
        "name": "Encarnación de las Nereidas (Bono Daño Q)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          4.8,
          5.3,
          5.7,
          6.1,
          6.6,
          7,
          7.4,
          7.9,
          8.3,
          8.7,
          9.2,
          9.7,
          10.3
        ]
      }
    },
    "statPriority": {
      "sands": "Vida% o Recarga de Energía%",
      "goblet": "Vida% o Bono Daño Hydro%",
      "circlet": "Bono de Curación%",
      "substats": "1. Bono de Curación (Pasiva A4 convierte cura en daño) > 2. Vida% > 3. Recarga de Energía% (140% - 160%) > ❌ El Crítico es matemáticamente inútil"
    }
  },
  {
    "id": "shenhe",
    "name": {
      "es": "Shenhe",
      "en": "Shenhe"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Shenhe.png",
    "tier": "T0 Cryo Buffer",
    "role": "Buffer Especializada Cryo (Plumas Glaciares Icy Quill con Daño Plano Masivo)",
    "roleCategory": "support",
    "scalingType": "ATK",
    "scalingLabel": "Escalado 100% por ATQ Total (Transfiere su ATQ como Daño Plano a los ataques Cryo del equipo)",
    "bestWeapons": [
      {
        "name": "Perforanubes (Calamity Queller)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "741 ATQ Base descomunal y hasta +38.4% ATQ adicional fuera de campo."
      },
      {
        "name": "Lanza de Favonius",
        "rarity": 4,
        "type": "BiS Utilidad F2P",
        "note": "Resuelve la alta demanda de recarga para lanzar su Definitiva cada rotación."
      },
      {
        "name": "Aleta Cortamareas (Wavebreaker's Fin)",
        "rarity": 4,
        "type": "Máximo ATQ 4★",
        "note": "ATQ Base altísimo (620) y sub-stat de ATQ%."
      },
      {
        "name": "La Captura / Prototipo Estelar",
        "rarity": 4,
        "type": "F2P",
        "note": "Recarga de energía accesible."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Nobleza Obligada (4 piezas)",
        "type": "BiS Soporte Equipo",
        "bonus": "+20% ATQ para todo el equipo tras activar su Definitiva."
      },
      {
        "set": "2p ATQ+18% + 2p ATQ+18%",
        "type": "Máximo Daño Plumas",
        "bonus": "+36% ATQ total para maximizar el valor de cada Pluma Glaciar."
      }
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga de Energía%",
      "goblet": "ATQ%",
      "circlet": "ATQ% (o Prob. CR con Favonius)"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (170% - 200% ER)",
      "2. ATQ% y ATQ Plano (Meta: 3,400 – 4,000 ATQ)",
      "3. Prob. Crítica (si usa Favonius)"
    ],
    "talentPriority": "Habilidad Elemental (E - Plumas) >>> Definitiva (Q) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "17,000",
      "atk": "3,400 – 4,000+ ATQ",
      "def": "800",
      "em": "0",
      "er": "175% – 200% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "Ayaka Mono Cryo / Freeze",
        "comp": "Ayaka • Shenhe • Kazuha • Kokomi",
        "members": [
          "Ayaka",
          "Shenhe",
          "Kazuha",
          "Kokomi"
        ]
      },
      {
        "name": "Wriothesley Freeze",
        "comp": "Wriothesley • Shenhe • Furina • Jean",
        "members": [
          "Wriothesley",
          "Shenhe",
          "Furina",
          "Jean"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "17,000",
      "atk": "3,400 – 4,000+ ATQ",
      "def": "800",
      "em": "0",
      "er": "175% – 200% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 12993,
      "atk90": 304,
      "def90": 830,
      "ascStat": "ATQ%",
      "ascVal": "28.8%"
    },
    "talentsData": {
      "normal": {
        "name": "Lanza Plateada",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          43.3,
          48.1,
          52.9,
          57.7,
          62.5,
          67.4,
          72.2,
          77,
          81.8,
          86.6,
          91.8,
          97,
          102.2
        ]
      },
      "skill": {
        "name": "Espíritu Convocador E: Daño Plano Pluma Glaciar",
        "scaleStat": "ATK",
        "unit": "% ATQ Plano",
        "mvByLevel": [
          45.7,
          49.8,
          53.8,
          57.9,
          61.9,
          66,
          70,
          74.1,
          78.1,
          82.2,
          87.1,
          92.1,
          97
        ]
      },
      "burst": {
        "name": "Encantamiento de la Doncella Q (Reducción RES Cryo/Física)",
        "scaleStat": "ATK",
        "unit": "% RES Shred",
        "mvByLevel": [
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          15.9,
          16.8,
          17.7
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ% o Recarga de Energía%",
      "goblet": "ATQ%",
      "circlet": "ATQ% (o Prob. CR con Favonius)",
      "substats": "1. Recarga de Energía% (170% - 200% ER) > 2. ATQ% y ATQ Plano (Meta: 3,400 – 4,000 ATQ) > 3. Prob. Crítica (si usa Favonius)"
    }
  },
  {
    "id": "sigewinne",
    "name": {
      "es": "Sigewinne",
      "en": "Sigewinne"
    },
    "element": "Hydro",
    "rarity": 5,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Sigewinne.png",
    "tier": "T1 Buffer / Healer",
    "role": "Healer de Equipo & Buffer de Daño de Habilidades Elementales",
    "roleCategory": "healer_shielder",
    "scalingType": "HP",
    "scalingLabel": "Escalado 100% por Vida Máxima (Tope Pasiva A1 en 65,000 HP)",
    "bestWeapons": [
      {
        "name": "Silvershower Heartstrings",
        "rarity": 5,
        "type": "BiS Firma 5★",
        "note": "+Vida% masiva y regeneración de energía."
      },
      {
        "name": "Arco de Favonius (Favonius Warbow)",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Generación de energía constante."
      },
      {
        "name": "Arco Recurvo (Recurve Bow)",
        "rarity": 3,
        "type": "Opción F2P HP",
        "note": "+46.9% Vida gratuita."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Canción de Días Pretéritos (4 piezas)",
        "type": "BiS Soporte",
        "bonus": "Registra su masiva curación y suma hasta 1,200 de daño plano a los ataques."
      },
      {
        "set": "Perla Oceánica (4 piezas)",
        "type": "Alternativa Daño",
        "bonus": "Aporta daño físico pasivo consistente con sus burbujas curativas."
      }
    ],
    "mainStats": {
      "sands": "Vida%",
      "goblet": "Vida%",
      "circlet": "Vida% (o Bono Curación)"
    },
    "substatsPriority": [
      "1. Vida% y Vida Plana (Meta: 65,000 HP para tope del buff)",
      "2. Recarga de Energía% (140% - 160%)"
    ],
    "talentPriority": "Habilidad Elemental (E) >>> Definitiva (Q) >>> Ataques Básicos",
    "benchmarks": {
      "hp": "58,000 – 65,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "140% – 160% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "Furina + Sigewinne Core",
        "comp": "Furina • Sigewinne • Kazuha • Nahida",
        "members": [
          "Furina",
          "Sigewinne",
          "Kazuha",
          "Nahida"
        ]
      },
      {
        "name": "Navia Geo-Hydro",
        "comp": "Navia • Chiori • Furina • Sigewinne",
        "members": [
          "Navia",
          "Chiori",
          "Furina",
          "Sigewinne"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "58,000 – 65,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "140% – 160% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 13348,
      "atk90": 192,
      "def90": 500,
      "ascStat": "Vida%",
      "ascVal": "28.8%"
    },
    "talentsData": {
      "normal": {
        "name": "Disparo Asistencial",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          49.9,
          55.4,
          61,
          66.5,
          72.1,
          77.6,
          83.2,
          88.7,
          94.3,
          99.8,
          105.8,
          111.8,
          117.8
        ]
      },
      "skill": {
        "name": "Burbuja de Rebote E (Curación por Salto)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          4.1,
          4.5,
          4.8,
          5.2,
          5.6,
          5.9,
          6.3,
          6.7,
          7,
          7.4,
          7.8,
          8.3,
          8.7
        ]
      },
      "burst": {
        "name": "Jeringa de Inyección Q (Daño por Tick)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          2,
          2.2,
          2.4,
          2.5,
          2.7,
          2.9,
          3.1,
          3.2,
          3.4,
          3.6,
          3.8,
          4,
          4.2
        ]
      }
    },
    "statPriority": {
      "sands": "Vida%",
      "goblet": "Vida%",
      "circlet": "Vida% (o Bono Curación)",
      "substats": "1. Vida% y Vida Plana (Meta: 65,000 HP para tope del buff) > 2. Recarga de Energía% (140% - 160%)"
    }
  },
  {
    "id": "sucrose",
    "name": {
      "es": "Sucrose (Sacarosa)",
      "en": "Sucrose"
    },
    "element": "Anemo",
    "rarity": 4,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Sucrose.png",
    "tier": "T0 Buffer Reacciones",
    "role": "Buffer de Maestría Elemental (+250 EM a todo el equipo) & Reductora VV",
    "roleCategory": "support",
    "scalingType": "EM",
    "scalingLabel": "Escalado 100% Maestría Elemental (Comparte 20% de su EM con el equipo)",
    "bestWeapons": [
      {
        "name": "Memorias de Sacrificio (Sacrificial Fragments)",
        "rarity": 4,
        "type": "BiS Absoluto",
        "note": "+221 Maestría Elemental y reinicia su habilidad E para doble succión."
      },
      {
        "name": "Cuento de Cazadores de Dragones (TTDS)",
        "rarity": 3,
        "type": "Buffer Carry",
        "note": "+48% ATQ para el Hypercarry además de compartir Maestría Elemental."
      },
      {
        "name": "Códice de Favonius",
        "rarity": 4,
        "type": "Batería",
        "note": "Para equipos con alta demanda de recarga."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "type": "BiS Obligatorio",
        "bonus": "-40% RES Elemental para multiplicar el daño del equipo."
      },
      {
        "set": "Instructor (4 piezas)",
        "type": "Soporte de Reacciones",
        "bonus": "+120 de Maestría Elemental a todos los miembros del equipo al causar una reacción elemental."
      }
    ],
    "mainStats": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental"
    },
    "substatsPriority": [
      "1. Maestría Elemental (Meta: 800 – 950 EM)",
      "2. Recarga de Energía% (140% - 160% ER)"
    ],
    "talentPriority": "Habilidad Elemental (E) = Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "16,000",
      "atk": "1,100",
      "def": "700",
      "em": "850 – 950 EM",
      "er": "150% – 170% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "National Team F2P",
        "comp": "Xiangling • Xingqiu • Bennett • Sucrose",
        "members": [
          "Xiangling",
          "Xingqiu",
          "Bennett",
          "Sucrose"
        ]
      },
      {
        "name": "Taser Clásico",
        "comp": "Sucrose • Xingqiu • Beidou • Fischl",
        "members": [
          "Sucrose",
          "Xingqiu",
          "Beidou",
          "Fischl"
        ]
      },
      {
        "name": "Hu Tao VV Vape",
        "comp": "Hu Tao • Xingqiu • Sucrose • Thoma",
        "members": [
          "Hu Tao",
          "Xingqiu",
          "Sucrose",
          "Thoma"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "1,100",
      "def": "700",
      "em": "850 – 950 EM",
      "er": "150% – 170% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 9274,
      "atk90": 170,
      "def90": 703,
      "ascStat": "Bono Anemo",
      "ascVal": "24.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Creación del Viento",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          33.5,
          37.2,
          40.9,
          44.7,
          48.4,
          52.1,
          55.8,
          59.6,
          63.3,
          67,
          71,
          75,
          79.1
        ]
      },
      "skill": {
        "name": "Creación de Espíritu del Viento E",
        "scaleStat": "ATK",
        "unit": "% ATQ + Torbellino",
        "mvByLevel": [
          211,
          229.8,
          248.6,
          267.3,
          286.1,
          304.9,
          323.7,
          342.4,
          361.2,
          380,
          402.8,
          425.6,
          448.4
        ]
      },
      "burst": {
        "name": "Materia Prohibida Isomorfa Q (Absorción Elemental)",
        "scaleStat": "ATK",
        "unit": "% ATQ + Torbellino",
        "mvByLevel": [
          148,
          161.1,
          174.2,
          187.3,
          200.4,
          213.6,
          226.7,
          239.8,
          252.9,
          266,
          282,
          297.9,
          313.9
        ]
      }
    },
    "statPriority": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental",
      "substats": "1. Maestría Elemental (Meta: 800 – 950 EM) > 2. Recarga de Energía% (140% - 160% ER)"
    }
  },
  {
    "id": "tartaglia",
    "name": {
      "es": "Tartaglia",
      "en": "Tartaglia"
    },
    "element": "Hydro",
    "rarity": 5,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Tartaglia.png",
    "tier": "T0.5 Enabler DPS",
    "role": "Enabler Hydro en Área & Burst DPS Nuke",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por Ataque (ATQ%) con Aplicación Hydro Cuadrática",
    "bestWeapons": [
      {
        "name": "Estrella Polar",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Prob. Crítica y hasta +48% ATQ acumulable con todas las habilidades."
      },
      {
        "name": "Agitador del Relámpago / Aqua Simulacra",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Stat-sticks masivos de Daño Crítico."
      },
      {
        "name": "Arco de la Cazadora Esmeralda",
        "rarity": 4,
        "type": "Mejor 4★",
        "note": "Crea vórtices de atracción en área para agrupar y detonar Riptide."
      },
      {
        "name": "Herrumbre / Último Acorde",
        "rarity": 4,
        "type": "Opciones F2P",
        "note": "Herrumbre potencia ataques normales; Último Acorde maximiza el Nuke de Q."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sueño de la Ninfa (4 piezas)",
        "type": "BiS Óptimo",
        "bonus": "+Bono Daño Hydro y +ATQ% al golpear con normales, E y Q."
      },
      {
        "set": "Corazón de las Profundidades (4 piezas)",
        "type": "Alternativa Sólida",
        "bonus": "+15% Bono Hydro y +30% Daño en normales de cuerpo a cuerpo."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Hydro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica (esencial para aplicar Riptide en golpes críticos)",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Maestría Elemental (100 - 150 EM en Vaporize)"
    ],
    "talentPriority": "Definitiva (Q) = Habilidad Elemental (E) >>> Ataques Normales",
    "benchmarks": {
      "hp": "18,000",
      "atk": "1,900 – 2,200 ATQ",
      "def": "800",
      "em": "100 – 160 EM",
      "er": "120% – 135% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "metaTeams": [
      {
        "name": "International Team (Top Meta)",
        "comp": "Tartaglia • Xiangling • Kazuha • Bennett",
        "members": [
          "Tartaglia",
          "Xiangling",
          "Kazuha",
          "Bennett"
        ]
      },
      {
        "name": "Childe Fireworks (Electrocharge)",
        "comp": "Tartaglia • Fischl • Beidou • Bennett",
        "members": [
          "Tartaglia",
          "Fischl",
          "Beidou",
          "Bennett"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "1,900 – 2,200 ATQ",
      "def": "800",
      "em": "100 – 160 EM",
      "er": "120% – 135% ER",
      "crit": "75%+ CR / 160%+ CD"
    },
    "baseStats": {
      "hp90": 13103,
      "atk90": 301,
      "def90": 815,
      "ascStat": "Bono Hydro",
      "ascVal": "28.8%"
    },
    "talentsData": {
      "normal": {
        "name": "Disparo Torrencial (Ataque Normal)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          41.3,
          45.9,
          50.5,
          55,
          59.6,
          64.2,
          68.8,
          73.3,
          77.9,
          82.5,
          87.5,
          92.4,
          97.3
        ]
      },
      "skill": {
        "name": "Oleada Desatada (Cuerpo a Cuerpo E)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          72,
          80,
          88,
          96,
          104,
          112,
          120,
          128,
          136,
          144,
          152.6,
          161.3,
          169.9
        ]
      },
      "burst": {
        "name": "Caos: Luz de la Obliteración (Nuke Cuerpo a Cuerpo Q)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          464,
          505.2,
          546.4,
          587.7,
          628.9,
          670.1,
          711.3,
          752.6,
          793.8,
          835,
          885.1,
          935.2,
          985.3
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Hydro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica (esencial para aplicar Riptide en golpes críticos) > 2. Daño Crítico > 3. ATQ% > 4. Maestría Elemental (100 - 150 EM en Vaporize)"
    }
  },
  {
    "id": "thoma",
    "name": {
      "es": "Thoma",
      "en": "Thoma"
    },
    "element": "Pyro",
    "rarity": 4,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Tohma.png",
    "tier": "T1 Burgeon Trigger",
    "role": "Detonador de Crepitar (Burgeon) a Full EM & Escudo Apilable",
    "roleCategory": "sub_dps",
    "scalingType": "EM_HP",
    "scalingLabel": "Escalado por Maestría Elemental (Burgeon) + HP (Escudo)",
    "bestWeapons": [
      {
        "name": "Cruz de Kitain (Kitain Cross Spear R5)",
        "rarity": 4,
        "type": "BiS Burgeon Forja",
        "note": "+110 Maestría Elemental y restaura energía pasivamente sin requerir críticos."
      },
      {
        "name": "Perdición del Dragón",
        "rarity": 4,
        "type": "Máxima EM",
        "note": "+221 Maestría Elemental para daño máximo en semillas."
      },
      {
        "name": "Lanza de Favonius",
        "rarity": 4,
        "type": "Batería Escudo",
        "note": "Si se juega como escudo puro en equipos de Hu Tao o Yoimiya."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Flor Olvidada del Paraíso (4 piezas)",
        "type": "BiS Burgeon",
        "bonus": "+80% Daño en reacciones de Crepitar."
      },
      {
        "set": "Sueños Áureos (4 piezas)",
        "type": "Alternativa EM",
        "bonus": "+Hasta 230 de Maestría Elemental continua."
      }
    ],
    "mainStats": {
      "sands": "Maestría Elemental o Recarga ER%",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (180% - 210% ER crucial)",
      "2. Maestría Elemental (800 – 950 EM)",
      "3. Vida% (para mayor escudo)"
    ],
    "talentPriority": "Definitiva (Q) = Habilidad Elemental (E) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "22,000",
      "atk": "1,100",
      "def": "750",
      "em": "800 – 900 EM",
      "er": "190% – 220% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "Ayato Burgeon",
        "comp": "Ayato • Nahida • Thoma • Baizhu",
        "members": [
          "Ayato",
          "Nahida",
          "Thoma",
          "Baizhu"
        ]
      },
      {
        "name": "Alhaitham Burgeon",
        "comp": "Alhaitham • Xingqiu • Thoma • Baizhu",
        "members": [
          "Alhaitham",
          "Xingqiu",
          "Thoma",
          "Baizhu"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "22,000",
      "atk": "1,100",
      "def": "750",
      "em": "800 – 900 EM",
      "er": "190% – 220% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 10331,
      "atk90": 202,
      "def90": 751,
      "ascStat": "ATQ%",
      "ascVal": "24.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Lanza Veloz",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          44,
          48.9,
          53.8,
          58.7,
          63.6,
          68.4,
          73.3,
          78.2,
          83.1,
          88,
          93.3,
          98.6,
          103.8
        ]
      },
      "skill": {
        "name": "Bendición Llameante E: Absorción de Escudo",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          7.2,
          7.8,
          8.5,
          9.1,
          9.8,
          10.4,
          11,
          11.7,
          12.3,
          13,
          13.8,
          14.6,
          15.3
        ]
      },
      "burst": {
        "name": "Coraza Ígnea Q (Daño por Colapso Pyro)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          58,
          63.2,
          68.3,
          73.5,
          78.6,
          83.8,
          88.9,
          94.1,
          99.2,
          104.4,
          110.7,
          116.9,
          123.2
        ]
      }
    },
    "statPriority": {
      "sands": "Maestría Elemental o Recarga ER%",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental",
      "substats": "1. Recarga de Energía% (180% - 210% ER crucial) > 2. Maestría Elemental (800 – 950 EM) > 3. Vida% (para mayor escudo)"
    }
  },
  {
    "id": "wanderer",
    "name": {
      "es": "Trotamundos (Scaramouche)",
      "en": "Wanderer"
    },
    "element": "Anemo",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Wanderer.png",
    "tier": "T0.5 Flight Hypercarry",
    "role": "Hypercarry Anemo Volador en Campo (Ataques Normales Rápidos)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Multiplicadores de Ataques Normales durante Vuelo E",
    "bestWeapons": [
      {
        "name": "Reminiscencia de Tulaytullah",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+44.1% Daño Crítico, +10% Velocidad de Ataque y hasta +48% daño en normales."
      },
      {
        "name": "Oración Perdida a los Vientos Sagrados",
        "rarity": 5,
        "type": "Opción 5★ Sólida",
        "note": "+Prob. Crítica y velocidad de movimiento."
      },
      {
        "name": "Sinfonía de los Merodeadores (The Widsith)",
        "rarity": 4,
        "type": "Mejor 4★ Gacha",
        "note": "+55.1% Daño Crítico y buffs explosivos de canción."
      },
      {
        "name": "Cuentos de Dodoco / Fluente Pureza",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "Potencia ataques normales y cargados."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Pabellón del Desierto (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+10% Velocidad de Ataque y +40% Daño en normales/cargados tras un cargado."
      },
      {
        "set": "Reminiscencia de la Purificación (4 piezas)",
        "type": "Alternativa Normales",
        "bonus": "+50% Daño en Ataques Normales a cambio de 15 de energía."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Anemo%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ%",
      "3. Recarga de Energía% (110% – 125% ER)"
    ],
    "talentPriority": "Ataque Normal (NA) = Habilidad Elemental (E) > Definitiva (Q)",
    "benchmarks": {
      "hp": "16,000",
      "atk": "2,000 – 2,400 ATQ",
      "def": "700",
      "em": "0 – 80 EM",
      "er": "115% – 125% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "metaTeams": [
      {
        "name": "Wanderer Hypercarry",
        "comp": "Wanderer • Faruzan • Bennett • Zhongli",
        "members": [
          "Wanderer",
          "Faruzan",
          "Bennett",
          "Zhongli"
        ]
      },
      {
        "name": "Wanderer-Furina Core",
        "comp": "Wanderer • Faruzan • Furina • Mika",
        "members": [
          "Wanderer",
          "Faruzan",
          "Furina",
          "Mika"
        ]
      },
      {
        "name": "Wanderer Taser",
        "comp": "Wanderer • Xingqiu • Yelan • Fischl",
        "members": [
          "Wanderer",
          "Xingqiu",
          "Yelan",
          "Fischl"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "2,000 – 2,400 ATQ",
      "def": "700",
      "em": "0 – 80 EM",
      "er": "115% – 125% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "baseStats": {
      "hp90": 10164,
      "atk90": 328,
      "def90": 607,
      "ascStat": "Prob. Crítica",
      "ascVal": "19.2%"
    },
    "talentsData": {
      "normal": {
        "name": "Ondas Plumíferas (Normales)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          68.7,
          76.3,
          84,
          91.6,
          99.2,
          106.9,
          114.5,
          122.1,
          129.8,
          137.4,
          145.6,
          153.9,
          162.1
        ]
      },
      "skill": {
        "name": "Hanega: Gracia Cantarina E (% Multiplicador Vuelo)",
        "scaleStat": "ATK",
        "unit": "% Daño",
        "mvByLevel": [
          132.9,
          135.2,
          137.4,
          139.7,
          141.9,
          144.2,
          146.4,
          148.7,
          150.9,
          153.2,
          162.4,
          171.6,
          180.8
        ]
      },
      "burst": {
        "name": "Kyougen: Cinco Actos Q (5 Pisotones Nuke)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          147,
          160.1,
          173.1,
          186.2,
          199.3,
          212.3,
          225.4,
          238.5,
          251.5,
          264.6,
          280.5,
          296.4,
          312.2
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Anemo%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% > 3. Recarga de Energía% (110% – 125% ER)"
    }
  },
  {
    "id": "venti",
    "name": {
      "es": "Venti",
      "en": "Venti"
    },
    "element": "Anemo",
    "rarity": 5,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Venti.png",
    "tier": "T0.5 Vortex CC God",
    "role": "Rey del Control de Masas (Vórtice Negro Absoluto) & Batería Elemental",
    "roleCategory": "support",
    "scalingType": "EM",
    "scalingLabel": "Escalado por Maestría Elemental (Daño de Torbellino masivo contra hordas)",
    "bestWeapons": [
      {
        "name": "Elegía del Fin (Elegy for the End)",
        "rarity": 5,
        "type": "BiS 5★ Soporte",
        "note": "+Recarga de Energía, +100 EM para el equipo y +20% ATQ continuo."
      },
      {
        "name": "Último Acorde (The Stringless)",
        "rarity": 4,
        "type": "BiS 4★ Daño",
        "note": "+165 Maestría Elemental y hasta +48% Daño directo en su Vórtice Q."
      },
      {
        "name": "Arco de Favonius",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Garantiza recarga total en cada rotación sin esfuerzo."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "type": "BiS Obligatorio",
        "bonus": "-40% RES Elemental al elemento absorbido en su agujero negro."
      },
      {
        "set": "Emblema del Destino (4 piezas)",
        "type": "Opción Sub-DPS Burst",
        "bonus": "+20% Recarga de Energía y aumenta el daño de la Definitiva hasta un 75% según la Recarga."
      }
    ],
    "mainStats": {
      "sands": "Maestría Elemental (o Recarga ER%)",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental"
    },
    "substatsPriority": [
      "1. Maestría Elemental (700 – 900 EM)",
      "2. Recarga de Energía% (150% - 170% ER)",
      "3. Prob. Crítica (si usa Favonius)"
    ],
    "talentPriority": "Definitiva (Q) >>> Habilidad Elemental (E) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "17,000",
      "atk": "1,300",
      "def": "700",
      "em": "800 – 950 EM",
      "er": "165% – 180% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "Morgana Clásico",
        "comp": "Ganyu • Mona • Venti • Diona",
        "members": [
          "Ganyu",
          "Mona",
          "Venti",
          "Diona"
        ]
      },
      {
        "name": "Ayaka Freeze AoE",
        "comp": "Ayaka • Shenhe • Venti • Kokomi",
        "members": [
          "Ayaka",
          "Shenhe",
          "Venti",
          "Kokomi"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "17,000",
      "atk": "1,300",
      "def": "700",
      "em": "800 – 950 EM",
      "er": "165% – 180% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 10531,
      "atk90": 263,
      "def90": 669,
      "ascStat": "Recarga Energía",
      "ascVal": "32.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Puntería Divina",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          44.5,
          49.4,
          54.4,
          59.3,
          64.3,
          69.2,
          74.2,
          79.1,
          84.1,
          89,
          94.3,
          99.7,
          105
        ]
      },
      "skill": {
        "name": "Sonata Celestial E",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          276,
          300.5,
          325.1,
          349.6,
          374.1,
          398.7,
          423.2,
          447.7,
          472.3,
          496.8,
          526.6,
          556.4,
          586.2
        ]
      },
      "burst": {
        "name": "Gran Oda al Viento Q (20 Ticks de Succión)",
        "scaleStat": "ATK",
        "unit": "% ATQ + Torbellino",
        "mvByLevel": [
          37.8,
          41.2,
          44.5,
          47.9,
          51.2,
          54.6,
          57.9,
          61.3,
          64.6,
          68,
          72.1,
          76.2,
          80.2
        ]
      }
    },
    "statPriority": {
      "sands": "Maestría Elemental (o Recarga ER%)",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental",
      "substats": "1. Maestría Elemental (700 – 900 EM) > 2. Recarga de Energía% (150% - 170% ER) > 3. Prob. Crítica (si usa Favonius)"
    }
  },
  {
    "id": "wriothesley",
    "name": {
      "es": "Wriothesley",
      "en": "Wriothesley"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Wriothesley.png",
    "tier": "T0.5 Cryo Boxer DPS",
    "role": "Hypercarry Cryo de Puñetazos Normales y Cargados en Campo",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Multiplicadores de Puñetazos durante estado E",
    "bestWeapons": [
      {
        "name": "Supervisión del Tesoro (Cashflow Supervision)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Prob. Crítica, +ATQ% y hasta +42% daño en normales/cargados y +8% Velocidad de Ataque."
      },
      {
        "name": "Escrituras del Fluir Sempiterno / Tulaytullah",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Stat-sticks descomunales de Daño Crítico."
      },
      {
        "name": "Sinfonía de los Merodeadores (The Widsith)",
        "rarity": 4,
        "type": "Mejor 4★ Gacha",
        "note": "+55.1% Daño Crítico y canciones de alto valor."
      },
      {
        "name": "Fluente Pureza (Flowing Purity R5)",
        "rarity": 4,
        "type": "Mejor F2P Forja",
        "note": "Forja de Fontaine: +Bono Daño Elemental al curar Pacto de Vida."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Cazador Fantasmal (4 piezas)",
        "type": "BiS Absoluto",
        "bonus": "+36% Prob. Crítica gratuita al perder y recuperar vida con sus puñetazos reforzados."
      },
      {
        "set": "Reminiscencia de la Purificación (4 piezas)",
        "type": "Alternativa Normales",
        "bonus": "+50% Daño en Ataques Normales y Cargados."
      }
    ],
    "mainStats": {
      "sands": "ATQ% o Maestría Elemental (en Melt)",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Daño Crítico% (o Prob. CR)"
    },
    "substatsPriority": [
      "1. Daño Crítico / Prob. Crítica (tope 64% con Cazador)",
      "2. ATQ%",
      "3. Maestría Elemental (100 – 180 EM en Melt)",
      "4. Recarga de Energía%"
    ],
    "talentPriority": "Ataque Normal (Puñetazos) >>> Habilidad Elemental (E) > Definitiva (Q)",
    "benchmarks": {
      "hp": "18,000",
      "atk": "2,000 – 2,400 ATQ",
      "def": "800",
      "em": "100 – 160 EM (en Melt)",
      "er": "115% – 125% ER",
      "crit": "60% CR / 210%+ CD"
    },
    "metaTeams": [
      {
        "name": "Wriothesley Burn-Melt",
        "comp": "Wriothesley • Nahida • Thoma • Bennett",
        "members": [
          "Wriothesley",
          "Nahida",
          "Thoma",
          "Bennett"
        ]
      },
      {
        "name": "Wriothesley Freeze con Furina",
        "comp": "Wriothesley • Furina • Shenhe • Jean",
        "members": [
          "Wriothesley",
          "Furina",
          "Shenhe",
          "Jean"
        ]
      },
      {
        "name": "Wriothesley Hyper",
        "comp": "Wriothesley • Shenhe • Kazuha • Bennett",
        "members": [
          "Wriothesley",
          "Shenhe",
          "Kazuha",
          "Bennett"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "2,000 – 2,400 ATQ",
      "def": "800",
      "em": "100 – 160 EM (en Melt)",
      "er": "115% – 125% ER",
      "crit": "60% CR / 210%+ CD"
    },
    "baseStats": {
      "hp90": 12858,
      "atk90": 332,
      "def90": 815,
      "ascStat": "Daño Crítico",
      "ascVal": "38.4%"
    },
    "talentsData": {
      "normal": {
        "name": "Puñetazos Helados (Combo 5 Golpes)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          51.3,
          57,
          62.7,
          68.4,
          74.1,
          79.8,
          85.5,
          91.2,
          96.9,
          102.6,
          108.8,
          114.9,
          121.1
        ]
      },
      "skill": {
        "name": "Colmillos de Hielo E (% Multiplicador Puñetazos)",
        "scaleStat": "ATK",
        "unit": "% Daño",
        "mvByLevel": [
          140,
          143.3,
          146.7,
          150,
          153.3,
          156.7,
          160,
          163.3,
          166.7,
          170,
          180.2,
          190.4,
          200.6
        ]
      },
      "burst": {
        "name": "Mordedura Ártica Q (5 Impactos Nuke)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          127,
          138.3,
          149.6,
          160.9,
          172.2,
          183.4,
          194.7,
          206,
          217.3,
          228.6,
          242.3,
          256,
          269.7
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ% o Maestría Elemental (en Melt)",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Daño Crítico% (o Prob. CR)",
      "substats": "1. Daño Crítico / Prob. Crítica (tope 64% con Cazador) > 2. ATQ% > 3. Maestría Elemental (100 – 180 EM en Melt) > 4. Recarga de Energía%"
    }
  },
  {
    "id": "xiangling",
    "name": {
      "es": "Xiangling",
      "en": "Xiangling"
    },
    "element": "Pyro",
    "rarity": 4,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Xiangling.png",
    "tier": "T0 Off-Field DPS",
    "role": "Reina del Sub-DPS Pyro Off-Field (Pyronado Sin ICD)",
    "roleCategory": "sub_dps",
    "scalingType": "ATK_EM",
    "scalingLabel": "Pyronado hace Snapshot del buff de Bennett y no tiene ICD",
    "bestWeapons": [
      {
        "name": "La Captura (The Catch R5)",
        "rarity": 4,
        "type": "BiS F2P Absoluto",
        "note": "Gratis pescando en Inazuma: +45.9% ER, +32% Daño en Q y +12% CR en Q."
      },
      {
        "name": "Báculo de las Arenas Escarlatas / Báculo de Homa",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Arenas Escarlatas convierte su EM en ATQ masivo."
      },
      {
        "name": "Lanza de Favonius",
        "rarity": 4,
        "type": "Batería Cómoda",
        "note": "Si el equipo tiene problemas de recarga."
      },
      {
        "name": "Perdición del Dragón",
        "rarity": 4,
        "type": "Vape Nuke",
        "note": "Enorme daño en Vaporizado si ya tiene ~200% ER en artefactos."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Emblema del Destino (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "Convierte su alta recarga en hasta +75% de bono de daño para el Pyronado."
      },
      {
        "set": "Bruja Carmesí en Llamas (4 piezas)",
        "type": "Alternativa Vape",
        "bonus": "+15% Bono Pyro y +15% Daño en Vaporizados."
      }
    ],
    "mainStats": {
      "sands": "Recarga de Energía% o ATQ%",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (180% - 220% ER)",
      "2. Prob. Crítica / Daño Crítico (1:2)",
      "3. Maestría Elemental (150 – 250 EM)",
      "4. ATQ%"
    ],
    "talentPriority": "Definitiva (Q) >>> Habilidad Elemental (E) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "18,000",
      "atk": "1,400 – 1,700 ATQ",
      "def": "750",
      "em": "180 – 260 EM",
      "er": "190% – 220% ER",
      "crit": "65%+ CR / 140%+ CD"
    },
    "metaTeams": [
      {
        "name": "Raiden National (Rational)",
        "comp": "Raiden Shogun • Xiangling • Xingqiu • Bennett",
        "members": [
          "Raiden Shogun",
          "Xiangling",
          "Xingqiu",
          "Bennett"
        ]
      },
      {
        "name": "International Team",
        "comp": "Tartaglia • Xiangling • Kazuha • Bennett",
        "members": [
          "Tartaglia",
          "Xiangling",
          "Kazuha",
          "Bennett"
        ]
      },
      {
        "name": "Sukokomon",
        "comp": "Kokomi • Xiangling • Fischl • Sucrose",
        "members": [
          "Kokomi",
          "Xiangling",
          "Fischl",
          "Sucrose"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "1,400 – 1,700 ATQ",
      "def": "750",
      "em": "180 – 260 EM",
      "er": "190% – 220% ER",
      "crit": "65%+ CR / 140%+ CD"
    },
    "baseStats": {
      "hp90": 10875,
      "atk90": 225,
      "def90": 669,
      "ascStat": "Maestría Elemental",
      "ascVal": "96.0"
    },
    "talentsData": {
      "normal": {
        "name": "Técnica de Lanza Kung-Fu",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          42.1,
          46.8,
          51.5,
          56.1,
          60.8,
          65.5,
          70.2,
          74.8,
          79.5,
          84.2,
          89.3,
          94.3,
          99.4
        ]
      },
      "skill": {
        "name": "Ataque de Guoba E (Por Escupitajo)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          111,
          124.9,
          138.8,
          152.7,
          166.6,
          180.4,
          194.3,
          208.2,
          222.1,
          236,
          250.2,
          264.3,
          278.5
        ]
      },
      "burst": {
        "name": "Pyronado Q (Daño por Giro)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          112,
          126,
          140,
          154,
          168,
          182,
          196,
          210,
          224,
          238,
          252.3,
          266.6,
          280.8
        ]
      }
    },
    "statPriority": {
      "sands": "Recarga de Energía% o ATQ%",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Recarga de Energía% (180% - 220% ER) > 2. Prob. Crítica / Daño Crítico (1:2) > 3. Maestría Elemental (150 – 250 EM) > 4. ATQ%"
    }
  },
  {
    "id": "xianyun",
    "name": {
      "es": "Xianyun (Preservadora de Nubes)",
      "en": "Xianyun"
    },
    "element": "Anemo",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Liuyun.png",
    "tier": "T0 Enabler Plunge",
    "role": "Habilitadora Universal de Ataques Descendentes, Healer de Equipo & Buffer de Daño Plano",
    "roleCategory": "support",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ Total (Meta: 4,000 – 4,500 ATQ para tope pasiva A4 de 9,000 daño plano)",
    "bestWeapons": [
      {
        "name": "Llamada del Eco del Eco (Crane's Echoing Call)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+741 ATQ Base descomunal, +28% daño en Ataques Descendentes para el equipo y recarga."
      },
      {
        "name": "Ojo del Juramento (Oathsworn Eye)",
        "rarity": 4,
        "type": "Mejor 4★ Evento",
        "note": "+27.6% ATQ y +48% Recarga de Energía al usar su Habilidad Elemental."
      },
      {
        "name": "Códice de Favonius",
        "rarity": 4,
        "type": "Batería Cómoda",
        "note": "Resuelve cualquier problema de recarga para lanzar la Definitiva cada rotación."
      },
      {
        "name": "Fluente Pureza (Flowing Purity)",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "Forja de Fontaine con 565 ATQ Base y bono de ATQ%."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "type": "BiS Universal",
        "bonus": "-40% RES Elemental para el carry Pyro, Hydro, Electro o Cryo."
      },
      {
        "set": "Canción de Días Pretéritos (4 piezas)",
        "type": "Alternativa Xiao",
        "bonus": "Suma daño plano adicional a los saltos de Xiao o personajes Anemo/Geo."
      }
    ],
    "mainStats": {
      "sands": "Recarga de Energía% o ATQ%",
      "goblet": "ATQ%",
      "circlet": "ATQ% (o Bono de Curación)"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (170% - 200% ER)",
      "2. ATQ% y ATQ Plano (Meta: acercarse a 4,000+ ATQ)",
      "3. Prob. Crítica (si usa Favonius)"
    ],
    "talentPriority": "Definitiva (Q) >>> Habilidad Elemental (E) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "17,000",
      "atk": "3,500 – 4,200 ATQ",
      "def": "750",
      "em": "0",
      "er": "175% – 210% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "Xiao Plunge Premium",
        "comp": "Xiao • Xianyun • Faruzan • Furina",
        "members": [
          "Xiao",
          "Xianyun",
          "Faruzan",
          "Furina"
        ]
      },
      {
        "name": "Gaming Plunge Vape",
        "comp": "Gaming • Xianyun • Furina • Bennett",
        "members": [
          "Gaming",
          "Xianyun",
          "Furina",
          "Bennett"
        ]
      },
      {
        "name": "Hu Tao Plunge",
        "comp": "Hu Tao • Xianyun • Furina • Yelan",
        "members": [
          "Hu Tao",
          "Xianyun",
          "Furina",
          "Yelan"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "17,000",
      "atk": "3,500 – 4,200 ATQ",
      "def": "750",
      "em": "0",
      "er": "175% – 210% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 10409,
      "atk90": 335,
      "def90": 580,
      "ascStat": "ATQ%",
      "ascVal": "28.8%"
    },
    "talentsData": {
      "normal": {
        "name": "Loto Etéreo",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          40,
          44.4,
          48.9,
          53.3,
          57.8,
          62.2,
          66.7,
          71.1,
          75.6,
          80,
          84.8,
          89.6,
          94.4
        ]
      },
      "skill": {
        "name": "Salto Nuboso E (Ataque Descendente Grulla)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          170,
          188.9,
          207.8,
          226.7,
          245.6,
          264.4,
          283.3,
          302.2,
          321.1,
          340,
          360.4,
          380.8,
          401.2
        ]
      },
      "burst": {
        "name": "Estrellas del Atardecer Q (Curación Inicial + Buff Descendentes)",
        "scaleStat": "ATK",
        "unit": "% ATQ Curación",
        "mvByLevel": [
          221,
          240.6,
          260.3,
          279.9,
          299.6,
          319.2,
          338.9,
          358.5,
          378.2,
          397.8,
          421.7,
          445.5,
          469.4
        ]
      }
    },
    "statPriority": {
      "sands": "Recarga de Energía% o ATQ%",
      "goblet": "ATQ%",
      "circlet": "ATQ% (o Bono de Curación)",
      "substats": "1. Recarga de Energía% (170% - 200% ER) > 2. ATQ% y ATQ Plano (Meta: acercarse a 4,000+ ATQ) > 3. Prob. Crítica (si usa Favonius)"
    }
  },
  {
    "id": "xiao",
    "name": {
      "es": "Xiao",
      "en": "Xiao"
    },
    "element": "Anemo",
    "rarity": 5,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Xiao.png",
    "tier": "T0.5 Plunge Hypercarry",
    "role": "Hypercarry Anemo en Campo (Saltos Descendentes Masivos en Área)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Multiplicadores de Ataques Descendentes en Q",
    "bestWeapons": [
      {
        "name": "Halcón de Jade Primordial",
        "rarity": 5,
        "type": "BiS 5★ Canónico",
        "note": "+Prob. Crítica, +22.4% ATQ y +12% daño universal al golpear."
      },
      {
        "name": "Báculo de Homa",
        "rarity": 5,
        "type": "Alternativa 5★ Top",
        "note": "+66.2% Daño Crítico masivo que equilibra sus estadísticas."
      },
      {
        "name": "Lanza del Duelo (Deathmatch)",
        "rarity": 4,
        "type": "Mejor 4★ Pase",
        "note": "+36.8% Prob. Crítica altísima y bono de ATQ continuo."
      },
      {
        "name": "Borla Negra / Alabarda del Viento F2P",
        "rarity": 4,
        "type": "F2P",
        "note": "Lanza de Favonius o Alabarda del Viento para solventar recarga."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Deceso del Cinabrio (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "+Hasta 66% de ATQ al perder vida continuamente durante su Definitiva."
      },
      {
        "set": "Cazador Fantasmal (4 piezas)",
        "type": "BiS con Furina",
        "bonus": "+36% Prob. Crítica permanente por pérdida de vida durante saltos."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Anemo% (o ATQ% con Furina + Xianyun)",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ%",
      "3. Recarga de Energía% (120% – 135% ER)"
    ],
    "talentPriority": "Ataque Normal (Descendentes) = Definitiva (Q) > Habilidad Elemental (E)",
    "benchmarks": {
      "hp": "18,000",
      "atk": "2,100 – 2,500 ATQ",
      "def": "800",
      "em": "0",
      "er": "125% – 135% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "metaTeams": [
      {
        "name": "FFXX (Equipo Definitivo de Xiao)",
        "comp": "Xiao • Xianyun • Faruzan • Furina",
        "members": [
          "Xiao",
          "Xianyun",
          "Faruzan",
          "Furina"
        ]
      },
      {
        "name": "Xiao Geo Bros",
        "comp": "Xiao • Faruzan • Zhongli • Bennett",
        "members": [
          "Xiao",
          "Faruzan",
          "Zhongli",
          "Bennett"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "2,100 – 2,500 ATQ",
      "def": "800",
      "em": "0",
      "er": "125% – 135% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "baseStats": {
      "hp90": 12720,
      "atk90": 349,
      "def90": 799,
      "ascStat": "Prob. Crítica",
      "ascVal": "19.2%"
    },
    "talentsData": {
      "normal": {
        "name": "Impulso de Torbellino (Descendente Alto)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          204,
          226.2,
          248.4,
          270.7,
          292.9,
          315.1,
          337.3,
          359.6,
          381.8,
          404,
          428.2,
          452.5,
          476.7
        ]
      },
      "skill": {
        "name": "Viento Lemniscático E (Doble Embestida)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          253,
          275.4,
          297.9,
          320.3,
          342.8,
          365.2,
          387.7,
          410.1,
          432.6,
          455,
          482.3,
          509.6,
          536.9
        ]
      },
      "burst": {
        "name": "Azote de Todos los Males Q (Bono Daño Saltos %)",
        "scaleStat": "ATK",
        "unit": "% Bono Daño",
        "mvByLevel": [
          58.5,
          62.6,
          66.7,
          70.7,
          74.8,
          78.9,
          83,
          87,
          91.1,
          95.2,
          100.9,
          106.6,
          112.3
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Anemo% (o ATQ% con Furina + Xianyun)",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% > 3. Recarga de Energía% (120% – 135% ER)"
    }
  },
  {
    "id": "xilonen",
    "name": {
      "es": "Xilonen",
      "en": "Xilonen"
    },
    "element": "Geo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Xilonen.png",
    "tier": "T0 Soporte Universal",
    "role": "Reductora de Resistencias (-36% RES), Buffer (+40% DMG) & Healer",
    "roleCategory": "support",
    "scalingType": "DEF",
    "scalingLabel": "Escalado por DEF% (3,200 DEF activa tope de arma 5★) • Reducción depende de Nv. Talento E",
    "bestWeapons": [
      {
        "name": "Canción Patrullera de las Cumbres",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+25.6% Bono Daño Elemental al equipo al alcanzar 3,200 DEF y enorme DEF%."
      },
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "BiS Utilidad F2P",
        "note": "Batería universal para todo el equipo en cualquier rotación."
      },
      {
        "name": "Flauta de Ezpitzal",
        "rarity": 4,
        "type": "Mejor F2P DEF",
        "note": "Forja de Natlan: +69% DEF total de forma gratuita."
      },
      {
        "name": "Huso de Cinabrio",
        "rarity": 4,
        "type": "Alternativa Evento",
        "note": "Aporte masivo de DEF%."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Pergamino del Héroe de la Ciudad de las Cenizas (4p)",
        "type": "BiS Indiscutible",
        "bonus": "+40% Daño Elemental a los elementos que reaccionan con Noctámbulo."
      },
      {
        "set": "Cáscara de Sueños Opulentos (4 piezas)",
        "type": "Máxima DEF",
        "bonus": "+54% DEF y +24% Bono Geo (si se busca maximizar su curación y arma)."
      }
    ],
    "mainStats": {
      "sands": "DEF%",
      "goblet": "DEF%",
      "circlet": "Bono de Curación% o DEF% (o Prob. CR con Favonius)"
    },
    "substatsPriority": [
      "1. DEF% y DEF Plana (Meta: 3,200 DEF con arma 5★ / 2,800+ F2P)",
      "2. Recarga de Energía% (160% - 190% ER)",
      "3. Prob. Crítica (si usa Favonius)"
    ],
    "talentPriority": "Habilidad Elemental (E) >>> Definitiva (Q) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "18,000",
      "atk": "1,100",
      "def": "2,800 – 3,300+ DEF",
      "em": "0",
      "er": "165% – 190% ER",
      "crit": "50%+ CR (con Favonius)"
    },
    "metaTeams": [
      {
        "name": "Neuvillette Hypercarry",
        "comp": "Neuvillette • Furina • Xilonen • Kazuha",
        "members": [
          "Neuvillette",
          "Furina",
          "Xilonen",
          "Kazuha"
        ]
      },
      {
        "name": "Mavuika Melt Core",
        "comp": "Mavuika • Citlali • Xilonen • Bennett",
        "members": [
          "Mavuika",
          "Citlali",
          "Xilonen",
          "Bennett"
        ]
      },
      {
        "name": "Navia Geo-Bomb",
        "comp": "Navia • Xilonen • Furina • Bennett",
        "members": [
          "Navia",
          "Xilonen",
          "Furina",
          "Bennett"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "1,100",
      "def": "2,800 – 3,300+ DEF",
      "em": "0",
      "er": "165% – 190% ER",
      "crit": "50%+ CR (con Favonius)"
    },
    "baseStats": {
      "hp90": 12405,
      "atk90": 275,
      "def90": 930,
      "ascStat": "DEF%",
      "ascVal": "36.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Giro Rítmico",
        "scaleStat": "DEF",
        "unit": "% DEF",
        "mvByLevel": [
          42.5,
          47.2,
          51.9,
          56.7,
          61.4,
          66.1,
          70.8,
          75.6,
          80.3,
          85,
          90.1,
          95.2,
          100.3
        ]
      },
      "skill": {
        "name": "Muestreo Fonográfico E (Reducción RES %)",
        "scaleStat": "DEF",
        "unit": "% RES Shred",
        "mvByLevel": [
          18,
          20,
          22,
          24,
          26,
          28,
          30,
          32,
          34,
          36,
          38.2,
          40.3,
          42.5
        ]
      },
      "burst": {
        "name": "Ritmo Eufórico Q: Curación por Tick",
        "scaleStat": "DEF",
        "unit": "% DEF",
        "mvByLevel": [
          104,
          113.2,
          122.5,
          131.7,
          141,
          150.2,
          159.5,
          168.7,
          178,
          187.2,
          198.4,
          209.7,
          220.9
        ]
      }
    },
    "statPriority": {
      "sands": "DEF%",
      "goblet": "DEF%",
      "circlet": "Bono de Curación% o DEF% (o Prob. CR con Favonius)",
      "substats": "1. DEF% y DEF Plana (Meta: 3,200 DEF con arma 5★ / 2,800+ F2P) > 2. Recarga de Energía% (160% - 190% ER) > 3. Prob. Crítica (si usa Favonius)"
    }
  },
  {
    "id": "xingqiu",
    "name": {
      "es": "Xingqiu",
      "en": "Xingqiu"
    },
    "element": "Hydro",
    "rarity": 4,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Xingqiu.png",
    "tier": "T0 Meta Universal",
    "role": "Off-Field Sub-DPS, Aplicador Hydro & Reductor de Daño",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por Ataque (ATQ%) con Alta Demanda de Recarga",
    "bestWeapons": [
      {
        "name": "Espada de Sacrificio",
        "rarity": 4,
        "type": "BiS Absoluto",
        "note": "R3+ reinicia la E y genera dobles partículas, resolviendo toda su recarga."
      },
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "Alternativa 4★",
        "note": "Batería sólida si Sacrificio no tiene refinamientos altos."
      },
      {
        "name": "Cortador de Jade Primordial",
        "rarity": 5,
        "type": "Daño 5★ (Con Raiden)",
        "note": "Máximo daño personal si el equipo cubre su recarga."
      },
      {
        "name": "Vado del Río Ceniciento",
        "rarity": 4,
        "type": "F2P",
        "note": "Buena opción F2P de pesca con recarga."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Emblema del Destino (4 piezas)",
        "type": "BiS Daño Personal",
        "bonus": "Multiplica el daño de cada espada de lluvia según su ER."
      },
      {
        "set": "Nobleza Obligada (4 piezas)",
        "type": "Soporte Equipo",
        "bonus": "+20% ATQ para todo el equipo si nadie más lo lleva."
      }
    ],
    "mainStats": {
      "sands": "Recarga de Energía% o ATQ%",
      "goblet": "Bono Daño Hydro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (180% - 210% con Sacrificio R3+)",
      "2. Prob. Crítica / Daño Crítico",
      "3. ATQ%",
      "4. Maestría Elemental"
    ],
    "talentPriority": "Definitiva (Q) > Habilidad Elemental (E) >>> Ataques Básicos",
    "benchmarks": {
      "hp": "18,000 – 20,000 HP",
      "atk": "1,500 – 1,800 ATQ",
      "def": "750",
      "em": "50 – 100 EM",
      "er": "190% – 220% ER",
      "crit": "60%+ CR / 130%+ CD"
    },
    "metaTeams": [
      {
        "name": "National Team Clásico",
        "comp": "Xiangling • Xingqiu • Bennett • Sucrose",
        "members": [
          "Xiangling",
          "Xingqiu",
          "Bennett",
          "Sucrose"
        ]
      },
      {
        "name": "Hu Tao Double Hydro",
        "comp": "Hu Tao • Xingqiu • Yelan • Zhongli",
        "members": [
          "Hu Tao",
          "Xingqiu",
          "Yelan",
          "Zhongli"
        ]
      },
      {
        "name": "Hyperbloom F2P",
        "comp": "Nahida • Xingqiu • Kuki Shinobu • Alhaitham",
        "members": [
          "Nahida",
          "Xingqiu",
          "Kuki Shinobu",
          "Alhaitham"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "18,000 – 20,000 HP",
      "atk": "1,500 – 1,800 ATQ",
      "def": "750",
      "em": "50 – 100 EM",
      "er": "190% – 220% ER",
      "crit": "60%+ CR / 130%+ CD"
    },
    "baseStats": {
      "hp90": 10222,
      "atk90": 202,
      "def90": 758,
      "ascStat": "ATQ%",
      "ascVal": "24.0%"
    },
    "talentsData": {
      "normal": {
        "name": "Estilo Guhua (Ataque Normal)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          46.6,
          51.7,
          56.7,
          61.8,
          66.8,
          71.9,
          76.9,
          82,
          87,
          92.1,
          97.6,
          103.2,
          108.7
        ]
      },
      "skill": {
        "name": "Espada Guhua: Lluvia Torrencial (E)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          168,
          186.7,
          205.3,
          224,
          242.7,
          261.3,
          280,
          298.7,
          317.3,
          336,
          356.2,
          376.3,
          396.5
        ]
      },
      "burst": {
        "name": "Espada Guhua: Sable de Lluvia (Q)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          54.3,
          61,
          67.8,
          74.5,
          81.3,
          88,
          94.8,
          101.5,
          108.3,
          115,
          121.9,
          128.8,
          135.7
        ]
      }
    },
    "statPriority": {
      "sands": "Recarga de Energía% o ATQ%",
      "goblet": "Bono Daño Hydro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Recarga de Energía% (180% - 210% con Sacrificio R3+) > 2. Prob. Crítica / Daño Crítico > 3. ATQ% > 4. Maestría Elemental"
    }
  },
  {
    "id": "yae_miko",
    "name": {
      "es": "Yae Miko",
      "en": "Yae Miko"
    },
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Yae.png",
    "tier": "T0 Off-Field DPS",
    "role": "Sub-DPS Electro Off-Field Automático (3 Tótems Sesshou Sakura) & Nuke Q",
    "roleCategory": "sub_dps",
    "scalingType": "ATK_EM",
    "scalingLabel": "Escalado por ATQ% + Pasiva A4 (+0.15% daño en tótems por cada punto de EM)",
    "bestWeapons": [
      {
        "name": "Axioma de la Kagura (Kagura's Verity)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+66.2% Daño Crítico, +36% Daño de Habilidad Elemental acumulable y +12% Daño Elemental."
      },
      {
        "name": "Sinfonía de los Merodeadores (The Widsith)",
        "rarity": 4,
        "type": "Mejor 4★ Gacha",
        "note": "+55.1% Daño Crítico y cualquiera de las 3 canciones (ATQ, Daño o EM) es perfecta para ella."
      },
      {
        "name": "Oración Perdida a los Vientos Sagrados",
        "rarity": 5,
        "type": "Opción 5★ CR",
        "note": "+Prob. Crítica altísima."
      },
      {
        "name": "Anillo de Hakushin / Guía Mágica",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "Hakushin buffea el daño elemental del equipo tras reacciones electro."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Compañía Dorada (4 piezas)",
        "type": "BiS Tótems E",
        "bonus": "+70% Daño en Habilidad Elemental para sus 3 tótems mientras está fuera de campo."
      },
      {
        "set": "Sueños Áureos (4 piezas)",
        "type": "BiS Aggravate",
        "bonus": "+ATQ% y hasta +150 de Maestría Elemental para potenciar sus reacciones de Intensificación."
      }
    ],
    "mainStats": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ%",
      "3. Maestría Elemental (100 – 180 EM en Aggravate)",
      "4. Recarga de Energía% (130% – 145%)"
    ],
    "talentPriority": "Habilidad Elemental (E) >>> Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "16,000",
      "atk": "1,900 – 2,200 ATQ",
      "def": "700",
      "em": "120 – 180 EM",
      "er": "130% – 145% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "metaTeams": [
      {
        "name": "Alhaitham Quickbloom",
        "comp": "Alhaitham • Yae Miko • Nahida • Kokomi",
        "members": [
          "Alhaitham",
          "Yae Miko",
          "Nahida",
          "Kokomi"
        ]
      },
      {
        "name": "Tighnari Spread Dual Carry",
        "comp": "Tighnari • Yae Miko • Nahida • Zhongli",
        "members": [
          "Tighnari",
          "Yae Miko",
          "Nahida",
          "Zhongli"
        ]
      },
      {
        "name": "Yae-Raiden Core",
        "comp": "Raiden Shogun • Yae Miko • Kazuha • Bennett",
        "members": [
          "Raiden Shogun",
          "Yae Miko",
          "Kazuha",
          "Bennett"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "1,900 – 2,200 ATQ",
      "def": "700",
      "em": "120 – 180 EM",
      "er": "130% – 145% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "baseStats": {
      "hp90": 10372,
      "atk90": 340,
      "def90": 569,
      "ascStat": "Prob. Crítica",
      "ascVal": "19.2%"
    },
    "talentsData": {
      "normal": {
        "name": "Espíritu Devorazorro",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          39.7,
          44.1,
          48.5,
          52.9,
          57.3,
          61.8,
          66.2,
          70.6,
          75,
          79.4,
          84.2,
          88.9,
          93.7
        ]
      },
      "skill": {
        "name": "Evocación Yakan: Daño Tótem Nivel 3 (Por Rayo)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          88,
          97.2,
          106.4,
          115.5,
          124.7,
          133.9,
          143.1,
          152.2,
          161.4,
          170.6,
          180.8,
          191.1,
          201.3
        ]
      },
      "burst": {
        "name": "Gran Arte Secreto Q: Relámpago Tenko Nuke (4 Impactos)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          260,
          283.1,
          306.2,
          329.3,
          352.4,
          375.6,
          398.7,
          421.8,
          444.9,
          468,
          496.1,
          524.2,
          552.2
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% > 3. Maestría Elemental (100 – 180 EM en Aggravate) > 4. Recarga de Energía% (130% – 145%)"
    }
  },
  {
    "id": "yelan",
    "name": {
      "es": "Yelan",
      "en": "Yelan"
    },
    "element": "Hydro",
    "rarity": 5,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Yelan.png",
    "tier": "T0 Meta Universal",
    "role": "Off-Field Sub-DPS & Buffer de Daño Progresivo",
    "roleCategory": "sub_dps",
    "scalingType": "HP",
    "scalingLabel": "Escalado 100% Vida Máxima (HP%) — El ATQ es inútil",
    "bestWeapons": [
      {
        "name": "Aqua Simulacra",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+88.2% Daño Crítico y +20% Daño universal (requiere reloj de ER%)."
      },
      {
        "name": "Arco de Favonius",
        "rarity": 4,
        "type": "Mejor 4★ / F2P",
        "note": "Mejor arma global en C0 para asegurar rotaciones con Definitiva."
      },
      {
        "name": "Estrella Polar / Elegía del Fin",
        "rarity": 5,
        "type": "Soporte 5★",
        "note": "Elegía aporta gran recarga y buff de ATQ y EM a todo el equipo."
      },
      {
        "name": "Último Acorde (The Stringless)",
        "rarity": 4,
        "type": "Vaporize Nuke",
        "note": "Aumenta drásticamente el daño de E y Q si ya tiene suficiente ER."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Emblema del Destino (4 piezas)",
        "type": "BiS Indiscutible",
        "bonus": "Convierte la Recarga de Energía en hasta +75% Daño en la Definitiva."
      },
      {
        "set": "2p Vida+20% + 2p Hydro+15%",
        "type": "Alternativa C1+",
        "bonus": "Excelente daño equilibrado en composiciones Doble Hydro."
      }
    ],
    "mainStats": {
      "sands": "Recarga de Energía% (con Aqua) o Vida% (con Favonius)",
      "goblet": "Bono Daño Hydro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (180% - 220% en C0)",
      "2. Prob. Crítica / Daño Crítico (1:2)",
      "3. Vida% (hasta 35,000 HP)",
      "❌ ATQ% no hace nada"
    ],
    "talentPriority": "Definitiva (Q) > Habilidad Elemental (E) >>> Ataques Normales",
    "benchmarks": {
      "hp": "32,000 – 36,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0 – 60 EM",
      "er": "180% – 210% ER",
      "crit": "70%+ CR / 150%+ CD"
    },
    "metaTeams": [
      {
        "name": "Hu Tao Double Hydro",
        "comp": "Hu Tao • Xingqiu • Yelan • Zhongli",
        "members": [
          "Hu Tao",
          "Xingqiu",
          "Yelan",
          "Zhongli"
        ]
      },
      {
        "name": "Alhaitham Hyperbloom",
        "comp": "Alhaitham • Nahida • Yelan • Kuki Shinobu",
        "members": [
          "Alhaitham",
          "Nahida",
          "Yelan",
          "Kuki Shinobu"
        ]
      },
      {
        "name": "Raiden National",
        "comp": "Raiden Shogun • Yelan • Xiangling • Bennett",
        "members": [
          "Raiden Shogun",
          "Yelan",
          "Xiangling",
          "Bennett"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "32,000 – 36,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0 – 60 EM",
      "er": "180% – 210% ER",
      "crit": "70%+ CR / 150%+ CD"
    },
    "baseStats": {
      "hp90": 14450,
      "atk90": 244,
      "def90": 547,
      "ascStat": "Prob. Crítica",
      "ascVal": "19.2%"
    },
    "talentsData": {
      "normal": {
        "name": "Flecha Acechadora (Disparo Cargado)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          11.6,
          12.6,
          13.6,
          14.7,
          15.7,
          16.7,
          17.8,
          18.8,
          19.8,
          20.8,
          22,
          23.3,
          24.5
        ]
      },
      "skill": {
        "name": "Atadura Salvavidas (Lazo E)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          22.6,
          24.6,
          26.6,
          28.6,
          30.6,
          32.7,
          34.7,
          36.7,
          38.7,
          40.7,
          43.1,
          45.6,
          48
        ]
      },
      "burst": {
        "name": "Dado Clarividente (Daño por Proyectil Q)",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          4.9,
          5.3,
          5.7,
          6.2,
          6.6,
          7,
          7.5,
          7.9,
          8.3,
          8.8,
          9.3,
          9.9,
          10.4
        ]
      }
    },
    "statPriority": {
      "sands": "Recarga de Energía% (con Aqua) o Vida% (con Favonius)",
      "goblet": "Bono Daño Hydro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Recarga de Energía% (180% - 220% en C0) > 2. Prob. Crítica / Daño Crítico (1:2) > 3. Vida% (hasta 35,000 HP) > ❌ ATQ% no hace nada"
    }
  },
  {
    "id": "yoimiya",
    "name": {
      "es": "Yoimiya",
      "en": "Yoimiya"
    },
    "element": "Pyro",
    "rarity": 5,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Yoimiya.png",
    "tier": "T1 Single-Target DPS",
    "role": "Hypercarry Pyro Monobjetivo (Ataques Normales Ametralladora)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Multiplicador Infusión E en Ataques Normales",
    "bestWeapons": [
      {
        "name": "Agitador del Relámpago (Thundering Pulse)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+66.2% Daño Crítico, +20% ATQ y hasta +40% daño en Ataques Normales."
      },
      {
        "name": "Herrumbre (Rust R5)",
        "rarity": 4,
        "type": "Mejor 4★",
        "note": "R5 otorga un descomunal +80% de daño en Ataques Normales, casi igualando a las 5★."
      },
      {
        "name": "Aqua Simulacra / Alas Celestiales",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Stat-sticks de Crítico excepcionales."
      },
      {
        "name": "Tirachinas (Slingshot R5)",
        "rarity": 3,
        "type": "Mejor F2P 3★",
        "note": "+31.2% Prob. Crítica y +60% daño normal a corta distancia (usar con Bennett)."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Reminiscencia de la Purificación (4 piezas)",
        "type": "BiS Óptimo",
        "bonus": "+50% Daño en Ataques Normales durante toda la duración de su habilidad E."
      },
      {
        "set": "Bruja Carmesí en Llamas (4 piezas)",
        "type": "Alternativa Vape",
        "bonus": "+15% Bono Pyro y +15% Daño en Vaporizados continuos."
      }
    ],
    "mainStats": {
      "sands": "ATQ% (o EM en Vaporizado)",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% / Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ%",
      "3. Maestría Elemental (80 – 150 EM)",
      "4. Recarga (baja prioridad con Reminiscencia)"
    ],
    "talentPriority": "Ataque Normal (NA) >>> Habilidad Elemental (E) >>> Definitiva (Q)",
    "benchmarks": {
      "hp": "17,000",
      "atk": "2,000 – 2,400 ATQ",
      "def": "750",
      "em": "80 – 160 EM",
      "er": "100% – 115% ER",
      "crit": "75%+ CR / 170%+ CD"
    },
    "metaTeams": [
      {
        "name": "Yoimiya Vape",
        "comp": "Yoimiya • Yelan • Xingqiu • Zhongli",
        "members": [
          "Yoimiya",
          "Yelan",
          "Xingqiu",
          "Zhongli"
        ]
      },
      {
        "name": "Yoimiya Overload con Chevreuse",
        "comp": "Yoimiya • Chevreuse • Fischl • Bennett",
        "members": [
          "Yoimiya",
          "Chevreuse",
          "Fischl",
          "Bennett"
        ]
      },
      {
        "name": "Yoimiya Monopyro",
        "comp": "Yoimiya • Bennett • Yun Jin • Zhongli",
        "members": [
          "Yoimiya",
          "Bennett",
          "Yun Jin",
          "Zhongli"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "17,000",
      "atk": "2,000 – 2,400 ATQ",
      "def": "750",
      "em": "80 – 160 EM",
      "er": "100% – 115% ER",
      "crit": "75%+ CR / 170%+ CD"
    },
    "baseStats": {
      "hp90": 10164,
      "atk90": 323,
      "def90": 615,
      "ascStat": "Prob. Crítica",
      "ascVal": "19.2%"
    },
    "talentsData": {
      "normal": {
        "name": "Fuego Artificial Pirotécnico (Combo Normal)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          63.6,
          70.7,
          77.7,
          84.8,
          91.9,
          98.9,
          106,
          113.1,
          120.1,
          127.2,
          134.8,
          142.5,
          150.1
        ]
      },
      "skill": {
        "name": "Danza de la Pólvora E (% Multiplicador Normal)",
        "scaleStat": "ATK",
        "unit": "% Daño",
        "mvByLevel": [
          137.9,
          140.5,
          143.2,
          145.8,
          148.5,
          151.1,
          153.8,
          156.4,
          159.1,
          161.7,
          171.4,
          181.1,
          190.8
        ]
      },
      "burst": {
        "name": "Saxifraga Dorada Q (Daño de Marca)",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          122,
          135.6,
          149.1,
          162.7,
          176.2,
          189.8,
          203.3,
          216.9,
          230.4,
          244,
          258.6,
          273.3,
          287.9
        ]
      }
    },
    "statPriority": {
      "sands": "ATQ% (o EM en Vaporizado)",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% / Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% > 3. Maestría Elemental (80 – 150 EM) > 4. Recarga (baja prioridad con Reminiscencia)"
    }
  },
  {
    "id": "zhongli",
    "name": {
      "es": "Zhongli",
      "en": "Zhongli"
    },
    "element": "Geo",
    "rarity": 5,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Zhongli.png",
    "tier": "T0 Escudo Absoluto",
    "role": "Escudo Indestructible & Reductor de Resistencias Universal (-20% All RES)",
    "roleCategory": "healer_shielder",
    "scalingType": "HP",
    "scalingLabel": "Escalado 100% Vida Máxima (HP%) para el escudo • Daño de Q escala con HP y ATQ",
    "bestWeapons": [
      {
        "name": "Borla Negra (Black Tassel)",
        "rarity": 3,
        "type": "BiS Escudo Puro F2P",
        "note": "Arma 3★ que aporta +46.9% Vida Máxima, ideal para superar los 50,000 HP."
      },
      {
        "name": "Lanza de Favonius",
        "rarity": 4,
        "type": "BiS Batería Utilidad",
        "note": "Genera partículas neutras para el equipo manteniendo un escudo sólido."
      },
      {
        "name": "Báculo de Homa",
        "rarity": 5,
        "type": "Híbrido Meteorito Nuke",
        "note": "+Vida Máx, Daño Crítico masivo y excelente daño en la Definitiva."
      },
      {
        "name": "Cruz de Kitain",
        "rarity": 4,
        "type": "F2P",
        "note": "Regenera energía pasivamente."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Tenacidad de la Geoarmada (4 piezas)",
        "type": "BiS Soporte",
        "bonus": "+20% ATQ para todo el equipo y +30% Protección de Escudo con el pilar E."
      },
      {
        "set": "Instructor (4 piezas)",
        "type": "Soporte Reacciones",
        "bonus": "+120 Maestría Elemental para equipos de Hu Tao o Navia al cristalizar."
      },
      {
        "set": "2p Tenacidad + 2p Vourukasha",
        "type": "Escudo Dios (55k+ HP)",
        "bonus": "+40% Vida Máxima total para un escudo imposible de romper."
      }
    ],
    "mainStats": {
      "sands": "Vida%",
      "goblet": "Vida% (o Bono Geo en Híbrido)",
      "circlet": "Vida% (o Prob. CR con Favonius)"
    },
    "substatsPriority": [
      "1. Vida% y Vida Plana",
      "2. Recarga de Energía% (si se usa la Definitiva)",
      "3. Prob. Crítica (para Favonius)"
    ],
    "talentPriority": "Habilidad Elemental (E) >>> Definitiva (Q) >>> Ataques Normales (No subir)",
    "benchmarks": {
      "hp": "45,000 – 54,000 HP",
      "atk": "1,200",
      "def": "750",
      "em": "0",
      "er": "130% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "metaTeams": [
      {
        "name": "Hu Tao Double Hydro",
        "comp": "Hu Tao • Xingqiu • Yelan • Zhongli",
        "members": [
          "Hu Tao",
          "Xingqiu",
          "Yelan",
          "Zhongli"
        ]
      },
      {
        "name": "Navia Geo Bros",
        "comp": "Navia • Zhongli • Bennett • Xiangling",
        "members": [
          "Navia",
          "Zhongli",
          "Bennett",
          "Xiangling"
        ]
      },
      {
        "name": "Tighnari Spread",
        "comp": "Tighnari • Yae Miko • Nahida • Zhongli",
        "members": [
          "Tighnari",
          "Yae Miko",
          "Nahida",
          "Zhongli"
        ]
      }
    ],
    "recommendedPanel": {
      "hp": "45,000 – 54,000 HP",
      "atk": "1,200",
      "def": "750",
      "em": "0",
      "er": "130% ER",
      "crit": "40%+ CR (con Favonius) / No req."
    },
    "baseStats": {
      "hp90": 14695,
      "atk90": 251,
      "def90": 738,
      "ascStat": "Bono Geo",
      "ascVal": "28.8%"
    },
    "talentsData": {
      "normal": {
        "name": "Lluvia de Piedra",
        "scaleStat": "ATK",
        "unit": "% ATQ",
        "mvByLevel": [
          30.8,
          34.2,
          37.6,
          41.1,
          44.5,
          47.9,
          51.3,
          54.8,
          58.2,
          61.6,
          65.3,
          69,
          72.7
        ]
      },
      "skill": {
        "name": "Dominus Lapidis: Absorción Escudo E",
        "scaleStat": "HP",
        "unit": "% Vida Máx",
        "mvByLevel": [
          12.8,
          13.9,
          15.1,
          16.2,
          17.4,
          18.5,
          19.6,
          20.8,
          21.9,
          23,
          24.4,
          25.8,
          27.1
        ]
      },
      "burst": {
        "name": "Lluvia Estelar Q (Nuke de Meteorito)",
        "scaleStat": "HP",
        "unit": "% Vida Máx + ATQ",
        "mvByLevel": [
          401,
          456.4,
          511.9,
          567.3,
          622.8,
          678.2,
          733.7,
          789.1,
          844.6,
          900,
          954,
          1008,
          1062
        ]
      }
    },
    "statPriority": {
      "sands": "Vida%",
      "goblet": "Vida% (o Bono Geo en Híbrido)",
      "circlet": "Vida% (o Prob. CR con Favonius)",
      "substats": "1. Vida% y Vida Plana > 2. Recarga de Energía% (si se usa la Definitiva) > 3. Prob. Crítica (para Favonius)"
    }
  },
  {
    "id": "columbina",
    "name": {
      "es": "Columbina (Damselette)",
      "en": "Columbina"
    },
    "element": "Hydro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Columbina.png",
    "tier": "T0 Sub-DPS & Buffer",
    "role": "Heraldo de Fatui #3 (Damselette) • Buffer Universal y Sub-DPS Hydro Off-Field",
    "roleCategory": "sub_dps",
    "scalingType": "HP",
    "scalingLabel": "Escalado masivo por Vida Máxima (HP%) & Fluctuación",
    "bestWeapons": [
      {
        "name": "Nocturno tras el Velo (Nocturne's Curtain Call)",
        "rarity": 5,
        "type": "BiS Absoluto (Firma)",
        "note": "Catalizador firma con Daño Crítico, Vida% y bono de Reacciones Lunares."
      },
      {
        "name": "Escrituras del Fluir Sempiterno (Tome of the Eternal Flow)",
        "rarity": 5,
        "type": "Alternativa 5★",
        "note": "88.2% Daño Crítico y +16% Vida base."
      },
      {
        "name": "Prototipo Ámbar (Prototype Amber R5)",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "41.3% Vida y regeneración de energía para todo el equipo."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Alborada de la Estrella del Alba y la Luna / Aubade of Morningstar and Moon (4 piezas)",
        "type": "BiS",
        "bonus": "Potencia el daño de sub-DPS fuera de campo y reacciones lunares."
      },
      {
        "set": "Compañía Dorada (4 piezas)",
        "type": "Alternativa Sub-DPS",
        "bonus": "+70% Daño de Habilidad Elemental fuera de campo."
      }
    ],
    "mainStats": {
      "sands": "Vida% o Recarga de Energía%",
      "goblet": "Bono Daño Hydro% o Vida%",
      "circlet": "Prob. Crítica / Daño Crítico o Vida%"
    },
    "substatsPriority": [
      "1. Vida% y Vida Plana (35,000 – 42,000 HP)",
      "2. Recarga de Energía% (160% – 190% ER)",
      "3. Prob. Crítica / Daño Crítico (1:2)",
      "4. Maestría Elemental (100 – 180 EM)"
    ],
    "recommendedPanel": {
      "hp": "38,000 – 42,000 HP",
      "atk": "1,000 – 1,200 ATQ",
      "def": "750 DEF",
      "em": "120 – 180 EM",
      "er": "160% – 180% ER",
      "crit": "70%+ CR / 150%+ CD"
    },
    "talentPriority": "Habilidad Elemental (E) = Definitiva (Q) >>> Ataques Normales",
    "metaTeams": [
      {
        "name": "Fatui Harbinger Vaporize",
        "members": [
          "Arlecchino",
          "Columbina",
          "Kaedehara Kazuha",
          "Bennett"
        ],
        "comp": "Arlecchino • Columbina • Kaedehara Kazuha • Bennett"
      },
      {
        "name": "Columbina Freeze Control",
        "members": [
          "Kamisato Ayaka",
          "Columbina",
          "Shenhe",
          "Kaedehara Kazuha"
        ],
        "comp": "Kamisato Ayaka • Columbina • Shenhe • Kaedehara Kazuha"
      },
      {
        "name": "Columbina Hyperbloom",
        "members": [
          "Nahida",
          "Columbina",
          "Kuki Shinobu",
          "Alhacén"
        ],
        "comp": "Nahida • Columbina • Kuki Shinobu • Alhacén"
      }
    ],
    "statPriority": {
      "sands": "Vida% o Recarga de Energía%",
      "goblet": "Bono Daño Hydro% o Vida%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Vida% > Recarga de Energía% > Prob. Crítica > Daño Crítico > Maestría Elemental"
    },
    "benchmarks": {
      "hp": "38,000 – 42,000 HP",
      "atk": "1,000 – 1,200 ATQ",
      "def": "750 DEF",
      "em": "120 – 180 EM",
      "er": "160% – 180% ER",
      "crit": "70%+ CR / 150%+ CD"
    }
  },
  {
    "id": "sandrone",
    "name": {
      "es": "Sandrone (Marionette)",
      "en": "Sandrone"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_MarionetteNew.png",
    "tier": "T0 Stellar-Conduct DPS",
    "role": "Main DPS / Sub-DPS Cryo de Conducto Estelar (Autómatas Mecánicos)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escala con ATQ% y Críticos (Stellar-Conduct)",
    "bestWeapons": [
      {
        "name": "Llave de la Trascendencia (A Teaspoon of Transcendence)",
        "rarity": 5,
        "type": "BiS Absoluto (Firma)",
        "note": "Mandoble firma de Sandrone con Crítico y bono de Conducto Estelar."
      },
      {
        "name": "Mil Soles Abrasadores (A Thousand Blazing Suns)",
        "rarity": 5,
        "type": "Alternativa 5★",
        "note": "Gran ATQ Base, Prob. Crítica y bono de Daño Crítico."
      },
      {
        "name": "Médula de la Serpiente Marina (Serpent Spine R5)",
        "rarity": 4,
        "type": "Mejor 4★",
        "note": "Prob. Crítica alta y hasta +50% Daño infligido."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Desilusión Congelada en las Sombras / Disenchantment in Deep Shadows (4 piezas)",
        "type": "BiS",
        "bonus": "Aumenta masivamente el daño de Conducto Estelar y Crítico."
      },
      {
        "set": "Final del Gladiador (4 piezas)",
        "type": "Alternativa 4p",
        "bonus": "Hasta 36% Daño Infligido extra."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "ATQ%",
      "circlet": "Daño Crítico o Prob. Crítica"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2 - 70%+ / 160%+)",
      "2. ATQ% y ATQ Plano (2,100 – 2,400 ATQ)",
      "3. Recarga de Energía% (130% – 150% ER)",
      "4. Maestría Elemental (60 – 100 EM)"
    ],
    "recommendedPanel": {
      "hp": "18,000 HP",
      "atk": "2,100 – 2,400 ATQ",
      "def": "Base (~800 DEF)",
      "em": "60 – 100 EM",
      "er": "130% – 150% ER",
      "crit": "70%+ CR / 150%+ CD"
    },
    "talentPriority": "Ataques Normales > Definitiva (Q) >>> Habilidad Elemental (E)",
    "metaTeams": [
      {
        "name": "Superconduct Premium",
        "members": [
          "Sandrone",
          "Odette",
          "Qiqi",
          "Yae Miko"
        ],
        "comp": "Sandrone • Odette • Qiqi • Yae Miko"
      },
      {
        "name": "Sandrone F2P",
        "members": [
          "Sandrone",
          "Diona",
          "Beidou",
          "Aliyosha"
        ],
        "comp": "Sandrone • Diona • Beidou • Aliyosha"
      }
    ],
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "ATQ%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Daño Crítico > Prob. Crítica > ATQ% > Recarga de Energía% > Maestría Elemental"
    },
    "benchmarks": {
      "hp": "18,000 HP",
      "atk": "2,100 – 2,400 ATQ",
      "def": "Base (~800 DEF)",
      "em": "60 – 100 EM",
      "er": "130% – 150% ER",
      "crit": "70%+ CR / 150%+ CD"
    }
  },
  {
    "id": "chasca",
    "name": {
      "es": "Chasca",
      "en": "Chasca"
    },
    "element": "Anemo",
    "rarity": 5,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Chasca.png",
    "tier": "T0 Multi-Element Carry",
    "role": "Hypercarry Anemo & Proyectiles Multi-Elementales en Cañón Volador",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Balas Espirituales de Colores",
    "bestWeapons": [
      {
        "name": "Astral Vulture's Crimson Plumage",
        "rarity": 5,
        "type": "BiS Firma 5★",
        "note": "+Crítico y daño a proyectiles multi-elementales."
      },
      {
        "name": "El Primer Gran Truco Mágico (The First Great Magic)",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+Daño Crítico y ATQ por aliados."
      },
      {
        "name": "Aqua Simulacra",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+88.2% Daño Crítico y +20% daño universal."
      },
      {
        "name": "Rompecadenas (Chain Breaker)",
        "rarity": 4,
        "type": "Mejor Forja Natlan",
        "note": "+ATQ% y bono por miembros de distinta región."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Códice de Obsidiana (4 piezas)",
        "type": "BiS Natlan",
        "bonus": "+40% Prob. Crítica masiva en modo de vuelo de Espíritu de la Noche."
      },
      {
        "set": "Cazador Fantasmal (4 piezas)",
        "type": "BiS con Furina",
        "bonus": "+36% Prob. Crítica."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Anemo% o ATQ%",
      "circlet": "Daño Crítico% o Prob. Crítica%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ% (1,900 – 2,300 ATQ)",
      "3. Recarga de Energía% (120% ER)",
      "4. Maestría Elemental"
    ],
    "recommendedPanel": {
      "hp": "18,000 HP",
      "atk": "2,100 – 2,400 ATQ",
      "def": "750 DEF",
      "em": "100 – 160 EM",
      "er": "120% – 130% ER",
      "crit": "70%+ CR / 180%+ CD"
    },
    "talentPriority": "Habilidad Elemental (E) > Ataque Normal > Definitiva (Q)",
    "metaTeams": [
      {
        "name": "Chasca Rainbow Cannon",
        "members": [
          "Chasca",
          "Furina",
          "Mavuika",
          "Shenhe"
        ],
        "comp": "Chasca • Furina • Mavuika • Shenhe"
      },
      {
        "name": "Chasca Electro-Charged Swirl",
        "members": [
          "Chasca",
          "Ororon",
          "Furina",
          "Bennett"
        ],
        "comp": "Chasca • Ororon • Furina • Bennett"
      }
    ],
    "benchmarks": {
      "hp": "18,000 HP",
      "atk": "2,100 – 2,400 ATQ",
      "def": "750 DEF",
      "em": "100 – 160 EM",
      "er": "120% – 130% ER",
      "crit": "70%+ CR / 180%+ CD"
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Anemo% o ATQ%",
      "circlet": "Daño Crítico% o Prob. Crítica%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% (1,900 – 2,300 ATQ) > 3. Recarga de Energía% (120% ER) > 4. Maestría Elemental"
    }
  },
  {
    "id": "ororon",
    "name": {
      "es": "Ororon",
      "en": "Ororon"
    },
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Olorun.png",
    "tier": "T1 Electro Buffer & Sub-DPS",
    "role": "Soporte Electro de Natlan • Daño Pasivo en Electrocargados y Buffer de Recarga",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Ojos del Abismo",
    "bestWeapons": [
      {
        "name": "Elegía del Fin (Elegy for the End)",
        "rarity": 5,
        "type": "BiS Soporte 5★",
        "note": "Recarga de energía y buff masivo de +100 EM y +20% ATQ al equipo."
      },
      {
        "name": "Arco de Favonius",
        "rarity": 4,
        "type": "BiS Batería F2P",
        "note": "Generación inagotable de partículas de energía blanca."
      },
      {
        "name": "Último Acorde (Stringless)",
        "rarity": 4,
        "type": "Daño Personal",
        "note": "+48% daño en Habilidad Elemental y Definitiva."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Pergamino del Héroe de la Ciudad de las Cenizas (4p)",
        "type": "BiS Natlan",
        "bonus": "+40% Bono Daño Elemental a los elementos activados."
      },
      {
        "set": "Emblema del Destino (4 piezas)",
        "type": "BiS Sub-DPS",
        "bonus": "+75% Daño en la Definitiva según Recarga de Energía."
      }
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga de Energía%",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% o Daño Crítico%"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (170% – 200% ER)",
      "2. Prob. Crítica / Daño Crítico (1:2)",
      "3. ATQ% (1,600 – 1,900 ATQ)",
      "4. Maestría Elemental"
    ],
    "recommendedPanel": {
      "hp": "17,000 HP",
      "atk": "1,800 ATQ",
      "def": "700 DEF",
      "em": "100 – 160 EM",
      "er": "180% – 200% ER",
      "crit": "60%+ CR / 130%+ CD"
    },
    "talentPriority": "Definitiva (Q) = Habilidad Elemental (E) >>> Básicos",
    "metaTeams": [
      {
        "name": "Ororon Electro-Charged Flash",
        "members": [
          "Chasca",
          "Ororon",
          "Furina",
          "Xilonen"
        ],
        "comp": "Chasca • Ororon • Furina • Xilonen"
      },
      {
        "name": "Ororon Overload Blitz",
        "members": [
          "Clorinde",
          "Ororon",
          "Chevreuse",
          "Xiangling"
        ],
        "comp": "Clorinde • Ororon • Chevreuse • Xiangling"
      }
    ],
    "benchmarks": {
      "hp": "17,000 HP",
      "atk": "1,800 ATQ",
      "def": "700 DEF",
      "em": "100 – 160 EM",
      "er": "180% – 200% ER",
      "crit": "60%+ CR / 130%+ CD"
    },
    "statPriority": {
      "sands": "ATQ% o Recarga de Energía%",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% o Daño Crítico%",
      "substats": "1. Recarga de Energía% (170% – 200% ER) > 2. Prob. Crítica / Daño Crítico (1:2) > 3. ATQ% (1,600 – 1,900 ATQ) > 4. Maestría Elemental"
    }
  },
  {
    "id": "emilie",
    "name": {
      "es": "Émilie (Emilie)",
      "en": "Emilie"
    },
    "element": "Dendro",
    "rarity": 5,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Emilie.png",
    "tier": "T0 Burning Sub-DPS",
    "role": "Perfumista de Fontaine • Sub-DPS Dendro Especialista en Quemadura y Daño Fuera de Campo",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Frascos de Fragancia",
    "bestWeapons": [
      {
        "name": "Elegía Lumidulce (Lumidouce Elegy)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Prob. Crítica y hasta +60% Daño amplificado continuo con Quemadura."
      },
      {
        "name": "Báculo de las Arenas Escarlatas / Homa",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Altísimo stat-stick de Prob. o Daño Crítico."
      },
      {
        "name": "Lanza del Duelo (Deathmatch)",
        "rarity": 4,
        "type": "Mejor 4★ Pase",
        "note": "+36.8% Prob. Crítica sólida."
      },
      {
        "name": "La Captura (The Catch R5)",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "+32% Daño y +12% CR en la Definitiva con alta Recarga."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Ensoñación Inacabada (4 piezas)",
        "type": "BiS Exclusivo Quemadura",
        "bonus": "+50% Daño infligido continuo al quemar enemigos."
      },
      {
        "set": "Recuerdos del Bosque (4 piezas)",
        "type": "BiS Reducción RES",
        "bonus": "-30% Resistencia Dendro a todos los enemigos."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Dendro%",
      "circlet": "Prob. Crítica% o Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ% (2,000 – 2,400 ATQ)",
      "3. Recarga de Energía% (130% – 150% ER)",
      "4. Maestría Elemental (80 – 140 EM)"
    ],
    "recommendedPanel": {
      "hp": "18,000 HP",
      "atk": "2,200 – 2,500 ATQ",
      "def": "800 DEF",
      "em": "100 – 150 EM",
      "er": "130% – 150% ER",
      "crit": "75%+ CR / 170%+ CD"
    },
    "talentPriority": "Habilidad Elemental (E - Frasco Lumidulce) > Definitiva (Q) >>> Básicos",
    "metaTeams": [
      {
        "name": "Emilie Kinich Burning Squad",
        "members": [
          "Kinich",
          "Emilie",
          "Xiangling",
          "Bennett"
        ],
        "comp": "Kinich • Emilie • Xiangling • Bennett"
      },
      {
        "name": "Emilie Burn-Melt Ganyu",
        "members": [
          "Ganyu",
          "Emilie",
          "Dehya",
          "Bennett"
        ],
        "comp": "Ganyu • Emilie • Dehya • Bennett"
      },
      {
        "name": "Emilie Burn-Vape Wriothesley",
        "members": [
          "Wriothesley",
          "Emilie",
          "Thoma",
          "Bennett"
        ],
        "comp": "Wriothesley • Emilie • Thoma • Bennett"
      }
    ],
    "benchmarks": {
      "hp": "18,000 HP",
      "atk": "2,200 – 2,500 ATQ",
      "def": "800 DEF",
      "em": "100 – 150 EM",
      "er": "130% – 150% ER",
      "crit": "75%+ CR / 170%+ CD"
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Dendro%",
      "circlet": "Prob. Crítica% o Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% (2,000 – 2,400 ATQ) > 3. Recarga de Energía% (130% – 150% ER) > 4. Maestría Elemental (80 – 140 EM)"
    }
  },
  {
    "id": "sethos",
    "name": {
      "es": "Sethos",
      "en": "Sethos"
    },
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Sethos.png",
    "tier": "T1 Charged/Burst Carry",
    "role": "Tirador Electro de Sumeru • Flechas Perforantes de Carga Rápida o Disparos de Energía",
    "roleCategory": "main_dps",
    "scalingType": "EM",
    "scalingLabel": "Escalado Dual por Maestría Elemental (EM) & ATQ",
    "bestWeapons": [
      {
        "name": "Cazador del Callejón / Forja de Nubes",
        "rarity": 4,
        "type": "BiS 4★ Evento",
        "note": "Aumento masivo de Maestría Elemental tras consumir energía."
      },
      {
        "name": "Tirachinas (Slingshot R5)",
        "rarity": 3,
        "type": "BiS F2P Dios",
        "note": "+31.2% Prob. Crítica y +60% Daño en disparos directos."
      },
      {
        "name": "Aqua Simulacra / Gran Magia",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Estadísticas críticas legendarias."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Orquesta del Errante (4 piezas)",
        "type": "BiS Disparos Cargados",
        "bonus": "+80 EM y +35% Daño continuo en Ataques Cargados con Arco."
      },
      {
        "set": "Sueños Áureos (4 piezas)",
        "type": "BiS Maestría",
        "bonus": "+Hasta 230 de Maestría Elemental en equipos multi-elemento."
      }
    ],
    "mainStats": {
      "sands": "Maestría Elemental",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% o Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. Maestría Elemental (300 – 450 EM)",
      "3. ATQ% (1,300 – 1,600 ATQ)",
      "4. Recarga de Energía% (120% ER)"
    ],
    "recommendedPanel": {
      "hp": "16,000 HP",
      "atk": "1,400 ATQ",
      "def": "650 DEF",
      "em": "350 – 450 EM",
      "er": "120% – 130% ER",
      "crit": "70%+ CR / 160%+ CD"
    },
    "talentPriority": "Ataque Normal (Disparos) = Habilidad Elemental (E) = Definitiva (Q)",
    "metaTeams": [
      {
        "name": "Sethos Aggravate Sniper",
        "members": [
          "Sethos",
          "Nahida",
          "Fischl",
          "Zhongli"
        ],
        "comp": "Sethos • Nahida • Fischl • Zhongli"
      },
      {
        "name": "Sethos Quickbloom",
        "members": [
          "Sethos",
          "Furina",
          "Baizhu",
          "Nahida"
        ],
        "comp": "Sethos • Furina • Baizhu • Nahida"
      }
    ],
    "benchmarks": {
      "hp": "16,000 HP",
      "atk": "1,400 ATQ",
      "def": "650 DEF",
      "em": "350 – 450 EM",
      "er": "120% – 130% ER",
      "crit": "70%+ CR / 160%+ CD"
    },
    "statPriority": {
      "sands": "Maestría Elemental",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% o Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. Maestría Elemental (300 – 450 EM) > 3. ATQ% (1,300 – 1,600 ATQ) > 4. Recarga de Energía% (120% ER)"
    }
  },
  {
    "id": "kachina",
    "name": {
      "es": "Kachina",
      "en": "Kachina"
    },
    "element": "Geo",
    "rarity": 4,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Kachina.png",
    "tier": "T1 Natlan Support & Buffer",
    "role": "Piloto del Turbogiro de Natlan • Portadora Estelar del Pergamino del Héroe",
    "roleCategory": "buffer",
    "scalingType": "DEF",
    "scalingLabel": "Escalado por Defensa (DEF%) y Taladro Turbogiro",
    "bestWeapons": [
      {
        "name": "Huella del Arcoíris (Footprint of the Rainbow)",
        "rarity": 4,
        "type": "BiS Forja Natlan",
        "note": "+DEF% masiva tras usar Habilidad Elemental."
      },
      {
        "name": "Lanza de Favonius (Favonius Lance)",
        "rarity": 4,
        "type": "Mejor Batería F2P",
        "note": "Batería de energía para todo el equipo."
      },
      {
        "name": "Retribución de la Justicia (Rightful Reward)",
        "rarity": 4,
        "type": "Forja Fontaine",
        "note": "+Vida y energía al recibir curación."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Pergamino del Héroe de la Ciudad de las Cenizas (4p)",
        "type": "BiS Obligatorio Buffer",
        "bonus": "+40% Bono Daño Elemental continuo a todo el equipo al activar reacciones de Espíritu Nocturno."
      },
      {
        "set": "Cáscara de Sueños Opulentos (4 piezas)",
        "type": "Daño Personal DEF",
        "bonus": "+54% DEF y +24% Bono Geo."
      }
    ],
    "mainStats": {
      "sands": "DEF% o Recarga de Energía%",
      "goblet": "DEF% o Bono Daño Geo%",
      "circlet": "DEF% o Prob. Crítica% (Favonius)"
    },
    "substatsPriority": [
      "1. DEF% y DEF Plana (2,000 – 2,500 DEF)",
      "2. Recarga de Energía% (170% – 200% ER)",
      "3. Prob. Crítica (40%+ si usa Favonius)"
    ],
    "recommendedPanel": {
      "hp": "17,000 HP",
      "atk": "950 ATQ",
      "def": "2,200 – 2,600 DEF",
      "em": "50 EM",
      "er": "180% – 200% ER",
      "crit": "40%+ CR"
    },
    "talentPriority": "Habilidad Elemental (E - Turbogiro) > Definitiva (Q) >>> Básicos",
    "metaTeams": [
      {
        "name": "Kachina Mualani Vaporize",
        "members": [
          "Mualani",
          "Kachina",
          "Xiangling",
          "Furina"
        ],
        "comp": "Mualani • Kachina • Xiangling • Furina"
      },
      {
        "name": "Kachina Navia Geo Core",
        "members": [
          "Navia",
          "Kachina",
          "Xiangling",
          "Bennett"
        ],
        "comp": "Navia • Kachina • Xiangling • Bennett"
      }
    ],
    "benchmarks": {
      "hp": "17,000 HP",
      "atk": "950 ATQ",
      "def": "2,200 – 2,600 DEF",
      "em": "50 EM",
      "er": "180% – 200% ER",
      "crit": "40%+ CR"
    },
    "statPriority": {
      "sands": "DEF% o Recarga de Energía%",
      "goblet": "DEF% o Bono Daño Geo%",
      "circlet": "DEF% o Prob. Crítica% (Favonius)",
      "substats": "1. DEF% y DEF Plana (2,000 – 2,500 DEF) > 2. Recarga de Energía% (170% – 200% ER) > 3. Prob. Crítica (40%+ si usa Favonius)"
    }
  },
  {
    "id": "iansan",
    "name": {
      "es": "Iansán (Iansan)",
      "en": "Iansan"
    },
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Iansan.png",
    "tier": "T1 Electro Sub-DPS & Buffer",
    "role": "Guerrera Eléctrica de Natlan • Impactos Veloces de Sobrecarga y Batería",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Fuerza de Combate",
    "bestWeapons": [
      {
        "name": "Lanza de Favonius",
        "rarity": 4,
        "type": "BiS Utilidad F2P",
        "note": "Batería de energía y recarga constante."
      },
      {
        "name": "La Captura (The Catch R5)",
        "rarity": 4,
        "type": "BiS Daño F2P",
        "note": "+32% Daño y +12% CR en la Definitiva."
      },
      {
        "name": "Lanza del Duelo",
        "rarity": 4,
        "type": "Mejor 4★ Pase",
        "note": "+Prob. Crítica y ATQ%."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Pergamino del Héroe de la Ciudad de las Cenizas (4p)",
        "type": "BiS Natlan",
        "bonus": "+40% Bono Daño Elemental al equipo."
      },
      {
        "set": "Emblema del Destino (4 piezas)",
        "type": "BiS Daño Q",
        "bonus": "Conversión de ER a Daño en la Definitiva."
      }
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga de Energía%",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% o Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. Recarga de Energía% (160% – 190% ER)",
      "3. ATQ% (1,700 – 2,100 ATQ)",
      "4. Maestría Elemental"
    ],
    "recommendedPanel": {
      "hp": "17,500 HP",
      "atk": "1,900 ATQ",
      "def": "750 DEF",
      "em": "100 EM",
      "er": "170% – 190% ER",
      "crit": "65%+ CR / 140%+ CD"
    },
    "talentPriority": "Habilidad Elemental (E) = Definitiva (Q) >>> Básicos",
    "metaTeams": [
      {
        "name": "Iansan Overload Storm",
        "members": [
          "Mavuika",
          "Iansan",
          "Chevreuse",
          "Bennett"
        ],
        "comp": "Mavuika • Iansan • Chevreuse • Bennett"
      },
      {
        "name": "Iansan Aggravate",
        "members": [
          "Kinich",
          "Iansan",
          "Nahida",
          "Zhongli"
        ],
        "comp": "Kinich • Iansan • Nahida • Zhongli"
      }
    ],
    "benchmarks": {
      "hp": "17,500 HP",
      "atk": "1,900 ATQ",
      "def": "750 DEF",
      "em": "100 EM",
      "er": "170% – 190% ER",
      "crit": "65%+ CR / 140%+ CD"
    },
    "statPriority": {
      "sands": "ATQ% o Recarga de Energía%",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% o Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. Recarga de Energía% (160% – 190% ER) > 3. ATQ% (1,700 – 2,100 ATQ) > 4. Maestría Elemental"
    }
  },
  {
    "id": "lyney",
    "name": {
      "es": "Lyney",
      "en": "Lyney"
    },
    "element": "Pyro",
    "rarity": 5,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Liney.png",
    "tier": "T0 Mono Pyro Hypercarry",
    "role": "Hypercarry Pyro de Ataques Cargados • Especialista en Equipos Mono Pyro",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Bonificación por Pyro en Enemigo",
    "bestWeapons": [
      {
        "name": "El Primer Gran Truco Mágico (The First Great Magic)",
        "rarity": 5,
        "type": "BiS Firma 5★",
        "note": "+66.2% Daño Crítico y +ATQ% por personajes Pyro."
      },
      {
        "name": "Aqua Simulacra",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+88.2% Daño Crítico y +20% daño."
      },
      {
        "name": "Canción del Silencio (Song of Stillness R5)",
        "rarity": 4,
        "type": "Mejor Forja F2P",
        "note": "+32% Daño tras recibir curación."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Cazador Fantasmal (4 piezas)",
        "type": "BiS Absoluto",
        "bonus": "+36% Prob. Crítica masiva al consumir o recuperar Vida con sus flechas de gato."
      },
      {
        "set": "Virtuoso Corredor de Lava (4 piezas)",
        "type": "BiS Mono Pyro",
        "bonus": "+35% Daño continuo contra enemigos afectados por Pyro."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Daño Crítico%"
    },
    "substatsPriority": [
      "1. Daño Crítico% y Prob. Crítica% (1:2)",
      "2. ATQ% (2,100 – 2,500 ATQ)",
      "3. Recarga de Energía% (120% – 130% ER)"
    ],
    "recommendedPanel": {
      "hp": "18,000 HP",
      "atk": "2,200 – 2,500 ATQ",
      "def": "750 DEF",
      "em": "50 EM",
      "er": "120% – 130% ER",
      "crit": "65%+ CR / 220%+ CD"
    },
    "talentPriority": "Ataque Normal (Flecha Ocultagatos) >>> Definitiva (Q) = Elemental (E)",
    "metaTeams": [
      {
        "name": "Lyney Mono Pyro Sovereign",
        "members": [
          "Lyney",
          "Xiangling",
          "Bennett",
          "Kaedehara Kazuha"
        ],
        "comp": "Lyney • Xiangling • Bennett • Kaedehara Kazuha"
      },
      {
        "name": "Lyney Shielded Pyro",
        "members": [
          "Lyney",
          "Zhongli",
          "Bennett",
          "Xiangling"
        ],
        "comp": "Lyney • Zhongli • Bennett • Xiangling"
      }
    ],
    "benchmarks": {
      "hp": "18,000 HP",
      "atk": "2,200 – 2,500 ATQ",
      "def": "750 DEF",
      "em": "50 EM",
      "er": "120% – 130% ER",
      "crit": "65%+ CR / 220%+ CD"
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Daño Crítico%",
      "substats": "1. Daño Crítico% y Prob. Crítica% (1:2) > 2. ATQ% (2,100 – 2,500 ATQ) > 3. Recarga de Energía% (120% – 130% ER)"
    }
  },
  {
    "id": "lynette",
    "name": {
      "es": "Lynette",
      "en": "Lynette"
    },
    "element": "Anemo",
    "rarity": 4,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Linette.png",
    "tier": "T2 Anemo Swirl & Taunt",
    "role": "Soporte Anemo de Fontaine • Provocación de Gato con Sombrero y Sombra Verde",
    "roleCategory": "buffer",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Dispersión Ousia",
    "bestWeapons": [
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "BiS Utilidad",
        "note": "Batería para rotación continua de la Definitiva."
      },
      {
        "name": "Espada de Sacrificio",
        "rarity": 4,
        "type": "Doble Carga E",
        "note": "Permite dos carreras sombrías consecutivas."
      },
      {
        "name": "Vado del Río Ceniciento (Fleuve Cendre)",
        "rarity": 4,
        "type": "F2P Pesca",
        "note": "Alta Recarga de Energía y Prob. Crítica en E."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "type": "BiS Obligatorio",
        "bonus": "-40% RES Elemental al elemento dispersado."
      },
      {
        "set": "Nobleza Obligada (4 piezas)",
        "type": "Buff de Equipo",
        "bonus": "+20% ATQ para todo el equipo tras usar Q."
      }
    ],
    "mainStats": {
      "sands": "Recarga de Energía% o ATQ%",
      "goblet": "Bono Daño Anemo%",
      "circlet": "Prob. Crítica% o Daño Crítico%"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (180% – 210% ER)",
      "2. Prob. Crítica / Daño Crítico (1:2)",
      "3. ATQ% y Maestría Elemental"
    ],
    "recommendedPanel": {
      "hp": "17,000 HP",
      "atk": "1,500 ATQ",
      "def": "700 DEF",
      "em": "100 – 180 EM",
      "er": "190% – 210% ER",
      "crit": "55%+ CR / 120%+ CD"
    },
    "talentPriority": "Definitiva (Q) > Habilidad Elemental (E) >>> Básicos",
    "metaTeams": [
      {
        "name": "Lynette National Swirl",
        "members": [
          "Xiangling",
          "Xingqiu",
          "Bennett",
          "Lynette"
        ],
        "comp": "Xiangling • Xingqiu • Bennett • Lynette"
      },
      {
        "name": "Lynette Fontaine Freeze",
        "members": [
          "Freminet",
          "Furina",
          "Charlotte",
          "Lynette"
        ],
        "comp": "Freminet • Furina • Charlotte • Lynette"
      }
    ],
    "benchmarks": {
      "hp": "17,000 HP",
      "atk": "1,500 ATQ",
      "def": "700 DEF",
      "em": "100 – 180 EM",
      "er": "190% – 210% ER",
      "crit": "55%+ CR / 120%+ CD"
    },
    "statPriority": {
      "sands": "Recarga de Energía% o ATQ%",
      "goblet": "Bono Daño Anemo%",
      "circlet": "Prob. Crítica% o Daño Crítico%",
      "substats": "1. Recarga de Energía% (180% – 210% ER) > 2. Prob. Crítica / Daño Crítico (1:2) > 3. ATQ% y Maestría Elemental"
    }
  },
  {
    "id": "cyno",
    "name": {
      "es": "Cyno (General Mahamatra)",
      "en": "Cyno"
    },
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Cyno.png",
    "tier": "T0 Quickbloom / Stellar-Conduct Carry",
    "role": "General Mahamatra • Hipercarry Electro y Conducción Estelar (Rework V6.6+)",
    "roleCategory": "main_dps",
    "scalingType": "EM",
    "scalingLabel": "Escala con Maestría Elemental (EM), ATQ y Conducción Estelar",
    "bestWeapons": [
      {
        "name": "Báculo de las Arenas Escarlatas (Staff of the Scarlet Sands)",
        "rarity": 5,
        "type": "BiS Firma Oficial",
        "note": "+44.1% Prob. Crítica y colosal conversión de Maestría Elemental a ATQ."
      },
      {
        "name": "Halcón de Jade / Báculo de Homa",
        "rarity": 5,
        "type": "Opciones 5★",
        "note": "Estadísticas críticas masivas y escalado general de daño."
      },
      {
        "name": "Balada de los Fiordos",
        "rarity": 4,
        "type": "BiS Pase de Batalla",
        "note": "+27.6% Prob. Crítica y +240 de Maestría Elemental con 3 elementos distintos."
      },
      {
        "name": "Borla Blanca R5",
        "rarity": 3,
        "type": "BiS F2P Dios",
        "note": "+23.4% Prob. Crítica y +48% daño en todos sus ataques normales de garra."
      },
      {
        "name": "Lanza Cruzada de Kitain / Perdición del Dragón",
        "rarity": 4,
        "type": "Opciones Forja F2P",
        "note": "Maestría elemental y recarga pasiva continua."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Desencanto en las Sombras Profundas (4 piezas)",
        "type": "BiS Oficial Rework V6.6+",
        "bonus": "+18% ATQ, +80% Daño Superconductor / +40% Conducción Estelar y +16% Prob. Crítica contra enemigos afectados."
      },
      {
        "set": "Furia del Trueno (4 piezas)",
        "type": "BiS Rotaciones Clásicas",
        "bonus": "-0.8s TdE en Habilidad Elemental al activar reacciones Electro, duplicando lanzamientos de garra."
      },
      {
        "set": "Sueños Áureos (4 piezas)",
        "type": "BiS Quickbloom Tradicional",
        "bonus": "+Hasta 230 de Maestría Elemental y +14% ATQ continuo en equipos de Sobreflorecimiento."
      }
    ],
    "mainStats": {
      "sands": "Maestría Elemental (o ATQ% con nuevo set)",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% o Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. Maestría Elemental (300 – 450 EM)",
      "3. Recarga de Energía% (120% – 135% tras el buff)",
      "4. ATQ%"
    ],
    "recommendedPanel": {
      "hp": "18,500 - 20,000 HP",
      "atk": "1,450 – 1,700 ATQ",
      "def": "800 - 900 DEF",
      "em": "350 – 500 EM",
      "er": "120% – 135% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "talentPriority": "Definitiva (Q - Pacto Chacal) = Habilidad Elemental (E) >>> Básicos",
    "metaTeams": [
      {
        "name": "Cyno Stellar-Conduct Overdrive",
        "members": [
          "Cyno",
          "Sandrone",
          "Yae Miko",
          "Escoffier"
        ],
        "comp": "Cyno • Sandrone • Yae Miko • Escoffier"
      },
      {
        "name": "Cyno Quickbloom Premium",
        "members": [
          "Cyno",
          "Nahida",
          "Furina",
          "Baizhu"
        ],
        "comp": "Cyno • Nahida • Furina • Baizhu"
      },
      {
        "name": "Cyno Aggravate Lightning",
        "members": [
          "Cyno",
          "Fischl",
          "Nahida",
          "Zhongli"
        ],
        "comp": "Cyno • Fischl • Nahida • Zhongli"
      }
    ],
    "benchmarks": {
      "hp": "18,500 - 20,000 HP",
      "atk": "1,450 – 1,700 ATQ",
      "def": "800 - 900 DEF",
      "em": "350 – 500 EM",
      "er": "120% – 135% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "statPriority": {
      "sands": "Maestría Elemental (o ATQ%)",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica% o Daño Crítico%",
      "substats": "Crit > EM > ER% > ATQ%"
    }
  },
  {
    "id": "dehya",
    "name": {
      "es": "Dehya",
      "en": "Dehya"
    },
    "element": "Pyro",
    "rarity": 5,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Dehya.png",
    "tier": "T1 Hyperarmor & Burgeon",
    "role": "Guerrera Pyro del Desierto • Mitigación de Daño, Resistencia a la Interrupción & Crepitar",
    "roleCategory": "healer_shield",
    "scalingType": "HP",
    "scalingLabel": "Escalado Híbrido por Vida Máxima (HP%) & ATQ",
    "bestWeapons": [
      {
        "name": "Emblema del Mar de Juncos (Beacon of the Reed Sea)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Prob. Crítica, +Vida% y enorme bono de ATQ al recibir daño."
      },
      {
        "name": "Gran Espada de Favonius",
        "rarity": 4,
        "type": "BiS Utilidad F2P",
        "note": "Batería de recarga para solucionar su coste de Definitiva."
      },
      {
        "name": "Segadora de la Lluvia R5",
        "rarity": 4,
        "type": "BiS Crepitar / Burgeon",
        "note": "+165 Maestría y +36% Daño contra Hydro/Pyro."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Tenacidad de la Geoarmada (4 piezas)",
        "type": "BiS Soporte Equipo",
        "bonus": "+20% Vida Máx y +20% ATQ para el equipo al impactar su campo de llamas."
      },
      {
        "set": "Emblema del Destino (4 piezas)",
        "type": "BiS DPS Nuke",
        "bonus": "Máximo daño en su ráfaga de puñetazos ardientes."
      },
      {
        "set": "Flor Olvidada del Paraíso (4 piezas)",
        "type": "BiS Crepitar / Burgeon",
        "bonus": "+80% Daño de Reacción de Crepitar continuo."
      }
    ],
    "mainStats": {
      "sands": "Vida% o Maestría Elemental (Burgeon) o ER%",
      "goblet": "Bono Daño Pyro% o Vida% o EM",
      "circlet": "Prob. Crítica% o Vida% o EM"
    },
    "substatsPriority": [
      "1. Vida% y Vida Plana (35,000 – 42,000 HP)",
      "2. Recarga de Energía% (170% – 200% ER)",
      "3. Prob. Crítica / Daño Crítico (1:2)",
      "4. Maestría Elemental"
    ],
    "recommendedPanel": {
      "hp": "36,000 – 42,000 HP",
      "atk": "1,500 ATQ",
      "def": "800 DEF",
      "em": "100 – 200 EM (800+ en Burgeon)",
      "er": "180% – 200% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "talentPriority": "Habilidad Elemental (E - Cerco Ígneo) > Definitiva (Q) >>> Básicos",
    "metaTeams": [
      {
        "name": "Dehya Burn-Melt Ganyu",
        "members": [
          "Ganyu",
          "Dehya",
          "Nahida",
          "Bennett"
        ],
        "comp": "Ganyu • Dehya • Nahida • Bennett"
      },
      {
        "name": "Dehya Burgeon Core",
        "members": [
          "Dehya",
          "Neuvillette",
          "Nahida",
          "Baizhu"
        ],
        "comp": "Dehya • Neuvillette • Nahida • Baizhu"
      }
    ],
    "benchmarks": {
      "hp": "36,000 – 42,000 HP",
      "atk": "1,500 ATQ",
      "def": "800 DEF",
      "em": "100 – 200 EM (800+ en Burgeon)",
      "er": "180% – 200% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "statPriority": {
      "sands": "Vida% o Maestría Elemental (Burgeon) o ER%",
      "goblet": "Bono Daño Pyro% o Vida% o EM",
      "circlet": "Prob. Crítica% o Vida% o EM",
      "substats": "1. Vida% y Vida Plana (35,000 – 42,000 HP) > 2. Recarga de Energía% (170% – 200% ER) > 3. Prob. Crítica / Daño Crítico (1:2) > 4. Maestría Elemental"
    }
  },
  {
    "id": "klee",
    "name": {
      "es": "Klee",
      "en": "Klee"
    },
    "element": "Pyro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Klee.png",
    "tier": "T1 Bomb Hypercarry",
    "role": "Caballera Chispeante de Favonius • Daño Pyro Explosivo en Área y Batería de Críticos",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Bombas Saltaditas",
    "bestWeapons": [
      {
        "name": "Oración Perdida a los Vientos Sagrados",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Prob. Crítica, velocidad de movimiento y Bono Daño Elemental continuo."
      },
      {
        "name": "Sinfonía de los Merodeadores (The Widsith R5)",
        "rarity": 4,
        "type": "BiS 4★ Ráfaga",
        "note": "+55.1% Daño Crítico y buff colosal al entrar en combate."
      },
      {
        "name": "Cuentos de Dodoco (Dodoco Tales R5)",
        "rarity": 4,
        "type": "F2P Insignia",
        "note": "Potenciación directa de Ataques Normales y Cargados."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Bruja Carmesí en Llamas (4 piezas)",
        "type": "BiS Reacciones Pyro",
        "bonus": "+15% Bono Pyro y daño aumentado de Vaporizados."
      },
      {
        "set": "Virtuoso Corredor de Lava (4 piezas)",
        "type": "BiS Mono Pyro",
        "bonus": "+35% Daño directo incondicional a enemigos en llamas."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% o Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ% (1,900 – 2,300 ATQ)",
      "3. Maestría Elemental (100 – 160 EM)",
      "4. Recarga de Energía% (120% ER)"
    ],
    "recommendedPanel": {
      "hp": "17,000 HP",
      "atk": "2,100 – 2,400 ATQ",
      "def": "750 DEF",
      "em": "120 – 180 EM",
      "er": "120% – 130% ER",
      "crit": "70%+ CR / 160%+ CD"
    },
    "talentPriority": "Ataque Normal (Bombas) = Habilidad Elemental (E) = Definitiva (Q)",
    "metaTeams": [
      {
        "name": "Klee Mono Pyro Destruction",
        "members": [
          "Klee",
          "Xiangling",
          "Bennett",
          "Kaedehara Kazuha"
        ],
        "comp": "Klee • Xiangling • Bennett • Kaedehara Kazuha"
      },
      {
        "name": "Klee Burgeon Cannon",
        "members": [
          "Klee",
          "Furina",
          "Nahida",
          "Baizhu"
        ],
        "comp": "Klee • Furina • Nahida • Baizhu"
      }
    ],
    "benchmarks": {
      "hp": "17,000 HP",
      "atk": "2,100 – 2,400 ATQ",
      "def": "750 DEF",
      "em": "120 – 180 EM",
      "er": "120% – 130% ER",
      "crit": "70%+ CR / 160%+ CD"
    },
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% o Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% (1,900 – 2,300 ATQ) > 3. Maestría Elemental (100 – 160 EM) > 4. Recarga de Energía% (120% ER)"
    }
  },
  {
    "id": "charlotte",
    "name": {
      "es": "Charlotte",
      "en": "Charlotte"
    },
    "element": "Cryo",
    "rarity": 4,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Charlotte.png",
    "tier": "T1 Teamwide Healer",
    "role": "Periodista de Fontaine • Curación Instantánea para todo el Equipo con Flash Fotográfico",
    "roleCategory": "healer_shield",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Flash Fotográfico",
    "bestWeapons": [
      {
        "name": "Códice de Favonius",
        "rarity": 4,
        "type": "BiS Batería Utilidad",
        "note": "Alivia su alto coste de energía en la Definitiva."
      },
      {
        "name": "Cuentos de Cazadores de Dragones",
        "rarity": 3,
        "type": "BiS Buffer",
        "note": "+48% ATQ para tu Main DPS."
      },
      {
        "name": "Ojo del Juramento / Prototipo Ámbar",
        "rarity": 4,
        "type": "Alternativas F2P",
        "note": "Aporte de ATQ y Recarga de Energía."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "type": "BiS Buffer Equipo",
        "bonus": "+20% ATQ para todos los aliados tras usar su flash fotográfico."
      },
      {
        "set": "Doncella Amada (4 piezas)",
        "type": "Máxima Curación",
        "bonus": "Curación masiva de emergencia."
      }
    ],
    "mainStats": {
      "sands": "Recarga de Energía% o ATQ%",
      "goblet": "ATQ%",
      "circlet": "Bono Curación% o Prob. Crítica% (Favonius)"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (200% – 240% ER)",
      "2. ATQ% (1,800 – 2,200 ATQ)",
      "3. Prob. Crítica (si usa Favonius)"
    ],
    "recommendedPanel": {
      "hp": "16,500 HP",
      "atk": "1,900 – 2,200 ATQ",
      "def": "700 DEF",
      "em": "50 EM",
      "er": "210% – 240% ER",
      "crit": "45%+ CR"
    },
    "talentPriority": "Definitiva (Q - Foto de Primera Plana) >>> Habilidad Elemental (E) > Básicos",
    "metaTeams": [
      {
        "name": "Charlotte Furina Freeze Engine",
        "members": [
          "Wriothesley",
          "Furina",
          "Charlotte",
          "Kaedehara Kazuha"
        ],
        "comp": "Wriothesley • Furina • Charlotte • Kaedehara Kazuha"
      },
      {
        "name": "Charlotte Neuvillette Freeze",
        "members": [
          "Neuvillette",
          "Furina",
          "Charlotte",
          "Kaedehara Kazuha"
        ],
        "comp": "Neuvillette • Furina • Charlotte • Kaedehara Kazuha"
      }
    ],
    "benchmarks": {
      "hp": "16,500 HP",
      "atk": "1,900 – 2,200 ATQ",
      "def": "700 DEF",
      "em": "50 EM",
      "er": "210% – 240% ER",
      "crit": "45%+ CR"
    },
    "statPriority": {
      "sands": "Recarga de Energía% o ATQ%",
      "goblet": "ATQ%",
      "circlet": "Bono Curación% o Prob. Crítica% (Favonius)",
      "substats": "1. Recarga de Energía% (200% – 240% ER) > 2. ATQ% (1,800 – 2,200 ATQ) > 3. Prob. Crítica (si usa Favonius)"
    }
  },
  {
    "id": "kirara",
    "name": {
      "es": "Kirara",
      "en": "Kirara"
    },
    "element": "Dendro",
    "rarity": 4,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Momoka.png",
    "tier": "T1 Dendro Shielder",
    "role": "Repartidora de Komaniya Express • Escudo de Caja de Gato Indestructible y Aplicación Dendro",
    "roleCategory": "healer_shield",
    "scalingType": "HP",
    "scalingLabel": "Escalado por Vida Máxima (HP%) & Escudo de Caja Nekomata",
    "bestWeapons": [
      {
        "name": "Llave de la Coronación (Key of Khaj-Nisut)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+66.2% Vida Máx masiva y conversión de Vida a Maestría para el equipo."
      },
      {
        "name": "Espada de Favonius / Sacrificio",
        "rarity": 4,
        "type": "BiS Batería F2P",
        "note": "Recarga de energía y partículas para rotaciones perfectas."
      },
      {
        "name": "Espada de Madera",
        "rarity": 4,
        "type": "Forja Sumeru",
        "note": "Suelta hojas que otorgan hasta 120 de Maestría Elemental al DPS."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Recuerdos del Bosque (4 piezas)",
        "type": "BiS Soporte Dendro",
        "bonus": "-30% Resistencia Dendro al golpear a los enemigos en modo caja."
      },
      {
        "set": "Tenacidad de la Geoarmada (4 piezas)",
        "type": "Escudo y Buff",
        "bonus": "+20% Vida Máx y +20% ATQ para el equipo."
      },
      {
        "set": "Instructor (4 piezas)",
        "type": "BiS Buffer EM",
        "bonus": "+120 Maestría Elemental para todo el equipo tras provocar reacciones."
      }
    ],
    "mainStats": {
      "sands": "Vida%",
      "goblet": "Vida%",
      "circlet": "Vida% o Prob. Crítica (Favonius)"
    },
    "substatsPriority": [
      "1. Vida% y Vida Plana (38,000 – 48,000 HP)",
      "2. Recarga de Energía% (140% – 160% ER)",
      "3. Prob. Crítica (para Favonius)"
    ],
    "recommendedPanel": {
      "hp": "42,000 – 48,000 HP",
      "atk": "1,100 ATQ",
      "def": "750 DEF",
      "em": "80 EM",
      "er": "150% – 170% ER",
      "crit": "35%+ CR"
    },
    "talentPriority": "Habilidad Elemental (E - Caja de Paquete) >>> Definitiva (Q) > Básicos",
    "metaTeams": [
      {
        "name": "Kirara Aggravate Fortress",
        "members": [
          "Clorinde",
          "Fischl",
          "Kirara",
          "Kaedehara Kazuha"
        ],
        "comp": "Clorinde • Fischl • Kirara • Kaedehara Kazuha"
      },
      {
        "name": "Kirara Nilou Bloom",
        "members": [
          "Nilou",
          "Nahida",
          "Kirara",
          "Sangonomiya Kokomi"
        ],
        "comp": "Nilou • Nahida • Kirara • Sangonomiya Kokomi"
      }
    ],
    "benchmarks": {
      "hp": "42,000 – 48,000 HP",
      "atk": "1,100 ATQ",
      "def": "750 DEF",
      "em": "80 EM",
      "er": "150% – 170% ER",
      "crit": "35%+ CR"
    },
    "statPriority": {
      "sands": "Vida%",
      "goblet": "Vida%",
      "circlet": "Vida% o Prob. Crítica (Favonius)",
      "substats": "1. Vida% y Vida Plana (38,000 – 48,000 HP) > 2. Recarga de Energía% (140% – 160% ER) > 3. Prob. Crítica (para Favonius)"
    }
  },
  {
    "id": "yaoyao",
    "name": {
      "es": "Yaoyao",
      "en": "Yaoyao"
    },
    "element": "Dendro",
    "rarity": 4,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Yaoyao.png",
    "tier": "T1 Dendro Healer",
    "role": "Discípula de Madame Ping • Rábanos Sanadores de Yuegui y Batería Dendro",
    "roleCategory": "healer_shield",
    "scalingType": "HP",
    "scalingLabel": "Escalado por Vida Máxima (HP%) & Rábanos de Yuegui",
    "bestWeapons": [
      {
        "name": "Borla Negra R5",
        "rarity": 3,
        "type": "BiS Vida F2P",
        "note": "+46.9% Vida Máx gratuita para curación colosal."
      },
      {
        "name": "Lanza de Favonius",
        "rarity": 4,
        "type": "BiS Utilidad",
        "note": "Partículas de recarga constantes para el equipo."
      },
      {
        "name": "Cruz de Kitain",
        "rarity": 4,
        "type": "Forja Inazuma",
        "note": "+Maestría y regeneración pasiva de energía."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Recuerdos del Bosque (4 piezas)",
        "type": "BiS Reducción RES",
        "bonus": "-30% Resistencia Dendro continua con los rábanos de Yuegui."
      },
      {
        "set": "Tenacidad de la Geoarmada (4 piezas)",
        "type": "BiS Buffer ATQ",
        "bonus": "+20% ATQ continuo para el equipo mientras Yuegui lanza rábanos."
      }
    ],
    "mainStats": {
      "sands": "Vida% o Recarga de Energía%",
      "goblet": "Vida%",
      "circlet": "Bono de Curación% o Vida%"
    },
    "substatsPriority": [
      "1. Vida% y Vida Plana (34,000 – 40,000 HP)",
      "2. Recarga de Energía% (160% – 190% ER)",
      "3. Maestría Elemental",
      "4. Prob. Crítica (Favonius)"
    ],
    "recommendedPanel": {
      "hp": "35,000 – 40,000 HP",
      "atk": "1,050 ATQ",
      "def": "750 DEF",
      "em": "100 EM",
      "er": "170% – 190% ER",
      "crit": "30% CR"
    },
    "talentPriority": "Habilidad Elemental (E - Yuegui) > Definitiva (Q) >>> Básicos",
    "metaTeams": [
      {
        "name": "Yaoyao Alhaitham Quicken",
        "members": [
          "Alhacén",
          "Yae Miko",
          "Fischl",
          "Yaoyao"
        ],
        "comp": "Alhacén • Yae Miko • Fischl • Yaoyao"
      },
      {
        "name": "Yaoyao Nilou Bloom",
        "members": [
          "Nilou",
          "Nahida",
          "Xingqiu",
          "Yaoyao"
        ],
        "comp": "Nilou • Nahida • Xingqiu • Yaoyao"
      }
    ],
    "benchmarks": {
      "hp": "35,000 – 40,000 HP",
      "atk": "1,050 ATQ",
      "def": "750 DEF",
      "em": "100 EM",
      "er": "170% – 190% ER",
      "crit": "30% CR"
    },
    "statPriority": {
      "sands": "Vida% o Recarga de Energía%",
      "goblet": "Vida%",
      "circlet": "Bono de Curación% o Vida%",
      "substats": "1. Vida% y Vida Plana (34,000 – 40,000 HP) > 2. Recarga de Energía% (160% – 190% ER) > 3. Maestría Elemental > 4. Prob. Crítica (Favonius)"
    }
  },
  {
    "id": "yanfei",
    "name": {
      "es": "Yanfei",
      "en": "Yanfei"
    },
    "element": "Pyro",
    "rarity": 4,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Feiyan.png",
    "tier": "T1 Vaporize / Tankfei",
    "role": "Letrada de Liyue • Hypercarry Pyro de Sellos Escarlatas o Escudo Escarlata (Tankfei C4)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% & Sellos Escarlatas",
    "bestWeapons": [
      {
        "name": "Oración Perdida a los Vientos Sagrados",
        "rarity": 5,
        "type": "BiS 5★ DPS",
        "note": "Crítico y bono elemental."
      },
      {
        "name": "Sinfonía de los Merodeadores (The Widsith)",
        "rarity": 4,
        "type": "BiS 4★ Gacha",
        "note": "Daño Crítico colosal."
      },
      {
        "name": "Prototipo Ámbar (Tankfei C4)",
        "rarity": 4,
        "type": "BiS Escudo Tankfei",
        "note": "Vida y curación con escudo colosal en C4."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Bruja Carmesí en Llamas (4 piezas)",
        "type": "BiS Vaporizados",
        "bonus": "+15% Bono Pyro y +15% Daño en Vaporizados."
      },
      {
        "set": "Orquesta del Errante (4 piezas)",
        "type": "BiS Ataques Cargados",
        "bonus": "+80 EM y +35% Daño continuo en Ataques Cargados."
      }
    ],
    "mainStats": {
      "sands": "ATQ% o EM",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% o Daño Crítico%"
    },
    "substatsPriority": [
      "1. Prob. Crítica / Daño Crítico (1:2)",
      "2. ATQ% (1,800 – 2,200 ATQ)",
      "3. Maestría Elemental (120 – 200 EM)",
      "4. Recarga de Energía% (130% ER)"
    ],
    "recommendedPanel": {
      "hp": "17,000 HP",
      "atk": "1,900 – 2,200 ATQ",
      "def": "750 DEF",
      "em": "150 – 220 EM",
      "er": "130% – 140% ER",
      "crit": "70%+ CR / 150%+ CD"
    },
    "talentPriority": "Ataque Normal (Cargados) > Definitiva (Q) = Habilidad Elemental (E)",
    "metaTeams": [
      {
        "name": "Yanfei Vape Classic",
        "members": [
          "Yanfei",
          "Xingqiu",
          "Yelan",
          "Bennett"
        ],
        "comp": "Yanfei • Xingqiu • Yelan • Bennett"
      },
      {
        "name": "Yanfei Overload Driver",
        "members": [
          "Yanfei",
          "Chevreuse",
          "Fischl",
          "Beidou"
        ],
        "comp": "Yanfei • Chevreuse • Fischl • Beidou"
      }
    ],
    "benchmarks": {
      "hp": "17,000 HP",
      "atk": "1,900 – 2,200 ATQ",
      "def": "750 DEF",
      "em": "150 – 220 EM",
      "er": "130% – 140% ER",
      "crit": "70%+ CR / 150%+ CD"
    },
    "statPriority": {
      "sands": "ATQ% o EM",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica% o Daño Crítico%",
      "substats": "1. Prob. Crítica / Daño Crítico (1:2) > 2. ATQ% (1,800 – 2,200 ATQ) > 3. Maestría Elemental (120 – 200 EM) > 4. Recarga de Energía% (130% ER)"
    }
  },
  {
    "id": "aino",
    "name": {
      "es": "Aino",
      "en": "Aino"
    },
    "element": "Hydro",
    "rarity": 4,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Aino.png",
    "tier": "T1 Support Hydro (Nod-Krai)",
    "role": "Soporte Elemental Hydro & Buffer de Maestría Elemental (EM)",
    "roleCategory": "support",
    "scalingType": "EM",
    "scalingLabel": "Escala con Maestría Elemental (EM) y Recarga de Energía",
    "bestWeapons": [
      {
        "name": "Sabiduría Fraguada (Flame-Forged Insight)",
        "rarity": 4,
        "type": "BiS",
        "note": "Mandoble de Maestría Elemental y soporte de reacciones lunares."
      },
      {
        "name": "Fierro Floriorlado (Mailed Flower R5)",
        "rarity": 4,
        "type": "Alternativa EM",
        "note": "Excelente aporte de Maestría Elemental pasiva."
      },
      {
        "name": "Gran Espada de Favonius (Favonius Greatsword)",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Generación de partículas blancas para todo el equipo."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Serenata de la Luna Tejida / Silken Moon's Serenade (4 piezas)",
        "type": "BiS",
        "bonus": "Aumenta la Maestría Elemental y potencia las reacciones del equipo."
      },
      {
        "set": "Instructor (4 piezas)",
        "type": "Opción F2P",
        "bonus": "+120 EM para todo el equipo tras activar una reacción."
      }
    ],
    "statPriority": {
      "sands": "Maestría Elemental o Recarga de Energía",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental o Prob. Crítica",
      "substats": "Maestría Elemental > Recarga de Energía% > Prob. Crítica > Daño Crítico"
    },
    "benchmarks": {
      "hp": "18,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "800 - 1,000 EM",
      "er": "160% - 180% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Nod-Krai Lunar Vaporize",
        "members": [
          "Aino",
          "Mualani",
          "Furina",
          "Xilonen"
        ],
        "comp": "Aino • Mualani • Furina • Xilonen"
      },
      {
        "name": "Nod-Krai Overburn",
        "members": [
          "Aino",
          "Kinich",
          "Xiangling",
          "Bennett"
        ],
        "comp": "Aino • Kinich • Xiangling • Bennett"
      }
    ],
    "mainStats": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental",
      "circlet": "Prob. Crítica / Maestría Elemental"
    },
    "substatsPriority": [
      "1. Maestría Elemental",
      "2. Recarga de Energía%",
      "3. Prob. Crítica",
      "4. Daño Crítico"
    ],
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "800 - 1,000 EM",
      "er": "160% - 180% ER",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "flins",
    "name": {
      "es": "Flins",
      "en": "Flins"
    },
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Flins.png",
    "tier": "T0 Lunar-Charged DPS",
    "role": "DPS Principal de Nod-Krai • Daño Electro Lunar de Alta Cadencia",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Multiplicadores de Carga Lunar",
    "bestWeapons": [
      {
        "name": "Bloodsoaked Ruins",
        "rarity": 5,
        "type": "BiS Firma Nod-Krai",
        "note": "+Prob. Crítica y aumento masivo al daño de ataques lunares."
      },
      {
        "name": "Halcón de Jade Primordial",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+Prob. Crítica y acumulación de ATQ% constante."
      },
      {
        "name": "Báculo de Homa",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+66.2% Daño Crítico y bono de ATQ por vida."
      },
      {
        "name": "La Captura (The Catch R5)",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "+32% Daño de Burst y +12% Prob. Crítica gratis."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Night of the Sky's Unveiling (4 piezas)",
        "note": "BiS Nod-Krai: Incrementa daño Electro y crítico tras invocar la noche."
      },
      {
        "set": "Furia del Trueno (4 piezas)",
        "note": "+15% Daño Electro y reducción de enfriamientos con reacciones."
      },
      {
        "set": "Gladiador (4 piezas)",
        "note": "+35% Daño en Ataques Normales."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Recarga de Energía",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Recarga de Energía% > EM"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "2,000 - 2,300",
      "def": "Base (~750)",
      "em": "0",
      "er": "130% - 140%",
      "crit": "75%+ CR / 170%+ CD"
    },
    "metaTeams": [
      {
        "name": "Flins Lunar Aggravate",
        "members": [
          "Flins",
          "Nahida",
          "Fischl",
          "Xilonen"
        ],
        "comp": "Flins • Nahida • Fischl • Xilonen"
      },
      {
        "name": "Flins Electro-Charged",
        "members": [
          "Flins",
          "Furina",
          "Yelan",
          "Jean"
        ],
        "comp": "Flins • Furina • Yelan • Jean"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Recarga de Energía%",
      "5. EM"
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga de Energía",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "2,000 - 2,300",
      "def": "Base (~750)",
      "em": "0",
      "er": "130% - 140%",
      "crit": "75%+ CR / 170%+ CD"
    }
  },
  {
    "id": "lauma",
    "name": {
      "es": "Lauma",
      "en": "Lauma"
    },
    "element": "Dendro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Lauma.png",
    "tier": "T0 Dendro Support",
    "role": "Buffer y Soporte Dendro de Nod-Krai • Reducción de Resistencia y Cura Continua",
    "roleCategory": "support",
    "scalingType": "EM",
    "scalingLabel": "Escalado por Maestría Elemental (EM) y Vida%",
    "bestWeapons": [
      {
        "name": "Nightweaver's Looking Glass",
        "rarity": 5,
        "type": "BiS Firma Nod-Krai",
        "note": "+EM y daño residual a núcleos dendro y reacciones."
      },
      {
        "name": "Mil Soles Flotantes (A Thousand Floating Dreams)",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "Buff masivo de EM para todo el equipo."
      },
      {
        "name": "Memorias de Sacrificio",
        "rarity": 4,
        "type": "Mejor 4★ Gacha",
        "note": "+221 EM y doble aplicación Dendro."
      },
      {
        "name": "Prototipo Ámbar (Prototype Amber R5)",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "Curación grupal adicional y recarga pasiva."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Recuerdos del Bosque (4 piezas)",
        "note": "BiS Indiscutible: -30% Resistencia Dendro enemiga continua."
      },
      {
        "set": "Sueños Áureos (4 piezas)",
        "note": "Hasta +230 EM adicional tras activar reacciones."
      },
      {
        "set": "Instructor (4 piezas)",
        "note": "+120 EM a todo el equipo."
      }
    ],
    "statPriority": {
      "sands": "Maestría Elemental o Recarga de Energía",
      "goblet": "Maestría Elemental o Bono Daño Dendro%",
      "circlet": "Maestría Elemental o Prob. Crítica",
      "substats": "Maestría Elemental > Recarga de Energía% > Prob. Crítica > Daño Crítico"
    },
    "benchmarks": {
      "hp": "20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "850 - 1,000 EM",
      "er": "160% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Lauma Hyperbloom Core",
        "members": [
          "Lauma",
          "Raiden",
          "Furina",
          "Alhacén"
        ],
        "comp": "Lauma • Raiden • Furina • Alhacén"
      },
      {
        "name": "Lauma Nilou Bloom",
        "members": [
          "Lauma",
          "Nilou",
          "Kokomi",
          "Nahida"
        ],
        "comp": "Lauma • Nilou • Kokomi • Nahida"
      }
    ],
    "substatsPriority": [
      "1. Maestría Elemental",
      "2. Recarga de Energía%",
      "3. Prob. Crítica",
      "4. Daño Crítico"
    ],
    "mainStats": {
      "sands": "Maestría Elemental o Recarga de Energía",
      "goblet": "Maestría Elemental o Bono Daño Dendro%",
      "circlet": "Maestría Elemental o Prob. Crítica"
    },
    "recommendedPanel": {
      "hp": "20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "850 - 1,000 EM",
      "er": "160% ER",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "alyosha",
    "name": {
      "es": "Alyosha",
      "en": "Alyosha"
    },
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Alyosha.png",
    "tier": "T1 Stellar-Conduct Support",
    "role": "Soporte de Conducto Estelar Electro (Buffer de ATQ% y Recarga)",
    "roleCategory": "support",
    "scalingType": "ATK",
    "scalingLabel": "Escala con ATQ% total y Recarga de Energía",
    "bestWeapons": [
      {
        "name": "Luz del Segador (Engulfing Lightning)",
        "rarity": 5,
        "type": "BiS",
        "note": "Convierte Recarga de Energía en ATQ% masivo para su buff."
      },
      {
        "name": "Lanza de Favonius (Favonius Lance)",
        "rarity": 4,
        "type": "Mejor 4★ Batería",
        "note": "Recarga de energía y partículas para rotaciones continuas."
      },
      {
        "name": "La Captura (The Catch R5)",
        "rarity": 4,
        "type": "Opción F2P",
        "note": "+45.9% ER y +32% Daño de Habilidad Definitiva."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "type": "BiS",
        "bonus": "+20% Daño de Definitiva y +20% ATQ para todo el equipo."
      },
      {
        "set": "Emblema del Destino (4 piezas)",
        "type": "Alternativa ER",
        "bonus": "+20% Recarga de Energía y daño de Definitiva."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía o ATQ%",
      "goblet": "ATQ% o Bono Daño Cryo%",
      "circlet": "Prob. Crítica o ATQ%",
      "substats": "Recarga de Energía% > Prob. Crítica > ATQ% > Daño Crítico"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "2,000 ATQ",
      "def": "Base (~750)",
      "em": "0",
      "er": "220% - 250% ER",
      "crit": "55%+ CR"
    },
    "metaTeams": [
      {
        "name": "Snezhnaya Superconduct Core",
        "members": [
          "Alyosha",
          "Eula",
          "Raiden",
          "Zhongli"
        ],
        "comp": "Alyosha • Eula • Raiden • Zhongli"
      },
      {
        "name": "Snezhnaya Freeze Control",
        "members": [
          "Alyosha",
          "Ayaka",
          "Furina",
          "Kazuha"
        ],
        "comp": "Alyosha • Ayaka • Furina • Kazuha"
      }
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga de Energía",
      "goblet": "ATQ%",
      "circlet": "ATQ% o Prob. Crítica"
    },
    "substatsPriority": [
      "1. Recarga de Energía%",
      "2. Prob. Crítica",
      "3. ATQ%",
      "4. Daño Crítico"
    ],
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "2,000 ATQ",
      "def": "Base (~750)",
      "em": "0",
      "er": "220% - 250% ER",
      "crit": "55%+ CR"
    }
  },
  {
    "id": "vesna",
    "name": {
      "es": "Vesna",
      "en": "Vesna"
    },
    "element": "Anemo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Vesna.png",
    "tier": "T0.5 Stellar-Swirl DPS",
    "role": "Main DPS Anemo de Torbellino Estelar (Stellar-Swirl DPS)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escala con ATQ% y Críticos",
    "bestWeapons": [
      {
        "name": "Allende la Crisálida (Beyond the Chrysalis)",
        "rarity": 5,
        "type": "BiS Absoluto (Firma)",
        "note": "Espada ligera firma de Vesna para daño de Torbellino Estelar."
      },
      {
        "name": "Reflejo de las Tinieblas (Mistsplitter Reforged)",
        "rarity": 5,
        "type": "Alternativa 5★",
        "note": "Daño Crítico alto y bono elemental."
      },
      {
        "name": "Cortador de Jade Primordial (Primordial Jade Cutter)",
        "rarity": 5,
        "type": "Stat-Stick CR",
        "note": "44.1% Prob. Crítica y bono de ATQ."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Testimonio Escarlata / Scarlet Proof (4 piezas)",
        "type": "BiS",
        "bonus": "Potencia el daño de Torbellino Estelar y Crítico."
      },
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "type": "Alternativa Anemo",
        "bonus": "+15% Daño Anemo y -40% RES Elemental."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Anemo%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Maestría Elemental > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "1,900 - 2,200",
      "def": "Base (~750)",
      "em": "0",
      "er": "125%",
      "crit": "70%+ CR / 180%+ CD"
    },
    "metaTeams": [
      {
        "name": "Vesna Stellar Swirl",
        "members": [
          "Vesna",
          "Faruzan",
          "Furina",
          "Bennett"
        ],
        "comp": "Vesna • Faruzan • Furina • Bennett"
      },
      {
        "name": "Vesna National Hyper",
        "members": [
          "Vesna",
          "Xiangling",
          "Xingqiu",
          "Bennett"
        ],
        "comp": "Vesna • Xiangling • Xingqiu • Bennett"
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "ATQ% o Bono Daño Anemo%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Maestría Elemental",
      "5. Recarga"
    ],
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "1,900 - 2,200",
      "def": "Base (~750)",
      "em": "0",
      "er": "125%",
      "crit": "70%+ CR / 180%+ CD"
    }
  },
  {
    "id": "vodyanitsa",
    "name": {
      "es": "Vodyanitsa",
      "en": "Vodyanitsa"
    },
    "element": "Hydro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Vodyanitsa.png",
    "tier": "T0.5 Freeze Support Hydro",
    "role": "Soporte Hydro Especialista en Congelados y Escudo/Buff de Vida",
    "roleCategory": "support",
    "scalingType": "HP",
    "scalingLabel": "Escala 100% con Vida Máxima (HP%)",
    "bestWeapons": [
      {
        "name": "Himno del Vórtice (Hymn of the Maelstrom)",
        "rarity": 5,
        "type": "BiS Absoluto (Firma)",
        "note": "Catalizador firma con Vida% masiva y amplificación de equipo Freeze."
      },
      {
        "name": "Cuentos de Cazadores de Dragones (TTDS R5)",
        "rarity": 3,
        "type": "Mejor Buffer F2P",
        "note": "+35.2% Vida y +48% ATQ al DPS principal."
      },
      {
        "name": "Prototipo Ámbar (Prototype Amber R5)",
        "rarity": 4,
        "type": "Batería & Curación",
        "note": "41.3% Vida y regeneración de energía."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Tenacidad de la Geoarmada (4 piezas)",
        "type": "BiS",
        "bonus": "+20% Vida y +20% ATQ para todo el equipo."
      },
      {
        "set": "Serenata de la Luna Tejida (4 piezas)",
        "type": "Alternativa Soporte",
        "bonus": "Soporte de reacciones elementales."
      }
    ],
    "statPriority": {
      "sands": "Vida% o Recarga de Energía",
      "goblet": "Vida%",
      "circlet": "Bono de Curación% o Vida%",
      "substats": "Vida% > Recarga de Energía% > Vida Plana > Prob. Crítica (Favonius)"
    },
    "benchmarks": {
      "hp": "38,000 - 45,000 HP (Cura: 6,500+ por tick)",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "170% - 190% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Permafrost Supremo",
        "members": [
          "Ayaka",
          "Vodyanitsa",
          "Shenhe",
          "Kazuha"
        ],
        "comp": "Ayaka • Vodyanitsa • Shenhe • Kazuha"
      },
      {
        "name": "Vodyanitsa Vaporize",
        "members": [
          "Arlecchino",
          "Vodyanitsa",
          "Yelan",
          "Bennett"
        ],
        "comp": "Arlecchino • Vodyanitsa • Yelan • Bennett"
      }
    ],
    "mainStats": {
      "sands": "Vida%",
      "goblet": "Vida%",
      "circlet": "Vida%"
    },
    "substatsPriority": [
      "1. Vida%",
      "2. Recarga de Energía%",
      "3. Vida Plana",
      "4. Prob. Crítica (Favonius)"
    ],
    "recommendedPanel": {
      "hp": "38,000 - 45,000 HP (Cura: 6,500+ por tick)",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "170% - 190% ER",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "skirk",
    "name": {
      "es": "Skirk",
      "en": "Skirk"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_SkirkNew.png",
    "tier": "T0 Void Sword DPS",
    "role": "Maestra del Abismo • Hipercarry Cryo de Daño Cataclísmico",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escala con ATQ%, Daño Crítico y Multiplicador del Vacío",
    "bestWeapons": [
      {
        "name": "Azurelight",
        "rarity": 5,
        "type": "BiS Firma Oficial",
        "note": "+44.1% Daño Crítico y penetración de resistencia abisal."
      },
      {
        "name": "Reflejo de las Tinieblas (Mistsplitter)",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+44.1% Daño Crítico y hasta +28% Bono Elemental."
      },
      {
        "name": "Cortador de Jade Primordial",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+44.1% Prob. Crítica y ATQ por vida."
      },
      {
        "name": "Espada Negra (The Black Sword R5)",
        "rarity": 4,
        "type": "Pase de Batalla",
        "note": "+40% Daño a Normales/Cargados y auto-cura."
      },
      {
        "name": "Vado del Río Ceniciento",
        "rarity": 4,
        "type": "Opción F2P Pesca",
        "note": "+16% Prob. Crítica en Habilidad Elemental."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Finale of the Deep Galleries (4 piezas)",
        "type": "BiS Oficial Indiscutible",
        "bonus": "Con 0 de Energía Elemental, +60% Daño de Ataques Normales y +60% Daño de Definitiva. (No consume ni requiere energía)."
      },
      {
        "set": "Cazador Sombrío (4 piezas)",
        "type": "BiS con Furina",
        "bonus": "+36% Prob. Crítica permanente con fluctuaciones de vida de Furina."
      },
      {
        "set": "Nómada del Invierno (4 piezas)",
        "type": "Alternativa Permafrost",
        "bonus": "+40% Prob. Crítica contra enemigos congelados en composiciones Freeze."
      }
    ],
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Daño Crítico o Prob. Crítica",
      "substats": "Daño Crítico > Prob. Crítica > ATQ%"
    },
    "benchmarks": {
      "hp": "17,500 - 19,500 HP",
      "atk": "2,300 - 2,600 ATQ",
      "def": "750 - 850 DEF",
      "em": "0 (No requerida)",
      "er": "100% (Base estricta - El set BiS exige 0 Energía)",
      "crit": "75%+ CR / 220%+ CD"
    },
    "metaTeams": [
      {
        "name": "Skirk Abyssal Freeze (Top Meta)",
        "members": [
          "Skirk",
          "Escoffier",
          "Furina",
          "Shenhe"
        ],
        "comp": "Skirk • Escoffier • Furina • Shenhe"
      },
      {
        "name": "Skirk Mono Cryo Cataclysm",
        "members": [
          "Skirk",
          "Shenhe",
          "Kazuha",
          "Citlali"
        ],
        "comp": "Skirk • Shenhe • Kazuha • Citlali"
      },
      {
        "name": "Skirk Permafrost F2P",
        "members": [
          "Skirk",
          "Xingqiu",
          "Rosaria",
          "Dahlia"
        ],
        "comp": "Skirk • Xingqiu • Rosaria • Dahlia"
      }
    ],
    "substatsPriority": [
      "1. Daño Crítico",
      "2. Prob. Crítica",
      "3. ATQ%",
      "4. ATQ Plano",
      "✕ Recarga de Energía (Inútil: El set BiS exige tener 0 Energía Elemental)",
      "✕ Maestría Elemental (Inútil: En Permafrost/Mono Cryo no genera daño)"
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Daño Crítico o Prob. Crítica"
    },
    "recommendedPanel": {
      "hp": "17,500 - 19,500 HP",
      "atk": "2,300 - 2,600 ATQ",
      "def": "750 - 850 DEF",
      "em": "0 (No requerida)",
      "er": "100% (Base estricta - El set BiS exige 0 Energía)",
      "crit": "75%+ CR / 220%+ CD"
    },
    "talentPriority": "Definitiva (Q) = Habilidad Elemental (E) > Ataque Normal"
  },
  {
    "id": "durin",
    "name": {
      "es": "Durin",
      "en": "Durin"
    },
    "element": "Pyro",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Durin.png",
    "tier": "T0 Hexerei Sub-DPS",
    "role": "Dragón del Aquelarre (Hexenzirkel) • Sub-DPS Pyro Off-Field y Reacciones Devastadoras",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ%, Maestría Elemental y Daño Hexerei",
    "bestWeapons": [
      {
        "name": "Athame Artis",
        "rarity": 5,
        "type": "BiS Firma Hexerei",
        "note": "+Crítico y daño colosal fuera de campo a habilidades de dragón."
      },
      {
        "name": "Reflejo de las Tinieblas",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+Daño Crítico y bono Pyro universal."
      },
      {
        "name": "Deseo Ponzoñoso (Festering Desire R5)",
        "rarity": 4,
        "type": "BiS Evento",
        "note": "+32% Daño y +12% Crítico en Habilidad Elemental."
      },
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Asegura rotaciones continuas de energía."
      }
    ],
    "bestArtifacts": [
      {
        "set": "A Day Carved from Rising Winds (4 piezas)",
        "note": "BiS Hexerei: Potencia reacciones Pyro y otorga daño apilable."
      },
      {
        "set": "Compañía Dorada (4 piezas)",
        "note": "+70% Daño de Habilidad Elemental fuera de campo."
      },
      {
        "set": "Bruja Carmesí en Llamas (4 piezas)",
        "note": "+15% Bono Pyro y +15% Daño a Vaporizado/Derretido."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Maestría Elemental > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "2,100",
      "def": "Base (~750)",
      "em": "150 - 250 EM",
      "er": "120% ER",
      "crit": "70%+ CR / 180%+ CD"
    },
    "metaTeams": [
      {
        "name": "Durin Hexerei Vaporize",
        "members": [
          "Durin",
          "Furina",
          "Yelan",
          "Xilonen"
        ],
        "comp": "Durin • Furina • Yelan • Xilonen"
      },
      {
        "name": "Durin Melt Core",
        "members": [
          "Durin",
          "Wriothesley",
          "Shenhe",
          "Bennett"
        ],
        "comp": "Durin • Wriothesley • Shenhe • Bennett"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Maestría Elemental",
      "5. Recarga"
    ],
    "mainStats": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "2,100",
      "def": "Base (~750)",
      "em": "150 - 250 EM",
      "er": "120% ER",
      "crit": "70%+ CR / 180%+ CD"
    }
  },
  {
    "id": "varka",
    "name": {
      "es": "Varka",
      "en": "Varka"
    },
    "element": "Anemo",
    "rarity": 5,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Varka.png",
    "tier": "T0 Hexerei Sovereign DPS",
    "role": "Gran Maestro de los Caballeros de Favonius • Mandoble Anemo de Fuerza Titánica",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ Bruto, Fuerza de Ruptura y Torbellino de Mandoble",
    "bestWeapons": [
      {
        "name": "Gest of the Mighty Wolf",
        "rarity": 5,
        "type": "BiS Firma Oficial",
        "note": "+Crítico masivo y daño descomunal a tajos de mandoble Anemo."
      },
      {
        "name": "Lápida del Lobo (Wolf's Gravestone)",
        "rarity": 5,
        "type": "Opción 5★ Lore",
        "note": "+ATQ% masivo y buff al escuadrón."
      },
      {
        "name": "Médula de la Serpiente Marina (Serpent Spine)",
        "rarity": 4,
        "type": "BiS 4★ Pase",
        "note": "+Prob. Crítica y hasta +50% daño total."
      },
      {
        "name": "Sombra de la Marea (Tidal Shadow R5)",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "+48% ATQ tras recibir curación."
      }
    ],
    "bestArtifacts": [
      {
        "set": "A Day Carved from Rising Winds (4 piezas)",
        "note": "BiS Hexerei: Incrementa daño de mandoble y torbellino anemo."
      },
      {
        "set": "Pabellón del Desierto (4 piezas)",
        "note": "+40% Daño a Normales y Cargados tras cargado."
      },
      {
        "set": "Gladiador (4 piezas)",
        "note": "+35% Daño en Ataques Normales."
      }
    ],
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Anemo%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Recarga de Energía% > EM"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "2,300 - 2,600",
      "def": "Base (~750)",
      "em": "0",
      "er": "130%",
      "crit": "75%+ CR / 180%+ CD"
    },
    "metaTeams": [
      {
        "name": "Varka Favonius Sovereign",
        "members": [
          "Varka",
          "Faruzan",
          "Furina",
          "Bennett"
        ],
        "comp": "Varka • Faruzan • Furina • Bennett"
      },
      {
        "name": "Varka Hexerei Cleave",
        "members": [
          "Varka",
          "Xilonen",
          "Yelan",
          "Zhongli"
        ],
        "comp": "Varka • Xilonen • Yelan • Zhongli"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Recarga de Energía%",
      "5. EM"
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Anemo%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "2,300 - 2,600",
      "def": "Base (~750)",
      "em": "0",
      "er": "130%",
      "crit": "75%+ CR / 180%+ CD"
    }
  },
  {
    "id": "ifa",
    "name": {
      "es": "Ifa",
      "en": "Ifa"
    },
    "element": "Anemo",
    "rarity": 4,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Ifa.png",
    "tier": "T1 Natlan Swirl Support",
    "role": "Veterinario Saurio de Natlan • Soporte Anemo Swirl y Curación Elemental",
    "roleCategory": "support",
    "scalingType": "EM",
    "scalingLabel": "Escalado por Maestría Elemental (EM) y Vida%",
    "bestWeapons": [
      {
        "name": "Sunny Morning Sleep-In",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+EM y daño a torbellinos."
      },
      {
        "name": "Memorias de Sacrificio",
        "rarity": 4,
        "type": "BiS 4★",
        "note": "+221 EM y reinicio de E."
      },
      {
        "name": "Cuentos de Cazadores de Dragones (TTDS)",
        "rarity": 3,
        "type": "Buffer F2P",
        "note": "+48% ATQ."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "note": "-40% Resistencia elemental enemiga."
      },
      {
        "set": "Instructor (4 piezas)",
        "note": "+120 EM al equipo."
      }
    ],
    "statPriority": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental",
      "substats": "Maestría Elemental > Recarga de Energía% > Vida%"
    },
    "benchmarks": {
      "hp": "17,000 - 20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "800+ EM",
      "er": "160%",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Ifa Swirl Assist",
        "members": [
          "Mavuika",
          "Chasca",
          "Ifa",
          "Bennett"
        ],
        "comp": "Mavuika • Chasca • Ifa • Bennett"
      },
      {
        "name": "Ifa National Anemo Driver",
        "members": [
          "Ifa",
          "Xiangling",
          "Xingqiu",
          "Bennett"
        ],
        "comp": "Ifa • Xiangling • Xingqiu • Bennett"
      }
    ],
    "substatsPriority": [
      "1. Maestría Elemental",
      "2. Recarga de Energía%",
      "3. Vida%"
    ],
    "mainStats": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental"
    },
    "recommendedPanel": {
      "hp": "17,000 - 20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "800+ EM",
      "er": "160%",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "lan_yan",
    "name": {
      "es": "Lan Yan",
      "en": "Lan Yan"
    },
    "element": "Anemo",
    "rarity": 4,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Lanyan.png",
    "tier": "T1 Anemo Shielder",
    "role": "Escudera Anemo y Control de Masas • Escudo de Viento Absorbente",
    "roleCategory": "healer_shielder",
    "scalingType": "ATK",
    "scalingLabel": "Escudo escala con ATQ% y Recarga de Energía",
    "bestWeapons": [
      {
        "name": "Candado Terrenal (Memory of Dust)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Fuerza de escudo y ATQ%."
      },
      {
        "name": "Ojo de la Perspicacia",
        "rarity": 4,
        "type": "Opción ATQ",
        "note": "+ATQ% para el escudo."
      },
      {
        "name": "Cuentos de Cazadores de Dragones",
        "rarity": 3,
        "type": "Buffer F2P",
        "note": "+48% ATQ transferible."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "note": "-40% Resistencia enemiga."
      },
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "+20% ATQ."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Recarga",
      "goblet": "ATQ%",
      "circlet": "ATQ%",
      "substats": "ATQ% > Recarga de Energía% > Prob. Crítica"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "2,400+ ATQ",
      "def": "Base (~750)",
      "em": "0",
      "er": "180%",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Lan Yan Shield Anemo",
        "members": [
          "Xiao",
          "Faruzan",
          "Lan Yan",
          "Furina"
        ],
        "comp": "Xiao • Faruzan • Lan Yan • Furina"
      },
      {
        "name": "Lan Yan Hyperbloom Shielder",
        "members": [
          "Alhacén",
          "Lan Yan",
          "Nahida",
          "Xingqiu"
        ],
        "comp": "Alhacén • Lan Yan • Nahida • Xingqiu"
      }
    ],
    "substatsPriority": [
      "1. ATQ%",
      "2. Recarga de Energía%",
      "3. Prob. Crítica"
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga",
      "goblet": "ATQ%",
      "circlet": "ATQ%"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "2,400+ ATQ",
      "def": "Base (~750)",
      "em": "0",
      "er": "180%",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "illuga",
    "name": {
      "es": "Illuga",
      "en": "Illuga"
    },
    "element": "Geo",
    "rarity": 4,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Illuga.png",
    "tier": "T1 Lunar-Crystallize Support",
    "role": "Soporte Geo de Cristalización Lunar • Escudos Reforzados y Buff de Daño",
    "roleCategory": "support",
    "scalingType": "DEF",
    "scalingLabel": "Escalado por DEF% y Maestría Elemental",
    "bestWeapons": [
      {
        "name": "Lanza de Favonius",
        "rarity": 4,
        "type": "BiS Batería",
        "note": "Batería de energía."
      },
      {
        "name": "Huella del Arcoíris",
        "rarity": 4,
        "type": "Forja Natlan",
        "note": "+DEF% masiva."
      },
      {
        "name": "La Captura R5 (The Catch)",
        "rarity": 4,
        "type": "BiS F2P Pesca",
        "note": "+45.9% Recarga y +32% Daño en Definitiva."
      },
      {
        "name": "Balada de los Fiordos",
        "rarity": 4,
        "type": "Pase de Batalla",
        "note": "+27.6% Prob. Crítica y Maestría Elemental."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Silken Moon's Serenade (4 piezas)",
        "note": "BiS Cristalización Lunar."
      },
      {
        "set": "Cáscara de Sueños Opulentos (4 piezas)",
        "note": "+DEF% y Bono Geo."
      }
    ],
    "statPriority": {
      "sands": "DEF% o Recarga",
      "goblet": "DEF%",
      "circlet": "DEF% o Prob. Crítica",
      "substats": "DEF% > Recarga de Energía% > Maestría Elemental"
    },
    "benchmarks": {
      "hp": "16,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "2,500 DEF",
      "em": "0",
      "er": "170%",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Illuga Geo Resonance",
        "members": [
          "Navia",
          "Illuga",
          "Furina",
          "Bennett"
        ],
        "comp": "Navia • Illuga • Furina • Bennett"
      },
      {
        "name": "Illuga Spallation Crystal",
        "members": [
          "Illuga",
          "Chiori",
          "Furina",
          "Bennett"
        ],
        "comp": "Illuga • Chiori • Furina • Bennett"
      }
    ],
    "substatsPriority": [
      "1. DEF%",
      "2. Recarga de Energía%",
      "3. Maestría Elemental"
    ],
    "mainStats": {
      "sands": "DEF% o Recarga",
      "goblet": "DEF%",
      "circlet": "DEF% o Prob. Crítica"
    },
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "2,500 DEF",
      "em": "0",
      "er": "170%",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "ineffa",
    "name": {
      "es": "Ineffa",
      "en": "Ineffa"
    },
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Ineffa.png",
    "tier": "T0 Electro Sub-DPS",
    "role": "Sub-DPS Electro de Invocación Lunar • Descargas de Alta Frecuencia",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Maestría Elemental",
    "bestWeapons": [
      {
        "name": "Fractured Halo",
        "rarity": 5,
        "type": "BiS Firma",
        "note": "+Crítico y daño de descargas lunares."
      },
      {
        "name": "Báculo de las Arenas Escarlatas",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "Convierte EM en ATQ."
      },
      {
        "name": "La Captura (The Catch R5)",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "+32% Daño Definitiva."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Aubade of Morningstar and Moon (4 piezas)",
        "note": "BiS Daño Lunar."
      },
      {
        "set": "Compañía Dorada (4 piezas)",
        "note": "+70% Daño Habilidad Elemental."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o EM",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > EM > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "1,900",
      "def": "Base (~750)",
      "em": "150 EM",
      "er": "120% ER",
      "crit": "70%+ CR / 160%+ CD"
    },
    "metaTeams": [
      {
        "name": "Ineffa Aggravate",
        "members": [
          "Alhacén",
          "Ineffa",
          "Nahida",
          "Zhongli"
        ],
        "comp": "Alhacén • Ineffa • Nahida • Zhongli"
      },
      {
        "name": "Ineffa Hyperbloom Battery",
        "members": [
          "Ineffa",
          "Xingqiu",
          "Nahida",
          "Kuki Shinobu"
        ],
        "comp": "Ineffa • Xingqiu • Nahida • Kuki Shinobu"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. EM",
      "5. Recarga"
    ],
    "mainStats": {
      "sands": "ATQ% o EM",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "1,900",
      "def": "Base (~750)",
      "em": "150 EM",
      "er": "120% ER",
      "crit": "70%+ CR / 160%+ CD"
    }
  },
  {
    "id": "linnea",
    "name": {
      "es": "Linnea",
      "en": "Linnea"
    },
    "element": "Geo",
    "rarity": 5,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Linnea.png",
    "tier": "T0.5 Lunar-Crystallize Sub-DPS",
    "role": "Sub-DPS Geo de Cristalización Lunar (Escala con DEF%)",
    "roleCategory": "sub_dps",
    "scalingType": "DEF",
    "scalingLabel": "Escala con Defensa (DEF%) y Críticos",
    "bestWeapons": [
      {
        "name": "Rama del Juramento Escarchado (Golden Frostbound Oath)",
        "rarity": 5,
        "type": "BiS Absoluto (Firma)",
        "note": "Arco firma de Linnéa con DEF%, Crítico y bono de Cristalización Lunar."
      },
      {
        "name": "Aqua Simulacra",
        "rarity": 5,
        "type": "Alternativa 5★",
        "note": "88.2% Daño Crítico y +20% Daño total incluso fuera de campo."
      },
      {
        "name": "Arco de Favonius (Favonius Warbow)",
        "rarity": 4,
        "type": "Mejor F2P Batería",
        "note": "Recarga de Energía y partículas para el equipo."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Alborada de la Estrella del Alba y la Luna / Aubade of Morningstar and Moon (4 piezas)",
        "type": "BiS",
        "bonus": "Maximiza el daño Sub-DPS y reacciones de Cristalización Lunar."
      },
      {
        "set": "Cáscara de Sueños Opulentos (4 piezas)",
        "type": "Alternativa DEF",
        "bonus": "+54% DEF y +24% Bono Daño Geo."
      }
    ],
    "statPriority": {
      "sands": "DEF%",
      "goblet": "Bono Daño Geo% o DEF%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > DEF% > Recarga"
    },
    "benchmarks": {
      "hp": "16,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "2,600+ DEF",
      "em": "0",
      "er": "120% ER",
      "crit": "70%+ CR / 150%+ CD"
    },
    "metaTeams": [
      {
        "name": "Linnea Geo Crystal",
        "members": [
          "Itto",
          "Linnea",
          "Gorou",
          "Zhongli"
        ],
        "comp": "Itto • Linnea • Gorou • Zhongli"
      },
      {
        "name": "Linnea Double Geo Core",
        "members": [
          "Navia",
          "Linnea",
          "Xiangling",
          "Bennett"
        ],
        "comp": "Navia • Linnea • Xiangling • Bennett"
      }
    ],
    "mainStats": {
      "sands": "DEF%",
      "goblet": "DEF% o Bono Daño Geo%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. DEF%",
      "4. Recarga"
    ],
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "2,600+ DEF",
      "em": "0",
      "er": "120% ER",
      "crit": "70%+ CR / 150%+ CD"
    }
  },
  {
    "id": "nefer",
    "name": {
      "es": "Nefer",
      "en": "Nefer"
    },
    "element": "Dendro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Nefer.png",
    "tier": "T0 Lunar-Bloom DPS",
    "role": "DPS Dendro Lunar • Detonación Rápida de Semillas y Reacciones Bloom",
    "roleCategory": "main_dps",
    "scalingType": "EM",
    "scalingLabel": "Escala con Maestría Elemental y Daño Crítico",
    "bestWeapons": [
      {
        "name": "Reliquary of Truth",
        "rarity": 5,
        "type": "BiS Firma",
        "note": "+EM colosal y crítico a semillas."
      },
      {
        "name": "Sueños de las Mil Noches",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+265 EM."
      },
      {
        "name": "Memorias de Sacrificio",
        "rarity": 4,
        "type": "BiS 4★",
        "note": "+221 EM."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Códice de Obsidiana (4 piezas)",
        "note": "+40% Prob. Crítica en estado Nightsoul."
      },
      {
        "set": "Flor del Paraíso Perdido (4 piezas)",
        "note": "+80% Daño a Florecimiento/Hiperflorecimiento."
      }
    ],
    "statPriority": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental o Bono Dendro%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Maestría Elemental > Prob. Crítica > Daño Crítico > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "850+ EM",
      "er": "120% ER",
      "crit": "60%+ CR / 140%+ CD"
    },
    "metaTeams": [
      {
        "name": "Nefer Lunar Bloom",
        "members": [
          "Nefer",
          "Nilou",
          "Kokomi",
          "Nahida"
        ],
        "comp": "Nefer • Nilou • Kokomi • Nahida"
      },
      {
        "name": "Nefer Hyperbloom Catalyze",
        "members": [
          "Nefer",
          "Xingqiu",
          "Raiden",
          "Baizhu"
        ],
        "comp": "Nefer • Xingqiu • Raiden • Baizhu"
      }
    ],
    "substatsPriority": [
      "1. Maestría Elemental",
      "2. Prob. Crítica",
      "3. Daño Crítico",
      "4. Recarga"
    ],
    "mainStats": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental o Bono Dendro%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "850+ EM",
      "er": "120% ER",
      "crit": "60%+ CR / 140%+ CD"
    }
  },
  {
    "id": "odette",
    "name": {
      "es": "Odette",
      "en": "Odette"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Odette.png",
    "tier": "T0.5 Stellar-Glimmer Sub-DPS",
    "role": "Sub-DPS Cryo de Fulgor Estelar (Stellar-Glimmer Sub-DPS)",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escala con ATQ% y Críticos",
    "bestWeapons": [
      {
        "name": "Pluma Invernal Lagoblanco (Whitelake Frostfeather)",
        "rarity": 5,
        "type": "BiS Absoluto (Firma)",
        "note": "Espada ligera firma de Odette con Crítico y bono de Fulgor Estelar."
      },
      {
        "name": "Reflejo de las Tinieblas (Mistsplitter Reforged)",
        "rarity": 5,
        "type": "Alternativa 5★",
        "note": "44.1% Daño Crítico y Bono Elemental."
      },
      {
        "name": "Cortador de Jade Primordial (Primordial Jade Cutter)",
        "rarity": 5,
        "type": "Stat-Stick CR",
        "note": "44.1% Prob. Crítica y bono de ATQ."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Corazón Forjado / Heart of the Furnace (4 piezas)",
        "type": "BiS",
        "bonus": "Aumenta el daño Sub-DPS de Fulgor Estelar y Crítico."
      },
      {
        "set": "Compañía Dorada (4 piezas)",
        "type": "Alternativa Off-Field",
        "bonus": "+70% Daño de Habilidad Elemental fuera de campo."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Recarga",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "2,000",
      "def": "Base (~750)",
      "em": "0",
      "er": "140%",
      "crit": "70%+ CR / 170%+ CD"
    },
    "metaTeams": [
      {
        "name": "Odette Freeze",
        "members": [
          "Ayaka",
          "Odette",
          "Furina",
          "Kazuha"
        ],
        "comp": "Ayaka • Odette • Furina • Kazuha"
      },
      {
        "name": "Odette Reverse Melt",
        "members": [
          "Odette",
          "Xiangling",
          "Bennett",
          "Kazuha"
        ],
        "comp": "Odette • Xiangling • Bennett • Kazuha"
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "ATQ% o Bono Daño Cryo%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Recarga"
    ],
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "2,000",
      "def": "Base (~750)",
      "em": "0",
      "er": "140%",
      "crit": "70%+ CR / 170%+ CD"
    }
  },
  {
    "id": "prune",
    "name": {
      "es": "Prune",
      "en": "Prune"
    },
    "element": "Anemo",
    "rarity": 4,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Prune.png",
    "tier": "T1 Hexerei Sub-DPS",
    "role": "Sub-DPS y Soporte Hexerei • Vórtices Anemo y Debuff de Resistencia",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Maestría Elemental",
    "bestWeapons": [
      {
        "name": "Atlas del Cielo (Skyward Atlas)",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+ATQ% masivo y bono elemental."
      },
      {
        "name": "Ojo del Juramento",
        "rarity": 4,
        "type": "Opción Evento",
        "note": "+Recarga tras usar E."
      },
      {
        "name": "Cuentos de Cazadores de Dragones",
        "rarity": 3,
        "type": "Buffer F2P",
        "note": "+48% ATQ."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "note": "-40% Resistencia enemiga."
      },
      {
        "set": "Compañía Dorada (4 piezas)",
        "note": "+70% Daño E fuera de campo."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Recarga",
      "goblet": "Bono Daño Anemo%",
      "circlet": "Prob. Crítica o ATQ%",
      "substats": "ATQ% > Recarga de Energía% > Maestría Elemental"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "1,900",
      "def": "Base (~750)",
      "em": "0",
      "er": "170%",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Prune Swirl",
        "members": [
          "Klee",
          "Prune",
          "Furina",
          "Bennett"
        ],
        "comp": "Klee • Prune • Furina • Bennett"
      },
      {
        "name": "Prune Electro Swirl Taser",
        "members": [
          "Prune",
          "Yae Miko",
          "Furina",
          "Baizhu"
        ],
        "comp": "Prune • Yae Miko • Furina • Baizhu"
      }
    ],
    "substatsPriority": [
      "1. ATQ%",
      "2. Recarga de Energía%",
      "3. Maestría Elemental"
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga",
      "goblet": "Bono Daño Anemo%",
      "circlet": "Prob. Crítica o ATQ%"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "1,900",
      "def": "Base (~750)",
      "em": "0",
      "er": "170%",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "varesa",
    "name": {
      "es": "Varesa",
      "en": "Varesa"
    },
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Varesa.png",
    "tier": "T0 Electro Hypercarry",
    "role": "Hipercarry Electro • Rayos Crepusculares de Alto Impacto",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ%, Daño Electro y Crítico",
    "bestWeapons": [
      {
        "name": "Vivid Notions",
        "rarity": 5,
        "type": "BiS Firma",
        "note": "+Daño Crítico y bono masivo a ataques electro continuos."
      },
      {
        "name": "Axioma de la Kagura",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+66.2% Daño Crítico y buff apilable."
      },
      {
        "name": "Sinfonía de los Merodeadores",
        "rarity": 4,
        "type": "BiS 4★",
        "note": "+Daño Crítico colosal."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Long Night's Oath (4 piezas)",
        "note": "BiS: Aumento letal a descargas electro prolongadas."
      },
      {
        "set": "Furia del Trueno (4 piezas)",
        "note": "+15% Bono Electro y reducción de CD."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o EM",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > EM > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "2,100",
      "def": "Base (~750)",
      "em": "0",
      "er": "120% ER",
      "crit": "75%+ CR / 190%+ CD"
    },
    "metaTeams": [
      {
        "name": "Varesa Hypercarry",
        "members": [
          "Varesa",
          "Kazuha",
          "Sara",
          "Bennett"
        ],
        "comp": "Varesa • Kazuha • Sara • Bennett"
      },
      {
        "name": "Varesa Quickbloom Core",
        "members": [
          "Varesa",
          "Nahida",
          "Furina",
          "Baizhu"
        ],
        "comp": "Varesa • Nahida • Furina • Baizhu"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. EM",
      "5. Recarga"
    ],
    "mainStats": {
      "sands": "ATQ% o EM",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "2,100",
      "def": "Base (~750)",
      "em": "0",
      "er": "120% ER",
      "crit": "75%+ CR / 190%+ CD"
    }
  },
  {
    "id": "zibai",
    "name": {
      "es": "Zibai",
      "en": "Zibai"
    },
    "element": "Geo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Zibai.png",
    "tier": "T0 Lunar-Crystallize DPS",
    "role": "DPS Geo de Filo Lunar • Cristalización Ofensiva de Alta Frecuencia",
    "roleCategory": "main_dps",
    "scalingType": "DEF",
    "scalingLabel": "Escalado por DEF% y Daño Crítico",
    "bestWeapons": [
      {
        "name": "Lightbearing Moonshard",
        "rarity": 5,
        "type": "BiS Firma",
        "note": "+DEF% y daño de estocadas lunares."
      },
      {
        "name": "Urakusugiri",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+88.2% Daño Crítico y bono por daño Geo."
      },
      {
        "name": "Huso de Cinabrio (Cinnabar Spindle)",
        "rarity": 4,
        "type": "BiS Evento",
        "note": "Escala daño con DEF%."
      },
      {
        "name": "Espada del Alba (Harbinger of Dawn R5)",
        "rarity": 3,
        "type": "Mejor F2P",
        "note": "+28% CR / +46.9% CD."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Códice de Obsidiana (4 piezas)",
        "note": "+40% Prob. Crítica."
      },
      {
        "set": "Cáscara de Sueños Opulentos (4 piezas)",
        "note": "+DEF% y Bono Geo."
      }
    ],
    "statPriority": {
      "sands": "DEF%",
      "goblet": "Bono Daño Geo% o DEF%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > DEF% > Recarga"
    },
    "benchmarks": {
      "hp": "16,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "2,600 DEF",
      "em": "0",
      "er": "120% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "metaTeams": [
      {
        "name": "Zibai Lunar Sunder",
        "members": [
          "Zibai",
          "Furina",
          "Xilonen",
          "Gorou"
        ],
        "comp": "Zibai • Furina • Xilonen • Gorou"
      },
      {
        "name": "Zibai Mono Geo Sunder",
        "members": [
          "Zibai",
          "Navia",
          "Zhongli",
          "Bennett"
        ],
        "comp": "Zibai • Navia • Zhongli • Bennett"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. DEF%",
      "4. Recarga"
    ],
    "mainStats": {
      "sands": "DEF%",
      "goblet": "Bono Daño Geo% o DEF%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "2,600 DEF",
      "em": "0",
      "er": "120% ER",
      "crit": "75%+ CR / 180%+ CD"
    }
  },
  {
    "id": "dahlia",
    "name": {
      "es": "Dahlia",
      "en": "Dahlia"
    },
    "element": "Hydro",
    "rarity": 4,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Dahlia.png",
    "tier": "T1 Hydro Shielder",
    "role": "Diácono de Favonius • Escudo Hydro y Regeneración para el Escuadrón",
    "roleCategory": "healer_shielder",
    "scalingType": "HP",
    "scalingLabel": "Escudo y cura escalan con Vida Máxima (HP%)",
    "bestWeapons": [
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "BiS Batería",
        "note": "Generación de energía."
      },
      {
        "name": "Espada del Sacrificio",
        "rarity": 4,
        "type": "Utilidad Reset",
        "note": "Reset de escudo."
      },
      {
        "name": "Vado del Río Ceniciento",
        "rarity": 4,
        "type": "Mejor F2P Pesca",
        "note": "+Recarga y Prob. Crítica en E."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "+20% ATQ para aliados."
      },
      {
        "set": "Tenacidad de la Geoarmada (4 piezas)",
        "note": "+20% Vida Máx."
      }
    ],
    "statPriority": {
      "sands": "Vida% o Recarga",
      "goblet": "Vida%",
      "circlet": "Vida% o Bono Curación",
      "substats": "Vida% > Recarga de Energía% > Vida Plana"
    },
    "benchmarks": {
      "hp": "32,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "180%",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Dahlia Hydro Defense",
        "members": [
          "Hu Tao",
          "Yelan",
          "Dahlia",
          "Kazuha"
        ],
        "comp": "Hu Tao • Yelan • Dahlia • Kazuha"
      },
      {
        "name": "Dahlia Permafrost Core",
        "members": [
          "Ayaka",
          "Dahlia",
          "Kazuha",
          "Shenhe"
        ],
        "comp": "Ayaka • Dahlia • Kazuha • Shenhe"
      }
    ],
    "substatsPriority": [
      "1. Vida%",
      "2. Recarga de Energía%",
      "3. Vida Plana"
    ],
    "mainStats": {
      "sands": "Vida% o Recarga",
      "goblet": "Vida%",
      "circlet": "Vida% o Bono Curación"
    },
    "recommendedPanel": {
      "hp": "32,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "180%",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "escoffier",
    "name": {
      "es": "Escoffier",
      "en": "Escoffier"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Escoffier.png",
    "tier": "T1 Cryo Sub-DPS",
    "role": "Cocinero Glacial de Fontaine • Sub-DPS Cryo y Aplicación Rápida",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Recarga de Energía",
    "bestWeapons": [
      {
        "name": "Symphonist of Scents",
        "rarity": 5,
        "type": "BiS Firma",
        "note": "+Crítico y daño Cryo de torreta."
      },
      {
        "name": "La Captura (The Catch R5)",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "+Daño Definitiva."
      },
      {
        "name": "Lanza de Favonius",
        "rarity": 4,
        "type": "Batería",
        "note": "Generación de partículas."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Compañía Dorada (4 piezas)",
        "note": "+70% Daño de Habilidad fuera de campo."
      },
      {
        "set": "Emblema del Destino (4 piezas)",
        "note": "+Recarga y daño Burst."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Recarga",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "1,900",
      "def": "Base (~750)",
      "em": "0",
      "er": "160%",
      "crit": "65%+ CR / 140%+ CD"
    },
    "metaTeams": [
      {
        "name": "Escoffier Freeze",
        "members": [
          "Wriothesley",
          "Escoffier",
          "Furina",
          "Jean"
        ],
        "comp": "Wriothesley • Escoffier • Furina • Jean"
      },
      {
        "name": "Escoffier Abyssal Freeze",
        "members": [
          "Skirk",
          "Escoffier",
          "Furina",
          "Shenhe"
        ],
        "comp": "Skirk • Escoffier • Furina • Shenhe"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Recarga"
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "1,900",
      "def": "Base (~750)",
      "em": "0",
      "er": "160%",
      "crit": "65%+ CR / 140%+ CD"
    }
  },
  {
    "id": "mizuki",
    "name": {
      "es": "Mizuki",
      "en": "Mizuki"
    },
    "element": "Anemo",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Mizuki.png",
    "tier": "T1 Anemo Swirl Buffer",
    "role": "Buffer Anemo de Inazuma • Agrupación y Reducción de Resistencia",
    "roleCategory": "support",
    "scalingType": "EM",
    "scalingLabel": "Escala con Maestría Elemental pura",
    "bestWeapons": [
      {
        "name": "Sunny Morning Sleep-In",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+EM masiva."
      },
      {
        "name": "Memorias de Sacrificio",
        "rarity": 4,
        "type": "BiS 4★",
        "note": "+221 EM."
      },
      {
        "name": "Cuentos de Cazadores de Dragones",
        "rarity": 3,
        "type": "Buffer F2P",
        "note": "+48% ATQ."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "note": "-40% Resistencia elemental enemiga."
      },
      {
        "set": "Instructor (4 piezas)",
        "type": "Soporte de Reacciones",
        "bonus": "+120 de Maestría Elemental a todo el equipo al activar reacciones elementales."
      }
    ],
    "statPriority": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental",
      "substats": "Maestría Elemental > Recarga de Energía%"
    },
    "benchmarks": {
      "hp": "17,000 - 20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "850+ EM",
      "er": "160%",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Mizuki Swirl Team",
        "members": [
          "Ayato",
          "Xiangling",
          "Mizuki",
          "Bennett"
        ],
        "comp": "Ayato • Xiangling • Mizuki • Bennett"
      },
      {
        "name": "Mizuki Aggravate Swirl",
        "members": [
          "Keqing",
          "Fischl",
          "Mizuki",
          "Nahida"
        ],
        "comp": "Keqing • Fischl • Mizuki • Nahida"
      }
    ],
    "substatsPriority": [
      "1. Maestría Elemental",
      "2. Recarga de Energía%"
    ],
    "mainStats": {
      "sands": "Maestría Elemental",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental"
    },
    "recommendedPanel": {
      "hp": "17,000 - 20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "850+ EM",
      "er": "160%",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "chongyun",
    "name": {
      "es": "Chongyun",
      "en": "Chongyun"
    },
    "element": "Cryo",
    "rarity": 4,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Chongyun.png",
    "tier": "T2 Cryo Infuser & Burst DPS",
    "role": "Sub-DPS Cryo y Enabler • Infusión Cryo para armas cuerpo a cuerpo y Burst rápido",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Daño Definitivo",
    "bestWeapons": [
      {
        "name": "Lápida del Lobo (Wolf's Gravestone)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+ATQ% masivo y buff al escuadrón."
      },
      {
        "name": "Médula de la Serpiente Marina (Serpent Spine)",
        "rarity": 4,
        "type": "BiS Pase",
        "note": "+Prob. Crítica y hasta +50% daño."
      },
      {
        "name": "Gran Espada del Sacrificio (Sacrificial Greatsword)",
        "rarity": 4,
        "type": "Utilidad Reset",
        "note": "Doble campo de infusión Cryo."
      },
      {
        "name": "Gran Espada de Favonius",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Generación de partículas para el equipo."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Emblema del Destino (4 piezas)",
        "note": "+Daño masivo a los 3-4 espadazos de su Definitiva."
      },
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "+20% ATQ al equipo con Burst de 40 energía."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Maestría Elemental > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "1,800 - 2,100",
      "def": "Base (~750)",
      "em": "0",
      "er": "130%",
      "crit": "65%+ CR / 150%+ CD"
    },
    "metaTeams": [
      {
        "name": "National Original Clásico",
        "members": [
          "Chongyun",
          "Xiangling",
          "Xingqiu",
          "Bennett"
        ],
        "comp": "Chongyun • Xiangling • Xingqiu • Bennett"
      },
      {
        "name": "Shenhe Chongyun Cryo Core",
        "members": [
          "Chongyun",
          "Shenhe",
          "Kazuha",
          "Kokomi"
        ],
        "comp": "Chongyun • Shenhe • Kazuha • Kokomi"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Maestría Elemental",
      "5. Recarga"
    ],
    "mainStats": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "1,800 - 2,100",
      "def": "Base (~750)",
      "em": "0",
      "er": "130%",
      "crit": "65%+ CR / 150%+ CD"
    }
  },
  {
    "id": "diona",
    "name": {
      "es": "Diona",
      "en": "Diona"
    },
    "element": "Cryo",
    "rarity": 4,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Diona.png",
    "tier": "T1 Cryo Shielder & Battery",
    "role": "Escudera, Sanadora y Batería Cryo • Escudo Rápido con Garras y Curación en Área",
    "roleCategory": "healer_shielder",
    "scalingType": "HP",
    "scalingLabel": "Escudo y curación escalan con Vida Máxima (HP%)",
    "bestWeapons": [
      {
        "name": "Arco del Sacrificio (Sacrificial Bow)",
        "rarity": 4,
        "type": "BiS Indiscutible",
        "note": "Reset inmediato de garras para doble escudo y 8 partículas."
      },
      {
        "name": "Arco de Favonius (Favonius Warbow)",
        "rarity": 4,
        "type": "Mejor Batería F2P",
        "note": "Partículas blancas consistentes para todo el equipo."
      },
      {
        "name": "Arco Recurvo (Recurve Bow)",
        "rarity": 3,
        "type": "Opción 3★ HP",
        "note": "+46.9% Vida Máx para escudos más gruesos."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "BiS Support: +20% ATQ para aliados."
      },
      {
        "set": "Tenacidad de la Geoarmada (2 piezas)",
        "note": "+20% Vida Máx."
      },
      {
        "set": "Doncella Amada (4 piezas)",
        "note": "Curación máxima."
      }
    ],
    "statPriority": {
      "sands": "Vida% o Recarga de Energía",
      "goblet": "Vida%",
      "circlet": "Vida% o Bono de Curación",
      "substats": "Vida% > Recarga de Energía% > Vida Plana > Prob. Crítica (Favonius)"
    },
    "benchmarks": {
      "hp": "30,000 - 35,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "180% - 200% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Ayaka Morgana Freeze",
        "members": [
          "Ayaka",
          "Diona",
          "Mona",
          "Kazuha"
        ],
        "comp": "Ayaka • Diona • Mona • Kazuha"
      },
      {
        "name": "Eula Superconduct Battery",
        "members": [
          "Eula",
          "Diona",
          "Raiden",
          "Rosaria"
        ],
        "comp": "Eula • Diona • Raiden • Rosaria"
      }
    ],
    "substatsPriority": [
      "1. Vida%",
      "2. Recarga de Energía%",
      "3. Vida Plana",
      "4. Prob. Crítica (Favonius)"
    ],
    "mainStats": {
      "sands": "Vida% o Recarga de Energía",
      "goblet": "Vida%",
      "circlet": "Vida% o Bono de Curación"
    },
    "recommendedPanel": {
      "hp": "30,000 - 35,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "180% - 200% ER",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "dori",
    "name": {
      "es": "Dori",
      "en": "Dori"
    },
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Dori.png",
    "tier": "T2 Energy Battery & Healer",
    "role": "Sanadora y Batería de Energía • Recarga Plana por Conexión de Djinn y Curación",
    "roleCategory": "healer_shielder",
    "scalingType": "HP",
    "scalingLabel": "Curación escala por Vida Máxima (HP%), Batería por Recarga",
    "bestWeapons": [
      {
        "name": "Gran Espada de Favonius",
        "rarity": 4,
        "type": "BiS Batería F2P",
        "note": "Batería máxima para aliados con alto costo de energía."
      },
      {
        "name": "Gran Espada del Sacrificio",
        "rarity": 4,
        "type": "Opción ER",
        "note": "Doble uso de E para regeneración."
      },
      {
        "name": "Orgullo Celestial (Skyward Pride)",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+Recarga y daño residual."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "+20% ATQ para aliados."
      },
      {
        "set": "Perla Oceánica (4 piezas)",
        "note": "Burbujas de daño por exceso de cura."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía o Vida%",
      "goblet": "Vida%",
      "circlet": "Bono de Curación o Vida%",
      "substats": "Recarga de Energía% > Vida% > Vida Plana"
    },
    "benchmarks": {
      "hp": "30,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "200% - 220% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Dori Hyperbloom Battery",
        "members": [
          "Alhacén",
          "Dori",
          "Nahida",
          "Xingqiu"
        ],
        "comp": "Alhacén • Dori • Nahida • Xingqiu"
      },
      {
        "name": "Dori Aggravate Energy",
        "members": [
          "Keqing",
          "Fischl",
          "Nahida",
          "Dori"
        ],
        "comp": "Keqing • Fischl • Nahida • Dori"
      }
    ],
    "substatsPriority": [
      "1. Recarga de Energía%",
      "2. Vida%",
      "3. Vida Plana"
    ],
    "mainStats": {
      "sands": "Recarga de Energía o Vida%",
      "goblet": "Vida%",
      "circlet": "Bono de Curación o Vida%"
    },
    "recommendedPanel": {
      "hp": "30,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "200% - 220% ER",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "heizou",
    "name": {
      "es": "Shikanoin Heizou",
      "en": "Shikanoin Heizou"
    },
    "element": "Anemo",
    "rarity": 4,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Heizo.png",
    "tier": "T1 Melee Swirl DPS",
    "role": "Detective de la Comisión Tenryou • Artes Marciales Anemo de Ráfaga Corta",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Puñetazo Cardíaco escala con ATQ% y acumulaciones de Convicción",
    "bestWeapons": [
      {
        "name": "Axioma de la Kagura",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+66.2% Daño Crítico y buff apilable a su puño elemental."
      },
      {
        "name": "Oración Perdida a los Vientos Sagrados",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+33.1% Prob. Crítica y velocidad."
      },
      {
        "name": "Sinfonía de los Merodeadores (The Widsith)",
        "rarity": 4,
        "type": "BiS 4★ Gacha",
        "note": "+55.1% Daño Crítico y ráfaga demoledora."
      },
      {
        "name": "Cuentos de Dodoco",
        "rarity": 4,
        "type": "Opción F2P",
        "note": "+ATQ% y daño a básicos."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "note": "-40% Resistencia elemental enemiga y +60% daño torbellino."
      },
      {
        "set": "Pabellón del Desierto (4 piezas)",
        "note": "+40% Daño a golpes normales y cargados."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Anemo%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Maestría Elemental > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "1,900 - 2,200",
      "def": "Base (~750)",
      "em": "150 - 250 EM",
      "er": "120% ER",
      "crit": "70%+ CR / 160%+ CD"
    },
    "metaTeams": [
      {
        "name": "Heizou Taser Martial",
        "members": [
          "Shikanoin Heizou",
          "Fischl",
          "Beidou",
          "Xingqiu"
        ],
        "comp": "Shikanoin Heizou • Fischl • Beidou • Xingqiu"
      },
      {
        "name": "Heizou National Punch",
        "members": [
          "Shikanoin Heizou",
          "Xiangling",
          "Xingqiu",
          "Bennett"
        ],
        "comp": "Shikanoin Heizou • Xiangling • Xingqiu • Bennett"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Maestría Elemental",
      "5. Recarga"
    ],
    "mainStats": {
      "sands": "ATQ% o Maestría Elemental",
      "goblet": "Bono Daño Anemo%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "1,900 - 2,200",
      "def": "Base (~750)",
      "em": "150 - 250 EM",
      "er": "120% ER",
      "crit": "70%+ CR / 160%+ CD"
    }
  },
  {
    "id": "kaeya",
    "name": {
      "es": "Kaeya",
      "en": "Kaeya"
    },
    "element": "Cryo",
    "rarity": 4,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Kaeya.png",
    "tier": "T1 Cryo Sub-DPS & Enabler",
    "role": "Capitán de Caballería de Favonius • Vals Glacial Continuo Off-Field y Derretidos Inversos",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ%, Bono Cryo y Daño Definitivo",
    "bestWeapons": [
      {
        "name": "Reflejo de las Tinieblas (Mistsplitter)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+44.1% Daño Crítico y daño elemental masivo."
      },
      {
        "name": "Cortador de Jade Primordial",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+44.1% Prob. Crítica y ATQ por vida."
      },
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Recarga garantizada para rotaciones continuas."
      },
      {
        "name": "Espada Negra (The Black Sword)",
        "rarity": 4,
        "type": "Pase de Batalla",
        "note": "+Crítico y daño a normales si opera como on-field."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Emblema del Destino (4 piezas)",
        "note": "BiS Sub-DPS: +Daño al Vals Glacial continuo."
      },
      {
        "set": "Nómada del Invierno (4 piezas)",
        "note": "+40% Prob. Crítica en equipos Permafrost."
      },
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "+20% ATQ para aliados."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Recarga de Energía",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Recarga de Energía% > EM"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "1,900",
      "def": "Base (~750)",
      "em": "0",
      "er": "160% - 180%",
      "crit": "65%+ CR / 150%+ CD"
    },
    "metaTeams": [
      {
        "name": "Kaeya Reverse Melt",
        "members": [
          "Kaeya",
          "Rosaria",
          "Xiangling",
          "Bennett"
        ],
        "comp": "Kaeya • Rosaria • Xiangling • Bennett"
      },
      {
        "name": "Kaeya Freeze Skirmish",
        "members": [
          "Kaeya",
          "Chongyun",
          "Xingqiu",
          "Kazuha"
        ],
        "comp": "Kaeya • Chongyun • Xingqiu • Kazuha"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Recarga de Energía%",
      "5. EM"
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga de Energía",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "1,900",
      "def": "Base (~750)",
      "em": "0",
      "er": "160% - 180%",
      "crit": "65%+ CR / 150%+ CD"
    }
  },
  {
    "id": "kaveh",
    "name": {
      "es": "Kaveh",
      "en": "Kaveh"
    },
    "element": "Dendro",
    "rarity": 4,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Kaveh.png",
    "tier": "T1 Bloom Driver & Detonator",
    "role": "Arquitecto de Sumeru • Detonación Inmediata de Núcleos Dendro y Auto-Sanación",
    "roleCategory": "main_dps",
    "scalingType": "EM",
    "scalingLabel": "Escalado por Maestría Elemental (EM) y Recarga de Energía",
    "bestWeapons": [
      {
        "name": "Flor Aeromarina (Mailed Flower R5)",
        "rarity": 4,
        "type": "BiS Evento",
        "note": "+EM y ATQ% tras usar E o reacciones."
      },
      {
        "name": "Gran Espada de Favonius",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Soluciona su elevado costo de 80 energía."
      },
      {
        "name": "Segadora de la Lluvia (Rainslasher R5)",
        "rarity": 4,
        "type": "Opción Gacha",
        "note": "+165 EM y +36% Daño contra Hydro/Electro."
      },
      {
        "name": "Espada Real del Bosque (Forest Regalia)",
        "rarity": 4,
        "type": "Forja Sumeru",
        "note": "+Recarga y otorga hoja de +120 EM."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Flor del Paraíso Perdido (4 piezas)",
        "note": "+80% Daño a explosión de Núcleos Dendro."
      },
      {
        "set": "Recuerdos del Bosque (4 piezas)",
        "note": "-30% Resistencia Dendro enemiga."
      },
      {
        "set": "Sueños Áureos (4 piezas)",
        "note": "+EM masiva para maximizar auto-curación."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía o Maestría Elemental",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental",
      "substats": "Recarga de Energía% > Maestría Elemental > ATQ% > Vida%"
    },
    "benchmarks": {
      "hp": "17,000 - 20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "750 - 900 EM",
      "er": "180% - 200% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Kaveh Nilou Bloom Palace",
        "members": [
          "Kaveh",
          "Nilou",
          "Xingqiu",
          "Nahida"
        ],
        "comp": "Kaveh • Nilou • Xingqiu • Nahida"
      },
      {
        "name": "Kaveh Hyperbloom Shatter",
        "members": [
          "Kaveh",
          "Yelan",
          "Kuki Shinobu",
          "Baizhu"
        ],
        "comp": "Kaveh • Yelan • Kuki Shinobu • Baizhu"
      }
    ],
    "substatsPriority": [
      "1. Recarga de Energía%",
      "2. Maestría Elemental",
      "3. ATQ%",
      "4. Vida%"
    ],
    "mainStats": {
      "sands": "Recarga de Energía o Maestría Elemental",
      "goblet": "Maestría Elemental",
      "circlet": "Maestría Elemental"
    },
    "recommendedPanel": {
      "hp": "17,000 - 20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "750 - 900 EM",
      "er": "180% - 200% ER",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "lisa",
    "name": {
      "es": "Lisa",
      "en": "Lisa"
    },
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Lisa.png",
    "tier": "T1 DEF Shred Sub-DPS",
    "role": "Bibliotecaria de Favonius • Reducción del -15% DEF Enemiga en Burst y Campo Electro",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Rayo Conductor escala con ATQ%, DEF Shred activa en Definitiva",
    "bestWeapons": [
      {
        "name": "Axioma de la Kagura",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+66.2% Daño Crítico y buff apilable de E."
      },
      {
        "name": "Sinfonía de los Merodeadores",
        "rarity": 4,
        "type": "BiS 4★",
        "note": "+Daño Crítico y buff rotativo letal."
      },
      {
        "name": "Cuentos de Cazadores de Dragones",
        "rarity": 3,
        "type": "BiS Buffer F2P",
        "note": "-15% DEF enemiga + 48% ATQ para el carry."
      },
      {
        "name": "Prototipo Ámbar",
        "rarity": 4,
        "type": "Soporte Forja",
        "note": "Curación de equipo y regeneración de energía."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Emblema del Destino (4 piezas)",
        "note": "Soluciona costo de 80 energía y potencia su campo eléctrico."
      },
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "+20% ATQ para aliados."
      },
      {
        "set": "Sueños Áureos (4 piezas)",
        "note": "+EM en equipos de Agravado/Hiperflorecimiento."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía o ATQ%",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Recarga de Energía% > Prob. Crítica > Daño Crítico > ATQ% > EM"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750)",
      "em": "0",
      "er": "200% - 220% ER",
      "crit": "60%+ CR / 130%+ CD"
    },
    "metaTeams": [
      {
        "name": "Raiden Hypercarry Shred",
        "members": [
          "Raiden",
          "Lisa",
          "Kazuha",
          "Bennett"
        ],
        "comp": "Raiden • Lisa • Kazuha • Bennett"
      },
      {
        "name": "Lisa Aggravate Scholar",
        "members": [
          "Lisa",
          "Nahida",
          "Fischl",
          "Zhongli"
        ],
        "comp": "Lisa • Nahida • Fischl • Zhongli"
      }
    ],
    "substatsPriority": [
      "1. Recarga de Energía%",
      "2. Prob. Crítica",
      "3. Daño Crítico",
      "4. ATQ%",
      "5. EM"
    ],
    "mainStats": {
      "sands": "Recarga de Energía o ATQ%",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750)",
      "em": "0",
      "er": "200% - 220% ER",
      "crit": "60%+ CR / 130%+ CD"
    }
  },
  {
    "id": "mika",
    "name": {
      "es": "Mika",
      "en": "Mika"
    },
    "element": "Cryo",
    "rarity": 4,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Mika.png",
    "tier": "T1 Physical & ATK SPD Buffer",
    "role": "Agrimensor de Favonius • Buff de +Velocidad de Ataque, +Daño Físico y Sanación Grupal",
    "roleCategory": "support",
    "scalingType": "HP",
    "scalingLabel": "Curación escala con Vida Máxima (HP%), Buffs por nivel de talento",
    "bestWeapons": [
      {
        "name": "Lanza de Favonius (Favonius Lance)",
        "rarity": 4,
        "type": "BiS Indiscutible",
        "note": "Generación de energía crítica para el carry físico."
      },
      {
        "name": "Borla Negra (Black Tassel)",
        "rarity": 3,
        "type": "Opción HP 3★",
        "note": "+46.9% Vida Máx totalmente gratis."
      },
      {
        "name": "La Captura",
        "rarity": 4,
        "type": "Opción F2P",
        "note": "+Recarga de energía."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "+20% ATQ para aliados."
      },
      {
        "set": "Perla Oceánica (4 piezas)",
        "note": "Convierte exceso de cura en daño físico."
      },
      {
        "set": "Sonata de Días Pretéritos (4 piezas)",
        "note": "+Bono de daño plano según curación."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía o Vida%",
      "goblet": "Vida%",
      "circlet": "Bono de Curación o Prob. Crítica (Favonius)",
      "substats": "Recarga de Energía% > Vida% > Prob. Crítica > Vida Plana"
    },
    "benchmarks": {
      "hp": "32,000+ HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "200% - 230% ER",
      "crit": "45%+ CR"
    },
    "metaTeams": [
      {
        "name": "Eula Physical Blitz",
        "members": [
          "Eula",
          "Mika",
          "Raiden",
          "Furina"
        ],
        "comp": "Eula • Mika • Raiden • Furina"
      },
      {
        "name": "Razor Rainbow Physical",
        "members": [
          "Razor",
          "Mika",
          "Fischl",
          "Zhongli"
        ],
        "comp": "Razor • Mika • Fischl • Zhongli"
      }
    ],
    "substatsPriority": [
      "1. Recarga de Energía%",
      "2. Vida%",
      "3. Prob. Crítica",
      "4. Vida Plana"
    ],
    "mainStats": {
      "sands": "Recarga de Energía o Vida%",
      "goblet": "Vida%",
      "circlet": "Bono de Curación o Prob. Crítica (Favonius)"
    },
    "recommendedPanel": {
      "hp": "32,000+ HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "200% - 230% ER",
      "crit": "45%+ CR"
    }
  },
  {
    "id": "ningguang",
    "name": {
      "es": "Ningguang",
      "en": "Ningguang"
    },
    "element": "Geo",
    "rarity": 4,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Ningguang.png",
    "tier": "T1 Geo Burst DPS",
    "role": "El Equilibrio Celestial de Liyue • Bombardeo de Gemas Geo y Pantalla de Jade",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ%, Bono Geo y Multiplicadores de Proyectil",
    "bestWeapons": [
      {
        "name": "Oración Perdida a los Vientos Sagrados",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+33.1% Prob. Crítica y bono elemental continuo."
      },
      {
        "name": "Axioma de la Kagura",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+66.2% Daño Crítico."
      },
      {
        "name": "Sinfonía de los Merodeadores (The Widsith)",
        "rarity": 4,
        "type": "BiS 4★ Gacha",
        "note": "+55.1% Daño Crítico y ráfaga brutal de gemas."
      },
      {
        "name": "Ágata del Peñasco Oscuro (Blackcliff Agate)",
        "rarity": 4,
        "type": "Opción F2P Brillo",
        "note": "+Daño Crítico y ATQ tras derrotas."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Murmullo del Bosque en la Noche Ecoica (4 piezas)",
        "note": "+50% Bono Geo continuo tras cristalizar."
      },
      {
        "set": "Petra Arcaica (2 piezas) + Gladiador (2 piezas)",
        "note": "+15% Bono Geo y +18% ATQ."
      }
    ],
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Geo%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Recarga de Energía%"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "1,900 - 2,200",
      "def": "Base (~750)",
      "em": "0",
      "er": "125%",
      "crit": "70%+ CR / 160%+ CD"
    },
    "metaTeams": [
      {
        "name": "Ningguang Double Geo Double Pyro",
        "members": [
          "Ningguang",
          "Zhongli",
          "Xiangling",
          "Bennett"
        ],
        "comp": "Ningguang • Zhongli • Xiangling • Bennett"
      },
      {
        "name": "Ningguang Furina Hyper",
        "members": [
          "Ningguang",
          "Furina",
          "Xilonen",
          "Bennett"
        ],
        "comp": "Ningguang • Furina • Xilonen • Bennett"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Recarga de Energía%"
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Geo%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "1,900 - 2,200",
      "def": "Base (~750)",
      "em": "0",
      "er": "125%",
      "crit": "70%+ CR / 160%+ CD"
    }
  },
  {
    "id": "qiqi",
    "name": {
      "es": "Qiqi",
      "en": "Qiqi"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Qiqi.png",
    "tier": "T2 Immortal Healer",
    "role": "Boticaria del Bubu Pharmacy • Curación Masiva Continua y Talismanes de Preservación",
    "roleCategory": "healer_shielder",
    "scalingType": "ATK",
    "scalingLabel": "Curación escala puramente con el ATQ Total",
    "bestWeapons": [
      {
        "name": "Espada del Sacrificio (Sacrificial Sword)",
        "rarity": 4,
        "type": "BiS Indiscutible",
        "note": "Resuelve el enfriamiento de 30s de su E para 100% tiempo de cura."
      },
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Genera partículas para aliados."
      },
      {
        "name": "Hoja Afilada Celestial (Skyward Blade)",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+Recarga y ATQ básico elevado."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Perla Oceánica (4 piezas)",
        "note": "BiS Daño: Detona burbujas de 30,000 de daño físico cada 3.5 segundos."
      },
      {
        "set": "Tenacidad de la Geoarmada (4 piezas)",
        "note": "El heraldo de escarcha activa buff continuo de +20% ATQ."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía o ATQ%",
      "goblet": "ATQ%",
      "circlet": "Bono de Curación o Prob. Crítica",
      "substats": "Recarga de Energía% > ATQ% > Prob. Crítica (Favonius)"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000 (Cura: 7,000+ por golpe de talismán)",
      "atk": "2,200 ATQ",
      "def": "Base (~750)",
      "em": "0",
      "er": "200% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Qiqi Furina Clam Driver",
        "members": [
          "Qiqi",
          "Furina",
          "Yelan",
          "Kazuha"
        ],
        "comp": "Qiqi • Furina • Yelan • Kazuha"
      },
      {
        "name": "Qiqi Physical Taser",
        "members": [
          "Qiqi",
          "Fischl",
          "Beidou",
          "Xingqiu"
        ],
        "comp": "Qiqi • Fischl • Beidou • Xingqiu"
      }
    ],
    "substatsPriority": [
      "1. Recarga de Energía%",
      "2. ATQ%",
      "3. Prob. Crítica (Favonius)"
    ],
    "mainStats": {
      "sands": "Recarga de Energía o ATQ%",
      "goblet": "ATQ%",
      "circlet": "Bono de Curación o Prob. Crítica"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000 (Cura: 7,000+ por golpe de talismán)",
      "atk": "2,200 ATQ",
      "def": "Base (~750)",
      "em": "0",
      "er": "200% ER",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "razor",
    "name": {
      "es": "Razor",
      "en": "Razor"
    },
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Razor.png",
    "tier": "T1 Physical & Rainbow DPS",
    "role": "Niño Lobo de Wolvendom • Mandoble Físico Brutal / Conductor Thundering Furry (Rainbow EM)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escala con ATQ / Físico en clásico o EM en variante Rainbow",
    "bestWeapons": [
      {
        "name": "Lápida del Lobo (Wolf's Gravestone)",
        "rarity": 5,
        "type": "BiS 5★ Físico",
        "note": "+ATQ% masivo y buff al escuadrón."
      },
      {
        "name": "Médula de la Serpiente Marina (Serpent Spine)",
        "rarity": 4,
        "type": "BiS Pase",
        "note": "+Prob. Crítica y hasta +50% daño."
      },
      {
        "name": "Flor Aeromarina (Mailed Flower)",
        "rarity": 4,
        "type": "BiS Rainbow EM",
        "note": "+EM y ATQ para sobrecargas/crepitar."
      },
      {
        "name": "Prototipo Arcaico (Prototype Archaic R5)",
        "rarity": 4,
        "type": "Mejor F2P",
        "note": "+ATQ% y explosión de daño físico."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Llama Albina (4 piezas)",
        "note": "BiS Físico: +50% Daño Físico y +18% ATQ."
      },
      {
        "set": "Flor del Paraíso Perdido (4 piezas)",
        "note": "BiS Rainbow EM: +80% Daño a Crepitar/Hiperflorecimiento."
      },
      {
        "set": "Gladiador (4 piezas)",
        "note": "+35% Daño a Ataques Normales."
      }
    ],
    "statPriority": {
      "sands": "ATQ% (Físico) o EM (Rainbow)",
      "goblet": "Bono Daño Físico% o EM",
      "circlet": "Prob. Crítica o EM",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > EM > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "2,200",
      "def": "Base (~750)",
      "em": "0",
      "er": "120%",
      "crit": "70%+ CR / 150%+ CD"
    },
    "metaTeams": [
      {
        "name": "Thundering Furry (Rainbow EM)",
        "members": [
          "Razor",
          "Bennett",
          "Xingqiu",
          "Nahida"
        ],
        "comp": "Razor • Bennett • Xingqiu • Nahida"
      },
      {
        "name": "Razor Superconduct Clásico",
        "members": [
          "Razor",
          "Rosaria",
          "Fischl",
          "Zhongli"
        ],
        "comp": "Razor • Rosaria • Fischl • Zhongli"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. EM",
      "5. Recarga"
    ],
    "mainStats": {
      "sands": "ATQ% (Físico) o EM (Rainbow)",
      "goblet": "Bono Daño Físico% o EM",
      "circlet": "Prob. Crítica o EM"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "2,200",
      "def": "Base (~750)",
      "em": "0",
      "er": "120%",
      "crit": "70%+ CR / 150%+ CD"
    }
  },
  {
    "id": "rosaria",
    "name": {
      "es": "Rosaria",
      "en": "Rosaria"
    },
    "element": "Cryo",
    "rarity": 4,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Rosaria.png",
    "tier": "T1 Crit Buffer & Cryo Sub-DPS",
    "role": "Monja de la Iglesia de Favonius • Transferencia de hasta +15% Prob. Crítica y Daño Cryo Constante",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escala con ATQ%, Prob. Crítica (hasta 100% CR) y Daño Burst",
    "bestWeapons": [
      {
        "name": "Halcón de Jade Primordial",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Prob. Crítica y ATQ apilable."
      },
      {
        "name": "Lanza del Duelo (Deathmatch)",
        "rarity": 4,
        "type": "BiS Pase",
        "note": "+36.8% Prob. Crítica para maximizar el buff a aliados."
      },
      {
        "name": "La Captura (The Catch R5)",
        "rarity": 4,
        "type": "Mejor F2P Daño",
        "note": "+32% Daño y +12% CR en Burst."
      },
      {
        "name": "Lanza de Favonius",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Batería para el equipo con alto crítico."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "BiS Buff: +20% ATQ para aliados + transferencia de crítico."
      },
      {
        "set": "Emblema del Destino (4 piezas)",
        "note": "+Daño masivo a su lanza glacial continua."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Recarga de Energía",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Prob. Crítica (Target 80-88% CR)",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Recarga de Energía% > EM"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "1,900",
      "def": "Base (~750)",
      "em": "0",
      "er": "150%",
      "crit": "80%+ CR (Transfiere 12-15% CR al equipo)"
    },
    "metaTeams": [
      {
        "name": "Rosaria Reverse Melt",
        "members": [
          "Rosaria",
          "Xiangling",
          "Kaeya",
          "Bennett"
        ],
        "comp": "Rosaria • Xiangling • Kaeya • Bennett"
      },
      {
        "name": "Eula Physical Resonance",
        "members": [
          "Eula",
          "Rosaria",
          "Raiden",
          "Zhongli"
        ],
        "comp": "Eula • Rosaria • Raiden • Zhongli"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Recarga de Energía%",
      "5. EM"
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga de Energía",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Prob. Crítica (Target 80-88% CR)"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "1,900",
      "def": "Base (~750)",
      "em": "0",
      "er": "150%",
      "crit": "80%+ CR (Transfiere 12-15% CR al equipo)"
    }
  },
  {
    "id": "sara",
    "name": {
      "es": "Kujou Sara",
      "en": "Kujou Sara"
    },
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Sara.png",
    "tier": "T1 Electro Crit DMG Buffer",
    "role": "General de la Comisión Tenryou • Buff de ATQ y +60% Daño Crítico Electro en C6",
    "roleCategory": "support",
    "scalingType": "ATK",
    "scalingLabel": "Buff de ATQ escala exclusivamente con su ATQ Base (Personaje + Arma)",
    "bestWeapons": [
      {
        "name": "Alas Celestiales (Skyward Harp)",
        "rarity": 5,
        "type": "BiS 5★ ATQ Base",
        "note": "674 ATQ Base colosal + Crítico."
      },
      {
        "name": "Elegía del Fin (Elegy for the End)",
        "rarity": 5,
        "type": "BiS Support 5★",
        "note": "+Recarga y buff de +100 EM y +20% ATQ."
      },
      {
        "name": "Luna de Mouun",
        "rarity": 4,
        "type": "BiS 4★ Daño",
        "note": "Alto ATQ Base (565) y potencia la Definitiva."
      },
      {
        "name": "Arco del Sacrificio / Favonius",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Asegura recarga de 80 energía."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Emblema del Destino (4 piezas)",
        "note": "Convierte su alta recarga en daño demoledor de tormenta tengu."
      },
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "+20% ATQ para aliados."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Recarga de Energía% > Prob. Crítica > Daño Crítico > ATQ%"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750)",
      "em": "0",
      "er": "200% - 220% ER",
      "crit": "60%+ CR / 130%+ CD"
    },
    "metaTeams": [
      {
        "name": "Raiden Hypercarry Tengu",
        "members": [
          "Raiden",
          "Kujou Sara",
          "Kazuha",
          "Bennett"
        ],
        "comp": "Raiden • Kujou Sara • Kazuha • Bennett"
      },
      {
        "name": "Keqing Aggravate Tengu",
        "members": [
          "Keqing",
          "Kujou Sara",
          "Nahida",
          "Zhongli"
        ],
        "comp": "Keqing • Kujou Sara • Nahida • Zhongli"
      }
    ],
    "substatsPriority": [
      "1. Recarga de Energía%",
      "2. Prob. Crítica",
      "3. Daño Crítico",
      "4. ATQ%"
    ],
    "mainStats": {
      "sands": "Recarga de Energía",
      "goblet": "Bono Daño Electro%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750)",
      "em": "0",
      "er": "200% - 220% ER",
      "crit": "60%+ CR / 130%+ CD"
    }
  },
  {
    "id": "sayu",
    "name": {
      "es": "Sayu",
      "en": "Sayu"
    },
    "element": "Anemo",
    "rarity": 4,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Sayu.png",
    "tier": "T1 Exploration Queen & Swirl Healer",
    "role": "Ninja del Shuumatsuban • Rodadura Veloz Continua, Torbellino Elemental y Curación",
    "roleCategory": "healer_shielder",
    "scalingType": "ATK",
    "scalingLabel": "Curación escala con ATQ% y Maestría Elemental (EM en C6)",
    "bestWeapons": [
      {
        "name": "Lápida del Lobo",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+ATQ% masivo."
      },
      {
        "name": "Gran Espada de Favonius",
        "rarity": 4,
        "type": "BiS Batería F2P",
        "note": "Batería y fluidez de rotaciones."
      },
      {
        "name": "Diluvio de Aguamarina (Makhaira)",
        "rarity": 4,
        "type": "BiS EM",
        "note": "Convierte EM en ATQ para ella y aliados."
      },
      {
        "name": "Segadora de la Lluvia (Rainslasher)",
        "rarity": 4,
        "type": "Opción EM",
        "note": "+165 EM."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "note": "BiS Obligatorio: -40% Resistencia elemental enemiga."
      },
      {
        "set": "Doncella Amada (4 piezas)",
        "note": "Curación máxima."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía o Maestría Elemental",
      "goblet": "Maestría Elemental o ATQ%",
      "circlet": "Maestría Elemental o Bono de Curación",
      "substats": "Recarga de Energía% > Maestría Elemental > ATQ%"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750)",
      "em": "600+ EM",
      "er": "180% - 200% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Sayu Taser Roll",
        "members": [
          "Sayu",
          "Fischl",
          "Beidou",
          "Xingqiu"
        ],
        "comp": "Sayu • Fischl • Beidou • Xingqiu"
      },
      {
        "name": "Sayu Overworld Speed",
        "members": [
          "Sayu",
          "Yelan",
          "Kazuha",
          "Furina"
        ],
        "comp": "Sayu • Yelan • Kazuha • Furina"
      }
    ],
    "substatsPriority": [
      "1. Recarga de Energía%",
      "2. Maestría Elemental",
      "3. ATQ%"
    ],
    "mainStats": {
      "sands": "Recarga de Energía o Maestría Elemental",
      "goblet": "Maestría Elemental o ATQ%",
      "circlet": "Maestría Elemental o Bono de Curación"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750)",
      "em": "600+ EM",
      "er": "180% - 200% ER",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "tighnari",
    "name": {
      "es": "Tighnari",
      "en": "Tighnari"
    },
    "element": "Dendro",
    "rarity": 5,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Tighnari.png",
    "tier": "T1 Spread Quickswap DPS",
    "role": "Guardabosques de Avidya • Flechas Guiadas de Alta Cadencia y Ráfagas de Propagación",
    "roleCategory": "main_dps",
    "scalingType": "EM",
    "scalingLabel": "Escala dualmente con ATQ% y Maestría Elemental (EM)",
    "bestWeapons": [
      {
        "name": "Senda de la Cazadora (Hunter's Path)",
        "rarity": 5,
        "type": "BiS Firma Oficial",
        "note": "+44.1% Prob. Crítica y escala daño de flechas con 160% de su EM."
      },
      {
        "name": "El Primer Gran Truco Mágico",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+66.2% Daño Crítico y +ATQ%."
      },
      {
        "name": "Aqua Simulacra",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+88.2% Daño Crítico y +20% daño universal."
      },
      {
        "name": "Tirachinas (Slingshot R5)",
        "rarity": 3,
        "type": "Mejor F2P 3★",
        "note": "+31.2% Prob. Crítica y +60% Daño en corto alcance."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sueños Áureos (4 piezas)",
        "note": "BiS: +230 EM y ATQ% tras activar reacciones de Propagación."
      },
      {
        "set": "Orquesta del Errante (4 piezas)",
        "note": "+80 EM y +35% Daño a Flechas Cargadas."
      },
      {
        "set": "Recuerdos del Bosque (4 piezas)",
        "note": "-30% Resistencia Dendro si ningún compañero lo lleva."
      }
    ],
    "statPriority": {
      "sands": "Maestría Elemental (EM)",
      "goblet": "Bono Daño Dendro%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > Maestría Elemental > ATQ% > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 20,000",
      "atk": "1,400 - 1,600",
      "def": "Base (~750 - 850 DEF)",
      "em": "300 - 450 EM",
      "er": "120% ER",
      "crit": "75%+ CR / 180%+ CD"
    },
    "metaTeams": [
      {
        "name": "Tighnari Spread Quickswap",
        "members": [
          "Tighnari",
          "Yae Miko",
          "Nahida",
          "Zhongli"
        ],
        "comp": "Tighnari • Yae Miko • Nahida • Zhongli"
      },
      {
        "name": "Tighnari Fischl Core",
        "members": [
          "Tighnari",
          "Fischl",
          "Kazuha",
          "Kirara"
        ],
        "comp": "Tighnari • Fischl • Kazuha • Kirara"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. Maestría Elemental",
      "4. ATQ%",
      "5. Recarga"
    ],
    "mainStats": {
      "sands": "Maestría Elemental (EM)",
      "goblet": "Bono Daño Dendro%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 20,000",
      "atk": "1,400 - 1,600",
      "def": "Base (~750 - 850 DEF)",
      "em": "300 - 450 EM",
      "er": "120% ER",
      "crit": "75%+ CR / 180%+ CD"
    }
  },
  {
    "id": "xinyan",
    "name": {
      "es": "Xinyan",
      "en": "Xinyan"
    },
    "element": "Pyro",
    "rarity": 4,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Xinyan.png",
    "tier": "T2 Physical DPS & Shielder",
    "role": "Estrella de Rock de Liyue • Daño Físico Explosivo en Burst y Escudo Pyro",
    "roleCategory": "main_dps",
    "scalingType": "DEF",
    "scalingLabel": "Escudo escala con DEF, Daño Definitivo físico garantiza 100% Crítico en C2",
    "bestWeapons": [
      {
        "name": "Espadón Cornirrojo (Redhorn)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+88.2% Daño Crítico y bono por DEF."
      },
      {
        "name": "Médula de la Serpiente Marina",
        "rarity": 4,
        "type": "BiS Pase",
        "note": "+Prob. Crítica y daño."
      },
      {
        "name": "Orgullo Celestial",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+Recarga y ondas de vacío físicas."
      },
      {
        "name": "Sombra Blanca (Whiteblind)",
        "rarity": 4,
        "type": "Mejor Forja",
        "note": "+DEF% para escudo y golpes."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Llama Albina (4 piezas)",
        "note": "+50% Daño Físico y +18% ATQ."
      },
      {
        "set": "Caballería Sanguinaria (2 piezas) + Llama Albina (2 piezas)",
        "note": "+50% Daño Físico permanente."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o DEF%",
      "goblet": "Bono Daño Físico%",
      "circlet": "Daño Crítico (C2 garantiza 100% CR en Q)",
      "substats": "Daño Crítico > ATQ% > DEF% > Recarga de Energía%"
    },
    "benchmarks": {
      "hp": "16,000",
      "atk": "2,000",
      "def": "1,800",
      "em": "0",
      "er": "120% ER",
      "crit": "170%+ CD"
    },
    "metaTeams": [
      {
        "name": "Xinyan Physical Rock",
        "members": [
          "Xinyan",
          "Fischl",
          "Rosaria",
          "Bennett"
        ],
        "comp": "Xinyan • Fischl • Rosaria • Bennett"
      },
      {
        "name": "Xinyan Spin-to-Win",
        "members": [
          "Xinyan",
          "Furina",
          "Mika",
          "Zhongli"
        ],
        "comp": "Xinyan • Furina • Mika • Zhongli"
      }
    ],
    "substatsPriority": [
      "1. Daño Crítico",
      "2. ATQ%",
      "3. DEF%",
      "4. Recarga de Energía%"
    ],
    "mainStats": {
      "sands": "ATQ% o DEF%",
      "goblet": "Bono Daño Físico%",
      "circlet": "Daño Crítico (C2 garantiza 100% CR en Q)"
    },
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "2,000",
      "def": "1,800",
      "em": "0",
      "er": "120% ER",
      "crit": "170%+ CD"
    }
  },
  {
    "id": "yun_jin",
    "name": {
      "es": "Yun Jin",
      "en": "Yun Jin"
    },
    "element": "Geo",
    "rarity": 4,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Yunjin.png",
    "tier": "T1 Normal Attack Buffer",
    "role": "Directora de la Ópera Heyun • Aumento Masivo de Daño Plano a Ataques Normales basado en DEF",
    "roleCategory": "support",
    "scalingType": "DEF",
    "scalingLabel": "Buff de Ataques Normales escala puramente con su Defensa Total (DEF)",
    "bestWeapons": [
      {
        "name": "Lanza de Favonius (Favonius Lance)",
        "rarity": 4,
        "type": "BiS Indiscutible",
        "note": "Batería para costear su Definitiva de 60 energía."
      },
      {
        "name": "Huella del Arcoíris",
        "rarity": 4,
        "type": "Forja Natlan",
        "note": "+DEF% colosal."
      },
      {
        "name": "La Captura",
        "rarity": 4,
        "type": "Opción ER",
        "note": "+Recarga."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Cáscara de Sueños Opulentos (4 piezas)",
        "note": "BiS Indiscutible: Hasta +54% DEF total y +24% Bono Geo."
      },
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "+20% ATQ para aliados."
      }
    ],
    "statPriority": {
      "sands": "DEF% o Recarga de Energía",
      "goblet": "DEF%",
      "circlet": "DEF% o Prob. Crítica (Favonius)",
      "substats": "DEF% > Recarga de Energía% > Prob. Crítica > DEF Plana"
    },
    "benchmarks": {
      "hp": "16,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "2,400 - 2,800 DEF",
      "em": "0",
      "er": "200% - 220% ER",
      "crit": "50%+ CR"
    },
    "metaTeams": [
      {
        "name": "Yoimiya Normal Attack Hyper",
        "members": [
          "Yoimiya",
          "Yun Jin",
          "Yelan",
          "Zhongli"
        ],
        "comp": "Yoimiya • Yun Jin • Yelan • Zhongli"
      },
      {
        "name": "Ayato Normal Slash",
        "members": [
          "Ayato",
          "Yun Jin",
          "Kazuha",
          "Bennett"
        ],
        "comp": "Ayato • Yun Jin • Kazuha • Bennett"
      },
      {
        "name": "Noelle Spin & Sunder",
        "members": [
          "Noelle",
          "Yun Jin",
          "Gorou",
          "Furina"
        ],
        "comp": "Noelle • Yun Jin • Gorou • Furina"
      }
    ],
    "substatsPriority": [
      "1. DEF%",
      "2. Recarga de Energía%",
      "3. Prob. Crítica",
      "4. DEF Plana"
    ],
    "mainStats": {
      "sands": "DEF% o Recarga de Energía",
      "goblet": "DEF%",
      "circlet": "DEF% o Prob. Crítica (Favonius)"
    },
    "recommendedPanel": {
      "hp": "16,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "2,400 - 2,800 DEF",
      "em": "0",
      "er": "200% - 220% ER",
      "crit": "50%+ CR"
    }
  },
  {
    "id": "aloy",
    "name": {
      "es": "Aloy",
      "en": "Aloy"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Aloy.png",
    "tier": "T3 Cryo Burst DPS",
    "role": "Cazadora Nora • Bombas Criogénicas y Daño Explosivo de Definitiva",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escala con ATQ% y Daño Cryo",
    "bestWeapons": [
      {
        "name": "Agitador del Relámpago",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Daño Crítico y ATQ."
      },
      {
        "name": "Último Acorde (The Stringless)",
        "rarity": 4,
        "type": "BiS 4★",
        "note": "+Daño a Burst."
      },
      {
        "name": "Arco del Sacrificio",
        "rarity": 4,
        "type": "Utilidad",
        "note": "Doble uso de minibombas."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Nómada del Invierno (2 piezas) + Ritual Nobleza (2 piezas)",
        "note": "+15% Cryo y +20% Burst."
      },
      {
        "set": "Emblema del Destino (4 piezas)",
        "type": "Opción Nuke Burst",
        "bonus": "+20% Recarga de Energía y bono de daño colosal a su Definitiva Cryo."
      }
    ],
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "1,800",
      "def": "Base (~750)",
      "em": "0",
      "er": "120% ER",
      "crit": "60%+ CR / 140%+ CD"
    },
    "metaTeams": [
      {
        "name": "Aloy Quick Burst",
        "members": [
          "Aloy",
          "Kazuha",
          "Xiangling",
          "Bennett"
        ],
        "comp": "Aloy • Kazuha • Xiangling • Bennett"
      },
      {
        "name": "Aloy Mono Cryo Strike",
        "members": [
          "Aloy",
          "Shenhe",
          "Kazuha",
          "Diona"
        ],
        "comp": "Aloy • Shenhe • Kazuha • Diona"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Recarga"
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "1,800",
      "def": "Base (~750)",
      "em": "0",
      "er": "120% ER",
      "crit": "60%+ CR / 140%+ CD"
    }
  },
  {
    "id": "amber",
    "name": {
      "es": "Amber",
      "en": "Amber"
    },
    "element": "Pyro",
    "rarity": 4,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Ambor.png",
    "tier": "T2 Pyro Enabler & Buffer",
    "role": "Exploradora de los Caballeros de Favonius • Lluvia de Flechas de Rápida Aplicación y Señor Barón",
    "roleCategory": "support",
    "scalingType": "ATK",
    "scalingLabel": "Escala con Recarga y Maestría para Vaporizados/Derretidos",
    "bestWeapons": [
      {
        "name": "Elegía del Fin (Elegy for the End)",
        "rarity": 5,
        "type": "BiS Support 5★",
        "note": "Aplica los 4 stacks en 1 segundo con su Definitiva para +100 EM y +20% ATQ."
      },
      {
        "name": "Arco de Favonius",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Generación de energía."
      },
      {
        "name": "Último Acorde",
        "rarity": 4,
        "type": "Opción Daño",
        "note": "+Daño en Habilidad y Burst."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "BiS: +20% ATQ inmediato gracias a su Burst de 40 energía."
      },
      {
        "set": "Instructor (4 piezas)",
        "note": "+120 EM a todo el escuadrón."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía o Maestría Elemental",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica",
      "substats": "Recarga de Energía% > Prob. Crítica > Maestría Elemental"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750)",
      "em": "0",
      "er": "180% - 200% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Hu Tao Amber VV Vape",
        "members": [
          "Hu Tao",
          "Xingqiu",
          "Amber",
          "Kazuha"
        ],
        "comp": "Hu Tao • Xingqiu • Amber • Kazuha"
      },
      {
        "name": "Amber Burgeon Bomber",
        "members": [
          "Amber",
          "Nahida",
          "Xingqiu",
          "Zhongli"
        ],
        "comp": "Amber • Nahida • Xingqiu • Zhongli"
      }
    ],
    "substatsPriority": [
      "1. Recarga de Energía%",
      "2. Prob. Crítica",
      "3. Maestría Elemental"
    ],
    "mainStats": {
      "sands": "Recarga de Energía o Maestría Elemental",
      "goblet": "Bono Daño Pyro%",
      "circlet": "Prob. Crítica"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750)",
      "em": "0",
      "er": "180% - 200% ER",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "collei",
    "name": {
      "es": "Collei",
      "en": "Collei"
    },
    "element": "Dendro",
    "rarity": 4,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Collei.png",
    "tier": "T1 Fast Dendro Enabler",
    "role": "Guardabosques en Prácticas • Aplicación Dendro Rápida Frontal y Bumerán Floral",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escalado por ATQ% y Maestría Elemental (EM)",
    "bestWeapons": [
      {
        "name": "Elegía del Fin (Elegy for the End)",
        "rarity": 5,
        "type": "BiS Support 5★",
        "note": "+100 EM y +20% ATQ al equipo."
      },
      {
        "name": "Arco de Favonius",
        "rarity": 4,
        "type": "BiS F2P",
        "note": "Batería de energía constante."
      },
      {
        "name": "Arco del Sacrificio",
        "rarity": 4,
        "type": "Utilidad Reset",
        "note": "Doble bumerán floral."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Recuerdos del Bosque (4 piezas)",
        "note": "BiS Indiscutible: -30% Resistencia Dendro enemiga."
      },
      {
        "set": "Instructor (4 piezas)",
        "note": "+120 EM para aliados."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía o ATQ%",
      "goblet": "Bono Daño Dendro%",
      "circlet": "Prob. Crítica",
      "substats": "Recarga de Energía% > Prob. Crítica > ATQ% > Maestría Elemental"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750)",
      "em": "0",
      "er": "180% - 210% ER",
      "crit": "55%+ CR"
    },
    "metaTeams": [
      {
        "name": "Nilou Bloom F2P",
        "members": [
          "Nilou",
          "Collei",
          "Viajera",
          "Kokomi"
        ],
        "comp": "Nilou • Collei • Viajera • Kokomi"
      },
      {
        "name": "Keqing Aggravate Collei",
        "members": [
          "Keqing",
          "Fischl",
          "Collei",
          "Zhongli"
        ],
        "comp": "Keqing • Fischl • Collei • Zhongli"
      }
    ],
    "substatsPriority": [
      "1. Recarga de Energía%",
      "2. Prob. Crítica",
      "3. ATQ%",
      "4. Maestría Elemental"
    ],
    "mainStats": {
      "sands": "Recarga de Energía o ATQ%",
      "goblet": "Bono Daño Dendro%",
      "circlet": "Prob. Crítica"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750)",
      "em": "0",
      "er": "180% - 210% ER",
      "crit": "55%+ CR"
    }
  },
  {
    "id": "freminet",
    "name": {
      "es": "Freminet",
      "en": "Freminet"
    },
    "element": "Cryo",
    "rarity": 4,
    "weaponType": "Claymore",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Freminet.png",
    "tier": "T1 Physical & Shatter DPS",
    "role": "Buzo de Fontaine • Mandoble de Daño Físico y Reacción Rompehielo (Shatter)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Reloj de Pers escala con ATQ% y niveles de presión",
    "bestWeapons": [
      {
        "name": "Oda a los Pinos (Song of Broken Pines)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Daño Físico colosal y velocidad de ataque."
      },
      {
        "name": "Médula de la Serpiente Marina",
        "rarity": 4,
        "type": "BiS Pase",
        "note": "+Prob. Crítica y hasta +50% daño."
      },
      {
        "name": "Sombra de la Marea (Tidal Shadow)",
        "rarity": 4,
        "type": "Mejor Forja F2P",
        "note": "+48% ATQ al recibir curación."
      },
      {
        "name": "Gran Espada de Favonius",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Recarga fluida."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Llama Albina (4 piezas)",
        "note": "BiS Físico: +50% Daño Físico y +18% ATQ."
      },
      {
        "set": "Cazador Sombrío (4 piezas)",
        "note": "+36% Prob. Crítica si va con Furina."
      }
    ],
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Físico%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "2,100",
      "def": "Base (~750)",
      "em": "0",
      "er": "120% ER",
      "crit": "70%+ CR / 150%+ CD"
    },
    "metaTeams": [
      {
        "name": "Freminet Shatter Cryo",
        "members": [
          "Freminet",
          "Xingqiu",
          "Fischl",
          "Mika"
        ],
        "comp": "Freminet • Xingqiu • Fischl • Mika"
      },
      {
        "name": "Freminet Furina Core",
        "members": [
          "Freminet",
          "Furina",
          "Mika",
          "Kuki Shinobu"
        ],
        "comp": "Freminet • Furina • Mika • Kuki Shinobu"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Recarga"
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Físico%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "2,100",
      "def": "Base (~750)",
      "em": "0",
      "er": "120% ER",
      "crit": "70%+ CR / 150%+ CD"
    }
  },
  {
    "id": "traveler_anemo",
    "name": {
      "es": "Viajero (Anemo)",
      "en": "Traveler (Anemo)"
    },
    "element": "Anemo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_PlayerBoy.png",
    "tier": "T2 Anemo Swirl & Res Shred",
    "role": "Viajero Elemental • Vórtice de Palma y Tornado con -20% Resistencia en C6",
    "roleCategory": "support",
    "scalingType": "EM",
    "scalingLabel": "Escalado por Maestría Elemental y Recarga",
    "bestWeapons": [
      {
        "name": "Juramento por la Libertad",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+EM y buff a todo el equipo."
      },
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "BiS Batería F2P",
        "note": "Batería de energía."
      },
      {
        "name": "Espina de Hierro (Iron Sting)",
        "rarity": 4,
        "type": "Forja EM",
        "note": "+165 EM."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "note": "-40% Resistencia elemental enemiga."
      },
      {
        "set": "Instructor (4 piezas)",
        "type": "Soporte F2P",
        "bonus": "+120 de Maestría Elemental a todo el equipo al activar un Torbellino."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía o EM",
      "goblet": "Maestría Elemental o Bono Anemo%",
      "circlet": "Maestría Elemental",
      "substats": "Maestría Elemental > Recarga de Energía%"
    },
    "benchmarks": {
      "hp": "17,000 - 20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "700+ EM",
      "er": "180%",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Anemo Swirl F2P",
        "members": [
          "Viajero",
          "Xiangling",
          "Xingqiu",
          "Bennett"
        ],
        "comp": "Viajero • Xiangling • Xingqiu • Bennett"
      },
      {
        "name": "Anemo VV Debuffer",
        "members": [
          "Keqing",
          "Fischl",
          "Viajero",
          "Yaoyao"
        ],
        "comp": "Keqing • Fischl • Viajero • Yaoyao"
      }
    ],
    "substatsPriority": [
      "1. Maestría Elemental",
      "2. Recarga de Energía%"
    ],
    "mainStats": {
      "sands": "Recarga de Energía o EM",
      "goblet": "Maestría Elemental o Bono Anemo%",
      "circlet": "Maestría Elemental"
    },
    "recommendedPanel": {
      "hp": "17,000 - 20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "700+ EM",
      "er": "180%",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "traveler_geo",
    "name": {
      "es": "Viajero (Geo)",
      "en": "Traveler (Geo)"
    },
    "element": "Geo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_PlayerBoy.png",
    "tier": "T1 Geo Crit Buffer & Battery",
    "role": "Viajero Elemental • Construcciones Geo, Batería y +10% Prob. Crítica dentro de su muro en C1",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Espada de Estrellas Caídas escala con ATQ% puro",
    "bestWeapons": [
      {
        "name": "Cortador de Jade Primordial",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+44.1% Prob. Crítica."
      },
      {
        "name": "Reflejo de las Tinieblas",
        "rarity": 5,
        "type": "Opción 5★",
        "note": "+Daño Crítico."
      },
      {
        "name": "Deseo Ponzoñoso (Festering Desire)",
        "rarity": 4,
        "type": "BiS Evento",
        "note": "+32% Daño en E."
      },
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "Batería F2P",
        "note": "Batería Geo excelente."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Emblema del Destino (4 piezas)",
        "note": "+Daño masivo a la onda sísmica."
      },
      {
        "set": "Petra Arcaica (2 piezas) + Gladiador (2 piezas)",
        "note": "+15% Geo y +18% ATQ."
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Recarga",
      "goblet": "Bono Daño Geo%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "Prob. Crítica > Daño Crítico > ATQ% > Recarga"
    },
    "benchmarks": {
      "hp": "17,000 - 19,000",
      "atk": "1,900",
      "def": "Base (~750)",
      "em": "0",
      "er": "120% ER",
      "crit": "65%+ CR / 140%+ CD"
    },
    "metaTeams": [
      {
        "name": "Geo Microwave Resonance",
        "members": [
          "Zhongli",
          "Viajero",
          "Bennett",
          "Xiangling"
        ],
        "comp": "Zhongli • Viajero • Bennett • Xiangling"
      },
      {
        "name": "Mono Geo F2P",
        "members": [
          "Itto",
          "Viajero",
          "Gorou",
          "Bennett"
        ],
        "comp": "Itto • Viajero • Gorou • Bennett"
      }
    ],
    "substatsPriority": [
      "1. Prob. Crítica",
      "2. Daño Crítico",
      "3. ATQ%",
      "4. Recarga"
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga",
      "goblet": "Bono Daño Geo%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "recommendedPanel": {
      "hp": "17,000 - 19,000",
      "atk": "1,900",
      "def": "Base (~750)",
      "em": "0",
      "er": "120% ER",
      "crit": "65%+ CR / 140%+ CD"
    }
  },
  {
    "id": "traveler_electro",
    "name": {
      "es": "Viajero (Electro)",
      "en": "Traveler (Electro)"
    },
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_PlayerBoy.png",
    "tier": "T2 Universal Energy Battery",
    "role": "Viajero Elemental • Amuletos de Abundancia que recargan energía plana a cualquier personaje",
    "roleCategory": "support",
    "scalingType": "ER",
    "scalingLabel": "Recarga donada escala directamente con su propia Recarga de Energía",
    "bestWeapons": [
      {
        "name": "Hoja Afilada Celestial (Skyward Blade)",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+Recarga elevada."
      },
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "BiS Indiscutible",
        "note": "Batería máxima de energía."
      },
      {
        "name": "Espada del Sacrificio",
        "rarity": 4,
        "type": "Utilidad",
        "note": "Doble generación de amuletos."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Emblema del Destino (4 piezas)",
        "note": "+20% Recarga y daño según ER."
      },
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "+20% ATQ para aliados."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía",
      "goblet": "Recarga de Energía o Bono Electro%",
      "circlet": "Prob. Crítica (Favonius)",
      "substats": "Recarga de Energía% > Prob. Crítica > ATQ%"
    },
    "benchmarks": {
      "hp": "16,000 - 19,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "250%+ ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Eula Electro Battery",
        "members": [
          "Eula",
          "Viajero",
          "Diona",
          "Rosaria"
        ],
        "comp": "Eula • Viajero • Diona • Rosaria"
      },
      {
        "name": "Hyperbloom Electro Trigger",
        "members": [
          "Viajero",
          "Nahida",
          "Xingqiu",
          "Baizhu"
        ],
        "comp": "Viajero • Nahida • Xingqiu • Baizhu"
      }
    ],
    "substatsPriority": [
      "1. Recarga de Energía%",
      "2. Prob. Crítica",
      "3. ATQ%"
    ],
    "mainStats": {
      "sands": "Recarga de Energía",
      "goblet": "Recarga de Energía o Bono Electro%",
      "circlet": "Prob. Crítica (Favonius)"
    },
    "recommendedPanel": {
      "hp": "16,000 - 19,000 HP",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "250%+ ER",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "traveler_dendro",
    "name": {
      "es": "Viajero (Dendro)",
      "en": "Traveler (Dendro)"
    },
    "element": "Dendro",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_PlayerBoy.png",
    "tier": "T0 F2P Dendro Enabler",
    "role": "Viajero Elemental • Loto Luminiscente de Amplia Cobertura y Aplicación Dendro Continua",
    "roleCategory": "support",
    "scalingType": "EM",
    "scalingLabel": "Escalado dual por Recarga de Energía y Maestría Elemental (EM)",
    "bestWeapons": [
      {
        "name": "Juramento por la Libertad",
        "rarity": 5,
        "type": "BiS 5★",
        "note": "+198 EM y buff al equipo."
      },
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "BiS F2P Batería",
        "note": "Indispensable para su costo de 80 energía."
      },
      {
        "name": "Espada de Madera (Sapwood Blade R5)",
        "rarity": 4,
        "type": "Mejor Forja Sumeru",
        "note": "+Recarga y suelta hoja de +120 EM."
      },
      {
        "name": "Espada del Sacrificio",
        "rarity": 4,
        "type": "Utilidad",
        "note": "Doble uso de E para partículas."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Recuerdos del Bosque (4 piezas)",
        "note": "BiS Indiscutible: -30% Resistencia Dendro enemiga."
      },
      {
        "set": "Emblema del Destino (4 piezas)",
        "note": "Facilita rotaciones con +20% Recarga."
      },
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "+20% ATQ al equipo."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía",
      "goblet": "Bono Daño Dendro% o EM",
      "circlet": "Prob. Crítica (Favonius)",
      "substats": "Recarga de Energía% > Prob. Crítica > Maestría Elemental > ATQ%"
    },
    "benchmarks": {
      "hp": "17,000 - 20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "220% - 250% ER",
      "crit": "55%+ CR"
    },
    "metaTeams": [
      {
        "name": "Hyperbloom F2P Starter",
        "members": [
          "Viajero",
          "Kuki Shinobu",
          "Xingqiu",
          "Fischl"
        ],
        "comp": "Viajero • Kuki Shinobu • Xingqiu • Fischl"
      },
      {
        "name": "Nilou Bloom F2P",
        "members": [
          "Nilou",
          "Viajero",
          "Collei",
          "Kokomi"
        ],
        "comp": "Nilou • Viajero • Collei • Kokomi"
      }
    ],
    "substatsPriority": [
      "1. Recarga de Energía%",
      "2. Prob. Crítica",
      "3. Maestría Elemental",
      "4. ATQ%"
    ],
    "mainStats": {
      "sands": "Recarga de Energía",
      "goblet": "Bono Daño Dendro% o EM",
      "circlet": "Prob. Crítica (Favonius)"
    },
    "recommendedPanel": {
      "hp": "17,000 - 20,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "220% - 250% ER",
      "crit": "55%+ CR"
    }
  },
  {
    "id": "traveler_hydro",
    "name": {
      "es": "Viajero (Hydro)",
      "en": "Traveler (Hydro)"
    },
    "element": "Hydro",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_PlayerBoy.png",
    "tier": "T3 Hydro Torrent Support",
    "role": "Viajero Elemental • Disparos Torrenciales de Agua y Mareas de Fontaine",
    "roleCategory": "sub_dps",
    "scalingType": "HP",
    "scalingLabel": "Escalado por Vida Máxima y Fluctuación Arkhe",
    "bestWeapons": [
      {
        "name": "Espada de Favonius",
        "rarity": 4,
        "type": "BiS Batería",
        "note": "Batería de energía."
      },
      {
        "name": "Vado del Río Ceniciento",
        "rarity": 4,
        "type": "Forja Fontaine Pesca",
        "note": "+Recarga y Prob. Crítica."
      },
      {
        "name": "Espada del Sacrificio",
        "rarity": 4,
        "type": "Utilidad",
        "note": "Doble torrente."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "note": "+20% ATQ para aliados."
      },
      {
        "set": "Emblema del Destino (4 piezas)",
        "note": "+Daño a su Definitiva de ola."
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía o Vida%",
      "goblet": "Bono Daño Hydro%",
      "circlet": "Prob. Crítica",
      "substats": "Recarga de Energía% > Prob. Crítica > Vida%"
    },
    "benchmarks": {
      "hp": "22,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "190% ER",
      "crit": "60%+ CR / 120%+ CD"
    },
    "metaTeams": [
      {
        "name": "Hydro Arkhe F2P",
        "members": [
          "Viajero",
          "Xiangling",
          "Bennett",
          "Kazuha"
        ],
        "comp": "Viajero • Xiangling • Bennett • Kazuha"
      },
      {
        "name": "Hydro Hyperbloom F2P",
        "members": [
          "Viajero",
          "Nahida",
          "Kuki Shinobu",
          "Kazuha"
        ],
        "comp": "Viajero • Nahida • Kuki Shinobu • Kazuha"
      }
    ],
    "substatsPriority": [
      "1. Recarga de Energía%",
      "2. Prob. Crítica",
      "3. Vida%"
    ],
    "mainStats": {
      "sands": "Recarga de Energía o Vida%",
      "goblet": "Bono Daño Hydro%",
      "circlet": "Prob. Crítica"
    },
    "recommendedPanel": {
      "hp": "22,000",
      "atk": "Base (~1,000 - 1,200 ATQ)",
      "def": "Base (~750 - 850 DEF)",
      "em": "0",
      "er": "190% ER",
      "crit": "60%+ CR / 120%+ CD"
    }
  },
  {
    "id": "jahoda",
    "name": {
      "es": "Jahoda",
      "en": "Jahoda"
    },
    "element": "Anemo",
    "rarity": 4,
    "weaponType": "Bow",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Jahoda.png",
    "tier": "T1 Anemo Support",
    "role": "Soporte Anemo, Reducción de RES (VV) y Curación / Buffer de ATQ",
    "roleCategory": "support",
    "scalingType": "ATK",
    "scalingLabel": "Escala con ATQ% y Recarga de Energía",
    "bestWeapons": [
      {
        "name": "Elegía del Fin (Elegy for the End)",
        "rarity": 5,
        "type": "BiS",
        "note": "55.1% Recarga de Energía y otorga +100 EM y +20% ATQ a todo el equipo."
      },
      {
        "name": "Arco de Favonius (Favonius Warbow)",
        "rarity": 4,
        "type": "Mejor 4★ Batería",
        "note": "61.3% Recarga de Energía y partículas blancas para el equipo."
      },
      {
        "name": "Arco del Sacrificio (Sacrificial Bow)",
        "rarity": 4,
        "type": "Alternativa F2P",
        "note": "Doble uso de Habilidad Elemental para máxima generación de energía."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Sombra Verde Esmeralda (4 piezas)",
        "type": "BiS",
        "bonus": "+15% Daño Anemo, +60% Daño Torbellino y -40% RES Elemental al enemigo."
      },
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "type": "Alternativa Buffer",
        "bonus": "+20% ATQ para todo el equipo al lanzar la Definitiva."
      }
    ],
    "mainStats": {
      "sands": "Recarga de Energía o ATQ%",
      "goblet": "ATQ%",
      "circlet": "ATQ%, Bono Curación o Prob. Crítica"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (180% – 200% ER)",
      "2. ATQ%",
      "3. Prob. Crítica (si usa Favonius)",
      "4. Maestría Elemental"
    ],
    "talentPriority": "Definitiva (Q) >>> Habilidad Elemental (E) > Ataques Normales",
    "benchmarks": {
      "hp": "16,000+",
      "atk": "1,800 – 2,200 ATQ",
      "def": "700",
      "em": "150+ EM",
      "er": "180% – 200% ER",
      "crit": "50%+ CR (Favonius)"
    },
    "metaTeams": [
      {
        "name": "Varka / Durin Hexerei Core",
        "comp": "Varka • Durin • Jahoda • Bennett",
        "members": [
          "Varka",
          "Durin",
          "Jahoda",
          "Bennett"
        ]
      },
      {
        "name": "Aggravate / Electro-Charged Support",
        "comp": "Clorinde • Fischl • Furina • Jahoda",
        "members": [
          "Clorinde",
          "Fischl",
          "Furina",
          "Jahoda"
        ]
      }
    ],
    "statPriority": {
      "sands": "Recarga de Energía o ATQ%",
      "goblet": "ATQ%",
      "circlet": "ATQ%, Bono Curación o Prob. Crítica",
      "substats": "1. Recarga de Energía% (180% – 200% ER) > 2. ATQ% > 3. Prob. Crítica (si usa Favonius) > 4. Maestría Elemental"
    },
    "recommendedPanel": {
      "hp": "16,000+",
      "atk": "1,800 – 2,200 ATQ",
      "def": "700",
      "em": "150+ EM",
      "er": "180% – 200% ER",
      "crit": "50%+ CR (Favonius)"
    }
  },
  {
    "id": "lohen",
    "name": {
      "es": "Lohen",
      "en": "Lohen"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Polearm",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Lohen.png",
    "tier": "T0 Hexerei Cryo DPS",
    "role": "Main DPS Cryo de Brujería (Hexerei DPS) de Alto Daño Crítico",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escala con ATQ%, Bono Daño Cryo y Críticos",
    "bestWeapons": [
      {
        "name": "Desastre y Arrepentimiento (Disaster and Remorse)",
        "rarity": 5,
        "type": "BiS Absoluto (Firma)",
        "note": "Lanza firma de Lohen con Crítico masivo y bono de daño Hexerei."
      },
      {
        "name": "Báculo de Homa (Staff of Homa)",
        "rarity": 5,
        "type": "Alternativa 5★",
        "note": "66.2% Daño Crítico y gran bono de ATQ."
      },
      {
        "name": "Halcón de Jade (Primordial Jade Winged-Spear)",
        "rarity": 5,
        "type": "Stat-Stick CR",
        "note": "674 ATQ Base y 22.1% Prob. Crítica."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Día de los Vientos Alzantes / A Day Carved from Rising Winds (4 piezas)",
        "type": "BiS",
        "bonus": "Potencia el daño de unidades Hexerei y otorga Prob. Crítica/ATQ."
      },
      {
        "set": "Nómada del Invierno (4 piezas)",
        "type": "Alternativa Freeze",
        "bonus": "+15% Bono Cryo y hasta +40% Prob. Crítica contra enemigos congelados."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Daño Crítico o Prob. Crítica"
    },
    "substatsPriority": [
      "1. Daño Crítico / Prob. Crítica (Ratio 1:2)",
      "2. ATQ%",
      "3. Recarga de Energía% (120% – 130%)"
    ],
    "talentPriority": "Habilidad Elemental (E) = Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "18,000",
      "atk": "2,100 – 2,500+ ATQ",
      "def": "800",
      "em": "0 – 100 EM",
      "er": "120% – 130% ER",
      "crit": "75%+ CR / 210%+ CD"
    },
    "metaTeams": [
      {
        "name": "Lohen Hexerei Hypercarry",
        "comp": "Lohen • Nicole • Escoffier • Furina",
        "members": [
          "Lohen",
          "Nicole",
          "Escoffier",
          "Furina"
        ]
      },
      {
        "name": "Lohen Reverse Melt",
        "comp": "Lohen • Durin • Nicole • Bennett",
        "members": [
          "Lohen",
          "Durin",
          "Nicole",
          "Bennett"
        ]
      }
    ],
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "Bono Daño Cryo%",
      "circlet": "Daño Crítico o Prob. Crítica",
      "substats": "1. Daño Crítico / Prob. Crítica (Ratio 1:2) > 2. ATQ% > 3. Recarga de Energía% (120% – 130%)"
    },
    "recommendedPanel": {
      "hp": "18,000",
      "atk": "2,100 – 2,500+ ATQ",
      "def": "800",
      "em": "0 – 100 EM",
      "er": "120% – 130% ER",
      "crit": "75%+ CR / 210%+ CD"
    }
  },
  {
    "id": "nicole",
    "name": {
      "es": "Nicole",
      "en": "Nicole"
    },
    "element": "Pyro",
    "rarity": 5,
    "weaponType": "Catalyst",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_Nicole.png",
    "tier": "T0 Hexerei Pyro Support",
    "role": "Soporte Premium del Aquelarre (Hexenzirkel / Hexerei Buffer de ATQ)",
    "roleCategory": "support",
    "scalingType": "ATK",
    "scalingLabel": "Amplifica el daño del equipo según su ATQ% total",
    "bestWeapons": [
      {
        "name": "Heptadas de los Ángeles (Angelos' Heptades)",
        "rarity": 5,
        "type": "BiS Absoluto (Firma)",
        "note": "Catalizador firma de Nicole con ATQ% masivo y bendición Hexerei grupal."
      },
      {
        "name": "Pergamino Celestial (Skyward Atlas)",
        "rarity": 5,
        "type": "Alternativa 5★ ATQ",
        "note": "674 ATQ Base y 33.1% ATQ secundario para maximizar su buff."
      },
      {
        "name": "Códice de Favonius (Favonius Codex)",
        "rarity": 4,
        "type": "Mejor F2P Batería",
        "note": "Recarga de Energía y generación de partículas para el equipo."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Dádiva Celestial / Celestial Gift (4 piezas)",
        "type": "BiS",
        "bonus": "Set insignia de soporte que incrementa el ATQ y el daño de todo el escuadrón."
      },
      {
        "set": "Ritual Antiguo de la Nobleza (4 piezas)",
        "type": "Alternativa Clásica",
        "bonus": "+20% ATQ para todo el equipo al usar la Definitiva."
      }
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga de Energía",
      "goblet": "ATQ%",
      "circlet": "ATQ%"
    },
    "substatsPriority": [
      "1. ATQ% (Hasta alcanzar el tope de su bendición)",
      "2. Recarga de Energía% (160% – 180% ER)",
      "3. Prob. Crítica"
    ],
    "talentPriority": "Habilidad Elemental (E) = Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "17,000+",
      "atk": "2,800 – 3,400+ ATQ",
      "def": "750",
      "em": "0",
      "er": "160% – 180% ER",
      "crit": "50%+ CR"
    },
    "metaTeams": [
      {
        "name": "Hexenzirkel Core (Varka / Lohen)",
        "comp": "Varka • Durin • Nicole • Bennett",
        "members": [
          "Varka",
          "Durin",
          "Nicole",
          "Bennett"
        ]
      },
      {
        "name": "Lohen Cryo Hexerei",
        "comp": "Lohen • Nicole • Shenhe • Escoffier",
        "members": [
          "Lohen",
          "Nicole",
          "Shenhe",
          "Escoffier"
        ]
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Recarga de Energía",
      "goblet": "ATQ%",
      "circlet": "ATQ%",
      "substats": "1. ATQ% (Hasta alcanzar el tope de su bendición) > 2. Recarga de Energía% (160% – 180% ER) > 3. Prob. Crítica"
    },
    "recommendedPanel": {
      "hp": "17,000+",
      "atk": "2,800 – 3,400+ ATQ",
      "def": "750",
      "em": "0",
      "er": "160% – 180% ER",
      "crit": "50%+ CR"
    }
  },
  {
    "id": "traveler_cryo",
    "name": {
      "es": "Viajero (Cryo)",
      "en": "Traveler (Cryo)"
    },
    "element": "Cryo",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_PlayerGirl.png",
    "tier": "T1 Stellar-Glimmer Cryo DPS",
    "role": "DPS / Sub-DPS Cryo de Fulgor Estelar (Snezhnaya Resonance)",
    "roleCategory": "main_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escala con ATQ% y Críticos",
    "bestWeapons": [
      {
        "name": "Hoja de Exáifanes (Exaiphanes Blade)",
        "rarity": 5,
        "type": "BiS",
        "note": "Espada de Snezhnaya con bono especial para el Viajero y alto ATQ/Crítico."
      },
      {
        "name": "Reflejo de las Tinieblas (Mistsplitter Reforged)",
        "rarity": 5,
        "type": "Alternativa 5★",
        "note": "44.1% Daño Crítico y hasta +40% Bono Daño Elemental."
      },
      {
        "name": "Espada de Favonius (Favonius Sword)",
        "rarity": 4,
        "type": "Opción Soporte F2P",
        "note": "61.3% Recarga de Energía y batería para el equipo."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Desilusión Congelada en las Sombras / Disenchantment in Deep Shadows (4 piezas)",
        "type": "BiS",
        "bonus": "Potencia el daño de reacciones estelares de Snezhnaya y Crítico."
      },
      {
        "set": "Nómada del Invierno (4 piezas)",
        "type": "Alternativa Cryo",
        "bonus": "+15% Bono Cryo y hasta +40% Prob. Crítica."
      }
    ],
    "mainStats": {
      "sands": "ATQ%",
      "goblet": "ATQ% o Bono Daño Cryo%",
      "circlet": "Daño Crítico o Prob. Crítica"
    },
    "substatsPriority": [
      "1. Daño Crítico / Prob. Crítica",
      "2. ATQ%",
      "3. Recarga de Energía% (130% – 150%)"
    ],
    "talentPriority": "Habilidad Elemental (E) > Definitiva (Q) > Ataques Normales",
    "benchmarks": {
      "hp": "16,500",
      "atk": "1,900 – 2,200 ATQ",
      "def": "750",
      "em": "0",
      "er": "135% ER",
      "crit": "70%+ CR / 180%+ CD"
    },
    "metaTeams": [
      {
        "name": "Snezhnaya Stellar Freeze",
        "comp": "Viajero • Odette • Vodyanitsa • Escoffier",
        "members": [
          "Viajero",
          "Odette",
          "Vodyanitsa",
          "Escoffier"
        ]
      },
      {
        "name": "Sandrone Stellar-Conduct",
        "comp": "Sandrone • Viajero • Alyosha • Zhongli",
        "members": [
          "Sandrone",
          "Viajero",
          "Alyosha",
          "Zhongli"
        ]
      }
    ],
    "statPriority": {
      "sands": "ATQ%",
      "goblet": "ATQ% o Bono Daño Cryo%",
      "circlet": "Daño Crítico o Prob. Crítica",
      "substats": "1. Daño Crítico / Prob. Crítica > 2. ATQ% > 3. Recarga de Energía% (130% – 150%)"
    },
    "recommendedPanel": {
      "hp": "16,500",
      "atk": "1,900 – 2,200 ATQ",
      "def": "750",
      "em": "0",
      "er": "135% ER",
      "crit": "70%+ CR / 180%+ CD"
    }
  },
  {
    "id": "traveler_pyro",
    "name": {
      "es": "Viajero (Pyro)",
      "en": "Traveler (Pyro)"
    },
    "element": "Pyro",
    "rarity": 5,
    "weaponType": "Sword",
    "icon": "https://gi.yatta.moe/assets/UI/UI_AvatarIcon_PlayerBoy.png",
    "tier": "T1 Natlan Pyro Sub-DPS",
    "role": "Sub-DPS Pyro Off-Field & Portador de Pergamino de Cinder City (Noctespíritu)",
    "roleCategory": "sub_dps",
    "scalingType": "ATK",
    "scalingLabel": "Escala con ATQ%, Bono Pyro y Bendición Noctespíritu",
    "bestWeapons": [
      {
        "name": "Reflejo de las Tinieblas (Mistsplitter Reforged)",
        "rarity": 5,
        "type": "BiS",
        "note": "Máximo daño personal Pyro y Daño Crítico."
      },
      {
        "name": "Espada de Favonius (Favonius Sword)",
        "rarity": 4,
        "type": "Mejor Soporte 4★",
        "note": "Asegura la Definitiva en cada rotación y genera partículas."
      },
      {
        "name": "Vado del Río Ceniciento (Fleuve Cendre Ferryman R5)",
        "rarity": 4,
        "type": "Mejor F2P Pesca",
        "note": "+45.9% ER y +16% Prob. Crítica en la Habilidad Elemental."
      }
    ],
    "bestArtifacts": [
      {
        "set": "Pergamino del Héroe de la Ciudad de las Cenizas (4 piezas)",
        "type": "BiS",
        "bonus": "+40% Bono de Daño Elemental para todo el equipo al activar reacciones en Noctespíritu."
      },
      {
        "set": "Códice de Obsidiana (4 piezas)",
        "type": "Opción DPS en Campo",
        "bonus": "+15% Daño y +40% Prob. Crítica en estado Noctespíritu."
      }
    ],
    "mainStats": {
      "sands": "ATQ% o Recarga de Energía",
      "goblet": "Bono Daño Pyro% o ATQ%",
      "circlet": "Prob. Crítica o Daño Crítico"
    },
    "substatsPriority": [
      "1. Recarga de Energía% (160%+ ER)",
      "2. Prob. Crítica / Daño Crítico",
      "3. ATQ%",
      "4. Maestría Elemental"
    ],
    "talentPriority": "Habilidad Elemental (E) > Definitiva (Q) >>> Ataques Normales",
    "benchmarks": {
      "hp": "16,500",
      "atk": "1,700 – 2,000 ATQ",
      "def": "750",
      "em": "100+ EM",
      "er": "160% – 180% ER",
      "crit": "65%+ CR / 140%+ CD"
    },
    "metaTeams": [
      {
        "name": "Kinich Burning / Burgeon",
        "comp": "Kinich • Viajero • Émilie • Bennett",
        "members": [
          "Kinich",
          "Viajero",
          "Émilie",
          "Bennett"
        ]
      },
      {
        "name": "Mualani Forward Vaporize",
        "comp": "Mualani • Viajero • Xilonen • Kazuha",
        "members": [
          "Mualani",
          "Viajero",
          "Xilonen",
          "Kazuha"
        ]
      }
    ],
    "statPriority": {
      "sands": "ATQ% o Recarga de Energía",
      "goblet": "Bono Daño Pyro% o ATQ%",
      "circlet": "Prob. Crítica o Daño Crítico",
      "substats": "1. Recarga de Energía% (160%+ ER) > 2. Prob. Crítica / Daño Crítico > 3. ATQ% > 4. Maestría Elemental"
    },
    "recommendedPanel": {
      "hp": "16,500",
      "atk": "1,700 – 2,000 ATQ",
      "def": "750",
      "em": "100+ EM",
      "er": "160% – 180% ER",
      "crit": "65%+ CR / 140%+ CD"
    }
  }
];

if (typeof window !== "undefined") { window.CHARACTER_BUILDS_DB = CHARACTER_BUILDS_DB; }
if (typeof module !== "undefined" && module.exports) { module.exports = { CHARACTER_BUILDS_DB }; }
