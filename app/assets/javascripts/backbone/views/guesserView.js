var app = app || {}
app.GuesserView = Backbone.View.extend({
	el: '#main',
	events:{},
	initialize:function(){

	},
	renderStatus: function(){
		//GAME LOGIC TO HANDLE WHAT GETS DISPLAYED IN THE STATUS BAR
		//GOES HERE
		statusBar.render("This is a message");
	},
	render: function(){
		chatBoxTemplate = $('#chatBoxTemplate').html();
		
	},
});