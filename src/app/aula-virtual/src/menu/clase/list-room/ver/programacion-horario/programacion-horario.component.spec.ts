import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramacionHorarioComponent } from './programacion-horario.component';

describe('AsigProfeAsigsComponent', () => {
  let component: ProgramacionHorarioComponent;
  let fixture: ComponentFixture<ProgramacionHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramacionHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
