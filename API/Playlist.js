// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var PlaylistSchema = new Schema({
  name: String,
  list_id: String,
  counter: Number,
  created_at: Date,
  updated_at: Date,
  song_list: [{order: Number, song_id: String, song_name: String, song_artist: String, song_album: String, listened: Boolean}]
});

// the schema is useless so far
// we need to create a model using it
var Playlist = mongoose.model('Playlist', PlaylistSchema);

// make this available to our Playlists in our Node applications
module.exports = Playlist;