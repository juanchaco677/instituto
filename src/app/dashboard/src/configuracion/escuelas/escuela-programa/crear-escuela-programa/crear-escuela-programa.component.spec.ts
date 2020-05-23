import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEscuelaProgramaComponent } from './crear-escuela-programa.component';

describe('CrearEscuelaProgramaComponent', () => {
  let component: CrearEscuelaProgramaComponent;
  let fixture: ComponentFixture<CrearEscuelaProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEscuelaProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEscuelaProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
