class Api::V1::ResponsesController < ApplicationController
  def generate
    # response = "仮データ仮データ仮データ仮データ"
    mood = generate_params[:mood]
    color_name = generate_params[:color_name]
    response = AiResponseService.new.process(mood:, color_name:)
    p response
    render_api(data: response, status: :created)
  end

  private
  def response_params
    params.require(:response).permit(:ai_response, :color_id).merge(user_id: current_user.id)
  end
  def generate_params
    params.require(:response).permit(:mood, :color_name)
  end
end
