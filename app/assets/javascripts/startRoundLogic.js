$(document).ready(function() {
  
  if ($('#assignRoles').length === 0) {
    return;
  }

  var dispatcher = new WebSocketRails(window.location.host + '/websocket');
  var channel = dispatcher.subscribe('game');
  var my_turn = false;

  var joinGame = function() {
    dispatcher.trigger('game.join');
  };

  channel.bind('join', function(data) {
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
      $newPlayer = $('<li>Player Name: ' + data.users[j].username + ', user_id: ' + data.players[j].user_id + '</li>');
      $newPlayer.appendTo('#playerTiles');
    }
  });

  channel.bind('start_round', function(data) {
    console.log('Listening for my message!');
    
    $name = $('<p>' + data.username + "'s turn</p>");
    $name.appendTo('#miketest');


    dispatcher.trigger('game.get_role');
  });

  $('#assignRoles').on('click', function(e) {
    e.preventDefault();

    dispatcher.trigger('game.start_round');
  });

  channel.bind('game_over', function(msg) {
    // =====================================================
    // Insert the code for what to do when the game is over.
    // =====================================================
    console.log(msg);
  })

  dispatcher.bind('game.not_turn', function(data) {
    // ==========================================================
    // Insert the code for what to do when the person is guessing
    // ========================================================== 
    console.log(data)
    runGuessTurn();
    // dispatcher.unbind('game.not_turn');
    // dispatcher.unbind('game.my_turn');
  });

  dispatcher.bind('game.my_turn', function(data) {
    // =========================================================
    // Insert the code for what to do when the person is drawing
    // =========================================================
    console.log(data)
    runMyTurn();
    // dispatcher.unbind('game.not_turn');
    // dispatcher.unbind('game.my_turn');
  });

  $('#guessButton').on('click', function(e) {
    e.preventDefault();

    var guess = $('#guessField').val();
    dispatcher.trigger('game.submit_guess', guess);
  });

  dispatcher.bind('game.guess_response', function(data) {
    console.log(data);
  });

  var runMyTurn = function() {
    console.log('It is your turn!');
  };

  var runGuessTurn = function() {
    console.log('It is not your turn!');
  };

  $('#resetRoles').on('click', function(e) {
    e.preventDefault();
  });

  joinGame();
});
