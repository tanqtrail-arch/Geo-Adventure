// =============================================================
// Geo Adventure - World Map (SVG)
// リアルな大陸形状 + 都市の灰色/点灯表示 + 航路アニメーション
// =============================================================

class WorldMap {
  constructor(containerId) {
    this.containerId = containerId;
    this.width = 680;
    this.height = 380;
  }

  // 緯度経度→SVG座標変換（メルカトル簡易版）
  project(lat, lng) {
    const x = ((lng + 180) / 360) * this.width;
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = this.height / 2 - (mercN / Math.PI) * (this.height / 2) * 0.9;
    return { x: Math.max(5, Math.min(this.width - 5, x)), y: Math.max(5, Math.min(this.height - 5, y)) };
  }

  // リアルな大陸ポリゴンデータ
  getContinents() {
    return [
      // 北米大陸
      { name: "northAmerica", paths: [
        "M30,55 L55,42 L80,38 L105,35 L125,40 L145,38 L162,42 L175,52 L180,62 L178,72 L182,80 L185,90 L180,98 L172,105 L168,115 L158,125 L150,135 L145,142 L138,148 L128,155 L118,158 L108,155 L100,148 L95,140 L88,132 L80,128 L72,120 L65,110 L55,100 L45,90 L38,80 L32,70 L30,60 Z",
        // グリーンランド
        "M200,22 L225,18 L240,22 L248,32 L245,42 L235,48 L220,46 L208,40 L202,32 Z",
        // 中米・カリブ
        "M118,158 L128,160 L135,165 L140,168 L145,168 L148,172 L142,175 L135,172 L128,168 L120,165 Z"
      ]},
      // 南米大陸
      { name: "southAmerica", paths: [
        "M142,178 L155,175 L165,178 L172,185 L178,195 L182,208 L180,222 L176,235 L172,248 L168,258 L162,268 L155,278 L148,286 L140,292 L135,288 L130,278 L125,265 L122,250 L120,235 L118,220 L120,208 L125,198 L130,190 L135,184 Z"
      ]},
      // ヨーロッパ
      { name: "europe", paths: [
        "M305,72 L312,65 L320,58 L330,52 L340,48 L350,46 L358,48 L365,52 L370,48 L378,46 L385,50 L388,56 L385,62 L380,68 L378,75 L375,82 L370,88 L365,92 L358,96 L350,100 L342,102 L335,100 L328,96 L322,92 L318,88 L312,85 L308,80 L305,76 Z",
        // スカンジナビア
        "M335,32 L342,28 L350,30 L356,35 L358,42 L355,48 L350,46 L342,42 L338,38 Z",
        // イギリス・アイルランド
        "M295,55 L302,52 L308,55 L310,60 L308,65 L302,68 L296,65 L294,60 Z",
        // イタリア
        "M342,102 L346,108 L348,115 L345,120 L340,118 L338,112 L340,106 Z"
      ]},
      // アフリカ
      { name: "africa", paths: [
        "M310,118 L320,112 L332,108 L345,108 L355,112 L365,118 L372,128 L378,140 L380,155 L378,170 L375,185 L372,200 L368,215 L362,228 L355,238 L348,248 L340,255 L332,258 L325,255 L318,248 L312,238 L308,225 L305,210 L303,195 L302,180 L304,165 L306,150 L308,138 L310,128 Z",
        // マダガスカル
        "M385,220 L390,215 L393,222 L392,232 L388,238 L384,232 L383,225 Z"
      ]},
      // アジア
      { name: "asia", paths: [
        // 大陸本体
        "M388,50 L400,42 L415,38 L430,35 L450,32 L470,30 L490,32 L510,35 L530,38 L545,42 L555,48 L562,55 L568,62 L572,70 L575,80 L572,88 L568,95 L565,102 L560,108 L555,115 L548,120 L540,125 L530,128 L520,130 L510,135 L502,140 L495,145 L488,148 L480,150 L470,148 L462,145 L455,140 L448,135 L440,130 L432,125 L425,120 L418,115 L412,108 L405,100 L398,92 L392,85 L388,78 L385,70 L385,62 Z",
        // インド亜大陸
        "M440,130 L450,135 L458,142 L462,152 L460,162 L455,170 L448,175 L440,172 L435,165 L432,155 L430,145 L433,138 Z",
        // 東南アジア半島
        "M502,140 L508,148 L512,155 L515,162 L512,168 L506,172 L500,168 L496,160 L495,152 L498,145 Z",
        // 朝鮮半島
        "M548,70 L552,75 L554,82 L552,88 L548,85 L546,78 Z",
        // 日本列島
        "M562,62 L568,58 L574,62 L576,68 L573,74 L568,78 L564,75 L560,70 Z",
        "M558,80 L562,78 L566,82 L564,86 L560,84 Z",
        // インドネシア・マレー諸島
        "M505,175 L515,172 L525,175 L535,178 L542,182 L548,178 L555,180 L558,185 L552,188 L542,190 L530,188 L518,185 L508,182 Z",
        // アラビア半島
        "M392,108 L402,105 L412,108 L420,115 L425,122 L420,128 L412,130 L405,125 L398,118 L394,112 Z"
      ]},
      // オセアニア（オーストラリア）
      { name: "oceania", paths: [
        "M525,210 L540,202 L555,198 L570,200 L585,205 L598,212 L608,222 L612,235 L608,248 L598,258 L585,262 L570,260 L555,255 L542,248 L532,238 L526,228 L524,218 Z",
        // ニュージーランド
        "M620,252 L625,248 L628,255 L626,262 L622,265 L618,260 Z",
        // タスマニア
        "M582,268 L588,265 L592,270 L588,275 L583,273 Z",
        // パプアニューギニア
        "M578,185 L590,182 L600,185 L605,192 L600,196 L590,195 L582,192 Z"
      ]}
    ];
  }

