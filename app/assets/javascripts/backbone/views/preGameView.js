var app = app || {}

app.PreGameView = Backbone.View.extend({
	el:'#main',
	events:{
		'click #ready':'ready'
		},
	initialize: function(){
		this.players = app.playersList;
		this.joinGame();
		this.fetchPlayers(); 
	},
	render: function(){
		preGameTemplate = $('#preGameTemplate').html();
		this.$el.html(preGameTemplate);
		console.log(app.playersList)
		app.playersList.each(function(player){
			playertile = new app.PreGamePlayerView({model: player});
			playertile.render();
		});
	},
	joinGame: function() {
		app.dispatcher.trigger('game.join');
	},
	fetchPlayers: function(){
		debugger;
		if ($('#main').length === 0) {
			return;
		};
		app.gameChannel.bind('join', function(data) {
			console.log(data);
			$('#playerTiles').html('');

			for (var i = 0; i < data.players.length; i++) {
				app.playersList.add({
					username: data.users[i].username,
					user_id: data.players[i].user_id,
					state: data.players[i].state
				});
				view = this;
				// $('<li>Player Name: ' + data.users[i].username + ', user_id: ' + data.players[i].user_id + '</li>');
				// $newPlayer.appendTo('#playerTiles');
			};
		});

		app.gameChannel.bind('leave', function(data) {
			$('#playerTiles').html('');
			// This loop needs to be the length minus one as the player isn't destroyed until after the data has been setup to be passed through.
			for (var j = 0; j < data.players.length; j++) {
				$newPlayer = $('<li>Player Name: ' + data.users[j].username + ', user_id: ' + data.players[j].user_id + '</li>');
				$newPlayer.appendTo('#playerTiles');
			}
		});

		
	},
})



