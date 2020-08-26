import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionPPTComponent } from './presentacion-ppt.component';

describe('PresentacionPPTComponent', () => {
  let component: PresentacionPPTComponent;
  let fixture: ComponentFixture<PresentacionPPTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionPPTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionPPTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
