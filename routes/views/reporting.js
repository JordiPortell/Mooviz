/**
 * Created by Alexandre on 21/06/2016.
 */
var keystone = require('keystone');
var movie = keystone.list('Movie');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {
		Genre: []
	};
	

// Set locals
	locals.section = 'movie';
	
	//récupération de la liste des genres dans un tableau
	movie.model.aggregate({"$group" : {_id:"$Genre", count:{$sum:1}}})
		.exec()
		.then(function (movies) { //first promise fulfilled
				console.log(movies);
				locals.data.Genre=movies;
				movie.model.aggregate({"$group" : {_id:"$Title",count:{$sum:1}}})
			.exec()
			.then(function (movies) { //first promise fulfilled
				console.log(movies);
							view.render('reporting');
						}, function (err) { //first promise rejected
							throw err;
						}).then(function (result) {
							console.log(result);
							//second promise fulfilled
							//do something with final results
						}, function (err){ //something happened
							//catch the error, it can be thrown by any promise in the chain
							console.log(err);
						});
						
			
				/*for (i = 0; i < movies.length; i++) {
					var data_array = movies[i].replace(/\s/g, '').split(',');
					for (j = 0; j < data_array.length; j++) {
						//console.log(locals.data.Genre.indexOf(data_array[j]));
						if (locals.data.Genre.indexOf(data_array[j]) == -1 && data_array[j] != '') {
							locals.data.Genre.push(data_array[j]);
						}
					}
			}*/
			}, function (err) { //first promise rejected
				throw err;
			}).then(function (result) {
				console.log(result);
				//second promise fulfilled
				//do something with final results
			}, function (err){ //something happened
				//catch the error, it can be thrown by any promise in the chain
				console.log(err);
			});

	/*console.log(locals.data.Genre);
	
	for (k = 0; k < locals.data.Genre.length; k++) {
		movie.model.count({"Genre": {$regex: locals.data.Genre[k]}})
				.exec()
				.then(function (movies) { //first promise fulfilled
					console.log(locals.data.Genre[k] + ' : ' + movies);
				}, function (err) { //first promise rejected
					throw err;
				}).then(function (result) {
					//second promise fulfilled
					//do something with final results
				}, function (err) { //something happened
					//catch the error, it can be thrown by any promise in the chain
					console.log(err);
				});
	}*/
};	

	
