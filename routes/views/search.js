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
		totalPages: 1,
		currentPage: 1
	};
	
	var data= req.query;
	
	// Set locals
	locals.section = 'movie';
	var str=data['recherche'];

	movie.paginate({
		page: locals.data.currentPage || 1,
		perPage: 10
	})
			.where('Title', {$regex:str,$options:'i'})//.regex(str)
			.sort('-Released')
			.exec(function(err, results) {
				locals.data.totalPages = results.totalPages;
				locals.data.currentPage = req.query.page || 1;
				locals.data.movie = results.results;
				view.render('search');
			});
};
