var app = app || {};

app.PreGameView = Backbone.View.extend({
	el:'#main',
	events:{
		'click #playerReady':'markReady',
		'click #playerCancel':'playerCancel',
		},
	initBinds: function(){
		var view = this;
		if ($('#main').length === 0) {
			return;
		}
		//*************************************************//
		// SETUP BIND TO LISTEN FOR USERS JOINING THE GAME //
		//*************************************************// 
		app.gameChannel.bind('join', function(data) {
			view.reloadCollection(data);
		});
		
		//*************************************************//
		// SETUP BIND TO LISTEN FOR USERS LEAVING THE GAME //
		//*************************************************// 
		app.gameChannel.bind('leave', function(data) {
			view.reloadCollection(data);
		});

		//*************************************//
		// SETUP BIND TO LISTEN FOR USER READY //
		//*************************************// 
		app.gameChannel.bind('player_states',function(player_states){
			view.reloadCollection(player_states);
			// app.dispatcher.trigger('game.check_for_game_start');
		});

		//****************************************************//
		// SETUP BIND TO LISTEN FOR THREE OR MORE READY USERS //
		//****************************************************// 
		app.gameChannel.bind('tell_players_start', function(){
			app.router.navigate('game', true);
		});


		//****************************************************//
		// SETUP BIND TO LISTEN FOR SCORES AT THE END OF ROUND//
		//****************************************************// 
		app.gameChannel.bind('game_over', function(data) {
			console.log('This data should appear at the end of a round', data);
		});


	},
	reloadCollection: function(data){
		app.playersList.reset();
		for (var i = 0; i < data.length; i++) {
			app.playersList.add({
				username: data[i].username,
				user_id: data[i].player.user_id,
				state: data[i].player.state
			});
		}
		this.renderList(); 
	},
	initialize: function(){
		this.players = app.playersList;
		this.initBinds();
		this.fetchPlayers(); 
	},

	render: function() {
		var preGameTemplate = $('#preGameTemplate').html();
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

	markReady:function(event){
		app.dispatcher.trigger('game.mark_ready');
		this.buttonToggle();
	},

	joinGame: function() {
		// Not sure that this is an appropriate spot for this check
		if($('#main').length === 0) {
			return;
		}
		app.dispatcher.trigger('game.join');
		// this.fetchPlayers();
	},
	fetchPlayers: function() {
		this.joinGame();
	},
	playerCancel: function(){
		app.dispatcher.trigger('game.mark_ready');
		this.buttonToggle();
	},
	buttonToggle: function(){
		$('#playerReady').toggleClass('hidden');
		$('#playerCancel').toggleClass('hidden');
		// app.dispatcher.trigger('game.start_round', "ready");
	}
});