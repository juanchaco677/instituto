import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaLineaMateriasComponent } from './plantilla-linea-materias.component';

describe('PlantillaLineaMateriasComponent', () => {
  let component: PlantillaLineaMateriasComponent;
  let fixture: ComponentFixture<PlantillaLineaMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaLineaMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaLineaMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
