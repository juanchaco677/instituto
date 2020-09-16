import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionAsigEsComponent } from './inscripcion-asig-es.component';

describe('InscripcionAsigEsComponent', () => {
  let component: InscripcionAsigEsComponent;
  let fixture: ComponentFixture<InscripcionAsigEsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionAsigEsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionAsigEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
