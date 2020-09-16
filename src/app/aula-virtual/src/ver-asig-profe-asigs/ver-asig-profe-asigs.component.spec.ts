import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAsigProfeAsigsComponent } from './ver-asig-profe-asigs.component';

describe('VerAsigProfeAsigsComponent', () => {
  let component: VerAsigProfeAsigsComponent;
  let fixture: ComponentFixture<VerAsigProfeAsigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAsigProfeAsigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAsigProfeAsigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
