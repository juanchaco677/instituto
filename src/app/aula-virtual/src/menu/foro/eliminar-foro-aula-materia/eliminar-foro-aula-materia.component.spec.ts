import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarForoAulaMateriaComponent } from './eliminar-foro-aula-materia.component';

describe('EliminarForoAulaMateriaComponent', () => {
  let component: EliminarForoAulaMateriaComponent;
  let fixture: ComponentFixture<EliminarForoAulaMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarForoAulaMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarForoAulaMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
