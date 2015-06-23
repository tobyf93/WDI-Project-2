# == Schema Information
#
# Table name: words
#
#  id            :integer          not null, primary key
#  name          :text
#  related_image :text
#  created_at    :datetime
#  updated_at    :datetime
#

class Word < ActiveRecord::Base
  has_many :hints
  has_many :games
end
