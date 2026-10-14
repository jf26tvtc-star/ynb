/* خطط رحلتك: اقتراح مسار قابل للتعديل والمشاركة والطباعة */
document.addEventListener("DOMContentLoaded", () => {
  const { esc, $, $$, icon } = R;
  const D = R.data();
  const P = R.params;
  const STOPS_BY_DURATION = { half: 3, full: 5, two: 8 };
  const STYLE_CATS = { mixed: [], family: ["family", "parks"], history: ["heritage", "markets"], sea: ["beaches", "marine"], nature: ["nature", "parks"] };
  const ZONE_ORDER = ["nakhl", "bahr", "sinaiyah"];

  let plan = { stops: [], days: 1, start: "", reasons: {}, budget: "" };

  $("#f-zones").innerHTML = D.zones.map((z) => '<label class="chip"><input type="checkbox" name="zones" value="' + z.id + '" checked><span>' + esc(z.name) + "</span></label>").join("");
  $("#f-cats").innerHTML = D.categories.map((c) => '<label class="chip chip--sm"><input type="checkbox" name="cats" value="' + c.id + '"><span>' + esc(c.short) + "</span></label>").join("");

  /* ترتيب بالجار الأقرب داخل كل منطقة، مع ترتيب ثابت للمناطق */
  const order = (ids) => {
    const ps = ids.map(R.place).filter(Boolean);
    const out = [];
    ZONE_ORDER.forEach((zid) => {
      const group = ps.filter((p) => p.zone === zid);
      const withC = group.filter((p) => R.coordsOf(p));
      const noC = group.filter((p) => !R.coordsOf(p));
      let cur = out.length ? R.coordsOf(out[out.length - 1]) : null;
      while (withC.length) {
        let bi = 0;
        if (cur) {
          let best = Infinity;
          withC.forEach((p, i) => { const d = R.km(cur.c, R.coordsOf(p).c); if (d < best) { best = d; bi = i; } });
        }
        const nxt = withC.splice(bi, 1)[0];
        out.push(nxt);
        cur = R.coordsOf(nxt);
      }
      out.push(...noC);
    });
    return out.map((p) => p.id);
  };

  const suggest = (f) => {
    const wanted = f.cats.concat(STYLE_CATS[f.style] || []);
    const scored = R.places()
      .filter((p) => f.zones.includes(p.zone))
      .filter((p) => !(f.budget === "free" && p.visit && p.visit.fee && p.visit.fee.type === "paid"))
      .map((p, i) => {
        const hitsCats = f.cats.filter((c) => p.categories.includes(c));
        const hitsStyle = (STYLE_CATS[f.style] || []).filter((c) => p.categories.includes(c));
        let s = hitsCats.length * 3 + hitsStyle.length * 2;
        if (p.images && p.images.length) s += 1;
        if (p.review === "needs-review") s -= 2;
        if (p.type === "experience") s -= 1;
        return { p, s, i, hits: Array.from(new Set(hitsCats.concat(hitsStyle))) };
      })
      .filter((x) => !wanted.length || x.hits.length)
      .sort((a, b) => b.s - a.s || a.i - b.i);
    const n = STOPS_BY_DURATION[f.duration];
    const picked = scored.slice(0, n);
    const reasons = {};
    picked.forEach((x) => {
      reasons[x.p.id] = x.hits.length
        ? "يناسب اهتمامك بـ: " + x.hits.map((c) => R.cat(c).short).join("، ")
        : "من أبرز أماكن " + R.zone(x.p.zone).name;
    });
    return { stops: order(picked.map((x) => x.p.id)), reasons };
  };

  const readForm = () => ({
    zones: $$('input[name="zones"]:checked').map((i) => i.value),
    cats: $$('input[name="cats"]:checked').map((i) => i.value),
    duration: $('input[name="duration"]:checked').value,
    style: $('input[name="style"]:checked').value,
    budget: $("#f-budget").value,
    start: $("#f-start").value
  });

  const shareUrl = () => {
    const u = new URL(location.href.split("?")[0].split("#")[0]);
    u.searchParams.set("stops", plan.stops.join(","));
    if (plan.days > 1) u.searchParams.set("days", String(plan.days));
    if (plan.start) u.searchParams.set("start", plan.start);
    return u.toString();
  };
  const syncUrl = () => history.replaceState(null, "", plan.stops.length ? shareUrl() : location.pathname);

  const routeUrl = (ps) => {
    const pts = ps.filter((p) => p.coords && p.coords.precision === "point").map((p) => p.coords.lat + "," + p.coords.lng);
    if (pts.length < 2) return null;
    const u = "https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=" + pts[0] + "&destination=" + pts[pts.length - 1];
    const mid = pts.slice(1, -1).slice(0, 8);
    return { url: u + (mid.length ? "&waypoints=" + encodeURIComponent(mid.join("|")) : ""), n: Math.min(pts.length, 10) };
  };

  const stopHTML = (p, i, total, prev) => {
    let leg = "";
    if (prev) {
      const a = R.coordsOf(prev), b = R.coordsOf(p);
      if (a && b) {
        const same = (a.via ? a.via.id : prev.id) === (b.via ? b.via.id : p.id);
        const km = R.km(a.c, b.c);
        leg = same ? "في النطاق نفسه للمحطة السابقة" : (a.via || b.via || a.c.precision === "area" || b.c.precision === "area" ? "نحو " : "") + R.fmtKm(km) + " خط مستقيم من المحطة السابقة";
      } else leg = "المسافة من المحطة السابقة غير متاحة (إحداثيات غير مؤكدة)";
    }
    const reason = plan.reasons[p.id] || "من اختيارك";
    const fee = R.feeText(p.visit && p.visit.fee);
    return '<li class="stop" data-zone="' + p.zone + '"><span class="stop-num" aria-hidden="true">' + (i + 1).toLocaleString("ar-SA") + "</span>" +
      '<div class="stop-card"><a class="media" href="' + R.placeUrl(p) + '" tabindex="-1" aria-hidden="true">' + R.cover(p, { w: 320, sizes: "110px" }) + "</a><div>" +
      (leg ? '<p class="leg">' + icon("route") + " " + esc(leg) + "</p>" : "") +
      '<h3><span class="visually-hidden">المحطة ' + (i + 1) + ": </span><a href=\"" + R.placeUrl(p) + '">' + esc(p.name) + "</a></h3>" +
      '<p class="stop-why">' + esc(reason) + "</p>" +
      '<div class="stop-meta"><span>' + esc(R.zone(p.zone).name) + "</span>" +
      (p.suggestedMinutes ? "<span>" + icon("clock") + "نحو " + R.fmtMin(p.suggestedMinutes) + " (تقدير)</span>" : "") +
      (plan.budget === "free" ? "<span>" + (fee ? esc(fee) : "الرسوم غير معروفة") + "</span>" : "") +
      (p.review === "needs-review" ? "<span>" + R.reviewBadge(p) + "</span>" : "") + "</div>" +
      '<div class="stop-tools"><a href="' + R.directions(p) + '" target="_blank" rel="noopener">' + icon("route") + R.directionsLabel(p) + "</a>" +
      '<button type="button" data-act="up" data-i="' + i + '"' + (i === 0 ? " disabled" : "") + ' aria-label="تقديم ' + esc(p.name) + '">' + icon("up") + "تقديم</button>" +
      '<button type="button" data-act="down" data-i="' + i + '"' + (i === total - 1 ? " disabled" : "") + ' aria-label="تأخير ' + esc(p.name) + '">' + icon("down") + "تأخير</button>" +
      '<button type="button" data-act="rm" data-i="' + i + '" aria-label="حذف ' + esc(p.name) + '">' + icon("trash") + "حذف</button></div>" +
      '<p class="print-only">' + esc(R.directions(p)) + "</p>" +
      "</div></div></li>";
  };

  const render = () => {
    const out = $("#plan-out");
    syncUrl();
    if (!plan.stops.length) {
      out.innerHTML = '<div class="empty-state">' + icon("route") + "<h3>لم تُضف أي محطة بعد</h3><p class=\"muted\">اختر تفضيلاتك واضغط «اقترح لي مسارًا»، أو ابدأ من رحلة جاهزة:</p>" +
        '<div class="chips" style="justify-content:center">' + D.trips.map((t) => '<button type="button" class="chip" data-trip="' + esc(t.id) + '">' + esc(t.title) + "</button>").join("") + "</div>" +
        addRow() + "</div>";
      return;
    }
    const ps = plan.stops.map(R.place).filter(Boolean);
    const mins = ps.reduce((s, p) => s + (p.suggestedMinutes || 0), 0);
    const route = routeUrl(ps);
    const perDay = Math.ceil(ps.length / plan.days);
    let list = "";
    for (let d = 0; d < plan.days; d++) {
      const slice = ps.slice(d * perDay, (d + 1) * perDay);
      if (!slice.length) continue;
      if (plan.days > 1) list += '<h2 class="day-title">اليوم ' + (d === 0 ? "الأول" : "الثاني") + "</h2>";
      list += '<ol class="stops">' + slice.map((p, k) => {
        const i = d * perDay + k;
        return stopHTML(p, i, ps.length, k > 0 ? ps[i - 1] : null);
      }).join("") + "</ol>";
    }
    out.innerHTML =
      '<div class="print-only"><h1>رحلتي في ينبع — رُوح ينبع</h1>' + (plan.start ? "<p>وقت البداية: " + esc(plan.start) + "</p>" : "") + "</div>" +
      '<div class="plan-summary"><div><b>' + ps.length.toLocaleString("ar-SA") + " محطات" + (plan.days > 1 ? " على يومين" : "") + "</b>" +
      "<small>مدة الزيارة التقديرية نحو " + R.fmtMin(mins) + " دون التنقل" + (plan.start ? " · البداية " + esc(plan.start) : "") + "</small></div>" +
      '<div class="chips no-print">' +
      '<button type="button" class="btn btn--light btn--sm" id="share-plan">' + icon("share") + "مشاركة الرحلة</button>" +
      '<button type="button" class="btn btn--line btn--sm" id="print-plan">' + icon("print") + "طباعة الملخص</button>" +
      (route ? '<a class="btn btn--line btn--sm" href="' + esc(route.url) + '" target="_blank" rel="noopener">' + icon("map") + "المسار في خرائط Google (" + route.n.toLocaleString("ar-SA") + " محطات بإحداثيات مؤكدة)</a>" : "") +
      '<button type="button" class="btn btn--line btn--sm" id="clear-plan">مسح</button></div></div>' +
      list + addRow();
  };

  function addRow() {
    const rest = R.places().filter((p) => !plan.stops.includes(p.id));
    if (!rest.length) return "";
    return '<div class="add-row no-print"><label class="visually-hidden" for="add-sel">أضف محطة</label><select id="add-sel"><option value="">أضف محطة إلى الرحلة…</option>' +
      D.zones.map((z) => '<optgroup label="' + esc(z.name) + '">' + rest.filter((p) => p.zone === z.id).map((p) => '<option value="' + esc(p.id) + '">' + esc(p.name) + "</option>").join("") + "</optgroup>").join("") +
      '</select><button type="button" class="btn btn--primary btn--sm" id="add-btn">' + icon("plus") + "إضافة</button></div>";
  }

  $("#plan-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = readForm();
    if (!f.zones.length) { R.toast("اختر منطقة واحدة على الأقل"); return; }
    const r = suggest(f);
    plan = { stops: r.stops, reasons: r.reasons, days: f.duration === "two" ? 2 : 1, start: f.start, budget: f.budget };
    render();
    if (!plan.stops.length) {
      $("#plan-out").insertAdjacentHTML("afterbegin", '<p class="review-note" style="margin-bottom:16px">لم نجد أماكن موثقة تطابق كل اختياراتك. خفّف الاهتمامات أو أضف منطقة.</p>');
    }
    $("#plan-out").scrollIntoView({ behavior: R.reducedMotion ? "auto" : "smooth", block: "start" });
  });

  $("#plan-out").addEventListener("click", (e) => {
    const t = e.target.closest("[data-trip]");
    if (t) return loadTrip(t.dataset.trip);
    const b = e.target.closest("[data-act]");
    if (b) {
      const i = +b.dataset.i, s = plan.stops;
      if (b.dataset.act === "up" && i > 0) [s[i - 1], s[i]] = [s[i], s[i - 1]];
      if (b.dataset.act === "down" && i < s.length - 1) [s[i + 1], s[i]] = [s[i], s[i + 1]];
      if (b.dataset.act === "rm") s.splice(i, 1);
      render();
      const again = $('[data-act="' + b.dataset.act + '"][data-i="' + Math.min(b.dataset.act === "up" ? i - 1 : b.dataset.act === "down" ? i + 1 : i, plan.stops.length - 1) + '"]');
      if (again && !again.disabled) again.focus();
      return;
    }
    if (e.target.closest("#add-btn")) {
      const v = $("#add-sel").value;
      if (!v) { R.toast("اختر مكانًا من القائمة"); return; }
      plan.stops.push(v);
      render();
      R.toast("أُضيفت المحطة");
      return;
    }
    if (e.target.closest("#share-plan")) R.share("رحلتي في ينبع — رُوح ينبع", shareUrl());
    if (e.target.closest("#print-plan")) window.print();
    if (e.target.closest("#clear-plan")) { plan = { stops: [], days: 1, start: "", reasons: {}, budget: "" }; render(); }
  });

  function loadTrip(id) {
    const t = D.trips.find((x) => x.id === id);
    if (!t) return false;
    plan.stops = t.stops.filter((s) => R.place(s));
    plan.reasons = {};
    plan.stops.forEach((s) => { plan.reasons[s] = "ضمن رحلة «" + t.title + "»"; });
    render();
    return true;
  }

  /* حالة البداية من الرابط */
  const fromStops = (P.get("stops") || "").split(",").filter((s) => R.place(s));
  if (P.get("trip") && loadTrip(P.get("trip"))) {
    /* محمّلة */
  } else if (fromStops.length) {
    plan.stops = Array.from(new Set(fromStops));
    plan.days = P.get("days") === "2" ? 2 : 1;
    plan.start = /^\d{2}:\d{2}$/.test(P.get("start") || "") ? P.get("start") : "";
    if (plan.start) $("#f-start").value = plan.start;
    render();
  } else render();
});
