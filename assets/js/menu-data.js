/* Chez Yong — 鼎鼎香
   Single source of truth for the menu.
   In production this file is generated from the CMS, so prices are edited
   in one place and update everywhere (site, PDF, Google listing). */

window.CY_CATEGORIES = [
  { id: 'partager', fr: 'À partager',      en: 'To share',        zh: '凉菜',   note: { fr: 'Entrées froides du Sichuan', en: 'Sichuan cold starters', zh: '川式凉菜' } },
  { id: 'soupes',   fr: 'Soupes',          en: 'Soups',           zh: '汤羹',   note: { fr: 'Potages et marmites', en: 'Broths and pots', zh: '汤与煲' } },
  { id: 'viandes',  fr: 'Viandes',         en: 'Meat',            zh: '肉类',   note: { fr: 'Canard, poulet, bœuf', en: 'Duck, chicken, beef', zh: '鸭 · 鸡 · 牛' } },
  { id: 'mer',      fr: 'Fruits de mer',   en: 'Seafood',         zh: '海鲜',   note: { fr: 'Poissons, gambas, crabe', en: 'Fish, prawns, crab', zh: '鱼 · 虾 · 蟹' } },
  { id: 'nouilles', fr: 'Nouilles & Riz',  en: 'Noodles & Rice',  zh: '面饭',   note: { fr: 'Raviolis faits maison', en: 'Handmade dumplings', zh: '手工水饺' } },
  { id: 'legumes',  fr: 'Légumes & Tofu',  en: 'Vegetables & Tofu', zh: '素菜', note: { fr: 'Le wok végétal', en: 'From the vegetable wok', zh: '素炒' } },
  { id: 'desserts', fr: 'Desserts',        en: 'Desserts',        zh: '甜品',   note: { fr: 'Caramel filant & givrés', en: 'Spun caramel & frozen fruit', zh: '拔丝 · 冰点' } }
];

