// create our basic movie model
var Movie = Backbone.Model.extend({});

// create a way to display each movie
var MovieView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#movie_view').html()),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// now a place to store our movies
var MovieCollection = Backbone.Collection.extend({
  model: Movie
});

// and a way to view our collection of movies
var MovieListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add',
      this.render);
  },
  render: function(){
    var self = this;
    // empty our object to start anew
    self.$el.empty();
    _.each(self.collection.models, function(movie){
      var newMovieView = new MovieView({ model: movie});
      self.$el.append(newMovieView.render().el);
    });
  }
});
