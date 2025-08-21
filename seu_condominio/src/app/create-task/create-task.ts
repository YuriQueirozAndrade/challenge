import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTask {
  @Output() formClosed = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<void>();

  taskForm = new FormGroup({
    taskName: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    estimatedCost: new FormControl(''),
    taskStatus: new FormControl(''),
  });

  onSubmit() {
    console.log(this.taskForm.value);
    this.formSubmitted.emit();
    this.formClosed.emit();
  }

  onClose() {
    this.formClosed.emit();
  }
}