/* spice: 0–3  ·  tags: signature | vege | maison | commande */
window.CY_DISHES = [
  /* ── À partager ─────────────────────────────────────────────── */
  { c:'partager', fr:"Poulet à la vapeur et sa sauce chili", en:"Steamed chicken, chilli oil", zh:"口水鸡", py:"koushuiji", p:8.80, spice:2, tags:['signature'], img:'sig-froid' },
  { c:'partager', fr:"Tripes de bœuf à la sauce Sichuan", en:"Beef tripe, Sichuan sauce", zh:"夫妻肺片", py:"fuqifeipian", p:9.80, spice:3, tags:['signature'] },
  { c:'partager', fr:"Poulet à la sauce Sichuan", en:"Bang bang chicken", zh:"棒棒鸡", py:"bangbangji", p:8.80, spice:2, tags:[] },
  { c:'partager', fr:"Salade de pâte de riz", en:"Cold rice noodle salad", zh:"凉拌凉皮", py:"liangpi", p:8.30, spice:1, tags:['vege'] },
  { c:'partager', fr:"Panses de bœuf à la sauce Sichuan", en:"Beef tripe strips, chilli", zh:"麻辣肚丝", py:"malaidusi", p:8.50, spice:2, tags:[] },
  { c:'partager', fr:"Bœuf fumé aux cinq parfums", en:"Five-spice braised beef", zh:"五香酱牛肉", py:"wuxiangjiangniurou", p:8.90, spice:0, tags:[] },
  { c:'partager', fr:"Poisson fumé aux parfums de Sichuan", en:"Sichuan-scented fish", zh:"川香鱼片", py:"chuanxiangyupian", p:8.00, spice:2, tags:[] },
  { c:'partager', fr:"Tofu fumé aux parfums de Sichuan", en:"Sichuan-scented tofu", zh:"川香豆腐", py:"chuanxiangdoufu", p:7.20, spice:2, tags:['vege'] },
  { c:'partager', fr:"Œuf préservé au tofu", en:"Century egg with tofu", zh:"皮蛋豆腐", py:"pidandoufu", p:7.00, spice:0, tags:[] },
  { c:'partager', fr:"Salade de méduse", en:"Jellyfish salad", zh:"凉拌海蜇", py:"liangbanhaizhe", p:9.00, spice:1, tags:[] },
  { c:'partager', fr:"Cacahuètes frites au cumin", en:"Cumin fried peanuts", zh:"孜然花生", py:"ziranhuasheng", p:5.00, spice:1, tags:['vege'] },
  { c:'partager', fr:"Haricots de soja façon Shandong", en:"Salted edamame", zh:"盐水毛豆", py:"yanshuimaodou", p:5.50, spice:0, tags:['vege'] },

  /* ── Soupes ─────────────────────────────────────────────────── */
  { c:'soupes', fr:"Potage pékinois", en:"Hot & sour Peking soup", zh:"酸辣汤", py:"suanlatang", p:5.50, spice:1, tags:[], img:'dish-potage' },
  { c:'soupes', fr:"Potage aux fruits de mer et au tofu", en:"Seafood & tofu broth", zh:"海鲜豆腐羹", py:"haixiandoufugeng", p:5.50, spice:0, tags:[] },
  { c:'soupes', fr:"Soupe maison", en:"House soup", zh:"本楼汤", py:"benloutang", p:5.50, spice:0, tags:[], sub:{ fr:"Surimi, poulet, crevettes", en:"Surimi, chicken, prawns", zh:"蟹柳 · 鸡 · 虾" } },
  { c:'soupes', fr:"Soupe de raviolis aux crevettes", en:"Prawn dumpling soup", zh:"虾饺汤", py:"xiajiaotang", p:6.80, spice:0, tags:['maison'], sub:{ fr:"5 pièces", en:"5 pieces", zh:"5 只" }, img:'dish-soupe' },
  { c:'soupes', fr:"Soupe de porc aux légumes piquants", en:"Pork & pickled vegetable soup", zh:"酸菜肉片汤", py:"suancairoupiantang", p:6.80, spice:1, tags:[] },
  { c:'soupes', fr:"Soupe aux fruits de mer, chou shanghaien", en:"Seafood & pak choi casserole", zh:"海鲜上海青煲", py:"haixianshanghaiqing", p:16.80, spice:0, tags:[] },
  { c:'soupes', fr:"Soupe aux côtelettes d'agneau", en:"Lamb chop & winter melon soup", zh:"羊排冬瓜汤", py:"yangpaidongguatang", p:16.80, spice:0, tags:[] },

  /* ── Viandes ────────────────────────────────────────────────── */
  { c:'viandes', fr:"Canard laqué pékinois", en:"Peking duck", zh:"北京烤鸭", py:"beijingkaoya", p:65.00, spice:0, tags:['signature','commande'], sub:{ fr:"Sur commande 24 h · pour 4 à 6 personnes", en:"24 h pre-order · serves 4–6", zh:"需提前 24 小时预订 · 4–6 人" }, img:'sig-canard' },
  { c:'viandes', fr:"Canard croustillant aux cinq parfums", en:"Crispy five-spice duck", zh:"香酥鸭", py:"xiangsuya", p:15.80, spice:0, tags:['signature'] },
  { c:'viandes', fr:"Poulet du chef", en:"Chef's crisp chicken", zh:"鼎香脆嫩鸡", py:"dingxiangcuinenji", p:14.90, spice:1, tags:['signature'], img:'sig-wok' },
  { c:'viandes', fr:"Poulet sauté avec poivrons au vinaigre", en:"Chicken with pickled chilli", zh:"鼎香泡椒童子鸡", py:"paojiaotongziji", p:14.90, spice:2, tags:[] },
  { c:'viandes', fr:"Cou de canard sauté, poivrons au vinaigre", en:"Duck gizzard, pickled chilli", zh:"鼎香泡椒鸭胗", py:"paojiaoyazhen", p:12.90, spice:2, tags:[] },
  { c:'viandes', fr:"Filet de canard à la sauce soja pékinois", en:"Duck fillet, Peking soy", zh:"京酱鸭脯", py:"jingjiangyapu", p:12.90, spice:0, tags:[] },
  { c:'viandes', fr:"Poulet braisé aux cinq parfums", en:"Five-spice braised chicken", zh:"香脱骨扒鸡", py:"tuogupaji", p:12.80, spice:0, tags:[], sub:{ fr:"½ pièce", en:"Half bird", zh:"半只" }, img:'dish-viande' },
  { c:'viandes', fr:"Poulet impérial", en:"Kung pao chicken", zh:"宫保鸡丁", py:"gongbaojiding", p:9.50, spice:1, tags:[] },
  { c:'viandes', fr:"Canard aux champignons et pousses de bambou", en:"Duck, shiitake & bamboo", zh:"双冬鸭", py:"shuangdongya", p:9.90, spice:0, tags:[] },
  { c:'viandes', fr:"Brochettes de poulet à la citronnelle", en:"Lemongrass chicken skewers", zh:"香茅串烧鸡", py:"xiangmaochuanshaoji", p:8.90, spice:0, tags:[], img:'dish-brochettes' },
  { c:'viandes', fr:"Poulet sauté aux champignons noirs", en:"Chicken, black fungus", zh:"木耳鸡", py:"mueri", p:8.90, spice:0, tags:[] },
  { c:'viandes', fr:"Poulet au curry", en:"Curry chicken", zh:"咖喱鸡", py:"galiji", p:8.90, spice:1, tags:[], img:'dish-curry' },

  /* ── Fruits de mer ──────────────────────────────────────────── */
  { c:'mer', fr:"Marmite de filet de poisson, tofu et chou chinois", en:"Poached fish in chilli oil", zh:"鼎香水煮鱼", py:"shuizhuyu", p:16.90, spice:3, tags:['signature'], img:'sig-poisson' },
  { c:'mer', fr:"Filets de poisson au chou mariné, marmite de Chongqing", en:"Chongqing pickled cabbage fish", zh:"鼎香酸菜鱼", py:"suancaiyu", p:15.90, spice:2, tags:['signature'], img:'sig-marmite' },
  { c:'mer', fr:"Bar à la sauce de piment à l'ail, nouilles maison", en:"Sea bass, chopped chilli, house noodles", zh:"鼎香剁椒鱼拌面", py:"duojiaoyubanmian", p:24.80, spice:3, tags:['maison'] },
  { c:'mer', fr:"Dorade royale épicée sur plaque chauffante", en:"Sizzling spiced sea bream", zh:"香辣铁板烤鱼", py:"xianglatiebankaoyu", p:20.80, spice:2, tags:[], img:'dish-poisson' },
  { c:'mer', fr:"Bar à la vapeur ou à la sauce soja", en:"Steamed or soy-braised sea bass", zh:"清蒸／红烧鲈鱼", py:"qingzhengluyu", p:20.80, spice:0, tags:[] },
  { c:'mer', fr:"Turbot à la vapeur", en:"Steamed turbot", zh:"多宝鱼", py:"duobaoyu", p:null, spice:0, tags:['commande'], sub:{ fr:"Sur commande · prix du marché", en:"Pre-order · market price", zh:"需预定 · 时价" } },
  { c:'mer', fr:"Cuisses de grenouille frites aux piments", en:"Crispy chilli frog legs", zh:"鼎香香辣牛蛙", py:"xianglaniuwa", p:16.90, spice:3, tags:['signature'] },
  { c:'mer', fr:"Crabe torréfié façon Sichuan", en:"Sichuan-style roasted crab", zh:"鼎香川味蟹", py:"chuanweixie", p:14.90, spice:2, tags:[], img:'dish-fruits-de-mer' },
  { c:'mer', fr:"Crabe au sel et au poivre", en:"Salt & pepper crab", zh:"鼎香椒盐焗蟹", py:"jiaoyanxie", p:14.90, spice:1, tags:[] },
  { c:'mer', fr:"Marmite de calamars", en:"Poached squid in chilli oil", zh:"鼎香水煮鱿鱼", py:"shuizhuyouyu", p:14.50, spice:2, tags:[] },
  { c:'mer', fr:"Grosses crevettes frites aux piments", en:"Fried chilli king prawns", zh:"香辣明虾", py:"xianglamingxia", p:16.90, spice:2, tags:[], img:'dish-crevettes' },
  { c:'mer', fr:"Gambas à l'ail", en:"Garlic king prawns", zh:"蒜香大虾", py:"suanxiangdaxia", p:15.90, spice:0, tags:[] },
  { c:'mer', fr:"Gambas à la sauce piquante", en:"Dry-braised chilli prawns", zh:"干烧大虾", py:"ganshaodaxia", p:15.90, spice:2, tags:[] },
  { c:'mer', fr:"Crevettes au sel et poivre", en:"Salt & pepper shrimp", zh:"椒盐虾仁", py:"jiaoyanxiaren", p:12.90, spice:1, tags:[] },
  { c:'mer', fr:"Crevettes sautées aux noix de cajou", en:"Shrimp with cashews", zh:"腰果虾仁", py:"yaoguoxiaren", p:11.90, spice:0, tags:[] },
  { c:'mer', fr:"Noix de St Jacques à la sauce impériale", en:"Scallops, imperial sauce", zh:"干烧干贝", py:"ganshaoganbei", p:13.50, spice:1, tags:[] },
  { c:'mer', fr:"Sauté d'anguille à l'ail", en:"Garlic stir-fried eel", zh:"干烧黄鳝", py:"ganshaohuangshan", p:13.90, spice:1, tags:[] },

  /* ── Nouilles & Riz ─────────────────────────────────────────── */
  { c:'nouilles', fr:"Raviolis au chou chinois et au porc", en:"Pork & cabbage dumplings", zh:"白菜猪肉饺", py:"baicaizhuroujiao", p:7.00, spice:0, tags:['maison'], sub:{ fr:"10 pièces · faits maison", en:"10 pieces · handmade", zh:"10 个 · 手工" }, img:'dish-raviolis' },
  { c:'nouilles', fr:"Raviolis aux cives, œufs et crevettes séchées", en:"Chive, egg & dried shrimp dumplings", zh:"三鲜饺", py:"sanxianjiao", p:7.00, spice:0, tags:['maison'], sub:{ fr:"10 pièces · faits maison", en:"10 pieces · handmade", zh:"10 个 · 手工" }, img:'dish-baozi' },
  { c:'nouilles', fr:"Raviolis au bœuf et aux légumes chinois", en:"Beef & vegetable dumplings", zh:"牛肉蔬菜饺", py:"niuroushucaijiao", p:7.00, spice:0, tags:['maison'], sub:{ fr:"10 pièces · faits maison", en:"10 pieces · handmade", zh:"10 个 · 手工" } },
  { c:'nouilles', fr:"Soupe de nouilles au bœuf épicé", en:"Spicy beef noodle soup", zh:"鼎香香辣牛肉面", py:"xianglaniuroumian", p:10.80, spice:2, tags:['signature'], img:'dish-soupe-nouilles' },
  { c:'nouilles', fr:"Soupe de nouilles aux côtelettes d'agneau", en:"Lamb chop noodle soup", zh:"鼎香辣羊排骨面", py:"layangpaigumian", p:10.80, spice:2, tags:[] },
  { c:'nouilles', fr:"Nouilles à la sauce piquante", en:"Mala noodles", zh:"鼎香麻辣面", py:"malamian", p:9.50, spice:2, tags:[], img:'dish-nouilles' },
  { c:'nouilles', fr:"Nouilles à la sauce soja et au porc haché", en:"Zhajiang noodles", zh:"鼎香北京炸酱面", py:"zhajiangmian", p:9.50, spice:0, tags:[] },
  { c:'nouilles', fr:"Nouilles au sésame", en:"Sesame noodles", zh:"鼎香麻芝面", py:"mazhimian", p:9.50, spice:1, tags:['vege'] },
  { c:'nouilles', fr:"Nouilles sautées aux crevettes", en:"Stir-fried noodles with shrimp", zh:"虾仁炒面", py:"xiarenchaomian", p:9.30, spice:0, tags:[], img:'dish-nouilles-sautees' },
  { c:'nouilles', fr:"Nouilles sautées au bœuf", en:"Stir-fried beef noodles", zh:"牛炒面", py:"niuchaomian", p:8.00, spice:0, tags:[], img:'dish-boeuf' },
  { c:'nouilles', fr:"Nouilles sautées nature", en:"Plain stir-fried noodles", zh:"清炒面", py:"qingchaomian", p:7.50, spice:0, tags:['vege'], img:'dish-portions' },
  { c:'nouilles', fr:"Riz sauté aux crevettes", en:"Shrimp fried rice", zh:"虾仁炒饭", py:"xiarenchaofan", p:7.00, spice:0, tags:[] },
  { c:'nouilles', fr:"Riz cantonais", en:"Cantonese fried rice", zh:"广东炒饭", py:"guangdongchaofan", p:4.00, spice:0, tags:[], img:'dish-riz-cantonais' },
  { c:'nouilles', fr:"Galettes à la ciboulette", en:"Spring onion pancake", zh:"鼎香葱油饼", py:"congyoubing", p:3.50, spice:0, tags:['vege','maison'] },
  { c:'nouilles', fr:"Pain nature à la vapeur", en:"Steamed flower rolls", zh:"花卷", py:"huajuan", p:2.00, spice:0, tags:['vege','maison'] },
  { c:'nouilles', fr:"Riz nature", en:"Steamed rice", zh:"白饭", py:"baifan", p:2.00, spice:0, tags:['vege'], img:'dish-riz' },

  /* ── Légumes & Tofu ─────────────────────────────────────────── */
  { c:'legumes', fr:"Aubergines sautées façon maison", en:"House stir-fried aubergine", zh:"家常茄子", py:"jiachangqiezi", p:8.90, spice:1, tags:['signature','vege'] },
  { c:'legumes', fr:"Aubergines au parfum de poisson", en:"Yuxiang aubergine", zh:"鱼香茄子", py:"yuxiangqiezi", p:8.90, spice:2, tags:['vege'] },
  { c:'legumes', fr:"Aubergines frites au vinaigre", en:"Crisp aubergine, black vinegar", zh:"老醋茄条", py:"laocuqietiao", p:8.90, spice:0, tags:['vege'] },
  { c:'legumes', fr:"Tofu sauté au haché de porc", en:"Mapo-style tofu with pork", zh:"肉末豆腐", py:"roumodoufu", p:8.90, spice:2, tags:[] },
  { c:'legumes', fr:"Marmite végétarienne", en:"Vegetarian claypot", zh:"素食煲", py:"sushibao", p:8.90, spice:0, tags:['vege'] },
  { c:'legumes', fr:"Brocolis sautés à l'ail", en:"Garlic broccoli", zh:"蒜蓉西兰花", py:"suanrongxilanhua", p:8.90, spice:0, tags:['vege'] },
  { c:'legumes', fr:"Pommes de terre au sel et poivre", en:"Salt & pepper potatoes", zh:"椒盐土豆", py:"jiaoyantudou", p:8.90, spice:1, tags:['vege'] },
  { c:'legumes', fr:"Chou vert sauté façon maison", en:"House stir-fried cabbage", zh:"手撕包菜", py:"shousibaocai", p:8.90, spice:1, tags:['vege'] },

  /* ── Desserts ───────────────────────────────────────────────── */
  { c:'desserts', fr:"Patate douce au caramel filant", en:"Spun-caramel sweet potato", zh:"拔丝地瓜", py:"basidigua", p:7.80, spice:0, tags:['signature','maison'], img:'dish-dessert' },
  { c:'desserts', fr:"Pomme au caramel filant", en:"Spun-caramel apple", zh:"拔丝苹果", py:"basipingguo", p:7.80, spice:0, tags:['maison'] },
  { c:'desserts', fr:"Beignets de pomme, ananas ou banane", en:"Apple, pineapple or banana fritters", zh:"炸水果", py:"zhashuiguo", p:3.80, spice:0, tags:[] },
  { c:'desserts', fr:"Mangue givrée", en:"Frozen mango", zh:"冰镇芒果", py:"bingzhenmangguo", p:8.00, spice:0, tags:[] },
  { c:'desserts', fr:"Perles de coco", en:"Coconut pearls", zh:"椰丝糯米球", py:"yesinuomiqiu", p:4.00, spice:0, tags:[] },
  { c:'desserts', fr:"Nougat chinois", en:"Chinese nougat", zh:"芝麻花生明糖", py:"huashengmingtang", p:3.80, spice:0, tags:[] },
  { c:'desserts', fr:"Colonel sorbet citron vodka", en:"Lemon sorbet with vodka", zh:"柠檬冰沙伏特加", py:"ningmengbingsha", p:7.50, spice:0, tags:[] }
];

