WebsocketRails::EventMap.describe do
  # Events that can be triggered via the client.  This allows clients to privately
  # communicate with the server over the open socket.  It is then the servers job
  # to either respond privately to the client or broadcast information to all clients
  # via the public channels.

  subscribe :test, 'socket#test'

  namespace :game do
    subscribe :join, 'game_socket#join'
    subscribe :leave, 'game_socket#leave'
    subscribe :draw, 'game_socket#draw'
  end

  subscribe :client_disconnected, 'game_socket#leave'
end
