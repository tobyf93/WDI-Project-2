app = app || {}

app.PreGamePlayerView = Backbone.View.extend({
	// attributes: function(){
	// 	return {
	// 		class: "playerTile",
	// 		id: this.model.get('name')
	// 	}
	// },
	el:'#playerTiles',
	render: function(){
		debugger;
		preGamePlayerTemplate = $('#preGamePlayerTemplate').html();
		preGamePlayerHTML = _.template(preGamePlayerTemplate);
		this.$el.append(preGamePlayerHTML(this.model.toJSON()));
	}
});
