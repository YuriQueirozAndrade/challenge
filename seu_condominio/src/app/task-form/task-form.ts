// task-form.ts
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ITask } from '../ITask'; // Import the interface

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  // Implement OnInit
  @Output() formClosed = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<void>();

  @Input() title: string = '';
  @Input() isEditMode: boolean = false;
  // Add the new input to receive the task data
  @Input() task!: ITask;

  taskForm = new FormGroup({
    taskName: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    estimatedCost: new FormControl(''), // This control expects a string
    taskStatus: new FormControl(''),
  });

  ngOnInit(): void {
    if (this.isEditMode && this.task) {
      this.taskForm.patchValue({
        taskName: this.task.name,
        startDate: this.task.startDate?.toISOString().split('T')[0],
        endDate: this.task.endDate?.toISOString().split('T')[0],
        // Convert the number to a string
        estimatedCost: this.task.cost?.toString(),
        taskStatus: this.getTaskStatusString(this.task.status),
      });
    }
  }
  onSubmit() {
    console.log(this.taskForm.value);
    this.formSubmitted.emit();
  }

  onClose() {
    this.formClosed.emit();
  }

  onDelete() {
    this.formClosed.emit();
  }

  // Helper function to convert the status number to a string for the form
  private getTaskStatusString(status: number): string {
    switch (status) {
      case 1:
        return 'pending';
      case 2:
        return 'in-progress';
      case 3:
        return 'completed';
      default:
        return '';
    }
  }
}
