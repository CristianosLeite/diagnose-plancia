import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Checklist } from '../../interfaces/checklist.interface';
import { ChecklistService } from '../../services/checklist/checklist.service';
import { ActivityService } from '../../services/activity/activity.service';
import { UserService } from '../../services/user/user.service';
import { TimeDateService } from '../../services/time-date/time-date.service';
import { from } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActionDialogComponent } from '../modal/action-dialog/action-dialog.component';
import { Activity } from '../../interfaces/activity.interface';
import { Observable } from 'rxjs';
import { FilterComponent } from '../filter/filter.component';
import { HistoryData } from '../../interfaces/history.interface';
import { ReportService } from '../../services/report/report.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    FilterComponent
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  @Input() ELEMENT_DATA = [] as HistoryData[];
  displayedColumns: string[] = ['checklist_id', 'username', 'activity', 'status', 'estimatedTime', 'timeSpent', 'createdAt', 'activityTime'];
  dataSource = new MatTableDataSource<HistoryData>(this.ELEMENT_DATA);
  startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7);
  endDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  constructor(
    private checklistService: ChecklistService,
    private activityService: ActivityService,
    private userService: UserService,
    private reportService: ReportService,
    public timeDateService: TimeDateService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.retriveAllChecklists().subscribe({
      next: (data: HistoryData[]) => {
        this.ELEMENT_DATA = data;
        this.reportService.setHistoryData(this.ELEMENT_DATA);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadHistoryData(): void {
    this.dataSource.data = [];
    this.ELEMENT_DATA = [];

    this.retriveAllChecklists().subscribe({
      next: (historyData) => {
        this.ELEMENT_DATA = historyData.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.dataSource.data = this.ELEMENT_DATA;
        this.reportService.setHistoryData(this.ELEMENT_DATA);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  private retriveAllChecklists(): Observable<HistoryData[]> {
    if (!this.startDate || !this.endDate) return new Observable<HistoryData[]>();

    const data = async (): Promise<HistoryData[]> => {
      const checklists = await this.checklistService.retrieveAllChecklists(this.startDate.toISOString(), this.endDate.toISOString()).then(
        (checklists: Checklist[]) => {
          const requests = checklists.map(async (checklist) => {
            const user = await this.userService.retrieveUser(checklist.user_id);
            if (!user) return {} as HistoryData;
            const activity = await this.activityService.retrieveActivity(checklist.activity_id.toString());
            return {
              checklist_id: checklist.checklist_id,
              username: user.name,
              activity: activity.description,
              estimatedTime: activity.estimated_time,
              timeSpent: checklist.time_spent,
              status: checklist.status,
              createdAt: checklist.createdAt,
              activityTime: this.timeDateService.getTimeLocaleString(new Date(checklist.createdAt)),
              actionPlan: checklist.action_plan
            };
          });
          return Promise.all(requests);
        }
      );
      return checklists;
    };

    return from(data());
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

  setStartDate(date: Date): void {
    this.startDate = date;
    this.loadHistoryData();
  }

  setEndDate(date: Date): void {
    this.endDate = date;
    this.loadHistoryData();
  }
}
