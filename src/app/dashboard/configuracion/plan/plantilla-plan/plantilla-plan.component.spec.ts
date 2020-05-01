import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaPlanComponent } from './plantilla-plan.component';

describe('PlantillaPlanComponent', () => {
  let component: PlantillaPlanComponent;
  let fixture: ComponentFixture<PlantillaPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
