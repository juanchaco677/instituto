import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaAsigEstudianteAsigsComponent } from './plantilla-asig-estudiante-asigs.component';

describe('PlantillaAsigEstudianteAsigsComponent', () => {
  let component: PlantillaAsigEstudianteAsigsComponent;
  let fixture: ComponentFixture<PlantillaAsigEstudianteAsigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaAsigEstudianteAsigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaAsigEstudianteAsigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
