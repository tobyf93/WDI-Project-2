Rails.application.routes.draw do
  
  # get '/' => 'sessions#new'
  # post '/' => 'sessions#create'
  # delete '/' => 'sessions#destroy'

  resources :users
  root :to => 'pages#socketdemo'
end
