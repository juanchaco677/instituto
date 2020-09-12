import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarMatriculaComponent } from './eliminar-matricula.component';

describe('EliminarMatriculaComponent', () => {
  let component: EliminarMatriculaComponent;
  let fixture: ComponentFixture<EliminarMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarMatriculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
