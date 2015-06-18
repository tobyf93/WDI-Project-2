$(document).ready ->
  console.log 'hello world'
  dispatcher = new WebSocketRails('localhost:3000/websocket')

  # Sending data to the server through the open socket from my understanding
  task = 
    name: 'Start taking advantage of WebSockets',
    completed: false

  # dispatcher.trigger 'hello', task



  
