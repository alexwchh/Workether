import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskItemComponent } from './subtask-item.component';

describe('SubtaskItemComponent', () => {
  let component: SubtaskItemComponent;
  let fixture: ComponentFixture<SubtaskItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtaskItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
