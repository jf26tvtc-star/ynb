/* الصفحة الرئيسية */
document.addEventListener("DOMContentLoaded", () => {
  const { esc, $, place, zone, icon } = R;
  const D = R.data();

  /* ── الواجهة: مشاهد متتابعة ── */
  const scenes = [
    { label: "البحر", img: { file: "Turquoise_Red_Sea_Waves_(3002926462).jpg", alt: "مياه فيروزية على ساحل ينبع" } },
    { label: "التاريخ", img: { file: "Traditional_architecture_in_old_Yanbu,_Saudi_Arabia_(9).jpg", alt: "عمارة تقليدية في ينبع القديمة" } },
    { label: "النخل", img: { file: "General_view_of_Yanbu_al-Nakhl,_Saudi_Arabia_(2).jpg", alt: "منظر عام لينبع النخل" } },
    { label: "الحدائق", img: { file: "Yanbu_Park_1.jpg", alt: "حديقة في ينبع" } }
  ];
  const slides = $("#hero-slides");
  const dots = $("#hero-dots");
  const credit = $("#hero-credit");
  slides.innerHTML = scenes.map((s, i) => '<div class="hero-slide' + (i === 0 ? " is-active" : "") + '">' + R.imgTag(s.img, { w: 1920, eager: i === 0, sizes: "100vw" }) + "</div>").join("");
  dots.innerHTML = scenes.map((s, i) => '<button type="button" class="hero-dot" aria-current="' + (i === 0) + '" data-i="' + i + '">' + esc(s.label) + "</button>").join("") +
    '<button type="button" class="hero-pause" aria-pressed="false">إيقاف العرض</button>';
  let cur = 0, timer = null, paused = R.reducedMotion;
  const show = (i) => {
    cur = (i + scenes.length) % scenes.length;
    R.$$(".hero-slide", slides).forEach((el, k) => el.classList.toggle("is-active", k === cur));
    R.$$(".hero-dot", dots).forEach((el, k) => el.setAttribute("aria-current", k === cur));
    credit.innerHTML = "الصورة: " + R.credit(scenes[cur].img);
  };
  const play = () => {
    clearInterval(timer);
    if (!paused) timer = setInterval(() => show(cur + 1), 7000);
  };
  const pauseBtn = $(".hero-pause", dots);
  const setPaused = (v) => {
    paused = v;
    pauseBtn.setAttribute("aria-pressed", v);
    pauseBtn.textContent = v ? "تشغيل العرض" : "إيقاف العرض";
    play();
  };
  dots.addEventListener("click", (e) => {
    const d = e.target.closest(".hero-dot");
    if (d) { show(+d.dataset.i); play(); }
  });
  pauseBtn.addEventListener("click", () => setPaused(!paused));
  document.addEventListener("visibilitychange", () => (document.hidden ? clearInterval(timer) : play()));
  setPaused(paused);
  show(0);

  /* ── قصة مميزة ── */
  const story = place("yanbu-historic-area");
  if (story) {
    $("#feature-story").innerHTML =
      '<article class="feature-story" data-reveal>' +
      '<div class="media">' + R.cover(story, { w: 1280, sizes: "(max-width: 860px) 100vw, 60vw" }) + "</div>" +
      '<div class="fs-text"><span class="eyebrow">' + esc(zone(story.zone).name) + "</span>" +
      "<h3 class=\"h-section\" style=\"font-size:clamp(1.6rem,2.6vw,2.3rem)\">" + esc(story.name) + "</h3>" +
      "<blockquote>«" + esc(story.story[0]) + "»</blockquote>" +
      '<p class="muted">' + esc(story.summary) + "</p>" +
      '<a class="btn btn--primary" href="' + R.placeUrl(story) + '">اقرأ قصة المكان</a></div></article>';
  }

  /* ── معرض أفقي ── */
  const stripIds = ["nakhl-old-market", "lawrence-house", "ali-spring", "sharm-yanbu", "al-sanusi-mosque", "flower-festival", "nakhl-old-mosque", "waterfront-park"];
  $("#strip").innerHTML = stripIds.map(place).filter(Boolean).map((p) =>
    '<a class="strip-item" href="' + R.placeUrl(p) + '"><div class="media">' + R.cover(p, { w: 640, sizes: "(max-width:700px) 72vw, 30vw" }) + "</div>" +
    "<span>" + esc(p.name) + "<small>" + esc(zone(p.zone).name) + "</small></span></a>").join("");

  /* ── مسار مصغر ── */
  const t = D.trips.find((x) => x.id === "three-worlds");
  if (t) {
    $("#feature-route").innerHTML =
      '<div class="route" data-reveal><div><span class="eyebrow">مسار</span><h3 class="h-section" style="font-size:clamp(1.6rem,2.6vw,2.3rem)">' + esc(t.title) + "</h3>" +
      "<p>" + esc(t.text) + '</p><a class="btn btn--light" href="plan.html?trip=' + esc(t.id) + '">افتح المسار وعدّله</a></div>' +
      "<ol>" + t.stops.map(place).filter(Boolean).map((p, i) =>
        '<li><span class="stop-n">' + (i + 1).toLocaleString("ar-SA") + '</span><span><a href="' + R.placeUrl(p) + '">' + esc(p.name) + "</a><small>" + esc(zone(p.zone).name) + "</small></span></li>").join("") +
      "</ol></div>";
  }

  /* ── حسب الاهتمام ── */
  const catIcon = { heritage: "heritage", beaches: "beach", nature: "village", family: "park", friends: "share", photo: "pin", marine: "experience", markets: "market", parks: "park" };
  const tiles = $("#interest-tiles");
  const count = (c) => R.places().filter((p) => p.categories.includes(c)).length;
  tiles.innerHTML = D.categories.map((c) =>
    '<button type="button" class="interest" aria-pressed="false" data-cat="' + esc(c.id) + '">' + icon(catIcon[c.id]) +
    "<span>" + esc(c.name) + "<small>" + R.countPlaces(count(c.id)) + "</small></span></button>").join("");
  let activeCat = null, activeZone = "";
  const results = $("#interest-results");
  const drawResults = () => {
    if (!activeCat) { results.innerHTML = ""; return; }
    const all = R.places().filter((p) => p.categories.includes(activeCat) && (!activeZone || p.zone === activeZone));
    const c = R.cat(activeCat);
    results.innerHTML =
      '<div class="interest-bar"><div class="chips" role="group" aria-label="تصفية حسب المنطقة">' +
      [["", "كل المناطق"]].concat(D.zones.map((z) => [z.id, z.name])).map((z) =>
        '<button type="button" class="chip" data-zone="' + z[0] + '" aria-pressed="' + (activeZone === z[0]) + '">' + esc(z[1]) + "</button>").join("") +
      '</div><a class="btn btn--line btn--sm" href="explore.html?cat=' + esc(activeCat) + (activeZone ? "&zone=" + activeZone : "") + '">عرض النتائج في صفحة الاكتشاف (' + all.length.toLocaleString("ar-SA") + ")</a></div>" +
      (all.length
        ? '<div class="card-grid">' + all.slice(0, 6).map((p) => R.card(p)).join("") + "</div>"
        : '<div class="empty-state">' + icon("search") + "<h3>لا توجد أماكن موثقة من نوع «" + esc(c.short) + "» في هذه المنطقة بعد</h3><p class=\"muted\">جرّب منطقة أخرى أو اختر «كل المناطق».</p></div>");
    R.reveal(results);
  };
  tiles.addEventListener("click", (e) => {
    const b = e.target.closest(".interest");
    if (!b) return;
    const c = b.dataset.cat;
    activeCat = activeCat === c ? null : c;
    R.$$(".interest", tiles).forEach((x) => x.setAttribute("aria-pressed", x.dataset.cat === activeCat));
    drawResults();
  });
  results.addEventListener("click", (e) => {
    const b = e.target.closest("[data-zone]");
    if (!b || b.classList.contains("card")) return;
    activeZone = b.dataset.zone;
    drawResults();
  });

  /* ── رحلات جاهزة ── */
  $("#trips").innerHTML = D.trips.map((t) => {
    const stops = t.stops.map(place).filter(Boolean);
    const mins = stops.reduce((s, p) => s + (p.suggestedMinutes || 0), 0);
    return '<article class="trip" data-zone="' + esc(t.zone || "") + '" data-reveal>' +
      "<h3>" + esc(t.title) + "</h3><p>" + esc(t.text) + "</p>" +
      "<ol>" + stops.map((p) => "<li>" + esc(p.name) + "</li>").join("") + "</ol>" +
      '<p class="note">' + icon("clock") + "<span>مدة الزيارة التقديرية للمحطات: نحو " + R.fmtMin(mins) + " دون احتساب التنقل.</span></p>" +
      '<a class="btn btn--line btn--sm" href="plan.html?trip=' + esc(t.id) + '">افتح في مخطط الرحلات</a></article>';
  }).join("");

  /* ── ينبع بعدستك ── */
  const lensPlaces = R.places().filter((p) => p.photoTip && p.images && p.images.length).slice(0, 5);
  $("#lens").innerHTML = lensPlaces.map((p) =>
    '<a class="lens-item" href="' + R.placeUrl(p) + '" data-reveal><div class="media">' + R.imgTag(p.images[0], { w: 1280, sizes: "(max-width:860px) 100vw, 50vw" }) + "</div>" +
    '<div class="lens-cap"><b>' + esc(p.name) + "</b><p>" + esc(p.photoTip) + "</p></div></a>").join("");

  /* ── من ذاكرة ينبع ── */
  $("#memory").innerHTML = D.memory.map((m) =>
    '<div class="memory-pair" data-reveal>' +
    '<figure class="then"><span class="memory-tag">حينها</span><div class="media">' + R.imgTag({ file: m.file, alt: m.alt }, { w: 1280, sizes: "(max-width:700px) 100vw, 50vw" }) + "</div>" +
    "<figcaption>" + esc(m.caption) + '<div class="credit">' + R.credit({ file: m.file }) + "</div></figcaption></figure>" +
    '<figure><span class="memory-tag">اليوم</span><div class="media">' + R.imgTag({ file: m.pair, alt: m.pairCaption }, { w: 1280, sizes: "(max-width:700px) 100vw, 50vw" }) + "</div>" +
    "<figcaption>" + esc(m.pairCaption) + '<div class="credit">' + R.credit({ file: m.pair }) + "</div></figcaption></figure></div>").join("");

  R.syncFavButtons();
  R.reveal();
});
