var app = app || {};

$(document).ready(function() {


  // Fakes users all readying up and begins game
  app.startGame = function() {
    app.dispatcher.trigger('game.start', '');
  };
});
