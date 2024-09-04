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
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { SopModalComponent } from '../modal/sop-modal/sop-modal.component';
import { PopupConfirmationComponent } from '../modal/popup-confirmation/popup-confirmation.component';
import { ChecklistService } from '../../services/checklist.service';
import { TimeDateService } from '../../services/time-date.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
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
  isReportActive = false;

  constructor(
    public dialog: MatDialog,
    private activityService: ActivityService,
    private checklistService: ChecklistService,
    private timeDateService: TimeDateService
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
    const dialogRef = this.dialog.open(PopupConfirmationComponent, {
      width: '400px',
      data: activity
    });

    dialogRef.componentInstance.onCancel.subscribe(() => {
      this.openDialog(activity);
    });

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      activity.last_checked = new Date().toISOString();
      this.checklistService.createChecklist({
        activity_id: activity.activity_id,
        time_spent: this.timeDateService.formatISO8601(activity.time_spent),
        user_id: "532d1758-0fb2-46b4-90c7-fdfc62adcbca"
      }).subscribe((checklist) => {
        this.activityService.updateActivity(activity).subscribe(() => {
          this.checklistService.updateChecklist(checklist).subscribe(() => {
            this.activityService.retrieveAllActivities();
          });
        });
      });
    });

    return false;
  }

  private resetStates() {
    this.expandedActivity = false;
    this.expandedUser = false;
    this.expandedHistory = false;
    this.isReportActive = false;
  }

  toggleActivity() {
    this.expandedActivity = !this.expandedActivity;
    if (this.expandedActivity) {
      this.resetStates();
      this.expandedActivity = true;
    }
  }

  toggleUser() {
    this.expandedUser = !this.expandedUser;
    if (this.expandedUser) {
      this.resetStates();
      this.expandedUser = true;
    }
  }

  toggleHistory() {
    this.expandedHistory = !this.expandedHistory;
    if (this.expandedHistory) {
      this.resetStates();
      this.expandedHistory = true;
    }
  }

  activeReport() {
    this.resetStates();
    this.isReportActive = true;
    this.notImplemented();
  }

  notImplemented() {
    alert('função não implementada');
  }
}
