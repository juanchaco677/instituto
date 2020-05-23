import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaProgramaModalidadComponent } from './plantilla-programa-modalidad.component';

describe('PlantillaProgramaModalidadComponent', () => {
  let component: PlantillaProgramaModalidadComponent;
  let fixture: ComponentFixture<PlantillaProgramaModalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaProgramaModalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaProgramaModalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
