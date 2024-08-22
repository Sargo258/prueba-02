import { Component, OnInit, computed } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  // Usando computed para obtener la lista de tareas
  tasks = computed(() => this.taskService.getTasks());

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // Las tareas se actualizarán automáticamente cuando la signal cambie
    this.tasks = computed(() => this.taskService.getTasks());
  }
}
