import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks';

  tasks = signal(this.loadTasksFromStorage());

  constructor() { }

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

  saveTask(task: any) {
    this.tasks.update(tasks => {
      const updatedTasks = [...tasks, { ...task, id: this.generateId() }];
      this.saveTasksToStorage(updatedTasks);
      return updatedTasks;
    });
  }

  updateTask(updatedTask: any) {
    this.tasks.update(tasks => {
      const updatedTasks = tasks.map(task => 
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );
      this.saveTasksToStorage(updatedTasks);
      return updatedTasks;
    });
  }

  deleteTask(taskId: string) {
    this.tasks.update(tasks => {
      const updatedTasks = tasks.filter(t => t.id !== taskId);
      this.saveTasksToStorage(updatedTasks);
      return updatedTasks;
    });
  }

  private saveTasksToStorage(tasks: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}