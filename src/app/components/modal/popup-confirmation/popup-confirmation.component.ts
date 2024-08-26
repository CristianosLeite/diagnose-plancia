import { Component, Input, Output, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Activity } from '../../../interfaces/activity.interface';
import { ActivityDialogComponent } from '../activity-dialog/activity-dialog.component';

@Component({
  selector: 'app-popup-confirmation',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './popup-confirmation.component.html',
  styleUrl: './popup-confirmation.component.scss'
})
export class PopupConfirmationComponent {
  @Input() activity = {} as Activity;
  @Input() title = 'Confirmar atividade';
  @Input() message = 'Deseja confirmar a atividade?';
  @Output() onConfirm = new EventEmitter<Activity>();
  @Output() onCancel = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<ActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Activity,
  ) {
    this.activity = data;
  }

  onConfirmClick(): void {
    this.dialogRef.close();
    this.onConfirm.emit(this.activity);
  }

  onCancelClick(): void {
    this.dialogRef.close();
    this.onCancel.emit();
  }
}
