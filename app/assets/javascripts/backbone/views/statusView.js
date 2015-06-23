var app = app || {};

var statusView = Backbone.View.extend({
el:'#main',
render: function(){
  var message = " Status view Message goes here";
  this.$el.html(message);


}

});
