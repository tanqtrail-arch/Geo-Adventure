// =============================================================
// Geo Adventure - Save Manager (localStorage)
// ハイスコア, 実績, 図鑑, 設定の永続化
// =============================================================

class SaveManager {
  constructor() {
    this.storageKey = "geo_adventure_save";
    this.data = this.load();
  }

  getDefault() {
    return {
      highScore: 0,
      totalGames: 0,
      totalCorrect: 0,
      totalVisited: [],
      achievements: [],
      encyclopediaUnlocked: [],
      settings: { bgmVolume: 0.5, seVolume: 0.7, timerDefault: false },
      dailyScores: {},
      lastPlayed: null
    };
  }

  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return this.getDefault();
      const parsed = JSON.parse(raw);
      return { ...this.getDefault(), ...parsed };
    } catch (e) {
      return this.getDefault();
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) { /* ignore quota errors */ }
  }

  // ゲーム結果を記録
  recordGame(game) {
    this.data.totalGames++;
    this.data.totalCorrect += game.correctCount;
    if (game.score > this.data.highScore) this.data.highScore = game.score;

    // 訪問都市を記録
    game.visited.forEach(id => {
      if (!this.data.totalVisited.includes(id)) {
        this.data.totalVisited.push(id);
      }
    });

    // 図鑑解放
    game.passport.forEach(p => {
      const city = CITIES.find(c => c.name === p.city);
      if (city && !this.data.encyclopediaUnlocked.includes(city.id)) {
        this.data.encyclopediaUnlocked.push(city.id);
      }
    });

    // デイリースコア
    if (game.isDailyChallenge && game.dailySeed) {
      const key = String(game.dailySeed);
      if (!this.data.dailyScores[key] || game.score > this.data.dailyScores[key]) {
        this.data.dailyScores[key] = game.score;
      }
    }

    this.data.lastPlayed = new Date().toISOString();
    this.save();
  }

  // 実績記録
  unlockAchievement(achId) {
    if (!this.data.achievements.includes(achId)) {
      this.data.achievements.push(achId);
      this.save();
      return true;
    }
    return false;
  }

  hasAchievement(achId) {
    return this.data.achievements.includes(achId);
  }

  getTotalVisited() {
    return this.data.totalVisited.length;
  }

  // 図鑑データ取得
  getEncyclopedia() {
    return CITIES.map(city => ({
      ...city,
      unlocked: this.data.encyclopediaUnlocked.includes(city.id)
    }));
  }

  getDailyScore(seed) {
    return this.data.dailyScores[String(seed)] || 0;
  }

  getStats() {
    return {
      highScore: this.data.highScore,
      totalGames: this.data.totalGames,
      totalCorrect: this.data.totalCorrect,
      citiesDiscovered: this.data.totalVisited.length,
      totalCities: CITIES.length,
      achievementsUnlocked: this.data.achievements.length,
      totalAchievements: ACHIEVEMENTS.length
    };
  }
}
