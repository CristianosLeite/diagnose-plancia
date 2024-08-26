import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Activity } from '../../../interfaces/activity.interface';
import { MatSelectModule } from '@angular/material/select';
import { MainComponent } from '../../main/main.component';
import { MatDialog } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-activity-dialog',
  standalone: true,
  imports: [
    MatLabel,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    NgFor
  ],
  templateUrl: './activity-dialog.component.html',
  styleUrl: './activity-dialog.component.scss'
})
export class ActivityDialogComponent implements OnDestroy {
  activity = {} as Activity;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Activity,
    private activityService: ActivityService
  ) {
    this.activity = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.activityService.activityCanceled.emit(this.activity);
  }

  openDialog(event: MatSlideToggleChange, activity: Activity): boolean {
    if (event.checked) {
      activity.status = 'OK';
      return false;
    }
    const dialogRef = this.dialog.open(ActionDialogComponent, {
      width: '400px',
      data: activity
    });

    dialogRef.afterClosed().subscribe(result => {
      this.activity.origin = result;
    });

    activity.status = 'KO';
    return false;
  }

  showSop(event: any, row: Activity) {
    event.stopPropagation();
    this.activityService.sopSolicitation.emit(row);
  }

  ngOnDestroy(): void {
    this.activityService.activityCanceled.emit(this.activity);
  }
}
