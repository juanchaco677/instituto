import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChatComponent } from './menu-chat.component';

describe('MenuChatComponent', () => {
  let component: MenuChatComponent;
  let fixture: ComponentFixture<MenuChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
