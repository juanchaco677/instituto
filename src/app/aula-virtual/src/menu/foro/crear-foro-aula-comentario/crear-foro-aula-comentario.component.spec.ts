import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearForoAulaComentarioComponent } from './crear-foro-aula-comentario.component';

describe('CrearForoAulaComentarioComponent', () => {
  let component: CrearForoAulaComentarioComponent;
  let fixture: ComponentFixture<CrearForoAulaComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearForoAulaComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearForoAulaComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
