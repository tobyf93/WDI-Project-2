app = app || {}

app.PreGamePlayerView = Backbone.View.extend({
	attributes: function(){
		return {
			class: "playerTile",
			id: this.model.get('name')
		}
	},
	render: function(){
		preGamePlayerTemplate = $('#preGameTemplate').html();
		preGamePlayerHTML = _.template(preGamePlayerTemplate);
		this.$el.html(preGamePlayerHTML(this.model.toJSON()));
	}
});
