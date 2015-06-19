$(document).ready ->
  return if $('#controls').length == 0

  dispatcher = new WebSocketRails('localhost:3000/websocket');

  # Game Channel
  gameChannel = dispatcher.subscribe 'game'

  gameChannel.bind 'add_player', (data) ->
    console.log data

  gameChannel.bind 'remove_player', (data) ->
    console.log data
  ###################################################




  $('#addPlayer').on 'click', ->
    name = $('#player').val()
    data =
      name: name
    dispatcher.trigger 'game.join', data

  $('#removePlayer').on 'click', ->
    name = $('#player').val()
    data =
      name: name
    dispatcher.trigger 'game.leave', data






