var app = app || {}

app.PreGameView = Backbone.View.extend({
	el:'#main',
	events:{
		'click #ready':'ready'
		},
	initialize: function(){
		debugger;
		this.players = app.playersList;
		this.fetchPlayers(); 
	},
	render: function(){
		preGameTemplate = $('#preGameTemplate').html();

		this.$el.html(preGameTemplate);
		this.players.each(function(player){
				playertile = new app.PreGamePlayerView({model: player});
				playertile.render();
		});
	},
	joinGame: function() {
			dispatcher.trigger('game.join');
	},
	fetchPlayers: function(){
		debugger;
		if ($('#drawsomeCanv').length === 0) {
			return;
		};

		channel.bind('join', function(data) {
			
			console.log(data);
			$('#playerTiles').html('');

			for (var i = 0; i < data.players.length; i++) {
				var newPlayer = new app.Player({
					username: data.users[i].username,
					user_id: data.players[i].user_id,
					state: data.players[i].state
				});
				view = this;
				newPlayer.save().done(function(){
					app.playersList.fetch();
					app.pregameref = new app.PreGameView.render();
				});
				// $('<li>Player Name: ' + data.users[i].username + ', user_id: ' + data.players[i].user_id + '</li>');
				// $newPlayer.appendTo('#playerTiles');
			};
		});

		channel.bind('leave', function(data) {
			$('#playerTiles').html('');
			// This loop needs to be the length minus one as the player isn't destroyed until after the data has been setup to be passed through.
			for (var j = 0; j < data.players.length; j++) {
				console.log(data);
				$newPlayer = $('<li>Player Name: ' + data.users[j].username + ', user_id: ' + data.players[j].user_id + '</li>');
				$newPlayer.appendTo('#playerTiles');
			}
		});

		this.joinGame();
	},
})



