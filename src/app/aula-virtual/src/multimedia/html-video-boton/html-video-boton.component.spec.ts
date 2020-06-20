import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlVideoBotonComponent } from './html-video-boton.component';

describe('HtmlVideoBotonComponent', () => {
  let component: HtmlVideoBotonComponent;
  let fixture: ComponentFixture<HtmlVideoBotonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlVideoBotonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlVideoBotonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
