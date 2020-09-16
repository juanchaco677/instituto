import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionClaseComponent } from './presentacion-clase.component';

describe('PresentacionClaseComponent', () => {
  let component: PresentacionClaseComponent;
  let fixture: ComponentFixture<PresentacionClaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionClaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
