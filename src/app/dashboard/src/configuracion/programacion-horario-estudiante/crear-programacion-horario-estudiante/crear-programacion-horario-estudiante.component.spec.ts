import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProgramacionHorarioEstudianteComponent } from './crear-programacion-horario-estudiante.component';

describe('CrearProgramacionHorarioEstudianteComponent', () => {
  let component: CrearProgramacionHorarioEstudianteComponent;
  let fixture: ComponentFixture<CrearProgramacionHorarioEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearProgramacionHorarioEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProgramacionHorarioEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
