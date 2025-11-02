class Api::V1::ColorsController < ApplicationController
  before_action :set_color, only: [:show, :update, :destroy]

  def index
    color = Color.all
    render json: color
  end

  def create
    color = Color.new(color_params)
    if color.save
      render json: color, status: :created
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
    @color = Color.find(params[:id])
  end

  def color_params
    params.require(:color).permit(:color_name, :mood)
  end

end
