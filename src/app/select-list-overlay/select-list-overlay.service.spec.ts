import { TestBed, inject } from '@angular/core/testing';

import { SelectListOverlayService } from './select-list-overlay.service';

describe('SelectListOverlayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectListOverlayService]
    });
  });

  it('should be created', inject([SelectListOverlayService], (service: SelectListOverlayService) => {
    expect(service).toBeTruthy();
  }));
});
