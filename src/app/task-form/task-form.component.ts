import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, ConfirmationModalComponent, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  taskForm: FormGroup;
  showModal: boolean = false;

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: new Date(`${this.taskForm.value.date}T${this.taskForm.value.time}`),
      };
      
      this.taskService.saveTask(newTask);

      console.log('Tarea guardada:', newTask);
      this.taskForm.reset();

      // Mostrar el modal de confirmación
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/Todo-List']);
  }
}
