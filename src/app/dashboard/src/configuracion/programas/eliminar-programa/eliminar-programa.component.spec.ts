import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProgramaComponent } from './eliminar-programa.component';

describe('EliminarProgramaComponent', () => {
  let component: EliminarProgramaComponent;
  let fixture: ComponentFixture<EliminarProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
