var keystone = require('keystone');
var omdb = require('omdb');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'search' }, function(next) {

		console.log(req.body.text);
		
		omdb.search('star', function(err, movies) {
			if(err) {
				return console.error(err);
			}

			if(movies.length < 1) {
				return console.log('No movies were found!');
			}
			
			movies.forEach(function(movie) {
				console.log('%s (%d)', movie.title, movie.year);
				var Nmovie = keystone.list('movie');

				var newMovie = new Nmovie.model({
					Title: movie.title,
					Year: movie.year,
					Rated: movie.rated,
					Released: movie.released,
					Runtime: movie.runtime,
					Genre: movie.genre,
					Director: movie.director,
					Writer: movie.writer,
					Actors: movie.actors,
					Plot: movie.plot,
					Language: movie.language,
					Country: movie.country,
					Awards: movie.awards,
					Poster: movie.poster,
					Metascore: movie.metascore,
					imdbRating: movie.imdbRating,
					imdbVotes: movie.imdbVotes,
					imdbID: movie.imdbID,
					Type: movie.type,
					Response: movie.response
				});


				newMovie.save(function(err) {
					// post has been saved	
				});
			});
		});

	

	});

	
	// Render the view
	view.render('index');
	
};
