var app = app || {}
app.GameView = Backbone.View.extend({
	el: '#main',
	events:{},
	initialize:function(){
		var view = this;
		app.dispatcher.bind('game.my_turn', function(data) {
			view.getRole(data);
		});
		app.dispatcher.bind('game.game_over', function(data) {
			console.log(data);
		});

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
		console.log('you are going to be drawing', data);
	},
	renderStatus: function(){

		//GAME LOGIC TO HANDLE WHAT GETS DISPLAYED IN THE STATUS BAR
		//GOES HERE
		statusBar.render("This is a message");
	},
	render: function(){
		app.dispatcher.trigger('game.get_role');
		chatBoxTemplate = $('#chatBoxTemplate').html();
		this.$el.html("Hello, ");
	},
});