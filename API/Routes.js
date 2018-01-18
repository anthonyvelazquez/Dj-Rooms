var PlayMusic = require('playmusic');
var pm = new PlayMusic();
var Playlist = require('./Playlist');
var username = "test@test.com";
var password = "password";
pm.init({email: username, password: password}, function(err) {
    if(err) console.error(err);
    // place code here
})

module.exports = function(app) {
 
    
    app.get('/playlist/create', function(req, res) {
        Playlist.find({ name: req.query.playlist_name }, function(err, list) {
        if (err) throw(err);
        else if(list.length == 0) {
            pm.login({email: username, password: password}, function(err) {
                if(err) console.error(err);
                // place code here
            pm.addPlayList(req.query.playlist_name, function(err, data) {
                var playlist = new Playlist({name: req.query.playlist_name, list_id: data.mutate_response[0].id, counter: 1})
                playlist.save(function(err) {
                    if (err) throw err;
                    else {
                        console.log('Playlist created successfully!');
                        res.json({"message": "Created"})
                    }
                });
            });
        })
        }
        else {
            console.log('Playlist already exists!');
            res.json({"message": "Skipping Playlist Creation"})
        }
        });
    });
    app.get('/playlist/get', function(req, res) {
        console.log("Getting Playlist: " +  req.query.playlist_name)
        Playlist.findOne({ name: req.query.playlist_name }, function(err, list) {
        if (err) throw(err);
        else if(list) {
            res.json({"list": list.song_list})
        }
        else {
            res.json({"found": false})
        }
        });
    });
    app.get('/playlist/add', function(req, res) {
        console.log("Adding Song to " +  req.query.playlist_name)
        Playlist.findOne({ name: req.query.playlist_name }, function(err, list) {
        if (err) throw(err);
        pm.login({email: username, password: password}, function(err) {
            if(err) console.error(err);
            // place code here
            pm.addTrackToPlayList(req.query.song_id ,list.list_id, function(err, data) {
                pm.getStreamUrl(req.query.song_id, function(err, streamUrl) {
                    if(list.song_list.length > 0)
                    {
                        var number = list.song_list[list.song_list.length - 1].order;
                        list.song_list.push({order: (number+1), song_id: req.query.song_id, song_name: req.query.song_name, song_artist: req.query.song_artist, song_album: req.query.song_album, listened: false});
                        list.save();
                        console.log(list.song_list)
                        console.log("Playlist Updated")
                    }
                    else {
                        list.song_list.push({order: 1, song_id: req.query.song_id, song_name: req.query.song_name, song_artist: req.query.song_artist, song_album: req.query.song_album, listened: false});
                        list.save();
                        console.log("Playlist Updated")
                    }
                    res.json({"done": true})
                });
            });
        });
        });
    });
    app.get('/playlist/next', function(req, res) {
        Playlist.findOne({ name: req.query.playlist_name }, function(err, list) {
        if (err) throw(err);
        else if(list) {
            list.counter = list.counter + 1;
            list.song_list.pull(list.song_list[0]);
            list.save();
            console.log("Playlist Length: " + list.song_list.length)
            if(list.song_list.length > 0){
            console.log(list.song_list[0].song_id)
                pm.getStreamUrl(list.song_list[0].song_id, function(err, streamUrl) {
                    console.log(streamUrl);
                    res.json({"song": list.song_list[0], "stream": streamUrl})
                });}
            else {
                res.json({"song": false})
            }
        }
        });
    });
    app.get('/song/current', function(req, res) {
        console.log("Getting Current Song")
        Playlist.findOne({ name: req.query.playlist_name }, function(err, list) {
        if (err) throw(err);
        else if(list) {
            if(list.song_list.length > 0)
                res.json({"song": list.song_list[0]})
            else {
                res.json({"song": false});
            }
        }
        });
    });

    app.get('/song/currentdj', function(req, res) {
        console.log("Getting Current Song")
        Playlist.findOne({ name: req.query.playlist_name }, function(err, list) {
        if (err) throw(err);
        else if(list) {
            if(list.song_list.length > 0)
                pm.getStreamUrl(list.song_list[0].song_id, function(err, streamUrl) {
                    res.json({"song": list.song_list[0], "stream": streamUrl})
                });
            else {
                res.json({"song": false});
            }
        }
        });
    });
    
    app.get('/song/search', function(req, res) {
        console.log("Searching Song:" + req.query.song_name)
        if(req.query.song_name.length > 0)
        {
            pm.login({email: username, password: password}, function(err) {
                if(err) console.error(err);
                // place code here
            pm.search(req.query.song_name, 5, function(err, data) { // max 5 results
                console.log(data)
                var track_list = []
                for(var x = 0; x < data.entries.length; x++)
                {
                    if(data.entries[x].type == '1')
                    {
                        track_list.push(data.entries[x])
                    }
                }
                console.log(track_list)
                var song = track_list.sort(function(a, b) { // sort by match score
                    return a.score < b.score;
                }).shift(); // take first song
                console.log(song);
                // pm.getStreamUrl(song.track.storeId, function(err, streamUrl) {
                //     console.log(streamUrl);
                // });
                res.json({"song": song})
            }, function(message, body, err, httpResponse) {
                console.log(message);
            });
        })
        }
    });

    app.get('/song/url', function(req, res) {
        console.log("Getting URL :" + req.query.song_id)
            pm.login({email: username, password: password}, function(err) {
                if(err) console.error(err);
                // place code here
                pm.getStreamUrl(req.query.song_id, function(err, streamUrl) {
                        console.log(streamUrl);
                        res.json({"song_url": streamUrl})
                    });
        })
    });

    app.get('/rooms/list', function(req, res) {
        Playlist.findOne({}, function(err, list) {
        if (err) throw(err);
            res.json({"room_list": list})
        });
    });

    app.get('/rooms/check', function(req, res) {
        console.log("Looking for Room: " + req.query.playlist_name)
        Playlist.findOne({ name: req.query.playlist_name }, function(err, list) {
        if (err) throw(err);
        else if(list.length > 0)
        {
            console.log("Found Room")
            res.json({"found": true})
        }
        else
        {
            console.log("Room not found")
            res.json({"found": false})
        }
        });
    });
}