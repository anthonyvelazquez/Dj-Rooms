import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMusicService } from '../google-music.service';
import '../../assets/utils.js'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  key: string;
  private sub: any;
  playlist: any;
  current_song: any;

  constructor(private route: ActivatedRoute, private google_music: GoogleMusicService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.key = params['key'];
    });
    this.google_music.GetPlaylist(this.key).subscribe(data => {  this.playlist = data.list;});
    this.google_music.GetCurrentSong(this.key).subscribe(data => { this.current_song = data.song; });
    
    //Keep Updating Current and Playlist 
    setInterval(() => {
      this.UpdateInfo()
    }, 1000)
  }

  SongSearch(value) {
    this.google_music.SearchSong(value).subscribe(data => { 
      this.google_music.AddToPlaylist(data.song.track, this.key).subscribe(data => {})
    })
    this.google_music.GetPlaylist(this.key).subscribe(data => {  this.playlist = data.list;});
  }

  UpdateInfo() {
    this.google_music.GetPlaylist(this.key).subscribe(data => {  this.playlist = data.list;});
    this.google_music.GetCurrentSong(this.key).subscribe(data => { 
      // Run if there is a song
      if(data.song == false) {
        console.log("New/Empty List: No Songs...")
      }
      else {
        this.current_song = data.song;
      }
    });
  }

}
