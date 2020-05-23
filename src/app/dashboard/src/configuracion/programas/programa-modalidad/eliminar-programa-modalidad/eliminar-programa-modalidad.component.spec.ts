import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProgramaModalidadComponent } from './eliminar-programa-modalidad.component';

describe('EliminarProgramaModalidadComponent', () => {
  let component: EliminarProgramaModalidadComponent;
  let fixture: ComponentFixture<EliminarProgramaModalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarProgramaModalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarProgramaModalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
