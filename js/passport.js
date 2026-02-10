// =============================================================
// Geo Adventure - Passport & Collection Manager
// パスポート＆コレクション管理
// =============================================================

class PassportManager {
  constructor() {
    this.stamps = [];
    this.treasures = [];
  }

  sync(game) {
    this.stamps = [...game.passport];
    this.treasures = [...game.treasures];
  }

  // パスポートHTML生成
  renderPassport() {
    if (this.stamps.length === 0) {
      return '<div class="passport-empty">まだスタンプがありません</div>';
    }

    let html = '<div class="passport-stamps">';
    this.stamps.forEach((s, i) => {
      html += `
        <div class="stamp" style="animation-delay: ${i * 0.15}s">
          <span class="stamp-icon">${s.stamp}</span>
          <span class="stamp-city">${s.city}</span>
          <span class="stamp-country">${s.country}</span>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  // 秘宝コレクションHTML生成
  renderTreasures() {
    if (this.treasures.length === 0) {
      return '<div class="treasures-empty">まだ秘宝を持っていません</div>';
    }

    let html = '<div class="treasure-grid">';
    this.treasures.forEach((t, i) => {
      html += `
        <div class="treasure-card" style="animation-delay: ${i * 0.2}s">
          <div class="treasure-icon">${t.icon}</div>
          <div class="treasure-name">${t.name}</div>
          <div class="treasure-desc">${t.description}</div>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  // 航海図の完成度を表示
  renderChartProgress(totalNeeded) {
    const collected = this.treasures.length;
    const pct = Math.floor((collected / totalNeeded) * 100);

    let html = '<div class="chart-progress">';
    html += `<div class="chart-title">幻の航海図 完成度: ${pct}%</div>`;
    html += '<div class="chart-bar-bg">';
    html += `<div class="chart-bar-fill" style="width: ${pct}%"></div>`;
    html += '</div>';
    html += `<div class="chart-count">${collected} / ${totalNeeded} ピース</div>`;
    html += '</div>';
    return html;
  }
}
