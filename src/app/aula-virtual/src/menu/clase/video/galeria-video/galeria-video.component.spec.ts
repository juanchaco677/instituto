import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaVideoComponent } from './galeria-video.component';

describe('GaleriaVideoComponent', () => {
  let component: GaleriaVideoComponent;
  let fixture: ComponentFixture<GaleriaVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriaVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
