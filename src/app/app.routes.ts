import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ActivityTableComponent } from './components/activity/activity-table/activity-table.component';
import { ActivityCreateComponent } from './components/activity/activity-create/activity-create.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { HistoryComponent } from './components/history/history.component';

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
      // Users routes
      {
        path: 'users/create', component: UserCreateComponent
      },
      {
        path: 'users/edit', component: UserEditComponent
      },
      {
        path: 'history', component: HistoryComponent
      },
      // Users api routes
      {
        path: 'api/users/create', redirectTo: 'user'
      },
      {
        path: 'api/users/one', redirectTo: 'user'
      },
      {
        path: 'api/users/all', redirectTo: 'user'
      },
      {
        path: 'api/users/update', redirectTo: 'user'
      },
      {
        path: 'api/users/delete', redirectTo: 'user'
      },
      // Activities api routes
      {
        path: 'api/activities/create', redirectTo: 'activity'
      },
      {
        path: 'api/activities/one', redirectTo: 'activity'
      },
      {
        path: 'api/activities/all', redirectTo: 'activity'
      },
      {
        path: 'api/activities/update', redirectTo: 'activity'
      },
      {
        path: 'api/activities/delete', redirectTo: 'activity'
      },
      // Checklists api routes
      {
        path: 'api/cheklists/create', redirectTo: 'checklist'
      },
      {
        path: 'api/cheklists/one', redirectTo: 'checklist'
      },
      {
        path: 'api/cheklists/all', redirectTo: 'checklist'
      },
      {
        path: 'api/cheklists/update', redirectTo: 'checklist'
      },
      {
        path: 'api/cheklists/delete', redirectTo: 'checklist'
      }
    ]
  }
];
