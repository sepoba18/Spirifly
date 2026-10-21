// =====================================================================
// MOTOR MAESTRO DE SINCRONIZACIÓN GOOGLE DRIVE Y GESTIÓN MULTI-CUENTA
// Basado en SETTINGS_AND_GDRIVE_SYNC_MASTER_BLUEPRINT.md
// Arquitectura Seelie.me - 100% Nativo en Vanilla JavaScript
// =====================================================================

(function (global) {
  "use strict";

  // Fallback seguro de almacenamiento para entornos Node o sin localStorage global
  const localStorage = (typeof globalThis !== "undefined" && typeof globalThis.localStorage !== "undefined")
    ? globalThis.localStorage
    : (typeof window !== "undefined" && window.localStorage)
      ? window.localStorage
      : {
          _d: {},
          getItem(k) { return this._d[k] !== undefined ? this._d[k] : null; },
          setItem(k, v) { this._d[k] = String(v); },
          removeItem(k) { delete this._d[k]; }
        };

  // --- 1. CONSTANTES Y CONFIGURACIONES HORARIAS ---
  const SERVER_OFFSETS = {
    america: -5,
    europe: 1,
    asia: 8,
    tw_hk_mo: 8
  };

  const DEFAULT_SETTINGS = {
    ar: 60,
    wl: 9,
    server: "america"
  };

  // Google Drive appDataFolder Constants
  const DRIVE_CONFIG = {
    fileName: "seelie_genshin_backup.json",
    appDataScope: "https://www.googleapis.com/auth/drive.appdata email",
    defaultClientId: localStorage.getItem("gdrive_client_id") || "862973166451-jemrhst4kj0fnr9ik1b4s51kvdjc8koi.apps.googleusercontent.com"
  };

  // --- 2. CÁLCULO DE RESET DIARIO DE SERVIDOR (04:00 AM) ---
  /**
   * Calcula el día de la semana (0=Domingo..6=Sábado) correspondiente
   * al servidor activo, respetando el reinicio diario a las 04:00 AM.
   */
  function getActiveServerDay(serverKey) {
    const srv = serverKey || getActiveAccountSettings().server || "america";
    const offset = SERVER_OFFSETS[srv] !== undefined ? SERVER_OFFSETS[srv] : -5;
    const nowUtc = new Date();
    const serverTime = new Date(nowUtc.getTime() + offset * 3600000);
    const hours = serverTime.getUTCHours();
    let dayOfWeek = serverTime.getUTCDay();

    // Si aún no son las 04:00 AM en el servidor, pertenece al día anterior
    if (hours < 4) {
      dayOfWeek = (dayOfWeek + 6) % 7;
    }
    return dayOfWeek;
  }

  /**
   * Obtiene la hora actual formateada en el servidor seleccionado
   */
  function getServerTimeString(serverKey) {
    const srv = serverKey || getActiveAccountSettings().server || "america";
    const offset = SERVER_OFFSETS[srv] !== undefined ? SERVER_OFFSETS[srv] : -5;
    const nowUtc = new Date();
    const serverTime = new Date(nowUtc.getTime() + offset * 3600000);
    return serverTime.toISOString().substring(11, 19) + ` (UTC${offset >= 0 ? "+" + offset : offset})`;
  }

  // --- 3. GESTOR MULTI-CUENTA (ACCOUNT MANAGER) ---
  class AccountManager {
    static getActiveAccountId() {
      return localStorage.getItem("account") || "main";
    }

    static getAccountsList() {
      try {
        const list = JSON.parse(localStorage.getItem("accounts"));
        if (Array.isArray(list) && list.length > 0) return list;
      } catch (e) {}
      return ["main"];
    }

    static getAccountNamesMap() {
      try {
        const names = JSON.parse(localStorage.getItem("accountNames"));
        if (names && typeof names === "object") return names;
      } catch (e) {}
      return { main: "Principal" };
    }

    static getAccountUidsMap() {
      try {
        const uids = JSON.parse(localStorage.getItem("accountUids"));
        if (uids && typeof uids === "object") return uids;
      } catch (e) {}
      return {};
    }

    static getAccountUid(accId) {
      if (!accId) return "";
      const uids = this.getAccountUidsMap();
      return (uids && uids[accId]) ? String(uids[accId]).trim() : "";
    }

    static setAccountUid(accId, uid) {
      if (!accId) return;
      const uids = this.getAccountUidsMap();
      const cleanUid = String(uid || "").trim();
      uids[accId] = cleanUid;
      localStorage.setItem("accountUids", JSON.stringify(uids));
      if (accId === this.getActiveAccountId()) {
        const effectiveUid = cleanUid || "default";
        localStorage.setItem("teyvat_active_wish_uid", effectiveUid);
        if (typeof state !== "undefined") state.activeWishUid = effectiveUid;
      }
    }

    /**
     * Inicializa y migra de forma segura los datos heredados a 'main'
     */
    static init() {
      let active = localStorage.getItem("account");
      if (!active) {
        active = "main";
        localStorage.setItem("account", "main");
      }

      let accounts = this.getAccountsList();
      if (!accounts.includes("main")) {
        accounts.unshift("main");
        localStorage.setItem("accounts", JSON.stringify(accounts));
      }

      let names = this.getAccountNamesMap();
      if (!names.main) {
        names.main = "Principal";
        localStorage.setItem("accountNames", JSON.stringify(names));
      }

      let uids = this.getAccountUidsMap();
      if (!uids.main) {
        const currentActiveUid = localStorage.getItem("teyvat_active_wish_uid");
        if (currentActiveUid && currentActiveUid !== "default") {
          uids.main = currentActiveUid;
          localStorage.setItem("accountUids", JSON.stringify(uids));
        }
      }

      // Migración no destructiva desde claves legacy a 'main-*'
      if (!localStorage.getItem("main-goals")) {
        const legacyPlans = localStorage.getItem("teyvat_active_plans_v4");
        if (legacyPlans) {
          localStorage.setItem("main-goals", legacyPlans);
        } else if (typeof REAL_DEFAULT_PLANS !== "undefined") {
          localStorage.setItem("main-goals", JSON.stringify(REAL_DEFAULT_PLANS));
        }
      }

      if (!localStorage.getItem("main-inventory")) {
        const legacyInv = localStorage.getItem("teyvat_real_owned_v1");
        if (legacyInv) {
          localStorage.setItem("main-inventory", legacyInv);
        } else if (typeof DEFAULT_SEELIE_OWNED !== "undefined") {
          localStorage.setItem("main-inventory", JSON.stringify(DEFAULT_SEELIE_OWNED));
        }
      }

      if (!localStorage.getItem("main-settings")) {
        localStorage.setItem("main-settings", JSON.stringify(DEFAULT_SETTINGS));
      }

      // Asegurar configuración de la cuenta activa
      if (!localStorage.getItem(`${active}-settings`)) {
        localStorage.setItem(`${active}-settings`, JSON.stringify(DEFAULT_SETTINGS));
      }
    }

    /**
     * Agrega una nueva cuenta con autoindexación (account-1, account-2...)
     */
    static addAccount(customName, customUid) {
      const accounts = this.getAccountsList();
      const names = this.getAccountNamesMap();
      const uids = this.getAccountUidsMap();

      let nextIndex = 1;
      const existingIndices = accounts
        .filter((id) => id.startsWith("account-"))
        .map((id) => parseInt(id.split("-")[1], 10))
        .filter((num) => !isNaN(num));

      while (existingIndices.includes(nextIndex)) {
        nextIndex++;
      }

      const newId = `account-${nextIndex}`;
      accounts.push(newId);
      const chosenName = (customName && customName.trim()) ? customName.trim() : `Cuenta ${nextIndex}`;
      names[newId] = chosenName;

      const cleanUid = String(customUid || "").trim();
      uids[newId] = cleanUid;

      if (cleanUid && typeof WishEngine !== "undefined") {
        WishEngine.saveProfile({
          uid: cleanUid,
          name: "UID: " + cleanUid,
          server: WishEngine.detectServerFromUid(cleanUid),
          createdAt: new Date().toISOString()
        });
      }

      localStorage.setItem("accounts", JSON.stringify(accounts));
      localStorage.setItem("accountNames", JSON.stringify(names));
      localStorage.setItem("accountUids", JSON.stringify(uids));

      // Inicializar datos predeterminados para la nueva cuenta
      localStorage.setItem(`${newId}-settings`, JSON.stringify(DEFAULT_SETTINGS));
      if (typeof DEFAULT_SEELIE_OWNED !== "undefined") {
        localStorage.setItem(`${newId}-inventory`, JSON.stringify(DEFAULT_SEELIE_OWNED));
      } else {
        localStorage.setItem(`${newId}-inventory`, "{}");
      }
      if (typeof REAL_DEFAULT_PLANS !== "undefined") {
        localStorage.setItem(`${newId}-goals`, JSON.stringify(REAL_DEFAULT_PLANS));
      } else {
        localStorage.setItem(`${newId}-goals`, "[]");
      }

      this.switchAccount(newId);
      if (typeof triggerDriveSyncStamp === 'function') triggerDriveSyncStamp();
      return newId;
    }

    /**
     * Cambia la cuenta activa y recarga reactivamente el estado de la aplicación
     */
    static switchAccount(targetId, skipPersist = false) {
      const accounts = this.getAccountsList();
      if (!accounts.includes(targetId)) return;

      const currentActive = this.getActiveAccountId();
      // Guardar el estado actual antes de cambiar SOLO si es entre cuentas distintas y no se omitió
      if (!skipPersist && currentActive !== targetId) {
        this.persistCurrentActiveData(currentActive);
      }

      // Cambiar clave global
      localStorage.setItem("account", targetId);

      // Obtener el UID asignado a esta cuenta específica
      const targetUid = this.getAccountUid(targetId);
      const effectiveUid = targetUid || "default";
      localStorage.setItem("teyvat_active_wish_uid", effectiveUid);

      // Sincronizar estado global de forma aislada e independiente
      if (typeof state !== "undefined") {
        state.account = targetId;
        state.activeWishUid = effectiveUid;
        state.rawWishes = []; // Limpieza de memoria inmediata

        // 1. Cargar objetivos / planes aislados de esta cuenta
        const rawGoals = localStorage.getItem(`${targetId}-goals`);
        try {
          const parsed = rawGoals ? JSON.parse(rawGoals) : (targetId === "main" ? JSON.parse(localStorage.getItem("teyvat_active_plans_v4") || "[]") : []);
          state.activePlans = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          state.activePlans = [];
        }
        if (targetId === "main") {
          localStorage.setItem("teyvat_active_plans_v4", JSON.stringify(state.activePlans));
        }

        // 2. Cargar inventario aislado de esta cuenta
        const rawInv = localStorage.getItem(`${targetId}-inventory`);
        try {
          const invData = rawInv ? JSON.parse(rawInv) : (targetId === "main" ? JSON.parse(localStorage.getItem("teyvat_real_owned_v1") || "{}") : {});
          state.realOwned = Object.assign({}, typeof DEFAULT_SEELIE_OWNED !== "undefined" ? DEFAULT_SEELIE_OWNED : {}, invData);
        } catch (e) {
          state.realOwned = Object.assign({}, typeof DEFAULT_SEELIE_OWNED !== "undefined" ? DEFAULT_SEELIE_OWNED : {});
        }
        if (targetId === "main") {
          localStorage.setItem("teyvat_real_owned_v1", JSON.stringify(state.realOwned));
        }

        // 3. Cargar ajustes (AR, WL, Servidor)
        state.accountSettings = getActiveAccountSettings();

        // 4. Cargar resina aislada de esta cuenta
        if (typeof loadActiveAccountResin === "function") {
          const rData = loadActiveAccountResin();
          state.currentResin = rData.val;
        }
      }

      // 5. Cargar deseos aislados de esta cuenta
      if (typeof WishEngine !== "undefined") {
        WishEngine.setActiveAccountUid(effectiveUid);
        const p = (effectiveUid && effectiveUid !== "default")
          ? WishEngine.loadWishesFromStorage(effectiveUid)
          : Promise.resolve([]);

        p.then((wishes) => {
          if (typeof state !== "undefined") state.rawWishes = wishes || [];
          if (typeof renderWishesDashboard === "function") {
            try { Promise.resolve(renderWishesDashboard()).catch(() => {}); } catch (e) {}
          }
          if (typeof renderProfileManager === "function") {
            try { renderProfileManager(); } catch (e) {}
          }
        }).catch(() => {
          if (typeof state !== "undefined") state.rawWishes = [];
        });
      } else if (typeof renderWishesDashboard === "function") {
        try { Promise.resolve(renderWishesDashboard()).catch(() => {}); } catch (e) {}
      }

      // Re-renderizar interfaces
      if (typeof renderCharacterWeaponPlanner === "function") renderCharacterWeaponPlanner();
      if (typeof renderVisualInventory === "function") renderVisualInventory();
      if (typeof renderFarming === "function") renderFarming();
      if (typeof updateResinWidgetUI === "function") updateResinWidgetUI();
      if (typeof renderTopCurrencySection === "function") renderTopCurrencySection();
      if (typeof renderProfileManager === "function") {
        try { renderProfileManager(); } catch (e) {}
      }
      if (typeof renderTheorycraft === "function") {
        try { renderTheorycraft(); } catch (e) {}
      }

      renderMultiAccountUI();
      if (typeof showSynthToast === "function") {
        const names = this.getAccountNamesMap();
        showSynthToast(`Cuenta activa: <strong>${escapeHtmlStr(names[targetId] || targetId)}</strong>`);
      }
    }

    /**
     * Rebautiza la cuenta seleccionada
     */
    static renameAccount(targetId, newName, newUid) {
      if (!newName || !newName.trim()) return;
      const names = this.getAccountNamesMap();
      const uids = this.getAccountUidsMap();

      names[targetId] = newName.trim();
      localStorage.setItem("accountNames", JSON.stringify(names));

      if (newUid !== undefined) {
        const cleanUid = String(newUid || "").trim();
        uids[targetId] = cleanUid;
        localStorage.setItem("accountUids", JSON.stringify(uids));

        if (cleanUid && typeof WishEngine !== "undefined") {
          WishEngine.saveProfile({
            uid: cleanUid,
            name: "UID: " + cleanUid,
            server: WishEngine.detectServerFromUid(cleanUid),
            createdAt: new Date().toISOString()
          });
        }

        if (targetId === this.getActiveAccountId()) {
          const effectiveUid = cleanUid || "default";
          localStorage.setItem("teyvat_active_wish_uid", effectiveUid);
          if (typeof state !== "undefined") state.activeWishUid = effectiveUid;
          if (typeof WishEngine !== "undefined") {
            WishEngine.setActiveAccountUid(effectiveUid);
            WishEngine.loadWishesFromStorage(effectiveUid).then((wishes) => {
              if (typeof state !== "undefined") state.rawWishes = wishes || [];
              if (typeof renderWishesDashboard === "function") {
                try { Promise.resolve(renderWishesDashboard()).catch(() => {}); } catch(e) {}
              }
              if (typeof renderProfileManager === "function") {
                try { renderProfileManager(); } catch(e) {}
              }
            }).catch(() => {});
          }
        }
      }

      renderMultiAccountUI();
      if (typeof triggerDriveSyncStamp === 'function') triggerDriveSyncStamp();
      if (typeof renderProfileManager === "function") {
        try { renderProfileManager(); } catch (e) {}
      }
    }

    /**
     * Elimina una cuenta en cascada, bloqueando estrictamente 'main'
     */
    static deleteAccount(targetId) {
      if (targetId === "main") {
        throw new Error("No se puede eliminar la cuenta principal (main).");
      }

      const domains = ["inventory", "goals", "settings", "resin", "custom_tasks"];
      domains.forEach((dom) => {
        localStorage.removeItem(`${targetId}-${dom}`);
      });

      let accounts = this.getAccountsList().filter((id) => id !== targetId);
      const names = this.getAccountNamesMap();
      delete names[targetId];

      localStorage.setItem("accounts", JSON.stringify(accounts));
      localStorage.setItem("accountNames", JSON.stringify(names));

      const uids = this.getAccountUidsMap();
      delete uids[targetId];
      localStorage.setItem('accountUids', JSON.stringify(uids));
      // Switch without persisting the account that was just deleted.
      this.switchAccount("main", true);
      if (typeof triggerDriveSyncStamp === 'function') triggerDriveSyncStamp();
    }

    /**
     * Exporta la cuenta activa a JSON compatible con SEELIE_ACCOUNT_BACKUP
     */
    static exportSingleAccount(accountId) {
      const accId = accountId || this.getActiveAccountId();
      const names = this.getAccountNamesMap();
      const accName = names[accId] || accId;

      this.persistCurrentActiveData(accId);

      const backup = {
        format: "SEELIE_ACCOUNT_BACKUP",
        version: 1,
        exportedAt: new Date().toISOString(),
        accountName: accName,
        settings: JSON.parse(localStorage.getItem(`${accId}-settings`) || "{}"),
        inventory: JSON.parse(localStorage.getItem(`${accId}-inventory`) || "{}"),
        goals: JSON.parse(localStorage.getItem(`${accId}-goals`) || "[]"),
        resin: JSON.parse(localStorage.getItem(`${accId}-resin`) || "{}")
      };

      const jsonStr = JSON.stringify(backup, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup_${accName.toLowerCase().replace(/[^a-z0-9_]/g, "_")}_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    /**
     * Importa un archivo JSON a la cuenta activa
     */
    static importSingleAccount(accountId, jsonString) {
      const accId = accountId || this.getActiveAccountId();
      let data;
      try {
        data = JSON.parse(jsonString);
      } catch (e) {
        throw new Error("El archivo no contiene un formato JSON válido.");
      }

      if (data.format !== "SEELIE_ACCOUNT_BACKUP" && !data.inventory && !data.goals) {
        throw new Error("Archivo de respaldo incompatible o corrupto.");
      }

      if (data.settings) localStorage.setItem(`${accId}-settings`, JSON.stringify(data.settings));
      if (data.inventory) localStorage.setItem(`${accId}-inventory`, JSON.stringify(data.inventory));
      if (data.goals) localStorage.setItem(`${accId}-goals`, JSON.stringify(data.goals));
      if (data.resin) localStorage.setItem(`${accId}-resin`, JSON.stringify(data.resin));

      // Recargar cuenta activa
      this.switchAccount(accId, true);
      if (typeof triggerDriveSyncStamp === 'function') triggerDriveSyncStamp();
    }

    /**
     * Guarda el estado en memoria de la cuenta activa al almacenamiento particionado
     */
    static persistCurrentActiveData(accId) {
      if (typeof state === "undefined") return;
      if (state.activePlans) {
        localStorage.setItem(`${accId}-goals`, JSON.stringify(state.activePlans));
        if (accId === "main") {
          localStorage.setItem("teyvat_active_plans_v4", JSON.stringify(state.activePlans));
        }
      }
      if (state.realOwned) {
        localStorage.setItem(`${accId}-inventory`, JSON.stringify(state.realOwned));
        if (accId === "main") {
          localStorage.setItem("teyvat_real_owned_v1", JSON.stringify(state.realOwned));
        }
      }
      // Resin is persisted when edited; taking a backup must not reset its timer.
    }
  }

  // --- 4. AJUSTES DE CUENTA (AR, MUNDO Y SERVIDOR) ---
  function getActiveAccountSettings() {
    const accId = AccountManager.getActiveAccountId();
    try {
      const raw = localStorage.getItem(`${accId}-settings`);
      if (raw) return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(raw));
    } catch (e) {}
    return Object.assign({}, DEFAULT_SETTINGS);
  }

  function saveActiveAccountSettings(newSettings) {
    const accId = AccountManager.getActiveAccountId();
    const current = getActiveAccountSettings();
    const merged = Object.assign({}, current, newSettings);
    localStorage.setItem(`${accId}-settings`, JSON.stringify(merged));
    if (typeof state !== "undefined") {
      state.accountSettings = merged;
    }
    if (typeof triggerDriveSyncStamp === 'function') triggerDriveSyncStamp();
    // Re-evaluar farming por posible cambio de servidor
    if (typeof renderFarming === "function") renderFarming();
  }

  // --- 5. DETECTOR Y EVALUADOR DE CONFLICTOS DE SINCRONIZACIÓN ---
  class ConflictDetector {
    /**
     * Evalúa local vs remoto para detectar conflicto y calcular advertencias de tamaño
     */
    static evaluate(localPayload, remotePayload) {
      const localTime = new Date(localPayload.lastUpdate || 0);
      const remoteTime = new Date(remotePayload.lastUpdate || 0);

      const localBytes = new TextEncoder().encode(JSON.stringify(localPayload)).length;
      const remoteBytes = new TextEncoder().encode(JSON.stringify(remotePayload)).length;

      const localSizeKb = Math.round((localBytes / 1024) * 100) / 100;
      const remoteSizeKb = Math.round((remoteBytes / 1024) * 100) / 100;

      const driveIsOlder = remoteTime.getTime() < localTime.getTime();

      // HEURÍSTICA DE SEGURIDAD (< 0.9):
      // Si un archivo es más de un 10% más pequeño que el otro, se activa una advertencia
      const smallerDriveWarning = localSizeKb > 0 && remoteSizeKb / localSizeKb < 0.9;
      const smallerBrowserWarning = remoteSizeKb > 0 && localSizeKb / remoteSizeKb < 0.9;

      return {
        remoteTime,
        remoteSizeKb,
        localTime,
        localSizeKb,
        driveIsOlder,
        smallerDriveWarning,
        smallerBrowserWarning
      };
    }
  }

  // --- 6. AUTENTICACIÓN GOOGLE IDENTITY SERVICES (GIS) & SINCRONIZACIÓN CON GOOGLE DRIVE ---
  let _gisTokenClient = null;

  function initGoogleTokenClient() {
    if (typeof google === "undefined" || !google.accounts || !google.accounts.oauth2) {
      return null;
    }
    if (!_gisTokenClient) {
      _gisTokenClient = google.accounts.oauth2.initTokenClient({
        client_id: DRIVE_CONFIG.defaultClientId,
        scope: DRIVE_CONFIG.appDataScope,
        error_callback: () => GoogleDriveSyncEngine.setStatus('auth', 'No se completó el acceso a Google. Pulsa Sincronizar ahora para reintentar.'),
        callback: async (tokenResponse) => {
          if (tokenResponse.error) {
            GoogleDriveSyncEngine.setStatus('auth');
            console.error("Error en autorización de Google:", tokenResponse.error);
            if (typeof showSynthToast === "function") {
              showSynthToast("⚠️ Error en autorización de Google: " + (tokenResponse.error_description || tokenResponse.error));
            }
            return;
          }
          if (tokenResponse && tokenResponse.access_token) {
            const token = tokenResponse.access_token;
            localStorage.setItem("gdrive_access_token", token);
            localStorage.setItem("gdrive_token_timestamp", String(Date.now()));
            localStorage.setItem("gdrive_token_expires_at", String(Date.now() + (Number(tokenResponse.expires_in) || 3600) * 1000 - 60000));
            localStorage.setItem("teyvat_drive_linked", "true");

            // Obtener email del usuario autenticado
            try {
              const infoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${token}` }
              });
              if (infoRes.ok) {
                const info = await infoRes.json();
                if (info.email) {
                  localStorage.setItem("teyvat_drive_email", info.email);
                }
              }
            } catch (err) {
              console.warn("No se pudo obtener información de perfil:", err);
            }

            if (typeof showSynthToast === "function") {
              showSynthToast("✅ ¡Conectado con éxito a Google Drive!");
            }
            renderMultiAccountUI();

            // Sincronización inmediata al conectar
            try { await GoogleDriveSyncEngine.syncWithDrive(); } catch (_) { /* Status displays the actionable error. */ }
          }
        }
      });
    }
    return _gisTokenClient;
  }

  /**
   * Sincronización automática de inicio o cambio de pestaña.
   * REGLA ESTRICTA (ESTÁNDAR SEELIE.ME): NUNCA abrir ventanas emergentes ni popups automáticamente.
   * Si el token está vigente (< 58 min), sincroniza en silencio.
   * Si el token caducó o no existe, mantiene el guardado local 100% activo sin interrumpir jamás al usuario.
   */
  function triggerAutomaticDriveStartup() {
    if (localStorage.getItem("teyvat_drive_linked") === "true") {
      const token = localStorage.getItem("gdrive_access_token");
      const tokenTime = parseInt(localStorage.getItem("gdrive_token_timestamp") || "0", 10);
      const isFresh = GoogleDriveSyncEngine.tokenIsFresh();

      if (isFresh) {
        GoogleDriveSyncEngine.syncWithDrive(false).catch((err) => {
          console.warn("[Google Drive] Sincronización automática en segundo plano omitida:", err);
        });
      } else {
        GoogleDriveSyncEngine.setStatus('auth');
      }
    }
  }

  // Sincronizacion automatica al volver a la pestana de Spirifly
  if (typeof window !== "undefined") {
    window.addEventListener('online', triggerAutomaticDriveStartup);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') triggerAutomaticDriveStartup(); });
    window.addEventListener("focus", () => {
      if (localStorage.getItem("teyvat_drive_linked") === "true") {
        const lastSync = parseInt(localStorage.getItem("gdrive_last_focus_sync") || "0", 10);
        if (Date.now() - lastSync > 60000) {
          localStorage.setItem("gdrive_last_focus_sync", String(Date.now()));
          triggerAutomaticDriveStartup();
        }
      }
    });
  }

  function connectGoogleDrive() {
    if (typeof google === "undefined" || !google.accounts || !google.accounts.oauth2) {
      if (typeof showSynthToast === "function") {
        showSynthToast("Cargando servicios de Google... Reintenta en unos segundos.");
      }
      return;
    }
    const client = initGoogleTokenClient();
    if (client) {
      const savedEmail = localStorage.getItem("teyvat_drive_email") || "";
      const requestOptions = {};
      if (savedEmail) {
        requestOptions.login_hint = savedEmail;
      }
      GoogleDriveSyncEngine.setStatus('auth', 'Completa el acceso en la ventana de Google.');
      client.requestAccessToken(requestOptions);
    }
  }

  function disconnectGoogleDrive() {
    clearTimeout(GoogleDriveSyncEngine._scheduled);
    const token = localStorage.getItem("gdrive_access_token");
    if (token && typeof google !== "undefined" && google.accounts && google.accounts.oauth2) {
      try {
        google.accounts.oauth2.revoke(token, () => {
          console.log("Token revocado en Google");
        });
      } catch (e) {}
    }
    localStorage.removeItem("gdrive_access_token");
    localStorage.removeItem("gdrive_token_timestamp");
    localStorage.removeItem("gdrive_token_expires_at");
    localStorage.removeItem("spirifly_sync_base_hash");
    localStorage.removeItem("spirifly_sync_local_hash");
    GoogleDriveSyncEngine.status = 'local';
    localStorage.setItem("teyvat_drive_linked", "false");
    localStorage.removeItem("teyvat_drive_email");
    localStorage.removeItem("teyvat_last_sync");
    if (typeof showSynthToast === "function") {
      showSynthToast("Cuenta de Google desconectada.");
    }
    renderMultiAccountUI();
  }

  class GoogleDriveSyncEngine {
    static getLocalPayload() {
      const activeId = AccountManager.getActiveAccountId();
      // A snapshot must not mutate storage or reset timers.

      const accounts = AccountManager.getAccountsList();
      const accountNames = AccountManager.getAccountNamesMap();
      const autoResolve = localStorage.getItem("gdrive_auto_resolve_conflict") !== "false";

      const dataObj = {};
      accounts.forEach((acc) => {
        try {
          const inv = JSON.parse(localStorage.getItem(`${acc}-inventory`) || "{}");
          dataObj[`${acc}-inventory`] = inv;
        } catch (e) {
          throw new Error(`No se pudo leer inventory de ${acc}. Se conservó la copia de Drive.`);
        }
        try {
          const goals = JSON.parse(localStorage.getItem(`${acc}-goals`) || "[]");
          dataObj[`${acc}-goals`] = goals;
        } catch (e) {
          throw new Error(`No se pudo leer goals de ${acc}. Se conservó la copia de Drive.`);
        }
        try {
          dataObj[`${acc}-settings`] = JSON.parse(localStorage.getItem(`${acc}-settings`) || "{}");
        } catch (e) {
          throw new Error(`No se pudo leer settings de ${acc}. Se conservó la copia de Drive.`);
        }
        try {
          dataObj[`${acc}-resin`] = JSON.parse(localStorage.getItem(`${acc}-resin`) || "{}");
        } catch (e) {
          throw new Error(`No se pudo leer resin de ${acc}. Se conservó la copia de Drive.`);
        }
      });

      // Reading a backup must not manufacture an edit timestamp.
      const savedEditTime = localStorage.getItem("teyvat_data_last_modified");
      const effectiveLastUpdate = savedEditTime || "1970-01-01T00:00:00.000Z";

      const payload = {
        version: 3,
        activeAccount: activeId,
        preferences: Object.fromEntries(["teyvat_starred", "teyvat_active_wish_banner", "teyvat_inv_only_needed", "teyvat_lang"].map(key => [key, localStorage.getItem(key)])),
        lastUpdate: effectiveLastUpdate,
        accounts,
        accountNames,
        accountUids: AccountManager.getAccountUidsMap(),
        data: dataObj,
        settings: {
          autoResolveConflict: autoResolve
        }
      };

      // Incluir también los deseos (wish tracker) y perfiles en el backup de Google Drive
      try {
        const wishAccounts = JSON.parse(localStorage.getItem("teyvat_wish_accounts_v1") || "[]");
        payload.wishAccounts = wishAccounts;
        payload.activeWishUid = localStorage.getItem("teyvat_active_wish_uid") || "default";
        payload.wishProfiles = JSON.parse(localStorage.getItem("teyvat_wish_profiles_v1") || "[]");
        payload.wishesData = {};

        wishAccounts.forEach((wUid) => {
          const rawWishes = localStorage.getItem("teyvat_wishes_" + wUid);
          if (!rawWishes) { payload.wishesData[wUid] = []; }
          if (rawWishes) {
            try {
              payload.wishesData[wUid] = JSON.parse(rawWishes);
            } catch (e) { throw new Error(`No se pudo leer el historial de deseos de ${wUid}.`); }
          }
        });
      } catch (e) {
        throw new Error('No se pudo preparar el historial de deseos. Se conservó la copia de Drive.');
      }

      return payload;
    }

    /**
     * Aplica el payload descargado desde Google Drive sobrescribiendo el almacenamiento local
     */
    static async applyRemotePayload(remotePayload) {
      this._validate(remotePayload);

      if (Array.isArray(remotePayload.accounts)) {
        localStorage.setItem("accounts", JSON.stringify(remotePayload.accounts));
      }
      if (remotePayload.accountNames) {
        localStorage.setItem("accountNames", JSON.stringify(remotePayload.accountNames));
      }
      if (remotePayload.accountUids) {
        localStorage.setItem("accountUids", JSON.stringify(remotePayload.accountUids));
      }

      Object.entries(remotePayload.data).forEach(([key, val]) => {
        localStorage.setItem(key, JSON.stringify(val));
      });

      if (remotePayload.settings && typeof remotePayload.settings.autoResolveConflict === "boolean") {
        localStorage.setItem("gdrive_auto_resolve_conflict", String(remotePayload.settings.autoResolveConflict));
      }

      // Complete both stores before changing the active account or confirming sync.
      const wishWrites = [];
      try {
        if (Array.isArray(remotePayload.wishAccounts)) {
          localStorage.setItem("teyvat_wish_accounts_v1", JSON.stringify(remotePayload.wishAccounts));
        }
        if (remotePayload.activeWishUid) {
          localStorage.setItem("teyvat_active_wish_uid", remotePayload.activeWishUid);
        }
        if (Array.isArray(remotePayload.wishProfiles)) {
          localStorage.setItem("teyvat_wish_profiles_v1", JSON.stringify(remotePayload.wishProfiles));
        }
        if (remotePayload.wishesData && typeof remotePayload.wishesData === "object") {
          Object.entries(remotePayload.wishesData).forEach(([wUid, wList]) => {
            if (Array.isArray(wList)) {
              localStorage.setItem("teyvat_wishes_" + wUid, JSON.stringify(wList));
              if (typeof WishEngine !== "undefined" && typeof WishEngine.saveWishesToStorage === "function") {
                wishWrites.push(WishEngine.saveWishesToStorage(wUid, wList));
              }
            }
          });
        }
      } catch (e) {
        console.warn("Fallo al restaurar deseos desde Google Drive:", e);
      }

      await Promise.all(wishWrites);
      const preferenceKeys = ["teyvat_starred", "teyvat_active_wish_banner", "teyvat_inv_only_needed", "teyvat_lang"];
      preferenceKeys.forEach(key => {
        const value = remotePayload.preferences && remotePayload.preferences[key];
        if (typeof value === "string") localStorage.setItem(key, value);
        else if (value === null) localStorage.removeItem(key);
      });
      if (remotePayload.lastUpdate) localStorage.setItem("teyvat_data_last_modified", remotePayload.lastUpdate);
      if (typeof state !== "undefined") {
        try { const stars = JSON.parse(localStorage.getItem("teyvat_starred") || "[]"); state.starredChars = Array.isArray(stars) ? stars : []; } catch (_) { state.starredChars = []; }
        state.activeWishBanner = localStorage.getItem("teyvat_active_wish_banner") || "character";
        state.invOnlyNeeded = localStorage.getItem("teyvat_inv_only_needed") === "true";
        state.lang = localStorage.getItem("teyvat_lang") || state.lang;
      }
      const accounts = AccountManager.getAccountsList();
      const current = AccountManager.getActiveAccountId();
      const uidMap = AccountManager.getAccountUidsMap();
      const uidAccount = accounts.find(id => uidMap[id] === remotePayload.activeWishUid);
      const active = accounts.includes(remotePayload.activeAccount) ? remotePayload.activeAccount : (uidAccount || (accounts.includes(current) ? current : accounts[0]));
      if (!uidMap[active] && remotePayload.activeWishUid && remotePayload.activeWishUid !== 'default') {
        uidMap[active] = remotePayload.activeWishUid;
        localStorage.setItem('accountUids', JSON.stringify(uidMap));
      }
      AccountManager.switchAccount(active, true);

      // Re-renderizar Deseos, Perfiles y Theorycraft si están activos o presentes
      if (typeof renderWishesDashboard === "function") {
        try { Promise.resolve(renderWishesDashboard()).catch(() => {}); } catch (e) {}
      }
      if (typeof renderProfileManager === "function") {
        try { renderProfileManager(); } catch (e) {}
      }
      if (typeof renderTheorycraft === "function") {
        try { renderTheorycraft(); } catch (e) {}
      }

      if (typeof applyStaticTranslations === "function" && typeof I18N !== "undefined") {
        applyStaticTranslations(I18N[state.lang] || I18N.es);
        document.documentElement.lang = state.lang;
        const select = document.getElementById('langSelect');
        if (select) select.value = state.lang;
      }
      const lastStamp = new Date().toISOString();
      localStorage.setItem("teyvat_last_sync", formatSyncDate(new Date(lastStamp)));
      renderMultiAccountUI();
      if (typeof showSynthToast === "function") {
        showSynthToast("✅ Datos sincronizados exitosamente desde Google Drive.");
      }
    }

    /**
     * Sube el payload local a Google Drive (sobrescribiendo la nube)
     */
    static _validate(payload) {
      if (!payload || typeof payload !== 'object' || Array.isArray(payload) ||
          !payload.data || typeof payload.data !== 'object' || Array.isArray(payload.data)) {
        throw new Error('La copia de Drive no tiene un formato válido. Se conservaron los datos.');
      }
      const accounts = Array.isArray(payload.accounts) ? payload.accounts : AccountManager.getAccountsList();
      if (!accounts.length || accounts.some(id => typeof id !== 'string' || !id)) throw new Error('La lista de cuentas del respaldo no es válida.');
      for (const [key, value] of Object.entries(payload.data)) {
        if (!accounts.some(id => ['inventory','goals','settings','resin','custom_tasks'].some(domain => key === `${id}-${domain}`))) throw new Error('El respaldo contiene una clave de datos desconocida.');
        if (!value || typeof value !== 'object' || (key.endsWith('-goals') ? !Array.isArray(value) : Array.isArray(value))) throw new Error('El respaldo contiene datos con formato incorrecto.');
      }
      if (payload.wishesData && Object.values(payload.wishesData).some(list => !Array.isArray(list))) throw new Error('El historial de deseos del respaldo no es válido.');
      return payload;
    }

    static async _legacyFingerprint(payload) {
      const clean = { ...payload };
      delete clean.lastUpdate;
      delete clean._sync;
      const sort = value => Array.isArray(value) ? value.map(sort) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(k => [k, sort(value[k])])) : value;
      const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(sort(clean))));
      return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
    }

    static async _fingerprint(payload) {
      if (!payload) return null;
      const clean = JSON.parse(JSON.stringify(payload));
      // Compare content across backup versions and hydrated default values.
      delete clean.version;
      clean.preferences = Object.assign({teyvat_starred: "[]", teyvat_active_wish_banner: "character", teyvat_inv_only_needed: "false", teyvat_lang: "es"}, clean.preferences || {});
      for (const [key, fallback] of Object.entries({teyvat_starred: "[]", teyvat_active_wish_banner: "character", teyvat_inv_only_needed: "false", teyvat_lang: "es"})) {
        if (clean.preferences[key] == null) clean.preferences[key] = fallback;
      }
      for (const acc of clean.accounts || []) {
        clean.data[`${acc}-inventory`] = Object.assign({}, typeof DEFAULT_SEELIE_OWNED !== "undefined" ? DEFAULT_SEELIE_OWNED : {}, clean.data[`${acc}-inventory`] || {});
        clean.data[`${acc}-settings`] = Object.assign({}, DEFAULT_SETTINGS, clean.data[`${acc}-settings`] || {});
        clean.data[`${acc}-goals`] = clean.data[`${acc}-goals`] || [];
        clean.data[`${acc}-resin`] = clean.data[`${acc}-resin`] || {};
      }
      for (const list of Object.values(clean.wishesData || {})) {
        if (Array.isArray(list)) list.forEach(wish => { delete wish.uid; });
      }
      delete clean.lastUpdate;
      delete clean._sync;
      const sort = value => Array.isArray(value) ? value.map(sort) :
        value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(k => [k, sort(value[k])])) : value;
      const bytes = new TextEncoder().encode(JSON.stringify(sort(clean)));
      const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
      return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
    }

    static async _request(url, token, options = {}) {
      const response = await fetch(url, {
        ...options,
        headers: { Authorization: `Bearer ${token}`, ...(options.headers || {}) },
        signal: AbortSignal.timeout(30000)
      });
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('gdrive_access_token');
          this.setStatus('auth');
          const error = new Error('La sesión de Google venció. Pulsa Sincronizar ahora para renovar el acceso.');
          error.status = 401;
          throw error;
        }
        throw new Error(`Drive respondió HTTP ${response.status}. No se reemplazó la copia remota.`);
      }
      return response;
    }

    static async _readRemote(token) {
      const query = encodeURIComponent(`name='${DRIVE_CONFIG.fileName}' and trashed=false`);
      const search = await this._request(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${query}&fields=nextPageToken,files(id,name,version)&pageSize=100`, token);
      const found = await search.json();
      if (!Array.isArray(found.files) || found.nextPageToken || found.files.length > 1) {
        throw new Error('Drive devolvió una lista ambigua o inválida. No se modificaron las copias.');
      }
      if (!found.files.length) return null;
      const id = found.files[0].id;
      const metadataResponse = await this._request(`https://www.googleapis.com/drive/v3/files/${id}?fields=id,version,modifiedTime`, token);
      const metadata = await metadataResponse.json();
      if (!metadata.id || !metadata.version) throw new Error('No se pudo comprobar la revisión de Drive.');
      const media = await this._request(`https://www.googleapis.com/drive/v3/files/${id}?alt=media`, token);
      const payload = this._validate(await media.json());
      return { id, version: metadata.version, etag: metadataResponse.headers.get('ETag'), payload, fingerprint: await this._fingerprint(payload) };
    }

    static async _localSnapshot(payload, label) {
      const key = `spirifly_recovery_${Date.now()}_${globalThis.crypto.randomUUID()}`;
      if (typeof indexedDB === 'undefined') {
        localStorage.setItem(key, JSON.stringify({ label, payload }));
        return;
      }
      await new Promise((resolve, reject) => {
        const open = indexedDB.open('spirifly_recovery_v1', 1);
        open.onupgradeneeded = () => open.result.createObjectStore('snapshots', { keyPath: 'id' });
        open.onerror = () => reject(new Error('No se pudo conservar la copia local de recuperación.'));
        open.onsuccess = () => {
          const db = open.result;
          const transaction = db.transaction('snapshots', 'readwrite');
          transaction.objectStore('snapshots').add({ id: key, label, payload, createdAt: new Date().toISOString() });
          transaction.oncomplete = () => { db.close(); resolve(); };
          transaction.onerror = () => { db.close(); reject(new Error('No se pudo guardar la versión anterior.')); };
          transaction.onabort = transaction.onerror;
        };
      });
    }

    static async _snapshot(token, payload, parentHash) {
      const fingerprint = await this._fingerprint(payload);
      const boundary = `spirifly_${globalThis.crypto.randomUUID()}`;
      const metadata = {
        name: `spirifly_revision_${Date.now()}_${globalThis.crypto.randomUUID()}.json`,
        parents: ['appDataFolder'],
        appProperties: { parentHash: parentHash || 'root', contentHash: fingerprint }
      };
      const body = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(payload)}\r\n--${boundary}--`;
      await this._request('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', token, {
        method: 'POST', headers: { 'Content-Type': `multipart/related; boundary=${boundary}` }, body
      });
    }

    static async uploadLocalPayloadToDrive(token, expectedFingerprint) {
      const accessToken = token || localStorage.getItem('gdrive_access_token');
      const payload = this._validate(this.getLocalPayload());
      if (!accessToken) {
        await this._localSnapshot(payload, 'Guardado local sin conexión');
        if (typeof showSynthToast === 'function') showSynthToast('Datos guardados localmente. Conecta Drive para subirlos.');
        return payload;
      }
      if (this._uploading) throw new Error('Ya hay una sincronización en curso.');
      this._uploading = true;
      try {
        const remote = await this._readRemote(accessToken);
        const base = expectedFingerprint === undefined ? localStorage.getItem('spirifly_sync_base_hash') : expectedFingerprint;
        const localHash = await this._fingerprint(payload);
        if (remote && remote.fingerprint === localHash) {
          await this.rememberBaseline(localHash, payload);
          return payload;
        }
        if (remote && remote.fingerprint !== base) {
          this.setStatus('conflict');
          openSyncConflictModal(payload, remote.payload, ConflictDetector.evaluate(payload, remote.payload));
          return { conflict: true };
        }
        // Ambas versiones sobreviven aunque otra pestaña escriba en paralelo.
        await this._localSnapshot(payload, 'Antes de subir');
        if (remote) await this._snapshot(accessToken, remote.payload, 'preserved');
        const parentHash = remote ? remote.fingerprint : null;
        const next = { ...payload, _sync: { revision: globalThis.crypto.randomUUID(), parentHash, writtenAt: new Date().toISOString() } };
        await this._snapshot(accessToken, next, parentHash);
        const fresh = await this._readRemote(accessToken);
        if ((fresh && fresh.fingerprint) !== (remote && remote.fingerprint) || (fresh && fresh.version) !== (remote && remote.version)) {
          throw new Error('Otro dispositivo cambió Drive durante la subida. Tus cambios quedaron preservados; vuelve a sincronizar para resolver el conflicto.');
        }
        const boundary = `spirifly_${globalThis.crypto.randomUUID()}`;
        const metadata = remote ? { name: DRIVE_CONFIG.fileName } : { name: DRIVE_CONFIG.fileName, parents: ['appDataFolder'] };
        const body = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(next)}\r\n--${boundary}--`;
        const headers = { 'Content-Type': `multipart/related; boundary=${boundary}` };
        if (remote && remote.etag) headers['If-Match'] = remote.etag;
        const endpoint = remote ? `https://www.googleapis.com/upload/drive/v3/files/${remote.id}?uploadType=multipart` : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
        await this._request(endpoint, accessToken, { method: remote ? 'PATCH' : 'POST', headers, body });
        const verified = await this._readRemote(accessToken);
        if (!verified || verified.fingerprint !== localHash) throw new Error('Drive cambió antes de confirmar. Las versiones se conservaron para recuperación.');
        await this.rememberBaseline(localHash, payload);
        if (localHash !== await this._fingerprint(this.getLocalPayload())) {
          this._syncAgain = true;
          localStorage.setItem('spirifly_sync_pending', 'true');
          this.setStatus('pending');
        }
        if (typeof showSynthToast === 'function') showSynthToast('Datos verificados en Google Drive; versiones anteriores conservadas.');
        return payload;
      } catch (error) {
        this.setStatus(error.status === 401 ? 'auth' : 'error', error.message);
        if (typeof showSynthToast === 'function') showSynthToast(`No se completó la sincronización: ${error.message}`);
        throw error;
      } finally {
        this._uploading = false;
      }
    }

    static hasMeaningfulLocalData(payload) {
      const defaults = typeof DEFAULT_SEELIE_OWNED !== "undefined" ? DEFAULT_SEELIE_OWNED : {};
      return (payload.accounts || []).length > 1 ||
        Object.values(payload.accountUids || {}).some(Boolean) ||
        Object.values(payload.wishesData || {}).some(list => Array.isArray(list) && list.length > 0) ||
        Object.entries(payload.data || {}).some(([key, value]) => {
          if (key.endsWith("-goals")) return Array.isArray(value) && value.length > 0;
          if (key.endsWith("-inventory")) return Object.entries(value || {}).some(([id, amount]) => Number(amount) !== Number(defaults[id] || 0));
          if (key.endsWith("-settings")) return Object.entries(value || {}).some(([name, setting]) => setting !== DEFAULT_SETTINGS[name]);
          if (key.endsWith("-resin")) return value && value.val !== undefined && Number(value.val) !== 200;
          return false;
        }) || localStorage.getItem('spirifly_sync_pending') === 'true';
    }

    static setStatus(status, message = '') {
      this.status = status;
      this.statusMessage = message;
      if (typeof document !== 'undefined') renderMultiAccountUI();
    }

    static tokenIsFresh() {
      const expires = Number(localStorage.getItem('gdrive_token_expires_at')) || (Number(localStorage.getItem('gdrive_token_timestamp')) + 58 * 60 * 1000);
      return !!localStorage.getItem('gdrive_access_token') && Date.now() < expires;
    }

    static async rememberBaseline(remoteHash, localPayload) {
      const localHash = await this._fingerprint(localPayload || this.getLocalPayload());
      localStorage.setItem('spirifly_sync_base_hash', remoteHash);
      localStorage.setItem('spirifly_sync_local_hash', localHash);
      if (localHash === await this._fingerprint(this.getLocalPayload())) localStorage.removeItem('spirifly_sync_pending');
      localStorage.setItem('teyvat_last_sync', formatSyncDate(new Date()));
      this.setStatus('synced');
    }

    static scheduleSync() {
      localStorage.setItem('spirifly_sync_pending', 'true');
      this.setStatus(this.tokenIsFresh() ? 'pending' : (localStorage.getItem('teyvat_drive_linked') === 'true' ? 'auth' : 'local'));
      clearTimeout(this._scheduled);
      if (this.tokenIsFresh()) this._scheduled = setTimeout(() => this.syncWithDrive().catch(() => {}), 1500);
    }

    static syncWithDrive(isUserTriggered = false) {
      if (this.status === 'conflict' && !isUserTriggered) return Promise.resolve();
      if (!this.tokenIsFresh()) {
        this.setStatus(localStorage.getItem('teyvat_drive_linked') === 'true' ? 'auth' : 'local');
        if (isUserTriggered) connectGoogleDrive();
        return Promise.resolve();
      }
      if (this._syncTask) { this._syncAgain = true; return this._syncTask; }
      const run = async () => {
        do {
          this._syncAgain = false;
          await this._syncOnce(isUserTriggered);
        } while (this._syncAgain && this.status !== 'conflict');
      };
      this._syncTask = run().finally(() => { this._syncTask = null; });
      return this._syncTask;
    }

    static async _syncOnce(isUserTriggered = false) {
      this.setStatus('syncing');
      const token = localStorage.getItem('gdrive_access_token');
      if (!token) {
        if (isUserTriggered) connectGoogleDrive();
        return;
      }
      try {
        const local = this._validate(this.getLocalPayload());
        const initialHash = await this._fingerprint(local);
        const remote = await this._readRemote(token);
        if (initialHash !== await this._fingerprint(this.getLocalPayload())) { this._syncAgain = true; return; }
        const localHash = await this._fingerprint(local);
        const base = localStorage.getItem('spirifly_sync_base_hash');
        const localBase = localStorage.getItem('spirifly_sync_local_hash') || base;
        if (!remote) return this.uploadLocalPayloadToDrive(token, null);
        if (remote.fingerprint === localHash) {
          await this.rememberBaseline(remote.fingerprint, local);
          return;
        }
        // Default settings, empty inventories and the placeholder UID are not user edits.
        const hasLocal = this.hasMeaningfulLocalData(local);
        const localUnchanged = localHash === localBase || (localBase && await this._legacyFingerprint(local) === localBase);
        const remoteUnchanged = remote.fingerprint === base || (base && await this._legacyFingerprint(remote.payload) === base);
        const autoResolve = localStorage.getItem('gdrive_auto_resolve_conflict') !== 'false';
        // Seelie downloads automatically only when Drive is newer and no local
        // edits are waiting. Equal or older dates never select Drive by default.
        const localPending = localStorage.getItem('spirifly_sync_pending') === 'true' || (!!localBase && !localUnchanged);
        const remoteIsNewer = Date.parse(remote.payload.lastUpdate) > Date.parse(local.lastUpdate);
        if ((!hasLocal && !localPending) || (autoResolve && !localPending && remoteIsNewer)) {
          await this._localSnapshot(local, 'Antes de descargar');
          if (initialHash !== await this._fingerprint(this.getLocalPayload())) { this._syncAgain = true; return; }
          await this.applyRemotePayload(remote.payload);
          await this.rememberBaseline(remote.fingerprint);
          return;
        }
        if (remoteUnchanged && !localUnchanged) return this.uploadLocalPayloadToDrive(token, remote.fingerprint);
        this.setStatus('conflict');
        openSyncConflictModal(local, remote.payload, ConflictDetector.evaluate(local, remote.payload));
      } catch (error) {
        this.setStatus(error.status === 401 ? 'auth' : 'error', error.message);
        if (error.status === 401 && isUserTriggered) connectGoogleDrive();
        if (typeof showSynthToast === 'function') showSynthToast(error.message);
        throw error;
      }
    }

  }

  // --- 7. MODAL DE RESOLUCIÓN DE CONFLICTOS (PIXEL-PERFECT SEELIE) ---
  let _currentConflictState = null;

  function openSyncConflictModal(localPayload, remotePayload, conflictInfo) {
    _currentConflictState = { localPayload, remotePayload, conflictInfo };

    const modal = document.getElementById("modalSyncConflict");
    if (!modal) return;

    // 1. Tarjeta Google Drive
    const badgeDriveAge = document.getElementById("badgeDriveAge");
    const badgeDriveSize = document.getElementById("badgeDriveSize");
    const valDriveDate = document.getElementById("valDriveDate");
    const warnDriveSmaller = document.getElementById("warnDriveSmaller");

    if (badgeDriveAge) {
      badgeDriveAge.textContent = conflictInfo.driveIsOlder ? "MÁS VIEJO" : "MÁS NUEVO";
      badgeDriveAge.className = `seelie-age-badge ${conflictInfo.driveIsOlder ? "older" : "newer"}`;
    }
    if (badgeDriveSize) {
      badgeDriveSize.textContent = `${conflictInfo.remoteSizeKb} KB`;
    }
    if (valDriveDate) {
      valDriveDate.textContent = formatSyncDate(conflictInfo.remoteTime);
    }
    if (warnDriveSmaller) {
      warnDriveSmaller.style.display = conflictInfo.smallerDriveWarning ? "block" : "none";
    }

    // 2. Tarjeta Navegador Local
    const badgeLocalAge = document.getElementById("badgeLocalAge");
    const badgeLocalSize = document.getElementById("badgeLocalSize");
    const valLocalDate = document.getElementById("valLocalDate");
    const warnLocalSmaller = document.getElementById("warnLocalSmaller");

    if (badgeLocalAge) {
      badgeLocalAge.textContent = conflictInfo.driveIsOlder ? "MÁS NUEVO" : "MÁS VIEJO";
      badgeLocalAge.className = `seelie-age-badge ${conflictInfo.driveIsOlder ? "newer" : "older"}`;
    }
    if (badgeLocalSize) {
      badgeLocalSize.textContent = `${conflictInfo.localSizeKb} KB`;
    }
    if (valLocalDate) {
      valLocalDate.textContent = formatSyncDate(conflictInfo.localTime);
    }
    if (warnLocalSmaller) {
      warnLocalSmaller.style.display = conflictInfo.smallerBrowserWarning ? "block" : "none";
    }

    modal.classList.add("open");
  }

  function closeSyncConflictModal() {
    const modal = document.getElementById("modalSyncConflict");
    if (modal) modal.classList.remove("open");
    _currentConflictState = null;
  }

  async function handleChooseDriveConflict() {
    if (!_currentConflictState) return;
    const remote = _currentConflictState.remotePayload;
    await GoogleDriveSyncEngine._localSnapshot(GoogleDriveSyncEngine.getLocalPayload(), "Selección de Drive en conflicto");
    closeSyncConflictModal();
    await GoogleDriveSyncEngine.applyRemotePayload(remote);
    await GoogleDriveSyncEngine.rememberBaseline(await GoogleDriveSyncEngine._fingerprint(remote));
  }

  async function handleChooseLocalConflict() {
    if (!_currentConflictState) return;
    const remoteHash = await GoogleDriveSyncEngine._fingerprint(_currentConflictState.remotePayload);
    closeSyncConflictModal();
    try { await GoogleDriveSyncEngine.uploadLocalPayloadToDrive(undefined, remoteHash); } catch (error) { console.warn("Sincronización no completada"); }
  }

  /**
   * Helper para disparar prueba del modal de conflicto desde la UI
   */
  function triggerMockConflictTest(olderDrive) {
    const local = GoogleDriveSyncEngine.getLocalPayload();
    const remote = JSON.parse(JSON.stringify(local));

    if (olderDrive) {
      // Simular que Drive es 1 día más viejo y 20% más chico
      const d = new Date(Date.now() - 86400000);
      remote.lastUpdate = d.toISOString();
      // Eliminar algunos datos para simular tamaño menor
      remote.data = {};
    } else {
      // Simular que Drive es más nuevo
      const d = new Date(Date.now() + 3600000);
      remote.lastUpdate = d.toISOString();
    }

    const info = ConflictDetector.evaluate(local, remote);
    openSyncConflictModal(local, remote, info);
  }

  // --- 8. HELPERS DE RENDERIZADO DE LA INTERFAZ ---
  function formatSyncDate(dateObj) {
    if (!dateObj || isNaN(dateObj.getTime())) return "--";
    return dateObj.toLocaleString("es-CL", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  function escapeHtmlStr(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderMultiAccountUI() {
    // 1. Píldoras y Selector de Cuentas
    const pillsContainer = document.getElementById("accountPillsContainer");
    const selAccount = document.getElementById("selActiveAccount");
    const accounts = AccountManager.getAccountsList();
    const names = AccountManager.getAccountNamesMap();
    const active = AccountManager.getActiveAccountId();

    // Renderizar Píldoras Directas (1 clic para cambiar de cuenta)
    if (pillsContainer) {
      pillsContainer.innerHTML = accounts
        .map((accId) => {
          const isAct = accId === active ? "active" : "";
          const label = names[accId] || (accId === "main" ? "Principal" : accId);
          const star = accId === "main" ? '<span class="star-icon">★</span> ' : '';
          return `<button type="button" class="seelie-acc-pill ${isAct}" data-acc-id="${escapeHtmlStr(accId)}" title="Cambiar a cuenta ${escapeHtmlStr(label)}">${star}${escapeHtmlStr(label)}</button>`;
        })
        .join("");

      pillsContainer.querySelectorAll(".seelie-acc-pill").forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = btn.getAttribute("data-acc-id");
          if (target && target !== AccountManager.getActiveAccountId()) {
            AccountManager.switchAccount(target);
          }
        });
      });
    }

    if (selAccount) {
      selAccount.innerHTML = accounts
        .map((accId) => {
          const isSel = accId === active ? "selected" : "";
          const label = names[accId] || (accId === "main" ? "Principal" : accId);
          const isMainBadge = (accId === "main" && label.toLowerCase() !== "principal") ? " (Principal)" : "";
          return `<option value="${escapeHtmlStr(accId)}" ${isSel}>${escapeHtmlStr(label)}${isMainBadge}</option>`;
        })
        .join("");
    }

    // Botón borrar bloqueado en main
    const btnDelete = document.getElementById("btnDeleteAccount");
    if (btnDelete) {
      if (active === "main") {
        btnDelete.disabled = true;
        btnDelete.style.opacity = "0.45";
        btnDelete.style.cursor = "not-allowed";
        btnDelete.title = "No se puede eliminar la cuenta principal (main).";
      } else {
        btnDelete.disabled = false;
        btnDelete.style.opacity = "1";
        btnDelete.style.cursor = "pointer";
        btnDelete.title = "Eliminar cuenta seleccionada";
      }
    }

    // 2. Inputs de Ajustes de Cuenta
    const settings = getActiveAccountSettings();
    const inputAr = document.getElementById("inputAccountAR");
    const selWl = document.getElementById("selAccountWL");
    const selServer = document.getElementById("selAccountServer");
    const serverTimeEl = document.getElementById("serverClockDisplay");

    if (inputAr) inputAr.value = settings.ar || 60;
    if (selWl) selWl.value = settings.wl !== undefined ? settings.wl : 9;
    if (selServer) selServer.value = settings.server || "america";
    if (serverTimeEl) {
      serverTimeEl.textContent = getServerTimeString(settings.server);
    }

    // 3. Tarjeta de Google Drive
    const emailEl = document.getElementById("lblCurrentDriveEmail");
    const stateEl = document.getElementById("lblDriveSyncStateText");
    const syncTimeEl = document.getElementById("seelieSyncTimestamp");
    const conflictSwitchPill = document.getElementById("conflictSwitchPill");
    const statusBadge = document.getElementById("lblDriveStatusBadge");
    const btnConnect = document.getElementById("btnConnectGoogleDrive");
    const btnDisconnect = document.getElementById("btnDisconnectGoogleDrive");
    const btnSyncNow = document.getElementById("btnSyncDriveNow");

    const savedEmail = localStorage.getItem("teyvat_drive_email") || "";
    const isLinked = localStorage.getItem("teyvat_drive_linked") === "true";
    const lastSync = localStorage.getItem("teyvat_last_sync") || "--";
    const syncStatus = !isLinked ? 'local' : (!GoogleDriveSyncEngine.tokenIsFresh() ? 'auth' : GoogleDriveSyncEngine.status || (localStorage.getItem('spirifly_sync_pending') ? 'pending' : 'ready'));
    const statusLabels = {local:'Guardado local', auth:'Renovar acceso a Google', ready:'Google Drive conectado', syncing:'Sincronizando…', pending:'Cambios pendientes de sincronizar', synced:'Sincronizado con Google Drive', conflict:'Revisa las dos versiones para continuar', error:'No se pudo sincronizar. Reintenta'};
    if (typeof state !== 'undefined') {
      state.driveLinked = isLinked;
      state.userEmail = savedEmail;
      state.lastSyncTime = lastSync;
    }
    const autoResolve = localStorage.getItem("gdrive_auto_resolve_conflict") !== "false";

    if (emailEl) {
      emailEl.textContent = isLinked ? (savedEmail || "Cuenta de Google Conectada") : "Sin cuenta vinculada (Solo guardado local)";
    }
    if (stateEl) {
      stateEl.style.color = syncStatus === 'synced' ? '#4ade80' : '#fbbf24';
      stateEl.textContent = statusLabels[syncStatus] || statusLabels.ready;
      stateEl.title = GoogleDriveSyncEngine.statusMessage || '';
    }
    if (statusBadge) statusBadge.textContent = statusLabels[syncStatus] || statusLabels.ready;
    document.querySelectorAll('.section-drive-status').forEach(label => {
      label.textContent = statusLabels[syncStatus] || statusLabels.ready;
      label.title = GoogleDriveSyncEngine.statusMessage || `Última sincronización: ${lastSync}`;
    });
    document.querySelectorAll('.section-drive-sync').forEach(button => {
      button.disabled = syncStatus === 'syncing';
      button.dataset.status = syncStatus;
      const textEl = button.querySelector('.section-drive-text');
      if (textEl) {
        if (syncStatus === 'syncing') {
          textEl.textContent = 'Sincronizando...';
        } else if (syncStatus === 'synced') {
          textEl.textContent = 'Sincronizado';
        } else if (syncStatus === 'pending') {
          textEl.textContent = 'Sincronizar';
        } else if (syncStatus === 'conflict') {
          textEl.textContent = 'Resolver conflicto';
        } else if (syncStatus === 'error') {
          textEl.textContent = 'Reintentar sync';
        } else {
          textEl.textContent = 'Sincronizar';
        }
      }
      button.title = `${statusLabels[syncStatus] || statusLabels.ready}. Sincronizar todos tus datos con Google Drive`;
    });
    if (btnConnect) btnConnect.style.display = !isLinked || syncStatus === 'auth' ? 'inline-flex' : 'none';
    if (btnDisconnect) {
      btnDisconnect.style.display = isLinked ? "inline-flex" : "none";
    }
    if (btnSyncNow) {
      btnSyncNow.style.display = isLinked ? "inline-flex" : "none";
    }
    if (syncTimeEl) {
      syncTimeEl.textContent = `Última sincronización: ${lastSync}`;
    }
    if (conflictSwitchPill) {
      conflictSwitchPill.style.background = autoResolve ? "#8b5cf6" : "#475569";
    }
  }

  // --- 9. EVENT LISTENERS Y VINCULACIÓN CON EL DOM ---
  function bindUIEvents() {
    document.querySelectorAll('.section-drive-sync').forEach(button => {
      button.addEventListener('click', () => {
        GoogleDriveSyncEngine.syncWithDrive(true).catch(() => {});
      });
    });
    // Selector de cuenta activa
    const selAccount = document.getElementById("selActiveAccount");
    if (selAccount) {
      selAccount.addEventListener("change", (e) => {
        AccountManager.switchAccount(e.target.value);
      });
    }

    // Modal Rápido de Agregar Cuenta
    const btnOpenAdd = document.getElementById("btnOpenAddAccountModal") || document.getElementById("btnAddAccount");
    const modalAdd = document.getElementById("modalAddAccount");
    const inputNewAcc = document.getElementById("inputNewAccountName");
    const btnConfirmAdd = document.getElementById("btnConfirmAddAccount");
    const btnCancelAdd = document.getElementById("btnCancelAddAccount");

    if (btnOpenAdd && modalAdd) {
      btnOpenAdd.addEventListener("click", () => {
        const accounts = AccountManager.getAccountsList();
        let nextIndex = 1;
        const existingIndices = accounts
          .filter((id) => id.startsWith("account-"))
          .map((id) => parseInt(id.split("-")[1], 10))
          .filter((num) => !isNaN(num));
        while (existingIndices.includes(nextIndex)) nextIndex++;

        if (inputNewAcc) {
          inputNewAcc.value = `Cuenta ${nextIndex}`;
          modalAdd.classList.add("open");
          setTimeout(() => {
            inputNewAcc.focus();
            inputNewAcc.select();
          }, 60);
        }
      });
    }

    const inputNewAccUid = document.getElementById("inputNewAccountUid");
    if (btnConfirmAdd && modalAdd) {
      btnConfirmAdd.addEventListener("click", () => {
        const val = inputNewAcc ? inputNewAcc.value.trim() : "";
        const uidVal = inputNewAccUid ? inputNewAccUid.value.trim() : "";
        modalAdd.classList.remove("open");
        AccountManager.addAccount(val, uidVal);
      });
    }

    if (inputNewAcc) {
      inputNewAcc.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (btnConfirmAdd) btnConfirmAdd.click();
        } else if (e.key === "Escape") {
          if (modalAdd) modalAdd.classList.remove("open");
        }
      });
    }

    if (btnCancelAdd && modalAdd) {
      btnCancelAdd.addEventListener("click", () => {
        modalAdd.classList.remove("open");
      });
    }

    // Botón Rebautizar Cuenta
    const btnRename = document.getElementById("btnRenameAccount");
    const modalRename = document.getElementById("modalRenameAccount");
    const inputRename = document.getElementById("inputRenameAccountName");

    const inputRenameUid = document.getElementById("inputRenameAccountUid");
    if (btnRename && modalRename) {
      btnRename.addEventListener("click", () => {
        const active = AccountManager.getActiveAccountId();
        const names = AccountManager.getAccountNamesMap();
        const uids = AccountManager.getAccountUidsMap();
        if (inputRename) {
          inputRename.value = names[active] || (active === "main" ? "Principal" : active);
        }
        if (inputRenameUid) {
          inputRenameUid.value = uids[active] || "";
        }
        modalRename.classList.add("open");
        setTimeout(() => {
          if (inputRename) {
            inputRename.focus();
            inputRename.select();
          }
        }, 60);
      });
    }

    // Modal Rebautizar Confirmar/Cancelar
    const btnConfirmRename = document.getElementById("btnConfirmRenameAccount");
    const btnCancelRename = document.getElementById("btnCancelRenameAccount");
    if (btnConfirmRename && modalRename) {
      btnConfirmRename.addEventListener("click", () => {
        const active = AccountManager.getActiveAccountId();
        const newName = inputRename ? inputRename.value.trim() : "";
        const newUid = inputRenameUid ? inputRenameUid.value.trim() : "";
        if (newName) {
          AccountManager.renameAccount(active, newName, newUid);
        }
        modalRename.classList.remove("open");
      });
    }

    if (inputRename) {
      inputRename.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (btnConfirmRename) btnConfirmRename.click();
        } else if (e.key === "Escape") {
          if (modalRename) modalRename.classList.remove("open");
        }
      });
    }

    if (btnCancelRename && modalRename) {
      btnCancelRename.addEventListener("click", () => {
        modalRename.classList.remove("open");
      });
    }

    // Botón Borrar Cuenta
    const btnDelete = document.getElementById("btnDeleteAccount");
    if (btnDelete) {
      btnDelete.addEventListener("click", () => {
        const active = AccountManager.getActiveAccountId();
        if (active === "main") {
          alert("No se puede eliminar la cuenta principal (main).");
          return;
        }
        const names = AccountManager.getAccountNamesMap();
        const modal = document.getElementById("modalDeleteAccount");
        const msgEl = document.getElementById("lblDeleteAccountPrompt");
        if (modal) {
          if (msgEl) {
            msgEl.textContent = `¿Estás seguro de que deseas eliminar permanentemente la "${names[active] || active}"? Todos sus objetivos, inventario y configuraciones se borrarán.`;
          }
          modal.classList.add("open");
        }
      });
    }

    // Modal Borrar Confirmar/Cancelar
    const btnConfirmDelete = document.getElementById("btnConfirmDeleteAccount");
    const btnCancelDelete = document.getElementById("btnCancelDeleteAccount");
    const modalDelete = document.getElementById("modalDeleteAccount");
    if (btnConfirmDelete && modalDelete) {
      btnConfirmDelete.addEventListener("click", () => {
        const active = AccountManager.getActiveAccountId();
        modalDelete.classList.remove("open");
        try {
          AccountManager.deleteAccount(active);
        } catch (e) {
          alert(e.message);
        }
      });
    }
    if (btnCancelDelete && modalDelete) {
      btnCancelDelete.addEventListener("click", () => {
        modalDelete.classList.remove("open");
      });
    }

    // Exportar e Importar Cuenta
    const btnExport = document.getElementById("btnExportAccountJson");
    if (btnExport) {
      btnExport.addEventListener("click", () => {
        AccountManager.exportSingleAccount();
      });
    }

    const btnImport = document.getElementById("btnImportAccountJson");
    const inputImportFile = document.getElementById("fileImportAccountJson");
    if (btnImport && inputImportFile) {
      btnImport.addEventListener("click", () => {
        inputImportFile.value = "";
        inputImportFile.click();
      });
      inputImportFile.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            AccountManager.importSingleAccount(null, evt.target.result);
            if (typeof showSynthToast === "function") {
              showSynthToast("✅ Cuenta importada con éxito.");
            }
          } catch (err) {
            alert("Error al importar cuenta: " + err.message);
          }
        };
        reader.readAsText(file);
      });
    }

    // Configuraciones de Cuenta (AR, WL, Servidor)
    const inputAr = document.getElementById("inputAccountAR");
    if (inputAr) {
      inputAr.addEventListener("change", (e) => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        if (val > 60) val = 60;
        e.target.value = val;

        // Auto-sugerir el Nivel de Mundo oficial correspondiente al AR
        let autoWl = 9;
        if (val < 20) autoWl = 0;
        else if (val < 25) autoWl = 1;
        else if (val < 30) autoWl = 2;
        else if (val < 35) autoWl = 3;
        else if (val < 40) autoWl = 4;
        else if (val < 45) autoWl = 5;
        else if (val < 50) autoWl = 6;
        else if (val < 55) autoWl = 7;
        else if (val < 58) autoWl = 8;
        else autoWl = 9;

        const selWlEl = document.getElementById("selAccountWL");
        if (selWlEl) {
          selWlEl.value = autoWl;
        }

        saveActiveAccountSettings({ ar: val, wl: autoWl });
        if (window.renderFarming) window.renderFarming();
      });
    }

    const selWl = document.getElementById("selAccountWL");
    if (selWl) {
      selWl.addEventListener("change", (e) => {
        const val = parseInt(e.target.value, 10);
        saveActiveAccountSettings({ wl: isNaN(val) ? 9 : val });
        if (window.renderFarming) window.renderFarming();
      });
    }

    const selServer = document.getElementById("selAccountServer");
    if (selServer) {
      selServer.addEventListener("change", (e) => {
        const srv = e.target.value;
        saveActiveAccountSettings({ server: srv });
        const serverTimeEl = document.getElementById("serverClockDisplay");
        if (serverTimeEl) serverTimeEl.textContent = getServerTimeString(srv);
      });
    }

    // Toggle Auto Resolve Conflict
    const toggleSwitch = document.getElementById("toggleConflictSwitch");
    if (toggleSwitch) {
      toggleSwitch.addEventListener("click", () => {
        const current = localStorage.getItem("gdrive_auto_resolve_conflict") !== "false";
        const next = !current;
        localStorage.setItem("gdrive_auto_resolve_conflict", String(next));
        if (typeof triggerDriveSyncStamp === 'function') triggerDriveSyncStamp();
        const pill = document.getElementById("conflictSwitchPill");
        if (pill) pill.style.background = next ? "#8b5cf6" : "#475569";
        if (typeof showSynthToast === "function") {
          showSynthToast(next ? "Auto-resolver conflictos activado." : "Resolución manual de conflictos activada.");
        }
      });
    }

    // Botones de Modal de Conflicto
    const btnDriveChoice = document.getElementById("btnChooseDriveData");
    if (btnDriveChoice) {
      btnDriveChoice.addEventListener("click", handleChooseDriveConflict);
    }

    const btnLocalChoice = document.getElementById("btnChooseLocalData");
    if (btnLocalChoice) {
      btnLocalChoice.addEventListener("click", handleChooseLocalConflict);
    }

    // Botón Conectar Google Drive
    const btnConnect = document.getElementById("btnConnectGoogleDrive");
    if (btnConnect) {
      btnConnect.addEventListener("click", () => {
        connectGoogleDrive();
      });
    }

    // Botón Desconectar Google Drive
    const btnDisconnect = document.getElementById("btnDisconnectGoogleDrive");
    if (btnDisconnect) {
      btnDisconnect.addEventListener("click", () => {
        disconnectGoogleDrive();
      });
    }

    // Sincronizar Ahora y Probar Conflicto
    const btnSyncNow = document.getElementById("btnSyncDriveNow");
    if (btnSyncNow) {
      btnSyncNow.addEventListener("click", () => {
        GoogleDriveSyncEngine.syncWithDrive(true).catch(() => {});
      });
    }

    const btnTestConflict = document.getElementById("btnTestConflictModal");
    if (btnTestConflict) {
      btnTestConflict.addEventListener("click", () => {
        triggerMockConflictTest(true);
      });
    }

    setInterval(() => {
      if (document.visibilityState === 'visible') triggerAutomaticDriveStartup();
    }, 60000);

    // Inicializar reloj del servidor cada 5 segundos
    setInterval(() => {
      const serverTimeEl = document.getElementById("serverClockDisplay");
      if (serverTimeEl) {
        const srv = getActiveAccountSettings().server;
        serverTimeEl.textContent = getServerTimeString(srv);
      }
    }, 5000);
  }

  // --- 10. ARRANQUE AUTOMÁTICO ---
  function initEngine() {
    AccountManager.init();
    if (typeof document === "undefined") return;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        renderMultiAccountUI();
        bindUIEvents();
        // Sincronización automática inmediata al entrar a la web
        triggerAutomaticDriveStartup();
      });
    } else {
      renderMultiAccountUI();
      bindUIEvents();
      triggerAutomaticDriveStartup();
    }
  }

  initEngine();

  // Exposición pública al entorno global
  global.AccountManager = AccountManager;
  global.ConflictDetector = ConflictDetector;
  global.GoogleDriveSyncEngine = GoogleDriveSyncEngine;
  global.connectGoogleDrive = connectGoogleDrive;
  global.disconnectGoogleDrive = disconnectGoogleDrive;
  global.getActiveServerDay = getActiveServerDay;
  global.getActiveAccountSettings = getActiveAccountSettings;
  global.saveActiveAccountSettings = saveActiveAccountSettings;
  global.renderMultiAccountUI = renderMultiAccountUI;
  global.triggerMockConflictTest = triggerMockConflictTest;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      AccountManager,
      ConflictDetector,
      GoogleDriveSyncEngine,
      getActiveServerDay,
      getActiveAccountSettings,
      saveActiveAccountSettings
    };
  }
})(typeof window !== "undefined" ? window : globalThis);
