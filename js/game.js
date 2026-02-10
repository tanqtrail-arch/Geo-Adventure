// =============================================================
// Geo Adventure - Game Engine
// ゲーム状態管理・ターン制御・スコア計算
// =============================================================

class GeoGame {
  constructor() {
    this.reset();
  }

  reset() {
    this.hp = GAME_CONFIG.initialHP;
    this.score = 0;
    this.currentRound = 0;
    this.totalRounds = GAME_CONFIG.roundsTotal;
    this.correctCount = 0;
    this.visited = [];          // 訪問済み都市ID
    this.passport = [];         // パスポートスタンプ
    this.treasures = [];        // 獲得秘宝
    this.hintsRevealed = [];    // 現在ラウンドで開示済みヒント
    this.currentCity = null;
    this.availableCities = [...CITIES];
    this.gameOver = false;
    this.routeHistory = [];     // 選んだルートの履歴
  }

  // ゲーム開始 - 最初の都市を設定
  start() {
    this.reset();
    this.pickNextCity();
  }

  // 利用可能な都市からリージョンフィルタ付きで選択
  pickNextCity(preferredRegion) {
    const unvisited = this.availableCities.filter(
      c => !this.visited.includes(c.id)
    );

    if (unvisited.length === 0) {
      this.endGame();
      return null;
    }

    let candidates = unvisited;
    if (preferredRegion) {
      const regionFiltered = unvisited.filter(c => c.region === preferredRegion);
      if (regionFiltered.length > 0) {
        candidates = regionFiltered;
      }
    }

    // ランダム選択
    const idx = Math.floor(Math.random() * candidates.length);
    this.currentCity = candidates[idx];
    this.hintsRevealed = [];
    this.currentRound++;
    return this.currentCity;
  }

  // ヒントを開示（コスト消費）
  revealHint(hintIndex) {
    if (this.gameOver) return null;
    if (this.hintsRevealed.includes(hintIndex)) return null;

    const hint = this.currentCity.hints[hintIndex];
    if (!hint) return null;

    if (this.hp < hint.cost) {
      return { success: false, reason: "hp_shortage", cost: hint.cost, currentHP: this.hp };
    }

    this.hp -= hint.cost;
    this.hintsRevealed.push(hintIndex);

    if (this.hp <= 0) {
      this.hp = 0;
      this.gameOver = true;
    }

    return { success: true, hint, cost: hint.cost, currentHP: this.hp };
  }

  // 回答を判定
  submitAnswer(answer) {
    if (this.gameOver) return null;

    const isCorrect = answer === this.currentCity.name;
    const hintsUsed = this.hintsRevealed.length;

    let hpChange = 0;
    let bonus = "";

    if (isCorrect) {
      this.correctCount++;
      hpChange = GAME_CONFIG.correctAnswerReward;

      // 少ないヒントボーナス
      if (hintsUsed <= 1) {
        hpChange += GAME_CONFIG.perfectBonus;
        bonus = "パーフェクトボーナス！";
      }

      this.hp = Math.min(100, this.hp + hpChange);
      this.score += (100 - hintsUsed * 25);

      // パスポートスタンプ＆秘宝
      this.passport.push({
        city: this.currentCity.name,
        country: this.currentCity.country,
        stamp: this.currentCity.passportStamp
      });

      this.treasures.push(this.currentCity.treasure);
      this.visited.push(this.currentCity.id);
    } else {
      hpChange = -GAME_CONFIG.wrongAnswerPenalty;
      this.hp = Math.max(0, this.hp + hpChange);
      this.visited.push(this.currentCity.id);

      if (this.hp <= 0) {
        this.gameOver = true;
      }
    }

    return {
      isCorrect,
      correctAnswer: this.currentCity.name,
      country: this.currentCity.country,
      hpChange,
      bonus,
      currentHP: this.hp,
      score: this.score,
      treasure: isCorrect ? this.currentCity.treasure : null,
      stamp: isCorrect ? this.currentCity.passportStamp : null
    };
  }

  // ルート選択（次の地域を決定）
  getRouteOptions() {
    const unvisited = this.availableCities.filter(
      c => !this.visited.includes(c.id)
    );

    const availableRegions = [...new Set(unvisited.map(c => c.region))];
    return availableRegions.map(r => ({
      region: r,
      ...ROUTE_CHOICES[r]
    }));
  }

  selectRoute(region) {
    this.routeHistory.push(region);
    return this.pickNextCity(region);
  }

  // ゲーム終了判定
  shouldEndGame() {
    return this.gameOver ||
           this.currentRound >= this.totalRounds ||
           this.hp <= 0;
  }

  endGame() {
    this.gameOver = true;
  }

  // エンディング判定
  getEnding() {
    if (this.hp <= 0 && this.correctCount < 3) {
      return ENDINGS.bad;
    }
    if (this.correctCount === this.totalRounds && this.hp >= 50) {
      return ENDINGS.perfect;
    }
    if (this.correctCount >= 5) {
      return ENDINGS.good;
    }
    if (this.correctCount >= 3) {
      return ENDINGS.normal;
    }
    return ENDINGS.bad;
  }

  // 現在の状態サマリー
  getStatus() {
    return {
      hp: this.hp,
      score: this.score,
      round: this.currentRound,
      totalRounds: this.totalRounds,
      correctCount: this.correctCount,
      fragmentsCollected: this.treasures.length,
      fragmentsNeeded: GAME_CONFIG.totalFragments
    };
  }
}
