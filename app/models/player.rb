# == Schema Information
#
# Table name: players
#
#  id            :integer          not null, primary key
#  game_id       :integer
#  user_id       :integer
#  score         :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  name          :string
#  guess         :string
#  state         :string
#  has_drawn     :boolean          default(FALSE)
#  time_of_guess :integer
#

class Player < ActiveRecord::Base
  belongs_to :user
end
