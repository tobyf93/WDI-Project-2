var app = app || {};

$(document).ready(function() {
	
	if ($('#drawsomeCanv').length === 0) {
		return;
	};

	app.canvas.init();
});

app.canvas = {
	initPaper: function(){
		// debugger;
		this.setupPaperJS();
	},
	initGuesser: function() {
		console.log( " \tWOLF INIT GUESSER " )
		if ( this.tool ) {
			this.tool.onMouseDown = null;
			this.tool.onMouseDrag = null;	
		}
		this.setupDefaults();
		this.setupListener();
	},
	initDrawer: function(){
		if ( this.tool ) {
			this.tool.onMouseDown = this.mouseDownEvent;
			this.tool.onMouseDrag = this.mouseDragEvent;	
		}
		console.log( " \tWOLF INIT DRAWER " )
		this.setupDefaults();
		this.setupEvents();
	},

	setupPaperJS: function() {
		// debugger;
		// paper = null;
		// debugger;
		paper.setup('drawsomeCanv');
		// this.setupEvents();
	},

	setupDefaults: function() {
		console.log( "\t\tWOLF DEFAULTS" )
		this.tool = new Tool();
		this.path = undefined;
		this.strokeColor = 'black';
		this.strokeWidth = 1;
		this.tool.onMouseDown = this.mouseDownEvent;
		this.tool.onMouseDrag = this.mouseDragEvent;
	},

	setupListener: function() {
		console.log( "\t\tWOLF SET UP LISTENER" )
		app.gameChannel.bind('draw', function(data) {
		  app.canvas.path = app.canvas.path || new Path();
		  if (data.new_path) {
		  	path = new Path();
		  }

		  app.canvas.strokeColor = data.stroke_color;
		  app.canvas.strokeWidth = data.stroke_width;

		  app.canvas.addPoint({x: data.x_pos, y: data.y_pos});
		});
	},

	setupEvents: function() {
		console.log( "\t\tWOLF SET UP EVENTS" )
		console.log("SET UP EVENTS CALLED");
		// this.tool.onMouseDown = this.mouseDownEvent;
		// this.tool.onMouseDrag = this.mouseDragEvent;
		$('.color').on('click', this.changeColorEvent);
		$('#strokeWidth').on('input', this.changeStrokeWidthEvent);
	},

	sendDrawData: function(e, newPath) {
		var data = {
	    xPos: e.point.x,
	    yPos: e.point.y,
	    newPath: newPath,
	    strokeColor: app.canvas.strokeColor,
	    strokeWidth: app.canvas.strokeWidth
	  };

	  app.dispatcher.trigger('game.draw', data);
	},

	mouseDownEvent: function(e) {
		console.log("MOUSE DOWN EVENT CALLED");
		path = new Path();
		app.canvas.sendDrawData(e, true);
		app.canvas.addPoint(e.point);
	},

	mouseDragEvent: function(e) {
		app.canvas.sendDrawData(e);
		app.canvas.addPoint(e.point);
		console.log("MOUSE DRAG!!!");
	},

	changeColorEvent: function() {
		console.log("I am changing color");
		var classes = $(this).attr('class').split(' ');
		app.canvas.strokeColor = classes[1];
	},

	changeStrokeWidthEvent: function() {
		app.canvas.strokeWidth = $(this).val();
	},

	addPoint: function(point) {
		strokeColor = this.strokeColor || 'black';
		strokeWidth = this.strokeWidth || 1;

		path.strokeColor = strokeColor;
		path.strokeWidth = strokeWidth;
		path.add(point);
		view.draw();	
		// console.log(path);
	}

};


