import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoIntegrantesComponent } from './dialogo-integrantes.component';

describe('DialogoIntegrantesComponent', () => {
  let component: DialogoIntegrantesComponent;
  let fixture: ComponentFixture<DialogoIntegrantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoIntegrantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoIntegrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
