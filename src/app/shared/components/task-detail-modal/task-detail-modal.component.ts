import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail-modal',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './task-detail-modal.component.html',
  styleUrl: './task-detail-modal.component.css'
})
export class TaskDetailModalComponent {

  @Input() task: any; // Recibe la tarea a mostrar
  @Output() close = new EventEmitter<void>(); // Emite un evento para cerrar el modal

  closeModal() {
    console.log('Task received:', this.task);
    this.close.emit(); // Emite el evento para cerrar el modal
  }

}
