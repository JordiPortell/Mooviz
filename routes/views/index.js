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

		//console.log(req.body.text); affiche contenu input
		
		
		//Recherche une liste de films contenant le premier argument
		omdb.search('star', function(err, movies) {
			if(err) {
				return console.error(err);
			}

			if(movies.length < 1) {
				return console.log('No movies were found!');
			}
			
			//Pour chaque films de la recherche :
			movies.forEach(function(m) {
				
				
				//Recherche spécifique sur un film avec tous les champs de l'objet omdb
				omdb.get({ title: m.title }, true, function(err, movie) {
					if(err) {
						return console.error(err);
					}

					if(!movie) {
						return console.log('Movie not found!');
					}

					console.log('%s (%d)\n Rating : %s', movie.title, movie.year);
					//console.log(JSON.stringify(movie)+'\n');

					var Nmovie = keystone.list('Movie');
					
					var newMovie = new Nmovie.model({
						Title: movie.title,
						Year: movie.year,
						Rated: movie.rated,
						Released: movie.released,
						Runtime: movie.runtime,
						Genre: movie.genres,
						Director: movie.director,
						Writer: movie.writers,
						Actors: movie.actors,
						Plot: movie.plot,
						Language: movie.language,
						Country: movie.countries,
						Awards: movie.imdb.awards,
						Poster: movie.poster,
						Metascore: movie.imdb.metacritic,
						imdbRating: movie.imdb.rating,
						imdbVotes: movie.imdb.votes,
						imdbID: movie.imdb.id,
						Type: movie.type
					});


					newMovie.save(function(err) {
						console.error(err);
						// post has been saved	
					}); 
					
					
				});
			});
		});

	
	});
	
	// Render the view
	view.render('index');
	
};
