import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
  
      // Obtener las tareas almacenadas en el localStorage
      const storedTasks = localStorage.getItem('tasks');
  
      // Parsear las tareas si existen, o inicializar un array vacío si no hay tareas almacenadas
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
  
      // Añadir la nueva tarea al array de tareas
      tasks.push(newTask);
  
      // Guardar el array de tareas actualizado en el localStorage
      localStorage.setItem('tasks', JSON.stringify(tasks));
  
      console.log('Tarea guardada:', newTask);
  
      // Resetear el formulario después de guardar la tarea
      this.taskForm.reset();
    }
  }
  
}
