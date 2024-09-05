import { Component, OnInit, computed } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskDetailModalComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  tasks = computed(() => this.taskService.getTasks());
  selectedTask: any = null; // Tarea seleccionada para editar
  isEditing: boolean = false; // Controla si el modal de edición está abierto

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

   // Muestra detalles de una tarea
   viewTaskDetails(task: any) {
    this.selectedTask = { ...task };
    this.isEditing = false; // Asegurarse de que no estamos en modo edición
  }


  // Abre el formulario para añadir o editar una tarea
  openTaskForm(task?: any) {
    this.selectedTask = task ? { ...task } : { title: '', description: '', dueDate: '' }; // Si no hay tarea, es para añadir una nueva
    this.isEditing = true; // Mostrar modal de edición
  }

  // Cierra el modal
  closeModal() {
    this.selectedTask = null;
    this.isEditing = false; // Ocultar modal
  }

  // Maneja la tarea guardada
  onTaskSaved(task: any) {
    if (this.selectedTask && this.selectedTask.id) {
      // Si existe una tarea seleccionada con ID, estamos editando
      this.taskService.updateTask(task);
    } else {
      // Si no hay tarea seleccionada con ID, estamos añadiendo una nueva
      this.taskService.saveTask(task);
    }
    this.closeModal(); // Cerrar modal después de guardar
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
  }
}
