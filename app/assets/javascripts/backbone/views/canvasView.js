var app = app || {};
app.CanvasView = Backbone.View.extend({
	el: '#main',
	events: {},
	initialize:function(){
		// debugger;
		var canvasTemplate = $('#canvasTemplate').html();
		this.$el.append(canvasTemplate);
		// var height = $('#main').innerHeight();
		// var width = $('#main').innerWidth();
		// $('#drawsomeCanv').width(width);
		// $('#drawsomeCanv').height(height);
		app.canvas.initPaper();
	},
	render: function(){
		// IF THE PERSON IS THE DRAWER 
		// RENDER THE GUESSER;
		// OTHERWISE IF THE PERSON IS THE GUESSER
	},
	renderGuesser:function(data){
		// debugger;
		app.canvas.initGuesser();
	},
	renderDrawer: function(data){
		var drawerToolsTemplate = $('#drawerToolsTemplate').html();

		var $theWord = $('<p class="THEFKWORD">' + data.word + '</p>');
		console.log($theWord);
		
		$('#main').prepend($theWord);
		
		this.$el.append(drawerToolsTemplate);

		app.canvas.initDrawer();
	}
})