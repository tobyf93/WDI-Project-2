var app = app || {};

app.PreGameView = Backbone.View.extend({
	el:'#main',
	events:{
		'click #playerReady':'markReady',
		'click #playerCancel':'cancel',
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
		});
	},
	reloadCollection: function(data){
		app.playersList.reset();
		for (var i = 0; i < data.length; i++) {
			console.log("THIS MOTHERFUCKER RAN");
			console.log("PLAYER: ", data[i].player, " Username: ", data[i].username);
			app.playersList.add({
				username: data[i].username,
				user_id: data[i].player.user_id,
				state: data[i].player.state
			});
		}
		console.log('Here is the players list: ', app.playersList);
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
		console.log(event.currentTarget);
		app.dispatcher.trigger('game.mark_ready');
		this.playerReady();
	},

	joinGame: function() {
		// Not sure that this is an appropriate spot for this check
		if($('#main').length===0) {
			return;
		}

		app.dispatcher.trigger('game.join');
		// this.fetchPlayers();
	},
	fetchPlayers: function() {

		this.joinGame();
	},
	playerReady: function(){
		$('#playerReady').addClass('hidden');
		$('#playerCancel').removeClass('hidden');
		// app.dispatcher.trigger('game.start_round', "ready");
		app.gameChannel.bind('start_round', function(data){
			console.log(data);
		});
	}
});