import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMp4Component } from './list-mp4.component';

describe('ListMp4Component', () => {
  let component: ListMp4Component;
  let fixture: ComponentFixture<ListMp4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMp4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMp4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
