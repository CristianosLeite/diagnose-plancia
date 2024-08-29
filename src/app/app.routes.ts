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
      {
        path: 'users/create', component: UserCreateComponent
      },
      {
        path: 'users/edit', component: UserEditComponent
      },
    ]
  }
];
