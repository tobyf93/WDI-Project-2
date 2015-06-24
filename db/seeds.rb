# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Word.destroy_all
w1 = Word.create :name => 'cat'
w2 = Word.create :name => 'giraffe'
w3 = Word.create :name => 'Joel Turnbull'
w4 = Word.create :name => 'Reena'