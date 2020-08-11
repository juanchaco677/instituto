import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarNoticiaComponent } from './eliminar-noticia.component';

describe('EliminarNoticiaComponent', () => {
  let component: EliminarNoticiaComponent;
  let fixture: ComponentFixture<EliminarNoticiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarNoticiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
