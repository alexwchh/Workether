import { TestBed, inject } from '@angular/core/testing';

import { ProjectActorService } from './project-actor.service';

describe('ProjectActorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectActorService]
    });
  });

  it('should be created', inject([ProjectActorService], (service: ProjectActorService) => {
    expect(service).toBeTruthy();
  }));
});
