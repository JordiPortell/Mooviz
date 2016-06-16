/**
 * Created by jordi_2 on 03/06/2016.
 */
var keystone = require('keystone');
var movie = keystone.list('Movie');
exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {
		movie: []
	};
// Set locals
	locals.section = 'movie';
	
	var data= req.query;
	
	movie.model.find(({"Title": data.titre}))
			.exec()
			.then(function (movies) { //first promise fulfilled
				locals.data.movie=movies;
				view.render('top100');
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

	// Render the view

};
