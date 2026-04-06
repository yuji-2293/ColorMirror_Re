class Api::V1::ResponsesController < ApplicationController
  def generate
    mood = generate_params[:mood]
    color_name = generate_params[:color_name]
    response = AiResponseService.new.process(mood:, color_name:)
    p response
    render_api(data: response, status: :created)
  end

  def create
    ActiveRecord::Base.transaction do
      color = current_user.colors.create!(color_params)
      response = current_user.responses.create!(response_params.merge(color_id: color.id))
      render_api(data: { color: color, response: response }, status: :created)
    end
  rescue ActiveRecord::RecordInvalid => e
    render_api(data: nil, error: e.record.errors.full_messages, status: :unprocessable_entity)

    # response = current_user.responses.new(response_params)
    # if response.save
    #   render_api(data: response, status: :created)
    # else
    #   render_api(data: nil, error: response.errors.full_messages, status: :unprocessable_entity)
    # end
  end

  private
  def set_response
    @response = current_user.responses.find(params[:id])
  end
  def color_params
    params.require(:color).permit(:color_name, :mood)
  end
  def response_params
    params.require(:response).permit(:ai_response).merge(user_id: current_user.id)
  end
  def generate_params
    params.require(:response).permit(:mood, :color_name)
  end
end
