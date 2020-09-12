import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaProgramacionHorarioEstudianteComponent } from './plantilla-programacion-horario-estudiante.component';

describe('PlantillaProgramacionHorarioEstudianteComponent', () => {
  let component: PlantillaProgramacionHorarioEstudianteComponent;
  let fixture: ComponentFixture<PlantillaProgramacionHorarioEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaProgramacionHorarioEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaProgramacionHorarioEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
