var app = app || {};

$(document).ready(function() {
  $.wait = function(time) {
    return $.Deferred(function(dfd) { setTimeout(dfd.resolve, time); });
  };
});

app.host = {
  settings: {
    gameStartDelay: 0,
    rounds: 1,
    players: 0,
    phaseLength: 10000,
    phaseSummaryLength: 5000
  },

  start: function() {
    $.wait(this.settings.gameStartDelay).then(app.host.startGame);
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
      $.wait(app.host.settings.phaseLength).then(function() {
        app.host.startPhaseSummary(roundNumber, phaseNumber);
      });
    } else {
      console.log('\tEnding Round');
      app.host.startRound(++roundNumber);
    }
  },

  startPhaseSummary: function(roundNumber, phaseNumber) {
    app.dispatcher.trigger('game.phase_summary'); 

    $.wait(app.host.settings.phaseSummaryLength).then(function() {
      app.host.startPhase(roundNumber, ++phaseNumber);
    });
  }

};