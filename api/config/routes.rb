Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :keyword_file, path: "upload-file", only: [:index, :show, :create]
    end
  end
end
