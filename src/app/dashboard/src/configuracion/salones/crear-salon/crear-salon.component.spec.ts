import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSalonComponent } from './crear-salon.component';

describe('CrearSalonComponent', () => {
  let component: CrearSalonComponent;
  let fixture: ComponentFixture<CrearSalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearSalonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
