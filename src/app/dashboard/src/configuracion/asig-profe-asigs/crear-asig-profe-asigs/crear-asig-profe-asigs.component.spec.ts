import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAsigProfeAsigsComponent } from './crear-asig-profe-asigs.component';

describe('CrearAsigProfeAsigsComponent', () => {
  let component: CrearAsigProfeAsigsComponent;
  let fixture: ComponentFixture<CrearAsigProfeAsigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearAsigProfeAsigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAsigProfeAsigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
