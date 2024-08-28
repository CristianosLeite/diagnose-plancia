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
        path: 'create-activity', component: ActivityCreateComponent
      },
    ]
  }
];
