import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Checklist } from '../../interfaces/checklist.interface';
import { ChecklistService } from '../../services/checklist.service';
import { ActivityService } from '../../services/activity.service';
import { UserService } from '../../services/user.service';
import { TimeDateService } from '../../services/time-date.service';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Interval } from '../../interfaces/activity.interface';
import { MatDialog } from '@angular/material/dialog';
import { ActionDialogComponent } from '../modal/action-dialog/action-dialog.component';
import { Activity } from '../../interfaces/activity.interface';

export type HistoryData = {
  checklist_id: number;
  username: string;
  activity: string;
  estimatedTime: Interval;
  timeSpent: string;
  status: string;
  createdAt: string;
  activityTime: string;
  actionPlan: string;
};

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  @Input() ELEMENT_DATA = [] as HistoryData[];
  displayedColumns: string[] = ['checklist_id', 'username', 'activity', 'status', 'estimatedTime', 'timeSpent', 'createdAt', 'activityTime'];
  dataSource = new MatTableDataSource<HistoryData>(this.ELEMENT_DATA);

  constructor(
    private checklistService: ChecklistService,
    private activityService: ActivityService,
    private userService: UserService,
    public timeDateService: TimeDateService,
    public dialog: MatDialog
  ) {
    this.checklistService.retrieveAllChecklists().pipe(
      mergeMap((data: Checklist[]) => {
        const requests = data.map(checklist =>
          forkJoin({
            user: this.userService.retrieveUser(checklist.user_id),
            activity: this.activityService.retrieveActivity(checklist.activity_id.toString())
          }).pipe(
            map(({ user, activity }) => ({
              checklist_id: checklist.checklist_id,
              username: user.name,
              activity: activity.description,
              estimatedTime: activity.estimated_time,
              timeSpent: checklist.time_spent,
              status: checklist.status,
              createdAt: checklist.createdAt,
              activityTime: this.timeDateService.getTimeLocaleString(new Date(checklist.createdAt)),
              actionPlan: checklist.action_plan
            }))
          )
        );
        return forkJoin(requests);
      })
    ).subscribe({
      next: (historyData) => {
        this.ELEMENT_DATA = historyData.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.dataSource.data = this.ELEMENT_DATA;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  openActionPlan(actionPlan: string, activityDescription: string): void {
    const activity = {} as Activity;
    activity.description = activityDescription;
    activity.action_plan = actionPlan;
    activity.context = 'history';

    this.dialog.open(ActionDialogComponent, {
      width: '500px',
      data: activity
    });
  }
}
