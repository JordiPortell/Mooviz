/**
 * Created by Alexandre on 16/06/2016.
 */
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
		currentPage: 1,
		totalPages: 1,
		cat: 'Action'
	};

	locals.data.currentPage = req.query.page;
	locals.data.cat = req.query.cat;
	console.log(req.query.cat);
// Set locals
	locals.section = 'movie';

	movie.paginate({
		page: locals.data.currentPage || 1,
		perPage: 10
	})
			.where('Genre').regex(locals.data.cat)
			.sort('-Released')
			.exec(function(err, results) {
				locals.data.totalPages = results.totalPages;
				locals.data.currentPage = req.query.page || 1;
				locals.data.movie = results.results;
				view.render('categorie');
			});

	// Render the view

};
