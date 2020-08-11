import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEscuelaUsuarioComponent } from './eliminar-escuela-usuario.component';

describe('EliminarEscuelaEstudianteProfesorComponent', () => {
  let component: EliminarEscuelaUsuarioComponent;
  let fixture: ComponentFixture<EliminarEscuelaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarEscuelaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarEscuelaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
