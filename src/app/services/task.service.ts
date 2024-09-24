import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks'; // Cambia la URL según tu configuración
  tasks: any[] = []; // Inicializa como un array vacío

  constructor(private http: HttpClient) {
    this.loadTasks(); // Carga las tareas al iniciar el servicio
  }

  private loadTasks(): void {
    this.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  saveTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  updateTask(updatedTask: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${updatedTask.id}`, updatedTask);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }

  getTaskClasses(): Observable<{ value: string; label: string }[]> {
    return this.http.get<{ value: string; label: string }[]>(`${this.apiUrl}/task-classes`);
  }
}
