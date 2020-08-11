import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaAsigProfeAsigsComponent } from './plantilla-asig-profe-asigs.component';

describe('PlantillaAsigProfeAsigsComponent', () => {
  let component: PlantillaAsigProfeAsigsComponent;
  let fixture: ComponentFixture<PlantillaAsigProfeAsigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaAsigProfeAsigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaAsigProfeAsigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
