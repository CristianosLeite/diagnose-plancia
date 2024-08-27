import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Activity } from '../../../interfaces/activity.interface';
import { ActivityDialogComponent } from '../activity-dialog/activity-dialog.component';

@Component({
  selector: 'app-action-dialog',
  standalone: true,
  imports: [
    MatLabel,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './action-dialog.component.html',
  styleUrl: './action-dialog.component.scss'
})
export class ActionDialogComponent {
  activity = {} as Activity;
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<ActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Activity) {}

  onCancelClick(): void {
    this.dialogRef.close();
    this.onCancel.emit();
  }

  onConfirmClick(): void {
    this.dialogRef.close();
    this.onConfirm.emit();
  }
}
