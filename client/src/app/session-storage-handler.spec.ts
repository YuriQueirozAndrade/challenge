import { TestBed } from '@angular/core/testing';

import { SessionStorageHandler } from './session-storage-handler';

describe('SessionStorageHandler', () => {
  let service: SessionStorageHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
