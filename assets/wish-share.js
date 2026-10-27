(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.WishShare = api;
})(typeof self !== "undefined" ? self : this, function () {
  const COPY = {
    es: {button:"Compartir estadísticas", title:"Mi suerte en Genshin", record:"MI MEJOR PITY 5★", total:"DESEOS REGISTRADOS", stars:"CINCO ESTRELLAS", empty:"Sin ciclos completos", note:"Historial registrado · El primer 5★ de cada banner no cuenta para el récord.", seal:"Calculado en spirifly.app", download:"Descargar PNG", close:"Cerrar", error:"No se pudo generar la imagen. Inténtalo nuevamente.", banners:["Personajes", "Armas", "Permanente", "Recopilatorio"]},
    en: {button:"Share stats", title:"My Genshin luck", record:"MY BEST 5★ PITY", total:"RECORDED WISHES", stars:"FIVE STARS", empty:"No complete cycles", note:"Recorded history · Each banner's first 5★ is excluded from the record.", seal:"Calculated on spirifly.app", download:"Download PNG", close:"Close", error:"Could not generate the image. Please try again.", banners:["Character", "Weapon", "Standard", "Chronicled"]},
    pt: {button:"Compartilhar estatísticas", title:"Minha sorte em Genshin", record:"MEU MELHOR PITY 5★", total:"TIROS REGISTRADOS", stars:"CINCO ESTRELAS", empty:"Sem ciclos completos", note:"Histórico registrado · O primeiro 5★ de cada banner não conta para o recorde.", seal:"Calculado em spirifly.app", download:"Baixar PNG", close:"Fechar", error:"Não foi possível gerar a imagem. Tente novamente.", banners:["Personagens", "Armas", "Permanente", "Crônicas"]},
    ja: {button:"統計をシェア", title:"原神・私の祈願記録", record:"最短の★5獲得回数", total:"記録済みの祈願", stars:"★5獲得数", empty:"完全な区間なし", note:"記録済みの履歴のみ · 各祈願の最初の★5は最短記録の対象外です。", seal:"spirifly.app で集計", download:"PNGをダウンロード", close:"閉じる", error:"画像を生成できませんでした。もう一度お試しください。", banners:["キャラクター", "武器", "通常", "集録"]},
    ko: {button:"통계 공유", title:"나의 원신 기원 기록", record:"최단 5★ 획득 횟수", total:"기록된 기원", stars:"5성 획득 수", empty:"완전한 구간 없음", note:"기록된 내역 기준 · 각 기원의 첫 5성은 최단 기록에서 제외됩니다.", seal:"spirifly.app에서 계산", download:"PNG 다운로드", close:"닫기", error:"이미지를 생성할 수 없습니다. 다시 시도해 주세요.", banners:["캐릭터", "무기", "상시", "묶음"]}
  };
  const KEYS = ["character", "weapon", "standard", "chronicled"];

  function summarize(result) {
    const candidates = [];
    for (const key of KEYS) {
      // El motor entrega los más recientes primero: el último es el ciclo inicial incompleto.
      const history = result?.[key]?.stats?.fiveStarHistory || [];
      for (const item of history.slice(0, -1)) {
        if (Number.isInteger(item.pity) && item.pity > 0) candidates.push({...item, banner:key});
      }
    }
    candidates.sort((a, b) => a.pity - b.pity);
    return {total:result?.summary?.totalPullsAll || 0, stars:result?.summary?.total5StarsAll || 0, best:candidates[0] || null};
  }

  function makeCanvas(summary, lang) {
    const t = COPY[lang] || COPY.es;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 675;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D unavailable");
    const gradient = ctx.createLinearGradient(0, 0, 1200, 675);
    gradient.addColorStop(0, "#111827");
    gradient.addColorStop(1, "#272135");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 675);
    ctx.strokeStyle = "#bfa36d";
    ctx.lineWidth = 2;
    ctx.strokeRect(32, 32, 1136, 611);
    const text = (value, x, y, size, color = "#f5f1e8", weight = 400, maxWidth = 1056) => {
      ctx.fillStyle = color;
      ctx.font = `${weight} ${size}px Arial, sans-serif`;
      ctx.fillText(String(value), x, y, maxWidth);
    };
    text("SPIRIFLY", 72, 93, 22, "#d7b97a", 700);
    text(t.title, 72, 154, 44, "#ffffff", 700);
    text(t.record, 72, 225, 20, "#d7b97a", 700);
    text(summary.best ? summary.best.pity : "—", 72, 345, 112, "#f6d995", 700);
    const detail = summary.best ? `${summary.best.name} · ${t.banners[KEYS.indexOf(summary.best.banner)]}` : t.empty;
    text(detail, 76, 387, 26, "#e3dfd6", 400, 1030);
    ctx.fillStyle = "#ffffff20";
    ctx.fillRect(72, 425, 1056, 1);
    text(t.total, 72, 466, 18, "#c5c3cc", 700, 480);
    text(Number(summary.total).toLocaleString(lang), 72, 520, 44, "#ffffff", 700);
    text(t.stars, 660, 466, 18, "#c5c3cc", 700, 465);
    text(Number(summary.stars).toLocaleString(lang), 660, 520, 44, "#ffffff", 700);
    text(t.note, 72, 575, 17, "#b9b6c1", 400);
    text(t.seal, 72, 612, 22, "#d7b97a", 700);
    return canvas;
  }

  async function open(result, lang) {
    const summary = summarize(result);
    if (!summary.total) return;
    const t = COPY[lang] || COPY.es;
    try {
      if (document.fonts?.ready) await document.fonts.ready;
      const canvas = makeCanvas(summary, lang);
      const blob = await new Promise((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error("PNG encoding failed")), "image/png"));
      const url = URL.createObjectURL(blob);
      const dialog = document.createElement("dialog");
      dialog.className = "wish-share-dialog";
      dialog.setAttribute("aria-label", t.button);
      const title = document.createElement("h2");
      title.textContent = t.button;
      const image = document.createElement("img");
      image.src = url;
      image.alt = `${t.title}. ${t.total}: ${summary.total}. ${t.stars}: ${summary.stars}. ${t.record}: ${summary.best?.pity ?? t.empty}`;
      const actions = document.createElement("div");
      actions.className = "wish-share-actions";
      const download = document.createElement("a");
      download.className = "action-btn";
      download.href = url;
      download.download = "spirifly-wishes.png";
      download.textContent = t.download;
      const close = document.createElement("button");
      close.type = "button";
      close.className = "action-btn secondary";
      close.textContent = t.close;
      close.addEventListener("click", () => dialog.close());
      actions.append(download, close);
      dialog.append(title, image, actions);
      document.body.append(dialog);
      dialog.addEventListener("close", () => { URL.revokeObjectURL(url); dialog.remove(); }, {once:true});
      dialog.showModal();
      close.focus();
    } catch (error) {
      console.error("Wish share PNG:", error);
      alert(t.error);
    }
  }

  function update(result, lang) {
    const button = document.getElementById("btnShareWishes");
    if (!button) return;
    const t = COPY[lang] || COPY.es;
    button.textContent = t.button;
    button.disabled = !result?.summary?.totalPullsAll;
  }
  return {summarize, makeCanvas, open, update};
});