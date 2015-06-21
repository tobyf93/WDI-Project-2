app = app || {}

class app.Players extends Backbone.Model
  defaults =
    go: 'here',
    like: 'normal'