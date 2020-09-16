import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosClaseComponent } from './videos-clase.component';

describe('VideosClaseComponent', () => {
  let component: VideosClaseComponent;
  let fixture: ComponentFixture<VideosClaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosClaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
