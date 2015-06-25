var app = app || {};

app.host = {
  settings: {
    gameStartDelay: 0,
    rounds: 1,
    players: 0,
    phaseLength: 10000,
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
      console.log('\tStarting Round', roundNumber);

      app.dispatcher.trigger('game.start_round');
      app.host.startPhase(roundNumber, 1);
    } else {
      console.log('Ending Game');
    }
  },

  startPhase: function(roundNumber, phaseNumber) {
    if (phaseNumber <= app.host.settings.players) {
      console.log('\t\tStarting Phase', phaseNumber);
      app.dispatcher.trigger('game.start_phase');

      setTimeout(function() {
        app.dispatcher.trigger('game.phase_summary');
        
        app.host.startPhase(roundNumber, ++phaseNumber);
      }, app.host.settings.phaseLength);

    } else {
      console.log('\tEnding Round');

      app.host.startRound(++roundNumber);
    }
  }


};