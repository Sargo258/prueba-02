import { Component, OnInit, computed } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TaskDetailModalComponent, EditModalComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  tasks = computed(() => this.taskService.getTasks());
  selectedTask: any = null;
  isEditModalOpen: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  viewTaskDetails(task: any) {
    this.selectedTask = { ...task };
    this.isEditModalOpen = false;
  }

  openEditModal(task: any) {
    this.selectedTask = { ...task };
    this.isEditModalOpen = true;
  }

  closeModal() {
    this.selectedTask = null;
    this.isEditModalOpen = false;
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
  }

  onTaskUpdated(updatedTask: any) {
    this.taskService.updateTask(updatedTask);
    this.closeModal();
  }
}