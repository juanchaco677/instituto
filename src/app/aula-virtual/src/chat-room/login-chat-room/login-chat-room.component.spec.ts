import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginChatRoomComponent } from './login-chat-room.component';

describe('LoginChatRoomComponent', () => {
  let component: LoginChatRoomComponent;
  let fixture: ComponentFixture<LoginChatRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginChatRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
