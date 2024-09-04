import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
export class ActivityDialogComponent implements OnInit, OnDestroy {
  activity = {} as Activity;
  activityTimer: NodeJS.Timeout | undefined;
  toggleChecked = true;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Activity,
    private activityService: ActivityService
  ) {
    this.activity = data;
  }

  ngOnInit(): void {
    if (!this.activity.time_spent)
      this.activity.time_spent = { hours: 0, minutes: 0, seconds: 0 };
    this.timerStartCounting();
  }

  ngOnDestroy(): void {
    this.activityService.activityCanceled.emit(this.activity);
    clearInterval(this.activityTimer);
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.activityService.activityCanceled.emit(this.activity);
  }

  onConfirm(activity: Activity): void {
    this.activityService.activityConfirmed.emit(activity);
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
      if (result) {
        this.toggleChecked = result.confirmed;
        this.activity.action_plan = result.actionPlan;
      } else {
        this.toggleChecked = true;
      }
    });

    activity.status = 'KO';
    return false;
  }

  showSop(event: Event, row: Activity) {
    event.stopPropagation();
    this.activityService.sopSolicitation.emit(row);
  }

  timerStartCounting() {
    this.activityTimer = setInterval(() => {
      this.activity.time_spent.seconds++;
      if (this.activity.time_spent.seconds === 60) {
        this.activity.time_spent.seconds = 0;
        this.activity.time_spent.minutes++;
      }
      if (this.activity.time_spent.minutes === 60) {
        this.activity.time_spent.minutes = 0;
        this.activity.time_spent.hours++;
      }
    }, 1000);
  }

  formatTime(hours: number, minutes: number, seconds: number): string {
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
}
