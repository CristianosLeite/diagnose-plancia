import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { Activity } from '../../../interfaces/activity.interface';
import { ActivityService } from '../../../services/activity.service';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { TimeDateService } from '../../../services/time-date.service';

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
  dataLength = 0;
  ELEMENT_DATA = this.activityService.ELEMENT_DATA;
  displayedColumns: string[] = ['id', 'point', 'description', 'sop', 'estimatedTime', 'frequency', 'select', 'options'];
  @Input() dataSource = new MatTableDataSource<Partial<Activity>>(this.ELEMENT_DATA);
  @Input() selection = new SelectionModel<Partial<Activity>>(true, []);
  @Input() activity = {} as Activity;

  constructor(
    private activityService: ActivityService,
    private router: Router,
    public timeDateService: TimeDateService,
    private cdr: ChangeDetectorRef
  ) {
    this.activityService.activityCanceled.subscribe((activity: Partial<Activity>) => {
      this.selection.deselect(activity);
    });
    this.activityService.activitiesChanged.subscribe((data: Activity[]) => {
      this.dataLength = data.length;
      const today = new Date();
      const todayDay = today.getDate();
      const todayMonth = today.getMonth();
      const todayWeekday = today.toLocaleString('en-US', { weekday: 'long' });

      // Filter activities that have already been checked today
      data = data.filter((activity: Activity) => new Date(activity.last_checked).getDate() !== todayDay);

      //Filter activities based on frequency
      data = data.filter((activity: Activity) => {
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

      this.dataSource = new MatTableDataSource<Partial<Activity>>(data);
      this.ELEMENT_DATA = data;
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.activityService.retrieveAllActivities();
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

  deleteActivity(event: any, row: Activity) {
    event.stopPropagation();
    alert('Delete');
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
