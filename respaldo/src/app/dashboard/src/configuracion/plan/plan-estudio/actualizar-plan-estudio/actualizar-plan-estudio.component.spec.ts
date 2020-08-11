import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPlanEstudioComponent } from './actualizar-plan-estudio.component';

describe('ActualizarPlanEstudioComponent', () => {
  let component: ActualizarPlanEstudioComponent;
  let fixture: ComponentFixture<ActualizarPlanEstudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarPlanEstudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPlanEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
