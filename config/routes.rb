Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount ActionCable.server => '/cable'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]

    resources :chats, only: [:index, :create, :show, :edit] do
      resources :messages, only: [:index, :create, :show, :edit, :destroy]
    end

  end

  root to: 'static_pages#root'

end
