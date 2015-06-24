var app = app || {};

$(document).ready(function(){
  console.log("socket chat demo ");
  

  
  channel = app.dispatcher.subscribe('message')


  channel.bind('send', function(data){

    console.log(data);
    $('#messages').append("")

  })

  $('#message').on('keydown', function(e) {
  var $this;
  $this = $(this);

  if (e.keyCode === 13) {
    console.log('You hit enter');
    message = $this.val();
    $this.val('');
    app.dispatcher.trigger('message.send', message);
  }
});

});
