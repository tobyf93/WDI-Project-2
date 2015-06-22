window.app = window.app || {}

class app.preGameView extends Backbone.View
	el: '#main'
	render: => 
		preGameTemplate = $('#preGameTemplate').html()
		this.$el.html(preGameTemplate)




