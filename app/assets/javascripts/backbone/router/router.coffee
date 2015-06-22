window.app = window.app || {}

class app.Router extends Backbone.Router
	routes:
		'':'index'
		'guesser':'guesserView'
		'drawer':'drawerView'