class ApplicationController < ActionController::API
  def render_api(data:, meta: {}, error: nil, status: :ok)
    render json: { data:, meta:, error:  }, status:
  end
end
