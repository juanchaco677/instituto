import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaSedeComponent } from './plantilla-sede.component';

describe('PlantillaSedeComponent', () => {
  let component: PlantillaSedeComponent;
  let fixture: ComponentFixture<PlantillaSedeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaSedeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
