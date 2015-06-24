var app = app || {}
app.GameView = Backbone.View.extend({
	el: '#main',
	events:{},
	initBind:function(){
		// debugger;
		app.gameChannel.bind('my_turn', function(data) {
			console.log("THIS IS THE DATA" + data);
			this.getRole(data);
		});
	},
	initialize:function(){
		app.dispatcher.trigger('game.get_role');
		this.initBind();
	},
	getRole: function(data){
		if (data.my_turn) {
	  		this.drawView(data.word);  
		} else {
	  		this.guessView();
		};
	},
	guessView: function(data){
		this.$el.append("You're going to be guessing shit!");
	},
	drawView: function(data){
		this.$el.append("You're going to be drawing shit!");
	},
	renderStatus: function(){
		//GAME LOGIC TO HANDLE WHAT GETS DISPLAYED IN THE STATUS BAR
		//GOES HERE
		statusBar.render("This is a message");
	},
	render: function(){
		
		console.log("This shit is happening now");
		chatBoxTemplate = $('#chatBoxTemplate').html();
		this.$el.html("HELLO THIS IS THE GAME, I JUST LOST");
	},
});