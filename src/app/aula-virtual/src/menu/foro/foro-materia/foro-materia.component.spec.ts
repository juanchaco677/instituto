import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoMateriaComponent } from './foro-materia.component';

describe('ForoMateriaComponent', () => {
  let component: ForoMateriaComponent;
  let fixture: ComponentFixture<ForoMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
