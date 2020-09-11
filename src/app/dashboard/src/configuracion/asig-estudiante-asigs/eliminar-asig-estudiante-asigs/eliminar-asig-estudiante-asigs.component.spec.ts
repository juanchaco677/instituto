import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAsigEstudianteAsigsComponent } from './eliminar-asig-estudiante-asigs.component';

describe('EliminarAsigEstudianteAsigsComponent', () => {
  let component: EliminarAsigEstudianteAsigsComponent;
  let fixture: ComponentFixture<EliminarAsigEstudianteAsigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarAsigEstudianteAsigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAsigEstudianteAsigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
