var app = app || {};
app.CanvasView = Backbone.View.extend({
	el: '#main',
	events: {},
	initialize:function(){
		// debugger;
		var canvasTemplate = $('#canvasTemplate').html();
		this.$el.append(canvasTemplate);
		app.canvas.initPaper();
	},
	render: function(){

		// IF THE PERSON IS THE DRAWER 
		// RENDER THE GUESSER;
		// OTHERWISE IF THE PERSON IS THE GUESSER

	},
	renderGuesser:function(data){
		// debugger;
		$('#drawsomeCanv').addClass('guessCanvas');
		app.canvas.initGuesser();
	},
	renderDrawer: function(data){
		var drawerToolsTemplate = $('#drawerToolsTemplate').html();
		this.$el.append(drawerToolsTemplate);
		app.canvas.initDrawer();
	}
})