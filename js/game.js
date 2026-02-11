// =============================================================
// Geo Adventure - Game Engine (Expanded)
// 難易度, コンボ, タイマー, ライフライン, ショップ, デイリー
// =============================================================

class GeoGame {
  constructor() {
    this.reset();
  }

  reset() {
    this.difficulty = "normal";
    this.hp = GAME_CONFIG.initialHP;
    this.maxHP = GAME_CONFIG.initialHP;
    this.score = 0;
    this.currentRound = 0;
    this.totalRounds = GAME_CONFIG.roundsTotal;
    this.correctCount = 0;
    this.visited = [];
    this.passport = [];
    this.treasures = [];
    this.hintsRevealed = [];
    this.currentCity = null;
    this.availableCities = [...CITIES];
    this.gameOver = false;
    this.routeHistory = [];

    // コンボ
    this.combo = 0;
    this.maxCombo = 0;

    // ライフライン
    this.lifeline5050 = GAME_CONFIG.lifeline5050Uses;
    this.lifeline5050UsedThisRound = false;

    // タイマー
    this.timerEnabled = false;
    this.timerRemaining = GAME_CONFIG.timerDuration;
    this.timerRunning = false;
    this.timerInterval = null;

    // ショップ
    this.inventory = [];
    this.shopPurchases = 0;
    this.activeEffects = { discount: 1, shield: 0, regionHint: false };

    // 実績追跡用
    this.noHintCorrect = 0;
    this.fastAnswers = 0;
    this.visitedRegions = new Set();
    this.synthesized = [];
    this.isDailyChallenge = false;

    // デイリーチャレンジ
    this.dailySeed = null;
  }

  // 難易度設定してスタート
  start(difficulty = "normal", daily = false) {
    this.reset();
    this.difficulty = difficulty;
    const diff = DIFFICULTY[difficulty];
    this.hp = diff.hp;
    this.maxHP = diff.hp;
    this.totalRounds = diff.rounds;

    if (daily) {
      this.isDailyChallenge = true;
      this.dailySeed = this.getDailySeed();
      this.timerEnabled = true;
    }

    this.shuffleCities();
    this.pickNextCity();
  }

