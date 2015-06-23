
var app = app || {};

_.templateSettings = {
 evaluate : /\{\[([\s\S]+?)\]\}/g,   //{[ console.log("Hello"); ]} - runs
 interpolate : /\{\{([\s\S]+?)\}\}/g   //{{ key }} - interpolates
};

$(function(){
	app.dispatcher = new WebSocketRails(window.location.host + '/websocket');
	app.fetchChannel = app.dispatcher.subscribe('fetch');
	app.gameChannel = app.dispatcher.subscribe('game');
	app.router = new app.Router();
	Backbone.history.start();	
});

