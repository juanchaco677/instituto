import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaCRUDComponent } from './plantilla-crud.component';

describe('PlantillaCRUDComponent', () => {
  let component: PlantillaCRUDComponent;
  let fixture: ComponentFixture<PlantillaCRUDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaCRUDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
