var app = app || {};

$(document).ready(function() {

    var $play = $('#play');
    var $timer = $('.timer');
    var $input = $('.time-input');

    app.timer = new Timer({
        tick: 1,
        ontick: function(sec) {
            console.log(sec + ' seconds left');
            $timer.text(sec);
        },
        onstart: function() {
            console.log('timer started');
          
        },
        onstop: function() {
            console.log('timer stop');
          
        },
        onpause: function() {
            console.log('timer set on pause');
      
        },
        onend: function() {
            console.log('timer ended normally');
           
        }
    });


    // myTimer.start(30);

    $play.on('click', function(e) {
        e.preventDefault();

        console.log('clicked the play button');

        var time = $input.val();
        if (!time) return;

        if (isNaN(time)) {

            alert('Please input valid number');
            return;

        }

        app.timer.start(time);
    });
});