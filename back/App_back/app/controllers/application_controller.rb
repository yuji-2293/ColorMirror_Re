class ApplicationController < ActionController::API
        # SetUserByTokenという拡張機能(CORSやCookie)を利用する
        include DeviseTokenAuth::Concerns::SetUserByToken
  def render_api(data:, meta: {}, error: nil, status: :ok)
    render json: { data:, meta:, error: }, status:
  end
end
