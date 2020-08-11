import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaChatComponent } from './plantilla-chat.component';

describe('PlantillaChatComponent', () => {
  let component: PlantillaChatComponent;
  let fixture: ComponentFixture<PlantillaChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
