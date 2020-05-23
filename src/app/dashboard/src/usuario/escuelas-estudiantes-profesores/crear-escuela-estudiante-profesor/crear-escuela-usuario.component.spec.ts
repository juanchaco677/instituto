import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEscuelaUsuarioComponent } from './crear-escuela-usuario.component';

describe('CrearEscuelaEstudianteProfesorComponent', () => {
  let component: CrearEscuelaUsuarioComponent;
  let fixture: ComponentFixture<CrearEscuelaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEscuelaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEscuelaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
