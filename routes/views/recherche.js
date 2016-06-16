/**
 * Created by Alexandre on 12/05/2016.
 */
/**
 * Created by jordi_2 on 06/05/2016.
 */
var keystone = require('keystone');
movie = keystone.list('Movie')
exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {
		movies: []
	};

	// Set locals
	locals.section = 'movie';

	// Load the galleries by sortOrder
	movie.model.find()
			.exec()
			.then(function (movies) { //first promise fulfilled
				locals.data.movies=movies;
			}, function (err) { //first promise rejected
				throw err;
			}).then(function (result) { //second promise fulfilled
				//do something with final results
			}, function (err) { //something happened
				//catch the error, it can be thrown by any promise in the chain
				console.log(err);
			});

	// Render the view
	view.render('index');

};
