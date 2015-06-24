var app = app || {}
app.GameView = Backbone.View.extend({
	el: '#main',
	events:{},
	initialize:function(){
		var view = this;
		console.log("initialize role binding");
		app.dispatcher.bind('game.my_turn', function(data) {
			console.log("THIS IS THE DATA" + data);
			view.getRole(data);
		})
	},
	getRole: function(data){

		if (data.my_turn){
	  		this.drawView(data.word);  
		} else {
	  		this.guessView();
		};
	},
	guessView: function(){
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
		console.log("Triggering get role call");
		app.dispatcher.trigger('game.get_role');
		console.log("This shit is happening now");
		chatBoxTemplate = $('#chatBoxTemplate').html();
		this.$el.html("HELLO THIS IS THE GAME, I JUST LOST");
	},
});