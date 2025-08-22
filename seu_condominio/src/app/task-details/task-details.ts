import { Component, Input, inject } from '@angular/core';
import { ApiHandler } from '../api-handler';
import { CommonModule } from '@angular/common';
import { ITask } from '../ITask';
import { IComment } from '../IComment';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionStorageHandler } from '../session-storage-handler';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails {
  private api = inject(ApiHandler);
  protected sessionStorage = inject(SessionStorageHandler);
  @Input() task!: ITask;

  commentForm = new FormGroup({
    text: new FormControl('', Validators.required),
  });

  onDeleteComment(commentId: number): void {
    if (this.task?.id && commentId) {
      this.api.deleteComment(this.task.id, commentId).subscribe(() => {
        console.log(`Comment ${commentId} deleted successfully.`);
      });
    }
  }

  onCreateComment(): void {
    if (this.commentForm.valid && this.task?.id) {
      const commentText = this.commentForm.value.text || '';

      this.api.createComment(this.task.id, commentText).subscribe(() => {
        console.log('Comment created successfully:', commentText);
        this.commentForm.reset();
      });
    }
  }
}
