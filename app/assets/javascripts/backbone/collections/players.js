var app = app || {};

app.Players= Backbone.Collection.extend({
	initialize: function(){},
	model: app.Player,	
	url: "/users"
});
  