$(document).ready( function(){
  return;

// Mouse coordinates 
var mouse ={x:0, y:0};
var last_mouse_move = {x: undefined, y: undefined};


// Socket stuff
var dispatcher = new WebSocketRails('localhost:3000/websocket');
var channel = dispatcher.subscribe('game');
channel.bind('draw', function(data) {
  var drawing = $('#drawing').is(':checked');

  if (!drawing) {
    if (last_mouse_move.x === undefined) {
      last_mouse_move = {x: data.x_pos, y: data.y_pos};
    }

    console.log(data.x_pos, data.y_pos);
    // draw(data.x_pos, data.y_pos);
  }
});

//Get the canvas and set the context to it to draw
var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");



 
/* Mouse Capturing Work */
canvas.addEventListener('mousemove', function(e) {
  getCoordinates(e);
}, false);

// Set the drawing tool properties 
context.lineWidth = 5;
context.lineJoin = 'round';
context.lineCap = 'round';
context.strokeStyle = 'blue';



// on mouse down the draw path starts, Mousemove set within the mousedown
// on mouse up , the event listener is associated with mouse down is removed . 
canvas.addEventListener('mousedown', function(e){
 context.beginPath();
 context.moveTo(mouse.x,mouse.y);
 canvas.addEventListener('mousemove', _draw ,false);
}, false);

canvas.addEventListener('mouseup',function(){
  canvas.removeEventListener('mousemove',_draw,false);
}, false);

// getCoordinates get the mouse Co-ordinates relative to the Canvas element 
var getCoordinates = function(e){
  last_mouse_move.x = mouse.x;
  last_mouse_move.y = mouse.y;
  mouse.x = e.pageX - canvas.offsetLeft;
  mouse.y = e.pageY - canvas.offsetTop;

  // console.log(mouse.x , mouse.y);

};

var _draw = function() {
  draw(mouse.x, mouse.y);
};  

// actual drawing 
var draw  = function(mouseX, mouseY){
  context.beginPath(); // to remove the sharp edging 
  context.moveTo(last_mouse_move.x,last_mouse_move.y);
  context.lineTo(mouseX,mouseY);
  context.closePath();
  context.stroke();

  var data = {
    xPos: mouseX,
    yPos: mouseY
  };

  dispatcher.trigger('game.draw', data);
};


});


