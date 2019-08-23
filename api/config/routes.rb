Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :keyword, path: "keywords", only: [:index, :show, :create]
      resources :user, path: "users", only: [:index, :show, :create]
    end
  end
end
