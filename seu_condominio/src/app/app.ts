import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './auth-service';
import { SessionStorageHandler } from './session-storage-handler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('seu_condominio');
  private auth = inject(AuthService);
  private router = inject(Router);
  private session = inject(SessionStorageHandler);
  user_name: string | null = null;
  ngOnInit(): void {
    const authData = this.session.getAuthData();
    if (authData && authData.user) {
      this.user_name = authData.user.name;
    }
  }

  logout(): void {
    this.auth.logout();
    window.location.reload();
  }
}
