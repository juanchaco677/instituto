import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorChatComponent } from './contenedor-chat.component';

describe('ContenedorChatComponent', () => {
  let component: ContenedorChatComponent;
  let fixture: ComponentFixture<ContenedorChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedorChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
