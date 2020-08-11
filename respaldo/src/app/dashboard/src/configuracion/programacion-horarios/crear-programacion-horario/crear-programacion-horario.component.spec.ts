import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProgramacionHorarioComponent } from './crear-programacion-horario.component';

describe('CrearProgramacionHorarioComponent', () => {
  let component: CrearProgramacionHorarioComponent;
  let fixture: ComponentFixture<CrearProgramacionHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearProgramacionHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProgramacionHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
