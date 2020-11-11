import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemForoComponent } from './item-foro.component';

describe('ItemForoComponent', () => {
  let component: ItemForoComponent;
  let fixture: ComponentFixture<ItemForoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemForoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
