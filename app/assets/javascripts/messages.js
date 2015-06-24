// var app = app || {};

<<<<<<< HEAD
// $(document).ready(function(){
//   console.log("socket chat demo ");
=======
$(document).ready(function(){
  // console.log("socket chat demo ");
>>>>>>> 7c5eaee664b28f7f1678276428e4d188bc8e1737
  
//   channel = app.dispatcher.subscribe('message')

//   channel.bind('transmit', function(data){


//     console.log(data);
//     var message = "<p>" +  data.currtime + ':: ' + data.user + ':: ' + data.message + "</p> " ;
//     console.log(message);
//     $('#messages').append(message);


//   })
//   // submit chat via chat button 
//   $('#chat').on('click',function(e){
//     var $this = $('#message');
//      message = $this.val();
//      $this.val('');

//     app.dispatcher.trigger('message.transmit', message);

//   });
//   // submit chat via enter key 
//   $('#message').on('keydown', function(e) {
//     var $this = $(this);

//   if (e.keyCode === 13) {
//     console.log('You hit enter');
//     message = $this.val();
//     $this.val('');

//     app.dispatcher.trigger('message.transmit', message);
//   }
// });

// // submit the guess 
// $('#submitresult').on('click', function(e){
//   var $this = $('#guess');
//   message = $this.val();

//   data = {
//     message: message
//   };

//   app.dispatcher.trigger('game.submit_guess',data);
// })

// });
