paper.install(window);
$(document).ready(function(){
	paper.setup('drawsomeCanv');
	var tool = new Tool();
	var path; 

	tool.onMouseDown = function(event){
		path = new Path();
		path.strokeColor = 'black';
		path.add(event.point);
		console.log(event.point);
	}
	tool.onMouseDrag = function(event){
		path.add(event.point);
		console.log(event.point);
	}

});