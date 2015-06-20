$(document).ready( function(){

//Get the canvas and set the context to it to draw
var canvas = document.getElementById("mainCanvas");
console.log(canvas);
var context = canvas.getContext("2d");



// Mouse coordinates 
var mouse ={x:0,y:0};
var last_mouse_move = {x: 0, y: 0};
 
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
 // getCoordinates(e);
 context.beginPath();
 context.moveTo(mouse.x,mouse.y);
 canvas.addEventListener('mousemove', draw ,false);
},false);

canvas.addEventListener('mouseup',function(){
  canvas.removeEventListener('mousemove',draw,false);
},false);

// getCoordinates get the mouse Co-ordinates relative to the Canvas element 
var getCoordinates = function(e){
  last_mouse_move.x = mouse.x;
  last_mouse_move.y = mouse.y;
  mouse.x = e.pageX - canvas.offsetLeft;
  mouse.y = e.pageY - canvas.offsetTop;

  // console.log(mouse.x , mouse.y);

}

// actual drawing 
var draw  = function(){
  console.log("draw:: " + mouse.x,mouse.y);
  context.beginPath(); // to remove the sharp edging 
  context.moveTo(last_mouse_move.x,last_mouse_move.y);
  context.lineTo(mouse.x,mouse.y);
  context.closePath();
  context.stroke();

}


});


