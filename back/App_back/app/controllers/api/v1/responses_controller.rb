class Api::V1::ResponsesController < ApplicationController
  def generate
    response = "仮データ仮データ仮データ仮データ"
    p response
    render_api(data: response, status: :created)
  end

  private
  def response_params
    params.require(:response).permit(:ai_response, :color_id).merge(user_id: current_user.id)
  end
end
