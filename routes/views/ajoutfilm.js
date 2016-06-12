/**
 * Created by Alexandre on 12/06/2016.
 */
var keystone = require('keystone');
var movie = keystone.list('Movie');
exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {
		errSearchQuery: 'ok'
	};
	
	view.render('ajoutfilm');
};
