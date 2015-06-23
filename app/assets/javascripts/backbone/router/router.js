var app = app || {};

app.Router = Backbone.Router.extend({
	routes:{
		'':'index',
		'guesser':'guesserView',
		'drawer':'drawerView'
		},
	index: function(){
		console.log("Hello this is the index");
		app.playersList = new app.Players(); 
		app.preGamePg = new app.PreGameView();
		app.preGamePg.render();
	},
	guesser: function(){
		return "hello"
	},
	drawer: function(){
		return "hello"
		}	
	});

