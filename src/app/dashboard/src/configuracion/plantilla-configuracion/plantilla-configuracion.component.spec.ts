import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaConfiguracionComponent } from './plantilla-configuracion.component';

describe('PlantillaConfiguracionComponent', () => {
  let component: PlantillaConfiguracionComponent;
  let fixture: ComponentFixture<PlantillaConfiguracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaConfiguracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
