Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :ping, only: [:index]
  resources :sessions, only: [:create]
  resources :registrations, only: [:create, :update]
  resources :goals, only: [:create, :index, :update, :destroy]
  resources :image_recognition, only: [:create, :show]
  resources :transactions, only: [:index, :create]
  resources :game, only: [:index]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  get :check_budget_met, to: "goals#check_budget_met"
  get :check_badges, to: "registrations#check_badges"
end
