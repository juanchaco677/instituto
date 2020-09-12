import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaMatriculaComponent } from './plantilla-matricula.component';

describe('PlantillaMatriculaComponent', () => {
  let component: PlantillaMatriculaComponent;
  let fixture: ComponentFixture<PlantillaMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaMatriculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
