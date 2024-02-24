class Api::V1::AvailabilitiesController < ApplicationController
  before_action :set_coach, only: [:index, :create]
  
  def index
    route = request.path
    if route == "/api/v1/coach/availabilities"
      @availabilities = @coach.availabilities.includes(:event)
      render json: @availabilities.sort_by(&:start_time)
    else
      @availabilities = Availability.left_outer_joins(:event)
                                 .where("start_time > ?", DateTime.now)
                                 .where(events: { id: nil })
      render json: @availabilities.sort_by(&:start_time), include: :coach
    end
  end

  def create
        puts 'params'
    puts params
    @availability = Availability.new(availability_params.merge(coach: @coach))

    if @availability.save
      render json: { message: "Availability created successfully" }, status: :created
    else
      render json: { errors: @availability.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_coach
    @coach = Coach.first
  end

  def availability_params
    params.require(:availability).permit(:start_time)
  end
end