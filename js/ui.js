// =============================================================
// Geo Adventure - UI Controller
// DOM操作・画面描画・画面遷移
// =============================================================

class GameUI {
  constructor(game, passport) {
    this.game = game;
    this.passport = passport;
    this.screens = {};
    this.typewriterTimer = null;
  }

  init() {
    // 画面要素をキャッシュ
    this.screens = {
      intro: document.getElementById("screen-intro"),
      round: document.getElementById("screen-round"),
      result: document.getElementById("screen-result"),
      route: document.getElementById("screen-route"),
      passport: document.getElementById("screen-passport"),
      ending: document.getElementById("screen-ending")
    };

    // イベント登録
    document.getElementById("btn-start").addEventListener("click", () => this.startGame());
    document.getElementById("btn-passport-view").addEventListener("click", () => this.showPassport());
    document.getElementById("btn-passport-back").addEventListener("click", () => this.hidePassport());
  }

  // 画面切り替え
  showScreen(name) {
    Object.values(this.screens).forEach(s => s.classList.remove("active"));
    if (this.screens[name]) {
      this.screens[name].classList.add("active");
    }
  }

  // ステータスバー更新
  updateStatusBar() {
    const status = this.game.getStatus();
    document.getElementById("hp-bar-fill").style.width = status.hp + "%";
    document.getElementById("hp-text").textContent = status.hp;
    document.getElementById("round-text").textContent = `${status.round} / ${status.totalRounds}`;
    document.getElementById("score-text").textContent = status.score;
    document.getElementById("fragment-text").textContent = `${status.fragmentsCollected} / ${status.fragmentsNeeded}`;

    // HP色変化
    const hpBar = document.getElementById("hp-bar-fill");
    hpBar.className = "hp-bar-fill";
    if (status.hp <= 25) {
      hpBar.classList.add("hp-danger");
    } else if (status.hp <= 50) {
      hpBar.classList.add("hp-warning");
    }
  }

  // ======== イントロ画面 ========
  startGame() {
    this.game.start();
    this.updateStatusBar();
    document.getElementById("status-bar").classList.remove("hidden");
    document.getElementById("btn-passport-view").classList.remove("hidden");
    this.showRound();
  }

