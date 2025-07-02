// src/app/features/tasks/services/task-data.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskData {
  private baseUrl = 'api/tasks';  // InMemoryWebApi usa /api/tasks

  constructor(private http: HttpClient) {}

  /** GET /api/tasks */
  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  /** POST /api/tasks */
  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  /** PUT /api/tasks/:id */
  update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, task);
  }

  /** DELETE /api/tasks/:id */
  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
