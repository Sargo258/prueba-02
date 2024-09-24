import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskDetailModalComponent } from '../shared/components/task-detail-modal/task-detail-modal.component';
import { FormsModule } from '@angular/forms';
import { Task } from '../shared/components/models/task.model'; // Asegúrate de que la ruta sea correcta
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskDetailModalComponent, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = []; // Almacena la lista de tareas
  filteredTasks: Task[] = []; // Almacena las tareas filtradas
  selectedTask: Task | null = null; // Tarea seleccionada para ver o editar
  isEditing: boolean = false; // Controla si el modal de edición está abierto
  isViewing: boolean = false; // Controla si el modal de detalles está abierto
  searchTerm: string = '';
  selectedClass: string = '';
  private taskSubscription: Subscription = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks(); // Carga las tareas al iniciar
  }

  loadTasks() {
    this.taskSubscription = this.taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks; // Asigna las tareas obtenidas
        this.filteredTasks = this.filterTasks(); // Actualiza las tareas filtradas
      },
      (error) => {
        console.error('Error al cargar tareas', error);
      }
    );
  }

  filterTasks() {
    const term = this.searchTerm.toLowerCase();
    const selectedClass = this.selectedClass;

    return this.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(term) || task.description?.toLowerCase().includes(term);
      const matchesClass = !selectedClass || task.class === selectedClass; 
      return matchesSearch && matchesClass;
    });
  }

  viewTaskDetails(task: Task) {
    this.selectedTask = { ...task };
    this.isViewing = true;
    this.isEditing = false;
  }

  openTaskForm(task?: Task) {
    this.selectedTask = task ? { ...task } : { title: '', description: '', dueDate: '', class: '' } as Task; // Ajustar al tipo Task
    this.isEditing = true;
    this.isViewing = false;
  }

  closeModal() {
    this.selectedTask = null;
    this.isEditing = false;
    this.isViewing = false;
  }

  onTaskSaved(task: Task) {
    if (this.selectedTask && this.selectedTask.id) {
      this.taskService.updateTask(task);
    } else {
      this.taskService.saveTask(task);
    }
    this.loadTasks(); // Recarga las tareas después de guardar
    this.closeModal(); // Cierra el modal después de guardar
  }

  deleteTask(id?: number) {
    if (id !== undefined) {
      // Lógica para eliminar la tarea
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks(); // O actualiza la lista de tareas de alguna otra manera
      });
    } else {
      console.warn("El ID de la tarea es indefinido. No se puede eliminar.");
    }
  }
  
}
