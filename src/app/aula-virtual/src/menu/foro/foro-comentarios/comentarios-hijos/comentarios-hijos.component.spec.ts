import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosHijosComponent } from './comentarios-hijos.component';

describe('ComentariosHijosComponent', () => {
  let component: ComentariosHijosComponent;
  let fixture: ComponentFixture<ComentariosHijosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentariosHijosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosHijosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
