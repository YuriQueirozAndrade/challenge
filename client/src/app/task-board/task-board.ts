import { CommonModule } from '@angular/common';
import { ApiHandler } from '../api-handler';
import { Task } from '../task/task';
import { ITask } from '../ITask';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, Task],
  templateUrl: './task-board.html',
  styleUrl: './task-board.css',
})
export class TaskBoard implements OnInit, OnDestroy {
  private api = inject(ApiHandler);
  private cdr = inject(ChangeDetectorRef);
  tasks: ITask[] = [];

  private taskSubscription!: Subscription;

  ngOnInit(): void {
    this.fetchTasks();
    this.taskSubscription = this.api.refresh$.subscribe(() => {
      this.fetchTasks();
    });
  }

  fetchTasks(): void {
    this.api.getAllTask().subscribe((tasks: ITask[]) => {
      this.tasks = tasks;
      console.log(this.tasks);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
}
