$(document).ready( function(){

var canvas = document.getElementById("mainCanvas");
console.log(canvas);
var context = canvas.getContext("2d");

var mouse ={x:0,y:0};

//Current Mouse coordinates relative to the canvas element 
// canvas.addEventListener('mousedown', function(e){
//  getCoordinates(e);
//  context.beginPath();
//  context.moveTo(mouse.x,mouse.y);
//  canvas.addEventListener('mousemove', funtio)


// },false);

var getCoordinates = function(e){
  mouse.x = e.pageX - canvas.offsetLeft;
  mouse.y = e.pageY - canvas.offsetTop;

  console.log(mouse.x , mouse.y);

}

canvas.addEventListener('mousemove', function(e){
  getCoordinates(e);
  context.beginPath();
  context.moveTo(mouse.x,mouse.y);
  draw();


},false)

var draw  = function(){
  context.lineTo(mouse.x,mouse.y);
  context.stroke();

}


});