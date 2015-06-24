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

    for (var i = 0; i < data.length; i++) {
      $newPlayer = $('<li>Player Name: ' + data[i].username + ', user_id: ' + data[i].player.user_id + '</li>');
      $newPlayer.appendTo('#playerTiles');
    };

  });

  channel.bind('leave', function(data) {
    $('#playerTiles').html('');
    console.log('players remaining after leave');
    console.log(data);
    // This loop needs to be the length minus one as the player isn't destroyed until after the data has been setup to be passed through.
    for (var j = 0; j < data.length; j++) {
      $newPlayer = $('<li>Player Name: ' + data[j].username + ', user_id: ' + data[j].player.user_id + '</li>');
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
    // Change view on gameover. 
    console.log(msg);
  });

  channel.bind('end_round', function() {
    console.log('THE ROUND HAS ENDED, FETCHING SCORE!');
    dispatcher.trigger('game.get_score');
  });

  dispatcher.bind('game.get_score', function(data) {
    console.log(data);
  });

  dispatcher.bind('game.my_turn', function(data) {

    console.log(data)
    if (data.my_turn) {
      runMyTurn(data.word);  
    } else {
      runGuessTurn();
    };
  });

  $('#guessButton').on('click', function(e) {
    e.preventDefault();
    // TODO: This variable will need to be replaced with the actual time from the timer at the time the submit function runs.

    var data = {
      guess: $('#guessField').val(),
    }
    // var guess = $('#guessField').val();
    dispatcher.trigger('game.submit_guess', data);
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

    markReady();
  });

  var markReady = function() {
    console.log('triggering ready function');
    dispatcher.trigger('game.mark_ready');
  };

  channel.bind('player_states', function(data) {
    console.log('Here is the player IDs and states');
    console.log(data);
  });

  joinGame();  
});
