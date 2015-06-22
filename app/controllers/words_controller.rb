class WordsController < ApplicationController

  def get_word
    @word = Word.all
    @word = @word.sample
    @hints = Hint.where ("word_id = #{@word.id}")

    respond_to do |format|
      format.html { redirect_to :app, notice: 'this location can not be accessed.' }
      format.json { render json: @word.to_json(:include => [:hints]) }
    end
  end

end