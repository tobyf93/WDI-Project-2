$(document).ready(function() {

  // if ($('#drawingGive').length === 0) {
  //   return;
  // }
  // $.ajax({
  //   url: '/word',
  //   dataType: 'json'
  // }).done(function(data) {
  //   console.log(data);
  // });

  if ($('#drawsomeCanv').length === 0) {
    return;
  };

  var dispatcher = new WebSocketRails(window.location.host + '/websocket');
  var channel = dispatcher.subscribe('game');

  var joinGame = function() {
    dispatcher.trigger('game.join');
  };

  channel.bind('join', function(data) {
    console.log(data);
    $('#playerTiles').html('');

    for (var i = 0; i < data.players.length; i++) {
      $newPlayer = $('<li>Player Name: ' + data.users[i].username + ', user_id: ' + data.players[i].user_id + '</li>');
      $newPlayer.appendTo('#playerTiles');
    };

  });


  channel.bind('leave', function(data) {
    $('#playerTiles').html('');
    // This loop needs to be the length minus one as the player isn't destroyed until after the data has been setup to be passed through.
    for (var j = 0; j < data.players.length; j++) {
      console.log(data);
      $newPlayer = $('<li>Player Name: ' + data.users[j].username + ', user_id: ' + data.players[j].user_id + '</li>');
      $newPlayer.appendTo('#playerTiles');
    }

  });

  joinGame();
});
