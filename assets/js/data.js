/*
 * روح ينبع — بيانات المحتوى
 * لإضافة معلم: انسخ كائنًا من places وعدّل حقوله، أو استخدم admin.html ثم صدّر الملف.
 * القاعدة: أي معلومة غير موثقة تبقى null وتظهر للزائر بوصفها "تحتاج إلى تحقق".
 * الإحداثيات المؤكدة مأخوذة من OpenStreetMap (Nominatim) بتاريخ 2026-10-14 مع رابط العنصر.
 * الصور من Wikimedia Commons وتُعرض مع رابط صفحة الملف (الترخيص مذكور هناك).
 */
window.ROOH_DATA = {
  version: "2026-10-14",

  zones: [
    {
      id: "bahr",
      name: "ينبع البحر",
      nameEn: "Yanbu Al-Bahr",
      page: "bahr.html",
      title: "ينبع البحر | حكاية الساحل والتاريخ",
      tagline: "حيث يحكي البحر قصص الماضي.",
      intro: "قلب ينبع القديم على ساحل البحر الأحمر: بيوت من الحجر المرجاني ورواشين خشبية، وسوق للسمك، وشرمٌ ذكره المؤرخون الإغريق، وميناء ظل بوابة المدينة المنورة البحرية.",
      center: [24.0789548, 38.0599286],
      zoom: 13,
      cover: { file: "Traditional_architecture_in_old_Yanbu,_Saudi_Arabia_(9).jpg", alt: "واجهات بيوت تراثية في ينبع القديمة" }
    },
    {
      id: "nakhl",
      name: "ينبع النخل",
      nameEn: "Yanbu Al-Nakhl",
      page: "nakhl.html",
      title: "ينبع النخل | ذاكرة الأرض وأصالة المكان",
      tagline: "أصالة الأرض وذاكرة القرى.",
      intro: "منطقة زراعية مستقلة تبعد نحو 47 كيلومترًا عن المدينة، تتوزع فيها القرى بين بساتين النخيل، وتطل عليها جبال رضوى، وتحتفظ بأطلال أسواق ومساجد قديمة وعيون ارتبطت بها الحياة.",
      center: [24.3280262, 38.4285526],
      zoom: 12,
      cover: { file: "General_view_of_Yanbu_al-Nakhl,_Saudi_Arabia_(1).jpg", alt: "منظر عام لينبع النخل" }
    },
    {
      id: "sinaiyah",
      name: "ينبع الصناعية",
      nameEn: "Yanbu Al-Sinaiyah",
      page: "sinaiyah.html",
      title: "ينبع الصناعية | حيث يلتقي البحر بالحياة الحديثة",
      tagline: "بحر جميل، ومساحات للحياة والاسترخاء.",
      intro: "المدينة الحديثة التي أُسست عام 1975 بأمر ملكي، وتديرها الهيئة الملكية. حيّها السكني منظم وأكثر خضرة، وواجهتها البحرية وبحيرتها ومهرجان زهورها وجهات للاسترخاء والعائلة.",
      center: [23.9988327, 38.2028069],
      zoom: 12,
      cover: { file: "ينبع_الصناعية.JPG", alt: "منظر من ينبع الصناعية" }
    }
  ],

  categories: [
    { id: "heritage", name: "أماكن تراثية وتاريخية", short: "تراث وتاريخ", kind: "historic" },
    { id: "beaches", name: "شواطئ وبحر", short: "شواطئ", kind: "natural" },
    { id: "nature", name: "طبيعة ونخيل", short: "طبيعة", kind: "natural" },
    { id: "family", name: "أماكن مناسبة للعائلات", short: "للعائلات", kind: null },
    { id: "friends", name: "أماكن للأصدقاء", short: "للأصدقاء", kind: null },
    { id: "photo", name: "مواقع للتصوير", short: "تصوير", kind: null },
    { id: "marine", name: "مغامرات وأنشطة بحرية", short: "أنشطة بحرية", kind: "recreational" },
    { id: "markets", name: "أسواق وتجارب محلية", short: "أسواق", kind: "historic" },
    { id: "parks", name: "حدائق ومتنزهات", short: "حدائق", kind: "recreational" }
  ],

  kinds: [
    { id: "historic", name: "تاريخي" },
    { id: "natural", name: "طبيعي" },
    { id: "recreational", name: "ترفيهي" }
  ],

  // type = شكل صفحة التفاصيل وأيقونة الخريطة
  types: {
    heritage: "معلم تراثي",
    market: "سوق",
    beach: "شاطئ وبحر",
    park: "حديقة ومتنزه",
    village: "قرية وطبيعة",
    experience: "تجربة",
    event: "فعالية موسمية"
  },

  sources: {
    wikiYanbu: { title: "ويكيبيديا — Yanbu (الإنجليزية)", url: "https://en.wikipedia.org/wiki/Yanbu" },
    commons: { title: "ويكيميديا كومنز — تصنيف ينبع", url: "https://commons.wikimedia.org/wiki/Category:Yanbu" },
    telegraph: { title: "The Telegraph (2020) — ترميم بيت لورنس في ينبع", url: "https://www.telegraph.co.uk/news/2020/09/03/lawrence-arabias-saudi-home-restored-tourist-attraction-decades/" },
    arabnewsFlower: { title: "Arab News — Yanbu Flower and Garden Festival", url: "https://www.arabnews.com/tags/yanbu-flower-and-garden-festival" },
    ancientPorts: { title: "Ancient Ports Antiques — Sharm Yanbu", url: "https://www.ancientportsantiques.com/a-few-ports/sharm-yanbu/" },
    visitSaudi: { title: "روح السعودية — الموقع الرسمي للسياحة", url: "https://www.visitsaudi.com/" },
    heritage: { title: "هيئة التراث", url: "https://heritage.moc.gov.sa/" },
    rcjy: { title: "الهيئة الملكية للجبيل وينبع", url: "https://www.rcjy.gov.sa/" },
    spa: { title: "وكالة الأنباء السعودية", url: "https://www.spa.gov.sa/" },
    osm: { title: "OpenStreetMap", url: "https://www.openstreetmap.org/" }
  },

  places: [
    /* ───────────── ينبع البحر ───────────── */
    {
      id: "yanbu-historic-area",
      name: "المنطقة التاريخية في ينبع (حي الصور)",
      nameEn: "Yanbu Historic Area (Al-Sur)",
      zone: "bahr",
      type: "heritage",
      kind: "historic",
      categories: ["heritage", "markets", "photo", "family", "friends"],
      summary: "قلب ينبع القديم، حيث البيوت المبنية بالحجر المرجاني والرواشين الخشبية، والأزقة التي عاشت على إيقاع الميناء والتجارة.",
      story: [
        "قبل أن تمتد ينبع شرقًا وجنوبًا، كانت المدينة هنا: أزقة ضيقة متعرجة تقترب من الماء، وبيوت متلاصقة تحمي ساكنيها من الشمس وتلتقط نسيم البحر عبر الرواشين الخشبية.",
        "ظلت ينبع لقرون الميناء البحري الأقرب إلى المدينة المنورة، ومرّ بها الحجاج والتجار والبضائع. وفي هذا الحي تتجسد تلك الذاكرة: المسجد والسوق والبيت والميناء في مسافة يقطعها الماشي على قدميه.",
        "تعمل الجهات المختصة على تأهيل المنطقة التاريخية، وما يزال بعض مبانيها بحاجة إلى ترميم؛ لذلك يرى الزائر اليوم مزيجًا من الواجهات المرممة والمباني التي تحكي أثر الزمن."
      ],
      highlights: [
        "الرواشين والمشربيات الخشبية على الواجهات",
        "البناء بالحجر المرجاني المستخرج من الساحل",
        "الأزقة المتعرجة التي تربط البيوت بالسوق والبحر",
        "مسجد السنوسي وبيت لورنس ضمن النسيج التاريخي"
      ],
      architecture: [
        { title: "الحجر المرجاني", text: "مادة البناء الساحلية التقليدية في مدن الحجاز المطلة على البحر الأحمر، تمنح الجدران ملمسها المسامي ولونها الفاتح." },
        { title: "الرواشين", text: "شرفات خشبية مغلقة بشبك دقيق تسمح بمرور الهواء والضوء وتحفظ الخصوصية." },
        { title: "النسيج المتلاصق", text: "تقارب البيوت يصنع ظلًا دائمًا في الأزقة ويكسر حرارة الشمس." }
      ],
      timeline: [
        { label: "منذ نحو 2500 عام", text: "محطة على طريق البخور والتوابل بين اليمن ومصر والمتوسط.", source: "wikiYanbu" },
        { label: "1916", text: "استسلام الحامية العثمانية في ينبع لقوات الثورة العربية في 27 يوليو، وتحولها إلى قاعدة إمداد خلال الحرب العالمية الأولى.", source: "wikiYanbu" },
        { label: "1975", text: "اختيار ينبع مركزًا صناعيًا جديدًا، وبدء تحول المدينة من ميناء صغير إلى مدينة كبرى.", source: "wikiYanbu" }
      ],
      visit: {
        status: null,
        hours: null,
        fee: null,
        parking: null,
        accessibility: null,
        access: "تقع في وسط ينبع البحر (البلد) قرب الساحل. استخدم رابط الاتجاهات للوصول إلى النقطة المسجلة في OpenStreetMap."
      },
      suggestedMinutes: 90,
      coords: { lat: 24.0789548, lng: 38.0599286, precision: "point", verified: true, source: "https://www.openstreetmap.org/way/1162769519" },
      mapsQuery: "Yanbu Historic Area",
      images: [
        { file: "Traditional_architecture_in_old_Yanbu,_Saudi_Arabia_(9).jpg", alt: "عمارة تقليدية في ينبع القديمة", caption: "عمارة تقليدية في ينبع القديمة" },
        { file: "Traditional_architecture_in_old_Yanbu,_Saudi_Arabia.jpg", alt: "بيت تراثي بواجهة خشبية في ينبع القديمة", caption: "تفاصيل الواجهات التراثية" },
        { file: "Traditional_architecture_in_old_Yanbu,_Saudi_Arabia_(4).jpg", alt: "زقاق ومبان قديمة في ينبع", caption: "من أزقة ينبع القديمة" },
        { file: "Traditional_architecture_in_old_Yanbu,_Saudi_Arabia_(5).jpg", alt: "مبنى تاريخي في ينبع القديمة", caption: "أثر الزمن على الحجر" },
        { file: "Traditional_architecture_in_old_Yanbu,_Saudi_Arabia_(10).jpg", alt: "واجهة تاريخية في ينبع", caption: "واجهة تاريخية" },
        { file: "Yanbu_city.jpg", alt: "بيوت قديمة تقليدية في مدينة ينبع", caption: "بيوت تقليدية قديمة في ينبع" }
      ],
      photoTip: "الأزقة الضيقة تمنح إطارات طبيعية للصورة. نصيحة عامة: الضوء المائل في الصباح الباكر أو قبيل الغروب يبرز ملمس الحجر المرجاني.",
      sources: ["wikiYanbu", "commons", "osm", "heritage"],
      review: "partial",
      reviewNote: "ساعات الزيارة وحالة المباني المفتوحة للزوار تحتاج إلى تأكيد من هيئة التراث."
    },
    {
      id: "souq-al-lail",
      name: "سوق الليل",
      nameEn: "Souq Al-Lail",
      zone: "bahr",
      type: "market",
      kind: "historic",
      parent: "yanbu-historic-area",
      categories: ["markets", "heritage", "friends"],
      summary: "من أسواق المنطقة التاريخية في ينبع البحر، ويرد اسمه ضمن معالمها في التعريفات السياحية.",
      story: [
        "يرتبط سوق الليل بالمنطقة التاريخية في ينبع البحر، وهو من الأسماء المتداولة عند الحديث عن تراث المدينة التجاري.",
        "لم نعتمد بعد مصدرًا موثقًا لتاريخ السوق ونشأة تسميته وحالته الحالية؛ لذلك نكتفي هنا بالتعريف المكاني، وستُضاف قصته عند توثيقها من هيئة التراث أو مصدر تاريخي معتمد."
      ],
      highlights: ["جزء من النسيج التجاري للمنطقة التاريخية"],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "ضمن المنطقة التاريخية في ينبع البحر. لم نتحقق بعد من إحداثياته الدقيقة." },
      suggestedMinutes: 45,
      coords: null,
      mapsQuery: "سوق الليل ينبع",
      images: [],
      art: "heritage",
      sources: ["heritage", "visitSaudi"],
      review: "needs-review",
      reviewNote: "الإحداثيات الدقيقة والتاريخ وحالة التشغيل تحتاج إلى تحقق."
    },
    {
      id: "lawrence-house",
      name: "بيت لورنس",
      nameEn: "Lawrence House",
      zone: "bahr",
      type: "heritage",
      kind: "historic",
      parent: "yanbu-historic-area",
      categories: ["heritage", "photo"],
      summary: "البيت الذي أقام فيه الضابط البريطاني ت. إ. لورنس في ينبع خلال الحرب العالمية الأولى، وأُعلن عام 2020 عن خطة لترميمه معلمًا ثقافيًا.",
      story: [
        "خلال الحرب العالمية الأولى كانت ينبع قاعدة إمداد وعمليات للقوات العربية والبريطانية في مواجهة الدولة العثمانية، وأقام فيها الضابط البريطاني ت. إ. لورنس.",
        "في عام 2020 أعلنت وزارة السياحة عن خطة لترميم مسكنه السابق في ينبع ليصبح معلمًا ثقافيًا وسياحيًا، بعد عقود من الإهمال."
      ],
      highlights: ["مبنى تاريخي من عمارة ينبع القديمة", "ارتباطه بأحداث الثورة العربية 1916–1918"],
      timeline: [
        { label: "1916–1918", text: "ينبع قاعدة إمداد للقوات العربية والبريطانية خلال الحرب العالمية الأولى.", source: "wikiYanbu" },
        { label: "2020", text: "الإعلان عن خطة ترميم البيت ليكون معلمًا ثقافيًا.", source: "telegraph" }
      ],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "في ينبع البحر ضمن النطاق التاريخي. إمكانية الدخول إلى المبنى غير مؤكدة." },
      suggestedMinutes: 30,
      coords: null,
      mapsQuery: "بيت لورنس ينبع",
      images: [
        { file: "House_of_Lawrence_of_Arabia_1915-16_in_Yanbu,_Saudi_Arabia_(2).jpg", alt: "واجهة بيت لورنس في ينبع", caption: "بيت لورنس في ينبع" },
        { file: "House_of_Lawrence_of_Arabia_1915-16_in_Yanbu,_Saudi_Arabia_(3).jpg", alt: "تفاصيل بيت لورنس في ينبع", caption: "تفاصيل الواجهة" }
      ],
      sources: ["wikiYanbu", "telegraph", "commons"],
      review: "partial",
      reviewNote: "حالة الترميم الحالية وإمكانية الدخول والإحداثيات تحتاج إلى تحقق."
    },
    {
      id: "al-sanusi-mosque",
      name: "مسجد السنوسي",
      nameEn: "Al-Sanusi Mosque",
      zone: "bahr",
      type: "heritage",
      kind: "historic",
      parent: "yanbu-historic-area",
      categories: ["heritage", "photo"],
      summary: "مسجد تاريخي في ينبع القديمة، يذكر وصف صورته في ويكيميديا كومنز أنه بُني في الأصل عام 1838م.",
      story: [
        "يقف مسجد السنوسي شاهدًا على الحياة الدينية والاجتماعية في ينبع القديمة، حيث كان المسجد مركز الحي ومحور يومه.",
        "تشير بيانات صورته المنشورة في ويكيميديا كومنز إلى أنه بُني في الأصل عام 1838م. نعرض هذا التاريخ كما ورد، إلى حين توثيقه من هيئة التراث."
      ],
      highlights: ["عمارة مسجد تقليدي في النسيج التاريخي"],
      timeline: [{ label: "1838م", text: "تاريخ البناء الأصلي بحسب وصف ملف الصورة في كومنز (يحتاج إلى توثيق رسمي).", source: "commons" }],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "في ينبع البحر. يُرجى مراعاة أوقات الصلاة وآداب المساجد." },
      suggestedMinutes: 20,
      coords: null,
      mapsQuery: "مسجد السنوسي ينبع",
      images: [{ file: "Al-Sanusi_Mosque,_originally_built_in_1838;_Yanbu,_Saudi_Arabia.jpg", alt: "مسجد السنوسي في ينبع", caption: "مسجد السنوسي" }],
      sources: ["commons", "heritage"],
      review: "needs-review",
      reviewNote: "تاريخ البناء مأخوذ من وصف ملف الصورة فقط، والإحداثيات غير مؤكدة."
    },
    {
      id: "yanbu-fish-market",
      name: "سوق السمك المركزي",
      nameEn: "Yanbu Fish Market",
      zone: "bahr",
      type: "market",
      kind: "recreational",
      categories: ["markets", "friends", "photo"],
      summary: "تجربة محلية حية على طريق الملك عبدالعزيز، حيث يلتقي صيد البحر الأحمر بأهل المدينة.",
      story: [
        "في مدينة عاشت على البحر، يبقى سوق السمك من أصدق الأماكن للتعرف على حياتها اليومية: أصوات المزايدة، وأنواع الأسماك المحلية، وحركة الصيادين والمشترين.",
        "السوق مسجل في OpenStreetMap باسم Fish Market على طريق الملك عبدالعزيز في حي الزهور، على مسافة قريبة من المنطقة التاريخية."
      ],
      highlights: ["تعرّف على أنواع أسماك البحر الأحمر", "قريب من المنطقة التاريخية"],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "طريق الملك عبدالعزيز، حي الزهور، ينبع البحر (وفق OpenStreetMap)." },
      suggestedMinutes: 40,
      coords: { lat: 24.0744077, lng: 38.0538455, precision: "point", verified: true, source: "https://www.openstreetmap.org/way/328537999" },
      mapsQuery: "Yanbu Fish Market",
      images: [{ file: "سوق_السمك_المركزي_-_panoramio.jpg", alt: "سوق السمك المركزي في ينبع", caption: "سوق السمك المركزي (صورة أرشيفية من Panoramio)" }],
      sources: ["osm", "commons"],
      review: "partial",
      reviewNote: "أوقات العمل غير موثقة، والصورة قديمة نسبيًا."
    },
    {
      id: "sharm-yanbu",
      name: "شرم ينبع وشاطئ الشرم",
      nameEn: "Sharm Yanbu",
      zone: "bahr",
      type: "beach",
      kind: "natural",
      categories: ["beaches", "photo", "family", "friends"],
      summary: "لسان بحري صغير شمال ينبع، عرفه الإغريق باسم «خرموثاس»، ويجاوره شاطئ الشرم بمياهه الفيروزية.",
      story: [
        "الشرم في لغة أهل الساحل خليجٌ صغير يتوغل فيه البحر في اليابسة. وشرم ينبع شبه جزيرة صغيرة إلى الشمال من المدينة.",
        "عُرف قديمًا باسم Charmuthas (خرموثاس)، وذكره المؤرخ الإغريقي ديودور الصقلي؛ أي أن هذا الساحل كان معروفًا للملاحين قبل أكثر من ألفي عام.",
        "اليوم يقصده الزوار للتنزه على الشاطئ ومشاهدة البحر. لا تتوفر لدينا معلومات موثقة عن المرافق أو الخدمات أو الأنشطة المنظمة فيه."
      ],
      highlights: ["مياه فيروزية وشاطئ رملي", "موقع ذكرته المصادر الإغريقية", "مناسب للتأمل ومشاهدة الأفق"],
      activities: [
        { name: "التنزه والاسترخاء على الشاطئ", verified: true },
        { name: "التصوير ومشاهدة الأفق", verified: true },
        { name: "السباحة", verified: false, note: "لم نتحقق من وجود منطقة سباحة آمنة أو منقذين." }
      ],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "شمال غرب ينبع البحر. النقطة على الخريطة تمثل شاطئ الشرم كما في OpenStreetMap." },
      suggestedMinutes: 90,
      coords: { lat: 24.131181, lng: 37.9604131, precision: "point", verified: true, source: "https://www.openstreetmap.org/relation/17581046" },
      mapsQuery: "Sharm Beach Yanbu",
      images: [
        { file: "Turquoise_Red_Sea_Waves_(3002926462).jpg", alt: "أمواج فيروزية على شاطئ في ينبع", caption: "شاطئ على البحر الأحمر بمياه فيروزية في ينبع (الموقع الدقيق للصورة غير محدد)" },
        { file: "Yanbu_Beach_1.jpg", alt: "شاطئ في ينبع", caption: "من شواطئ ينبع (الموقع الدقيق للصورة غير محدد)" }
      ],
      photoTip: "الساحل الغربي يستقبل الغروب فوق البحر مباشرة؛ اجعل الأفق في الثلث الأدنى من الإطار.",
      sources: ["wikiYanbu", "ancientPorts", "osm"],
      review: "partial",
      reviewNote: "الصور تمثل شواطئ ينبع عمومًا وليست مؤكدة لهذا الشاطئ تحديدًا؛ المرافق غير موثقة."
    },
    {
      id: "yanbu-reefs",
      name: "الغوص في شعاب ينبع المرجانية",
      nameEn: "Diving Yanbu's Reefs",
      zone: "bahr",
      type: "experience",
      kind: "recreational",
      categories: ["marine", "friends", "beaches"],
      summary: "ميناء ينبع الطبيعي تحميه من الجانبين شعاب مرجانية واسعة ما تزال في معظمها بكرًا، وتُعد من مناطق الغوص المعروفة.",
      story: [
        "تحت سطح البحر الأحمر قرب ينبع عالمٌ آخر: شعاب مرجانية واسعة تحمي المرفأ الطبيعي من الجانبين، وتصفها المصادر بأنها ما تزال في معظمها بكرًا وأنها من مناطق الغوص المعروفة.",
        "الغوص نشاط يحتاج إلى مزود مرخّص وقارب ومعدات وإشراف مدرب. لم نُدرج بعد أي مزود خدمة لأننا لم نتحقق من ترخيصه وبياناته؛ تحقق دائمًا من الترخيص قبل الحجز."
      ],
      highlights: ["شعاب مرجانية واسعة", "يحتاج إلى مزود مرخص — لا يمارس عشوائيًا من أي شاطئ"],
      activities: [
        { name: "الغوص بالأسطوانات", verified: false, note: "عبر مزود مرخّص فقط." },
        { name: "الغطس السطحي (سنوركل)", verified: false, note: "يعتمد على الموقع والمزود." }
      ],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "تنطلق الرحلات عادة بالقارب مع المزود؛ لا يوجد موقع واحد ثابت." },
      suggestedMinutes: 240,
      coords: null,
      mapsQuery: "Yanbu diving",
      images: [],
      art: "reef",
      sources: ["wikiYanbu"],
      review: "needs-review",
      reviewNote: "يلزم إضافة مزودي خدمة مرخصين ومواقع الغوص المعتمدة."
    },
    {
      id: "al-sur-visitor-center",
      name: "مركز زوار حي الصور التاريخي",
      nameEn: "Al-Sur Visitor Center",
      zone: "bahr",
      type: "heritage",
      kind: "historic",
      parent: "yanbu-historic-area",
      categories: ["heritage", "family"],
      summary: "مدرج للتحقق: نقطة تعريفية بالحي التاريخي ذُكرت ضمن المقترحات، ولم نتحقق بعد من وجودها وتشغيلها.",
      story: [
        "أدرجنا هذا المعلم بناء على طلب التغطية، لكننا لم نجد حتى الآن مصدرًا رسميًا نستطيع الاعتماد عليه لتأكيد موقعه وحالته وساعات عمله.",
        "قبل زيارتك، تحقق عبر القنوات الرسمية لهيئة التراث أو روح السعودية."
      ],
      highlights: [],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: null },
      suggestedMinutes: 30,
      coords: null,
      mapsQuery: "مركز زوار حي الصور ينبع",
      images: [],
      art: "heritage",
      sources: ["heritage", "visitSaudi"],
      review: "needs-review",
      reviewNote: "الوجود والموقع والتشغيل كلها غير مؤكدة."
    },

    /* ───────────── ينبع النخل ───────────── */
    {
      id: "nakhl-villages",
      name: "قرى ينبع النخل والجابرية",
      nameEn: "Yanbu Al-Nakhl Villages",
      zone: "nakhl",
      type: "village",
      kind: "natural",
      categories: ["nature", "heritage", "photo", "family"],
      summary: "قرى زراعية بين بساتين النخيل، أبرزها الجابرية حيث المركز الإداري للبلدة، وجبال رضوى حاضرة في الأفق من كل مكان.",
      story: [
        "على بعد نحو 47 كيلومترًا من المدينة، تتبدل ينبع تمامًا: يغيب البحر وتحضر الأرض. هنا تتوزع القرى بين بساتين النخيل التي منحت المنطقة اسمها.",
        "أبرز قرى ينبع النخل الجابرية، وفيها المكتب الحكومي المحلي للبلدة ومعظم خدماتها اليومية.",
        "وفي كل اتجاه تقريبًا يظهر جبل رضوى، الكتلة الجبلية التي ترافق نظر الزائر طوال الطريق بين القرى."
      ],
      highlights: ["بساتين النخيل الممتدة", "الجابرية: القرية الأبرز", "إطلالات جبل رضوى"],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "على بعد نحو 47 كم من ينبع البحر وفق ويكيبيديا. النقطة على الخريطة تمثل مركز منطقة ينبع النخل وليست قرية بعينها." },
      suggestedMinutes: 120,
      coords: { lat: 24.3280262, lng: 38.4285526, precision: "area", verified: true, source: "https://www.openstreetmap.org/node/6768322989" },
      mapsQuery: "Yanbu Al-Nakhl",
      images: [
        { file: "General_view_of_Yanbu_al-Nakhl,_Saudi_Arabia_(1).jpg", alt: "منظر عام لينبع النخل", caption: "منظر عام لينبع النخل" },
        { file: "General_view_of_Yanbu_al-Nakhl,_Saudi_Arabia_(2).jpg", alt: "منظر عام آخر لينبع النخل", caption: "بين النخيل والجبال" },
        { file: "General_view_of_Yanbu_al-Nakhl,_Saudi_Arabia_(3).jpg", alt: "إطلالة على ينبع النخل", caption: "إطلالة على ينبع النخل" },
        { file: "General_view_of_Yanbu_al-Nakhl,_Saudi_Arabia_(4).jpg", alt: "ينبع النخل من بعيد", caption: "ينبع النخل" }
      ],
      photoTip: "اجعل جبل رضوى خلفية لصفوف النخيل؛ العدسة المقربة تضغط المسافة وتقرّب الجبل من المشهد.",
      sources: ["wikiYanbu", "commons", "osm"],
      review: "partial",
      reviewNote: "تحتاج القرى الفردية إلى إحداثيات مستقلة وأوصاف موثقة."
    },
    {
      id: "nakhl-old-market",
      name: "أطلال السوق القديم في ينبع النخل",
      nameEn: "Old Market Ruins, Yanbu Al-Nakhl",
      zone: "nakhl",
      type: "heritage",
      kind: "historic",
      categories: ["heritage", "markets", "photo"],
      summary: "بقايا سوق قديم بجدرانه الطينية والحجرية وممراته، تحكي عن زمن كانت فيه ينبع النخل مركز تبادل لأهل القرى.",
      story: [
        "تقف جدران السوق القديم اليوم أطلالًا، لكن تخطيطها ما يزال يُقرأ: دكاكين متجاورة، وممرات بينها، ومداخل كانت تستقبل أهل القرى والقوافل.",
        "تقول الصور الموثقة في ويكيميديا كومنز إنها «أطلال سوق قديم في ينبع النخل». أما اسم السوق بدقة، وهل هو سوق السويق التاريخي المذكور في التعريفات المحلية، فيحتاج إلى توثيق من مصدر رسمي قبل الجزم به.",
        "المكان أطلال غير مرممة بحسب الصور؛ انتبه للجدران المتهدمة ولا تتسلقها."
      ],
      highlights: ["تخطيط الدكاكين والممرات القديمة", "مواد بناء محلية: طين وحجر", "مشهد قوي للتصوير الوثائقي"],
      architecture: [
        { title: "مواد محلية", text: "جدران من الحجر والطين بحسب الصور، مع أسقف خشبية تهدم معظمها." },
        { title: "التخطيط", text: "وحدات صغيرة متجاورة تنفتح على ممرات، وهو النمط الشائع للأسواق التقليدية." }
      ],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "في ينبع النخل. الموقع الدقيق غير مؤكد؛ لم نضع علامة على الخريطة." },
      suggestedMinutes: 45,
      coords: null,
      parent: "nakhl-villages",
      mapsQuery: "السوق القديم ينبع النخل",
      images: [
        { file: "Ruins_of_an_old_market_at_Yanbu_al-Nakhl,_Saudi_Arabia_(7).jpg", alt: "أطلال سوق قديم في ينبع النخل", caption: "أطلال السوق القديم" },
        { file: "Ruins_of_an_old_market_at_Yanbu_al-Nakhl,_Saudi_Arabia_(8).jpg", alt: "جدران متهدمة في سوق قديم", caption: "جدران الدكاكين" },
        { file: "Ruins_of_an_old_market_at_Yanbu_al-Nakhl,_Saudi_Arabia_(14).jpg", alt: "ممر بين أطلال السوق", caption: "ممر بين الأطلال" },
        { file: "Ruins_of_an_old_market_at_Yanbu_al-Nakhl,_Saudi_Arabia_(15).jpg", alt: "تفاصيل بناء في السوق القديم", caption: "تفاصيل البناء" },
        { file: "Ruins_of_an_old_market_at_Yanbu_al-Nakhl,_Saudi_Arabia_(16).jpg", alt: "أطلال سوق ينبع النخل", caption: "أثر الزمن" },
        { file: "Ruins_of_an_old_market_at_Yanbu_al-Nakhl,_Saudi_Arabia_(17).jpg", alt: "مداخل الدكاكين القديمة", caption: "مداخل الدكاكين" },
        { file: "Ruins_of_an_old_market_at_Yanbu_al-Nakhl,_Saudi_Arabia_(18).jpg", alt: "منظر للسوق القديم", caption: "السوق من الداخل" },
        { file: "Ruins_of_an_old_market_at_Yanbu_al-Nakhl,_Saudi_Arabia_(19).jpg", alt: "بقايا سوق قديم", caption: "بقايا السوق" }
      ],
      photoTip: "الظلال الحادة تبرز الجدران المتهدمة؛ والأبيض والأسود يناسب هذا المشهد.",
      sources: ["commons", "heritage"],
      review: "needs-review",
      reviewNote: "اسم السوق الدقيق وإحداثياته وتاريخه تحتاج إلى توثيق."
    },
    {
      id: "nakhl-old-mosque",
      name: "المسجد القديم في ينبع النخل",
      nameEn: "Old Mosque, Yanbu Al-Nakhl",
      zone: "nakhl",
      type: "heritage",
      kind: "historic",
      parent: "nakhl-villages",
      categories: ["heritage", "photo"],
      summary: "مسجد تقليدي من مواد البناء المحلية، يمثل العمارة الدينية البسيطة في قرى ينبع النخل.",
      story: [
        "في القرى الزراعية كان المسجد أول ما يُبنى وآخر ما يُهجر. والمسجد القديم في ينبع النخل مثال على عمارة بسيطة صادقة، من مواد الأرض نفسها.",
        "توثق صوره في ويكيميديا كومنز بوصفه «مسجدًا قديمًا في ينبع النخل»، دون اسم أو تاريخ محدد؛ لذلك لا نذكر تاريخ بنائه."
      ],
      highlights: ["عمارة دينية تقليدية", "مواد بناء محلية"],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "في ينبع النخل؛ الموقع الدقيق غير مؤكد." },
      suggestedMinutes: 20,
      coords: null,
      mapsQuery: "مسجد قديم ينبع النخل",
      images: [
        { file: "Old_mosque_at_Yanbu_al-Nakhl,_Saudi_Arabia_(1).jpg", alt: "مسجد قديم في ينبع النخل", caption: "المسجد القديم" },
        { file: "Old_mosque_at_Yanbu_al-Nakhl,_Saudi_Arabia_(2).jpg", alt: "تفاصيل المسجد القديم", caption: "تفاصيل البناء" },
        { file: "Old_mosque_at_Yanbu_al-Nakhl,_Saudi_Arabia_(3).jpg", alt: "المسجد القديم من زاوية أخرى", caption: "من زاوية أخرى" }
      ],
      sources: ["commons"],
      review: "needs-review",
      reviewNote: "الاسم والتاريخ والإحداثيات تحتاج إلى توثيق."
    },
    {
      id: "ali-spring",
      name: "عين علي بن أبي طالب",
      nameEn: "Spring of Ali ibn Abi Talib",
      zone: "nakhl",
      type: "heritage",
      kind: "natural",
      parent: "nakhl-villages",
      categories: ["heritage", "nature", "photo"],
      summary: "من العيون المرتبطة بتاريخ ينبع النخل، وتحمل اسم علي بن أبي طالب بحسب التسمية المتداولة الموثقة في صورها.",
      story: [
        "اسم «ينبع» نفسه يعني النبع؛ فالماء هنا أصل الحكاية. على العيون قامت البساتين، وحولها نشأت القرى.",
        "تحمل هذه العين اسم علي بن أبي طالب رضي الله عنه وفق تسمية الصور الموثقة في ويكيميديا كومنز. نذكر التسمية كما هي متداولة، دون الجزم بنسبتها التاريخية.",
        "لا نفترض استمرار جريان الماء فيها اليوم؛ حالة العين الحالية تحتاج إلى تحقق ميداني."
      ],
      highlights: ["من العيون التاريخية في ينبع النخل", "ارتباط الماء بنشأة القرى والزراعة"],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "في ينبع النخل؛ الموقع الدقيق غير مؤكد." },
      suggestedMinutes: 30,
      coords: null,
      mapsQuery: "عين علي ينبع النخل",
      images: [
        { file: "Spring_of_Ali_ibn_Abi_Talib_at_Yanbu_al-Nakhl,_Saudi_Arabia_(2).jpg", alt: "عين علي بن أبي طالب في ينبع النخل", caption: "عين علي بن أبي طالب" },
        { file: "Spring_of_Ali_ibn_Abi_Talib_at_Yanbu_al-Nakhl,_Saudi_Arabia_(3).jpg", alt: "محيط عين علي في ينبع النخل", caption: "محيط العين" }
      ],
      sources: ["commons", "wikiYanbu"],
      review: "needs-review",
      reviewNote: "حالة جريان الماء والإحداثيات والسند التاريخي للتسمية تحتاج إلى تحقق."
    },
    {
      id: "nakhl-palms",
      name: "بساتين النخيل ومشاهد الحياة الريفية",
      nameEn: "Palm Groves of Yanbu Al-Nakhl",
      zone: "nakhl",
      type: "village",
      kind: "natural",
      parent: "nakhl-villages",
      categories: ["nature", "photo", "family"],
      summary: "النخيل هو الاسم والهوية: مشاهد البساتين والطرق الزراعية والبيوت الريفية بين القرى.",
      story: [
        "ليس عبثًا أن تُسمى «ينبع النخل». النخيل هنا ليس زينة بل تاريخ معيشة: ظلٌّ وغذاء ومادة بناء وسقف.",
        "معظم البساتين ملكيات خاصة؛ استمتع بالمشهد من الطرق العامة، واستأذن قبل الدخول أو التصوير داخل أي مزرعة."
      ],
      highlights: ["مشاهد البساتين من الطرق العامة", "الطرق الزراعية بين القرى"],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "منتشرة في أنحاء ينبع النخل. احترم الملكيات الخاصة." },
      suggestedMinutes: 60,
      coords: null,
      mapsQuery: "Yanbu Al-Nakhl",
      images: [
        { file: "Yanbu_al-Nakhl,_Saudi_Arabia_(1).jpg", alt: "مشهد من ينبع النخل", caption: "مشهد من ينبع النخل" },
        { file: "Yanbu_al-Nakhl,_Saudi_Arabia_(3).jpg", alt: "مشهد ريفي في ينبع النخل", caption: "الحياة الريفية" },
        { file: "Yanbu_al-Nakhl,_Saudi_Arabia_(5).jpg", alt: "منظر في ينبع النخل", caption: "بين القرى" },
        { file: "Yanbu_al-Nakhl,_Saudi_Arabia_(8).jpg", alt: "ينبع النخل", caption: "ينبع النخل" },
        { file: "Yanbu_al-Nakhl,_Saudi_Arabia_(12).jpg", alt: "منظر من ينبع النخل", caption: "مشهد" },
        { file: "Yanbu_al-Nakhl,_Saudi_Arabia_(15).jpg", alt: "منظر طبيعي في ينبع النخل", caption: "مشهد طبيعي" }
      ],
      photoTip: "صفوف النخيل تصنع خطوطًا متكررة؛ قف في محور الصف لتحصل على عمق في الصورة.",
      sources: ["commons", "wikiYanbu"],
      review: "partial",
      reviewNote: "لا توجد مواقع محددة؛ الصور توثق المنطقة عمومًا."
    },
    {
      id: "suwaiq-market",
      name: "سوق السويق التاريخي",
      nameEn: "Al-Suwaiq Historic Market",
      zone: "nakhl",
      type: "market",
      kind: "historic",
      parent: "nakhl-villages",
      categories: ["markets", "heritage"],
      summary: "مدرج للتحقق: من الأسواق التاريخية المذكورة في ينبع النخل. لم نعتمد مصدرًا موثقًا بعد لموقعه وتاريخه.",
      story: [
        "يرد اسم سوق السويق في الحديث عن تراث ينبع النخل. وتجنبًا لاختلاق الروايات، لا ننشر تاريخه أو وصفه حتى يتوفر مصدر موثوق.",
        "قد يكون هذا السوق هو نفسه الأطلال الموثقة في صفحة «أطلال السوق القديم»؛ هذا احتمال ينتظر التحقق ولا نعتمده."
      ],
      highlights: [],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: null },
      suggestedMinutes: 40,
      coords: null,
      mapsQuery: "سوق السويق ينبع النخل",
      images: [],
      art: "nakhl",
      sources: ["heritage"],
      review: "needs-review",
      reviewNote: "كل البيانات تحتاج إلى توثيق. تنبيه: الاسم يتشابه مع حي السويق في ينبع البحر."
    },
    {
      id: "radwa-view",
      name: "إطلالة جبل رضوى",
      nameEn: "Mount Radwa View",
      zone: "nakhl",
      type: "village",
      kind: "natural",
      parent: "nakhl-villages",
      categories: ["nature", "photo", "friends"],
      summary: "جبل رضوى ظاهر من أي مكان تقريبًا في ينبع النخل؛ خلفية دائمة لصور النخيل والقرى.",
      story: [
        "تذكر ويكيبيديا أن جبل رضوى ظاهر بوضوح من أي مكان في بلدة ينبع النخل. لذلك لا يحتاج الزائر إلى نقطة إطلالة محددة؛ يكفي أن يرفع نظره.",
        "لا نقدم هنا مسارات صعود للجبل؛ المسارات الجبلية تحتاج إلى معرفة محلية وتصاريح وتجهيزات لم نتحقق منها."
      ],
      highlights: ["خلفية جبلية لصور النخيل", "يتغير لونه مع حركة الشمس"],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "يُشاهد من أنحاء ينبع النخل. لا نوصي بالصعود دون مرشد." },
      suggestedMinutes: 20,
      coords: null,
      mapsQuery: "Radwa Mountain",
      images: [
        { file: "Yanbu_al-Nakhl,_Saudi_Arabia_(20).jpg", alt: "مشهد من ينبع النخل", caption: "من ينبع النخل (الجبل الظاهر في الصور غير محدد)" },
        { file: "Yanbu_al-Nakhl,_Saudi_Arabia_(30).jpg", alt: "منظر في ينبع النخل", caption: "مشهد من ينبع النخل" }
      ],
      photoTip: "الجبل يتلون بالبرتقالي مع الشمس المنخفضة؛ صوّره من بين النخيل لتجمع هوية المكان في إطار واحد.",
      sources: ["wikiYanbu", "commons"],
      review: "partial",
      reviewNote: "الصور توثق ينبع النخل ولا تؤكد ظهور رضوى فيها."
    },

    /* ───────────── ينبع الصناعية ───────────── */
    {
      id: "waterfront-park",
      name: "منتزه الواجهة البحرية",
      nameEn: "Yanbu Waterfront Beach Park",
      zone: "sinaiyah",
      type: "beach",
      kind: "recreational",
      categories: ["beaches", "parks", "family", "friends", "photo"],
      summary: "واجهة ساحلية للتنزه والاسترخاء، ضمن مشروع واجهة بحرية طُرح بطول 12 كيلومترًا على ساحل ينبع الصناعية.",
      story: [
        "على ساحل ينبع الصناعية أُطلق مشروع واجهة بحرية بطول 12 كيلومترًا على أربع مراحل: منطقة تخييم مجهزة، ثم حدائق ومرسى وجزر، ثم منطقة ترفيه وفندق، ثم حوض أسماك (أكواريوم).",
        "نذكر هذه المراحل كما وردت في وصف المشروع، ولا نفترض أن جميعها مكتمل اليوم. المؤكد لدينا أن المنتزه مسجل في OpenStreetMap باسم Yanbu Waterfront Beach Park.",
        "مساحة مناسبة للمشي على الساحل ومشاهدة الغروب والجلسات العائلية في الهواء الطلق."
      ],
      highlights: ["مشي على الساحل", "مشاهدة الغروب", "جلسات عائلية في الهواء الطلق"],
      activities: [
        { name: "المشي والتنزه", verified: true },
        { name: "مشاهدة الغروب", verified: true },
        { name: "التخييم", verified: false, note: "ورد ضمن مراحل المشروع؛ يحتاج تأكيد التشغيل الحالي." }
      ],
      facilities: [],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "حي البثنة على الساحل وفق OpenStreetMap. تبعية الموقع الإدارية للصناعية تحتاج إلى تأكيد." },
      suggestedMinutes: 120,
      coords: { lat: 24.0252459, lng: 38.1444409, precision: "point", verified: true, source: "https://www.openstreetmap.org/way/1274495573" },
      mapsQuery: "Yanbu Waterfront Beach Park",
      images: [
        { file: "البحر_و_المدينة.jpg", alt: "البحر والمدينة في ينبع", caption: "البحر والمدينة (الموقع الدقيق للصورة غير محدد)" },
        { file: "Yanbu_Beach_1.jpg", alt: "شاطئ في ينبع", caption: "من شواطئ ينبع (الموقع الدقيق للصورة غير محدد)" }
      ],
      photoTip: "الواجهة تطل غربًا؛ الغروب فوق البحر هو المشهد الأجمل.",
      sources: ["wikiYanbu", "osm", "rcjy"],
      review: "partial",
      reviewNote: "المرافق والأوقات والمراحل المكتملة تحتاج إلى تأكيد من الهيئة الملكية."
    },
    {
      id: "yanbu-lake-park",
      name: "حديقة بحيرة ينبع",
      nameEn: "Yanbu Lake Park",
      zone: "sinaiyah",
      type: "park",
      kind: "recreational",
      categories: ["parks", "family", "photo", "nature"],
      summary: "حديقة حول بحيرة في حي النواة بينبع الصناعية، مساحة خضراء للمشي والتنزه العائلي.",
      story: [
        "وسط مدينة صُممت على أرض ساحلية صحراوية، تبدو البحيرة والحديقة حولها شاهدًا على الوجه الأخضر لينبع الصناعية.",
        "تتداول بعض التعريفات وجود حديقة للطيور قرب البحيرة. لم نتحقق من وضعها الحالي، لذلك لا نعرضها بوصفها مرفقًا قائمًا."
      ],
      highlights: ["بحيرة ومسطحات خضراء", "مناسبة للمشي العائلي"],
      activities: [
        { name: "المشي والتنزه", verified: true },
        { name: "مشاهدة الطيور", verified: false, note: "تحتاج إلى تحقق." }
      ],
      facilities: [],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "حي النواة، ينبع الصناعية (وفق OpenStreetMap)." },
      suggestedMinutes: 75,
      coords: { lat: 24.0084722, lng: 38.2307079, precision: "point", verified: true, source: "https://www.openstreetmap.org/way/585223962" },
      mapsQuery: "Yanbu lake park",
      images: [
        { file: "Yanbu_Park_1.jpg", alt: "حديقة في ينبع", caption: "حديقة في ينبع (لم نتأكد أنها حديقة البحيرة)" }
      ],
      sources: ["osm", "rcjy"],
      review: "partial",
      reviewNote: "حديقة الطيور والمرافق والأوقات تحتاج إلى تحقق؛ الصورة لحديقة في ينبع غير محددة."
    },
    {
      id: "sinaiyah-green",
      name: "الممرات والمساحات الخضراء في ينبع الصناعية",
      nameEn: "Green Walkways, Yanbu Industrial",
      zone: "sinaiyah",
      type: "park",
      kind: "recreational",
      categories: ["parks", "family", "nature"],
      summary: "الحي السكني في ينبع الصناعية أكثر تنظيمًا وخضرة؛ شوارع مشجرة ومساحات مفتوحة للمشي.",
      story: [
        "تصف المصادر الحي السكني في ينبع الصناعية بأنه أحدث وأنظف وأكثر تنظيمًا وخضرة من وسط ينبع القديم؛ مدينة خُطط لها من الصفر على شريط ساحلي صحراوي.",
        "ليست هذه وجهة واحدة بل طابع عام: تجربة مشي هادئة بين الأشجار والمساحات المفتوحة."
      ],
      highlights: ["شوارع مشجرة", "تخطيط عمراني منظم"],
      visit: { status: null, hours: null, fee: null, parking: null, accessibility: null, access: "الحي السكني في ينبع الصناعية. النقطة على الخريطة تمثل المدينة وليست ممرًا محددًا." },
      suggestedMinutes: 45,
      coords: { lat: 23.9988327, lng: 38.2028069, precision: "area", verified: true, source: "https://www.openstreetmap.org/node/295934256" },
      mapsQuery: "Yanbu Industrial City",
      images: [
        { file: "التشجير_بينبع_الصناعية.JPG", alt: "التشجير في ينبع الصناعية", caption: "التشجير في ينبع الصناعية" },
        { file: "ينبع_الصناعية.JPG", alt: "منظر من ينبع الصناعية", caption: "ينبع الصناعية" },
        { file: "Yanbu_Al_Sinaiyah,_Yanbu_Saudi_Arabia_-_panoramio.jpg", alt: "شارع في ينبع الصناعية", caption: "من شوارع ينبع الصناعية (صورة أرشيفية)" }
      ],
      sources: ["wikiYanbu", "commons", "osm"],
      review: "partial",
      reviewNote: "يُفضّل استبدالها بممرات مشي محددة بأسمائها وإحداثياتها."
    },
    {
      id: "flower-festival",
      name: "مهرجان ينبع للزهور والحدائق",
      nameEn: "Yanbu Flower and Garden Festival",
      zone: "sinaiyah",
      type: "event",
      kind: "recreational",
      categories: ["parks", "family", "photo"],
      summary: "مهرجان سنوي للزهور يُقام في أطراف ينبع، ويجذب زوارًا من أنحاء المملكة ودول الجوار.",
      story: [
        "يتحول جزء من ينبع في موسم المهرجان إلى لوحات من الزهور، ويجذب الحدث زوارًا من أنحاء المملكة ودول الخليج.",
        "مواعيد المهرجان وموقعه يُعلنان في كل دورة؛ لا ننشر تواريخ هنا. تابع الإعلانات الرسمية للهيئة الملكية."
      ],
      highlights: ["لوحات وسجاد من الزهور", "فعالية عائلية موسمية"],
      visit: { status: "seasonal", hours: null, fee: null, parking: null, accessibility: null, access: "يُعلن الموقع والمواعيد رسميًا في كل دورة." },
      suggestedMinutes: 120,
      coords: null,
      mapsQuery: "Yanbu Flower Festival",
      images: [
        { file: "Yanbu_flower_festival.jpg", alt: "مهرجان ينبع للزهور", caption: "مهرجان ينبع للزهور" },
        { file: "اكبر_سجادة_زهور_في_العالم_-_panoramio.jpg", alt: "سجادة زهور في ينبع", caption: "«أكبر سجادة زهور في العالم» بحسب عنوان الصورة في كومنز" }
      ],
      sources: ["wikiYanbu", "arabnewsFlower", "rcjy"],
      review: "partial",
      reviewNote: "موعد الدورة القادمة وموقعها غير منشورين هنا عمدًا."
    }
  ],

  // رحلات جاهزة قابلة للتعديل في صفحة خطط رحلتك
  trips: [
    { id: "history-markets", title: "يوم بين التاريخ والأسواق القديمة", text: "من أزقة الحجر المرجاني إلى سوق السمك، يوم يمشي فيه الزائر على خطى ميناء المدينة القديم.", stops: ["yanbu-historic-area", "al-sanusi-mosque", "lawrence-house", "souq-al-lail", "yanbu-fish-market"], zone: "bahr" },
    { id: "sea-calm", title: "يوم هادئ بين البحر والواجهات البحرية", text: "شاطئ الشرم صباحًا، ثم الواجهة البحرية حتى الغروب.", stops: ["sharm-yanbu", "yanbu-fish-market", "waterfront-park"], zone: "bahr" },
    { id: "villages-palms", title: "رحلة القرى التاريخية والنخيل", text: "يوم في ينبع النخل بين الأطلال والعيون والبساتين، وجبل رضوى في الخلفية.", stops: ["nakhl-villages", "nakhl-old-market", "nakhl-old-mosque", "ali-spring", "nakhl-palms", "radwa-view"], zone: "nakhl" },
    { id: "family-parks", title: "يوم عائلي بين الحدائق والمتنزهات", text: "بحيرة وحدائق وممرات خضراء، وختام على الواجهة البحرية.", stops: ["yanbu-lake-park", "sinaiyah-green", "waterfront-park"], zone: "sinaiyah" },
    { id: "three-worlds", title: "ينبع في يوم: العوالم الثلاثة", text: "صباح في النخل، وظهيرة في المدينة القديمة، وغروب على ساحل الصناعية.", stops: ["nakhl-villages", "nakhl-old-market", "yanbu-historic-area", "yanbu-fish-market", "waterfront-park"], zone: null }
  ],

  // من ذاكرة ينبع: صور ووثائق تاريخية من كومنز
  memory: [
    { file: "Robert_Moresby._Port_of_Yembo_Red_Sea.jpg", alt: "رسم تاريخي لميناء ينبع لروبرت موريسبي", caption: "ميناء «يمبو» على البحر الأحمر — رسم لروبرت موريسبي (القرن التاسع عشر)", pair: "Traditional_architecture_in_old_Yanbu,_Saudi_Arabia_(10).jpg", pairCaption: "عمارة ينبع القديمة اليوم" },
    { file: "Plan_of_Yambo_harbour_on_the_coast_of_Arabia_in_the_Red_Sea_-_publ._by_A._Dalrymple_;_the_writing_by_W._Harrison_-_btv1b53263652w.jpg", alt: "خريطة تاريخية لمرفأ ينبع", caption: "مخطط مرفأ «يمبو» — نشره ألكسندر دالريمبل", pair: "Turquoise_Red_Sea_Waves_(3002926462).jpg", pairCaption: "ساحل ينبع اليوم" },
    { file: "T_E_Lawrence_and_the_Arab_Revolt_1916_-_1918_Q58752_(cropped).jpg", alt: "صورة أرشيفية من حقبة الثورة العربية", caption: "صورة أرشيفية من مجموعة «T. E. Lawrence and the Arab Revolt 1916–1918»، مصنفة ضمن ينبع في كومنز", pair: "House_of_Lawrence_of_Arabia_1915-16_in_Yanbu,_Saudi_Arabia_(2).jpg", pairCaption: "بيت لورنس في ينبع اليوم" }
  ]
};
