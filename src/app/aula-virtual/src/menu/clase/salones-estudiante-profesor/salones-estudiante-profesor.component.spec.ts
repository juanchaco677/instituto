import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonesEstudianteProfesorComponent } from './salones-estudiante-profesor.component';

describe('SalonesEstudianteProfesorComponent', () => {
  let component: SalonesEstudianteProfesorComponent;
  let fixture: ComponentFixture<SalonesEstudianteProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonesEstudianteProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonesEstudianteProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
