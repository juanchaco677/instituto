import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterEstudianteComponent } from './footer-estudiante.component';

describe('FooterEstudianteComponent', () => {
  let component: FooterEstudianteComponent;
  let fixture: ComponentFixture<FooterEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
