import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaEscuelaProgramaComponent } from './plantilla-escuela-programa.component';

describe('PlantillaEscuelaProgramaComponent', () => {
  let component: PlantillaEscuelaProgramaComponent;
  let fixture: ComponentFixture<PlantillaEscuelaProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaEscuelaProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaEscuelaProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
