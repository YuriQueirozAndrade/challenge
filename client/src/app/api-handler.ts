import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { ITask } from './ITask';
import { IComment } from './IComment';
import { SessionStorageHandler } from './session-storage-handler';

@Injectable({
  providedIn: 'root',
})
export class ApiHandler {
  url = 'http://127.0.0.1:3000';
  private sessionStorage = inject(SessionStorageHandler);
  private http = inject(HttpClient);

  private refreshSubject = new BehaviorSubject<void>(undefined);

  public refresh$ = this.refreshSubject.asObservable();

  private getHttpOptions(): { headers: HttpHeaders } {
    const authData = this.sessionStorage.getAuthData();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (authData && authData.token) {
      return {
        headers: headers.set('Authorization', `Bearer ${authData.token}`),
      };
    }

    return { headers };
  }

  getAllTask(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.url}/tasks`, this.getHttpOptions()).pipe(retry(2));
  }

  postTask(task: ITask): Observable<ITask> {
    return this.http
      .post<ITask>(`${this.url}/tasks`, task, this.getHttpOptions())
      .pipe(tap(() => this.refreshSubject.next(undefined)));
  }

  putTask(id: number, task: ITask): Observable<ITask> {
    return this.http
      .put<ITask>(`${this.url}/tasks/${id}`, task, this.getHttpOptions())
      .pipe(tap(() => this.refreshSubject.next(undefined)));
  }

  deleteTask(id: number): Observable<ITask> {
    return this.http
      .delete<ITask>(`${this.url}/tasks/${id}`, this.getHttpOptions())
      .pipe(tap(() => this.refreshSubject.next(undefined)));
  }

  createComment(task_id: number, text: string): Observable<IComment> {
    return this.http
      .post<IComment>(
        `${this.url}/tasks/${task_id}/comments`,
        { comment: { text } },
        this.getHttpOptions(),
      )
      .pipe(tap(() => this.refreshSubject.next(undefined)));
  }
  deleteComment(task_id: number, comment_id: number): Observable<IComment> {
    return this.http
      .delete<IComment>(
        `${this.url}/tasks/${task_id}/comments/${comment_id}`,
        this.getHttpOptions(),
      )
      .pipe(tap(() => this.refreshSubject.next(undefined)));
  }
}
