import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  password = '';
  password_confirm = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onRegister(): void {
    if (this.password !== this.password_confirm) {
      console.error('Registration failed: Passwords do not match!');
      return;
    }

    console.log('Attempting to register with:', this.email);

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Register successful!', response);
        window.location.href = '/';
      },
      error: (error) => {
        console.error('Register failed!', error);
      },
    });
  }
}
