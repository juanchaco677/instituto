import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarModalidadComponent } from './eliminar-modalidad.component';

describe('EliminarModalidadComponent', () => {
  let component: EliminarModalidadComponent;
  let fixture: ComponentFixture<EliminarModalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarModalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarModalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
