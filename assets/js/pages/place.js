/* صفحة تفاصيل المعلم — يتكيف التخطيط مع نوع المكان */
document.addEventListener("DOMContentLoaded", () => {
  const { esc, $, icon } = R;
  const main = $("#main");
  const id = R.params.get("id");
  const p = id && R.place(id);

  if (!p) {
    document.body.classList.remove("has-hero");
    R.setMeta({ title: "المعلم غير موجود — رُوح ينبع" });
    main.innerHTML =
      '<section class="error-page"><div><div class="code">؟</div><h1>لم نعثر على هذا المعلم</h1>' +
      '<p class="lead" style="margin-inline:auto">ربما تغيّر الرابط أو حُذف المعلم من الدليل.</p>' +
      '<div class="hero-actions" style="justify-content:center"><a class="btn btn--primary" href="explore.html">تصفح كل الأماكن</a><a class="btn btn--line" href="index.html">الرئيسية</a></div></div></section>';
    return;
  }

  const z = R.zone(p.zone);
  document.body.dataset.theme = p.zone;
  document.body.classList.add("theme-" + p.zone);
  const img0 = p.images && p.images[0];
  const url = location.href.split("#")[0];
  R.setMeta({
    title: p.name + " | " + z.name + " — رُوح ينبع",
    description: p.summary,
    image: img0 && img0.file ? R.commons(img0.file, 1200) : undefined
  });
  const canon = document.createElement("link");
  canon.rel = "canonical";
  canon.href = url;
  document.head.appendChild(canon);
  const ld = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: p.name,
    alternateName: p.nameEn,
    description: p.summary,
    url,
    address: { "@type": "PostalAddress", addressLocality: z.name + "، ينبع", addressCountry: "SA" }
  };
  if (img0 && img0.file) ld.image = R.commons(img0.file, 1200);
  if (p.coords && p.coords.precision === "point") ld.geo = { "@type": "GeoCoordinates", latitude: p.coords.lat, longitude: p.coords.lng };
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);

  /* ── أقسام ── */
  const sec = (title, html, idAttr) => '<section class="place-block"' + (idAttr ? ' id="' + idAttr + '"' : "") + "><h2>" + esc(title) + "</h2>" + html + "</section>";
  const storyHTML = '<div class="story">' + (p.story || []).map((t) => "<p>" + esc(t) + "</p>").join("") + "</div>";
  const highlightsHTML = p.highlights && p.highlights.length
    ? sec(p.type === "beach" || p.type === "park" || p.type === "experience" ? "أهم ما يمكن تجربته" : "ما الذي يميزه؟",
      '<ul class="highlights">' + p.highlights.map((h) => "<li>" + icon("check") + "<span>" + esc(h) + "</span></li>").join("") + "</ul>")
    : "";
  const archHTML = p.architecture && p.architecture.length
    ? sec("تفاصيل معمارية", '<div class="arch-grid">' + p.architecture.map((a) => "<div><b>" + esc(a.title) + "</b>" + esc(a.text) + "</div>").join("") + "</div>")
    : "";
  const timelineHTML = p.timeline && p.timeline.length
    ? sec("تسلسل زمني موثق", '<ol class="timeline">' + p.timeline.map((t) => {
      const src = R.source(t.source);
      return "<li><b>" + esc(t.label) + "</b><p>" + esc(t.text) + "</p>" + (src ? '<small><a href="' + esc(R.safeUrl(src.url)) + '" target="_blank" rel="noopener">المصدر: ' + esc(src.title) + "</a></small>" : "") + "</li>";
    }).join("") + "</ol>")
    : "";
  const activitiesHTML = p.activities && p.activities.length
    ? sec("الأنشطة", '<ul class="activities">' + p.activities.map((a) =>
      "<li><b>" + esc(a.name) + "</b>" + (a.verified ? '<span class="badge badge--ok">' + icon("check") + "مناسب للموقع</span>" : '<span class="badge badge--warn">' + icon("info") + "يحتاج إلى تحقق</span>") +
      (a.note ? "<small>" + esc(a.note) + "</small>" : "") + "</li>").join("") + "</ul>" +
      '<p class="note" style="margin-top:12px">' + icon("info") + "<span>لا نفترض توفر أي نشاط ما لم يُذكر هنا. الأنشطة البحرية المنظمة تتطلب مزودًا مرخصًا.</span></p>")
    : "";
  const imgs = p.images || [];
  const galleryHTML = imgs.length
    ? sec("معرض الصور", '<div class="gallery" id="gallery">' + imgs.map((im, i) =>
      '<button type="button" data-i="' + i + '" aria-label="تكبير: ' + esc(im.caption || im.alt) + '">' + R.imgTag(im, { w: i === 0 ? 960 : 480, sizes: i === 0 ? "(max-width:980px) 100vw, 50vw" : "200px" }) + "</button>").join("") + "</div>" +
      '<p class="credit">جميع الصور من ويكيميديا كومنز أو مصادر مذكورة؛ اضغط الصورة لعرض التعليق ورابط الترخيص.</p>')
    : sec("معرض الصور", '<div class="empty-state">' + icon("info") + "<h3>لا تتوفر صور موثقة لهذا المعلم بعد</h3><p class=\"muted\">نفضّل ترك المساحة فارغة على عرض صورة لا تمثل المكان فعلًا.</p></div>");
  const tipHTML = p.photoTip ? sec("نصيحة تصوير", '<div class="panel">' + icon("pin") + " " + esc(p.photoTip) + "</div>") : "";

  const near = R.nearby(p, 4);
  const basis = near.length && near[0].basis === "zone"
    ? "لا توجد إحداثيات مؤكدة لهذا المعلم، لذلك نعرض أماكن من المنطقة نفسها وليس الأقرب مسافة."
    : "مرتبة حسب المسافة المباشرة (خط مستقيم) بين الإحداثيات الموثقة؛ المسافة على الطريق أطول عادة.";
  const nearHTML = near.length
    ? sec("أماكن قريبة تستحق الزيارة", '<p class="note">' + icon("info") + "<span>" + basis + '</span></p><div class="near-list">' + near.map((r) =>
      '<a class="near-item" href="' + R.placeUrl(r.p) + '"><div class="media">' + R.cover(r.p, { w: 240, sizes: "84px" }) + "</div><div><b>" + esc(r.p.name) + "</b><small>" + esc(R.zone(r.p.zone).name) + " · " + esc(R.nearbyLabel(r)) + "</small></div></a>").join("") + "</div>")
    : "";
  const srcHTML = p.sources && p.sources.length
    ? sec("المصادر", '<ol class="sources-list">' + p.sources.map((k) => {
      const s = R.source(k);
      return s ? '<li><a href="' + esc(R.safeUrl(s.url)) + '" target="_blank" rel="noopener">' + esc(s.title) + "</a></li>" : "";
    }).join("") + (p.coords ? '<li><a href="' + esc(R.safeUrl(p.coords.source)) + '" target="_blank" rel="noopener">عنصر الموقع في OpenStreetMap</a></li>' : "") + "</ol>" +
      '<p class="muted" style="font-size:.85rem">آخر مراجعة لبيانات المنصة: ' + esc(R.data().version) + "</p>")
    : "";

  let body;
  if (p.type === "village") body = storyHTML + galleryHTML + highlightsHTML + tipHTML + archHTML + timelineHTML;
  else if (p.type === "heritage" || p.type === "market") body = storyHTML + highlightsHTML + archHTML + timelineHTML + galleryHTML + tipHTML;
  else body = storyHTML + activitiesHTML + highlightsHTML + galleryHTML + tipHTML + timelineHTML;

  const mapAnchor = R.coordsOf(p);
  main.innerHTML =
    '<section class="place-hero"><div class="media">' + R.cover(p, { w: 1920, eager: true, sizes: "100vw" }) + "</div>" +
    '<div class="wrap"><nav class="crumbs" aria-label="مسار التنقل"><a href="index.html">الرئيسية</a> / <a href="' + esc(z.page) + '">' + esc(z.name) + "</a> / <span>" + esc(R.typeName(p.type)) + "</span></nav>" +
    R.reviewBadge(p) + "<h1>" + esc(p.name) + '</h1><p class="lead">' + esc(p.summary) + "</p>" +
    '<div class="place-actions">' + R.favButton(p, true) +
    '<button type="button" class="btn btn--ghost" id="share-btn">' + icon("share") + "مشاركة الرابط</button>" +
    '<a class="btn btn--light" href="' + R.directions(p) + '" target="_blank" rel="noopener">' + icon("route") + R.directionsLabel(p) + "</a></div></div>" +
    (img0 ? '<p class="hero-cap">' + esc(img0.caption || "") + " · " + R.credit(img0) + "</p>" : "") + "</section>" +
    '<div class="wrap section--tight"><div class="place-layout"><article>' + body + nearHTML + srcHTML + "</article>" +
    '<aside class="place-aside" aria-label="معلومات الزيارة">' +
    '<div class="panel"><h2>معلومات الزيارة</h2>' + R.factsHTML(p) +
    (p.suggestedMinutes ? '<p class="note">' + icon("clock") + "<span>مدة زيارة مقترحة: نحو " + R.fmtMin(p.suggestedMinutes) + " (تقدير تحريري)</span></p>" : "") +
    (p.reviewNote ? '<div class="review-note"><b>بحاجة إلى تحقق:</b> ' + esc(p.reviewNote) + "</div>" : "") + "</div>" +
    '<div class="panel"><h2>الموقع على الخريطة</h2><div class="zone-map" id="place-map"></div>' +
    (mapAnchor && mapAnchor.via ? '<p class="note" style="margin-top:10px">' + icon("info") + "<span>لا توجد إحداثيات مؤكدة لهذا المعلم نفسه؛ الخريطة تعرض «" + esc(mapAnchor.via.name) + "» الذي يقع ضمنه.</span></p>" : "") +
    (p.coords && p.coords.precision === "area" ? '<p class="note" style="margin-top:10px">' + icon("info") + "<span>النقطة تمثل مركز المنطقة وليست موقعًا محددًا.</span></p>" : "") +
    '<div class="chips" style="margin-top:12px"><a class="btn btn--primary btn--sm" href="' + R.directions(p) + '" target="_blank" rel="noopener">' + R.directionsLabel(p) + "</a>" +
    (p.coords ? '<a class="btn btn--line btn--sm" href="map.html?place=' + encodeURIComponent(p.id) + '">في الخريطة التفاعلية</a>' : "") + "</div></div>" +
    '<div class="panel"><h2>أضفه إلى رحلتك</h2><p class="muted" style="font-size:.95rem">ابدأ رحلة بهذا المكان ثم أضف إليها ما تشاء.</p><a class="btn btn--line btn--sm" href="plan.html?stops=' + encodeURIComponent(p.id) + '">' + icon("plus") + "ابدأ رحلة من هنا</a></div>" +
    "</aside></div></div>";

  const mapPlaces = mapAnchor ? [mapAnchor.via || p] : [];
  R.miniMap($("#place-map"), mapPlaces, { zoom: p.coords && p.coords.precision === "area" ? 12 : 15 });
  $("#share-btn").addEventListener("click", () => R.share(p.name + " — رُوح ينبع", url));
  const g = $("#gallery");
  if (g) g.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) R.lightbox(imgs, +b.dataset.i); });
  R.syncFavButtons();
  R.reveal();
});
