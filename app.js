var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var app = express();
var cors = require('cors');
var PlayMusic = require('playmusic');
var pm = new PlayMusic();
var Playlist = require('./API/Playlist');

var port = 8080;
// use it before all route definitions
// Create the authorization URL

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

var routes = require('./API/Routes')(app);
//Replace with your own DB
mongoose.connect('mongodb://user:pass@ds259117.mlab.com:59117/djroom');
app.use(express.static(__dirname));

app.use('', express.static(__dirname + '/dist'));

app.listen(port, function() {
    console.log("listening on port: " + port);
  });
