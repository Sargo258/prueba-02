import { Component, OnInit, computed } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TaskDetailModalComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  // Usando computed para obtener la lista de tareas
  tasks = computed(() => this.taskService.getTasks());
  selectedTask: any = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // Las tareas se actualizarán automáticamente cuando la signal cambie
    this.tasks = computed(() => this.taskService.getTasks());
  }

  viewTaskDetails(task: any) {
    alert(`Detalles de la tarea:\nDescroption: ${task.description}\nTítulo: ${task.title}\nFecha de entrega: ${task.dueDate}`);
    // Aquí podrías redirigir a una página de detalles, abrir un modal, etc.
  }

  openModal(task: any) {
    this.selectedTask = task;
  }

  closeModal() {
    this.selectedTask = null;
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task);
  }
}
