import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaModalidadComponent } from './plantilla-modalidad.component';

describe('PlantillaModalidadComponent', () => {
  let component: PlantillaModalidadComponent;
  let fixture: ComponentFixture<PlantillaModalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaModalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaModalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
