import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TaskFormComponent } from './task-form/task-form.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          //{ path: '', component:  },
          { path: 'Add-Task', component: TaskFormComponent },
          // Otras rutas...
        ]
      }
];
