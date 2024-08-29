import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent implements OnInit {
  @Input() task: any;
  @Output() close = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<any>();

  editTaskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService ) {
    this.editTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.task) {
      this.patchFormValues(this.task);
    }
  }

  // Actualiza los valores del formulario basados en la tarea proporcionada
  private patchFormValues(task: any): void {
    const [date, time] = task.dueDate.split('T');
    this.editTaskForm.patchValue({
      title: task.title,
      description: task.description,
      date: date,
      time: time.slice(0, 5), // HH:mm
    });
  }

  // Cierra el modal
  closeModal(): void {
    this.close.emit();
  }

  // Emite el evento de guardar tarea actualizada
  onSubmit(): void {
    if (this.editTaskForm.valid) {
      const updatedTask = {
        ...this.task,
        title: this.editTaskForm.value.title,
        description: this.editTaskForm.value.description,
        dueDate: `${this.editTaskForm.value.date}T${this.editTaskForm.value.time}:00`
      };
      this.taskUpdated.emit(updatedTask);
      this.closeModal();
    }
  }
}
