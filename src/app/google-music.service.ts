import { Injectable } from '@angular/core';
import {HttpModule, Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class GoogleMusicService {

  constructor(private http: Http) { }

  GetCurrentSong(playlist) {
    return this.http.get('http://127.0.0.1:8080/song/current', {params: {playlist_name: playlist}}).map(res => res.json());
  }
  GetCurrentSongDJ(playlist) {
    return this.http.get('http://127.0.0.1:8080/song/currentdj', {params: {playlist_name: playlist}}).map(res => res.json());
  }
  SearchSong(song) {
    return this.http.get('http://127.0.0.1:8080/song/search', {params: {song_name: song}}).map(res => res.json());
  }
  GetPlaylist(playlist) {
    return this.http.get('http://127.0.0.1:8080/playlist/get', {params: {playlist_name: playlist}}).map(res => res.json());
  }
  AddToPlaylist(song, playlist) {
    return this.http.get('http://127.0.0.1:8080/playlist/add', {params: {song_id: song.storeId, song_name: song.title, song_artist: song.artist, song_album: song.album, playlist_name: playlist}}).map(res => res.json());
  }
  GetNextPlaylistSong(playlist) {
    return this.http.get('http://127.0.0.1:8080/playlist/next', {params: {playlist_name: playlist}}).map(res => res.json());
  }
  CreatePlaylist(name) {
    return this.http.get('http://127.0.0.1:8080/playlist/create', {params: {playlist_name: name}}).map(res => res.json());
  }
  GetRooms() {
    return this.http.get('http://127.0.0.1:8080/rooms/list').map(res => res.json());
  }
  CheckRoom(playlist) {
    return this.http.get('http://127.0.0.1:8080/rooms/check', {params: {playlist_name: playlist}}).map(res => res.json());
  }
}
