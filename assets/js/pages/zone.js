/* صفحات المناطق الثلاث: عناصر مشتركة + أقسام خاصة بكل منطقة */
document.addEventListener("DOMContentLoaded", () => {
  const { esc, $, $$, icon, place } = R;
  const zid = document.body.dataset.zone;
  const z = R.zone(zid);
  if (!z) return;
  const places = R.places().filter((p) => p.zone === zid);

  $("#zone-cover").innerHTML = R.imgTag(z.cover, { w: 1920, eager: true, sizes: zid === "sinaiyah" ? "(max-width:900px) 100vw, 60vw" : "100vw" });
  $("#zone-intro").textContent = z.intro;

  /* ── الخريطة + المواقع دون إحداثيات ── */
  R.miniMap($("#zone-map"), places);
  const unverified = places.filter((p) => !p.coords);
  if (unverified.length) {
    $("#zone-unverified").innerHTML =
      '<details class="panel"><summary><b>مواقع لم نضع لها علامة (' + unverified.length.toLocaleString("ar-SA") + ")</b> — إحداثياتها تحتاج إلى تحقق</summary>" +
      '<ul style="margin:14px 0 0;padding-inline-start:1.2em">' + unverified.map((p) =>
        '<li><a href="' + R.placeUrl(p) + '">' + esc(p.name) + '</a> · <a href="' + R.directions(p) + '" target="_blank" rel="noopener">' + R.directionsLabel(p) + "</a></li>").join("") +
      "</ul></details>";
  }

  /* ── تمييز القسم الحالي في شريط الأقسام ── */
  const links = $$(".anchor-nav a");
  if ("IntersectionObserver" in window && links.length) {
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (en.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((a) => { const s = $(a.getAttribute("href")); if (s) io.observe(s); });
  }

  if (zid === "bahr") bahr();
  if (zid === "nakhl") nakhl();
  if (zid === "sinaiyah") sinaiyah();
  R.syncFavButtons();
  R.reveal();

  /* ═════ ينبع البحر ═════ */
  function bahr() {
    const hist = place("yanbu-historic-area");
    if (hist) {
      $("#layered").innerHTML =
        '<div class="media m1">' + R.imgTag(hist.images[1], { w: 1280, sizes: "(max-width:900px) 100vw, 50vw" }) + "</div>" +
        '<div class="media m2">' + R.imgTag(hist.images[5] || hist.images[2], { w: 640, sizes: "30vw" }) + "</div>";
    }
    $("#heritage-cards").innerHTML = places.filter((p) => p.type === "heritage" || p.type === "market").map((p) => R.card(p)).join("");
    const sea = places.filter((p) => p.type === "beach" || p.type === "experience");
    $("#sea-cards").innerHTML = sea.map((p) => R.card(p)).join("");
    const rows = [];
    sea.forEach((p) => (p.activities || []).forEach((a) => rows.push({ a, p })));
    $("#activity-table tbody").innerHTML = rows.map(({ a, p }) =>
      '<tr><td data-label="النشاط">' + esc(a.name) + '</td><td data-label="الموقع"><a href="' + R.placeUrl(p) + '">' + esc(p.name) + "</a></td>" +
      '<td data-label="حالة التحقق">' + (a.verified ? '<span class="status-ok">مناسب للموقع وفق المصادر</span>' : '<span class="status-warn">يحتاج إلى تحقق</span>' + (a.note ? "<br><small>" + esc(a.note) + "</small>" : "")) + "</td></tr>").join("");

    const steps = [
      { yr: "نحو 2500 عام", h: "على طريق البخور", t: "كانت ينبع محطة على طريق البخور والتوابل من اليمن إلى مصر وحوض المتوسط. البحر هنا لم يكن منظرًا بل طريقًا.", img: { file: "Robert_Moresby._Port_of_Yembo_Red_Sea.jpg", alt: "رسم تاريخي لميناء ينبع", caption: "ميناء «يمبو» — رسم لروبرت موريسبي" }, src: "wikiYanbu" },
      { yr: "خرموثاس", h: "شرمٌ يعرفه الإغريق", t: "شرم ينبع، شبه الجزيرة الصغيرة شمال المدينة، عُرف قديمًا باسم Charmuthas وذكره المؤرخ الإغريقي ديودور الصقلي.", img: { file: "Turquoise_Red_Sea_Waves_(3002926462).jpg", alt: "مياه فيروزية على ساحل ينبع", caption: "ساحل ينبع اليوم" }, src: "ancientPorts" },
      { yr: "بوابة المدينة", h: "ميناء المدينة المنورة", t: "على بعد نحو 160 كيلومترًا غرب المدينة المنورة، ظلت ينبع بوابتها البحرية الرئيسية. ومن هذا الدور وُلد الحي القديم بأسواقه وبيوته المتلاصقة.", img: { file: "Plan_of_Yambo_harbour_on_the_coast_of_Arabia_in_the_Red_Sea_-_publ._by_A._Dalrymple_;_the_writing_by_W._Harrison_-_btv1b53263652w.jpg", alt: "مخطط تاريخي لمرفأ ينبع", caption: "مخطط مرفأ «يمبو» — نشره ألكسندر دالريمبل" }, src: "wikiYanbu" },
      { yr: "1916", h: "زمن الثورة العربية", t: "في 27 يوليو 1916 استسلمت الحامية العثمانية لقوات الثورة العربية، وصارت ينبع قاعدة إمداد وعمليات، وأقام فيها ت. إ. لورنس.", img: { file: "House_of_Lawrence_of_Arabia_1915-16_in_Yanbu,_Saudi_Arabia_(3).jpg", alt: "بيت لورنس في ينبع", caption: "بيت لورنس في ينبع اليوم" }, src: "wikiYanbu" },
      { yr: "1975 — اليوم", h: "من ميناء صغير إلى مدينة كبرى", t: "بقيت ينبع ميناءً صغيرًا حتى 1975 حين اختيرت مركزًا صناعيًا جديدًا. واليوم تعمل الجهات المختصة على تأهيل الحي التاريخي ليبقى شاهدًا على ما كانت عليه المدينة.", img: { file: "Traditional_architecture_in_old_Yanbu,_Saudi_Arabia_(5).jpg", alt: "مبنى تاريخي في ينبع القديمة", caption: "عمارة ينبع القديمة" }, src: "wikiYanbu" }
    ];
    const box = $("#scrolly");
    box.innerHTML =
      '<div class="scrolly-media" aria-hidden="false">' + steps.map((s, i) =>
        '<figure class="' + (i === 0 ? "is-active" : "") + '"><div class="media">' + R.imgTag(s.img, { w: 1280, sizes: "(max-width:860px) 100vw, 50vw", eager: false }) + "</div>" +
        "<figcaption>" + esc(s.img.caption) + " · " + R.credit(s.img) + "</figcaption></figure>").join("") + "</div>" +
      '<div class="scrolly-steps">' + steps.map((s, i) => {
        const src = R.source(s.src);
        return '<div class="scrolly-step' + (i === 0 ? " is-active" : "") + '" data-i="' + i + '"><span class="yr">' + esc(s.yr) + "</span><h3>" + esc(s.h) + "</h3><p>" + esc(s.t) + "</p>" +
          (src ? '<small style="color:#9fb3bd">المصدر: <a style="color:#b7d8e0" href="' + esc(R.safeUrl(src.url)) + '" target="_blank" rel="noopener">' + esc(src.title) + "</a></small>" : "") + "</div>";
      }).join("") + "</div>";
    const figs = $$(".scrolly-media figure", box);
    const stepEls = $$(".scrolly-step", box);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          if (!en.isIntersecting) return;
          const i = +en.target.dataset.i;
          stepEls.forEach((s, k) => s.classList.toggle("is-active", k === i));
          figs.forEach((f, k) => f.classList.toggle("is-active", k === i));
        });
      }, { rootMargin: "-45% 0px -45% 0px" });
      stepEls.forEach((s) => io.observe(s));
    } else {
      stepEls.forEach((s) => s.classList.add("is-active"));
    }
  }

  /* ═════ ينبع النخل ═════ */
  function nakhl() {
    const trail = $("#trail");
    const order = ["nakhl-villages", "nakhl-palms", "nakhl-old-market", "suwaiq-market", "nakhl-old-mosque", "ali-spring", "radwa-view"];
    const list = order.map(place).filter((p) => p && p.zone === "nakhl").concat(places.filter((p) => !order.includes(p.id)));
    const match = {
      all: () => true,
      village: (p) => p.type === "village",
      markets: (p) => p.categories.includes("markets"),
      castle: (p) => (p.tags || []).includes("castle"),
      nature: (p) => p.categories.includes("nature")
    };
    const draw = (f) => {
      const shown = list.filter(match[f]);
      if (!shown.length) {
        trail.innerHTML = '<div class="empty-state">' + icon("heritage") + "<h3>لا توجد مواقع موثقة من هذا النوع بعد</h3><p class=\"muted\">" +
          (f === "castle" ? "لم نعتمد حتى الآن مصدرًا موثوقًا لقلاع ينبع النخل. لن نعرض قلاعًا قبل التحقق منها." : "جرّب تصفية أخرى.") + "</p></div>";
        return;
      }
      trail.innerHTML = shown.map((p) =>
        '<article class="trail-stop" data-reveal><a class="media" href="' + R.placeUrl(p) + '" tabindex="-1" aria-hidden="true">' + R.cover(p, { w: 960, sizes: "(max-width:800px) 100vw, 45vw" }) + "</a>" +
        "<div>" + R.reviewBadge(p) + '<h3 style="margin-top:10px"><a href="' + R.placeUrl(p) + '">' + esc(p.name) + "</a></h3><p>" + esc(p.summary) + "</p>" +
        '<div class="chips" style="align-items:center">' + R.catChips(p, 3) + R.favButton(p) + "</div></div></article>").join("");
      R.reveal(trail);
    };
    $("#trail-filters").addEventListener("click", (e) => {
      const b = e.target.closest("[data-f]");
      if (!b) return;
      $$("#trail-filters [data-f]").forEach((x) => x.setAttribute("aria-pressed", x === b));
      draw(b.dataset.f);
    });
    draw("all");

    const seen = new Set();
    const imgs = [];
    places.forEach((p) => (p.images || []).forEach((im) => { const k = im.file || im.src; if (!seen.has(k)) { seen.add(k); imgs.push(im); } }));
    const g = $("#nakhl-gallery");
    g.innerHTML = imgs.map((im, i) => '<button type="button" data-i="' + i + '" aria-label="تكبير: ' + esc(im.caption || im.alt) + '">' + R.imgTag(im, { w: 640, sizes: "(max-width:700px) 100vw, 33vw" }) + "</button>").join("");
    g.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) R.lightbox(imgs, +b.dataset.i); });
  }

  /* ═════ ينبع الصناعية ═════ */
  function sinaiyah() {
    const suit = (p) => {
      const s = [];
      if (p.categories.includes("family")) s.push("العائلات");
      if (p.categories.includes("friends")) s.push("الأصدقاء");
      return s.length ? "مناسب لـ: " + s.join(" و") + " (اقتراح تحريري)" : "";
    };
    $("#editorial").innerHTML = places.map((p, i) =>
      '<article class="editorial" data-reveal><div class="ed-num">' + String(i + 1).padStart(2, "0") + "</div>" +
      '<a class="ed-media media" href="' + R.placeUrl(p) + '" tabindex="-1" aria-hidden="true">' + R.cover(p, { w: 1280, sizes: "(max-width:900px) 100vw, 50vw" }) + "</a>" +
      '<div class="ed-text"><span class="eyebrow">' + esc(R.typeName(p.type)) + '</span><h3><a href="' + R.placeUrl(p) + '">' + esc(p.name) + "</a></h3>" +
      "<p>" + esc(p.summary) + "</p>" + (suit(p) ? '<p class="muted" style="font-size:.9rem">' + esc(suit(p)) + "</p>" : "") +
      R.factsHTML(p, { only: ["الموقع", "ساعات الزيارة", "موقف السيارات", "المرافق", "إمكانية الوصول"] }) +
      '<div class="chips" style="align-items:center"><a class="btn btn--primary btn--sm" href="' + R.placeUrl(p) + '">التفاصيل</a>' +
      '<a class="btn btn--line btn--sm" href="' + R.directions(p) + '" target="_blank" rel="noopener">' + R.directionsLabel(p) + "</a>" + R.favButton(p) + "</div></div></article>").join("");

    const pano = { file: "التشجير_بينبع_الصناعية.JPG", alt: "التشجير في ينبع الصناعية", caption: "التشجير في ينبع الصناعية" };
    $("#panorama").innerHTML = '<div class="media">' + R.imgTag(pano, { w: 1920, sizes: "100vw" }) + "</div><figcaption>" + esc(pano.caption) + " · " + R.credit(pano) + "</figcaption>";
  }
});
