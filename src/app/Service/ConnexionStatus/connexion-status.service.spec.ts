import { TestBed } from '@angular/core/testing';

import { ConnexionStatusService } from './connexion-status.service';

describe('ConnexionStatusService', () => {
  let service: ConnexionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnexionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
