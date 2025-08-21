import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetTasksService } from '../get-tasks';
import { Task } from '../task/task';
import { ITask } from '../ITask';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, Task],
  template: `
    <h2>Project Tasks</h2>
    <div class="task-list">
      <app-task *ngFor="let task of tasks" [task]="task"> </app-task>
    </div>
  `,
  styleUrl: './task-board.css',
})
export class TaskBoard implements OnInit {
  private getTasksService = inject(GetTasksService);
  tasks: ITask[] = [];

  ngOnInit(): void {
    this.getTasksService.getTasks().subscribe((tasks: ITask[]) => {
      this.tasks = tasks;
    });
  }
}
