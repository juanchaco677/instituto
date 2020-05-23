import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaPrincipalComponent } from './plantilla-principal.component';

describe('PlantillaPrincipalComponent', () => {
  let component: PlantillaPrincipalComponent;
  let fixture: ComponentFixture<PlantillaPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
