class Api::V1::ColorsController < ApplicationController
  before_action :set_color, only: [ :show, :update, :destroy ]

  # GET /colors フロントのリクエストユーザーを特定して、そのユーザーのカラーを全て取得する
  def index
    colors = current_user.colors
    render_api(data: colors, meta: { total: colors.count })
  end

  def create
    # color = Color.new(color_params)
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
