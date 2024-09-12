import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { Activity } from '../../../interfaces/activity.interface';
import { ActivityService } from '../../../services/activity/activity.service';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { TimeDateService } from '../../../services/time-date/time-date.service';
import { ChecklistService } from '../../../services/checklist/checklist.service';
import { AuthService } from '../../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupConfirmationComponent } from '../../modal/popup-confirmation/popup-confirmation.component';

@Component({
  selector: 'app-activity-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatIconButton,
    MatMenuModule,
    RouterLink
  ],
  providers: [MatMenuTrigger],
  templateUrl: './activity-table.component.html',
  styleUrl: './activity-table.component.scss'
})
export class ActivityTableComponent implements OnInit {
  loggedUser = this.auth.loggedUser;
  ELEMENT_DATA = this.activityService.ELEMENT_DATA;
  displayedColumns: string[] = ['id', 'point', 'description', 'sop', 'estimatedTime', 'frequency'];
  @Input() dataSource = new MatTableDataSource<Partial<Activity>>(this.ELEMENT_DATA);
  @Input() selection = new SelectionModel<Partial<Activity>>(true, []);
  @Input() context = 'activity';

  constructor(
    public timeDateService: TimeDateService,
    public dialog: MatDialog,
    private activityService: ActivityService,
    private checklistService: ChecklistService,
    private auth: AuthService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.activityService.activityCanceled.subscribe((activity: Partial<Activity>) => {
      this.selection.deselect(activity);
    });
    this.auth.userChanged.subscribe((user) => {
      this.loggedUser = user;
    });
    this.activityService.activitiesChanged.subscribe((data: Activity[]) => {
      this.dataSource = new MatTableDataSource<Partial<Activity>>(data);
      this.ELEMENT_DATA = data;
    });
    this.checklistService.checklistChanged.subscribe((data: Activity[]) => {
      this.ELEMENT_DATA = data;
      this.filterActivities(data);
      this.cdr.detectChanges();
    });
    this.ActivatedRoute.params.subscribe((params) => {
      this.context = params['context'];
      this.fetchDataSource();
    });
  }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  private fetchDataSource() {
    if (this.context === 'activity') {
      this.displayedColumns = ['id', 'point', 'description', 'sop', 'options'];
      this.activityService.retrieveAllActivities();
    } else if (this.context === 'checklist') {
      this.displayedColumns = ['id', 'point', 'description', 'sop', 'estimatedTime', 'frequency', 'select'];
      this.checklistService.retrievePendingChecklist(this.loggedUser.shift_work);
    }
  }

  private filterActivities(data: Activity[]) {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const todayWeekday = today.toLocaleString('en-US', { weekday: 'long' });
    this.ELEMENT_DATA = data.filter((activity: Activity) => {
      switch (activity.frequency) {
        case 'Daily':
          return true;
        case 'Weekly':
          return activity.day_to_check === todayWeekday;
        case 'Monthly':
          return new Date(activity.date).getDate() === todayDay;
        case 'Yearly':
          const activityDate = new Date(activity.day_to_check);
          return activityDate.getDate() === todayDay && activityDate.getMonth() === todayMonth;
        default:
          return false;
      }
    });
    this.dataSource = new MatTableDataSource<Partial<Activity>>(this.ELEMENT_DATA);
    this.cdr.detectChanges();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Activity): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.activity_id + 1}`;
  }

  onCheckboxChange(event: any, row: Activity) {
    if (event.checked) {
      this.activityService.selectionChanged.emit(row);
    }
    this.selection.toggle(row);
  }

  showSop(event: any, row: Activity) {
    event.stopPropagation();
    this.activityService.sopSolicitation.emit(row);
  }

  activityEdit(event: Event, row: Activity) {
    event.stopPropagation();
    this.router.navigate(['/activity',
      { element: JSON.stringify(row), context: 'edit' }
    ]);
  }

  private deleteActivity(activity: Activity) {
    this.activityService.deleteActivity(activity.activity_id.toString()).subscribe(() => {
      this.activityService.retrieveAllActivities();
    });
  }

  openPopupConfirmation(event: any, activity: Activity): boolean {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PopupConfirmationComponent, {
      width: '400px',
      data: {
        activity,
        title: 'Confirmar exclusão',
        message: 'Deseja excluir a atividade?'
      }
    });

    const onCancelSubscription = dialogRef.componentInstance.onCancel.subscribe(() => {
      dialogRef.close();
      onCancelSubscription.unsubscribe();
    });

    const onConfirmSubscription = dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.deleteActivity(activity);
      onConfirmSubscription.unsubscribe();
    });

    return false;
  }

  handleFrequency(frequency: string): string {
    const frequencies: { [key: string]: string } = {
      'Daily': 'Diária',
      'Weekly': 'Semanal',
      'Monthly': 'Mensal',
      'Yearly': 'Anual',
      'Other': 'Outra'
    };
    return frequencies[frequency] || '';
  }
}
