Rails.application.routes.draw do
  resources :favorites, only: [:create, :destroy]
  resources :recipes, only: [:index, :show, :create, :update, :destroy]
  resources :users, only: [:show, :create, :update]
  resources :avatars, only: [:index]

  # auth routes
  post '/login', to: 'sessions#create'
  delete '/logout', to:'sessions#destroy' 
  get '/me', to: 'users#auth'
end
