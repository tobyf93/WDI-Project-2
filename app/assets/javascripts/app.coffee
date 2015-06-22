# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
window.app = app || {}

_.templateSettings.evaluate = /// ^ /\{\[([\s\S]+?)\]\} ///g
_.templateSettings.interpolate = /// ^ /\{\{([\s\S]+?)\}\} ///g

$(->
	# Start up the document 
	console.log 'Hello'
	console.log app
	app.router = new app.Router()
	Backbone.history.start()	
	)

