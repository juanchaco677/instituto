import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarMateriasComponent } from './eliminar-materias.component';

describe('EliminarMateriasComponent', () => {
  let component: EliminarMateriasComponent;
  let fixture: ComponentFixture<EliminarMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
