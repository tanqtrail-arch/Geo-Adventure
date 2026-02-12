// =============================================================
// Geo Adventure - UI Controller (Full Featured)
// =============================================================

class GameUI {
  constructor(game, passport, saveManager, audio, worldMap) {
    this.game = game;
    this.passport = passport;
    this.save = saveManager;
    this.audio = audio;
    this.map = worldMap;
    this.screens = {};
    this.typewriterTimer = null;
    this.previousScreen = "intro";
    this.selectedDifficulty = "normal";
    this.timerEnabled = false;
  }

  init() {
    this.screens = {
      intro: document.getElementById("screen-intro"),
      round: document.getElementById("screen-round"),
      result: document.getElementById("screen-result"),
      route: document.getElementById("screen-route"),
      passport: document.getElementById("screen-passport"),
      ending: document.getElementById("screen-ending"),
      encyclopedia: document.getElementById("screen-encyclopedia"),
      achievements: document.getElementById("screen-achievements"),
      shop: document.getElementById("screen-shop"),
      synthesis: document.getElementById("screen-synthesis")
    };

    // 難易度ボタン
    document.querySelectorAll(".diff-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".diff-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        this.selectedDifficulty = btn.dataset.diff;
      });
    });

    // タイマートグル
    const timerToggle = document.getElementById("timer-toggle");
    if (timerToggle) {
      timerToggle.addEventListener("change", (e) => { this.timerEnabled = e.target.checked; });
    }

    // メインボタン
    document.getElementById("btn-start").addEventListener("click", () => this.startGame(false));
    document.getElementById("btn-daily").addEventListener("click", () => this.startGame(true));
    document.getElementById("btn-passport-view").addEventListener("click", () => this.showPassport());
    document.getElementById("btn-passport-back").addEventListener("click", () => this.goBack());

    // メニューボタン
    document.getElementById("btn-menu-encyclopedia").addEventListener("click", () => this.showEncyclopedia());
    document.getElementById("btn-menu-achievements").addEventListener("click", () => this.showAchievements());

    // 音声
    document.getElementById("btn-mute").addEventListener("click", () => {
      const muted = this.audio.toggleMute();
      document.getElementById("btn-mute").textContent = muted ? "🔇" : "🔊";
    });

    // 統計表示
    this.updateIntroStats();

    // Audio初期化（ユーザー操作後）
    document.body.addEventListener("click", () => { this.audio.init(); this.audio.resume(); }, { once: true });
  }

  showScreen(name) {
    const prev = Object.keys(this.screens).find(k => this.screens[k]?.classList.contains("active"));
    if (prev && prev !== name) this.previousScreen = prev;
    Object.values(this.screens).forEach(s => { if (s) s.classList.remove("active"); });
    if (this.screens[name]) this.screens[name].classList.add("active");
  }

  goBack() {
    if (this.game.gameOver) { this.showEnding(); }
    else if (this.game.currentCity) { this.showScreen("round"); }
    else { this.showScreen("intro"); }
  }

  updateStatusBar() {
    const s = this.game.getStatus();
    document.getElementById("hp-bar-fill").style.width = (s.hp / s.maxHP * 100) + "%";
    document.getElementById("hp-text").textContent = s.hp;
    document.getElementById("round-text").textContent = `${s.round} / ${s.totalRounds}`;
    document.getElementById("score-text").textContent = s.score;
    document.getElementById("fragment-text").textContent = `${s.fragmentsCollected} / ${s.fragmentsNeeded}`;

    const hpBar = document.getElementById("hp-bar-fill");
    hpBar.className = "hp-bar-fill";
    const pct = s.hp / s.maxHP * 100;
    if (pct <= 25) hpBar.classList.add("hp-danger");
    else if (pct <= 50) hpBar.classList.add("hp-warning");

    // コンボ表示
    const comboEl = document.getElementById("combo-text");
    if (comboEl) comboEl.textContent = s.combo > 1 ? `${s.combo}x` : "";

    // ライフライン表示
    const llEl = document.getElementById("lifeline-text");
    if (llEl) llEl.textContent = s.lifeline5050;

    // シールド表示
    const shieldEl = document.getElementById("shield-text");
    if (shieldEl) shieldEl.textContent = s.shield > 0 ? `${s.shield}` : "";

    // タイマー
    const timerEl = document.getElementById("timer-display");
    if (timerEl) {
      if (s.timerEnabled) {
        timerEl.classList.remove("hidden");
        timerEl.textContent = `${s.timerRemaining}s`;
        timerEl.className = "timer-display" + (s.timerRemaining <= 10 ? " timer-danger" : "");
      } else {
        timerEl.classList.add("hidden");
      }
    }
  }

  updateIntroStats() {
    const el = document.getElementById("intro-stats");
    if (el) el.innerHTML = this.passport.renderStats(this.save);
  }

  // ======== ゲーム開始 ========
  startGame(isDaily) {
    if (isDaily) {
      this.game.start("normal", true);
    } else {
      this.game.start(this.selectedDifficulty, false);
      if (this.timerEnabled) this.game.timerEnabled = true;
    }

    this.audio.playBGM();
    this.updateStatusBar();
    document.getElementById("status-bar").classList.remove("hidden");
    document.getElementById("btn-passport-view").classList.remove("hidden");
    this.showRound();
  }

  // ======== ラウンド画面 ========
  showRound() {
    if (this.game.shouldEndGame()) { this.showEnding(); return; }
    this.showScreen("round");

    const city = this.game.currentCity;
    document.getElementById("round-info").textContent = `第${this.game.currentRound}の目的地`;

    // 地域ヒント（コンパス使用時）
    const regionHint = this.game.getRegionHint();
    const regionEl = document.getElementById("region-hint");
    if (regionEl) {
      if (regionHint) {
        regionEl.textContent = `コンパスの指す先: ${regionHint.label}`;
        regionEl.classList.remove("hidden");
      } else {
        regionEl.classList.add("hidden");
      }
    }

    // ナレーター演出
    const narratorEl = document.getElementById("narrator");
    if (narratorEl) {
      const msgs = [
        "飛行機が雲を突き抜け、新たな大地が見えてきた...",
        "窓の外に広がる景色が変わる。次なる目的地に到着だ。",
        "探検家のノートに記されたヒントを頼りに、この地を調べよう。",
        "航海図の次の断片はここにあるはず。さあ、調査開始だ！"
      ];
      narratorEl.textContent = msgs[this.game.currentRound % msgs.length];
      narratorEl.classList.remove("hidden");
      setTimeout(() => narratorEl.classList.add("fade-out"), 2500);
      setTimeout(() => { narratorEl.classList.add("hidden"); narratorEl.classList.remove("fade-out"); }, 3200);
    }

    // ヒントボタン
    const hintsArea = document.getElementById("hints-area");
    hintsArea.innerHTML = "";
    const diff = DIFFICULTY[this.game.difficulty];

    city.hints.forEach((hint, idx) => {
      const actualCost = Math.ceil(hint.cost * diff.costMult * this.game.activeEffects.discount);
      const btn = document.createElement("button");
      btn.className = "hint-btn";
      btn.innerHTML = `<span class="hint-label">${hint.label}</span><span class="hint-cost">コスト: ${actualCost}</span>`;
      btn.addEventListener("click", () => this.revealHint(idx, btn));
      hintsArea.appendChild(btn);

      const textDiv = document.createElement("div");
      textDiv.className = "hint-text hidden";
      textDiv.id = `hint-text-${idx}`;
      hintsArea.appendChild(textDiv);
    });

    // 50:50ボタン
    const llArea = document.getElementById("lifeline-area");
    if (llArea) {
      llArea.innerHTML = "";
      if (this.game.lifeline5050 > 0 && !this.game.lifeline5050UsedThisRound) {
        const llBtn = document.createElement("button");
        llBtn.className = "lifeline-btn";
        llBtn.innerHTML = `🎯 50:50 (残り${this.game.lifeline5050}回)`;
        llBtn.addEventListener("click", () => this.use5050(llBtn));
        llArea.appendChild(llBtn);
      }
    }

    // 回答選択肢
    this.renderChoices(city.choices);

    // タイマー開始
    if (this.game.timerEnabled) {
      this.game.startTimer(
        (remaining) => {
          this.updateStatusBar();
          if (remaining <= 10) this.audio.playTimerWarn();
        },
        () => {
          // タイムアウト：ランダム不正解
          const wrong = city.choices.find(c => c !== city.name) || city.choices[0];
          this.submitAnswer(wrong);
        }
      );
    }

    this.updateStatusBar();

    // 世界地図更新（正解した都市のみ点灯、全都市は灰色で表示）
    const correctCities = this.game.passport.map(p => CITIES.find(c => c.name === p.city)).filter(Boolean);
    this.map.render(correctCities, CITIES);
    document.getElementById("map-container").classList.remove("hidden");
  }

  renderChoices(choices) {
    const choicesArea = document.getElementById("choices-area");
    choicesArea.innerHTML = "<p class='choices-prompt'>この都市はどこ？</p>";
    choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice;
      btn.addEventListener("click", () => this.submitAnswer(choice));
      choicesArea.appendChild(btn);
    });
  }

  revealHint(idx, btn) {
    const result = this.game.revealHint(idx);
    if (!result) return;
    if (!result.success) { this.showToast("行動力が足りない！", "error"); return; }

    this.audio.playHint();
    btn.classList.add("hint-revealed");
    btn.disabled = true;

    const textDiv = document.getElementById(`hint-text-${idx}`);
    textDiv.classList.remove("hidden");
    this.typewrite(textDiv, result.hint.text);
    this.updateStatusBar();

    if (this.game.gameOver) setTimeout(() => this.showEnding(), 1500);
  }

  use5050(btn) {
    const remaining = this.game.use5050();
    if (!remaining) return;
    btn.disabled = true;
    btn.classList.add("used");
    this.renderChoices(remaining);
    this.showToast("50:50 発動！選択肢を絞り込んだ！", "info");
  }

  typewrite(element, text, speed = 30) {
    element.textContent = "";
    let i = 0;
    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    this.typewriterTimer = setInterval(() => {
      if (i < text.length) { element.textContent += text[i]; i++; }
      else clearInterval(this.typewriterTimer);
    }, speed);
  }

  submitAnswer(answer) {
    const result = this.game.submitAnswer(answer);
    if (!result) return;
    if (result.isCorrect) this.audio.playCorrect();
    else this.audio.playWrong();
    this.showResult(result);
  }

  // ======== 結果画面 ========
  showResult(result) {
    this.showScreen("result");
    this.updateStatusBar();
    this.passport.sync(this.game);

    const c = document.getElementById("result-content");

    if (result.isCorrect) {
      this.audio.playTreasure();
      c.innerHTML = `
        <div class="result-correct">
          <div class="result-icon">🎉</div>
          <h2>正解！</h2>
          <p class="result-city">${result.correctAnswer}（${result.country}）</p>
          ${result.bonus ? `<p class="result-bonus">${result.bonus}</p>` : ""}
          <p class="result-hp">HP +${result.hpChange}${result.roundScore ? ` | +${result.roundScore}pt` : ""}</p>
          <div class="treasure-get">
            <p>航海図の断片を入手！</p>
            <div class="treasure-reveal">
              <span class="treasure-icon-big">${result.treasure.icon}</span>
              <span class="treasure-name-big">${result.treasure.name}</span>
            </div>
            <p class="treasure-desc-small">${result.treasure.description}</p>
          </div>
          <div class="stamp-get">
            <span class="stamp-new">${result.stamp}</span>
            <span>パスポートにスタンプが押された！</span>
          </div>
        </div>`;
    } else {
      c.innerHTML = `
        <div class="result-wrong">
          <div class="result-icon">😞</div>
          <h2>不正解...</h2>
          <p>正解は <strong>${result.correctAnswer}</strong>（${result.country}）でした</p>
          <p class="result-hp negative">HP ${result.hpChange}</p>
          ${result.bonus ? `<p class="result-bonus">${result.bonus}</p>` : ""}
          <p class="result-miss">航海図の断片を逃してしまった...</p>
        </div>`;
    }

    // 正答時は地図を更新して正解都市を点灯表示
    if (result.isCorrect) {
      const correctCities = this.game.passport.map(p => CITIES.find(c => c.name === p.city)).filter(Boolean);
      this.map.render(correctCities, CITIES);
    }

    // ボタンエリア
    const btnArea = document.createElement("div");
    btnArea.className = "result-buttons";

    if (this.game.shouldEndGame()) {
      const btn = document.createElement("button");
      btn.className = "btn-primary";
      btn.textContent = "冒険の結末を見る";
      btn.addEventListener("click", () => this.showEnding());
      btnArea.appendChild(btn);
    } else {
      // ショップボタン
      if (this.game.score >= 80) {
        const shopBtn = document.createElement("button");
        shopBtn.className = "btn-secondary";
        shopBtn.textContent = "🛒 ショップ";
        shopBtn.addEventListener("click", () => this.showShop());
        btnArea.appendChild(shopBtn);
      }
      // 合成ボタン
      if (this.game.treasures.length >= 2) {
        const synthBtn = document.createElement("button");
        synthBtn.className = "btn-secondary";
        synthBtn.textContent = "⚗️ 合成";
        synthBtn.addEventListener("click", () => this.showSynthesis());
        btnArea.appendChild(synthBtn);
      }

      const nextBtn = document.createElement("button");
      nextBtn.className = "btn-primary";
      nextBtn.textContent = "次の目的地を選ぶ";
      nextBtn.addEventListener("click", () => this.showRouteSelect());
      btnArea.appendChild(nextBtn);
    }
    c.appendChild(btnArea);
  }

  // ======== ルート選択 ========
  showRouteSelect() {
    this.showScreen("route");
    const options = this.game.getRouteOptions();
    const container = document.getElementById("route-options");
    container.innerHTML = "";
    document.getElementById("route-flavor").textContent = `第${this.game.currentRound + 1}の冒険先を選べ。どの大陸へ向かう？`;

    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "route-btn";
      btn.innerHTML = `<span class="route-icon">${opt.label}</span><span class="route-desc">${opt.description}</span>`;
      btn.addEventListener("click", () => {
        this.game.selectRoute(opt.continent);
        this.updateStatusBar();
        this.showRound();
      });
      container.appendChild(btn);
    });
  }

  // ======== パスポート ========
  showPassport() {
    this.passport.sync(this.game);
    this.showScreen("passport");

    // タブ切替
    const content = document.getElementById("passport-content");
    content.innerHTML = `
      <div class="passport-tabs">
        <button class="tab-btn active" data-tab="stamps">スタンプ</button>
        <button class="tab-btn" data-tab="treasures">秘宝</button>
        <button class="tab-btn" data-tab="map">世界地図</button>
      </div>
      <div class="tab-content" id="tab-stamps">
        ${this.passport.renderChartProgress(GAME_CONFIG.totalFragments)}
        ${this.passport.renderPassport()}
      </div>
      <div class="tab-content hidden" id="tab-treasures">
        ${this.passport.renderTreasures()}
      </div>
      <div class="tab-content hidden" id="tab-map">
        <div id="passport-map-container"></div>
      </div>`;

    // タブイベント
    content.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        content.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        content.querySelectorAll(".tab-content").forEach(t => t.classList.add("hidden"));
        btn.classList.add("active");
        document.getElementById(`tab-${btn.dataset.tab}`).classList.remove("hidden");
        if (btn.dataset.tab === "map") {
          const correct = this.game.passport.map(p => CITIES.find(c => c.name === p.city)).filter(Boolean);
          const pMap = new WorldMap("passport-map-container");
          pMap.render(correct, CITIES);
        }
      });
    });
  }

  // ======== ショップ ========
  showShop() {
    this.showScreen("shop");
    const c = document.getElementById("shop-content");
    c.innerHTML = `
      <div class="passport-header"><h2>探検家のショップ</h2><button class="btn-back" id="btn-shop-back">戻る</button></div>
      ${this.passport.renderShop(this.game)}`;

    document.getElementById("btn-shop-back").addEventListener("click", () => this.goBack());
    c.querySelectorAll(".btn-shop:not(.disabled)").forEach(btn => {
      btn.addEventListener("click", () => {
        const result = this.game.buyItem(btn.dataset.item);
        if (result.success) {
          this.audio.playPurchase();
          this.showToast(`${result.item.name} を購入！`, "info");
          this.updateStatusBar();
          this.showShop(); // 再描画
        } else {
          this.showToast("スコアが足りない！", "error");
        }
      });
    });
  }

  // ======== 合成 ========
  showSynthesis() {
    this.showScreen("synthesis");
    const c = document.getElementById("synthesis-content");
    c.innerHTML = `
      <div class="passport-header"><h2>秘宝の合成</h2><button class="btn-back" id="btn-synth-back">戻る</button></div>
      ${this.passport.renderSynthesis(this.game)}`;

    document.getElementById("btn-synth-back").addEventListener("click", () => this.goBack());
    c.querySelectorAll(".btn-synth").forEach(btn => {
      btn.addEventListener("click", () => {
        const result = this.game.trySynthesize(btn.dataset.recipe);
        if (result && result.success) {
          this.audio.playSynthesize();
          this.showToast(`${result.item.name} が完成！ +${result.bonusScore}pt`, "info");
          this.updateStatusBar();
          this.showSynthesis(); // 再描画
        }
      });
    });
  }

  // ======== 図鑑 ========
  showEncyclopedia() {
    this.showScreen("encyclopedia");
    document.getElementById("encyclopedia-content").innerHTML = `
      <div class="passport-header"><h2>地理図鑑</h2><button class="btn-back" id="btn-enc-back">戻る</button></div>
      ${this.passport.renderEncyclopedia(this.save)}`;
    document.getElementById("btn-enc-back").addEventListener("click", () => this.showScreen("intro"));
  }

  // ======== 実績 ========
  showAchievements() {
    this.showScreen("achievements");
    document.getElementById("achievements-content").innerHTML = `
      <div class="passport-header"><h2>実績</h2><button class="btn-back" id="btn-ach-back">戻る</button></div>
      ${this.passport.renderAchievements(this.save)}`;
    document.getElementById("btn-ach-back").addEventListener("click", () => this.showScreen("intro"));
  }

  // ======== エンディング ========
  showEnding() {
    this.showScreen("ending");
    this.audio.stopBGM();
    this.passport.sync(this.game);
    this.game.endGame();

    // セーブ＆実績チェック
    this.save.recordGame(this.game);
    const newAch = this.game.checkAchievements(this.save);
    newAch.forEach(a => this.save.unlockAchievement(a.id));

    const ending = this.game.getEnding();
    const status = this.game.getStatus();

    let achHTML = "";
    if (newAch.length > 0) {
      this.audio.playAchievement();
      achHTML = '<div class="new-achievements"><h3>実績解放！</h3>';
      newAch.forEach(a => {
        achHTML += `<div class="new-ach">${a.icon} ${a.name}<span class="ach-desc-inline"> - ${a.description}</span></div>`;
      });
      achHTML += '</div>';
    }

    const correctCities = this.game.passport.map(p => CITIES.find(c => c.name === p.city)).filter(Boolean);

    document.getElementById("ending-content").innerHTML = `
      <div class="ending-badge">${this.getEndingBadge(ending.title)}</div>
      <h2 class="ending-title">${ending.title}</h2>
      <p class="ending-message">${ending.message.replace(/\n/g, "<br>")}</p>
      ${achHTML}
      <div class="ending-stats">
        <div class="stat"><span class="stat-label">最終スコア</span><span class="stat-value">${status.score}</span></div>
        <div class="stat"><span class="stat-label">正解数</span><span class="stat-value">${status.correctCount} / ${status.totalRounds}</span></div>
        <div class="stat"><span class="stat-label">残りHP</span><span class="stat-value">${status.hp}</span></div>
        <div class="stat"><span class="stat-label">最大コンボ</span><span class="stat-value">${this.game.maxCombo}</span></div>
        <div class="stat"><span class="stat-label">航海図</span><span class="stat-value">${status.fragmentsCollected} / ${status.fragmentsNeeded}</span></div>
        <div class="stat"><span class="stat-label">ハイスコア</span><span class="stat-value">${this.save.data.highScore}</span></div>
      </div>
      <div id="ending-map-container" class="ending-map"></div>
      ${this.passport.renderTreasures()}
      ${this.passport.renderPassport()}
      <div class="ending-buttons">
        <button class="btn-primary" id="btn-retry">もう一度冒険する</button>
        <button class="btn-secondary" id="btn-share">結果をコピー</button>
      </div>`;

    // 世界地図（正解都市のみ点灯）
    const endMap = new WorldMap("ending-map-container");
    endMap.render(correctCities, CITIES);

    document.getElementById("btn-retry").addEventListener("click", () => {
      document.getElementById("status-bar").classList.add("hidden");
      document.getElementById("btn-passport-view").classList.add("hidden");
      document.getElementById("map-container").classList.add("hidden");
      this.updateIntroStats();
      this.showScreen("intro");
    });

    document.getElementById("btn-share").addEventListener("click", () => {
      const text = this.game.generateShareText();
      navigator.clipboard.writeText(text).then(
        () => this.showToast("結果をクリップボードにコピーしました！", "info"),
        () => {
          // Fallback
          const ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
          this.showToast("結果をコピーしました！", "info");
        }
      );
    });
  }

  getEndingBadge(title) {
    return { "伝説の探検家": "🏆", "熟練の冒険者": "🥈", "見習い探検家": "🥉", "遭難した旅人": "💀" }[title] || "🗺️";
  }

  showToast(message, type = "info") {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => { toast.classList.remove("show"); setTimeout(() => toast.remove(), 300); }, 2500);
  }
}

// ======== 初期化 ========
document.addEventListener("DOMContentLoaded", () => {
  const game = new GeoGame();
  const passportMgr = new PassportManager();
  const saveManager = new SaveManager();
  const audio = new AudioManager();
  const worldMap = new WorldMap("map-container");
  const ui = new GameUI(game, passportMgr, saveManager, audio, worldMap);
  ui.init();
});
