# == Route Map
#
#               Prefix Verb     URI Pattern               Controller#Action
#                 root GET      /                         pages#app
#                login GET      /login(.:format)          sessions#new
#                      POST     /login(.:format)          sessions#create
# destroy_user_session DELETE   /login(.:format)          sessions#destroy
#                  app GET      /app(.:format)            pages#app
#           socketdemo GET      /socketdemo(.:format)     pages#socketdemo
#            gamestate GET      /gamestate(.:format)      pages#gamestate
#                users GET      /users(.:format)          users#index
#                      POST     /users(.:format)          users#create
#             new_user GET      /users/new(.:format)      users#new
#            edit_user GET      /users/:id/edit(.:format) users#edit
#                 user GET      /users/:id(.:format)      users#show
#                      PATCH    /users/:id(.:format)      users#update
#                      PUT      /users/:id(.:format)      users#update
#                      DELETE   /users/:id(.:format)      users#destroy
#            websocket GET|POST /websocket(.:format)      websocket_rails
#

Rails.application.routes.draw do
  root :to => 'pages#app'

  resources :users

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete '/login' => 'sessions#destroy', :as => 'destroy_user_session'

  get '/word' => 'words#get_word'

  get '/app' => 'pages#app'

  # Demo Stuff
  get '/socketdemo' => 'pages#socketdemo'
  get '/gamestate' => 'pages#gamestate'
  get '/canvas' => 'pages#canvasdemo'
end
