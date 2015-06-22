$(document).ready(function() {
  
  if ($('#players').length === 0) {
    return;
  };

  // $.ajax({
  //   url: '/word',
  //   dataType: 'json'
  // }).done(function(data) {
  //   console.log(data);

  //   $word = $('<p>The Word to Draw is: <b>' + data.name + '</b></p>');
  //   $word.appendTo('#drawingGive');

  //   $image = $('<img src="' + data.related_image + '">');
  //   $image.appendTo('#drawingGive')

  //   for ( var i = 0; i < data.hints.length; i++ ) {
  //     $hint = $('<p>First hint is: ' + data.hints[i].name + '</p>');
  //     $hint.appendTo('#drawingGive');
  //   };
  // });

  var dispatcher = new WebSocketRails(window.location.host + '/websocket');
  var channel = dispatcher.subscribe('game');

  var joinGame = function() {
    dispatcher.trigger('game.join');
  };

  channel.bind('join', function(data) {
    console.log(data);
    $('#players').html('');

    for (var i = 0; i < data.players.length; i++) {
      $newPlayer = $('<li>Player Name: ' + data.users[i].username + ', user_id: ' + data.players[i].user_id +'</li>');
      $newPlayer.appendTo('#players');
    };

  });

  channel.bind('leave', function(data) {
    $('#players').html('');
    // This loop needs to be the length minus one as the player isn't destroyed until after the data has been setup to be passed through.
    for (var j = 0; j < data.players.length; j++) {
      console.log(data);
      $newPlayer = $('<li>Player Name: ' + data.users[j].username + ', user_id: ' + data.players[j].user_id +'</li>');
      $newPlayer.appendTo('#players');
    };

  })

  joinGame();
});