import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearForoAulaMateriaComponent } from './crear-foro-aula-materia.component';

describe('CrearForoAulaMateriaComponent', () => {
  let component: CrearForoAulaMateriaComponent;
  let fixture: ComponentFixture<CrearForoAulaMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearForoAulaMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearForoAulaMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
