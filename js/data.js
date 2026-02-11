// =============================================================
// Geo Adventure - World Data (Expanded)
// 30都市 + 実績 + ショップ + 合成レシピ + 図鑑
// =============================================================

const CITIES = [
  // ===== 既存10都市 =====
  {
    id: "cairo", name: "カイロ", country: "エジプト", region: "hot",
    regionLabel: "灼熱の砂漠地帯", lat: 30.04, lng: 31.24,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "砂漠の中に巨大な三角形の建造物が並んでいる。その傍らにはスフィンクスが静かに座っている。" },
      { type: "product", label: "特産品データ", cost: 20, text: "主要輸出品：綿花、石油製品。世界最長級の河川が街を貫いている。通貨はポンド。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「ここはアフリカ最大の都市さ。ナイル川のほとりに何千年も栄えてきた。ピラミッドまではバスで30分だよ。」" }
    ],
    choices: ["カイロ", "マラケシュ", "アテネ", "バグダッド"],
    treasure: { name: "ツタンカーメンの黄金マスク", icon: "👑", description: "少年王の墓から発見された伝説の黄金マスク。航海図の古代エジプトの区画が描かれている。" },
    passportStamp: "🇪🇬",
    encyclopedia: { population: "約2,100万人", area: "3,085 km²", trivia: "ギザのピラミッドは古代七不思議で唯一現存する建造物。カイロの意味は「勝利者」。" }
  },
  {
    id: "tokyo", name: "東京", country: "日本", region: "temperate",
    regionLabel: "桜舞う島国", lat: 35.68, lng: 139.69,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "超高層ビル群の中に、赤と白の巨大な電波塔がそびえ立つ。交差点を何千人もの人が一斉に渡っている。" },
      { type: "product", label: "特産品データ", cost: 20, text: "世界最大の都市圏人口。自動車・電子機器の輸出大国。新幹線の起点。通貨は円。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「渋谷のスクランブル交差点は有名だよね。皇居もあるし、築地…いや豊洲の市場で寿司を食べなきゃ！」" }
    ],
    choices: ["東京", "ソウル", "上海", "バンコク"],
    treasure: { name: "将軍の羅針盤", icon: "🧭", description: "江戸時代の将軍が所有していた精密な羅針盤。航海図の太平洋区画の鍵となる。" },
    passportStamp: "🇯🇵",
    encyclopedia: { population: "約1,400万人", area: "2,194 km²", trivia: "世界最大の都市圏人口（約3,700万人）。山手線は1日約350万人を運ぶ。" }
  },
  {
    id: "paris", name: "パリ", country: "フランス", region: "cold",
    regionLabel: "霧のヨーロッパ", lat: 48.86, lng: 2.35,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "鉄骨で組まれた巨大な塔が街の中心にそびえる。セーヌ川沿いにはカフェが連なり、石造りの美術館が見える。" },
      { type: "product", label: "特産品データ", cost: 20, text: "ワイン・チーズの生産量世界有数。高級ブランド産業の中心地。通貨はユーロ。EU主要国。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「エッフェル塔は毎晩キラキラ光るんだ。ルーヴル美術館でモナ・リザに会ったかい？凱旋門も見逃すなよ。」" }
    ],
    choices: ["パリ", "ローマ", "ロンドン", "マドリード"],
    treasure: { name: "ナポレオンの航海日誌", icon: "📜", description: "ナポレオンが遠征時に記した航海日誌。大西洋の海流ルートが記されている。" },
    passportStamp: "🇫🇷",
    encyclopedia: { population: "約215万人", area: "105 km²", trivia: "ルーヴル美術館の総面積は約73,000m²。年間来場者数は世界一の美術館。" }
  },
  {
    id: "newyork", name: "ニューヨーク", country: "アメリカ", region: "temperate",
    regionLabel: "自由の大陸", lat: 40.71, lng: -74.01,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "摩天楼が立ち並ぶ島。港には緑色の巨大な女性像が右手にたいまつを掲げて立っている。" },
      { type: "product", label: "特産品データ", cost: 20, text: "世界金融の中心地。ウォール街、ブロードウェイ。人口800万以上の大都市。通貨はドル。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「タイムズスクエアのネオンは眠らないよ。セントラルパークでホットドッグ食べて、自由の女神を見に行きな！」" }
    ],
    choices: ["ニューヨーク", "シカゴ", "トロント", "ロサンゼルス"],
    treasure: { name: "自由の女神のミニチュア", icon: "🗽", description: "精巧に作られた自由の女神像。台座の中に北米大陸の航路図が隠されている。" },
    passportStamp: "🇺🇸",
    encyclopedia: { population: "約840万人", area: "783 km²", trivia: "マンハッタン島はオランダ人が先住民から約24ドル相当で購入したと伝えられる。" }
  },
  {
    id: "rio", name: "リオデジャネイロ", country: "ブラジル", region: "hot",
    regionLabel: "情熱の南米", lat: -22.91, lng: -43.17,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "山の頂上に両手を広げた巨大な像が立っている。眼下には白砂のビーチと青い海が広がる。" },
      { type: "product", label: "特産品データ", cost: 20, text: "コーヒー豆の生産量世界一。サトウキビからバイオエタノールも。カーニバルで世界的に有名。通貨はレアル。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「コルコバードのキリスト像は最高の眺めだよ！コパカバーナビーチでサンバを踊ろう。ここは南米最大のカーニバルの街さ！」" }
    ],
    choices: ["リオデジャネイロ", "ブエノスアイレス", "リマ", "ボゴタ"],
    treasure: { name: "古代インカの星図盤", icon: "⭐", description: "インカ帝国の天文学者が作った星図盤。南半球の航路を解読する鍵。" },
    passportStamp: "🇧🇷",
    encyclopedia: { population: "約680万人", area: "1,221 km²", trivia: "コルコバードのキリスト像は高さ30m、両腕の幅28m。新・世界七不思議の一つ。" }
  },
  {
    id: "sydney", name: "シドニー", country: "オーストラリア", region: "hot",
    regionLabel: "南海の大陸", lat: -33.87, lng: 151.21,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "港に面して白い貝殻のような形の巨大な建築物がある。その隣には大きなアーチ橋が架かっている。" },
      { type: "product", label: "特産品データ", cost: 20, text: "鉄鉱石・石炭の輸出大国。羊毛の生産も盛ん。独自の有袋類が生息する大陸。通貨はオーストラリアドル。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「オペラハウスとハーバーブリッジは絵になるよね。ボンダイビーチでサーフィンしない？コアラも見に行こう！」" }
    ],
    choices: ["シドニー", "メルボルン", "オークランド", "ジャカルタ"],
    treasure: { name: "アボリジニの星座地図", icon: "🌌", description: "先住民族が何万年も受け継いできた星座と大地の地図。南太平洋の航路が刻まれている。" },
    passportStamp: "🇦🇺",
    encyclopedia: { population: "約530万人", area: "12,368 km²", trivia: "オペラハウスの屋根は100万枚以上のタイルで覆われている。建設に16年かかった。" }
  },
  {
    id: "moscow", name: "モスクワ", country: "ロシア", region: "cold",
    regionLabel: "極寒の大地", lat: 55.76, lng: 37.62,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "赤い壁に囲まれた広場。色とりどりの玉ねぎ型ドームを持つ聖堂がそびえ立つ。雪が降り積もっている。" },
      { type: "product", label: "特産品データ", cost: 20, text: "世界最大の国土面積。天然ガス・石油の主要輸出国。宇宙開発の歴史あり。通貨はルーブル。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「赤の広場と聖ワシリイ大聖堂は必見だよ。クレムリンの中も入れるぞ。冬は-20℃になるから覚悟しろ！」" }
    ],
    choices: ["モスクワ", "サンクトペテルブルク", "ヘルシンキ", "ワルシャワ"],
    treasure: { name: "ツァーリの天球儀", icon: "🔮", description: "ロシア皇帝が愛用した天球儀。北極航路の秘密が隠されている。" },
    passportStamp: "🇷🇺",
    encyclopedia: { population: "約1,280万人", area: "2,511 km²", trivia: "モスクワの地下鉄はシャンデリアや壁画で装飾され「地下の宮殿」と呼ばれる。" }
  },
  {
    id: "mumbai", name: "ムンバイ", country: "インド", region: "hot",
    regionLabel: "スパイスの楽園", lat: 19.08, lng: 72.88,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "海に面した巨大な石造りの門。その向こうには混沌とした街並みが広がり、色鮮やかなサリーを纏った人々が行き交う。" },
      { type: "product", label: "特産品データ", cost: 20, text: "世界最大の映画産業（ボリウッド）の拠点。IT産業も急成長。スパイスの輸出大国。通貨はルピー。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「インド門は英国統治時代の名残だよ。ここはボリウッドの街さ！チャイを飲みながらダッバーワーラーを見てごらん。」" }
    ],
    choices: ["ムンバイ", "デリー", "コロンボ", "カラチ"],
    treasure: { name: "ムガル帝国の海図", icon: "🗺️", description: "ムガル帝国時代に作られたインド洋の詳細な海図。モンスーンの航路が記されている。" },
    passportStamp: "🇮🇳",
    encyclopedia: { population: "約1,250万人", area: "603 km²", trivia: "ダッバーワーラーは毎日20万個の弁当を届ける。誤配率は600万分の1と言われる。" }
  },
  {
    id: "nairobi", name: "ナイロビ", country: "ケニア", region: "hot",
    regionLabel: "野生の大地", lat: -1.29, lng: 36.82,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "高層ビルの背後にサバンナが広がり、遠くに雪を頂いた山が見える。国立公園の中を野生動物が歩いている。" },
      { type: "product", label: "特産品データ", cost: 20, text: "紅茶・コーヒーの主要輸出国。マラソン大国。大地溝帯が南北に走る。通貨はケニアシリング。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「ナイロビ国立公園ではライオンも見られるよ。キリマンジャロは隣国だけどここからも見える。マサイマラでビッグ5に会おう！」" }
    ],
    choices: ["ナイロビ", "アディスアベバ", "ダルエスサラーム", "カンパラ"],
    treasure: { name: "マサイの大地の記憶", icon: "🦁", description: "マサイ族に伝わる口伝の地図を記した巻物。アフリカ大陸の未知の航路が描かれている。" },
    passportStamp: "🇰🇪",
    encyclopedia: { population: "約480万人", area: "696 km²", trivia: "ナイロビは赤道直下だが標高1,660mのため年間平均気温は約17℃と涼しい。" }
  },
  {
    id: "reykjavik", name: "レイキャビク", country: "アイスランド", region: "cold",
    regionLabel: "氷と火の島", lat: 64.15, lng: -21.94,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "カラフルな屋根の小さな街。背後には氷河と火山が共存し、空にはオーロラが揺らめいている。温泉から湯気が立ち昇る。" },
      { type: "product", label: "特産品データ", cost: 20, text: "地熱発電で電力のほぼ全てを賄う。漁業が主要産業。人口約37万の島国。通貨はクローナ。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「ブルーラグーンの温泉は最高だよ。ゴールデンサークルでゲイシールの間欠泉を見た？ここは世界最古の議会がある場所さ。」" }
    ],
    choices: ["レイキャビク", "オスロ", "コペンハーゲン", "ダブリン"],
    treasure: { name: "ヴァイキングのルーン石碑", icon: "🪨", description: "ヴァイキングが北大西洋を渡った航路が刻まれたルーン石碑。航海図最後のピース。" },
    passportStamp: "🇮🇸",
    encyclopedia: { population: "約13万人", area: "273 km²", trivia: "世界最北の首都。アイスランド語は1000年前のヴァイキング時代からほぼ変わっていない。" }
  },
  // ===== 新規20都市 =====
  {
    id: "istanbul", name: "イスタンブール", country: "トルコ", region: "temperate",
    regionLabel: "東西の架け橋", lat: 41.01, lng: 28.98,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "巨大なドーム状の建物と尖塔が海峡を見下ろす。アジアとヨーロッパを結ぶ橋が見える。" },
      { type: "product", label: "特産品データ", cost: 20, text: "世界最大のバザールがある。チャイ（紅茶）消費量世界一。トルコ絨毯の産地。通貨はリラ。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「アヤソフィアは1500年の歴史だよ。グランドバザールで値切るのが楽しいんだ。ボスポラス海峡のクルーズもいいぞ！」" }
    ],
    choices: ["イスタンブール", "アテネ", "カイロ", "テヘラン"],
    treasure: { name: "オスマンの海峡地図", icon: "🕌", description: "オスマン帝国が管理したボスポラス海峡の精密な海図。東西交易路の秘密が記されている。" },
    passportStamp: "🇹🇷",
    encyclopedia: { population: "約1,600万人", area: "5,343 km²", trivia: "世界で唯一、二つの大陸にまたがる都市。コンスタンティノープルとも呼ばれた。" }
  },
  {
    id: "bangkok", name: "バンコク", country: "タイ", region: "hot",
    regionLabel: "微笑みの国", lat: 13.76, lng: 100.50,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "金色に輝く尖塔を持つ寺院が点在する。運河沿いに水上マーケットが賑わい、トゥクトゥクが走り回る。" },
      { type: "product", label: "特産品データ", cost: 20, text: "世界有数の米の輸出国。観光業が主要産業。ムエタイの本場。通貨はバーツ。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「ワット・プラケオの翡翠仏は必見だよ。カオサン通りはバックパッカーの聖地さ。トムヤムクンは食べた？」" }
    ],
    choices: ["バンコク", "ホーチミン", "ジャカルタ", "クアラルンプール"],
    treasure: { name: "翡翠の仏塔模型", icon: "🏯", description: "王室に伝わる精巧な翡翠の仏塔。東南アジアの季節風航路が刻まれている。" },
    passportStamp: "🇹🇭",
    encyclopedia: { population: "約1,050万人", area: "1,569 km²", trivia: "正式名称は世界一長い都市名で169文字ある。略称でバンコクと呼ばれる。" }
  },
  {
    id: "rome", name: "ローマ", country: "イタリア", region: "temperate",
    regionLabel: "永遠の都", lat: 41.90, lng: 12.50,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "巨大な円形闘技場の遺跡が街の中心にある。噴水の前でコインを投げる観光客。ドーム型の大聖堂が見える。" },
      { type: "product", label: "特産品データ", cost: 20, text: "世界遺産登録数世界一。ファッション・自動車産業が盛ん。パスタ・ピザの本場。通貨はユーロ。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「コロッセオは2000年前に5万人を収容したんだ。トレヴィの泉にコインを投げればまた来られるよ。バチカンも忘れずに！」" }
    ],
    choices: ["ローマ", "パリ", "バルセロナ", "アテネ"],
    treasure: { name: "ローマ帝国の道路地図", icon: "🏛️", description: "すべての道はローマに通ず。帝国の全道路網が記された古地図。地中海の航路の基盤。" },
    passportStamp: "🇮🇹",
    encyclopedia: { population: "約290万人", area: "1,285 km²", trivia: "コロッセオの建設には10万人の奴隷が8年かけて携わった。中に世界最小の国バチカンがある。" }
  },
  {
    id: "london", name: "ロンドン", country: "イギリス", region: "cold",
    regionLabel: "霧の都", lat: 51.51, lng: -0.13,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "テムズ川沿いに巨大な時計塔がそびえる。赤い二階建てバスと黒いタクシーが行き交う。巨大な観覧車も見える。" },
      { type: "product", label: "特産品データ", cost: 20, text: "世界的な金融センター。紅茶文化の中心。グリニッジ標準時の基準。通貨はポンド。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「ビッグベンとバッキンガム宮殿の衛兵交代は見た？大英博物館は入場無料だよ。フィッシュ＆チップスも食べてみて！」" }
    ],
    choices: ["ロンドン", "パリ", "ダブリン", "アムステルダム"],
    treasure: { name: "グリニッジの六分儀", icon: "🔭", description: "グリニッジ天文台で使われた精密な六分儀。経度0度の秘密と世界の時を刻む。" },
    passportStamp: "🇬🇧",
    encyclopedia: { population: "約900万人", area: "1,572 km²", trivia: "大英博物館の所蔵品は約800万点。すべて見るには1日8時間で約3ヶ月かかる。" }
  },
  {
    id: "beijing", name: "北京", country: "中国", region: "cold",
    regionLabel: "龍の帝都", lat: 39.90, lng: 116.40,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "赤い壁と黄金の屋根の巨大な宮殿群。その向こうに万里の長城が山脈に沿って延びている。" },
      { type: "product", label: "特産品データ", cost: 20, text: "世界第2位の経済大国の首都。茶葉・絹の産地。世界遺産7件を持つ。通貨は人民元。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「紫禁城は500年間皇帝の住まいだったんだ。天安門広場は世界最大の広場の一つ。北京ダックは必食だよ！」" }
    ],
    choices: ["北京", "上海", "ソウル", "東京"],
    treasure: { name: "鄭和の航海記録", icon: "⛵", description: "明代の大航海者・鄭和がアフリカまで到達した記録。インド洋航路の全貌が記されている。" },
    passportStamp: "🇨🇳",
    encyclopedia: { population: "約2,200万人", area: "16,410 km²", trivia: "万里の長城の総延長は約21,196km。紫禁城には9,999.5の部屋があるとされる。" }
  },
  {
    id: "dubai", name: "ドバイ", country: "UAE", region: "hot",
    regionLabel: "砂漠の未来都市", lat: 25.20, lng: 55.27,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "砂漠から突き出た超高層ビルが雲を突く。人工島がヤシの木の形をしている。黄金のスークが輝く。" },
      { type: "product", label: "特産品データ", cost: 20, text: "世界一高い建造物がある。石油に頼らず観光・金融で発展。人口の85%が外国人。通貨はディルハム。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「ブルジュ・ハリファは828mだよ！パーム・ジュメイラは宇宙からも見えるんだ。砂漠サファリも最高さ！」" }
    ],
    choices: ["ドバイ", "アブダビ", "ドーハ", "リヤド"],
    treasure: { name: "ペルシャ湾の真珠", icon: "🦪", description: "かつて真珠採りで栄えた湾岸の秘宝。アラビア海の交易航路が封じられている。" },
    passportStamp: "🇦🇪",
    encyclopedia: { population: "約350万人", area: "4,114 km²", trivia: "50年前は小さな漁村だった。ブルジュ・ハリファの展望台からは100km先まで見える。" }
  },
  {
    id: "seoul", name: "ソウル", country: "韓国", region: "temperate",
    regionLabel: "韓流の中心", lat: 37.57, lng: 126.98,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "近代的な高層ビルの間に伝統的な宮殿がある。漢江がゆったりと流れ、山々が街を囲んでいる。" },
      { type: "product", label: "特産品データ", cost: 20, text: "半導体・スマートフォンの主要輸出国。K-POPとドラマが世界的ブーム。通貨はウォン。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「景福宮で韓服を着て写真を撮ろう！明洞でショッピング、弘大でK-POP。焼肉とキムチは毎日食べるよ！」" }
    ],
    choices: ["ソウル", "東京", "北京", "台北"],
    treasure: { name: "朝鮮の天文時計", icon: "⏳", description: "世宗大王が作らせた精密な天文時計。東アジアの星座と潮流の関係が記されている。" },
    passportStamp: "🇰🇷",
    encyclopedia: { population: "約970万人", area: "605 km²", trivia: "世界最速のインターネット速度を持つ都市の一つ。漢江の奇跡と呼ばれる経済発展を遂げた。" }
  },
  {
    id: "capetown", name: "ケープタウン", country: "南アフリカ", region: "temperate",
    regionLabel: "喜望の大地", lat: -33.93, lng: 18.42,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "テーブルのように平らな山頂を持つ山がそびえる。二つの海が出会う岬が遠くに見える。" },
      { type: "product", label: "特産品データ", cost: 20, text: "ダイヤモンド・金の産出国。ワイン生産も盛ん。アフリカ大陸の最南端付近。通貨はランド。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「テーブルマウンテンの上は別世界だよ。喜望峰はインド航路を開いた歴史的な場所。ペンギンもいるよ！」" }
    ],
    choices: ["ケープタウン", "ナイロビ", "ヨハネスブルグ", "カサブランカ"],
    treasure: { name: "喜望峰の羅針盤", icon: "🧲", description: "バスコ・ダ・ガマが使ったとされる羅針盤。アフリカ南端を回る航路の鍵。" },
    passportStamp: "🇿🇦",
    encyclopedia: { population: "約440万人", area: "2,455 km²", trivia: "テーブルマウンテンは約6億年前に形成された。アフリカで最も古い都市の一つ。" }
  },
  {
    id: "cusco", name: "クスコ", country: "ペルー", region: "cold",
    regionLabel: "天空の遺跡", lat: -13.53, lng: -71.97,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "標高の高い山間に石造りの精密な遺跡が広がる。段々畑が山肌を覆い、リャマが草を食んでいる。" },
      { type: "product", label: "特産品データ", cost: 20, text: "ジャガイモの原産地に近い。アルパカ製品が名産。マチュピチュへの玄関口。通貨はソル。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「ここはインカ帝国の首都だったんだ。マチュピチュまでは列車で3時間。高山病に気をつけて！標高3,400mだよ！」" }
    ],
    choices: ["クスコ", "リマ", "ラパス", "キト"],
    treasure: { name: "インカのキープ", icon: "🪢", description: "結び目で情報を記録したインカの縄。アンデス山脈を越える秘密の交易路が編み込まれている。" },
    passportStamp: "🇵🇪",
    encyclopedia: { population: "約43万人", area: "385 km²", trivia: "インカ帝国の公用語ケチュア語で「へそ」を意味する。マチュピチュは1911年に再発見された。" }
  },
  {
    id: "marrakech", name: "マラケシュ", country: "モロッコ", region: "hot",
    regionLabel: "砂漠の赤い街", lat: 31.63, lng: -8.00,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "赤土色の建物が密集する旧市街。広場では蛇使いや大道芸人が人々を楽しませ、スパイスの香りが漂う。" },
      { type: "product", label: "特産品データ", cost: 20, text: "アルガンオイルの産地。手織りの絨毯やタイル装飾が有名。サハラ砂漠への入口。通貨はディルハム。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「ジャマ・エル・フナ広場は毎晩がお祭りだよ。メディナの迷路みたいなスーク（市場）で迷ってみな！タジン鍋は最高さ。」" }
    ],
    choices: ["マラケシュ", "カイロ", "チュニス", "ダカール"],
    treasure: { name: "ベルベルの砂漠地図", icon: "🐪", description: "ベルベル人が砂漠を横断するために代々受け継いだ地図。サハラ交易路の全貌が描かれている。" },
    passportStamp: "🇲🇦",
    encyclopedia: { population: "約93万人", area: "230 km²", trivia: "「赤い街」の異名を持つ。旧市街（メディナ）はユネスコ世界遺産に登録されている。" }
  },
  {
    id: "havana", name: "ハバナ", country: "キューバ", region: "hot",
    regionLabel: "カリブの真珠", lat: 23.11, lng: -82.37,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "パステルカラーの建物が並ぶ海辺の街。クラシックカーが走り、ラテン音楽が通りに響いている。" },
      { type: "product", label: "特産品データ", cost: 20, text: "世界最高品質の葉巻の産地。サトウキビとラム酒が主要産業。社会主義国家。通貨はペソ。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「マレコン通りの夕日は世界一さ。ヘミングウェイが愛した街だよ。モヒートを飲みながらサルサを踊ろう！」" }
    ],
    choices: ["ハバナ", "メキシコシティ", "サンフアン", "キングストン"],
    treasure: { name: "海賊の宝箱の鍵", icon: "🔑", description: "カリブ海の海賊が隠した宝箱の鍵。カリブ海の未知の航路が彫り込まれている。" },
    passportStamp: "🇨🇺",
    encyclopedia: { population: "約210万人", area: "728 km²", trivia: "1950年代のアメリカ車が現役で走る。ヘミングウェイは「老人と海」をここで執筆した。" }
  },
  {
    id: "singapore", name: "シンガポール", country: "シンガポール", region: "hot",
    regionLabel: "獅子の都市国家", lat: 1.35, lng: 103.82,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "3つの高層ビルの上に船のような構造物が載っている。港には無数のコンテナ船。ライオンの像が水を吐いている。" },
      { type: "product", label: "特産品データ", cost: 20, text: "世界最大級の港湾。金融・石油精製のハブ。国土面積は東京23区とほぼ同じ。通貨はシンガポールドル。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「マリーナベイサンズの屋上プールは最高だよ！チキンライスを食べて、ガーデンズ・バイ・ザ・ベイで夜景を見よう！」" }
    ],
    choices: ["シンガポール", "クアラルンプール", "ジャカルタ", "バンコク"],
    treasure: { name: "マラッカ海峡の通行証", icon: "📋", description: "世界最重要の海上交通路マラッカ海峡の通行許可証。東西交易の最重要航路。" },
    passportStamp: "🇸🇬",
    encyclopedia: { population: "約570万人", area: "733 km²", trivia: "チューインガムの持ち込みが禁止されている。世界一の空港（チャンギ空港）がある。" }
  },
  {
    id: "mexicocity", name: "メキシコシティ", country: "メキシコ", region: "temperate",
    regionLabel: "アステカの大地", lat: 19.43, lng: -99.13,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "巨大なピラミッドの遺跡が街の郊外にある。カラフルな壁画が建物を彩り、広大な広場に国旗がはためく。" },
      { type: "product", label: "特産品データ", cost: 20, text: "銀の産出量世界一。テキーラとタコスの本場。アステカ文明の遺跡多数。通貨はペソ。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「テオティワカンの太陽のピラミッドに登った？ソカロ広場はアステカの神殿の上に建てられたんだ。タコス・アル・パストールは必食！」" }
    ],
    choices: ["メキシコシティ", "ハバナ", "ボゴタ", "サンパウロ"],
    treasure: { name: "アステカの太陽の石", icon: "☀️", description: "アステカ文明の暦石のレプリカ。中米を横断する古代交易路が暗号化されている。" },
    passportStamp: "🇲🇽",
    encyclopedia: { population: "約920万人", area: "1,485 km²", trivia: "標高2,240mに位置する世界最大の都市の一つ。アステカの首都テノチティトランの上に建設された。" }
  },
  {
    id: "stockholm", name: "ストックホルム", country: "スウェーデン", region: "cold",
    regionLabel: "北欧の水の都", lat: 59.33, lng: 18.07,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "14の島々に広がる水の都。カラフルな旧市街の建物が水面に映る。冬には街全体が雪化粧する。" },
      { type: "product", label: "特産品データ", cost: 20, text: "家具・ファッションの世界的ブランドを多数輩出。IT先進国。ノーベル賞授賞式の開催地。通貨はクローナ。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「ガムラスタン（旧市街）を散歩してみて。ヴァーサ号博物館は沈没船がまるごと展示してあるんだ。ミートボールも美味しいよ！」" }
    ],
    choices: ["ストックホルム", "コペンハーゲン", "オスロ", "ヘルシンキ"],
    treasure: { name: "ノーベルのメダル", icon: "🏅", description: "ノーベル平和賞のメダルのレプリカ。北海・バルト海の航路図が裏面に刻まれている。" },
    passportStamp: "🇸🇪",
    encyclopedia: { population: "約98万人", area: "188 km²", trivia: "14の島と50以上の橋からなる。ヴァーサ号は1628年に処女航海で沈没し333年後に引き揚げられた。" }
  },
  {
    id: "kathmandu", name: "カトマンズ", country: "ネパール", region: "cold",
    regionLabel: "ヒマラヤの麓", lat: 27.72, lng: 85.32,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "世界最高峰の山脈を背景に、古びた寺院が密集する盆地の街。五色の祈祷旗がはためいている。" },
      { type: "product", label: "特産品データ", cost: 20, text: "エベレストを擁する国の首都。登山・トレッキングが主要観光資源。手工芸品が有名。通貨はルピー。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「ボダナート・ストゥーパの大きな目が見てるよ。エベレストのベースキャンプまで行ける。ダルバートは毎日食べても飽きない！」" }
    ],
    choices: ["カトマンズ", "デリー", "ラサ", "ダッカ"],
    treasure: { name: "シェルパの山岳地図", icon: "🏔️", description: "シェルパ族が代々受け継いだヒマラヤの詳細な地図。世界の屋根を越える秘密の峠道が記されている。" },
    passportStamp: "🇳🇵",
    encyclopedia: { population: "約100万人", area: "50 km²", trivia: "世界で唯一の長方形でない国旗を持つ国の首都。標高1,400mの盆地に位置する。" }
  },
  {
    id: "lisbon", name: "リスボン", country: "ポルトガル", region: "temperate",
    regionLabel: "大航海の起点", lat: 38.72, lng: -9.14,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "七つの丘の上に広がる街。レトロな路面電車が急坂を登り、大河の河口に巨大な橋が架かる。" },
      { type: "product", label: "特産品データ", cost: 20, text: "ポートワインとコルクの産地。大航海時代の出発点。エッグタルト発祥の地。通貨はユーロ。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「ベレンの塔とジェロニモス修道院は大航海時代の象徴だよ。28番トラムに乗ってアルファマ地区を散策しよう！ファドの歌声が聞こえるよ。」" }
    ],
    choices: ["リスボン", "マドリード", "バルセロナ", "カサブランカ"],
    treasure: { name: "ヴァスコ・ダ・ガマの海図", icon: "🚢", description: "大航海者ヴァスコ・ダ・ガマが使った海図の写し。ヨーロッパからインドへの航路が記されている。" },
    passportStamp: "🇵🇹",
    encyclopedia: { population: "約55万人", area: "100 km²", trivia: "ヨーロッパ大陸最西端の首都。1755年の大地震で街の85%が破壊され再建された。" }
  },
  {
    id: "petra", name: "ペトラ", country: "ヨルダン", region: "hot",
    regionLabel: "薔薇色の古代都市", lat: 30.33, lng: 35.44,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "赤い砂岩の断崖に精巧な神殿が彫り込まれている。狭い峡谷（シーク）を抜けると突然巨大な建造物が現れる。" },
      { type: "product", label: "特産品データ", cost: 20, text: "古代ナバテア王国の遺跡。死海が近い。新・世界七不思議の一つ。通貨はディナール。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「エル・ハズネ（宝物殿）はインディ・ジョーンズにも出たんだ。ベドウィンのお茶を飲みながら夜のキャンドルツアーに参加してごらん！」" }
    ],
    choices: ["ペトラ", "カイロ", "イスタンブール", "ドバイ"],
    treasure: { name: "ナバテアの香料交易記録", icon: "📦", description: "古代ナバテア王国の香料貿易ルートの記録。アラビア半島を横断する陸路と海路の全貌。" },
    passportStamp: "🇯🇴",
    encyclopedia: { population: "約3万人（ワディムーサ）", area: "264 km²（遺跡公園）", trivia: "2000年以上前にナバテア人が建設。水道システムは当時の最先端技術だった。" }
  },
  {
    id: "hanoi", name: "ハノイ", country: "ベトナム", region: "hot",
    regionLabel: "千年の都", lat: 21.03, lng: 105.85,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "湖の中に小さな赤い橋と祠がある。バイクの洪水が道路を埋め尽くし、フランス風の建物が点在する。" },
      { type: "product", label: "特産品データ", cost: 20, text: "コーヒー生産量世界第2位。繊維・衣料品の輸出大国。フォーの本場。通貨はドン。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「ホアンキエム湖の亀の伝説を知ってる？旧市街の36通りを歩いてみて。フォー・ボーとブンチャーは絶品だよ！」" }
    ],
    choices: ["ハノイ", "バンコク", "ホーチミン", "プノンペン"],
    treasure: { name: "昇龍の巻物", icon: "🐉", description: "ハノイの旧名「昇龍」にちなんだ古い巻物。南シナ海の航路と季節風の秘密が記されている。" },
    passportStamp: "🇻🇳",
    encyclopedia: { population: "約800万人", area: "3,329 km²", trivia: "1000年以上の歴史を持つ。バイクの登録台数は約600万台で住民より多い。" }
  },
  {
    id: "athens", name: "アテネ", country: "ギリシャ", region: "temperate",
    regionLabel: "民主主義の揺籃", lat: 37.98, lng: 23.73,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "丘の上に白い大理石の柱で構成された神殿がある。青い空を背景に、古代遺跡と近代都市が共存している。" },
      { type: "product", label: "特産品データ", cost: 20, text: "オリーブオイルの主要産地。海運業が主要産業。オリンピック発祥の地。通貨はユーロ。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「パルテノン神殿は2500年前に建てられたんだ。プラカ地区でギリシャサラダとムサカを食べよう。エーゲ海の島々もすぐだよ！」" }
    ],
    choices: ["アテネ", "ローマ", "イスタンブール", "カイロ"],
    treasure: { name: "アンティキティラの歯車", icon: "⚙️", description: "古代ギリシャの驚異的な天文計算機の部品。地中海航路の天体観測データが組み込まれている。" },
    passportStamp: "🇬🇷",
    encyclopedia: { population: "約66万人", area: "39 km²", trivia: "約3,400年の歴史を持つ世界最古の都市の一つ。最初のオリンピックは紀元前776年に開催された。" }
  },
  {
    id: "buenosaires", name: "ブエノスアイレス", country: "アルゼンチン", region: "temperate",
    regionLabel: "南米のパリ", lat: -34.60, lng: -58.38,
    hints: [
      { type: "landscape", label: "風景写真", cost: 10, text: "ヨーロッパ風の壮麗な建築が並ぶ大通り。カラフルに塗られた港町の一角。タンゴの音楽が聞こえる。" },
      { type: "product", label: "特産品データ", cost: 20, text: "牛肉と赤ワインの名産地。タンゴ発祥の地。パンパと呼ばれる大草原が広がる。通貨はペソ。" },
      { type: "local", label: "現地の人に聞く", cost: 35, text: "「ラ・ボカ地区のカミニートは必見だよ。アサード（BBQ）は世界一さ。レコレータ墓地にはエビータが眠っている。」" }
    ],
    choices: ["ブエノスアイレス", "サンティアゴ", "モンテビデオ", "リオデジャネイロ"],
    treasure: { name: "ガウチョの南十字星図", icon: "✨", description: "パンパのガウチョが航海に使った南天の星図。南米大陸南端を回る航路の鍵。" },
    passportStamp: "🇦🇷",
    encyclopedia: { population: "約305万人", area: "203 km²", trivia: "「南米のパリ」と呼ばれるほどヨーロッパの影響が強い。世界一幅の広い通り（7月9日大通り）がある。" }
  }
];

