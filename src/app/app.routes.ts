import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', component:  TodoListComponent},
          { path: 'Add-Task', component: TaskFormComponent },
          { path: 'Todo-List', component: TodoListComponent}
          // Otras rutas...
        ]
      }
];
