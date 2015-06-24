var app = app || {};
app.CanvasView = Backbone.View.extend({
	el: '#main',
	events: {},
	initialize:function(){

	},
	render: function(){
		var canvasTemplate = $('#canvasTemplate').html();
		this.$el.html(canvasTemplate);
		app.canvas.initPaper();

		// IF THE PERSON IS THE DRAWER 
		// RENDER THE GUESSER;
		// OTHERWISE IF THE PERSON IS THE GUESSER
	},
	renderGuesser:function(){
		app.canvas.initGuesser();
	},
	renderDrawer: function(){
		app.canvas.initDrawer();
	}
})