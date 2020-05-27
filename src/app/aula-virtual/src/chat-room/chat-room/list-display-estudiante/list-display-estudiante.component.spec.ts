import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisplayEstudianteComponent } from './list-display-estudiante.component';

describe('ListDisplayEstudianteComponent', () => {
  let component: ListDisplayEstudianteComponent;
  let fixture: ComponentFixture<ListDisplayEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDisplayEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDisplayEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
