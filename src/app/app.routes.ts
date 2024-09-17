import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login', 
        pathMatch: 'full'     
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'Add-Task', component: TaskFormComponent },
            { path: 'Todo-List', component: TodoListComponent }
            // Otras rutas...
        ]
    }
];
