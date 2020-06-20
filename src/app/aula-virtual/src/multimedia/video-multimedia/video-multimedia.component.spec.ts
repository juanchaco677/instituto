import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMultimediaComponent } from './video-multimedia.component';

describe('VideoMultimediaComponent', () => {
  let component: VideoMultimediaComponent;
  let fixture: ComponentFixture<VideoMultimediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoMultimediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
