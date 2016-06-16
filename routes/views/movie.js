/**
 * Created by jordi_2 on 06/05/2016.
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
	//view.on('init', function(next) {


		//view.query('movie', movie.model.findOne({}));
		 movie.model.findOne({Title:"Star Trek: First Contact"})	
				 .exec()
				 .then(function (movies) { //first promise fulfilled
					 locals.data.movie=movies;
					 // Render the view
					 view.render('movie');
				 }, function (err) { //first promise rejected
					 throw err;
				 }).then(function (result) { 
				 console.log(result);
				 //second promise fulfilled
					 //do something with final results
				 }, function (err) { //something happened
					 //catch the error, it can be thrown by any promise in the chain
					 console.log(err);
				 });

	//});
	
	

};
