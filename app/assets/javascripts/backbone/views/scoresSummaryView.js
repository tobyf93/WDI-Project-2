var app = app || {};
app.ScoresSummaryView = Backbone.View.extend({
	el:'#main',
	initialize:function(option){
	},
	render: function(data){
		console.log("round summary is being displayed");
		var scoresListTemplate = $('#scoresListTemplate').html();
		this.$el.append(scoresListTemplate);
		app.playersList.each(function(player){
			app.scoreView = new app.ScoreView({model: player});
			app.scoreView.render();
		});
	},
	renderGameEnd: function(){},
	renderRoundEnd: function(){}
});