/* Formules — shown on the menu page as a separate block */
window.CY_FORMULES = [
  {
    id: 'midi',
    name:  { fr: 'Menu Midi',  en: 'Lunch Menu',  zh: '午市套餐' },
    price: 15.50,
    note:  { fr: 'Du mardi au vendredi, service du déjeuner', en: 'Tuesday to Friday, lunch service', zh: '周二至周五 · 午market' },
    courses: [
      { t:{fr:'Entrée au choix',en:'Starter',zh:'前菜'}, items:{ fr:'Nems · Salade au poulet · Potage pékinois · Soupe vermicelles au poulet', en:'Spring rolls · Chicken salad · Hot & sour soup · Chicken vermicelli soup', zh:'春卷 · 鸡肉沙拉 · 酸辣汤 · 鸡丝粉丝汤' } },
      { t:{fr:'Plat au choix',en:'Main',zh:'主菜'},      items:{ fr:'Porc sauté aigre-douce · Bœuf aux oignons · Poulet aux champignons noirs · Filet de poisson à la sauce piquante', en:'Sweet & sour pork · Beef with onions · Chicken with black fungus · Fish fillet in chilli sauce', zh:'糖醋肉 · 洋葱牛肉 · 木耳鸡 · 红油鱼片' } },
      { t:{fr:'Accompagnement',en:'Side',zh:'主食'},     items:{ fr:'Riz nature · Riz cantonais (+2 €)', en:'Steamed rice · Cantonese rice (+€2)', zh:'白饭 · 广东炒饭（+2 €）' } }
    ]
  },
  {
    id: 'decouverte',
    name:  { fr: 'Menu Découverte', en: 'Discovery Menu', zh: '品鉴套餐' },
    price: 15.50,
    note:  { fr: 'Entrée, plat, accompagnement, dessert et café', en: 'Starter, main, side, dessert and coffee', zh: '前菜 · 主菜 · 主食 · 甜品 · 咖啡' },
    courses: [
      { t:{fr:'Entrée au choix',en:'Starter',zh:'前菜'}, items:{ fr:'Nems · Salade aux crevettes · Poulet à la moutarde · Potage pékinois · Soupe maison', en:'Spring rolls · Prawn salad · Mustard chicken · Hot & sour soup · House soup', zh:'春卷 · 虾沙拉 · 芥末鸡 · 酸辣汤 · 本楼汤' } },
      { t:{fr:'Plat au choix',en:'Main',zh:'主菜'},      items:{ fr:'Filets de porc au caramel · Bœuf saté sur plaque chauffante · Poulet sauté à l\'ananas · Canard aux champignons noirs · Crevettes à la sauce piquante', en:'Caramel pork · Sizzling satay beef · Pineapple chicken · Duck with black fungus · Chilli prawns', zh:'焦糖肉片 · 铁板沙爹牛 · 菠萝鸡 · 木耳鸭 · 干烧虾仁' } },
      { t:{fr:'Dessert & café',en:'Dessert & coffee',zh:'甜品与咖啡'}, items:{ fr:'Beignets · Litchis au sirop · Nougat · Café', en:'Fritters · Lychees in syrup · Nougat · Coffee', zh:'炸水果 · 糖水荔枝 · 明糖 · 咖啡' } }
    ]
  },
  {
    id: 'rapide',
    name:  { fr: 'Menu Rapide', en: 'Express Menu', zh: '快餐' },
    price: null,
    note:  { fr: 'À emporter, préparé en quelques minutes', en: 'Takeaway, ready in minutes', zh: '外带 · 即点即走' },
    courses: [
      { t:{fr:'Au choix',en:'Choose one',zh:'任选'}, items:{ fr:'Nems (4 pièces) · Salade au poulet · 10 raviolis (cives, porc ou bœuf)', en:'Spring rolls (4) · Chicken salad · 10 dumplings (chive, pork or beef)', zh:'春卷（4 只）· 鸡肉沙拉 · 水饺 10 个（三鲜 / 猪肉 / 牛肉）' } }
    ]
  }
];

/* Real signals pulled from the Google listing — 603 avis */
window.CY_REVIEW_TAGS = [
  { fr:'portions généreuses', en:'generous portions', zh:'分量足', n:23 },
  { fr:'abordable',           en:'affordable',        zh:'实惠',   n:13 },
  { fr:'aubergines frites',   en:'fried eggplant',    zh:'炸茄子', n:10 },
  { fr:'marmites',            en:'stews',             zh:'煲',     n:10 },
  { fr:'salle privée',        en:'private room',      zh:'包间',   n:9  },
  { fr:'potage pékinois',     en:'Peking soup',       zh:'酸辣汤', n:3  },
  { fr:'canard cinq parfums', en:'five-spice duck',   zh:'五香鸭', n:3  },
  { fr:'couteaux de mer',     en:'razor clams',       zh:'蛏子',   n:3  },
  { fr:'crevettes sel poivre',en:'salt & pepper shrimp', zh:'椒盐虾', n:2 }
];
