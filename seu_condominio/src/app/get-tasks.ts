import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITask } from './ITask';

@Injectable({
  providedIn: 'root',
})
export class GetTasksService {
  private MOCK_TASKS: ITask[] = [
    {
      id: 1,
      name: 'Plan project kickoff meeting',
      startDate: new Date('2024-05-20T09:00:00Z'),
      endDate: new Date('2024-05-20T10:00:00Z'),
      cost: 50,
      status: 1,
      userId: 101,
      createdAt: new Date('2024-05-19T10:00:00Z'),
      updatedAt: new Date('2024-05-19T10:00:00Z'),
    },
    {
      id: 2,
      name: 'Create wireframes for new feature',
      startDate: new Date('2024-05-21T13:00:00Z'),
      endDate: new Date('2024-05-23T17:00:00Z'),
      cost: 200,
      status: 2,
      userId: 101,
      createdAt: new Date('2024-05-20T09:00:00Z'),
      updatedAt: new Date('2024-05-20T09:00:00Z'),
    },
    {
      id: 3,
      name: 'Write quarterly report',
      startDate: new Date('2024-05-22T08:00:00Z'),
      cost: 150,
      status: 0,
      userId: 102,
      createdAt: new Date('2024-05-21T15:00:00Z'),
      updatedAt: new Date('2024-05-21T15:00:00Z'),
    },
  ];

  constructor() {}

  getTasks(): Observable<ITask[]> {
    return of(this.MOCK_TASKS);
  }
}
