# == Schema Information
#
# Table name: games
#
#  id           :integer          not null, primary key
#  state        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  word_id      :integer
#  players_left :integer
#

class Game < ActiveRecord::Base
  has_many :players
  has_one :word
end
