// =============================================================
// Geo Adventure - World Data
// 都市データ・ヒント・秘宝の定義
// =============================================================

const CITIES = [
  {
    id: "cairo",
    name: "カイロ",
    country: "エジプト",
    region: "hot",
    regionLabel: "灼熱の砂漠地帯",
    lat: 30.04,
    lng: 31.24,
    hints: [
      {
        type: "landscape",
        label: "風景写真",
        cost: 10,
        text: "砂漠の中に巨大な三角形の建造物が並んでいる。その傍らにはスフィンクスが静かに座っている。"
      },
      {
        type: "product",
        label: "特産品データ",
        cost: 20,
        text: "主要輸出品：綿花、石油製品。世界最長級の河川が街を貫いている。通貨はポンド。"
      },
      {
        type: "local",
        label: "現地の人に聞く",
        cost: 35,
        text: "「ここはアフリカ最大の都市さ。ナイル川のほとりに何千年も栄えてきた。ピラミッドまではバスで30分だよ。」"
      }
    ],
    choices: ["カイロ", "マラケシュ", "アテネ", "バグダッド"],
    treasure: {
      name: "ツタンカーメンの黄金マスク",
      icon: "👑",
      description: "少年王の墓から発見された伝説の黄金マスク。航海図の古代エジプトの区画が描かれている。"
    },
    passportStamp: "🇪🇬"
  },
  {
    id: "tokyo",
    name: "東京",
    country: "日本",
    region: "temperate",
    regionLabel: "桜舞う島国",
    lat: 35.68,
    lng: 139.69,
    hints: [
      {
        type: "landscape",
        label: "風景写真",
        cost: 10,
        text: "超高層ビル群の中に、赤と白の巨大な電波塔がそびえ立つ。交差点を何千人もの人が一斉に渡っている。"
      },
      {
        type: "product",
        label: "特産品データ",
        cost: 20,
        text: "世界最大の都市圏人口。自動車・電子機器の輸出大国。新幹線の起点。通貨は円。"
      },
      {
        type: "local",
        label: "現地の人に聞く",
        cost: 35,
        text: "「渋谷のスクランブル交差点は有名だよね。皇居もあるし、築地…いや豊洲の市場で寿司を食べなきゃ！」"
      }
    ],
    choices: ["東京", "ソウル", "上海", "バンコク"],
    treasure: {
      name: "将軍の羅針盤",
      icon: "🧭",
      description: "江戸時代の将軍が所有していた精密な羅針盤。航海図の太平洋区画の鍵となる。"
    },
    passportStamp: "🇯🇵"
  },
  {
    id: "paris",
    name: "パリ",
    country: "フランス",
    region: "cold",
    regionLabel: "霧のヨーロッパ",
    lat: 48.86,
    lng: 2.35,
    hints: [
      {
        type: "landscape",
        label: "風景写真",
        cost: 10,
        text: "鉄骨で組まれた巨大な塔が街の中心にそびえる。セーヌ川沿いにはカフェが連なり、石造りの美術館が見える。"
      },
      {
        type: "product",
        label: "特産品データ",
        cost: 20,
        text: "ワイン・チーズの生産量世界有数。高級ブランド産業の中心地。通貨はユーロ。EU主要国。"
      },
      {
        type: "local",
        label: "現地の人に聞く",
        cost: 35,
        text: "「エッフェル塔は毎晩キラキラ光るんだ。ルーヴル美術館でモナ・リザに会ったかい？凱旋門も見逃すなよ。」"
      }
    ],
    choices: ["パリ", "ローマ", "ロンドン", "マドリード"],
    treasure: {
      name: "ナポレオンの航海日誌",
      icon: "📜",
      description: "ナポレオンが遠征時に記した航海日誌。大西洋の海流ルートが記されている。"
    },
    passportStamp: "🇫🇷"
  },
  {
    id: "newyork",
    name: "ニューヨーク",
    country: "アメリカ",
    region: "temperate",
    regionLabel: "自由の大陸",
    lat: 40.71,
    lng: -74.01,
    hints: [
      {
        type: "landscape",
        label: "風景写真",
        cost: 10,
        text: "摩天楼が立ち並ぶ島。港には緑色の巨大な女性像が右手にたいまつを掲げて立っている。"
      },
      {
        type: "product",
        label: "特産品データ",
        cost: 20,
        text: "世界金融の中心地。ウォール街、ブロードウェイ。人口800万以上の大都市。通貨はドル。"
      },
      {
        type: "local",
        label: "現地の人に聞く",
        cost: 35,
        text: "「タイムズスクエアのネオンは眠らないよ。セントラルパークでホットドッグ食べて、自由の女神を見に行きな！」"
      }
    ],
    choices: ["ニューヨーク", "シカゴ", "トロント", "ロサンゼルス"],
    treasure: {
      name: "自由の女神のミニチュア",
      icon: "🗽",
      description: "精巧に作られた自由の女神像。台座の中に北米大陸の航路図が隠されている。"
    },
    passportStamp: "🇺🇸"
  },
  {
    id: "rio",
    name: "リオデジャネイロ",
    country: "ブラジル",
    region: "hot",
    regionLabel: "情熱の南米",
    lat: -22.91,
    lng: -43.17,
    hints: [
      {
        type: "landscape",
        label: "風景写真",
        cost: 10,
        text: "山の頂上に両手を広げた巨大な像が立っている。眼下には白砂のビーチと青い海が広がる。"
      },
      {
        type: "product",
        label: "特産品データ",
        cost: 20,
        text: "コーヒー豆の生産量世界一。サトウキビからバイオエタノールも。カーニバルで世界的に有名。通貨はレアル。"
      },
      {
        type: "local",
        label: "現地の人に聞く",
        cost: 35,
        text: "「コルコバードのキリスト像は最高の眺めだよ！コパカバーナビーチでサンバを踊ろう。ここは南米最大のカーニバルの街さ！」"
      }
    ],
    choices: ["リオデジャネイロ", "ブエノスアイレス", "リマ", "ボゴタ"],
    treasure: {
      name: "古代インカの星図盤",
      icon: "⭐",
      description: "インカ帝国の天文学者が作った星図盤。南半球の航路を解読する鍵。"
    },
    passportStamp: "🇧🇷"
  },
  {
    id: "sydney",
    name: "シドニー",
    country: "オーストラリア",
    region: "hot",
    regionLabel: "南海の大陸",
    lat: -33.87,
    lng: 151.21,
    hints: [
      {
        type: "landscape",
        label: "風景写真",
        cost: 10,
        text: "港に面して白い貝殻のような形の巨大な建築物がある。その隣には大きなアーチ橋が架かっている。"
      },
      {
        type: "product",
        label: "特産品データ",
        cost: 20,
        text: "鉄鉱石・石炭の輸出大国。羊毛の生産も盛ん。独自の有袋類が生息する大陸。通貨はオーストラリアドル。"
      },
      {
        type: "local",
        label: "現地の人に聞く",
        cost: 35,
        text: "「オペラハウスとハーバーブリッジは絵になるよね。ボンダイビーチでサーフィンしない？コアラも見に行こう！」"
      }
    ],
    choices: ["シドニー", "メルボルン", "オークランド", "ジャカルタ"],
    treasure: {
      name: "アボリジニの星座地図",
      icon: "🌌",
      description: "先住民族が何万年も受け継いできた星座と大地の地図。南太平洋の航路が刻まれている。"
    },
    passportStamp: "🇦🇺"
  },
  {
    id: "moscow",
    name: "モスクワ",
    country: "ロシア",
    region: "cold",
    regionLabel: "極寒の大地",
    lat: 55.76,
    lng: 37.62,
    hints: [
      {
        type: "landscape",
        label: "風景写真",
        cost: 10,
        text: "赤い壁に囲まれた広場。色とりどりの玉ねぎ型ドームを持つ聖堂がそびえ立つ。雪が降り積もっている。"
      },
      {
        type: "product",
        label: "特産品データ",
        cost: 20,
        text: "世界最大の国土面積。天然ガス・石油の主要輸出国。宇宙開発の歴史あり。通貨はルーブル。"
      },
      {
        type: "local",
        label: "現地の人に聞く",
        cost: 35,
        text: "「赤の広場と聖ワシリイ大聖堂は必見だよ。クレムリンの中も入れるぞ。冬は-20℃になるから覚悟しろ！」"
      }
    ],
    choices: ["モスクワ", "サンクトペテルブルク", "ヘルシンキ", "ワルシャワ"],
    treasure: {
      name: "ツァーリの天球儀",
      icon: "🔮",
      description: "ロシア皇帝が愛用した天球儀。北極航路の秘密が隠されている。"
    },
    passportStamp: "🇷🇺"
  },
  {
    id: "mumbai",
    name: "ムンバイ",
    country: "インド",
    region: "hot",
    regionLabel: "スパイスの楽園",
    lat: 19.08,
    lng: 72.88,
    hints: [
      {
        type: "landscape",
        label: "風景写真",
        cost: 10,
        text: "海に面した巨大な石造りの門。その向こうには混沌とした街並みが広がり、色鮮やかなサリーを纏った人々が行き交う。"
      },
      {
        type: "product",
        label: "特産品データ",
        cost: 20,
        text: "世界最大の映画産業（ボリウッド）の拠点。IT産業も急成長。スパイスの輸出大国。通貨はルピー。"
      },
      {
        type: "local",
        label: "現地の人に聞く",
        cost: 35,
        text: "「インド門は英国統治時代の名残だよ。ここはボリウッドの街さ！チャイを飲みながらダッバーワーラーを見てごらん。」"
      }
    ],
    choices: ["ムンバイ", "デリー", "コロンボ", "カラチ"],
    treasure: {
      name: "ムガル帝国の海図",
      icon: "🗺️",
      description: "ムガル帝国時代に作られたインド洋の詳細な海図。モンスーンの航路が記されている。"
    },
    passportStamp: "🇮🇳"
  },
  {
    id: "nairobi",
    name: "ナイロビ",
    country: "ケニア",
    region: "hot",
    regionLabel: "野生の大地",
    lat: -1.29,
    lng: 36.82,
    hints: [
      {
        type: "landscape",
        label: "風景写真",
        cost: 10,
        text: "高層ビルの背後にサバンナが広がり、遠くに雪を頂いた山が見える。国立公園の中を野生動物が歩いている。"
      },
      {
        type: "product",
        label: "特産品データ",
        cost: 20,
        text: "紅茶・コーヒーの主要輸出国。マラソン大国。大地溝帯が南北に走る。通貨はケニアシリング。"
      },
      {
        type: "local",
        label: "現地の人に聞く",
        cost: 35,
        text: "「ナイロビ国立公園ではライオンも見られるよ。キリマンジャロは隣国だけどここからも見える。マサイマラでビッグ5に会おう！」"
      }
    ],
    choices: ["ナイロビ", "アディスアベバ", "ダルエスサラーム", "カンパラ"],
    treasure: {
      name: "マサイの大地の記憶",
      icon: "🦁",
      description: "マサイ族に伝わる口伝の地図を記した巻物。アフリカ大陸の未知の航路が描かれている。"
    },
    passportStamp: "🇰🇪"
  },
  {
    id: "reykjavik",
    name: "レイキャビク",
    country: "アイスランド",
    region: "cold",
    regionLabel: "氷と火の島",
    lat: 64.15,
    lng: -21.94,
    hints: [
      {
        type: "landscape",
        label: "風景写真",
        cost: 10,
        text: "カラフルな屋根の小さな街。背後には氷河と火山が共存し、空にはオーロラが揺らめいている。温泉から湯気が立ち昇る。"
      },
      {
        type: "product",
        label: "特産品データ",
        cost: 20,
        text: "地熱発電で電力のほぼ全てを賄う。漁業が主要産業。人口約37万の島国。通貨はクローナ。"
      },
      {
        type: "local",
        label: "現地の人に聞く",
        cost: 35,
        text: "「ブルーラグーンの温泉は最高だよ。ゴールデンサークルでゲイシールの間欠泉を見た？ここは世界最古の議会がある場所さ。」"
      }
    ],
    choices: ["レイキャビク", "オスロ", "コペンハーゲン", "ダブリン"],
    treasure: {
      name: "ヴァイキングのルーン石碑",
      icon: "🪨",
      description: "ヴァイキングが北大西洋を渡った航路が刻まれたルーン石碑。航海図最後のピース。"
    },
    passportStamp: "🇮🇸"
  }
];

// ルート分岐の選択肢定義
const ROUTE_CHOICES = {
  hot: { label: "🔥 灼熱の地へ向かう", description: "暑い国・地域へ" },
  cold: { label: "❄️ 極寒の地へ向かう", description: "寒い国・地域へ" },
  temperate: { label: "🌸 穏やかな地へ向かう", description: "温暖な国・地域へ" }
};

// ゲームバランス定数
const GAME_CONFIG = {
  initialHP: 100,
  correctAnswerReward: 25,
  wrongAnswerPenalty: 15,
  perfectBonus: 10,        // ヒント1つで正解のボーナス
  totalFragments: 7,       // クリアに必要な航海図の断片数
  roundsTotal: 7            // 全ラウンド数
};

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
