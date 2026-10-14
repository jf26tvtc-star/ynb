document.addEventListener("DOMContentLoaded", () => {
  const { esc, $ } = R;
  const ps = R.places();
  const n = (f) => ps.filter(f).length.toLocaleString("ar-SA");
  $("#stats").innerHTML =
    "<div><b>" + ps.length.toLocaleString("ar-SA") + "</b>معلمًا وتجربة في الدليل</div>" +
    "<div><b>" + n((p) => p.coords) + "</b>بإحداثيات مؤكدة على الخريطة</div>" +
    "<div><b>" + n((p) => p.images && p.images.length) + "</b>بصور حقيقية موثقة</div>" +
    "<div><b>" + n((p) => p.review === "needs-review") + "</b>تحتاج إلى تحقق</div>";
  $("#sources-list").innerHTML = Object.values(R.data().sources).map((s) =>
    '<li><a href="' + esc(R.safeUrl(s.url)) + '" target="_blank" rel="noopener">' + esc(s.title) + "</a></li>").join("");
});
