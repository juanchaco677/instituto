import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarProgramaModalidadComponent } from './actualizar-programa-modalidad.component';

describe('ActualizarProgramaModalidadComponent', () => {
  let component: ActualizarProgramaModalidadComponent;
  let fixture: ComponentFixture<ActualizarProgramaModalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarProgramaModalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarProgramaModalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
