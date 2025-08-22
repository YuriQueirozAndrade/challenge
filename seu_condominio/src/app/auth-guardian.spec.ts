import { TestBed } from '@angular/core/testing';

import { AuthGuardian } from './auth-guardian';

describe('AuthGuardian', () => {
  let service: AuthGuardian;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardian);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
