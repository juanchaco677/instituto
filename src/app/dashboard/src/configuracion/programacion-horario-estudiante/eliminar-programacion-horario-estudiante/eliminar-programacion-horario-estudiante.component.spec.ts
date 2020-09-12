import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProgramacionHorarioEstudianteComponent } from './eliminar-programacion-horario-estudiante.component';

describe('EliminarProgramacionHorarioEstudianteComponent', () => {
  let component: EliminarProgramacionHorarioEstudianteComponent;
  let fixture: ComponentFixture<EliminarProgramacionHorarioEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarProgramacionHorarioEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarProgramacionHorarioEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
