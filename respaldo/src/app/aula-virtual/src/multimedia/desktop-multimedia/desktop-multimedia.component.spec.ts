import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopMultimediaComponent } from './desktop-multimedia.component';

describe('DesktopMultimediaComponent', () => {
  let component: DesktopMultimediaComponent;
  let fixture: ComponentFixture<DesktopMultimediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopMultimediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
