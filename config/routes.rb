# == Route Map
#
#    Prefix Verb     URI Pattern               Controller#Action
#     login GET      /login(.:format)          sessions#new
#           POST     /login(.:format)          sessions#create
#           DELETE   /login(.:format)          sessions#destroy
#     users GET      /users(.:format)          users#index
#           POST     /users(.:format)          users#create
#  new_user GET      /users/new(.:format)      users#new
# edit_user GET      /users/:id/edit(.:format) users#edit
#      user GET      /users/:id(.:format)      users#show
#           PATCH    /users/:id(.:format)      users#update
#           PUT      /users/:id(.:format)      users#update
#           DELETE   /users/:id(.:format)      users#destroy
#      root GET      /                         pages#socketdemo
# websocket GET|POST /websocket(.:format)      websocket_rails
#

Rails.application.routes.draw do
  
  root :to => 'pages#socketdemo'
  
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete '/login' => 'sessions#destroy'

  resources :users
  
end
