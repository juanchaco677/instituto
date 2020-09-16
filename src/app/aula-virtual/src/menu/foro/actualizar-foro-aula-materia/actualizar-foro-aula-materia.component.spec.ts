import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarForoAulaMateriaComponent } from './actualizar-foro-aula-materia.component';

describe('ActualizarForoAulaMateriaComponent', () => {
  let component: ActualizarForoAulaMateriaComponent;
  let fixture: ComponentFixture<ActualizarForoAulaMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarForoAulaMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarForoAulaMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
