import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProgramaModalidadComponent } from './crear-programa-modalidad.component';

describe('CrearProgramaModalidadComponent', () => {
  let component: CrearProgramaModalidadComponent;
  let fixture: ComponentFixture<CrearProgramaModalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearProgramaModalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProgramaModalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
