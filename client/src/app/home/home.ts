import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskForm } from '../task-form/task-form';
import { TaskBoard } from '../task-board/task-board';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TaskForm, TaskBoard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  showForm: boolean = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }

  hideForm() {
    this.showForm = false;
  }
}
