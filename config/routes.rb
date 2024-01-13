Rails.application.routes.draw do
  resources :tags
  resources :recipe_tags
  resources :favorites
  resources :directions
  resources :ingredients
  resources :recipes
  resources :users
  resources :avatars
  # route to test your configuration
  get '/hello', to: 'application#hello_world'
end