  // ======== ラウンド画面 ========
  showRound() {
    if (this.game.shouldEndGame()) {
      this.showEnding();
      return;
    }

    this.showScreen("round");

    const city = this.game.currentCity;
    const roundInfo = document.getElementById("round-info");
    roundInfo.textContent = `第${this.game.currentRound}の目的地`;

    // ヒントボタン生成
    const hintsArea = document.getElementById("hints-area");
    hintsArea.innerHTML = "";

    city.hints.forEach((hint, idx) => {
      const btn = document.createElement("button");
      btn.className = "hint-btn";
      btn.innerHTML = `
        <span class="hint-label">${hint.label}</span>
        <span class="hint-cost">コスト: ${hint.cost}</span>
      `;
      btn.addEventListener("click", () => this.revealHint(idx, btn));
      hintsArea.appendChild(btn);

      // ヒントテキスト表示エリア
      const textDiv = document.createElement("div");
      textDiv.className = "hint-text hidden";
      textDiv.id = `hint-text-${idx}`;
      hintsArea.appendChild(textDiv);
    });

    // 回答選択肢
    const choicesArea = document.getElementById("choices-area");
    choicesArea.innerHTML = "<p class='choices-prompt'>この都市はどこ？</p>";

    city.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice;
      btn.addEventListener("click", () => this.submitAnswer(choice));
      choicesArea.appendChild(btn);
    });
  }

  // ヒント開示
  revealHint(idx, btn) {
    const result = this.game.revealHint(idx);
    if (!result) return;

    if (!result.success) {
      this.showToast("行動力が足りない！", "error");
      return;
    }

    btn.classList.add("hint-revealed");
    btn.disabled = true;

    const textDiv = document.getElementById(`hint-text-${idx}`);
    textDiv.classList.remove("hidden");
    this.typewrite(textDiv, result.hint.text);

    this.updateStatusBar();

    if (this.game.gameOver) {
      setTimeout(() => this.showEnding(), 1500);
    }
  }

  // タイプライター演出
  typewrite(element, text, speed = 30) {
    element.textContent = "";
    let i = 0;
    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    this.typewriterTimer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text[i];
        i++;
      } else {
        clearInterval(this.typewriterTimer);
      }
    }, speed);
  }

  // 回答送信
  submitAnswer(answer) {
    const result = this.game.submitAnswer(answer);
    if (!result) return;
    this.showResult(result);
  }

  // ======== 結果画面 ========
  showResult(result) {
    this.showScreen("result");
    this.updateStatusBar();
    this.passport.sync(this.game);

    const container = document.getElementById("result-content");

    if (result.isCorrect) {
      container.innerHTML = `
        <div class="result-correct">
          <div class="result-icon">🎉</div>
          <h2>正解！</h2>
          <p class="result-city">${result.correctAnswer}（${result.country}）</p>
          ${result.bonus ? `<p class="result-bonus">${result.bonus}</p>` : ""}
          <p class="result-hp">HP +${result.hpChange}</p>
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
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="result-wrong">
          <div class="result-icon">😞</div>
          <h2>不正解...</h2>
          <p>正解は <strong>${result.correctAnswer}</strong>（${result.country}）でした</p>
          <p class="result-hp negative">HP ${result.hpChange}</p>
          <p class="result-miss">航海図の断片を逃してしまった...</p>
        </div>
      `;
    }

    // 次へボタン
    const nextBtn = document.createElement("button");
    nextBtn.className = "btn-primary";

    if (this.game.shouldEndGame()) {
      nextBtn.textContent = "冒険の結末を見る";
      nextBtn.addEventListener("click", () => this.showEnding());
    } else {
      nextBtn.textContent = "次の目的地を選ぶ";
      nextBtn.addEventListener("click", () => this.showRouteSelect());
    }
    container.appendChild(nextBtn);
  }

  // ======== ルート選択画面 ========
  showRouteSelect() {
    this.showScreen("route");

    const options = this.game.getRouteOptions();
    const container = document.getElementById("route-options");
    container.innerHTML = "";

    document.getElementById("route-flavor").textContent =
      `第${this.game.currentRound + 1}の冒険先を選べ。どの地域へ向かう？`;

    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "route-btn";
      btn.innerHTML = `
        <span class="route-icon">${opt.label}</span>
        <span class="route-desc">${opt.description}</span>
      `;
      btn.addEventListener("click", () => {
        this.game.selectRoute(opt.region);
        this.updateStatusBar();
        this.showRound();
      });
      container.appendChild(btn);
    });
  }

  // ======== パスポート画面 ========
  showPassport() {
    this.passport.sync(this.game);
    this.showScreen("passport");

    document.getElementById("passport-content").innerHTML =
      this.passport.renderChartProgress(GAME_CONFIG.totalFragments) +
      this.passport.renderPassport() +
      this.passport.renderTreasures();
  }

  hidePassport() {
    // 前の画面に戻る
    if (this.game.gameOver) {
      this.showEnding();
    } else if (this.game.currentCity) {
      this.showScreen("round");
    } else {
      this.showScreen("intro");
    }
  }

  // ======== エンディング画面 ========
  showEnding() {
    this.showScreen("ending");
    this.passport.sync(this.game);

    const ending = this.game.getEnding();
    const status = this.game.getStatus();

    document.getElementById("ending-content").innerHTML = `
      <div class="ending-badge">${this.getEndingBadge(ending.title)}</div>
      <h2 class="ending-title">${ending.title}</h2>
      <p class="ending-message">${ending.message.replace(/\n/g, "<br>")}</p>
      <div class="ending-stats">
        <div class="stat">
          <span class="stat-label">最終スコア</span>
          <span class="stat-value">${status.score}</span>
        </div>
        <div class="stat">
          <span class="stat-label">正解数</span>
          <span class="stat-value">${status.correctCount} / ${status.totalRounds}</span>
        </div>
        <div class="stat">
          <span class="stat-label">残りHP</span>
          <span class="stat-value">${status.hp}</span>
        </div>
        <div class="stat">
          <span class="stat-label">航海図</span>
          <span class="stat-value">${status.fragmentsCollected} / ${status.fragmentsNeeded} ピース</span>
        </div>
      </div>
      ${this.passport.renderTreasures()}
      ${this.passport.renderPassport()}
      <button class="btn-primary" id="btn-retry">もう一度冒険する</button>
    `;

    document.getElementById("btn-retry").addEventListener("click", () => {
      document.getElementById("status-bar").classList.add("hidden");
      document.getElementById("btn-passport-view").classList.add("hidden");
      this.showScreen("intro");
    });
  }

  getEndingBadge(title) {
    const badges = {
      "伝説の探検家": "🏆",
      "熟練の冒険者": "🥈",
      "見習い探検家": "🥉",
      "遭難した旅人": "💀"
    };
    return badges[title] || "🗺️";
  }

  // トースト通知
  showToast(message, type = "info") {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
}

// ======== 初期化 ========
document.addEventListener("DOMContentLoaded", () => {
  const game = new GeoGame();
  const passportMgr = new PassportManager();
  const ui = new GameUI(game, passportMgr);
  ui.init();
});
