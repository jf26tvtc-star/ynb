/* الخريطة التفاعلية */
document.addEventListener("DOMContentLoaded", () => {
  const { esc, $, $$, icon } = R;
  const D = R.data();
  const all = R.places();
  const mapped = all.filter((p) => p.coords);
  const types = Object.keys(D.types).filter((t) => mapped.some((p) => p.type === t));

  const state = {
    zone: R.params.get("zone") || "",
    types: new Set(types),
    favOnly: R.params.get("fav") === "1"
  };

  $("#zone-btns").innerHTML = [["", "كل ينبع"]].concat(D.zones.map((z) => [z.id, z.name])).map((z) =>
    '<button type="button" class="chip" data-zone="' + z[0] + '" aria-pressed="' + (state.zone === z[0]) + '">' + esc(z[1]) + "</button>").join("");
  $("#type-filters").innerHTML = types.map((t) => {
    const n = mapped.filter((p) => p.type === t).length;
    return '<label class="chip chip--sm"><input type="checkbox" value="' + t + '" checked><span>' + esc(D.types[t]) + " (" + n.toLocaleString("ar-SA") + ")</span></label>";
  }).join("");
  $("#fav-only").checked = state.favOnly;

  const unv = all.filter((p) => !p.coords);
  $("#unverified").innerHTML = "<h2>مواقع بلا علامة (" + unv.length.toLocaleString("ar-SA") + ")</h2>" +
    '<p class="muted" style="font-size:.85rem">إحداثياتها تحتاج إلى تحقق، لذلك لم نضعها على الخريطة. يمكنك البحث عنها في خرائط Google.</p>' +
    '<ul class="map-list">' + unv.map((p) =>
      '<li><a class="row" href="' + R.directions(p) + '" target="_blank" rel="noopener"><span class="pin pin--' + p.zone + ' pin--area" style="width:30px;height:30px">' + icon(p.type) + "</span><span>" + esc(p.name) + "<small>" + esc(R.zone(p.zone).name) + " · بحث في خرائط Google</small></span></a></li>").join("") + "</ul>";

  const visible = () => {
    const favs = R.fav.list();
    return mapped.filter((p) => (!state.zone || p.zone === state.zone) && state.types.has(p.type) && (!state.favOnly || favs.includes(p.id)));
  };

  R.loadLeaflet().then((L) => {
    const el = $("#map");
    el.innerHTML = "";
    el.setAttribute("dir", "ltr");
    const map = L.map(el, { zoomControl: true });
    R.baseLayer(L).addTo(map);
    map.setView([24.12, 38.2], 10);
    const markers = {};
    mapped.forEach((p) => {
      const m = L.marker([p.coords.lat, p.coords.lng], { icon: R.pinIcon(L, p), title: p.name, alt: p.name, keyboard: true });
      const img = p.images && p.images[0];
      m.bindPopup(
        '<div dir="rtl" class="popup">' + (img ? '<div class="media">' + R.imgTag(img, { w: 480, sizes: "240px" }) + "</div>" : "") +
        "<b>" + esc(p.name) + "</b><small>" + esc(R.zone(p.zone).name) + " · " + esc(R.typeName(p.type)) +
        (p.coords.precision === "area" ? " · نقطة مركز المنطقة" : "") + "</small><p>" + esc(p.summary) + "</p>" +
        '<div class="pop-actions"><a class="primary" href="' + R.placeUrl(p) + '">التفاصيل</a>' +
        '<a href="' + R.directions(p) + '" target="_blank" rel="noopener">الاتجاهات</a>' +
        '<button type="button" data-near="' + esc(p.id) + '">القريب منه</button>' +
        '<button type="button" data-fav="' + esc(p.id) + '" aria-pressed="' + R.fav.has(p.id) + '">' + (R.fav.has(p.id) ? "في المفضلة" : "احفظ") + "</button></div></div>",
        { maxWidth: 280, minWidth: 240 }
      );
      m.on("popupopen", () => { setActive(p.id); R.syncFavButtons(); });
      markers[p.id] = m;
    });
    const layer = L.layerGroup().addTo(map);

    const setActive = (id) => $$("#map-list button").forEach((b) => b.classList.toggle("is-active", b.dataset.id === id));

    const draw = (fit) => {
      layer.clearLayers();
      const list = visible();
      list.forEach((p) => layer.addLayer(markers[p.id]));
      $("#map-list").innerHTML = list.length
        ? list.map((p) => '<li><button type="button" data-id="' + esc(p.id) + '"><span class="pin pin--' + p.zone + (p.coords.precision === "area" ? " pin--area" : "") + '" style="width:30px;height:30px">' + icon(p.type) + "</span><span>" + esc(p.name) + "<small>" + esc(R.zone(p.zone).name) + " · " + esc(R.typeName(p.type)) + "</small></span></button></li>").join("")
        : '<li class="empty-state" style="padding:24px">' + (state.favOnly ? "لا توجد أماكن محفوظة بإحداثيات مؤكدة ضمن هذه التصفية." : "لا توجد مواقع مطابقة. غيّر التصفية.") + "</li>";
      if (fit && list.length) {
        if (list.length === 1) map.setView([list[0].coords.lat, list[0].coords.lng], 14);
        else map.fitBounds(list.map((p) => [p.coords.lat, p.coords.lng]), { padding: [50, 50], maxZoom: 14 });
      } else if (fit && state.zone) {
        const z = R.zone(state.zone);
        map.setView(z.center, z.zoom);
      }
    };

    const showNear = (id) => {
      const p = R.place(id);
      const near = R.nearby(p, 5).filter((r) => r.basis !== "zone");
      $("#near-panel").innerHTML = '<div class="panel"><h2 style="font-size:1rem">القريب من «' + esc(p.name) + '»</h2>' +
        (near.length ? '<ul class="map-list">' + near.map((r) =>
          '<li><a class="row" href="' + R.placeUrl(r.p) + '"><span class="pin pin--' + r.p.zone + '" style="width:30px;height:30px">' + icon(r.p.type) + "</span><span>" + esc(r.p.name) + "<small>" + esc(R.nearbyLabel(r)) + "</small></span></a></li>").join("") + "</ul>" : "<p class=\"muted\">لا توجد مواقع أخرى بإحداثيات مؤكدة.</p>") +
        '<p class="note" style="margin-top:8px">' + icon("info") + "<span>المسافة خط مستقيم بين نقاط موثقة، وليست مسافة الطريق.</span></p>" +
        '<button type="button" class="btn btn--line btn--sm" data-close-near>إغلاق</button></div>';
      $("#near-panel").scrollIntoView({ behavior: R.reducedMotion ? "auto" : "smooth", block: "nearest" });
    };

    $("#zone-btns").addEventListener("click", (e) => {
      const b = e.target.closest("[data-zone]");
      if (!b) return;
      state.zone = b.dataset.zone;
      $$("#zone-btns [data-zone]").forEach((x) => x.setAttribute("aria-pressed", x === b));
      draw(true);
    });
    $("#type-filters").addEventListener("change", () => {
      state.types = new Set($$("#type-filters input:checked").map((i) => i.value));
      draw(false);
    });
    $("#fav-only").addEventListener("change", (e) => { state.favOnly = e.target.checked; draw(true); });
    $("#map-list").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-id]");
      if (!b) return;
      const p = R.place(b.dataset.id);
      map.setView([p.coords.lat, p.coords.lng], p.coords.precision === "area" ? 12 : 15);
      markers[p.id].openPopup();
      if (window.innerWidth < 900) el.scrollIntoView({ behavior: R.reducedMotion ? "auto" : "smooth" });
    });
    document.addEventListener("click", (e) => {
      const n = e.target.closest("[data-near]");
      if (n) showNear(n.dataset.near);
      if (e.target.closest("[data-close-near]")) $("#near-panel").innerHTML = "";
    });
    document.addEventListener("favchange", () => {
      $$(".popup [data-fav]").forEach((b) => { b.textContent = R.fav.has(b.dataset.fav) ? "في المفضلة" : "احفظ"; });
      if (state.favOnly) draw(false);
    });

    draw(true);
    const focusId = R.params.get("place");
    if (focusId && markers[focusId]) {
      const p = R.place(focusId);
      map.setView([p.coords.lat, p.coords.lng], 15);
      markers[focusId].openPopup();
    }
  }).catch(() => {
    $("#map").innerHTML = '<div class="map-empty">' + icon("map") + "<p>تعذر تحميل الخريطة. تحقق من اتصالك بالإنترنت ثم أعد المحاولة.<br>ما زالت روابط الاتجاهات في القائمة تعمل.</p></div>";
    $("#map-list").innerHTML = mapped.map((p) => '<li><a class="row" href="' + R.directions(p) + '" target="_blank" rel="noopener"><span class="pin pin--' + p.zone + '" style="width:30px;height:30px">' + icon(p.type) + "</span><span>" + esc(p.name) + "<small>فتح الاتجاهات</small></span></a></li>").join("");
  });
});
