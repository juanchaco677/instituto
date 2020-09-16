import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaForoAulaMateriaComponent } from './plantilla-foro-aula-materia.component';

describe('PlantillaForoAulaMateriaComponent', () => {
  let component: PlantillaForoAulaMateriaComponent;
  let fixture: ComponentFixture<PlantillaForoAulaMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaForoAulaMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaForoAulaMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
