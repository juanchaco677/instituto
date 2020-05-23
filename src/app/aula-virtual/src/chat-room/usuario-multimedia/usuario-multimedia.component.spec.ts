import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioMultimediaComponent } from './usuario-multimedia.component';

describe('UsuarioMultimediaComponent', () => {
  let component: UsuarioMultimediaComponent;
  let fixture: ComponentFixture<UsuarioMultimediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioMultimediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
