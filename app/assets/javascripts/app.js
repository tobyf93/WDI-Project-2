
var app = app || {};

_.templateSettings = {
 evaluate : /\{\[([\s\S]+?)\]\}/g,   //{[ console.log("Hello"); ]} - runs
 interpolate : /\{\{([\s\S]+?)\}\}/g   //{{ key }} - interpolates
};

$(function(){


	// //*************************************************//
	// // SETUP BIND TO LISTEN FOR USERS JOINING THE GAME //
	// //*************************************************// 
	// 	app.gameChannel.bind('join', function(data) {
	// 		view.reloadCollection(data);
	// 	});
		
	// //*************************************************//
	// // SETUP BIND TO LISTEN FOR USERS LEAVING THE GAME //
	// //*************************************************// 
	// app.gameChannel.bind('leave', function(data) {
	// 	view.reloadCollection(data);
	// });

	// //*************************************//
	// // SETUP BIND TO LISTEN FOR USER READY //
	// //*************************************// 
	// app.gameChannel.bind('player_states',function(player_states){
	// 	view.reloadCollection(player_states);
	// 	// app.dispatcher.trigger('game.check_for_game_start');
	// });

	// //****************************************************//
	// // SETUP BIND TO LISTEN FOR THREE OR MORE READY USERS //
	// //****************************************************// 
	// app.gameChannel.bind('tell_players_start', function(){
	// 	console.log("this game is starting now");
	// 	app.router.navigate('game',true);
	// });

	// app.gameChannel.bind('my_turn', function(data) {
	// 	console.log("THIS IS THE DATA" + data);
	// 	this.getRole(data);
	// });	
	paper.install(window);
	app.dispatcher = new WebSocketRails(window.location.host + '/websocket');
	app.messageChannel = app.dispatcher.subscribe('message');
	app.gameChannel = app.dispatcher.subscribe('game');

	app.gameChannel.bind('game_over', function(data) {
		// console.log('This data should appear at the end of a round', data);
		app.utility.reloadCollection(data);
		console.log(data);
		// console.log(app.playersList);
		app.scoresSummary = new app.ScoresSummaryView();
		app.scoresSummary.render(data[0].currentWord);
	});
	// $(window).resize(function(){
	// 	if($('#drawsomeCanv').length===0){
	// 		return;
	// 	}else{
	// 		var height = $('#main').innerHeight();
	// 		var width = $('#main').innerWidth();
	// 		$('#drawsomeCanv').height(height).width(width);
	// 		console.log(paperScope);
	// 	}
	// })
	app.dispatcher.bind('game.user_id', function(user_id) {
   	app.user_id = user_id;
  });

	app.gameChannel.bind('dictator', function(data) {
   	console.log(data);
  });

	app.gameChannel.bind('host', function(data) {
   	if (data.host_id === app.user_id) {
   		app.host.settings.players = data.players;
   		app.host.start();
   	}
  });

	app.gameChannel.bind('mike', function(data) {
		console.warn(data);
	});

	app.gameChannel.bind('toby', function(data) {
		console.warn(data);
	});

	app.dispatcher.trigger('fetch.user_id');
	app.router = new app.Router();
	Backbone.history.start();	
});