// ルート分岐の選択肢定義
const ROUTE_CHOICES = {
  hot: { label: "🔥 灼熱の地へ向かう", description: "暑い国・地域へ" },
  cold: { label: "❄️ 極寒の地へ向かう", description: "寒い国・地域へ" },
  temperate: { label: "🌸 穏やかな地へ向かう", description: "温暖な国・地域へ" }
};

// 難易度設定
const DIFFICULTY = {
  easy:   { label: "イージー", hp: 150, costMult: 0.7, reward: 30, penalty: 10, rounds: 7, description: "初心者向け。HPに余裕あり" },
  normal: { label: "ノーマル", hp: 100, costMult: 1.0, reward: 25, penalty: 15, rounds: 7, description: "標準的な冒険" },
  hard:   { label: "ハード",   hp: 70,  costMult: 1.4, reward: 20, penalty: 20, rounds: 7, description: "上級者向け。高コスト＆高ペナルティ" }
};

// ゲームバランス定数
const GAME_CONFIG = {
  initialHP: 100,
  correctAnswerReward: 25,
  wrongAnswerPenalty: 15,
  perfectBonus: 10,
  totalFragments: 7,
  roundsTotal: 7,
  timerDuration: 60,
  timerBonusMax: 15,
  lifeline5050Uses: 2,
  comboMultipliers: [1, 1, 1.5, 2, 2.5, 3, 3.5]
};

