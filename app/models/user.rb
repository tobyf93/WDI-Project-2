# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string
#  password_digest :text
#  email           :text
#  admin           :boolean          default(FALSE)
#  bio             :text
#  profile_image   :text             default("https://tracker.moodle.org/secure/attachment/30912/f3.png")
#  total_wins      :integer          default(0)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  
  validates :username, :length => { :minimum => 4, :too_short => "must be at least 4 characters long" }, :format => { :with => /\A[a-zA-Z]+\z/, :chars_error => "Only letters allowed." }, :presence => true, :uniqueness => true
  # Username must be at least 4 characters, can only have upper and lower case letters and must be present.

  has_secure_password

  validates :password_digest, :length => { :minimum => 4, :too_short => "must be at least 4 characters long" }, :presence => true
  # Password must be at least 4 characters and must be present.

end
