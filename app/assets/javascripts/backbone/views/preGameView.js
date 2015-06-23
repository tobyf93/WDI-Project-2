var app = app || {};

app.PreGameView = Backbone.View.extend({
	el: '#main',

	events: {
		'click #ready': 'ready'
	},

	initialize: function() {
		this.players = app.playersList;
		this.fetchPlayers(); 
	},

	render: function() {
		preGameTemplate = $('#preGameTemplate').html();
		this.$el.html(preGameTemplate);
		this.renderList();
	},

	renderList: function() {
		$('#playerTiles').empty();
		app.playersList.each(function(player){
			playertile = new app.PreGamePlayerView({model:player});
			playertile.render();
		});
	},

	joinGame: function() {
		// Not sure that this is an appropriate spot for this check
		if($('#main').length===0) {
			return;
		}

		app.dispatcher.trigger('game.join');
	},

	fetchPlayers: function() {
		var view = this;
		if ($('#main').length === 0) {
			return;
		}
		app.gameChannel.bind('join', function(data) {
			app.playersList.reset();

			for (var i = 0; i < data.players.length; i++) {
				console.log("THIS MOTHERFUCKER RAN");
				console.log("PLAYER: ", data.players[i], " USER: ", data.users[i]);
				app.playersList.add({
					username: data.users[i].username,
					user_id: data.players[i].user_id,
					state: data.players[i].state
				});
			}

			$('#playerTiles').empty();
			view.renderList();
		});

		app.gameChannel.bind('leave', function(data) {
			app.playersList.reset();
			console.log("reset players collection is here: " + app.playersList);
			console.log(data.players.length);
			for (var i = 0; i < data.players.length; i++) {
				console.log("this is running");
					app.playersList.add({
					username: data.users[i].username,
					user_id: data.players[i].user_id,
					state: data.players[i].state
				});
			}
					
			console.log("Leave players collection is here: " + app.playersList);
			$('#playerTiles').empty();
			view.renderList();
		});

		view.joinGame();
	}
});



