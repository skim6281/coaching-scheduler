class Api::V1::ReportsController < ApplicationController
  before_action :set_coach, only: [:index, :create]

  def index
    @reports = @coach.reports

    render json: @reports, include: [:event => {:include => :availability}]
  end

  def create
    @event = Event.find(params[:event_id])
    @report = Report.new(report_params.merge(event: @event))

    if @report.save
      render json: { message: "Report created successfully" }, status: :created
    else
      render json: { errors: @report.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  
  def set_coach
    @coach = Coach.first
  end

  def report_params
    params.require(:report).permit(:score, :notes)
  end
end