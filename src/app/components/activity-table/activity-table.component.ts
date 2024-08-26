import { Component, ViewChild, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Activity } from '../../interfaces/activity.interface';
import { ActivityService } from '../../services/activity.service';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule, MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-activity-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatIconButton,
    MatMenuModule,
  ],
  providers: [MatMenuTrigger],
  templateUrl: './activity-table.component.html',
  styleUrl: './activity-table.component.scss'
})
export class ActivityTableComponent {
  ELEMENT_DATA = this.activityService.ELEMENT_DATA;
  displayedColumns: string[] = ['id', 'point', 'description', 'sop', 'estimatedTime', 'frequency', 'select', 'options'];
  dataSource = new MatTableDataSource<Partial<Activity>>(this.ELEMENT_DATA);
  selection = new SelectionModel<Partial<Activity>>(true, []);

  constructor(private activityService: ActivityService) {}

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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onCheckboxChange(event: any, row: Activity) {
    if (event.checked) {
      this.activityService.selectionChanged.emit(row);
    }
    this.selection.toggle(row);
  }

  formatTime(hours: number, minutes: number, seconds: number): string {
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  showSop(event: any, row: Activity) {
    event.stopPropagation();
    alert(row.sop);
  }

  showOptions(event: any, row: Activity) {
    event.stopPropagation();
  }

  editActivity(event: any, row: Activity) {
    event.stopPropagation();
    alert('Edit');
  }

  deleteActivity(event: any, row: Activity) {
    event.stopPropagation();
    alert('Delete');
  }
}
