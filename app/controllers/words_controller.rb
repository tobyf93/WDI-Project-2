class WordsController < ApplicationController

  def get_word
    @word = Word.all
    @word = @word.sample
    @hints = Hint.where ("word_id")

    respond_to do |format|
      format.html { redirect_to :app, notice: 'this location can not be accessed.' }
      format.json { render json: => { :word => @word,
                                      :hints => }
    end
  end

end