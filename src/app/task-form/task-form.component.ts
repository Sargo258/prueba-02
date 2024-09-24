import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';
import { Task } from '../shared/components/models/task.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ConfirmationModalComponent],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null; // Si la tarea es nula, el formulario será para crear una nueva tarea
  @Output() close = new EventEmitter<void>();
  @Output() taskSaved = new EventEmitter<Task>(); // Emite un Task
  taskForm: FormGroup;
  isEditMode: boolean = false; // Determina si estamos en modo edición o no
  showModal: boolean = false;
  taskClasses: { value: string; label: string }[] = [];

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      class: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener los tipos de clases de tareas desde el backend
    this.taskService.getTaskClasses().subscribe(classes => {
      this.taskClasses = classes;
    });

    // Si se pasa una tarea por Input, estamos en modo edición
    if (this.task) {
      this.isEditMode = true;
      this.patchFormValues(this.task);
    }
  }

  patchFormValues(task: Task): void {
    const [date, time] = task.dueDate.split('T');
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      date: date,
      time: time.slice(0, 5), // HH:mm
      class: task.class
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData: Task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: `${this.taskForm.value.date}T${this.taskForm.value.time}:00`,
        class: this.taskForm.value.class,
      };
      console.log('Task data to be sent:', taskData);
  
      if (this.isEditMode && this.task) {
        // Si es edición, actualizamos la tarea
        const updatedTask = { ...this.task, ...taskData };
        this.taskService.updateTask(updatedTask).subscribe(() => {
          this.showModal = true;
          this.taskSaved.emit(updatedTask); // Emitir la tarea actualizada
        });
      } else {
        // Si no es edición, añadimos una nueva tarea
        this.taskService.saveTask(taskData).subscribe(() => {
          this.showModal = true;
          this.taskSaved.emit(taskData); // Emitir la nueva tarea
        });
      }
    }
  }
  


  closeModal() {
    this.close.emit();
    this.showModal = false;
    this.router.navigate(['/Todo-List']);
  }
}
