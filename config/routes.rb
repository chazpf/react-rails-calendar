Rails.application.routes.draw do
  resources :events
  get 'hello_world', to: 'hello_world#index'

  namespace :api do
    namespace :v1 do
      get 'events/index'
      post 'events/create'
      delete 'events/:id', to: 'events#destroy'
    end
  end
  root "events#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
