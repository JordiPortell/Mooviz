/**
 * Created by jordi_2 on 12/05/2016.
 */
var keystone = require('keystone');
var movie = keystone.list('Movie');
exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {
		movie: [],
		currentPage: 1
	};
	
	locals.data.currentPage = req.query.page;
	
// Set locals
	locals.section = 'movie';
	movie.paginate({
			page: locals.data.currentPage || 1,
			perPage: 5,
			maxPages: 10
		})
		.sort('-Released')
		.exec(function(err, results) {
			locals.data.currentPage = req.query.page || 1;
			locals.data.movie = results.results;
			view.render('nouveaute');
		});

	// Render the view

};
