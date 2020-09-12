import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarMatriculaComponent } from './actualizar-matricula.component';

describe('ActualizarMatriculaComponent', () => {
  let component: ActualizarMatriculaComponent;
  let fixture: ComponentFixture<ActualizarMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarMatriculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
