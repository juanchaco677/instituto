import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarProgramacionHorarioEstudianteComponent } from './actualizar-programacion-horario-estudiante.component';

describe('ActualizarProgramacionHorarioEstudianteComponent', () => {
  let component: ActualizarProgramacionHorarioEstudianteComponent;
  let fixture: ComponentFixture<ActualizarProgramacionHorarioEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarProgramacionHorarioEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarProgramacionHorarioEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
