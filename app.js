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
  tagName: 'ul',
  initialize: function(){
    this.listenTo(this.collection, 'add',
      this.render);
  },
  render: function(){
    var self = this;
    // empty our view to start anew
    self.$el.empty();
    _.each(self.collection.models, function(movie){
      var newMovieView = new MovieView({ model: movie});
      self.$el.append(newMovieView.render().el);
    });
  }
});

$( document ).ready(function() {
  var newMovieCollection = new MovieCollection();

  var newMovie = new Movie({ title: "Untitled Adam Sandler Crap"});
  var newerMovie = new Movie({ title: "Michael Moore Talks Crap"});

  newMovieCollection.add(newMovie);
  newMovieCollection.add(newerMovie);

  var newMovieCollectionView = new MovieListView({collection: newMovieCollection, el: $('div.movie-list')});

  newMovieCollectionView.render();

  $('form#addMovie').submit(function(e){
    // clear our previous search collection
    newMovieCollection.reset();
    var movieTitle = $('form#addMovie').find('input[name="title"]').val();

    // ajax search results
    $.ajax({
    url:      "http://www.omdbapi.com/?s=" + movieTitle,
    dataType: 'json',
    method:   'get'
    }).done(function(data){
      console.log(data)
      _.each(data["Search"], function(movie){
        var newestMovie = new Movie({
          title: movie["Title"]});
        console.log(movie);
        newMovieCollection.add(newestMovie);
        });
      });

    e.preventDefault();
    return false;
  });
});










