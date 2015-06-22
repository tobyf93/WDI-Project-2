# == Route Map
#
#               Prefix Verb     URI Pattern                              Controller#Action
#                 root GET      /                                        pages#app
#                users GET      /users(.:format)                         users#index
#                      POST     /users(.:format)                         users#create
#             new_user GET      /users/new(.:format)                     users#new
#            edit_user GET      /users/:id/edit(.:format)                users#edit
#                 user GET      /users/:id(.:format)                     users#show
#                      PATCH    /users/:id(.:format)                     users#update
#                      PUT      /users/:id(.:format)                     users#update
#                      DELETE   /users/:id(.:format)                     users#destroy
#           word_hints GET      /words/:word_id/hints(.:format)          hints#index
#                      POST     /words/:word_id/hints(.:format)          hints#create
#        new_word_hint GET      /words/:word_id/hints/new(.:format)      hints#new
#       edit_word_hint GET      /words/:word_id/hints/:id/edit(.:format) hints#edit
#            word_hint GET      /words/:word_id/hints/:id(.:format)      hints#show
#                      PATCH    /words/:word_id/hints/:id(.:format)      hints#update
#                      PUT      /words/:word_id/hints/:id(.:format)      hints#update
#                      DELETE   /words/:word_id/hints/:id(.:format)      hints#destroy
#                words GET      /words(.:format)                         words#index
#                      POST     /words(.:format)                         words#create
#             new_word GET      /words/new(.:format)                     words#new
#            edit_word GET      /words/:id/edit(.:format)                words#edit
#                 word GET      /words/:id(.:format)                     words#show
#                      PATCH    /words/:id(.:format)                     words#update
#                      PUT      /words/:id(.:format)                     words#update
#                      DELETE   /words/:id(.:format)                     words#destroy
#                login GET      /login(.:format)                         sessions#new
#                      POST     /login(.:format)                         sessions#create
# destroy_user_session DELETE   /login(.:format)                         sessions#destroy
#          loaddrawing GET      /loaddrawing(.:format)                   pages#loaddrawing
#                      GET      /word(.:format)                          words#get_word
#                  app GET      /app(.:format)                           pages#app
#           socketdemo GET      /socketdemo(.:format)                    pages#socketdemo
#            gamestate GET      /gamestate(.:format)                     pages#gamestate
#               canvas GET      /canvas(.:format)                        pages#canvasdemo
#            websocket GET|POST /websocket(.:format)                     websocket_rails
#

Rails.application.routes.draw do
  root :to => 'pages#app'

  resources :users

  resources :words do
    resources :hints
  end

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete '/login' => 'sessions#destroy', :as => 'destroy_user_session'

  get '/loaddrawing' => 'pages#loaddrawing'
  get '/word' => 'words#get_word'

  get '/app' => 'pages#app'

  # Demo Stuff
  get '/socketdemo' => 'pages#socketdemo'
  get '/gamestate' => 'pages#gamestate'
  get '/canvas' => 'pages#canvasdemo'
end
