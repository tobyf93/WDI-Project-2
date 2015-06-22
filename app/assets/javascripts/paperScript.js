paper.install(window);

$(document).ready(function(){

	// Socket stuff
	var dispatcher = new WebSocketRails('localhost:3000/websocket');
	var channel = dispatcher.subscribe('game');
	channel.bind('draw', function(data) {
		var drawing = $('#drawing').is(':checked');
	  console.log(data.x_pos, data.y_pos);
	});

	paper.setup('drawsomeCanv');
	var tool = new Tool();
	var path; 

	tool.onMouseDown = function(event){
		path = new Path();
		path.strokeColor = 'black';
		// path.add(event.point);
		addPoint(event.point);
		console.log(event.point);
	};

	tool.onMouseDrag = function(event){
		// path.add(event.point);
		addPoint(event.point);
		console.log(event.point);
	};

	var addPoint = function(point) {
		path.add(point);
	};

});