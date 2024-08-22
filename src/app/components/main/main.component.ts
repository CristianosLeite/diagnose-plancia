import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Activity } from '../../interfaces/activity.interface';
import { MatIconButton } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivityDialogComponent } from '../activity-dialog/activity-dialog.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconButton,
    MatSidenavModule,
    MatFormField,
    FormsModule,
    NgIf,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnChanges {
  @Input() activity = {} as Activity;

  expandedUser = false;
  expandedActivity = false;
  expandedHistory = false;

  constructor(
    public dialog: MatDialog,
    private activityService: ActivityService
  ) {
    this.activityService.selectionChanged.subscribe(activity => {
      this.openDialog(activity);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activity'].currentValue) {
      this.activity = changes['activity'].currentValue;
      this.openDialog(this.activity);
    }
  }

  openDialog(activity: Activity): boolean {
    const dialogRef = this.dialog.open(ActivityDialogComponent, {
      width: '800px',
      data: activity
    });

    dialogRef.afterClosed().subscribe(result => {
      this.activity.origin = result;
    });

    return false;
  }
}
