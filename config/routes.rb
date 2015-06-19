# == Route Map
#
#     Prefix Verb     URI Pattern               Controller#Action
#       root GET      /                         sessions#new
#      login POST     /login(.:format)          sessions#create
#            DELETE   /login(.:format)          sessions#destroy
#        app GET      /app(.:format)            pages#app
# socketdemo GET      /socketdemo(.:format)     pages#socketdemo
#      users GET      /users(.:format)          users#index
#            POST     /users(.:format)          users#create
#   new_user GET      /users/new(.:format)      users#new
#  edit_user GET      /users/:id/edit(.:format) users#edit
#       user GET      /users/:id(.:format)      users#show
#            PATCH    /users/:id(.:format)      users#update
#            PUT      /users/:id(.:format)      users#update
#            DELETE   /users/:id(.:format)      users#destroy
#  websocket GET|POST /websocket(.:format)      websocket_rails
#

Rails.application.routes.draw do
  
  root :to => 'sessions#new'
 
  post '/login' => 'sessions#create'
  delete '/login' => 'sessions#destroy'

  get '/app' => 'pages#app'

  get '/socketdemo' => 'pages#socketdemo'

  resources :users
  
end
