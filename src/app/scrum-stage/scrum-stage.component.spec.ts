import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumStageComponent } from './scrum-stage.component';

describe('ScrumStageComponent', () => {
  let component: ScrumStageComponent;
  let fixture: ComponentFixture<ScrumStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrumStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrumStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
