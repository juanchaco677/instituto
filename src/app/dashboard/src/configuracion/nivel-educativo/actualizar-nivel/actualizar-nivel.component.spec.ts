import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarNivelComponent } from './actualizar-nivel.component';

describe('ActualizarNivelComponent', () => {
  let component: ActualizarNivelComponent;
  let fixture: ComponentFixture<ActualizarNivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarNivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
