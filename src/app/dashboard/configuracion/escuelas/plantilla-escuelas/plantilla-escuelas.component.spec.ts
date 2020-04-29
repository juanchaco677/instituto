import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaEscuelasComponent } from './plantilla-escuelas.component';

describe('PlantillaEscuelasComponent', () => {
  let component: PlantillaEscuelasComponent;
  let fixture: ComponentFixture<PlantillaEscuelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaEscuelasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaEscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
