import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-popup-message',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './popup-message.component.html',
  styleUrl: './popup-message.component.scss'
})
export class PopupMessageComponent {
  public dialogRef: MatDialogRef<boolean> = {} as MatDialogRef<boolean>;
  @Input() title = 'Title';
  @Input() message = 'Message';
  @Output() onClick = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      message: string
    },
  ) {
    this.title = data.title
    this.message = data.message
  }

  onOkClick(): void {
    this.onClick.emit();
    this.dialogRef.close();
  }
}
