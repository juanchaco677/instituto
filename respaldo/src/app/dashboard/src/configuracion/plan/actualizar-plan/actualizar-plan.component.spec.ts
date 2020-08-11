import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPlanComponent } from './actualizar-plan.component';

describe('ActualizarPlanComponent', () => {
  let component: ActualizarPlanComponent;
  let fixture: ComponentFixture<ActualizarPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
