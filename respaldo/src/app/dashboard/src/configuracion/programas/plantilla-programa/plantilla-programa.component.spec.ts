import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaProgramaComponent } from './plantilla-programa.component';

describe('PlantillaProgramaComponent', () => {
  let component: PlantillaProgramaComponent;
  let fixture: ComponentFixture<PlantillaProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
