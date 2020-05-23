import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreInstitucionComponent } from './nombre-institucion.component';

describe('NombreInstitucionComponent', () => {
  let component: NombreInstitucionComponent;
  let fixture: ComponentFixture<NombreInstitucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombreInstitucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
