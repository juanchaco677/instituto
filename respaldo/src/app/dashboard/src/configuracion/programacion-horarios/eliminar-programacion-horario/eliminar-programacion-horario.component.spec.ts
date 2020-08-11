import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProgramacionHorarioComponent } from './eliminar-programacion-horario.component';

describe('EliminarProgramacionHorarioComponent', () => {
  let component: EliminarProgramacionHorarioComponent;
  let fixture: ComponentFixture<EliminarProgramacionHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarProgramacionHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarProgramacionHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
