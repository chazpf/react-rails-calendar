Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  # resources :events

  resources :users, only: [:create, :show, :index] do
    resources :items, only: [:create, :show, :index, :destroy]
  end

  # get 'hello_world', to: 'hello_world#index'

  namespace :api do
    namespace :v1 do
      get 'events/index'
      get 'events/:id', to: 'events#show'
      post 'events/create'
      put 'events/:id', to: 'events#update'
      patch 'events/:id', to: 'events#update'
      delete 'events/:id', to: 'events#destroy'
    end
  end

  root "events#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
