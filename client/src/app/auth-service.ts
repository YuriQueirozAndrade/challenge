import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { SessionStorageHandler } from './session-storage-handler';

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface ApiResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'any',
})
export class AuthService {
  private http = inject(HttpClient);
  private sessionStorageHandler = inject(SessionStorageHandler);

  register(name: string, email: string, password: string): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>('http://127.0.0.1:3000/users', { name, email, password })
      .pipe(
        tap((response) => {
          this.sessionStorageHandler.setAuthData(response);
        }),
        shareReplay(),
      );
  }

  login(email: string, password: string): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>('http://127.0.0.1:3000/auth/login', { email, password })
      .pipe(
        tap((response) => {
          this.sessionStorageHandler.setAuthData(response);
        }),
        shareReplay(),
      );
  }
  logout(): void {
    console.log('logout');
    this.sessionStorageHandler.removeAuthData();
  }

  isLoggedIn(): boolean {
    const authData = this.sessionStorageHandler.getAuthData();
    return !!authData && !!authData.token;
  }
}
