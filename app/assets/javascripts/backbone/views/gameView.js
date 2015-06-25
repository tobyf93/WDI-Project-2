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
    this.gameTimer();
    app.canvasView = new app.CanvasView();
    app.canvasView.renderGuesser();
    app.chatBox.render();
    app.chatBox.renderGuesser(); 

  },

  gameTimer: function(){
	$('#main').append('<progress id="progressTimer" value="0" class="progress default">.2</progress>');
	var timeLimit = app.host.settings.phaseLength/1000;
	app.timer = new Timer({
		tick: 1,
		ontick: function(sec) {
			var offset = timeLimit - sec;
			var percentage = offset/timeLimit; 
			if(sec <= 5){
				$('#progressTimer').removeClass('default');
				$('#progressTimer').addClass('finalMoments');
			}
			$('#progressTimer').attr('value',percentage);
		},
		onstart: function() {
			console.log('timer started');
		},
		onend: function() {
			console.log('timer ended normally');  
		}
	});
	app.timer.start(timeLimit);
  },
  drawView: function(data) {
    // debugger;
    this.gameTimer();
    app.canvasView = new app.CanvasView();
    app.canvasView.renderDrawer();
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

