/**
 * Created by Alexandre on 14/06/2016.
 */
var keystone = require('keystone');
var omdb = require('omdb');
var movie = keystone.list('Movie');
fs = require('fs');


exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
		errSearchQuery: 'ok'
	};

	var file = req.body.films;
	var ids = [];

	// On POST requests, add the Enquiry item to the database
	view.on('post', function(next) {


		movie.model.find().distinct('imdbID')
				.exec()
				.then(function (movies) { //first promise fulfilled
					ids = movies;
					console.log(ids);

					fs.exists(file, function(exists) {
						if(exists) {
							console.log('Le fichier existe');
							fs.stat(file, function(error, stats) {
								fs.open(file, "r", function(error, fd) {
									var buffer = new Buffer(stats.size);

									fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
										var data = buffer.toString("utf8", 0, buffer.length);
										var data_array = data.split('\r');
										//for(i=0;i<data_array.length;i++)
										for(i=0;i<100 && i<data_array.length;i++)
										{
											omdb.search(data_array[i].split('\t')[0], function(err, movies) {
												if(err) {
													return console.error(err);
												}

												//Pour chaque films de la recherche :
												movies.forEach(function(m) {

													//console.log('%s', m.title);
													//Recherche spécifique sur un film avec tous les champs de l'objet omdb
													omdb.get({ title: m.title }, true, function(err, movie) {


														if(err) {
															return console.error(err);
														}

														if(!movie) {
															return console.log('Movie not found!');
														}



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


														if(ids.indexOf(newMovie.imdbID)==-1)
														{
															newMovie.save(function(err) {
																if(err) {
																	return console.error(err);
																}
																// post has been saved	
															});
															ids.push(newMovie.imdbID);
														}

													});
												});
											});

										}

										fs.close(fd);
									});
								});
							});
						}
					});

					next();
					
					
				}, function (err) { //first promise rejected
					throw err;
				}).then(function (result) {
					

					
					
				}, function (err){ //something happened
					//catch the error, it can be thrown by any promise in the chain
					console.log(err);
				});
		
		 
		
	});
	// Render the view
	view.render('ajoutfilm');

};
