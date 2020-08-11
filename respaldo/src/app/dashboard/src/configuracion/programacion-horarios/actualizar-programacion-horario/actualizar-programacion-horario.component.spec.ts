import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarProgramacionHorarioComponent } from './actualizar-programacion-horario.component';

describe('ActualizarProgramacionHorarioComponent', () => {
  let component: ActualizarProgramacionHorarioComponent;
  let fixture: ComponentFixture<ActualizarProgramacionHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarProgramacionHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarProgramacionHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
