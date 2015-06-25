var app = app || {};
app.ScoresSummaryView = Backbone.View.extend({
	el:'#main',
	initialize:function(option){
	},
	render: function(data){
		console.log("round summary is being displayed");
		var scoresListTemplate = $('#scoresListTemplate').html();
		this.$el.append(scoresListTemplate);
		$('#roundSummary').prepend('<h2 class="rdAnswer">The word was <span>'+data+'</span></h2>');
		app.playersList.comparator = function(m1, m2){
			return m2.get('score') - m1.get('score');
		};
		app.playersList.sort();
		app.playersList.each(function(player){

			app.scoreView = new app.ScoreView({model: player});
			app.scoreView.render();
		});
	},
	renderGameEnd: function(){},
	renderRoundEnd: function(){}
});