// ショップアイテム
const SHOP_ITEMS = [
  { id: "hp_potion",    name: "回復薬",         icon: "🧪", cost: 80,  description: "HPを30回復する",            effect: { type: "heal", value: 30 } },
  { id: "hint_discount", name: "ヒント割引券",   icon: "🎟️", cost: 120, description: "次の1ラウンド、ヒントコスト半額", effect: { type: "discount", value: 0.5 } },
  { id: "5050_ticket",  name: "50:50チケット",   icon: "🎫", cost: 100, description: "50:50の使用回数を1回追加",   effect: { type: "lifeline", value: 1 } },
  { id: "shield",       name: "不正解シールド",   icon: "🛡️", cost: 150, description: "次の不正解のHPダメージを無効化", effect: { type: "shield", value: 1 } },
  { id: "compass",      name: "探検家のコンパス", icon: "🧭", cost: 200, description: "次のラウンドで地域ヒントを表示",  effect: { type: "region_hint", value: 1 } }
];

// 合成レシピ
const SYNTHESIS_RECIPES = [
  {
    id: "complete_atlantic",
    name: "大西洋完全航路図",
    icon: "🌊",
    description: "大西洋を横断する完全な航路が明らかになった！",
    ingredients: ["ナポレオンの航海日誌", "自由の女神のミニチュア", "ヴァイキングのルーン石碑"],
    bonus: { score: 500 }
  },
  {
    id: "complete_pacific",
    name: "太平洋完全航路図",
    icon: "🏝️",
    description: "太平洋の島々を結ぶ航路が完成した！",
    ingredients: ["将軍の羅針盤", "アボリジニの星座地図", "古代インカの星図盤"],
    bonus: { score: 500 }
  },
  {
    id: "complete_indian",
    name: "インド洋完全航路図",
    icon: "⛵",
    description: "モンスーンを利用したインド洋航路が完成した！",
    ingredients: ["ツタンカーメンの黄金マスク", "ムガル帝国の海図", "マサイの大地の記憶"],
    bonus: { score: 500 }
  },
  {
    id: "complete_arctic",
    name: "北極航路完全図",
    icon: "🧊",
    description: "北極海を横断する伝説の航路が判明した！",
    ingredients: ["ツァーリの天球儀", "ヴァイキングのルーン石碑", "グリニッジの六分儀"],
    bonus: { score: 500 }
  },
  {
    id: "master_chart",
    name: "幻の航海図【完全版】",
    icon: "🗺️",
    description: "すべての航路が一つに繋がり、幻の航海図が完成した！伝説の探検家の真の遺産がここに。",
    ingredients: ["大西洋完全航路図", "太平洋完全航路図", "インド洋完全航路図"],
    bonus: { score: 2000 }
  }
];

