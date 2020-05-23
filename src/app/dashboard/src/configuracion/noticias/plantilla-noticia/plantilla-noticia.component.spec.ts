import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaNoticiaComponent } from './plantilla-noticia.component';

describe('PlantillaNoticiaComponent', () => {
  let component: PlantillaNoticiaComponent;
  let fixture: ComponentFixture<PlantillaNoticiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaNoticiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
