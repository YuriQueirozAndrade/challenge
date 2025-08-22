import { Injectable } from '@angular/core';
import { ApiResponse } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageHandler {
  private AUTH_DATA_KEY = 'authData';

  constructor() {}

  public setAuthData(authData: ApiResponse): void {
    try {
      sessionStorage.setItem(this.AUTH_DATA_KEY, JSON.stringify(authData));
    } catch (e) {
      console.error('Error saving data to session storage', e);
    }
  }

  public getAuthData(): ApiResponse | null {
    try {
      const data = sessionStorage.getItem(this.AUTH_DATA_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error retrieving data from session storage', e);
    }
    return null;
  }
  public getUser(): ApiResponse | null {
    try {
      const data = sessionStorage.getItem(this.AUTH_DATA_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error retrieving data from session storage', e);
    }
    return null;
  }

  public removeAuthData(): void {
    try {
      sessionStorage.removeItem(this.AUTH_DATA_KEY);
    } catch (e) {
      console.error('Error removing data from session storage', e);
    }
  }
}
