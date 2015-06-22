var path;
$(document).ready(function(){
	paper.install(window);

	// Socket stuff
	var dispatcher = new WebSocketRails(window.location.host + '/websocket');
	var channel = dispatcher.subscribe('game');
	channel.bind('draw', function(data) {
	  // var drawing = $('#drawing').is(':checked');
	  console.log(data.x_pos, data.y_pos);

	  path = path || new Path();
	  addPoint({x: data.x_pos, y: data.y_pos});
	});

	paper.setup('drawsomeCanv');
	var tool = new Tool();
	var path = undefined; 

	tool.onMouseDown = function(event) {
		path = new Path();

		var data = {
	    xPos: event.point.x,
	    yPos: event.point.y
	  };

		dispatcher.trigger('game.draw', data);

		path.strokeColor = 'black';
		addPoint(event.point);
	};

	tool.onMouseDrag = function(event) {
		var data = {
	    xPos: event.point.x,
	    yPos: event.point.y
	  };

		dispatcher.trigger('game.draw', data);

		addPoint(event.point);
	};

	var addPoint = function(point) {
		path.add(point);
		console.log(path);
		view.draw();	
	};

});