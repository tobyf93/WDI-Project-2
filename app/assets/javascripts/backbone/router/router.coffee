window.app = window.app || {}

class app.Router extends Backbone.Router
	routes:
		'':'index'
		'guesser':'guesserView'
		'drawer':'drawerView'
	index: =>
		return "hello"
	guesser: =>
		return "hello"
	drawer: =>
		return "hello"
