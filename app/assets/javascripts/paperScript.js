var app = app || {};

$(document).ready(function() {
	app.canvas.init();
});

app.canvas = {
	init: function() {
		this.setupPaperJS();
		this.setupDefaults();
		this.setupSockets();
		this.setupEvents();
	},

	setupPaperJS: function() {
		paper.install(window);
		paper.setup('drawsomeCanv');
	},

	setupDefaults: function() {
		this.tool = new Tool();
		this.path = undefined;
		this.strokeColor = 'black';
		this.strokeWidth = 1;
	},

	setupSockets: function() {
		this.dispatcher = new WebSocketRails(window.location.host + '/websocket');
		var channel = this.dispatcher.subscribe('game');

		channel.bind('draw', function(data) {
		  path = path || new Path();
		  if (data.new_path) {
		  	path = new Path();
		  }

		  strokeColor = data.stroke_color;
		  strokeWidth = data.stroke_width;

		  app.canvas.addPoint({x: data.x_pos, y: data.y_pos});
		});
	},

	setupEvents: function() {
		this.tool.onMouseDown = this.mouseDownEvent;
		this.tool.onMouseDrag = this.mouseDragEvent;
	},

	mouseDownEvent: function(e) {
		path = new Path();

		var data = {
	    xPos: e.point.x,
	    yPos: e.point.y,
	    newPath: true,
	    strokeColor: this.strokeColor,
	    strokeWidth: this.strokeWidth
	  };

		app.canvas.dispatcher.trigger('game.draw', data);

		app.canvas.addPoint(e.point);
	},

	mouseDragEvent: function(e) {
		var data = {
	    xPos: e.point.x,
	    yPos: e.point.y,
	    strokeColor: this.strokeColor,
	    strokeWidth: this.strokeWidth
	  };

		app.canvas.dispatcher.trigger('game.draw', data);

		app.canvas.addPoint(e.point);
	},

	addPoint: function(point) {
		strokeColor = this.strokeColor || 'black';
		strokeWidth = this.strokeWidth || 1;

		path.strokeColor = strokeColor;
		path.strokeWidth = strokeWidth;
		path.add(point);
		view.draw();	
	}

};




/*
$(document).ready(function(){
	if ($('#drawsomeCanv').length === 0) {
		return;
	}

	paper.install(window);
	paper.setup('drawsomeCanv');
	var tool = new Tool();
	var path;
	var strokeColor;
	var strokeWidth;

	// Socket stuff
	var dispatcher = new WebSocketRails(window.location.host + '/websocket');

	var channel = dispatcher.subscribe('game');

	channel.bind('draw', function(data) {
	  path = path || new Path();
	  if (data.new_path) {
	  	path = new Path();
	  }

	  strokeColor = data.stroke_color;
	  strokeWidth = data.stroke_width;

	  addPoint({x: data.x_pos, y: data.y_pos});
	});

	tool.onMouseDown = function(event) {
		path = new Path();

		var data = {
	    xPos: event.point.x,
	    yPos: event.point.y,
	    newPath: true,
	    strokeColor: strokeColor,
	    strokeWidth: strokeWidth
	  };

		dispatcher.trigger('game.draw', data);

		addPoint(event.point);
	};

	tool.onMouseDrag = function(event) {
		var data = {
	    xPos: event.point.x,
	    yPos: event.point.y,
	    strokeColor: strokeColor,
	    strokeWidth: strokeWidth
	  };

		dispatcher.trigger('game.draw', data);

		addPoint(event.point);
	};

	var addPoint = function(point) {
		strokeColor = strokeColor || 'black';
		strokeWidth = strokeWidth || 1;

		path.strokeColor = strokeColor;
		path.strokeWidth = strokeWidth;
		path.add(point);
		view.draw();	
	};

	// Color palette
	$('.color').on('click', function() {
		var classes = $(this).attr('class').split(' ');
		strokeColor = classes[1];
	});

	// Stroke width
	$('#strokeWidth').on('input', function() {
		strokeWidth = $(this).val();
	});
});

*/


