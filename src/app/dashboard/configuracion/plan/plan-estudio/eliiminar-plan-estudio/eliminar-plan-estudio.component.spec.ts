import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPlanEstudioComponent } from './eliminar-plan-estudio.component';

describe('EliminarPlanEstudioComponent', () => {
  let component: EliminarPlanEstudioComponent;
  let fixture: ComponentFixture<EliminarPlanEstudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarPlanEstudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarPlanEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
