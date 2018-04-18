import { TestBed, inject } from '@angular/core/testing';

import { SubtaskService } from './subtask.service';

describe('SubtaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubtaskService]
    });
  });

  it('should be created', inject([SubtaskService], (service: SubtaskService) => {
    expect(service).toBeTruthy();
  }));
});
