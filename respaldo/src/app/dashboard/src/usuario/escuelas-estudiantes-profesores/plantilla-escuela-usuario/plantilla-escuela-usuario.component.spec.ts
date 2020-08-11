import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaEscuelaUsuarioComponent } from './plantilla-escuela-usuario.component';

describe('PlantillaEscuelaUsuarioComponent', () => {
  let component: PlantillaEscuelaUsuarioComponent;
  let fixture: ComponentFixture<PlantillaEscuelaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaEscuelaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaEscuelaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
