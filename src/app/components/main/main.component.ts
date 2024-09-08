import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Activity } from '../../interfaces/activity.interface';
import { MatIconButton } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivityDialogComponent } from '../modal/activity-dialog/activity-dialog.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { SopModalComponent } from '../modal/sop-modal/sop-modal.component';
import { PopupConfirmationComponent } from '../modal/popup-confirmation/popup-confirmation.component';
import { ChecklistService } from '../../services/checklist.service';
import { TimeDateService } from '../../services/time-date.service';
import { Interval } from '../../interfaces/activity.interface';
import { Checklist } from '../../interfaces/checklist.interface';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';

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
  authenticatedUser = {} as User;
  expandedUser = false;
  expandedActivity = false;
  expandedHistory = false;
  isReportActive = false;

  constructor(
    public dialog: MatDialog,
    private activityService: ActivityService,
    private checklistService: ChecklistService,
    private timeDateService: TimeDateService,
    private auth: AuthService,
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
    this.auth.userChanged.subscribe(user => {
      this.authenticatedUser = user;
    });
  }

  openDialog(activity: Activity): boolean {
    this.dialog.open(ActivityDialogComponent, {
      width: '600px',
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

  private setChecklist(activity: Activity): Partial<Checklist> {
    return {
      activity_id: activity.activity_id,
      time_spent: this.timeDateService.formatISO8601(activity.time_spent),
      status: activity.status,
      action_plan: activity.action_plan,
      user_id: "532d1758-0fb2-46b4-90c7-fdfc62adcbca"
    };
  }

  private submit(
    activity: Activity,
    dialogRef: MatDialogRef<PopupConfirmationComponent, any>
  ): void {
    activity.last_checked = this.timeDateService
      .getLocaleIsoString();
    const checklist = this.setChecklist(activity);
    this.checklistService.createChecklist(checklist)
      .subscribe((checklist) => {
        checklist.time_spent = this.timeDateService
          .formatISO8601(checklist.time_spent as unknown as Interval);
        this.activityService.updateActivity(activity).subscribe(() => {
          this.checklistService.updateChecklist(checklist).subscribe(() => {
            this.activityService.retrieveAllActivities();
            dialogRef.close();
          });
        });
      });
  }

  openPopupConfirmation(activity: Activity): boolean {
    const dialogRef = this.dialog.open(PopupConfirmationComponent, {
      width: '400px',
      data: activity
    });

    const onCancelSubscription = dialogRef.componentInstance.onCancel.subscribe(() => {
      this.openDialog(activity);
      onCancelSubscription.unsubscribe();
    });

    const onConfirmSubscription = dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.submit(activity, dialogRef);
      onConfirmSubscription.unsubscribe();
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

  checkPermissionFor(action: string): boolean {
    return this.authenticatedUser.permissions.some(permission => permission.includes(action));
  }
}
