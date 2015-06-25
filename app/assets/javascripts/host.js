var app = app || {};

app.host = {
  settings: {
    gameStartDelay: 0,
    rounds: 1,
    players: 5,
    phaseLength: 4000,
    roundSummaryLength: 5000
  },

  start: function() {
    setTimeout(app.host.startGame, this.settings.gameStartDelay);
  },

  startGame: function() {
    console.log('Starting Game');
    app.host.startRound(1);
  },

  startRound: function(roundNumber) {
    if (roundNumber <= app.host.settings.rounds) {
      console.log('\tStarting Round');
        app.host.startPhase(roundNumber, 1);
    } else {
      console.log('Ending Game');
    }
  },

  startPhase: function(roundNumber, phaseNumber) {
    console.log('\t\tStarting Phase', phaseNumber);

    if (phaseNumber < app.host.settings.players) {
      setTimeout(function() {
        app.host.startPhase(roundNumber, ++phaseNumber);
      }, 1000);
    } else {
      console.log('\tEnding Round');
      app.host.startRound(++roundNumber);
    }
  }


};