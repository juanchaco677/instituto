import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPlanEstudioComponent } from './crear-plan-estudio.component';

describe('CrearPlanEstudioComponent', () => {
  let component: CrearPlanEstudioComponent;
  let fixture: ComponentFixture<CrearPlanEstudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPlanEstudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPlanEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
