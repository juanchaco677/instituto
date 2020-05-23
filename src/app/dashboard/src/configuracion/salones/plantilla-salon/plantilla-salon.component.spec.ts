import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaSalonComponent } from './plantilla-salon.component';

describe('PlantillaSalonComponent', () => {
  let component: PlantillaSalonComponent;
  let fixture: ComponentFixture<PlantillaSalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaSalonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
