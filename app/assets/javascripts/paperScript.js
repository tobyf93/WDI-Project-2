var path;
$(document).ready(function(){
	paper.install(window);
	paper.setup('drawsomeCanv');
	var tool = new Tool();
	view.draw();

	// Socket stuff
	var dispatcher = new WebSocketRails(window.location.host + '/websocket');

	var channel = dispatcher.subscribe('game');
	channel.bind('draw', function(data) {
		var drawing = $('#drawing').is(':checked');

	  path = path || new Path();
	  addPoint({x: data.x_pos, y: data.y_pos});
	});

	tool.onMouseDown = function(event) {
		path = new Path();

		var data = {
	    xPos: event.point.x,
	    yPos: event.point.y
	  };

		dispatcher.trigger('game.draw', data);

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
		// console.log('drawing: ', point.x, ' ', point.y);
		console.log("PATH", path);

		path.strokeColor = 'black';
		path.add(point);
		view.draw();	
	};

});