import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ActivityTableComponent } from './components/activity-table/activity-table.component';
import { ActivityCreateComponent } from './components/activity-create/activity-create.component';

export const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'checklist', component: ActivityTableComponent
      },
      {
        path: 'activity', component: ActivityCreateComponent
      },
      {
        path: 'api/users/create'
      },
      {
        path: 'api/users/one'
      },
      {
        path: 'api/users/all'
      },
      {
        path: 'api/users/update'
      },
      {
        path: 'api/users/delete'
      }
    ]
  }
];
