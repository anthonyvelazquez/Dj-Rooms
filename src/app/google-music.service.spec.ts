import { TestBed, inject } from '@angular/core/testing';

import { GoogleMusicService } from './google-music.service';

describe('GoogleMusicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleMusicService]
    });
  });

  it('should be created', inject([GoogleMusicService], (service: GoogleMusicService) => {
    expect(service).toBeTruthy();
  }));
});
