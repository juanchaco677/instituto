import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAulaVirtualComponent } from './login-aula-virtual.component';

describe('LoginAulaVirtualComponent', () => {
  let component: LoginAulaVirtualComponent;
  let fixture: ComponentFixture<LoginAulaVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAulaVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAulaVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
