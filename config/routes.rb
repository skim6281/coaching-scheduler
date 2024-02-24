Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  
  namespace :api, defaults: {format: :json} do
    namespace :v1, defaults: {format: :json} do
      resource :coach do
        resources :availabilities, only: [:index, :create]
        resources :events, only: [:index, :show] do
          resource :report, only: [:show, :create]
        end
        resources :reports, only: [:index]
      end
      resource :student do
        resources :availabilities, only: [:index] do
          resource :event, only: [:create]
        end
        resources :events, only: [:index]
      end
    end
  end

  # Defines the root path route ("/")
  root "pages#index"

  match "(*path)" => "pages#index", via: [:get, :post]
end
