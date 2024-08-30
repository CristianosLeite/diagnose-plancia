import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ActivityTableComponent } from './components/activity-table/activity-table.component';
import { ActivityCreateComponent } from './components/activity-create/activity-create.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';

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
      // Users api routes
      // {
      //   path: 'api/users/create'
      // },
      // {
      //   path: 'api/users/one'
      // },
      // {
      //   path: 'api/users/all'
      // },
      // {
      //   path: 'api/users/update'
      // },
      // {
      //   path: 'api/users/delete'
      // },
      // // Activities api routes
      // {
      //   path: 'api/activities/create'
      // },
      // {
      //   path: 'api/activities/one'
      // },
      // {
      //   path: 'api/activities/all'
      // },
      // {
      //   path: 'api/activities/update'
      // },
      // {
      //   path: 'api/activities/delete'
      // },
      // // Checklists api routes
      // {
      //   path: 'api/cheklists/create'
      // },
      // {
      //   path: 'api/cheklists/one'
      // },
      // {
      //   path: 'api/cheklists/all'
      // },
      // {
      //   path: 'api/cheklists/update'
      // },
      // {
      //   path: 'api/cheklists/delete'
      // }
    ]
  }
];
