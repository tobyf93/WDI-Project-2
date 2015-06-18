$(document).ready ->
  console.log 'hello world'
  dispatcher = new WebSocketRails('localhost:3000/websocket')

  # Sending data to the server through the open socket from my understanding
  task = 
    name: 'Hey server!  Respond to me please...',
    completed: false

  dispatcher.bind 'test_response', (data) ->
    console.log data

  dispatcher.trigger 'test', task


