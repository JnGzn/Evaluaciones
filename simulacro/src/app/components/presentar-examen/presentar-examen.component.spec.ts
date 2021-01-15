import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentarExamenComponent } from './presentar-examen.component';

describe('PresentarExamenComponent', () => {
  let component: PresentarExamenComponent;
  let fixture: ComponentFixture<PresentarExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentarExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
