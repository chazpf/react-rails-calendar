class Api::V1::EventsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_event, only: %i[ show edit update destroy ]

  # GET /events or /events.json
  def index
    @events = Event.all
    render json: @events
  end

  # GET /events/1 or /events/1.json
  def show
    if @event
      render json: @event
    else
      render json: @event.errors
    end
  end

  # GET /events/new
  def new
    @event = Event.new
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events or /events.json
  def create
    @event = Event.new(event_params)

    # respond_to do |format|
      if @event.save
        # format.html { redirect_to @event, notice: "Event was successfully created." }
        # format.json { render :show, status: :created, location: @event }
        render json: @event
      else
        # format.html { render :new, status: :unprocessable_entity }
        # format.json { render json: @event.errors, status: :unprocessable_entity }
        render json: @event.errors
      end
    # end
  end

  # PATCH/PUT /events/1 or /events/1.json
  def update
    if @event.update(event_params)
      render json: @event
    else
      render json: @event.errors
    end
    # respond_to do |format|
    #   if @event.update(event_params)
    #     format.html { redirect_to @event, notice: "Event was successfully updated." }
    #     format.json { render :show, status: :ok, location: @event }
    #   else
    #     format.html { render :edit, status: :unprocessable_entity }
    #     format.json { render json: @event.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /events/1 or /events/1.json
  def destroy
    @event.destroy
    # respond_to do |format|
    #   format.html { redirect_to events_url, notice: "Event was successfully destroyed." }
    #   format.json { head :no_content }
    # end
    render json: { notice: 'Event was successfully removed.' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      # params.require(:event).permit(:title, :description, :label, :day)
      params.permit(:title, :description, :label, :day)
    end
end
