import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEscuelaProgramaComponent } from './actualizar-escuela-programa.component';

describe('ActualizarEscuelaProgramaComponent', () => {
  let component: ActualizarEscuelaProgramaComponent;
  let fixture: ComponentFixture<ActualizarEscuelaProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarEscuelaProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarEscuelaProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
