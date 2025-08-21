import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDetails } from '../task-details/task-details';
import { TaskForm } from '../task-form/task-form';
import { ITask } from '../ITask';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, TaskDetails, TaskForm],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task implements OnInit {
  @Input() task!: ITask;

  isEditMode = false;
  viewDetails = false;

  ngOnInit(): void {
    if (this.task) {
      console.log('Task received:', this.task.name);
    }
  }

  // New method to toggle the view of details
  toggleView(): void {
    // Only toggle the view if we are not in edit mode
    if (!this.isEditMode) {
      this.viewDetails = !this.viewDetails;
    }
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  hideForm() {
    this.isEditMode = false;
  }
}
