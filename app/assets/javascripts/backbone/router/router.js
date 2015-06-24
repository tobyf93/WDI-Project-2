var app = app || {};

app.Router = Backbone.Router.extend({
	routes:{
		'':'index',
		'game':'gameStart',
		},
	index: function(){
		// console.log("Hello this is the index");
		app.playersList = new app.Players(); 
		app.preGamePg = new app.PreGameView();
		app.preGamePg.render();
	},
	gameStart: function(){
		// debugger;
		console.log("We are now reRendering the Game View");
		app.gameStart = new app.GameView();
		app.gameStart.render();
	},
	drawer: function(){
		return "hello";
		}	
	});

