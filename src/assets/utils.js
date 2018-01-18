var SpotifyHelper = (function() {
    
      return {
        CreateRoom: function(room_name) {
          console.log("called create room from utils");
          // window.onSpotifyWebPlaybackSDKReady = () => {
            console.log("called ready from utils");
            const token = 'BQA-c3-pUHFQsoYJmR3KqWiJXYHt3EVfZhakrjlG4bUe7c5QSJ8UWr4Tsd1dQ92BGzA-8HXDRndIgtGt0uSm-0tl1kgKcd2DDd1HiK34IKP6vm1PufUuPiQfh8DlV8HuG9nktFNCoG3r47D4eXIT9vri3iuLdjeDBhhJNU88RaSB0Iw';
            const player = new Spotify.Player({
              name: room_name,
              getOAuthToken: cb => { cb(token); }
            });

            // Error handling
            player.on('initialization_error', e => { console.error(e); });
            player.on('authentication_error', e => { console.error(e); });
            player.on('account_error', e => { console.error(e); });
            player.on('playback_error', e => { console.error(e); });

            // Playback status updates
            player.on('player_state_changed', state => { console.log(state); });

            // Ready
            player.on('ready', data => {
              let { device_id } = data;
              console.log('Ready with Device ID', device_id);
            });

            // Connect to the player!
            player.connect();
            obj = player;
            console.log(player)
          // } // end onSpotifyWebPlaybackSDKReady
        },
      }
    
    })(SpotifyHelper||{})
    
    