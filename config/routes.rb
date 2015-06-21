# == Route Map
#
#     Prefix Verb     URI Pattern           Controller#Action
#       root GET      /                     pages#app
#      login GET      /login(.:format)      sessions#new
#            POST     /login(.:format)      sessions#create
#            DELETE   /login(.:format)      sessions#destroy
#        app GET      /app(.:format)        pages#app
# socketdemo GET      /socketdemo(.:format) pages#socketdemo
#  gamestate GET      /gamestate(.:format)  pages#gamestate
#  websocket GET|POST /websocket(.:format)  websocket_rails
#

Rails.application.routes.draw do
  root :to => 'pages#app'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete '/login' => 'sessions#destroy', :as => 'destroy_user_session'

  get '/app' => 'pages#app'

  # Demo Stuff
  get '/socketdemo' => 'pages#socketdemo'
  get '/gamestate' => 'pages#gamestate'

resources :users
end
