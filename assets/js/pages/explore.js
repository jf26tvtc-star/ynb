/* اكتشف الأماكن: بحث + فلاتر + مفضلة، والحالة محفوظة في الرابط */
document.addEventListener("DOMContentLoaded", () => {
  const { esc, $, $$, icon } = R;
  const D = R.data();
  const P = R.params;

  const state = {
    q: P.get("q") || "",
    zone: (P.get("zone") || "").split(",").filter(Boolean),
    cat: (P.get("cat") || "").split(",").filter(Boolean),
    kind: (P.get("kind") || "").split(",").filter(Boolean),
    fee: P.get("fee") || "",
    open: P.get("open") === "1",
    verifiedOnly: P.get("verified") === "1",
    fav: P.get("fav") === "1"
  };

  const norm = (s) => String(s || "").toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, "")
    .replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي");
  const haystack = (p) => norm([p.name, p.nameEn, p.summary, R.zone(p.zone).name, R.typeName(p.type),
    (p.categories || []).map((c) => (R.cat(c) || {}).name).join(" "), (p.highlights || []).join(" ")].join(" "));

  const anyFee = R.places().some((p) => p.visit && p.visit.fee && p.visit.fee.type);
  const anySchedule = R.places().some(R.hasSchedule);

  /* ── بناء الفلاتر ── */
  const group = (name, legend, items, key) =>
    "<fieldset><legend>" + esc(legend) + '</legend><div class="chips">' + items.map((it) =>
      '<label class="chip"><input type="checkbox" name="' + name + '" value="' + esc(it.id) + '"' + (state[key].includes(it.id) ? " checked" : "") + "><span>" + esc(it.label) + "</span></label>").join("") + "</div></fieldset>";
  $("#filters").innerHTML =
    group("zone", "المنطقة", D.zones.map((z) => ({ id: z.id, label: z.name })), "zone") +
    group("cat", "فئة المكان", D.categories.map((c) => ({ id: c.id, label: c.short })), "cat") +
    group("kind", "الطابع", D.kinds.map((k) => ({ id: k.id, label: k.name })), "kind") +
    "<fieldset><legend>الرسوم</legend>" + (anyFee
      ? '<div class="chips">' + [["", "الكل"], ["free", "مجاني"], ["paid", "مدفوع"]].map((f) =>
        '<label class="chip"><input type="radio" name="fee" value="' + f[0] + '"' + (state.fee === f[0] ? " checked" : "") + "><span>" + f[1] + "</span></label>").join("") + "</div>"
      : '<p class="note">' + icon("info") + "<span>لا تتوفر بيانات رسوم موثقة لأي معلم بعد، لذلك لا نعرض هذا الفلتر.</span></p>") + "</fieldset>" +
    "<fieldset><legend>مفتوح الآن</legend>" + (anySchedule
      ? '<label class="chip"><input type="checkbox" name="open"' + (state.open ? " checked" : "") + "><span>مفتوح الآن فقط</span></label>"
      : '<p class="note">' + icon("info") + "<span>يتطلب ساعات عمل حديثة وموثقة، وهي غير متوفرة بعد.</span></p>") + "</fieldset>" +
    '<fieldset><legend>جودة البيانات</legend><label class="chip"><input type="checkbox" name="verified"' + (state.verifiedOnly ? " checked" : "") + "><span>إخفاء ما يحتاج إلى تحقق</span></label></fieldset>" +
    '<button type="button" class="btn btn--line btn--sm" id="clear">مسح كل الفلاتر</button>';

  $("#q").value = state.q;
  if (location.hash === "#q") $("#q").focus();
  window.addEventListener("hashchange", () => { if (location.hash === "#q") $("#q").focus(); });

  const readFilters = () => {
    state.zone = $$('input[name="zone"]:checked').map((i) => i.value);
    state.cat = $$('input[name="cat"]:checked').map((i) => i.value);
    state.kind = $$('input[name="kind"]:checked').map((i) => i.value);
    const fee = $('input[name="fee"]:checked');
    state.fee = fee ? fee.value : "";
    const open = $('input[name="open"]');
    state.open = !!(open && open.checked);
    state.verifiedOnly = $('input[name="verified"]').checked;
  };

  const syncUrl = () => {
    const u = new URLSearchParams();
    if (state.q) u.set("q", state.q);
    if (state.zone.length) u.set("zone", state.zone.join(","));
    if (state.cat.length) u.set("cat", state.cat.join(","));
    if (state.kind.length) u.set("kind", state.kind.join(","));
    if (state.fee) u.set("fee", state.fee);
    if (state.open) u.set("open", "1");
    if (state.verifiedOnly) u.set("verified", "1");
    if (state.fav) u.set("fav", "1");
    const qs = u.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
  };

  const filtered = () => {
    const terms = norm(state.q).split(/\s+/).filter(Boolean);
    const favs = R.fav.list();
    return R.places().filter((p) => {
      if (state.fav && !favs.includes(p.id)) return false;
      if (state.zone.length && !state.zone.includes(p.zone)) return false;
      if (state.cat.length && !state.cat.some((c) => p.categories.includes(c))) return false;
      if (state.kind.length && !state.kind.includes(p.kind)) return false;
      if (state.fee && !(p.visit && p.visit.fee && p.visit.fee.type === state.fee)) return false;
      if (state.open && R.isOpenNow(p) !== true) return false;
      if (state.verifiedOnly && p.review === "needs-review") return false;
      if (terms.length) {
        const h = haystack(p);
        if (!terms.every((t) => h.includes(t))) return false;
      }
      return true;
    });
  };

  const draw = () => {
    syncUrl();
    $("#tab-all").setAttribute("aria-selected", !state.fav);
    $("#tab-fav").setAttribute("aria-selected", state.fav);
    const list = filtered();
    $("#count").textContent = R.countPlaces(list.length);

    const pills = [];
    if (state.q) pills.push(["q", "", "بحث: " + state.q]);
    state.zone.forEach((v) => pills.push(["zone", v, R.zone(v).name]));
    state.cat.forEach((v) => pills.push(["cat", v, R.cat(v).short]));
    state.kind.forEach((v) => pills.push(["kind", v, R.kind(v).name]));
    if (state.fee) pills.push(["fee", "", state.fee === "free" ? "مجاني" : "مدفوع"]);
    if (state.open) pills.push(["open", "", "مفتوح الآن"]);
    if (state.verifiedOnly) pills.push(["verified", "", "بيانات مؤكدة جزئيًا على الأقل"]);
    $("#active-filters").innerHTML = pills.map((x) =>
      '<button type="button" class="chip chip--sm" data-rm="' + x[0] + '" data-v="' + esc(x[1]) + '" aria-label="إزالة الفلتر: ' + esc(x[2]) + '">' + esc(x[2]) + " ×</button>").join("");

    const res = $("#results");
    if (!list.length) {
      res.innerHTML = state.fav && !R.fav.list().length
        ? '<div class="empty-state">' + icon("heart") + "<h3>لم تحفظ أي مكان بعد</h3><p class=\"muted\">اضغط على أيقونة القلب في أي بطاقة لحفظ المكان هنا. تُحفظ المفضلة في متصفحك دون حساب.</p><button type=\"button\" class=\"btn btn--primary\" data-go-all>تصفح الأماكن</button></div>"
        : '<div class="empty-state">' + icon("search") + "<h3>لا توجد نتائج مطابقة</h3><p class=\"muted\">جرّب كلمة أبسط مثل «سوق» أو «شاطئ»، أو خفّف الفلاتر.</p><button type=\"button\" class=\"btn btn--primary\" data-clear>مسح البحث والفلاتر</button></div>";
      return;
    }
    res.innerHTML = '<div class="card-grid">' + list.map((p) => R.card(p)).join("") + "</div>" +
      (state.fav ? '<div style="margin-top:24px" class="chips"><a class="btn btn--primary" href="plan.html?stops=' + encodeURIComponent(list.map((p) => p.id).join(",")) + '">' + icon("route") + "حوّل المفضلة إلى رحلة</a><a class=\"btn btn--line\" href=\"map.html?fav=1\">" + icon("map") + "المفضلة على الخريطة</a></div>" : "");
    R.syncFavButtons();
    R.reveal(res);
  };

  const clearAll = () => {
    state.q = "";
    $("#q").value = "";
    $$("#filters input").forEach((i) => { i.checked = i.type === "radio" && i.value === ""; });
    readFilters();
    draw();
  };

  let t;
  $("#q").addEventListener("input", (e) => {
    clearTimeout(t);
    t = setTimeout(() => { state.q = e.target.value.trim(); draw(); }, 160);
  });
  $("#search-form").addEventListener("submit", (e) => { e.preventDefault(); state.q = $("#q").value.trim(); draw(); });
  $("#filters").addEventListener("change", () => { readFilters(); draw(); });
  $("#clear").addEventListener("click", clearAll);
  $("#tab-all").addEventListener("click", () => { state.fav = false; draw(); });
  $("#tab-fav").addEventListener("click", () => { state.fav = true; draw(); });
  $("#active-filters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-rm]");
    if (!b) return;
    const k = b.dataset.rm, v = b.dataset.v;
    if (k === "q") { state.q = ""; $("#q").value = ""; }
    else if (k === "verified") $('input[name="verified"]').checked = false;
    else if (k === "open") $('input[name="open"]').checked = false;
    else if (k === "fee") { const f = $('input[name="fee"][value=""]'); if (f) f.checked = true; }
    else { const i = $('input[name="' + k + '"][value="' + CSS.escape(v) + '"]'); if (i) i.checked = false; }
    readFilters();
    draw();
  });
  $("#results").addEventListener("click", (e) => {
    if (e.target.closest("[data-clear]")) clearAll();
    if (e.target.closest("[data-go-all]")) { state.fav = false; draw(); }
  });
  $("#filters-toggle").addEventListener("click", (e) => {
    const open = $("#filters").classList.toggle("is-open");
    e.currentTarget.setAttribute("aria-expanded", open);
  });
  document.addEventListener("favchange", () => { if (state.fav) draw(); });

  draw();
});
