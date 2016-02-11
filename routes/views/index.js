var keystone = require('keystone');
var omdb = require('omdb');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	omdb.search('Star Wars', function(err, movies) {
		if(err) {
			return console.error(err);
		}

		if(movies.length < 1) {
			return console.log('No movies were found!');
		}

		movies.forEach(function(movie) {
			console.log('%s (%d)', movie.title, movie.year);
		});
	});

	omdb.get({ title: 'Star Wars', year: 1999 }, true, function(err, movie) {
		if(err) {
			return console.error(err);
		}
		if(!movie) {
			return console.log('Movie not found!');
		}
		console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
		console.log(movie.plot);
	});
	
	
	// Render the view
	view.render('index');
	
};
