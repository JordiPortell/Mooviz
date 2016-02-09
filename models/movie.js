/**
 * Created by jordi_2 on 06/02/2016.
 */
/*var keystone = require('keystone');
var Types = keystone.Field.Types;

var Movie = new keystone.List('Movie', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Movie.add(
{
	imdburl:{type:String,required :true},
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});

Movie.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
*/
