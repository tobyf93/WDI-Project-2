var app = app || {}
app.GameView = Backbone.View.extend({
	el: '#main',
	events:{},
	initialize:function(){
		var view = this;
		app.dispatcher.bind('game.my_turn', function(data) {
			console.log("THIS IS THE DATA" + data);
			view.getRole(data);
		});
		app.gameChannel.bind('tell_player_start', function(){
			console.log("New round starting");
			app.router.navigate('game',true);
		})
	},
	getRole: function(data){
		if (data.my_turn){
	  		this.drawView(data);  
		} else {
	  		this.guessView(data);
		};
	},
	guessView: function(data){
		// this.$el.append("You're going to be guessing shit!");
		// var canvasTemplate = new app.CanvasView();
		// canvasTemplate.renderGuesser();
		// debugger;
		this.$el.append("You're going to be drawing shit!");
		app.guessCanvasView = new app.CanvasView();
		app.guessCanvasView.renderGuesser();
		app.chatBox = new app.ChatboxView();
		app.chatBox.render();

	},
	drawView: function(data){
		// debugger;
		this.$el.append("You're going to be drawing shit!");
		app.drawCanvasView = new app.CanvasView();
		app.drawCanvasView.renderDrawer();
	},
	renderStatus: function(){

		//GAME LOGIC TO HANDLE WHAT GETS DISPLAYED IN THE STATUS BAR
		//GOES HERE
		statusBar.render("This is a message");
	},
	render: function(){
		console.log("Triggering get role call");
		app.dispatcher.trigger('game.start_phase');
		app.dispatcher.trigger('game.get_role');
		console.log("This shit is happening now");
		chatBoxTemplate = $('#chatBoxTemplate').html();
		this.$el.html("HELLO THIS IS THE GAME, I JUST LOST");
	},
});