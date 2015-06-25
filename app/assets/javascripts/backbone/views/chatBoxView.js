var app = app || {}

app.ChatboxView = Backbone.View.extend({
	el: '#main',
	events: {
		'click #chat':'clickSubmitMessage',
		'keydown #messageField': 'keySubmitMessage',
		'click #submitresult': 'clickGuess',
		'keydown #guess': 'keySubmitGuess'
	},
	initialize: function(){
		var view = this;
		app.messageChannel.bind('transmit',function(chatObj){
			view.renderMsg(chatObj);
		});
	},
	render: function(){
		var chatBoxTemplate = $('#chatBoxTemplate').html();
		this.$el.append(chatBoxTemplate);
	},
	renderMsg: function(data){
		var message = "<p><span class='timestamp'>" + data.currtime + "</span>:: <span class='user'>" + data.user + '</span>:: <span class="message">' + data.message + "</span></p> ";
		$('#messageDisplay').append(message);
		$('#messageDisplay')[0].scrollTop = $('#messageDisplay')[0].scrollHeight;
	},
	renderGuesser:function(){
		var guessSubmitTemplate = $('#guessSubmitTemplate').html();
		$('#chatbox').append(guessSubmitTemplate)
	},
	clickSubmitMessage:function(e){
		// debugger;
		// console.log("This is actually doing something");
		var message = $('#messageField').val();
		this.submitMessage(message); 
		$('#messageField').val('');
	},
	keySubmitMessage: function(e){
		var code = e.keyCode || e.which;
		var target = e.currentTarget;
		if(code === 13){
			// console.log('you hit enter!');
			message = $(target).val();
			this.submitMessage(message);
			$(target).val('');
		} 
	},
	submitMessage: function(message){
		app.dispatcher.trigger('message.transmit', message); 
	},
	clickGuess: function() {
		this.submitGuess();
	},
	keySubmitGuess:function(e){
		var code = e.keyCode || e.which;
		if(code === 13){
			this.submitGuess();
		}
	},
	submitGuess:function(){
		$answer = $('#guess').val();
		data = {
		  guess: $answer
		}
		app.dispatcher.trigger('game.submit_guess', data);
		$('#guess').val("")
		$('#guess').focus()
	}
});