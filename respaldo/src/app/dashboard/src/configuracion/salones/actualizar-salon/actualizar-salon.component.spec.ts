import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarSalonComponent } from './actualizar-salon.component';

describe('ActualizarSalonComponent', () => {
  let component: ActualizarSalonComponent;
  let fixture: ComponentFixture<ActualizarSalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarSalonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
