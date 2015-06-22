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
#  total_games     :integer          default(0)
#  remember_digest :string
#

class User < ActiveRecord::Base
  attr_accessor :remember_token
  
  validates :username, :length => { :minimum => 4, :too_short => "must be at least 4 characters long" }, :format => { :with => /\A[a-zA-Z]+\z/, :chars_error => "Only letters allowed." }, :presence => true, :uniqueness => true
  # Username must be at least 4 characters, can only have upper and lower case letters and must be present.

  has_secure_password

  validates :password_digest, :length => { :minimum => 4, :too_short => "must be at least 4 characters long" }, :presence => true
  # Password must be at least 4 characters and must be present.

  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end
  # This method returns the hash digest of the given string so it can be used for the remember token.

  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end
  # This creates the hashed version of the remember token to store it.

  def User.new_token
    SecureRandom.urlsafe_base64
  end
  # This method returns a random string with a length of 22 characters to be used for the remember_me token.

  def authenticated?(remember_token)
    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

  def forget
    update_attribute(:remember_digest, nil)
  end
  # This method just deletes the remember_digest so that the browser forgets the cookie if the user logs out.

end
