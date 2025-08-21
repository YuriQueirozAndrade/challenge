import { TestBed } from '@angular/core/testing';

import { GetTasks } from './get-tasks';

describe('GetTasks', () => {
  let service: GetTasks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTasks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
