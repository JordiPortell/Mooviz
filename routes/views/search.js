/**
 * Created by jordi_2 on 12/05/2016.
 */
var keystone = require('keystone');
var movie = keystone.list('Movie');
exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {
		movie: []
	};
	
	var data= req.query;
	
// Set locals
	locals.section = 'movie';
	var str=data['recherche'];
	//str=str.substring(0,1).toUpperCase()+str.substring(1,str.length);
	movie.model.find(({"Title": {$regex:str,$options:'i'}}))
			.exec()
			.then(function (movies) { //first promise fulfilled
				locals.data.movie=movies;
				view.render('search');
			}, function (err) { //first promise rejected
				throw err;
			}).then(function (result) {
				//second promise fulfilled
				//do something with final results
			}, function (err) { //something happened
				//catch the error, it can be thrown by any promise in the chain
				console.log(err);
			});

	// Render the view
	
};
