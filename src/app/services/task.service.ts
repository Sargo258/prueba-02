import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks';

  // Signal para manejar las tareas
  tasks = signal(this.loadTasksFromStorage());

  constructor() { }

  // Cargar las tareas desde el localStorage al iniciar
  private loadTasksFromStorage(): any[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTasks = localStorage.getItem(this.storageKey);
      return storedTasks ? JSON.parse(storedTasks) : [];
    }
    return [];
  }


  getTasks() {
    return this.tasks();
  }

  // Añadir una nueva tarea
  saveTask(task: any) {
    // Actualiza la signal local
    this.tasks.update(tasks => {
      const updatedTasks = [...tasks, task];
      this.saveTasksToStorage(updatedTasks);
      return updatedTasks;
    });
  }

  // Guardar las tareas en el localStorage
  private saveTasksToStorage(tasks: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
  
}
