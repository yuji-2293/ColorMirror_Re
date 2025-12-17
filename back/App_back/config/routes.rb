Rails.application.routes.draw do
  # ユーザー機能のルーティング
  mount_devise_token_auth_for "User", at: "auth", controllers: {
    registrations: "auth/registrations"
}
  # ログインユーザー情報取得のルーティング
  namespace :auth do
    resources :sessions, only: [ :index ]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  namespace :api do
    namespace :v1, format: :json  do
      resources :colors, only: [ :index, :create, :update, :destroy ]
    end
  end
  # Defines the root path route ("/")
  # root "posts#index"
end
