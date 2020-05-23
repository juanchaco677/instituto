import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAsigProfeAsigsComponent } from './eliminar-asig-profe-asigs.component';

describe('EliminarAsigProfeAsigsComponent', () => {
  let component: EliminarAsigProfeAsigsComponent;
  let fixture: ComponentFixture<EliminarAsigProfeAsigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarAsigProfeAsigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAsigProfeAsigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
