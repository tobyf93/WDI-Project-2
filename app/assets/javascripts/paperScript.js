$(document).ready(function(){
	paper.install(window);
	paper.setup('drawsomeCanv');
	var tool = new Tool();
	var path;
	var strokeColor;

	// Socket stuff
	var dispatcher = new WebSocketRails(window.location.host + '/websocket');

	var channel = dispatcher.subscribe('game');
	channel.bind('draw', function(data) {
		var drawing = $('#drawing').is(':checked');

	  path = path || new Path();
	  if (data.new_path) {
	  	path = new Path();
	  }

	  strokeColor = data.stroke_color;

	  addPoint({x: data.x_pos, y: data.y_pos});
	});

	tool.onMouseDown = function(event) {
		path = new Path();

		var data = {
	    xPos: event.point.x,
	    yPos: event.point.y,
	    newPath: true,
	    strokeColor: strokeColor
	  };

		dispatcher.trigger('game.draw', data);

		addPoint(event.point);
	};

	tool.onMouseDrag = function(event) {
		var data = {
	    xPos: event.point.x,
	    yPos: event.point.y,
	    strokeColor: strokeColor
	  };

		dispatcher.trigger('game.draw', data);

		addPoint(event.point);
	};

	var addPoint = function(point) {
		strokeColor = strokeColor || 'black';

		path.strokeColor = strokeColor;
		path.add(point);
		view.draw();	
	};

	// Color palette
	$('.color').on('click', function() {
		var classes = $(this).attr('class').split(' ');
		strokeColor = classes[1];
	});

});




