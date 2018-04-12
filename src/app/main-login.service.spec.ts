import { TestBed, inject } from '@angular/core/testing';

import { MainLoginService } from './main-login.service';

describe('MainLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainLoginService]
    });
  });

  it('should be created', inject([MainLoginService], (service: MainLoginService) => {
    expect(service).toBeTruthy();
  }));
});
