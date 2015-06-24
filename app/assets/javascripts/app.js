
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
	app.dispatcher = new WebSocketRails(window.location.host + '/websocket');
	app.messageChannel = app.dispatcher.subscribe('message');
	app.gameChannel = app.dispatcher.subscribe('game');
	
	// FETCH CHANNEL HAS NOW BEEN DEPRECATED, WILL REMOVE IN THE FUTURE. 
	// app.fetchChannel = app.dispatcher.subscribe('fetch');
	
	//BINDING DICTATOR BEFORE THE GAME BEGINS 
	app.gameChannel.bind('dictator', function(data) {
    	console.log(data);
  	});

	app.gameChannel.bind('toby', function(data) {
		console.warn(data);
	});

	app.router = new app.Router();
	Backbone.history.start();	
});

