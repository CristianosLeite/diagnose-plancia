import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ActivityTableComponent } from './components/activity/activity-table/activity-table.component';
import { ActivityCreateComponent } from './components/activity/activity-create/activity-create.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { HistoryComponent } from './components/history/history.component';
import { AuthService } from './services/auth/auth.service';
import { NotAuthenticatedComponent } from './components/not-authenticated/not-authenticated.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

export const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'not-authenticated', component: NotAuthenticatedComponent
      },
      {
        path: 'activity-table/:context', component: ActivityTableComponent,
        canActivate: [AuthService],
        data: { permission: 'create_checklist' },
      },
      {
        path: 'activity', component: ActivityCreateComponent,
        canActivate: [AuthService],
        data: { permission: 'create_activity' },
      },
      // Users routes
      {
        path: 'users', component: UserListComponent,
        canActivate: [AuthService],
        data: { permission: 'view_users' },
      },
      {
        path: 'users-create', component: UserCreateComponent,
        canActivate: [AuthService],
        data: { permission: 'create_users' },
      },
      {
        path: 'history', component: HistoryComponent,
        canActivate: [AuthService],
        data: { permission: 'view_history' },
      },
      // Users api routes
      {
        path: 'api/users-create', redirectTo: 'user'
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
        path: 'api/cheklists/create', redirectTo: 'activity-table'
      },
      {
        path: 'api/cheklists/one', redirectTo: 'activity-table'
      },
      {
        path: 'api/cheklists/all', redirectTo: 'activity-table'
      },
      {
        path: 'api/cheklists/update', redirectTo: 'activity-table'
      },
      {
        path: 'api/cheklists/delete', redirectTo: 'activity-table'
      }
    ]
  }
];
