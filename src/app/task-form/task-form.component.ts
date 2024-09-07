import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ConfirmationModalComponent],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  @Input() task: any = null; // Si la tarea es nula, el formulario será para crear una nueva tarea
  @Output() close = new EventEmitter<void>();
  taskForm: FormGroup;
  isEditMode: boolean = false; // Determina si estamos en modo edición o no
  showModal: boolean = false;

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Si se pasa una tarea por Input, estamos en modo edición
    if (this.task) {
      this.isEditMode = true;
      this.patchFormValues(this.task);
    }
  }

  patchFormValues(task: any): void {
    const [date, time] = task.dueDate.split('T');
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      date: date,
      time: time.slice(0, 5), // HH:mm
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: `${this.taskForm.value.date}T${this.taskForm.value.time}:00`
      };

      if (this.isEditMode) {
        // Si es edición, actualizamos la tarea
        const updatedTask = { ...this.task, ...taskData };
        this.taskService.updateTask(updatedTask);
      } else {
        // Si no es edición, añadimos una nueva tarea
        this.taskService.saveTask(taskData);
      }

      this.showModal = true;
    }
  }

  closeModal() {
    this.close.emit();
    this.showModal = false;
    this.router.navigate(['/Todo-List']);
  }
}


