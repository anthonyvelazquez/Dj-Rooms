import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DJDisplayComponent } from './djdisplay.component';

describe('DJDisplayComponent', () => {
  let component: DJDisplayComponent;
  let fixture: ComponentFixture<DJDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DJDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DJDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
