import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Activity } from '../../interfaces/activity.interface';
import { MatIconButton } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivityDialogComponent } from '../modal/activity-dialog/activity-dialog.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { SopModalComponent } from '../modal/sop-modal/sop-modal.component';
import { PopupConfirmationComponent } from '../modal/popup-confirmation/popup-confirmation.component';

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
export class MainComponent {
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
    this.activityService.sopSolicitation.subscribe(activity => {
      this.openSopModal(activity);
    });
    this.activityService.activityConfirmed.subscribe(activity => {
      this.openPopupConfirmation(activity);
    });
  }

  openDialog(activity: Activity): boolean {
    this.dialog.open(ActivityDialogComponent, {
      width: '800px',
      data: activity
    });

    return false;
  }

  openSopModal(activity: Activity): boolean {
    this.dialog.open(SopModalComponent, {
      width: '1200px',
      data: activity
    });

    return false;
  }

  openPopupConfirmation(activity: Activity): boolean {
    this.dialog.open(PopupConfirmationComponent, {
      width: '400px',
      data: activity
    });
    return false;
  }
}
