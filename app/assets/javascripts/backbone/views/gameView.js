var app = app || {};
app.GameView = Backbone.View.extend({
  el: '#main',
  events: {},
  initialize: function() {
    var view = this;

    app.dispatcher.bind('game.my_turn', function(data) {
      view.getRole(data);
    });

    app.gameChannel.bind('guess_response', function(data) {
    	// ==========================================================
    	// CHARLES: This is where everyone sees that someone guessed.
    	// CHARLES: The properties are data.username and data.time
    	// CHARLES: Both of them are strings.
    	// ==========================================================
    	console.log(data);
  	});
    
    // submitGuessHandler();

    // app.gameChannel.bind('tell_player_start', function(){
    // 	debugger;
    // 	console.log("New round starting");
    // 	app.router.navigate('game',true);
    // });

  },
  getRole: function(data) {
    if (data.my_turn) {
      this.drawView(data);
    } else {
      this.guessView(data);
    };
  },

  guessView: function(data) {
    // this.$el.append("You're going to be guessing shit!");
    // var canvasTemplate = new app.CanvasView();
    // canvasTemplate.renderGuesser();
    // debugger;
    $('#main').empty();
    app.canvasView = new app.CanvasView();
    app.canvasView.renderGuesser();
    app.chatBox.render();
    app.chatBox.renderGuesser();
  },

  drawView: function(data) {
    // debugger;
    // this.$el.append("You're going to be drawing shit!");
    app.canvasView = new app.CanvasView();
    app.canvasView.renderDrawer(data);
    app.chatBox.render();
  },

  renderStatus: function() {
    //GAME LOGIC TO HANDLE WHAT GETS DISPLAYED IN THE STATUS BAR
    //GOES HERE
    statusBar.render("This is a message");
  },
  
  render: function() {
    app.dispatcher.trigger('game.get_role');
	
    chatBoxTemplate = $('#chatBoxTemplate').html();
    this.$el.html("Hello, ");
  },
});

// var submitGuessHandler = function() {
//   $('#main').on('click', '#submitresult', function() {
//     $answer = $('#guess').val();

//     data = {
//       guess: $answer
//     }

//     app.dispatcher.trigger('game.submit_guess', data);
//     $('#submit_guess').off();
//   });
// }

