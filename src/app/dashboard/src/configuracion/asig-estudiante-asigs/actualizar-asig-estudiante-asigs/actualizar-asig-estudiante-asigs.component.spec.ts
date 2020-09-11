import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAsigEstudianteAsigsComponent } from './actualizar-asig-estudiante-asigs.component';

describe('ActualizarAsigEstudianteAsigsComponent', () => {
  let component: ActualizarAsigEstudianteAsigsComponent;
  let fixture: ComponentFixture<ActualizarAsigEstudianteAsigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarAsigEstudianteAsigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarAsigEstudianteAsigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
