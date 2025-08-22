import { Component, EventEmitter, Output, Input, OnInit, inject } from '@angular/core';
import { ApiHandler } from '../api-handler';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITask } from '../ITask';
import { IComment } from '../IComment';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  private api = inject(ApiHandler);
  showDeleteConfirmation: boolean = false;
  @Output() formClosed = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<ITask>();
  @Output() taskDeleted = new EventEmitter<number>();

  @Input() title: string = '';
  @Input() isEditMode: boolean = false;
  @Input() task?: ITask;

  taskForm = new FormGroup({
    taskName: new FormControl('', Validators.required),
    startDate: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
    endDate: new FormControl(''),
    estimatedCost: new FormControl(''),
    taskStatus: new FormControl('pending'),
  });

  ngOnInit(): void {
    if (this.isEditMode && this.task) {
      this.taskForm.patchValue({
        taskName: this.task.name,
        startDate: this.task.start_date,
        endDate: this.task.end_date,
        estimatedCost: this.task.cost?.toString() || '',
        taskStatus: this.task.status,
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const newTask: ITask = {
        id: this.isEditMode && this.task ? this.task.id : Date.now(),
        name: formValue.taskName || '',
        start_date: formValue.startDate || '',
        end_date: formValue.endDate || null,
        cost: formValue.estimatedCost ? parseInt(formValue.estimatedCost) : undefined,
        status: formValue.taskStatus || 'pending',
        comments: this.isEditMode && this.task ? this.task.comments : [],
      };

      this.formSubmitted.emit(newTask);
      if (!this.isEditMode) {
        this.api.postTask(newTask).subscribe(() => {
          console.log('Post : ', newTask);
          this.onClose();
        });
      } else {
        if (this.task) {
          this.api.putTask(this.task.id, newTask).subscribe(() => {
            console.log('Put : ', newTask);
            this.onClose();
          });
        }
      }
      this.taskForm.reset();
      this.onClose();
    } else {
      console.error('Form is invalid. Please fill in all required fields.');
    }
  }

  onClose(): void {
    this.formClosed.emit();
  }

  onDelete(): void {
    this.showDeleteConfirmation = true;
  }

  confirmDelete(): void {
    if (this.task?.id) {
      this.taskDeleted.emit(this.task.id);
      this.api.deleteTask(this.task.id).subscribe(() => {
        this.showDeleteConfirmation = false;
        this.onClose();
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
  }
}
