class ApplicationController < ActionController::API
        # SetUserByTokenという拡張機能(CORSやCookie)を利用する
        include DeviseTokenAuth::Concerns::SetUserByToken
        before_action do
          I18n.locale = :ja
        end
        alias_method :current_user, :current_api_v1_user
        alias_method :authenticate_user!, :authenticate_api_v1_user!
  def render_api(data:, meta: {}, error: nil, status: :ok)
    render json: { data:, meta:, error: }, status:
  end
end
