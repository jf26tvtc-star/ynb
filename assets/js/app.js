/* روح ينبع — المكتبة الأساسية المشتركة بين الصفحات */
(function () {
  "use strict";
  const R = (window.R = {});
  const OVERRIDE_KEY = "rooh:data-override";
  const FAV_KEY = "rooh:favorites";

  /* ───── أدوات عامة ───── */
  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  R.esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ESC[c]);
  R.safeUrl = (u) => {
    if (!u) return "";
    try {
      const x = new URL(u, location.href);
      return x.protocol === "https:" || x.protocol === "http:" ? x.href : "";
    } catch (e) {
      return "";
    }
  };
  R.params = new URLSearchParams(location.search);
  R.$ = (sel, root) => (root || document).querySelector(sel);
  R.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  R.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ───── البيانات ───── */
  let cache = null;
  R.previewMode = false;
  R.data = () => {
    if (cache) return cache;
    let d = window.ROOH_DATA;
    try {
      const raw = localStorage.getItem(OVERRIDE_KEY);
      if (raw) {
        const o = JSON.parse(raw);
        if (o && Array.isArray(o.places) && Array.isArray(o.zones)) {
          d = o;
          R.previewMode = true;
        }
      }
    } catch (e) { /* بيانات محلية تالفة: نتجاهلها */ }
    cache = d;
    return d;
  };
  R.OVERRIDE_KEY = OVERRIDE_KEY;
  R.places = () => R.data().places;
  R.place = (id) => R.places().find((p) => p.id === id);
  R.zone = (id) => R.data().zones.find((z) => z.id === id);
  R.cat = (id) => R.data().categories.find((c) => c.id === id);
  R.kind = (id) => R.data().kinds.find((k) => k.id === id);
  R.typeName = (t) => R.data().types[t] || "";
  R.source = (key) => {
    const s = R.data().sources[key];
    if (s) return s;
    if (/^https?:\/\//.test(key)) return { title: key, url: key };
    return null;
  };

  /* ───── الصور ───── */
  R.commons = (file, w) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file) + "?width=" + (w || 1280);
  R.commonsPage = (file) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(file);
  R.imgSrc = (img, w) => (img.file ? R.commons(img.file, w) : R.safeUrl(img.src));
  R.imgTag = (img, o) => {
    if (!img) return "";
    o = o || {};
    const src = R.imgSrc(img, o.w || 1280);
    if (!src) return "";
    const srcset = img.file ? [480, 960, 1600].map((x) => R.commons(img.file, x) + " " + x + "w").join(", ") : "";
    return (
      '<img class="' + R.esc(o.cls || "") + '" src="' + R.esc(src) + '"' +
      (srcset ? ' srcset="' + R.esc(srcset) + '" sizes="' + R.esc(o.sizes || "100vw") + '"' : "") +
      ' alt="' + R.esc(img.alt || "") + '" loading="' + (o.eager ? "eager" : "lazy") + '" decoding="async"' +
      (o.eager ? ' fetchpriority="high"' : "") + ' onerror="R.imgFail(this)">'
    );
  };
  R.imgFail = (el) => {
    const box = document.createElement("div");
    box.className = "img-failed";
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", el.alt || "صورة");
    box.innerHTML = "<span>تعذر تحميل الصورة</span>";
    el.replaceWith(box);
  };
  R.credit = (img) => {
    if (!img) return "";
    if (img.file) return '<a href="' + R.esc(R.commonsPage(img.file)) + '" target="_blank" rel="noopener">ويكيميديا كومنز — الترخيص في صفحة الملف</a>';
    if (img.credit) {
      const u = R.safeUrl(img.creditUrl);
      return u ? '<a href="' + R.esc(u) + '" target="_blank" rel="noopener">' + R.esc(img.credit) + "</a>" : R.esc(img.credit);
    }
    return "";
  };

  /* رسوم توضيحية تُستخدم فقط حين لا تتوفر صورة موثقة، وتحمل وسمًا واضحًا */
  const palm = (x, y, s, c) =>
    '<g transform="translate(' + x + " " + y + ") scale(" + s + ')" fill="none" stroke="' + c + '" stroke-linecap="round">' +
    '<path d="M0 0 C 4 -40 2 -80 8 -120" stroke-width="7"/>' +
    '<g stroke-width="5"><path d="M8 -120 Q -30 -140 -62 -112"/><path d="M8 -120 Q 46 -142 78 -110"/><path d="M8 -120 Q -18 -160 -48 -160"/><path d="M8 -120 Q 34 -164 66 -160"/><path d="M8 -120 Q 2 -160 10 -176"/><path d="M8 -120 Q -40 -118 -58 -88"/><path d="M8 -120 Q 52 -116 70 -84"/></g></g>';
  const ARTS = {
    sea:
      '<defs><linearGradient id="gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7d9b0"/><stop offset=".55" stop-color="#9fd8d3"/><stop offset="1" stop-color="#0e4d6b"/></linearGradient></defs>' +
      '<rect width="800" height="500" fill="url(#gs)"/><circle cx="560" cy="210" r="56" fill="#fbe7c6"/>' +
      '<path d="M0 300 Q100 280 200 300 T400 300 T600 300 T800 300 V500 H0Z" fill="#1fb5b0" opacity=".75"/>' +
      '<path d="M0 340 Q100 320 200 340 T400 340 T600 340 T800 340 V500 H0Z" fill="#127a8a" opacity=".85"/>' +
      '<path d="M0 400 Q100 380 200 400 T400 400 T600 400 T800 400 V500 H0Z" fill="#0b2a3c"/>' +
      '<path d="M250 296 h90 l-12 14 h-66z" fill="#3a2a1d"/><path d="M290 296 V226 l34 64z" fill="#fbf7ef"/>',
    heritage:
      '<rect width="800" height="500" fill="#e8d3ad"/><rect y="420" width="800" height="80" fill="#cdb38a"/>' +
      [0, 1, 2, 3, 4].map((i) => {
        const x = 40 + i * 150, h = 230 + (i % 2) * 50, y = 420 - h;
        return '<rect x="' + x + '" y="' + y + '" width="130" height="' + h + '" fill="#f4e7cf" stroke="#b89a6c"/>' +
          '<rect x="' + (x + 30) + '" y="' + (y + 40) + '" width="70" height="90" fill="#7a4a2b"/>' +
          '<g stroke="#c99a62" stroke-width="2">' + [1, 2, 3, 4].map((k) => '<line x1="' + (x + 30) + '" x2="' + (x + 100) + '" y1="' + (y + 40 + k * 18) + '" y2="' + (y + 40 + k * 18) + '"/>').join("") + "</g>" +
          '<rect x="' + (x + 48) + '" y="' + (420 - 70) + '" width="34" height="70" fill="#5a3620" rx="17"/>';
      }).join(""),
    nakhl:
      '<defs><linearGradient id="gn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e2bd"/><stop offset="1" stop-color="#d9c095"/></linearGradient></defs>' +
      '<rect width="800" height="500" fill="url(#gn)"/><circle cx="600" cy="140" r="44" fill="#f8d77a" opacity=".8"/>' +
      '<path d="M0 330 L120 220 L210 280 L330 170 L470 300 L560 240 L680 300 L800 230 V500 H0Z" fill="#8b6a4a" opacity=".55"/>' +
      '<rect y="400" width="800" height="100" fill="#6f5a3a"/>' +
      palm(120, 410, 1.2, "#3f5a32") + palm(260, 410, 0.9, "#4c6b3c") + palm(520, 410, 1.1, "#3f5a32") + palm(680, 410, 0.8, "#4c6b3c"),
    modern:
      '<rect width="800" height="500" fill="#e9f6f8"/><ellipse cx="420" cy="420" rx="360" ry="60" fill="#7fd3e6"/>' +
      '<g fill="#cfe3e8">' + [[60, 200, 90, 220], [170, 150, 70, 270], [260, 230, 110, 190], [400, 180, 80, 240], [500, 250, 120, 170], [640, 160, 90, 260]].map((b) => '<rect x="' + b[0] + '" y="' + b[1] + '" width="' + b[2] + '" height="' + b[3] + '"/>').join("") + "</g>" +
      '<g fill="#12a4b5" opacity=".7"><circle cx="110" cy="400" r="26"/><circle cx="300" cy="410" r="20"/><circle cx="700" cy="400" r="28"/></g>' +
      '<line x1="0" y1="440" x2="800" y2="440" stroke="#0f1c24" stroke-width="2" opacity=".2"/>',
    reef:
      '<defs><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1fb5b0"/><stop offset="1" stop-color="#062033"/></linearGradient></defs>' +
      '<rect width="800" height="500" fill="url(#gr)"/>' +
      '<g fill="#e8775b"><path d="M120 500 C110 420 150 400 140 340 C170 380 180 420 170 500Z"/><path d="M560 500 C540 430 600 410 590 350 C630 400 620 450 610 500Z"/></g>' +
      '<g fill="#f2b36b"><circle cx="300" cy="470" r="40"/><circle cx="360" cy="480" r="30"/><circle cx="460" cy="476" r="36"/></g>' +
      '<g fill="#fff" opacity=".5"><circle cx="420" cy="200" r="6"/><circle cx="430" cy="160" r="4"/><circle cx="412" cy="120" r="3"/></g>'
  };
  R.art = (kind, opt) => {
    const k = ARTS[kind] ? kind : "sea";
    opt = opt || {};
    return '<div class="art art--' + k + '" role="img" aria-label="رسم توضيحي وليس صورة حقيقية للموقع">' +
      '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + ARTS[k] + "</svg>" +
      (opt.noNote ? "" : '<span class="art-note">رسم توضيحي — لا تتوفر صورة موثقة بعد</span>') + "</div>";
  };
  const ZONE_ART = { bahr: "sea", nakhl: "nakhl", sinaiyah: "modern" };
  R.artFor = (p) => p.art || (p.type === "heritage" || p.type === "market" ? (p.zone === "nakhl" ? "nakhl" : "heritage") : ZONE_ART[p.zone]);
  R.cover = (p, o) => {
    const img = p.images && p.images[0];
    return img ? R.imgTag(img, o) : R.art(R.artFor(p), o);
  };

  /* ───── أيقونات ───── */
  const ICONS = {
    heritage: '<path d="M4 20V10l8-6 8 6v10"/><path d="M9 20v-5a3 3 0 0 1 6 0v5"/>',
    market: '<path d="M3 9l2-5h14l2 5"/><path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M5 13v7h14v-7"/>',
    beach: '<path d="M2 16c2 0 2-2 5-2s3 2 5 2 2-2 5-2 3 2 5 2"/><path d="M2 20c2 0 2-2 5-2s3 2 5 2 2-2 5-2 3 2 5 2"/><circle cx="17" cy="7" r="3"/>',
    park: '<path d="M12 3a5 5 0 0 0-5 5 4 4 0 0 0 1 7h8a4 4 0 0 0 1-7 5 5 0 0 0-5-5z"/><path d="M12 15v6"/>',
    village: '<path d="M12 21V9"/><path d="M12 9c-3-3-7-2-8 0M12 9c3-3 7-2 8 0M12 9c-1-3-4-5-6-5M12 9c1-3 4-5 6-5"/>',
    experience: '<path d="M3 13c3-6 9-8 15-6-2 1-3 3-3 5 2 0 4 1 5 3-6 2-13 1-17-2z"/><circle cx="16" cy="11" r=".8"/>',
    event: '<circle cx="12" cy="12" r="3"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.9 2.9M15.5 15.5l2.9 2.9M5.6 18.4l2.9-2.9M15.5 8.5l2.9-2.9"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 11l7.6-4M8.2 13l7.6 4"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    arrow: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    print: '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>'
  };
  R.icon = (name, cls) => '<svg class="ico ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONS[name] || ICONS.pin) + "</svg>";

  /* ───── المفضلة ───── */
  R.fav = {
    list() {
      try {
        const l = JSON.parse(localStorage.getItem(FAV_KEY));
        return Array.isArray(l) ? l.filter((id) => R.place(id)) : [];
      } catch (e) {
        return [];
      }
    },
    has(id) { return this.list().includes(id); },
    toggle(id) {
      const l = this.list();
      const i = l.indexOf(id);
      if (i >= 0) l.splice(i, 1); else l.push(id);
      try { localStorage.setItem(FAV_KEY, JSON.stringify(l)); } catch (e) { R.toast("تعذر الحفظ: التخزين المحلي غير متاح في هذا المتصفح"); }
      const on = i < 0;
      R.syncFavButtons();
      document.dispatchEvent(new CustomEvent("favchange", { detail: { id, on } }));
      return on;
    }
  };
  R.favButton = (p, label) => {
    const on = R.fav.has(p.id);
    return '<button type="button" class="fav-btn' + (label ? " fav-btn--label" : "") + '" data-fav="' + R.esc(p.id) + '" aria-pressed="' + on + '" aria-label="' + (on ? "إزالة من المفضلة: " : "حفظ في المفضلة: ") + R.esc(p.name) + '">' +
      R.icon("heart") + (label ? '<span class="fav-text">' + (on ? "محفوظ في المفضلة" : "احفظ في المفضلة") + "</span>" : "") + "</button>";
  };
  R.syncFavButtons = () => {
    R.$$("[data-fav]").forEach((b) => {
      const id = b.getAttribute("data-fav");
      const on = R.fav.has(id);
      const p = R.place(id);
      b.setAttribute("aria-pressed", on);
      if (p) b.setAttribute("aria-label", (on ? "إزالة من المفضلة: " : "حفظ في المفضلة: ") + p.name);
      const t = b.querySelector(".fav-text");
      if (t) t.textContent = on ? "محفوظ في المفضلة" : "احفظ في المفضلة";
    });
    const n = R.fav.list().length;
    R.$$("[data-fav-count]").forEach((el) => {
      el.textContent = n;
      el.hidden = n === 0;
    });
  };
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-fav]");
    if (!b) return;
    e.preventDefault();
    const on = R.fav.toggle(b.getAttribute("data-fav"));
    R.toast(on ? "أُضيف إلى المفضلة" : "أُزيل من المفضلة");
  });

  /* ───── الموقع الجغرافي ───── */
  R.coordsOf = (p) => {
    if (p.coords) return { c: p.coords, via: null };
    const parent = p.parent && R.place(p.parent);
    if (parent && parent.coords) return { c: parent.coords, via: parent };
    return null;
  };
  R.km = (a, b) => {
    const rad = (x) => (x * Math.PI) / 180;
    const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 6371 * 2 * Math.asin(Math.sqrt(h));
  };
  R.fmtKm = (km) => (km < 1 ? Math.max(50, Math.round((km * 1000) / 50) * 50).toLocaleString("ar-SA") + " م" : (km < 10 ? km.toFixed(1) : Math.round(km)).toLocaleString("ar-SA") + " كم");
  R.fmtMin = (m) => (m < 60 ? m.toLocaleString("ar-SA") + " دقيقة" : (m / 60).toLocaleString("ar-SA", { maximumFractionDigits: 1 }) + " ساعة");
  R.countPlaces = (n) => {
    if (n === 0) return "لا أماكن";
    if (n === 1) return "مكان واحد";
    if (n === 2) return "مكانان";
    return n.toLocaleString("ar-SA") + (n <= 10 ? " أماكن" : " مكانًا");
  };
  /* المواقع القريبة تعتمد على المسافة الفعلية بين إحداثيات موثقة، أو على الانتماء الصريح للمعلم الأم */
  R.nearby = (p, n) => {
    n = n || 4;
    const me = R.coordsOf(p);
    const others = R.places().filter((x) => x.id !== p.id);
    if (!me) {
      return others.filter((x) => x.zone === p.zone).slice(0, n).map((x) => ({ p: x, km: null, basis: "zone" }));
    }
    const rows = [];
    others.forEach((x) => {
      const c = R.coordsOf(x);
      if (!c) return;
      const sameAnchor = (me.via ? me.via.id : p.id) === (c.via ? c.via.id : x.id);
      rows.push({ p: x, km: sameAnchor ? 0 : R.km(me.c, c.c), basis: sameAnchor ? "same" : "distance", approx: !!(me.via || c.via || me.c.precision === "area" || c.c.precision === "area") });
    });
    rows.sort((a, b) => a.km - b.km);
    return rows.slice(0, n);
  };
  R.nearbyLabel = (r) => {
    if (r.basis === "zone") return "في المنطقة نفسها";
    if (r.basis === "same") return "في النطاق نفسه";
    return (r.approx ? "نحو " : "") + R.fmtKm(r.km) + " خط مستقيم";
  };
  R.directions = (p) => {
    const c = p.coords;
    if (c && c.precision === "point") return "https://www.google.com/maps/dir/?api=1&destination=" + c.lat + "," + c.lng;
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.mapsQuery || p.nameEn || p.name);
  };
  R.directionsLabel = (p) => (p.coords && p.coords.precision === "point" ? "الاتجاهات في خرائط Google" : "ابحث عنه في خرائط Google");

  /* ───── معلومات الزيارة ───── */
  const NA = '<span class="na">غير متوفرة — تحقق قبل الزيارة</span>';
  const STATUS = { open: "مفتوح للزوار", closed: "مغلق حاليًا", seasonal: "موسمي — يُعلن رسميًا", restoration: "تحت الترميم" };
  R.feeText = (f) => {
    if (!f) return null;
    const base = f.type === "free" ? "مجاني" : f.type === "paid" ? "مدفوع" : "";
    return [base, f.note].filter(Boolean).join(" — ") || null;
  };
  R.factsHTML = (p, opts) => {
    const v = p.visit || {};
    const rows = [
      ["pin", "الموقع", v.access],
      ["info", "حالة الزيارة", STATUS[v.status]],
      ["clock", "ساعات الزيارة", v.hours && v.hours.text],
      ["info", "الرسوم", R.feeText(v.fee)],
      ["map", "موقف السيارات", v.parking],
      ["check", "المرافق", p.facilities && p.facilities.length ? p.facilities.join("، ") : null],
      ["info", "إمكانية الوصول", v.accessibility]
    ];
    const show = opts && opts.only ? rows.filter((r) => opts.only.includes(r[1])) : rows;
    return '<dl class="facts">' + show.map((r) => "<dt>" + R.icon(r[0]) + R.esc(r[1]) + "</dt><dd>" + (r[2] ? R.esc(r[2]) : NA) + "</dd>").join("") + "</dl>";
  };
  /* "مفتوح الآن" يعتمد فقط على جدول ساعات موثق: hours.schedule = { "0": [["16:00","23:00"]], ... } (0 = الأحد) */
  R.hasSchedule = (p) => !!(p.visit && p.visit.hours && p.visit.hours.schedule);
  R.isOpenNow = (p) => {
    if (!R.hasSchedule(p)) return null;
    const now = new Date();
    const slots = p.visit.hours.schedule[String(now.getDay())] || [];
    const m = now.getHours() * 60 + now.getMinutes();
    const toM = (s) => { const [h, mm] = s.split(":").map(Number); return h * 60 + mm; };
    return slots.some(([a, b]) => { const s = toM(a), e = toM(b); return e > s ? m >= s && m < e : m >= s || m < e; });
  };

  /* ───── بطاقات وعناصر ───── */
  R.placeUrl = (p) => "place.html?id=" + encodeURIComponent(p.id);
  R.reviewBadge = (p) => {
    if (p.review === "verified") return '<span class="badge badge--ok">' + R.icon("check") + "بيانات مراجعة</span>";
    if (p.review === "partial") return '<span class="badge badge--part">' + R.icon("info") + "بيانات جزئية</span>";
    return '<span class="badge badge--warn">' + R.icon("info") + "يحتاج إلى تحقق</span>";
  };
  R.catChips = (p, max) =>
    (p.categories || []).slice(0, max || 3).map((c) => {
      const cat = R.cat(c);
      return cat ? '<a class="chip chip--sm" href="explore.html?cat=' + c + '">' + R.esc(cat.short) + "</a>" : "";
    }).join("");
  R.card = (p, variant) => {
    const z = R.zone(p.zone);
    return '<article class="card card--' + (variant || "std") + '" data-zone="' + R.esc(p.zone) + '" data-reveal>' +
      '<a class="card-media media" href="' + R.placeUrl(p) + '" tabindex="-1" aria-hidden="true">' + R.cover(p, { w: 960, sizes: "(max-width: 700px) 100vw, 33vw" }) + "</a>" +
      '<div class="card-body">' +
      '<div class="card-meta"><span class="zone-dot">' + R.esc(z ? z.name : "") + "</span><span>" + R.esc(R.typeName(p.type)) + "</span></div>" +
      '<h3 class="card-title"><a href="' + R.placeUrl(p) + '">' + R.esc(p.name) + "</a></h3>" +
      '<p class="card-text">' + R.esc(p.summary) + "</p>" +
      '<div class="card-foot"><div class="chips">' + R.catChips(p, 2) + "</div>" + R.favButton(p) + "</div>" +
      (p.review === "needs-review" ? '<div class="card-flag">' + R.reviewBadge(p) + "</div>" : "") +
      "</div></article>";
  };

  /* ───── الهيدر والفوتر ───── */
  const NAV = [
    ["index.html", "الرئيسية"], ["bahr.html", "ينبع البحر"], ["nakhl.html", "ينبع النخل"], ["sinaiyah.html", "ينبع الصناعية"],
    ["explore.html", "اكتشف الأماكن"], ["map.html", "الخريطة"], ["plan.html", "خطط رحلتك"], ["about.html", "من نحن"]
  ];
  const LOGO = '<svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 30c4 0 4-3 8-3s4 3 8 3 4-3 8-3 4 3 8 3" fill="none" stroke="var(--c-turq)" stroke-width="2.5" stroke-linecap="round"/><path d="M24 26V12M24 12c-3-3-7-2-8 0M24 12c3-3 7-2 8 0M24 12c-1-3-3-4-5-4M24 12c1-3 3-4 5-4" fill="none" stroke="var(--c-sand)" stroke-width="2" stroke-linecap="round"/></svg>';
  function currentPage() {
    const f = location.pathname.split("/").pop() || "index.html";
    if (f === "place.html") {
      const p = R.place(R.params.get("id"));
      return p ? R.zone(p.zone).page : "explore.html";
    }
    return f;
  }
  R.renderChrome = () => {
    const cur = currentPage();
    const header = R.$("#site-header");
    if (header) {
      header.className = "site-header";
      header.innerHTML =
        '<a class="skip-link" href="#main">تخطَّ إلى المحتوى</a>' +
        '<div class="header-inner">' +
        '<a class="brand" href="index.html" aria-label="رُوح ينبع — الصفحة الرئيسية">' + LOGO + '<span class="brand-text"><b>رُوح ينبع</b><small>ROOH YANBU</small></span></a>' +
        '<nav class="main-nav" id="main-nav" aria-label="القائمة الرئيسية"><ul>' +
        NAV.map((n) => '<li><a href="' + n[0] + '"' + (n[0] === cur ? ' aria-current="page"' : "") + ">" + n[1] + "</a></li>").join("") +
        "</ul></nav>" +
        '<div class="header-actions">' +
        '<a class="icon-btn" href="explore.html#q" aria-label="ابحث عن مكان">' + R.icon("search") + "</a>" +
        '<a class="icon-btn" href="explore.html?fav=1" aria-label="المفضلة">' + R.icon("heart") + '<span class="count" data-fav-count hidden>0</span></a>' +
        '<button class="icon-btn menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="فتح القائمة">' + R.icon("menu") + "</button>" +
        "</div></div>";
      const toggle = R.$(".menu-toggle", header);
      const nav = R.$("#main-nav", header);
      const close = () => {
        header.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "فتح القائمة");
        toggle.innerHTML = R.icon("menu");
        document.body.classList.remove("no-scroll");
      };
      toggle.addEventListener("click", () => {
        const open = !header.classList.contains("menu-open");
        if (!open) return close();
        header.classList.add("menu-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "إغلاق القائمة");
        toggle.innerHTML = R.icon("close");
        document.body.classList.add("no-scroll");
        const first = nav.querySelector("a");
        if (first) first.focus();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && header.classList.contains("menu-open")) {
          close();
          toggle.focus();
        }
      });
      nav.addEventListener("click", (e) => { if (e.target.closest("a")) close(); });
      const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    const footer = R.$("#site-footer");
    if (footer) {
      footer.className = "site-footer";
      footer.innerHTML =
        '<div class="footer-inner">' +
        '<div class="footer-brand">' + LOGO + "<div><b>رُوح ينبع</b><p>منصة مستقلة للتعريف بجمال محافظة ينبع: البحر والنخل والصناعية. نعرض ما استطعنا توثيقه، ونقول بوضوح ما يحتاج إلى تحقق.</p></div></div>" +
        '<nav aria-label="روابط التذييل"><h2>استكشف</h2><ul>' + NAV.slice(1, 7).map((n) => '<li><a href="' + n[0] + '">' + n[1] + "</a></li>").join("") + "</ul></nav>" +
        '<div><h2>عن البيانات</h2><ul><li><a href="about.html#method">كيف نتحقق من المعلومات</a></li><li><a href="about.html#sources">المصادر</a></li><li><a href="admin.html">لوحة إدارة المحتوى</a></li></ul></div>' +
        "</div>";
    }
    if (R.previewMode) {
      const bar = document.createElement("div");
      bar.className = "preview-bar";
      bar.innerHTML = "تعرض هذه الصفحة تعديلات محلية غير منشورة من لوحة الإدارة. <a href=\"admin.html\">إدارة التعديلات</a>";
      document.body.prepend(bar);
    }
    R.syncFavButtons();
  };

  /* ───── تفاعلات عامة ───── */
  R.reveal = (root) => {
    const els = R.$$("[data-reveal]:not(.in)", root);
    if (R.reducedMotion || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
  };

  let toastTimer;
  R.toast = (msg) => {
    let t = R.$("#toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.className = "toast";
      t.setAttribute("role", "status");
      t.setAttribute("aria-live", "polite");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  };

  R.share = async (title, url) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (e) {
        if (e.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      R.toast("تم نسخ الرابط");
    } catch (e) {
      window.prompt("انسخ الرابط:", url);
    }
  };

  R.setMeta = (o) => {
    if (o.title) document.title = o.title;
    const set = (sel, attr, key, val) => {
      if (!val) return;
      let m = R.$(sel);
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute(attr, key);
        document.head.appendChild(m);
      }
      m.setAttribute("content", val);
    };
    set('meta[name="description"]', "name", "description", o.description);
    set('meta[property="og:title"]', "property", "og:title", o.title);
    set('meta[property="og:description"]', "property", "og:description", o.description);
    set('meta[property="og:image"]', "property", "og:image", o.image);
  };

  /* ───── عارض الصور ───── */
  R.lightbox = (images, start) => {
    let i = start || 0;
    const dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.setAttribute("aria-label", "عارض الصور");
    const draw = () => {
      const img = images[i];
      dlg.innerHTML =
        '<figure><div class="lb-img">' + R.imgTag(img, { w: 1600, eager: true, sizes: "100vw" }) + "</div>" +
        "<figcaption><span>" + R.esc(img.caption || img.alt || "") + "</span><small>" + R.credit(img) + "</small><b>" + (i + 1).toLocaleString("ar-SA") + " / " + images.length.toLocaleString("ar-SA") + "</b></figcaption></figure>" +
        '<button class="lb-btn lb-close" type="button" aria-label="إغلاق">' + R.icon("close") + "</button>" +
        (images.length > 1 ? '<button class="lb-btn lb-prev" type="button" aria-label="الصورة السابقة">' + R.icon("arrow") + '</button><button class="lb-btn lb-next" type="button" aria-label="الصورة التالية">' + R.icon("arrow") + "</button>" : "");
      R.$(".lb-close", dlg).onclick = () => dlg.close();
      if (images.length > 1) {
        R.$(".lb-prev", dlg).onclick = () => go(-1);
        R.$(".lb-next", dlg).onclick = () => go(1);
      }
    };
    const go = (d) => {
      i = (i + d + images.length) % images.length;
      draw();
      const b = R.$(d > 0 ? ".lb-next" : ".lb-prev", dlg);
      if (b) b.focus();
    };
    dlg.addEventListener("keydown", (e) => {
      // في الواجهة العربية: السهم الأيسر يعني التالي
      if (e.key === "ArrowLeft") go(1);
      if (e.key === "ArrowRight") go(-1);
    });
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", () => dlg.remove());
    draw();
    document.body.appendChild(dlg);
    dlg.showModal();
  };

  /* ───── Leaflet ───── */
  let leafletPromise = null;
  R.loadLeaflet = () => {
    if (window.L) return Promise.resolve(window.L);
    if (leafletPromise) return leafletPromise;
    leafletPromise = new Promise((resolve, reject) => {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      css.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      css.crossOrigin = "";
      document.head.appendChild(css);
      const s = document.createElement("script");
      s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      s.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      s.crossOrigin = "";
      s.onload = () => resolve(window.L);
      s.onerror = () => reject(new Error("leaflet"));
      document.head.appendChild(s);
    });
    return leafletPromise;
  };
  R.pinIcon = (L, p) => {
    const area = p.coords && p.coords.precision === "area";
    return L.divIcon({
      className: "pin-wrap",
      html: '<span class="pin pin--' + R.esc(p.zone) + (area ? " pin--area" : "") + '">' + R.icon(p.type) + "</span>",
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18]
    });
  };
  R.baseLayer = (L) =>
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
  R.miniMap = (el, places, opts) => {
    opts = opts || {};
    const withC = places.filter((p) => p.coords);
    if (!withC.length) {
      el.innerHTML = '<div class="map-empty">' + R.icon("map") + "<p>لا توجد إحداثيات موثقة لهذه المواقع بعد، لذلك لم نضع علامات تقديرية.</p></div>";
      return Promise.resolve(null);
    }
    el.innerHTML = '<div class="map-loading" role="status">جارٍ تحميل الخريطة…</div>';
    return R.loadLeaflet().then((L) => {
      el.innerHTML = "";
      const map = L.map(el, { scrollWheelZoom: false, attributionControl: true });
      R.baseLayer(L).addTo(map);
      const b = [];
      withC.forEach((p) => {
        const m = L.marker([p.coords.lat, p.coords.lng], { icon: R.pinIcon(L, p), title: p.name, alt: p.name }).addTo(map);
        m.bindPopup('<div dir="rtl" class="popup"><b>' + R.esc(p.name) + "</b>" + (p.coords.precision === "area" ? "<small>نقطة مركز المنطقة وليست موقعًا محددًا</small>" : "") + '<a href="' + R.placeUrl(p) + '">التفاصيل</a></div>');
        b.push([p.coords.lat, p.coords.lng]);
      });
      if (b.length === 1) map.setView(b[0], opts.zoom || 14);
      else map.fitBounds(b, { padding: [40, 40] });
      return map;
    }).catch(() => {
      el.innerHTML = '<div class="map-empty">' + R.icon("map") + "<p>تعذر تحميل الخريطة (تحقق من الاتصال بالإنترنت). يمكنك فتح الاتجاهات من صفحة كل معلم.</p></div>";
      return null;
    });
  };

  /* ───── التشغيل ───── */
  document.addEventListener("DOMContentLoaded", () => {
    R.data();
    R.renderChrome();
    R.reveal();
  });
})();
