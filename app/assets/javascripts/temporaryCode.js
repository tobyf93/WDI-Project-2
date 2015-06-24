var app = app || {};

$(document).ready(function() {
  app.gameChannel.bind('dictator', function(data) {
    console.log(data);
  });

  // Fakes users all readying up and begins game
  app.startGame = function() {
    app.dispatcher.trigger('game.start', '');
  };
});
