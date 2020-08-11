import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaMateriasComponent } from './linea-materias.component';

describe('LineaMateriasComponent', () => {
  let component: LineaMateriasComponent;
  let fixture: ComponentFixture<LineaMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
