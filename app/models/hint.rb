# == Schema Information
#
# Table name: hints
#
#  id         :integer          not null, primary key
#  name       :text
#  created_at :datetime
#  updated_at :datetime
#  word_id    :integer
#

class Hint < ActiveRecord::Base
  belongs_to :word
end
