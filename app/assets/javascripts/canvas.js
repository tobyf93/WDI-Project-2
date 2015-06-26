var app = app || {};
app.utility = {
	reloadCollection: function(data){
		app.playersList.reset();
		for (var i = 0; i < data.length; i++) {
			var playerScore = 0;

			app.playersList.add({
				username: data[i].username,
				user_id: data[i].player.user_id,
				state: data[i].player.state,
				score: data[i].player.score,
				guess: data[i].player.guess
			});
		}
	},
}

app.canvas = {
  initPaper: function() {
    // debugger;
    this.setupPaperJS();
  },
  initGuesser: function() {
    // if (this.tool) {
    //   this.tool.onMouseDown = null;
    //   this.tool.onMouseDrag = null;
    // }
    this.setupDefaults();
    this.setupListener();
  },
  initDrawer: function() {
    // if (this.tool) {
    //   this.tool.onMouseDown = this.mouseDownEvent;
    //   this.tool.onMouseDrag = this.mouseDragEvent;
    // }
    this.setupDefaults();
    this.setupEvents();
  },

  setupPaperJS: function() {
    paper.setup('drawsomeCanv');
  },

  setupDefaults: function() {
    this.tool = new Tool();
    this.path = undefined;
    this.strokeColor = 'black';
    this.strokeWidth = 1;
    this.tool.onMouseDown = this.mouseDownEvent;
    this.tool.onMouseDrag = this.mouseDragEvent;
  },

  setupListener: function() {
    app.gameChannel.bind('draw', function(data) {
      // if ($('#drawerTools').length > 0) {
      app.canvas.path = app.canvas.path || new Path();

      if (data.new_path) {
        path = new Path();
      }

      app.canvas.strokeColor = data.stroke_color;
      app.canvas.strokeWidth = data.stroke_width;
      // }

      if ($('#drawerTools').length === 0) {
        app.canvas.addPoint({
          x: data.x_pos,
          y: data.y_pos
        });
      }
    });
  },

  setupEvents: function() {
    // this.tool.onMouseDown = this.mouseDownEvent;
    // this.tool.onMouseDrag = this.mouseDragEvent;
    var view = this;
    $('.color').on('click', function(e){
    	target = e.currentTarget; 
    	$('.color').removeClass('inUse');
    	view.changeColorEvent(target);
    	$(target).addClass('inUse');
	});
	$('.strokeWidth').on('click',function(e){
		$('#strokeWidth').toggleClass('hidden');
	});
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
    if ($('#drawerTools').length === 0) {
    	return;
    };
      path = new Path();
      app.canvas.sendDrawData(e, true);
      app.canvas.addPoint(e.point);
  },

  mouseDragEvent: function(e) {
    if ($('#drawerTools').length === 0) {
    	return;
    };
      app.canvas.sendDrawData(e);
      app.canvas.addPoint(e.point);
  },

  changeColorEvent: function(target) {
    var classes = $(target).attr('class').split(' ');
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
  }

};
