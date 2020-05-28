import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigProfeAsigsComponent } from './asig-profe-asigs.component';

describe('AsigProfeAsigsComponent', () => {
  let component: AsigProfeAsigsComponent;
  let fixture: ComponentFixture<AsigProfeAsigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsigProfeAsigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsigProfeAsigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
