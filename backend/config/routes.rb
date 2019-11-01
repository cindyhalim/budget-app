Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :ping, only: [:index]
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  resources :goals, only: [:create]
  resources :image_recognition, only: [:create, :show]
  resources :transactions, only: [:index]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
end