  // デイリーシード生成
  getDailySeed() {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  // シード付きシャッフル
  shuffleCities() {
    const seed = this.dailySeed || Date.now();
    let s = seed;
    const rng = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
    const arr = [...CITIES];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    this.availableCities = arr;
  }

  pickNextCity(preferredRegion) {
    const unvisited = this.availableCities.filter(c => !this.visited.includes(c.id));
    if (unvisited.length === 0) { this.endGame(); return null; }

    let candidates = unvisited;
    if (preferredRegion) {
      const filtered = unvisited.filter(c => c.region === preferredRegion);
      if (filtered.length > 0) candidates = filtered;
    }

    const idx = Math.floor(Math.random() * candidates.length);
    this.currentCity = candidates[idx];
    this.hintsRevealed = [];
    this.lifeline5050UsedThisRound = false;
    this.currentRound++;
    this.visitedRegions.add(this.currentCity.region);

    if (this.timerEnabled) {
      this.timerRemaining = GAME_CONFIG.timerDuration;
    }
    return this.currentCity;
  }

  // タイマー開始
  startTimer(onTick, onTimeout) {
    if (!this.timerEnabled) return;
    this.timerRunning = true;
    this.timerInterval = setInterval(() => {
      this.timerRemaining--;
      if (onTick) onTick(this.timerRemaining);
      if (this.timerRemaining <= 0) {
        this.stopTimer();
        if (onTimeout) onTimeout();
      }
    }, 1000);
  }

  stopTimer() {
    this.timerRunning = false;
    if (this.timerInterval) { clearInterval(this.timerInterval); this.timerInterval = null; }
  }

  // ヒント開示
  revealHint(hintIndex) {
    if (this.gameOver) return null;
    if (this.hintsRevealed.includes(hintIndex)) return null;

    const hint = this.currentCity.hints[hintIndex];
    if (!hint) return null;

    const diff = DIFFICULTY[this.difficulty];
    const costMult = diff.costMult * this.activeEffects.discount;
    const actualCost = Math.ceil(hint.cost * costMult);

    if (this.hp < actualCost) {
      return { success: false, reason: "hp_shortage", cost: actualCost, currentHP: this.hp };
    }

    this.hp -= actualCost;
    this.hintsRevealed.push(hintIndex);

    // 割引効果は1ラウンドで切れる
    if (this.activeEffects.discount < 1) {
      this.activeEffects.discount = 1;
    }

    if (this.hp <= 0) { this.hp = 0; this.gameOver = true; }
    return { success: true, hint, cost: actualCost, currentHP: this.hp };
  }

  // 50:50ライフライン
  use5050() {
    if (this.lifeline5050 <= 0 || this.lifeline5050UsedThisRound) return null;
    this.lifeline5050--;
    this.lifeline5050UsedThisRound = true;

    const correct = this.currentCity.name;
    const wrong = this.currentCity.choices.filter(c => c !== correct);
    // ランダムに1つの不正解を残す
    const keepIdx = Math.floor(Math.random() * wrong.length);
    const remaining = [correct, wrong[keepIdx]];
    // シャッフル
    if (Math.random() > 0.5) remaining.reverse();
    return remaining;
  }

  // 回答判定
  submitAnswer(answer) {
    if (this.gameOver) return null;
    this.stopTimer();

    const isCorrect = answer === this.currentCity.name;
    const hintsUsed = this.hintsRevealed.length;
    const diff = DIFFICULTY[this.difficulty];

    let hpChange = 0;
    let bonus = "";
    let comboMultiplier = 1;

    if (isCorrect) {
      this.correctCount++;
      this.combo++;
      if (this.combo > this.maxCombo) this.maxCombo = this.combo;

      // コンボボーナス
      comboMultiplier = this.combo < GAME_CONFIG.comboMultipliers.length
        ? GAME_CONFIG.comboMultipliers[this.combo]
        : GAME_CONFIG.comboMultipliers[GAME_CONFIG.comboMultipliers.length - 1];

      hpChange = diff.reward;

      // ノーヒントボーナス
      if (hintsUsed === 0) {
        this.noHintCorrect++;
        hpChange += GAME_CONFIG.perfectBonus * 2;
        bonus = "ノーヒントボーナス！";
      } else if (hintsUsed <= 1) {
        hpChange += GAME_CONFIG.perfectBonus;
        bonus = "パーフェクトボーナス！";
      }

      // タイマーボーナス
      let timerBonus = 0;
      if (this.timerEnabled && this.timerRemaining >= 30) {
        this.fastAnswers++;
        timerBonus = Math.floor((this.timerRemaining / GAME_CONFIG.timerDuration) * GAME_CONFIG.timerBonusMax);
        bonus += (bonus ? " + " : "") + `速答ボーナス！`;
      }

      this.hp = Math.min(this.maxHP, this.hp + hpChange);
      const baseScore = 100 - hintsUsed * 25 + timerBonus;
      const roundScore = Math.floor(baseScore * comboMultiplier);
      this.score += roundScore;

      this.passport.push({ city: this.currentCity.name, country: this.currentCity.country, stamp: this.currentCity.passportStamp });
      this.treasures.push(this.currentCity.treasure);
      this.visited.push(this.currentCity.id);

      if (comboMultiplier > 1) {
        bonus += (bonus ? " + " : "") + `${this.combo}コンボ！(x${comboMultiplier})`;
      }

      return {
        isCorrect: true, correctAnswer: this.currentCity.name, country: this.currentCity.country,
        hpChange, bonus, currentHP: this.hp, score: this.score, roundScore,
        treasure: this.currentCity.treasure, stamp: this.currentCity.passportStamp,
        combo: this.combo, comboMultiplier
      };
    } else {
      this.combo = 0;

      if (this.activeEffects.shield > 0) {
        this.activeEffects.shield--;
        hpChange = 0;
        bonus = "シールド発動！ダメージ無効！";
      } else {
        hpChange = -diff.penalty;
        this.hp = Math.max(0, this.hp + hpChange);
      }

      this.visited.push(this.currentCity.id);
      if (this.hp <= 0) this.gameOver = true;

      return {
        isCorrect: false, correctAnswer: this.currentCity.name, country: this.currentCity.country,
        hpChange, bonus, currentHP: this.hp, score: this.score, roundScore: 0,
        treasure: null, stamp: null, combo: 0, comboMultiplier: 1
      };
    }
  }

  // ショップ購入
  buyItem(itemId) {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item || this.score < item.cost) return { success: false, reason: "insufficient_score" };

    this.score -= item.cost;
    this.shopPurchases++;

    switch (item.effect.type) {
      case "heal":
        this.hp = Math.min(this.maxHP, this.hp + item.effect.value);
        break;
      case "discount":
        this.activeEffects.discount = item.effect.value;
        break;
      case "lifeline":
        this.lifeline5050 += item.effect.value;
        break;
      case "shield":
        this.activeEffects.shield += item.effect.value;
        break;
      case "region_hint":
        this.activeEffects.regionHint = true;
        break;
    }
    this.inventory.push(item);
    return { success: true, item };
  }

