import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarSalonComponent } from './eliminar-salon.component';

describe('EliminarSalonComponent', () => {
  let component: EliminarSalonComponent;
  let fixture: ComponentFixture<EliminarSalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarSalonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
