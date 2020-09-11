import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAsigEstudianteAsigsComponent } from './crear-asig-estudiante-asigs.component';

describe('CrearAsigEstudianteAsigsComponent', () => {
  let component: CrearAsigEstudianteAsigsComponent;
  let fixture: ComponentFixture<CrearAsigEstudianteAsigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearAsigEstudianteAsigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAsigEstudianteAsigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
