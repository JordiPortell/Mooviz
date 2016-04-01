/**
 * Created by jordi_2 on 06/02/2016.
 */
var keystone = require('keystone');
var Types = keystone.Field.Types;

var Movie = new keystone.List('Movie', {
	map: { name: 'Title' },
	autokey: { path: 'slug', from: 'Title', unique: true }
});

Movie.add(
{
 Title:{type:String,required :true},
 Year:{type:Types.Number},
 Rated: {type:Types.Number},
 Released: {type:Types.Date},
 Runtime:{type:String},
 Genre:{type:String},
 Director:{type:String},
 Writer:{type:String},
 Actors:{type:String},
 Plot:{type:String},
 Language:{type:String},
 Country:{type:String},
 Awards:{type:String},
 Poster:{type: Types.CloudinaryImage},
 Metascore:{type:Types.Number},
 imdbRating:{type:Types.Number},
 imdbVotes:{type:Types.Number},
 imdbID:{type:Types.Number},
 Type:{type:String}
});

Movie.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

//Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Movie.register();

