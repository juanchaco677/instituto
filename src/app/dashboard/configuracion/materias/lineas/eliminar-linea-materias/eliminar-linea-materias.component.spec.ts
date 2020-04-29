import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarLineaMateriasComponent } from './eliminar-linea-materias.component';

describe('EliminarLineaMateriasComponent', () => {
  let component: EliminarLineaMateriasComponent;
  let fixture: ComponentFixture<EliminarLineaMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarLineaMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarLineaMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
