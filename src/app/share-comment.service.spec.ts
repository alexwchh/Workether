import { TestBed, inject } from '@angular/core/testing';

import { ShareCommentService } from './share-comment.service';

describe('ShareCommentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareCommentService]
    });
  });

  it('should be created', inject([ShareCommentService], (service: ShareCommentService) => {
    expect(service).toBeTruthy();
  }));
});
