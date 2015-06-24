var app = app || {};
app.CanvasView = Backbone.View.extend({
	el: '#main',
	events: {},
	initialize:function(){
		
	},
	render: function(){
		var canvasTemplate = 
		app.canvas.initPaper();
	}
	renderGuesser:function(){
		app.canvas.initGuesser();
	},
	renderDrawer: function(){
		app.canvas.initDrawer();
	}
})