// 実績定義
const ACHIEVEMENTS = [
  { id: "first_correct",    name: "初めての正解",       icon: "🌟", description: "初めて都市を正解した", condition: g => g.correctCount >= 1 },
  { id: "no_hint_clear",    name: "直感の天才",         icon: "🧠", description: "ヒントなしで正解した", condition: g => g.noHintCorrect >= 1 },
  { id: "perfect_game",     name: "パーフェクトゲーム", icon: "💎", description: "全問正解でクリア", condition: g => g.correctCount === g.totalRounds },
  { id: "five_streak",      name: "5連続正解",          icon: "🔥", description: "5問連続で正解した", condition: g => g.maxCombo >= 5 },
  { id: "all_continents",   name: "全大陸制覇",         icon: "🌍", description: "全地域（暑/寒/温）を訪問した", condition: g => g.visitedRegions.size >= 3 },
  { id: "survivor",         name: "ギリギリ生還",       icon: "💀", description: "HP10以下でクリアした", condition: g => g.hp <= 10 && g.hp > 0 && !g.gameOver },
  { id: "speedster",        name: "電光石火",           icon: "⚡", description: "タイマー残り30秒以上で正解を5回", condition: g => g.fastAnswers >= 5 },
  { id: "collector_5",      name: "秘宝収集家",         icon: "🏺", description: "秘宝を5個集めた", condition: g => g.treasures.length >= 5 },
  { id: "collector_all",    name: "コンプリート",       icon: "🏆", description: "全秘宝を収集した", condition: g => g.treasures.length >= g.totalRounds },
  { id: "synthesis_first",  name: "錬金術師",           icon: "⚗️", description: "初めて秘宝を合成した", condition: g => g.synthesized.length >= 1 },
  { id: "shopaholic",       name: "買い物上手",         icon: "🛒", description: "ショップで3回購入した", condition: g => g.shopPurchases >= 3 },
  { id: "hard_clear",       name: "鉄人探検家",         icon: "🦾", description: "ハードモードでクリア", condition: g => g.difficulty === "hard" && g.correctCount >= 5 },
  { id: "daily_first",      name: "デイリー初挑戦",     icon: "📅", description: "デイリーチャレンジに参加した", condition: g => g.isDailyChallenge },
  { id: "rich",             name: "大富豪",             icon: "💰", description: "スコア500以上を達成", condition: g => g.score >= 500 },
  { id: "globe_trotter",    name: "世界一周",           icon: "✈️", description: "10都市以上を訪問（通算）", condition: g => false } // SaveManager側でチェック
];

// エンディング判定
const ENDINGS = {
  perfect: {
    title: "伝説の探検家",
    condition: "全問正解 & HP50以上",
    message: "すべての航海図を完璧に集め、幻の航路が完成した！\nあなたこそ、伝説の探検家の真の後継者だ。"
  },
  good: {
    title: "熟練の冒険者",
    condition: "5問以上正解",
    message: "航海図の大部分を集めることに成功した。\n未知の航路がほぼ解明されたが、まだ謎が残っている..."
  },
  normal: {
    title: "見習い探検家",
    condition: "3問以上正解",
    message: "航海図の断片をいくつか手に入れた。\n冒険の経験を積んで、いつかまた挑戦しよう。"
  },
  bad: {
    title: "遭難した旅人",
    condition: "3問未満 or HP切れ",
    message: "資金が尽きて冒険は中断...\nだが、旅で得た知識は無駄にはならない。次こそは！"
  }
};