  /**
   * @param {Array} correctCities - 正解した都市の配列
   * @param {Array} gameCities - ゲームに登場する全都市（灰色で表示）
   */
  render(correctCities, gameCities) {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    const continents = this.getContinents();
    const correctIds = new Set(correctCities.map(c => c.id));

    let svg = `<svg viewBox="0 0 ${this.width} ${this.height}" class="world-map-svg">`;
    svg += `<defs>`;
    svg += `<filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
    svg += `</defs>`;

    // 背景（海）
    svg += `<rect width="${this.width}" height="${this.height}" fill="#0a1628" rx="8"/>`;

    // グリッド線
    for (let i = 0; i <= 8; i++) {
      const x = (i / 8) * this.width;
      svg += `<line x1="${x}" y1="0" x2="${x}" y2="${this.height}" stroke="#111d35" stroke-width="0.3"/>`;
    }
    for (let i = 0; i <= 5; i++) {
      const y = (i / 5) * this.height;
      svg += `<line x1="0" y1="${y}" x2="${this.width}" y2="${y}" stroke="#111d35" stroke-width="0.3"/>`;
    }
    // 赤道
    const eqY = this.project(0, 0).y;
    svg += `<line x1="0" y1="${eqY}" x2="${this.width}" y2="${eqY}" stroke="#1a3050" stroke-width="0.8" stroke-dasharray="4,4"/>`;

    // 大陸ポリゴン
    continents.forEach(cont => {
      cont.paths.forEach(d => {
        svg += `<path d="${d}" fill="#14223a" stroke="#1e3555" stroke-width="0.6"/>`;
      });
    });

    // ゲーム都市を全て灰色で表示
    gameCities.forEach(city => {
      const pos = this.project(city.lat, city.lng);
      if (!correctIds.has(city.id)) {
        // 未正解: 灰色の暗いドット
        svg += `<circle cx="${pos.x}" cy="${pos.y}" r="3" fill="#2a3555" stroke="#3a4565" stroke-width="0.5" opacity="0.6"/>`;
      }
    });

    // 航路線（正解都市を訪問順に結ぶ）
    if (correctCities.length > 1) {
      let pathD = "";
      correctCities.forEach((city, i) => {
        const pos = this.project(city.lat, city.lng);
        pathD += (i === 0 ? `M${pos.x},${pos.y}` : ` L${pos.x},${pos.y}`);
      });
      svg += `<path d="${pathD}" fill="none" stroke="#f0c040" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.6">`;
      svg += `<animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite"/>`;
      svg += `</path>`;
    }

    // 正解した都市ピン（点灯状態）
    correctCities.forEach((city, i) => {
      const pos = this.project(city.lat, city.lng);
      const isLatest = i === correctCities.length - 1;
      const r = isLatest ? 6 : 4;
      const color = isLatest ? "#f0c040" : "#4a9eff";

      // 光彩（グロー）
      svg += `<circle cx="${pos.x}" cy="${pos.y}" r="${r + 4}" fill="${color}" opacity="0.15"`;
      if (isLatest) {
        svg += `><animate attributeName="r" values="${r + 2};${r + 8};${r + 2}" dur="2s" repeatCount="indefinite"/>`;
        svg += `<animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite"/>`;
        svg += `</circle>`;
      } else {
        svg += `/>`;
      }

      // ピン本体
      svg += `<circle cx="${pos.x}" cy="${pos.y}" r="${r}" fill="${color}" stroke="#fff" stroke-width="1" filter="url(#glow)"/>`;

      // ラベル
      const labelY = pos.y > this.height / 2 ? pos.y - r - 6 : pos.y + r + 12;
      svg += `<text x="${pos.x}" y="${labelY}" text-anchor="middle" fill="${color}" font-size="8" font-weight="600">${city.name}</text>`;
    });

    svg += `</svg>`;
    container.innerHTML = svg;
  }
}
