window.app = window.app || {}

class app.preGamePlayerView extends Backbone.View 
	attributes: =>
		return 
			class: "playerTile"
			id: this.model.get('name')
	render: =>
		preGamePlayerTemplate = $('#preGameTemplate').html()
		preGamePlayerHTML = _.template(preGamePlayerTemplate)
		this.$el.html(preGamePlayerHTML(this.model.toJSON()))