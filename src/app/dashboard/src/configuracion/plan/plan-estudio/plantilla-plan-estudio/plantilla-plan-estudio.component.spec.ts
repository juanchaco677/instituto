import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaPlanEstudioComponent } from './plantilla-plan-estudio.component';

describe('PlantillaPlanEstudioComponent', () => {
  let component: PlantillaPlanEstudioComponent;
  let fixture: ComponentFixture<PlantillaPlanEstudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaPlanEstudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaPlanEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
