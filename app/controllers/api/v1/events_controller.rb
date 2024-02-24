class Api::V1::EventsController < ApplicationController
  before_action :set_users, only: [:index, :create]
  
  def index
    route = request.path
    if route == '/api/v1/coach/events'
      @events = @coach.events
      render json: @events, include: :availability
    else
      @events = @student.events
      render json: @events, include: [:availability => {:include => :coach}]
    end
  end

  def create
    @availability = Availability.find(params[:availability_id])
    @event = Event.new(event_params.merge(student: @student, availability: @availability))

    if @event.save
      render json: { message: "Event created successfully" }, status: :created
    else
      render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @event = Event.find(params[:id])
    render json: @event, include: [:availability, :student, :report]
  end

  private

  def set_users 
    @coach = Coach.first
    @student = Student.first
  end

  def event_params
    params.require(:event).permit(:name)
  end
end