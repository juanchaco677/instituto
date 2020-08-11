import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarNivelComponent } from './eliminar-nivel.component';

describe('EliminarNivelComponent', () => {
  let component: EliminarNivelComponent;
  let fixture: ComponentFixture<EliminarNivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarNivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
