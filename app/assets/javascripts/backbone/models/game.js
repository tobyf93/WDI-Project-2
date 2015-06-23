var app = app || {};

app.Game = Backbone.Model.extend({
  default:{
    go: 'here',
    like: 'normal'
	}
});