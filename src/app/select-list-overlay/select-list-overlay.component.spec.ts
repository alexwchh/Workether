import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectListOverlayComponent } from './select-list-overlay.component';

describe('SelectListOverlayComponent', () => {
  let component: SelectListOverlayComponent;
  let fixture: ComponentFixture<SelectListOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectListOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectListOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
