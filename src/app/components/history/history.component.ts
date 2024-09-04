import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Checklist } from '../../interfaces/checklist.interface';
import { ChecklistService } from '../../services/checklist.service';
import { ActivityService } from '../../services/activity.service';
import { UserService } from '../../services/user.service';
import { TimeDateService } from '../../services/time-date.service';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export type HistoryData = {
  checklist_id: number;
  username: string;
  activity: string;
  time_spent: string;
};

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatTableModule,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  @Input() ELEMENT_DATA = [] as HistoryData[];
  displayedColumns: string[] = ['checklist_id', 'username', 'activity', 'timeSpent'];
  dataSource = new MatTableDataSource<HistoryData>(this.ELEMENT_DATA);

  constructor(
    private checklistService: ChecklistService,
    private activityService: ActivityService,
    private userService: UserService,
    public timeDateService: TimeDateService
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
              time_spent: checklist.time_spent
            }))
          )
        );
        return forkJoin(requests);
      })
    ).subscribe({
      next: (historyData) => {
        this.ELEMENT_DATA = historyData;
        this.dataSource.data = this.ELEMENT_DATA;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
