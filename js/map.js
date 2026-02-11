// =============================================================
// Geo Adventure - World Map (SVG)
// 訪問都市ピン表示＆航路アニメーション
// =============================================================

class WorldMap {
  constructor(containerId) {
    this.containerId = containerId;
    this.width = 680;
    this.height = 380;
    this.visitedPins = [];
    this.routes = [];
  }

  // 緯度経度→SVG座標変換（メルカトル簡易版）
  project(lat, lng) {
    const x = ((lng + 180) / 360) * this.width;
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = this.height / 2 - (mercN / Math.PI) * (this.height / 2) * 0.9;
    return { x: Math.max(5, Math.min(this.width - 5, x)), y: Math.max(5, Math.min(this.height - 5, y)) };
  }

  render(visitedCities, allCities) {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    // 大陸の簡易ポリゴンデータ
    const continents = [
      // 北米
      "M95,80 L160,65 L185,90 L180,120 L155,155 L130,170 L110,165 L95,135 Z",
      // 南米
      "M135,175 L170,170 L185,200 L180,250 L165,290 L140,300 L125,270 L120,220 Z",
      // ヨーロッパ
      "M310,60 L360,55 L380,70 L375,100 L350,110 L320,105 L305,90 Z",
      // アフリカ
      "M310,120 L360,115 L380,150 L375,220 L350,260 L320,250 L300,200 L305,150 Z",
      // アジア
      "M380,50 L500,40 L560,65 L580,100 L560,140 L500,150 L440,160 L400,130 L385,100 Z",
      // オセアニア
      "M530,210 L590,200 L620,220 L615,250 L580,260 L540,250 Z",
      // 東南アジア島嶼
      "M510,160 L550,155 L570,175 L555,190 L520,185 Z"
    ];

    let svg = `<svg viewBox="0 0 ${this.width} ${this.height}" class="world-map-svg">`;

    // 背景（海）
    svg += `<rect width="${this.width}" height="${this.height}" fill="#0a1628" rx="8"/>`;

    // グリッド線
    for (let i = 0; i <= 6; i++) {
      const x = (i / 6) * this.width;
      svg += `<line x1="${x}" y1="0" x2="${x}" y2="${this.height}" stroke="#152040" stroke-width="0.5"/>`;
    }
    for (let i = 0; i <= 4; i++) {
      const y = (i / 4) * this.height;
      svg += `<line x1="0" y1="${y}" x2="${this.width}" y2="${y}" stroke="#152040" stroke-width="0.5"/>`;
    }
    // 赤道
    const eqY = this.project(0, 0).y;
    svg += `<line x1="0" y1="${eqY}" x2="${this.width}" y2="${eqY}" stroke="#1a3050" stroke-width="1" stroke-dasharray="4,4"/>`;

    // 大陸
    continents.forEach(d => {
      svg += `<path d="${d}" fill="#152540" stroke="#1e3555" stroke-width="0.8"/>`;
    });

    // 未訪問都市（薄い点）
    allCities.forEach(city => {
      if (!visitedCities.find(v => v.id === city.id)) {
        const pos = this.project(city.lat, city.lng);
        svg += `<circle cx="${pos.x}" cy="${pos.y}" r="2" fill="#2a3555" opacity="0.5"/>`;
      }
    });

    // 航路線（訪問順に結ぶ）
    if (visitedCities.length > 1) {
      let pathD = "";
      visitedCities.forEach((city, i) => {
        const pos = this.project(city.lat, city.lng);
        pathD += (i === 0 ? `M${pos.x},${pos.y}` : ` L${pos.x},${pos.y}`);
      });
      svg += `<path d="${pathD}" fill="none" stroke="#f0c040" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.6">`;
      svg += `<animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite"/>`;
      svg += `</path>`;
    }

    // 訪問済み都市ピン
    visitedCities.forEach((city, i) => {
      const pos = this.project(city.lat, city.lng);
      const isLatest = i === visitedCities.length - 1;
      const r = isLatest ? 6 : 4;
      const color = isLatest ? "#f0c040" : "#4a9eff";

      // 光彩
      svg += `<circle cx="${pos.x}" cy="${pos.y}" r="${r + 4}" fill="${color}" opacity="0.15">`;
      if (isLatest) {
        svg += `<animate attributeName="r" values="${r + 2};${r + 8};${r + 2}" dur="2s" repeatCount="indefinite"/>`;
        svg += `<animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite"/>`;
      }
      svg += `</circle>`;

      // ピン本体
      svg += `<circle cx="${pos.x}" cy="${pos.y}" r="${r}" fill="${color}" stroke="#fff" stroke-width="1"/>`;

      // ラベル
      const labelY = pos.y > this.height / 2 ? pos.y - r - 6 : pos.y + r + 12;
      svg += `<text x="${pos.x}" y="${labelY}" text-anchor="middle" fill="${color}" font-size="8" font-weight="600">${city.name}</text>`;
    });

    svg += `</svg>`;
    container.innerHTML = svg;
  }
}
