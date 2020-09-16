import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoComentariosComponent } from './foro-comentarios.component';

describe('ForoComentariosComponent', () => {
  let component: ForoComentariosComponent;
  let fixture: ComponentFixture<ForoComentariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoComentariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
