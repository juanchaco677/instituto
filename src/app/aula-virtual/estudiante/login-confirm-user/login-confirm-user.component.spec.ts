import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConfirmUserComponent } from './login-confirm-user.component';

describe('LoginConfirmUserComponent', () => {
  let component: LoginConfirmUserComponent;
  let fixture: ComponentFixture<LoginConfirmUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginConfirmUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginConfirmUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
