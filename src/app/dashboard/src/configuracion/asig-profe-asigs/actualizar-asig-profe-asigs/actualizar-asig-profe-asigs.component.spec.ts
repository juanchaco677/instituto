import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAsigProfeAsigsComponent } from './actualizar-asig-profe-asigs.component';

describe('ActualizarAsigProfeAsigsComponent', () => {
  let component: ActualizarAsigProfeAsigsComponent;
  let fixture: ComponentFixture<ActualizarAsigProfeAsigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarAsigProfeAsigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarAsigProfeAsigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
