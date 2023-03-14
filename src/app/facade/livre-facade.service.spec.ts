import { TestBed } from '@angular/core/testing';

import { LivreFacadeService } from './livre-facade.service';

describe('LivreFacadeService', () => {
  let service: LivreFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivreFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
