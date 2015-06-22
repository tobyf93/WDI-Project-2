class HintsController < ApplicationController
  before_action :set_hint, only: [:show, :edit, :update, :destroy]

  # GET /hints
  # GET /hints.json
  def index
    if params[:word_id]
      @word = Word.find params[:word_id]
      if @word.hints
        @hints = @word.hints
      else
        @hints = []
      end
    else
      @hints = Hint.all
    end
    respond_to do |format| 
      format.html { }
      format.json { render :json => @hints }
    end 
  end

  # GET /hints/1
  # GET /hints/1.json
  def show
    @word = Word.find params[:word_id]
    @hint = Hint.find params[:id]
  end

  # GET /hints/new
  def new
    @hint = Hint.new
    @word = Word.find params[:word_id]
  end

  # GET /hints/1/edit
  def edit
    @word = Word.find params[:word_id]
    @hint = Hint.find params[:id]
  end

  # POST /hints
  # POST /hints.json
  def create
    @word = Word.find params[:word_id]
    @hint = Hint.new hint_params
    @hint.word_id = @word.id

    respond_to do |format|
      if @hint.save
        format.html { redirect_to word_hint_path(@word, @hint), notice: 'Hint was successfully created.' }
        format.json { render :show, status: :created, location: @hint }
      else
        format.html { render :new }
        format.json { render json: @hint.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /hints/1
  # PATCH/PUT /hints/1.json
  def update
    @word = Word.find params[:word_id]
    
    respond_to do |format|
      if @hint.update(hint_params)
        format.html { redirect_to word_hint_path(@word, @hint), notice: 'Hint was successfully updated.' }
        format.json { render :show, status: :ok, location: @hint }
      else
        format.html { render :edit }
        format.json { render json: @hint.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /hints/1
  # DELETE /hints/1.json
  def destroy
    @word = Word.find params[:word_id]

    @hint.destroy
    respond_to do |format|
      format.html { redirect_to word_hints_url(@word), notice: 'Hint was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hint
      @hint = Hint.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def hint_params
      params.require(:hint).permit(:name, :word_id)
    end
end
