import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnUploadOneFileComponent } from './btn-upload-one-file.component';

describe('BtnUploadOneFileComponent', () => {
  let component: BtnUploadOneFileComponent;
  let fixture: ComponentFixture<BtnUploadOneFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnUploadOneFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnUploadOneFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
