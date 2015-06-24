# == Schema Information
#
# Table name: players
#
#  id            :integer          not null, primary key
#  game_id       :integer
#  user_id       :integer
#  score         :integer          default(0)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  guess         :string
#  state         :string           default("not ready")
#  has_drawn     :boolean          default(FALSE)
#  time_of_guess :integer          default(0)
#

class Player < ActiveRecord::Base
  belongs_to :user
end
