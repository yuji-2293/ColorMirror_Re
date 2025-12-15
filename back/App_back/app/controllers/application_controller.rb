class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
  def render_api(data:, meta: {}, error: nil, status: :ok)
    render json: { data:, meta:, error: }, status:
  end
end
