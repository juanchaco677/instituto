import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaMateriaComponent } from './plantilla-materia.component';

describe('PlantillaMateriaComponent', () => {
  let component: PlantillaMateriaComponent;
  let fixture: ComponentFixture<PlantillaMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
