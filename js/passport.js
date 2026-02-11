// =============================================================
// Geo Adventure - Passport & Collection Manager (Expanded)
// パスポート＆コレクション＆図鑑＆合成 管理
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
        </div>`;
    });
    html += '</div>';
    return html;
  }

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
        </div>`;
    });
    html += '</div>';
    return html;
  }

  renderChartProgress(totalNeeded) {
    const collected = this.treasures.length;
    const pct = Math.floor((collected / totalNeeded) * 100);
    return `
      <div class="chart-progress">
        <div class="chart-title">幻の航海図 完成度: ${pct}%</div>
        <div class="chart-bar-bg"><div class="chart-bar-fill" style="width: ${pct}%"></div></div>
        <div class="chart-count">${collected} / ${totalNeeded} ピース</div>
      </div>`;
  }

  // 図鑑レンダリング
  renderEncyclopedia(saveManager) {
    const entries = saveManager.getEncyclopedia();
    let html = '<div class="encyclopedia-grid">';
    entries.forEach(city => {
      if (city.unlocked) {
        html += `
          <div class="encyclopedia-card unlocked">
            <div class="enc-header">
              <span class="enc-stamp">${city.passportStamp}</span>
              <span class="enc-name">${city.name}</span>
              <span class="enc-country">${city.country}</span>
            </div>
            <div class="enc-body">
              <div class="enc-stat"><span>人口:</span> ${city.encyclopedia.population}</div>
              <div class="enc-stat"><span>面積:</span> ${city.encyclopedia.area}</div>
              <div class="enc-trivia">${city.encyclopedia.trivia}</div>
            </div>
          </div>`;
      } else {
        html += `
          <div class="encyclopedia-card locked">
            <div class="enc-header">
              <span class="enc-stamp">❓</span>
              <span class="enc-name">???</span>
              <span class="enc-country">未発見</span>
            </div>
            <div class="enc-body">
              <div class="enc-locked-msg">この都市を正解すると解放されます</div>
            </div>
          </div>`;
      }
    });
    html += '</div>';

    const unlocked = entries.filter(e => e.unlocked).length;
    const total = entries.length;
    html = `<div class="enc-progress">発見済み: ${unlocked} / ${total} 都市</div>` + html;
    return html;
  }

  // 合成画面レンダリング
  renderSynthesis(game) {
    const recipes = game.getAvailableRecipes();
    let html = '<div class="synthesis-list">';

    recipes.forEach(r => {
      const statusClass = r.alreadyOwned ? "synth-owned" : r.canSynthesize ? "synth-ready" : "synth-locked";
      html += `
        <div class="synth-card ${statusClass}">
          <div class="synth-header">
            <span class="synth-icon">${r.icon}</span>
            <span class="synth-name">${r.name}</span>
            ${r.alreadyOwned ? '<span class="synth-badge">合成済</span>' : ""}
          </div>
          <div class="synth-ingredients">`;

      r.ingredientStatus.forEach(ing => {
        html += `<span class="synth-ing ${ing.owned ? "owned" : "missing"}">${ing.owned ? "✓" : "✗"} ${ing.name}</span>`;
      });

      html += `</div>
          <div class="synth-desc">${r.description}</div>
          <div class="synth-bonus">ボーナス: +${r.bonus.score} スコア</div>`;

      if (r.canSynthesize) {
        html += `<button class="btn-synth" data-recipe="${r.id}">合成する</button>`;
      }
      html += `</div>`;
    });

    html += '</div>';
    return html;
  }

  // 実績レンダリング
  renderAchievements(saveManager) {
    let html = '<div class="achievements-grid">';
    ACHIEVEMENTS.forEach(ach => {
      const unlocked = saveManager.hasAchievement(ach.id);
      html += `
        <div class="achievement-card ${unlocked ? "unlocked" : "locked"}">
          <div class="ach-icon">${unlocked ? ach.icon : "🔒"}</div>
          <div class="ach-info">
            <div class="ach-name">${unlocked ? ach.name : "???"}</div>
            <div class="ach-desc">${unlocked ? ach.description : "条件を満たすと解放"}</div>
          </div>
        </div>`;
    });
    html += '</div>';

    const count = saveManager.data.achievements.length;
    html = `<div class="ach-progress">解放済み: ${count} / ${ACHIEVEMENTS.length}</div>` + html;
    return html;
  }

  // ショップレンダリング
  renderShop(game) {
    let html = `<div class="shop-score">所持スコア: ${game.score}</div>`;
    html += '<div class="shop-grid">';
    SHOP_ITEMS.forEach(item => {
      const canBuy = game.score >= item.cost;
      html += `
        <div class="shop-card ${canBuy ? "" : "shop-disabled"}">
          <div class="shop-icon">${item.icon}</div>
          <div class="shop-name">${item.name}</div>
          <div class="shop-desc">${item.description}</div>
          <div class="shop-cost">コスト: ${item.cost}</div>
          <button class="btn-shop ${canBuy ? "" : "disabled"}" data-item="${item.id}" ${canBuy ? "" : "disabled"}>購入</button>
        </div>`;
    });
    html += '</div>';
    return html;
  }

  // 統計レンダリング
  renderStats(saveManager) {
    const s = saveManager.getStats();
    return `
      <div class="stats-grid">
        <div class="stat"><span class="stat-label">ハイスコア</span><span class="stat-value">${s.highScore}</span></div>
        <div class="stat"><span class="stat-label">総プレイ回数</span><span class="stat-value">${s.totalGames}</span></div>
        <div class="stat"><span class="stat-label">総正解数</span><span class="stat-value">${s.totalCorrect}</span></div>
        <div class="stat"><span class="stat-label">発見都市</span><span class="stat-value">${s.citiesDiscovered} / ${s.totalCities}</span></div>
        <div class="stat"><span class="stat-label">実績</span><span class="stat-value">${s.achievementsUnlocked} / ${s.totalAchievements}</span></div>
      </div>`;
  }
}
