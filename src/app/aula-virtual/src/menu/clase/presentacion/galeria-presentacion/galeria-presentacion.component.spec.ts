import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaPresentacionComponent } from './galeria-presentacion.component';

describe('GaleriaPresentacionComponent', () => {
  let component: GaleriaPresentacionComponent;
  let fixture: ComponentFixture<GaleriaPresentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriaPresentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaPresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
