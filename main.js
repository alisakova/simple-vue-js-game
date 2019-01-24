new Vue({
  el: "#app",
  data: {
    showStart: true,
    yoursHealth: 100,
    monstersHealth: 100,
    gameLog: []
  },
  methods: {
    startNewGame: function() {
      this.showStart = false;
      this.yoursHealth = 100;
      this.monstersHealth = 100;
      this.gameLog = [];
    },
    giveUp: function() {
      this.showStart = true;
    },
    makeAttack: function() {
      var damage = this.calculateDamage(3, 10);
      this.monstersHealth = this.monstersHealth - damage;
      if (this.checkWin()) {
        return;
      }
      this.gameLog.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage,
      })
      this.monstersAttacks();
    },
    makeSpeacilAttack: function() {
      var damage = this.calculateDamage(10, 20);
      this.monstersHealth = this.monstersHealth - damage;
      this.gameLog.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage,
      })
      if (this.checkWin()) {
        return;
      }
      this.monstersAttacks();
    },
    makeHeal: function() {
      if (this.yoursHealth <= 90) {
        this.yoursHealth = this.yoursHealth + 10;
      } else {
        this.yoursHealth = 100;
      }
      this.gameLog.unshift({
        isPlayer: true,
        text: 'Player heals himself for ' + 10,
      })
      this.monstersAttacks();
    },
    monstersAttacks: function() {
      var damage = this.calculateDamage(5, 12);
      this.yoursHealth = this.yoursHealth - damage;
      this.gameLog.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage,
      });
      this.checkWin();
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monstersHealth <= 0) {
        if (confirm("You won! New Game?")) {
          this.startNewGame();
        } else {
          this.showStart = true;
        }
        return true;
      } else if (this.yoursHealth <= 0) {
        if (confirm("You lose! New Game?")) {
          this.startNewGame();
        } else {
          this.showStart = true;
        }
        return true;
      }
      return false;
    }
  }
})
