Rails.application.routes.draw do
  # ユーザー機能のルーティング

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  namespace :api do
    namespace :v1, format: :json  do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
          registrations: "api/v1/auth/registrations"
      }
    # ログインユーザー情報取得のルーティング
    namespace :auth do
      resources :sessions, only: [ :index ]
    end
    # カラー関連のルーティング
    resources :colors, only: [ :index, :create, :update, :destroy ] do
      collection do
        post "generate", to: "colors#generate"
      end
    end
    # AIレスポンス関連のルーティング
    resources :responses, only: [ :index, :create, :destroy ] do
      collection do
        post "generate", to: "responses#generate"
      end
    end
    end
  end
  # Defines the root path route ("/")
  # root "posts#index"
end
