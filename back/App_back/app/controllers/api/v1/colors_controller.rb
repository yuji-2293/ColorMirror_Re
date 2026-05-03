class Api::V1::ColorsController < ApplicationController
  before_action :set_color, only: [ :show, :update, :destroy ]

  # GET /colors フロントのリクエストユーザーを特定して、そのユーザーのカラーを全て取得する
  def index
    colors = current_user.colors.includes(:response).order(created_at: :desc).limit(10)
    data = colors.map do |color|
      {
        id: color.id,
        color_name: color.color_name,
        mood: color.mood,
        user_id: color.user_id,
        created_at: color.created_at,
        response: {
          id: color.response&.id,
          ai_response: color.response&.ai_response
        }
      }
    end
    render_api(data: data, meta: { total: colors.count })
  end

  def generate
    mood = color_params[:mood]
    generate_colors = AiColorService.generate_color(mood)
    p generate_colors
    render_api(data: { generated_color: generate_colors })
  end

  def create
    color =  current_user.colors.new(color_params)
    if color.save
      render json: color, status: :created
      p color
      p current_user
    else
      render json: color.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: @color
  end

  def update
    if @color.update(color_params)
      render json: @color
    else
      render json: @color.errors, status: :unprocessable_entity
    end
  end
  def destroy
    @color.destroy
    head :no_content
  end
private

  def set_color
    @color = current_user.colors.find(params[:id])
  end

  def color_params
    params.require(:color).permit(:id, :color_name, :mood, :user_id)
  end
end
