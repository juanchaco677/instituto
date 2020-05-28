import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDesktopComponent } from './video-desktop.component';

describe('VideoDesktopComponent', () => {
  let component: VideoDesktopComponent;
  let fixture: ComponentFixture<VideoDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
