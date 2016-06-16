/**
 * Created by Alexandre on 14/06/2016.
 */
var keystone = require('keystone');
var omdb = require('omdb');
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

	var txt = req.body.films;
	var recherche = req.body.film;

	// On POST requests, add the Enquiry item to the database
	view.on('post', function(next) {
		console.log(txt);
		fs.readFile(txt, 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}
			console.log(data);
		});
		next();
	});
	// Render the view
	view.render('ajoutfilm');

};
