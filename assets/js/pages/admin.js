/* لوحة إدارة المحتوى: تحرير نسخة عمل محلية ثم تصديرها */
document.addEventListener("DOMContentLoaded", () => {
  const { esc, $, $$ } = R;
  const clone = (o) => JSON.parse(JSON.stringify(o));
  let work = clone(R.data());
  let currentId = null;

  const persist = () => {
    try {
      localStorage.setItem(R.OVERRIDE_KEY, JSON.stringify(work));
    } catch (e) {
      R.toast("تعذر الحفظ في المتصفح");
      return false;
    }
    $("#mode").textContent = "توجد تعديلات محلية غير منشورة";
    return true;
  };
  $("#mode").textContent = R.previewMode ? "توجد تعديلات محلية غير منشورة" : "تعرض البيانات المنشورة";

  const lines = (s) => String(s || "").split("\n").map((x) => x.trim()).filter(Boolean);
  const paras = (s) => String(s || "").split(/\n\s*\n/).map((x) => x.replace(/\s+/g, " ").trim()).filter(Boolean);
  const nullIf = (s) => (String(s || "").trim() ? String(s).trim() : null);

  const drawList = () => {
    const q = $("#admin-q").value.trim();
    $("#admin-list").innerHTML = work.places.filter((p) => !q || (p.name + p.id).includes(q)).map((p) =>
      '<li><button type="button" data-id="' + esc(p.id) + '" class="' + (p.id === currentId ? "is-active" : "") + '"><span>' + esc(p.name) +
      '<br><small class="muted">' + esc((work.zones.find((z) => z.id === p.zone) || {}).name || "") + "</small></span>" + R.reviewBadge(p) + "</button></li>").join("");
  };

  const imgToLine = (im) => [im.file || im.src || "", im.alt || "", im.caption || "", im.credit || ""].join(" | ").replace(/( \| )+$/, "");
  const lineToImg = (l) => {
    const [a, alt, caption, credit] = l.split("|").map((x) => x.trim());
    if (/^https?:\/\//.test(a)) return { src: a, alt: alt || "", caption: caption || "", credit: credit || "" };
    return { file: a.replace(/^File:/, "").replace(/ /g, "_"), alt: alt || "", caption: caption || "" };
  };

  const field = (label, html, hint) => "<label>" + esc(label) + (hint ? " <small>" + esc(hint) + "</small>" : "") + html + "</label>";
  const input = (name, val, type) => '<input type="' + (type || "text") + '" name="' + name + '" value="' + esc(val == null ? "" : val) + '"' + (type === "number" ? ' step="any"' : "") + ">";
  const area = (name, val, rows) => '<textarea name="' + name + '" rows="' + (rows || 4) + '">' + esc(val || "") + "</textarea>";
  const select = (name, opts, val) => '<select name="' + name + '">' + opts.map((o) => '<option value="' + esc(o[0]) + '"' + (String(val || "") === o[0] ? " selected" : "") + ">" + esc(o[1]) + "</option>").join("") + "</select>";

  const drawForm = (p) => {
    const f = $("#admin-form");
    if (!p) {
      f.innerHTML = '<div class="empty-state"><h3>اختر معلمًا من القائمة أو أنشئ معلمًا جديدًا</h3></div>';
      return;
    }
    const v = p.visit || {};
    const c = p.coords || {};
    f.innerHTML =
      "<fieldset><legend>الأساسيات</legend>" +
      '<div class="row2">' + field("المعرّف (للرابط)", input("id", p.id), "أحرف لاتينية صغيرة وأرقام وشرطات") + field("الاسم بالعربية", input("name", p.name)) + "</div>" +
      '<div class="row2">' + field("الاسم بالإنجليزية", input("nameEn", p.nameEn)) +
      field("المنطقة", select("zone", work.zones.map((z) => [z.id, z.name]), p.zone)) + "</div>" +
      '<div class="row2">' + field("نوع الصفحة", select("type", Object.entries(work.types), p.type)) +
      field("الطابع", select("kind", work.kinds.map((k) => [k.id, k.name]), p.kind)) + "</div>" +
      field("يقع ضمن معلم آخر", select("parent", [["", "— لا —"]].concat(work.places.filter((x) => x.id !== p.id).map((x) => [x.id, x.name])), p.parent), "يُستخدم للخريطة والأماكن القريبة عند غياب الإحداثيات") +
      '<div><b style="font-size:.92rem">الفئات</b><div class="chips" style="margin-top:6px">' + work.categories.map((cat) =>
        '<label class="chip chip--sm"><input type="checkbox" name="categories" value="' + esc(cat.id) + '"' + ((p.categories || []).includes(cat.id) ? " checked" : "") + "><span>" + esc(cat.short) + "</span></label>").join("") + "</div></div>" +
      "</fieldset>" +
      "<fieldset><legend>المحتوى</legend>" +
      field("وصف مختصر", area("summary", p.summary, 2)) +
      field("قصة المكان", area("story", (p.story || []).join("\n\n"), 7), "افصل الفقرات بسطر فارغ") +
      field("ما الذي يميزه", area("highlights", (p.highlights || []).join("\n"), 4), "عنصر في كل سطر") +
      field("نصيحة تصوير", area("photoTip", p.photoTip, 2)) +
      "</fieldset>" +
      "<fieldset><legend>معلومات الزيارة (اتركها فارغة إن لم تكن موثقة)</legend>" +
      field("طريقة الوصول / الموقع", area("access", v.access, 2)) +
      '<div class="row2">' + field("حالة الزيارة", select("status", [["", "غير معروفة"], ["open", "مفتوح للزوار"], ["closed", "مغلق حاليًا"], ["seasonal", "موسمي"], ["restoration", "تحت الترميم"]], v.status)) +
      field("ساعات الزيارة (نص)", input("hours", v.hours && v.hours.text)) + "</div>" +
      field("جدول الساعات لفلتر «مفتوح الآن»", area("schedule", v.hours && v.hours.schedule ? JSON.stringify(v.hours.schedule) : "", 2), 'JSON اختياري، مثال: {"0":[["16:00","23:00"]]} حيث 0 = الأحد') +
      '<div class="row2">' + field("الرسوم", select("feeType", [["", "غير معروفة"], ["free", "مجاني"], ["paid", "مدفوع"]], v.fee && v.fee.type)) +
      field("ملاحظة الرسوم", input("feeNote", v.fee && v.fee.note)) + "</div>" +
      '<div class="row2">' + field("موقف السيارات", input("parking", v.parking)) + field("إمكانية الوصول لذوي الإعاقة", input("accessibility", v.accessibility)) + "</div>" +
      field("المرافق المؤكدة", area("facilities", (p.facilities || []).join("\n"), 3), "عنصر في كل سطر") +
      field("مدة الزيارة المقترحة بالدقائق (تقدير)", input("suggestedMinutes", p.suggestedMinutes, "number")) +
      "</fieldset>" +
      "<fieldset><legend>الموقع الجغرافي</legend>" +
      '<p class="note">لا تُدخل إحداثيات دون رابط مصدر يمكن التحقق منه (مثل عنصر OpenStreetMap).</p>' +
      '<div class="row2">' + field("خط العرض", input("lat", c.lat, "number")) + field("خط الطول", input("lng", c.lng, "number")) + "</div>" +
      '<div class="row2">' + field("الدقة", select("precision", [["point", "نقطة محددة"], ["area", "مركز منطقة"]], c.precision || "point")) + field("رابط مصدر الإحداثيات", input("coordSource", c.source, "url")) + "</div>" +
      field("نص البحث في الخرائط", input("mapsQuery", p.mapsQuery), "يُستخدم لرابط البحث عند غياب الإحداثيات") +
      "</fieldset>" +
      "<fieldset><legend>الصور والمصادر</legend>" +
      field("الصور", area("images", (p.images || []).map(imgToLine).join("\n"), 5), "سطر لكل صورة: اسم ملف كومنز | النص البديل | التعليق — أو: https://رابط | النص البديل | التعليق | جهة الحقوق") +
      field("المصادر", area("sources", (p.sources || []).join("\n"), 3), "مفتاح مصدر معرّف (" + Object.keys(work.sources).join("، ") + ") أو رابط كامل، سطر لكل مصدر") +
      "</fieldset>" +
      "<fieldset><legend>المراجعة</legend>" +
      field("حالة البيانات", select("review", [["verified", "بيانات مراجعة"], ["partial", "بيانات جزئية"], ["needs-review", "يحتاج إلى تحقق"]], p.review || "needs-review")) +
      field("ما الذي يحتاج إلى تحقق", area("reviewNote", p.reviewNote, 2)) +
      "</fieldset>" +
      '<div id="form-errors" role="alert"></div>' +
      '<div class="chips"><button type="submit" class="btn btn--primary">حفظ</button>' +
      '<a class="btn btn--line" href="place.html?id=' + encodeURIComponent(p.id) + '" target="_blank" rel="noopener">معاينة الصفحة</a>' +
      '<button type="button" class="btn btn--line" id="del" style="color:#a3341c">حذف المعلم</button></div>';
  };

  const collect = (f, old) => {
    const g = (n) => (f.elements[n] ? f.elements[n].value : "");
    const errors = [];
    const id = g("id").trim();
    if (!/^[a-z0-9-]+$/.test(id)) errors.push("المعرّف يجب أن يتكون من أحرف لاتينية صغيرة وأرقام وشرطات.");
    if (work.places.some((x) => x.id === id && x !== old)) errors.push("المعرّف مستخدم لمعلم آخر.");
    if (!g("name").trim()) errors.push("الاسم بالعربية مطلوب.");
    if (!g("summary").trim()) errors.push("الوصف المختصر مطلوب.");
    let coords = null;
    const lat = g("lat").trim(), lng = g("lng").trim();
    if (lat || lng) {
      const la = Number(lat), ln = Number(lng);
      if (!isFinite(la) || !isFinite(ln)) errors.push("الإحداثيات غير صالحة.");
      else if (la < 23.3 || la > 25.2 || ln < 37.3 || ln > 39.3) errors.push("الإحداثيات خارج نطاق محافظة ينبع التقريبي؛ راجعها.");
      if (!R.safeUrl(g("coordSource"))) errors.push("أضف رابط مصدر صالحًا للإحداثيات.");
      coords = { lat: la, lng: ln, precision: g("precision"), verified: true, source: g("coordSource").trim() };
    }
    let schedule = null;
    if (g("schedule").trim()) {
      try { schedule = JSON.parse(g("schedule")); } catch (e) { errors.push("جدول الساعات ليس JSON صالحًا."); }
    }
    const images = lines(g("images")).map(lineToImg);
    images.forEach((im) => { if (im.src && !R.safeUrl(im.src)) errors.push("رابط صورة غير صالح: " + im.src); });
    const sources = lines(g("sources"));
    sources.forEach((s) => { if (!work.sources[s] && !R.safeUrl(s)) errors.push("مصدر غير معروف: " + s); });
    const feeType = g("feeType");
    const hoursText = nullIf(g("hours"));
    const p = Object.assign({}, old, {
      id,
      name: g("name").trim(),
      nameEn: g("nameEn").trim(),
      zone: g("zone"),
      type: g("type"),
      kind: g("kind"),
      parent: g("parent") || undefined,
      categories: $$('input[name="categories"]:checked', f).map((i) => i.value),
      summary: g("summary").trim(),
      story: paras(g("story")),
      highlights: lines(g("highlights")),
      photoTip: nullIf(g("photoTip")) || undefined,
      facilities: lines(g("facilities")),
      suggestedMinutes: Number(g("suggestedMinutes")) || null,
      visit: {
        status: g("status") || null,
        hours: hoursText || schedule ? { text: hoursText || "", schedule: schedule || undefined } : null,
        fee: feeType ? { type: feeType, note: g("feeNote").trim() } : null,
        parking: nullIf(g("parking")),
        accessibility: nullIf(g("accessibility")),
        access: nullIf(g("access"))
      },
      coords,
      mapsQuery: g("mapsQuery").trim(),
      images,
      sources,
      review: g("review"),
      reviewNote: nullIf(g("reviewNote")) || undefined
    });
    if (!p.categories.length) errors.push("اختر فئة واحدة على الأقل.");
    return { p, errors };
  };

  $("#admin-list").addEventListener("click", (e) => {
    const b = e.target.closest("[data-id]");
    if (!b) return;
    currentId = b.dataset.id;
    drawList();
    drawForm(work.places.find((x) => x.id === currentId));
  });
  $("#admin-q").addEventListener("input", drawList);

  $("#admin-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const old = work.places.find((x) => x.id === currentId);
    const { p, errors } = collect(e.target, old);
    if (errors.length) {
      $("#form-errors").innerHTML = '<div class="review-note"><b>تعذر الحفظ:</b><ul style="margin:6px 0 0">' + errors.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul></div>";
      return;
    }
    const idx = work.places.indexOf(old);
    if (idx >= 0) work.places[idx] = p; else work.places.push(p);
    if (old && old.id !== p.id) {
      work.places.forEach((x) => { if (x.parent === old.id) x.parent = p.id; });
      work.trips.forEach((t) => { t.stops = t.stops.map((s) => (s === old.id ? p.id : s)); });
    }
    currentId = p.id;
    if (persist()) R.toast("حُفظ المعلم — يظهر الآن في المعاينة");
    drawList();
    drawForm(p);
  });

  $("#admin-form").addEventListener("click", (e) => {
    if (!e.target.closest("#del")) return;
    const p = work.places.find((x) => x.id === currentId);
    if (!p || !confirm("حذف «" + p.name + "» من نسخة العمل؟ يمكنك التراجع بتجاهل التعديلات المحلية ما لم تُصدّر.")) return;
    work.places = work.places.filter((x) => x !== p);
    work.places.forEach((x) => { if (x.parent === p.id) delete x.parent; });
    work.trips.forEach((t) => { t.stops = t.stops.filter((s) => s !== p.id); });
    currentId = null;
    persist();
    drawList();
    drawForm(null);
    R.toast("حُذف المعلم");
  });

  $("#new-place").addEventListener("click", () => {
    let n = 1;
    while (work.places.some((x) => x.id === "new-place-" + n)) n++;
    const p = { id: "new-place-" + n, name: "معلم جديد", nameEn: "", zone: work.zones[0].id, type: "heritage", kind: "historic", categories: [], summary: "", story: [], highlights: [], visit: {}, coords: null, images: [], sources: [], review: "needs-review" };
    currentId = null;
    drawList();
    drawForm(p);
    $("#admin-form").elements.name.focus();
  });

  const download = (name, text, type) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };
  $("#export-js").addEventListener("click", () => {
    work.version = new Date().toISOString().slice(0, 10);
    download("data.js", "/* روح ينبع — بيانات المحتوى (مُصدّرة من لوحة الإدارة) */\nwindow.ROOH_DATA = " + JSON.stringify(work, null, 2) + ";\n", "text/javascript");
  });
  $("#export-json").addEventListener("click", () => download("rooh-yanbu-data.json", JSON.stringify(work, null, 2), "application/json"));
  $("#import-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    file.text().then((t) => {
      const d = JSON.parse(t);
      if (!d || !Array.isArray(d.places) || !Array.isArray(d.zones) || !d.sources) throw new Error("shape");
      work = d;
      persist();
      currentId = null;
      drawList();
      drawForm(null);
      R.toast("تم الاستيراد");
    }).catch(() => R.toast("ملف غير صالح"));
    e.target.value = "";
  });
  $("#discard").addEventListener("click", () => {
    if (!confirm("تجاهل كل التعديلات المحلية والعودة إلى البيانات المنشورة؟")) return;
    localStorage.removeItem(R.OVERRIDE_KEY);
    location.reload();
  });

  drawList();
  drawForm(null);
});
