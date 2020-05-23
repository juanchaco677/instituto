import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEscuelasComponent } from './actualizar-escuelas.component';

describe('ActualizarEscuelasComponent', () => {
  let component: ActualizarEscuelasComponent;
  let fixture: ComponentFixture<ActualizarEscuelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarEscuelasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarEscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
