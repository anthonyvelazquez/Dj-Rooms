import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMusicService } from '../google-music.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  room_list: any;
  wrong_room: Boolean = false;
  constructor(private router: Router, private google_music: GoogleMusicService) { }

  ngOnInit() {
  }

  CreateRoom(key) {
    this.router.navigate(['/room', key, 'dj']);
  }
  JoinRoom(key) {
    this.google_music.CheckRoom(key).subscribe(data => {
      if(data.found)
      {
        this.router.navigate(['/room', key, 'user']);
      }
      else
      {
        this.wrong_room = true;
      }
    });
  }
}
