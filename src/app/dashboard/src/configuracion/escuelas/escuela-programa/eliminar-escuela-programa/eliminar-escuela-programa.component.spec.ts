import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEscuelaProgramaComponent } from './eliminar-escuela-programa.component';

describe('EliminarEscuelaProgramaComponent', () => {
  let component: EliminarEscuelaProgramaComponent;
  let fixture: ComponentFixture<EliminarEscuelaProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarEscuelaProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarEscuelaProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
