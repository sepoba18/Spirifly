/* Analytics consent is separate from the certified CMP used by AdSense. */
(function () {
  "use strict";
  const measurementId = "G-J3F1TQSWB0";
  const storageKey = "spirifly_analytics_consent_v1";
  const maxAge = 180 * 24 * 60 * 60 * 1000;
  let choice = null;
  let loaded = false;
  let panel;
  let returnFocus;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  });
  window["ga-disable-" + measurementId] = true;

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    const age = saved && Date.now() - saved.updated;
    if (saved && typeof saved.analytics === "boolean" && Number.isFinite(age) && age >= 0 && age < maxAge) {
      choice = saved.analytics;
    }
  } catch (_) { /* Keep optional measurement disabled when storage is unavailable. */ }

  function applyChoice(allowed) {
    window["ga-disable-" + measurementId] = !allowed;
    // Advertising choices belong to the certified CMP, never to this control.
    window.gtag("consent", "update", { analytics_storage: allowed ? "granted" : "denied" });
    if (allowed && !loaded) {
      loaded = true;
      window.gtag("js", new Date());
      window.gtag("config", measurementId, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        // Import links can contain temporary game-authentication credentials.
        page_location: window.location.origin + window.location.pathname,
        page_referrer: ""
      });
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
      document.head.appendChild(script);
    }
    if (!allowed) {
      // Delete this site's GA cookies without touching game progress or Drive data.
      let cookies = "";
      try { cookies = document.cookie; } catch (_) { /* Browser may block cookie access. */ }
      const names = cookies.split(";").map(value => value.trim().split("=")[0])
        .filter(name => /^_ga(?:_|$)/.test(name));
      const host = window.location.hostname;
      const domains = ["", host, "." + host];
      if (host === "spirifly.app" || host.endsWith(".spirifly.app")) domains.push("spirifly.app", ".spirifly.app");
      names.forEach(name => domains.forEach(domain => {
        try {
          document.cookie = name + "=; Max-Age=0; Path=/; SameSite=Lax" + (domain ? "; Domain=" + domain : "");
        } catch (_) { /* Measurement remains disabled even if cookie deletion is blocked. */ }
      }));
    }
  }

  function saveChoice(allowed) {
    choice = allowed;
    try { localStorage.setItem(storageKey, JSON.stringify({ analytics: allowed, updated: Date.now() })); } catch (_) {}
    applyChoice(allowed);
    panel.hidden = true;
    if (returnFocus) returnFocus.focus();
  }

  function openSettings(event) {
    returnFocus = event && event.currentTarget;
    panel.hidden = false;
    panel.querySelector("[data-analytics-reject]").focus();
  }

  function init() {
    panel = document.createElement("section");
    panel.className = "privacy-panel";
    // Nothing optional runs by default; visitors can opt in from the footer.
    panel.hidden = true;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", "analytics-consent-title");
    panel.innerHTML = '<div><h2 id="analytics-consent-title">Analítica opcional</h2>' +
      '<p>¿Permites Google Analytics para medir el uso de Spirifly? Puedes rechazarlo y seguir usando todas las herramientas. ' +
      'Esta elección no autoriza publicidad personalizada. <a href="/privacy.html">Privacidad</a> · <a href="/cookies.html">Cookies</a></p></div>' +
      '<div class="privacy-actions"><button type="button" data-analytics-reject>Rechazar analítica</button>' +
      '<button type="button" data-analytics-accept>Permitir analítica</button></div>';
    document.body.appendChild(panel);
    panel.querySelector("[data-analytics-reject]").addEventListener("click", () => saveChoice(false));
    panel.querySelector("[data-analytics-accept]").addEventListener("click", () => saveChoice(true));
    document.querySelectorAll("[data-privacy-settings]").forEach(button => button.addEventListener("click", openSettings));

    // Existing AdSense tags deploy Google's message after it is published in AdSense.
    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.googlefc.callbackQueue.push({ CONSENT_API_READY: function () {
      if (typeof window.__tcfapi !== "function") return;
      window.__tcfapi("addEventListener", 2, function (data, success) {
        if (!success || !data || !data.gdprApplies) return;
        document.querySelectorAll("[data-ad-privacy]").forEach(button => { button.hidden = false; });
      });
    } });
    document.querySelectorAll("[data-ad-privacy]").forEach(button => button.addEventListener("click", function () {
      window.googlefc.callbackQueue.push({ CONSENT_API_READY: function () {
        if (typeof window.googlefc.showRevocationMessage === "function") window.googlefc.showRevocationMessage();
      } });
    }));
  }

  if (choice !== null) applyChoice(choice);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
