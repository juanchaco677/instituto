import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaProgramacionHorarioComponent } from './plantilla-programacion-horario.component';

describe('PlantillaProgramacionHorarioComponent', () => {
  let component: PlantillaProgramacionHorarioComponent;
  let fixture: ComponentFixture<PlantillaProgramacionHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaProgramacionHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaProgramacionHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