  // 秘宝合成
  trySynthesize(recipeId) {
    const recipe = SYNTHESIS_RECIPES.find(r => r.id === recipeId);
    if (!recipe) return null;

    const treasureNames = this.treasures.map(t => t.name);
    const synthNames = this.synthesized.map(s => s.name);
    const allNames = [...treasureNames, ...synthNames];
    const hasAll = recipe.ingredients.every(ing => allNames.includes(ing));

    if (!hasAll) return { success: false, missing: recipe.ingredients.filter(i => !allNames.includes(i)) };

    const synthItem = { name: recipe.name, icon: recipe.icon, description: recipe.description };
    this.synthesized.push(synthItem);
    this.score += recipe.bonus.score;

    return { success: true, item: synthItem, bonusScore: recipe.bonus.score };
  }

  // 利用可能な合成レシピ
  getAvailableRecipes() {
    const owned = [...this.treasures.map(t => t.name), ...this.synthesized.map(s => s.name)];
    const completed = this.synthesized.map(s => s.name);
    return SYNTHESIS_RECIPES.map(r => ({
      ...r,
      canSynthesize: r.ingredients.every(i => owned.includes(i)) && !completed.includes(r.name),
      alreadyOwned: completed.includes(r.name),
      ingredientStatus: r.ingredients.map(i => ({ name: i, owned: owned.includes(i) }))
    }));
  }

  // ルート選択
  getRouteOptions() {
    const unvisited = this.availableCities.filter(c => !this.visited.includes(c.id));
    const regions = [...new Set(unvisited.map(c => c.region))];
    return regions.map(r => ({ region: r, ...ROUTE_CHOICES[r] }));
  }

  selectRoute(region) {
    this.routeHistory.push(region);
    return this.pickNextCity(region);
  }

  // 地域ヒント
  getRegionHint() {
    if (!this.activeEffects.regionHint) return null;
    this.activeEffects.regionHint = false;
    return { region: this.currentCity.region, label: this.currentCity.regionLabel };
  }

  shouldEndGame() {
    return this.gameOver || this.currentRound >= this.totalRounds || this.hp <= 0;
  }

  endGame() { this.gameOver = true; this.stopTimer(); }

  getEnding() {
    if (this.hp <= 0 && this.correctCount < 3) return ENDINGS.bad;
    if (this.correctCount === this.totalRounds && this.hp >= 50) return ENDINGS.perfect;
    if (this.correctCount >= 5) return ENDINGS.good;
    if (this.correctCount >= 3) return ENDINGS.normal;
    return ENDINGS.bad;
  }

  // 実績チェック
  checkAchievements(saveManager) {
    const newlyUnlocked = [];
    for (const ach of ACHIEVEMENTS) {
      if (saveManager && saveManager.hasAchievement(ach.id)) continue;
      if (ach.id === "globe_trotter") {
        if (saveManager && saveManager.getTotalVisited() >= 10) newlyUnlocked.push(ach);
      } else if (ach.condition(this)) {
        newlyUnlocked.push(ach);
      }
    }
    return newlyUnlocked;
  }

  getStatus() {
    return {
      hp: this.hp, maxHP: this.maxHP, score: this.score,
      round: this.currentRound, totalRounds: this.totalRounds,
      correctCount: this.correctCount,
      fragmentsCollected: this.treasures.length, fragmentsNeeded: GAME_CONFIG.totalFragments,
      combo: this.combo, lifeline5050: this.lifeline5050,
      difficulty: this.difficulty, timerEnabled: this.timerEnabled,
      timerRemaining: this.timerRemaining, shield: this.activeEffects.shield
    };
  }

  // 結果シェアテキスト生成
  generateShareText() {
    const ending = this.getEnding();
    const s = this.getStatus();
    const diff = DIFFICULTY[this.difficulty];
    const stars = "⭐".repeat(Math.min(5, this.correctCount)) + "☆".repeat(Math.max(0, 5 - this.correctCount));
    const stamps = this.passport.map(p => p.stamp).join("");

    return [
      `🗺️ Geo Adventure - 消えた航海図`,
      ``,
      `称号: ${ending.title}`,
      `難易度: ${diff.label}`,
      `スコア: ${s.score} | 正解: ${s.correctCount}/${s.totalRounds}`,
      `航海図: ${s.fragmentsCollected}/${s.fragmentsNeeded}ピース`,
      `評価: ${stars}`,
      stamps ? `訪問国: ${stamps}` : "",
      this.isDailyChallenge ? `📅 デイリーチャレンジ #${this.dailySeed}` : "",
      ``,
      `#GeoAdventure`
    ].filter(Boolean).join("\n");
  }
}
