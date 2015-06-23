var app = app || {}

app.PreGameView = Backbone.View.extend({
	el:'#main',
	events:{
		'click #playerReady':'ready'
		},
	initialize: function(){
		this.players = app.playersList;
		this.fetchPlayers(); 
	},
	render: function(){
		preGameTemplate = $('#preGameTemplate').html();
		this.$el.html(preGameTemplate);
		this.renderList();
	},
	renderList: function(){
		app.playersList.each(function(player){
			playertile = new app.PreGamePlayerView({model:player});
			playertile.render();
		});
	},
	ready:function(event){
		debugger;
		console.log(event.currentTarget);
		$(event.currentTarget).addClass('ready');
		me = app.playersList.get(1);
		me.set('state','ready');

		this.startRd();
	},
	joinGame: function(){
		if($('#main').length===0){
			return;
		}
		app.dispatcher.trigger('game.join');
		// this.fetchPlayers();
	},
	fetchPlayers: function(){
		var view = this;
		view.joinGame();
		if ($('#main').length === 0) {
			return;
		}
		app.gameChannel.bind('join', function(data) {
			app.playersList.reset();
			for (var i = 0; i < data.players.length; i++) {
				app.playersList.add({
					username: data.users[i].username,
					id: data.players[i].user_id,
					state: data.players[i].state
				});
			};
			$('#playerTiles').empty();
			view.renderList();
		});

		app.gameChannel.bind('leave', function(data) {
			app.playersList.reset();
			for (var i = 0; i < data.players.length; i++) {
					app.playersList.add({
					username: data.users[i].username,
					user_id: data.players[i].user_id,
					state: data.players[i].state
				});
			};		
			$('#playerTiles').empty();
			view.renderList();
		});

	},
	startRd: function(){
		console.log("This function happened");
		debugger;
		app.dispatcher.trigger('game.start_round', "ready");
		app.gameChannel.bind('start_round', function(data){
			debugger;
			console.log(data);
		});
	}
});



