import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaNivelComponent } from './plantilla-nivel.component';

describe('PlantillaNivelComponent', () => {
  let component: PlantillaNivelComponent;
  let fixture: ComponentFixture<PlantillaNivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaNivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
