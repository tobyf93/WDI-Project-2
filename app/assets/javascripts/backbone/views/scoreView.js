var app = app || {};
app.ScoreView = Backbone.View.extend({
	el:'#scoresList',
	initialize: function(){},
	render: function(){
		var scoreTileTemplate = $('#scoreTileTemplate').html();
		var scoreTileHTML = _.template(scoreTileTemplate);
		this.$el.append(scoreTileHTML(this.model.toJSON()));
	}
})