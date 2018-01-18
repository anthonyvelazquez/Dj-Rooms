import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMusicService } from '../google-music.service';
import { isEmpty } from 'rxjs/operators/isEmpty';

@Component({
  selector: 'app-djdisplay',
  templateUrl: './djdisplay.component.html',
  styleUrls: ['./djdisplay.component.css']
})
export class DJDisplayComponent implements OnInit {

  audio: any;
  key: string;
  private sub: any;
  playlist: any;
  current_song: any;
  url: any;
  playing: Boolean;

  constructor(private route: ActivatedRoute, private google_music: GoogleMusicService) { 
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.key = params['key'];
    });
    this.audio = new Audio("");
    //Creates Playlist if not created
    this.google_music.CreatePlaylist(this.key).subscribe(data => { console.log(data) });
    this.google_music.GetPlaylist(this.key).subscribe(data => {  this.playlist = data.list;});
    this.google_music.GetCurrentSongDJ(this.key).subscribe(data => { 
      // Run if there is a song
      if(data.song == false) {
        console.log("New/Empty List: No Songs...")
      }
      else {
        this.current_song = data.song;
        this.url = data.stream;
        this.StartSong(this.url);
      }
      setInterval(() => {
        this.UpdateInfo()
      }, 1000)
    });
    //Keep Updating Current and Playlist 
    
    
  }

  StartSong(song) {
    this.audio.src = song;
    this.audio.load();
    if (!this.audio.error) {
      this.audio.play();
      this.playing = true;
    }
    this.audio.onended = () => {
      this.google_music.GetNextPlaylistSong(this.key).subscribe(data => {
        if(data.song == false)
        {
          console.log("End of Playlist")
        }
        else {
          this.current_song = data.song;
          this.url = data.stream;
          console.log(this.url)
          this.audio.pause();
          this.StartSong(this.url);
        }
      })
    }
  }

  PauseSong() {
    this.audio.pause();
    this.playing = false;
  }

  ResumeSong() {
    this.audio.play();
    this.playing = true;
  }

  NextSong() {
    this.google_music.GetNextPlaylistSong(this.key).subscribe(data => {
      if(data.song == false)
      {
        console.log("End of Playlist")
      }
      else {
        this.current_song = data.song;
        this.url = data.stream;
        console.log(this.url)
        this.audio.pause();
        this.StartSong(this.url);
      }
    })
  }
  RestartSong() {
    this.audio.currentTime = 0;
  }

  SongSearch(value) {
    this.google_music.SearchSong(value).subscribe(data => { 
      this.google_music.AddToPlaylist(data.song.track, this.key).subscribe(data => {})
    })
    
  }

  UpdateInfo() {
    this.google_music.GetPlaylist(this.key).subscribe(data => {  this.playlist = data.list;});
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
