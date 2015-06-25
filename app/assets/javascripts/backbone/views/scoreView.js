var app = app || {};
app.ScoreView = Backbone.View.extend({
	el:'#scoresList',
	initialize: function(){},
	render: function(){
		console.log(this.model.get('state'));
		var scoreTileTemplate = $('#scoreTileTemplate').html();
		var scoreTileHTML = _.template(scoreTileTemplate);
		this.$el.append(scoreTileHTML(this.model.toJSON()));
	}
})