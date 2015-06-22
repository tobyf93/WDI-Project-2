$(document).ready(function() {

  if ($('#drawingGive').length === 0) {
    return
  };
  $.ajax({
    url: '/word',
    dataType: 'json'
  }).done(function(data) {
    console.log(data);


  var joinGame = function() {
    dispatcher.trigger('game.join');
  };

  channel.bind('join', function(data) {
    console.log(data);
    $('#players').html('');

    for (var i = 0; i < data.players.length; i++) {
      $newPlayer = $('<li>user_id: ' + data.players[i].user_id + '</li>');
      $newPlayer.appendTo('#players');
    };

  });


  channel.bind('leave', function(data) {
    console.log(data.username + ' left the game.');
    $('#players').html('');

    for (var i = 0; i < data.players.length; i++) {
      $newPlayer = $('<li>user_id: ' + data.players[i].user_id + '</li>');
      $newPlayer.appendTo('#players');
    };

  })

  joinGame();
});
