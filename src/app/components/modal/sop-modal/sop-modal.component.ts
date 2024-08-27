import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity } from '../../../interfaces/activity.interface';
import { MainComponent } from '../../main/main.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../../services/pdf.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-sop-modal',
  standalone: true,
  imports: [
    MatLabel,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './sop-modal.component.html',
  styleUrl: './sop-modal.component.scss'
})
export class SopModalComponent implements OnInit{
  @Input() activity = {} as Activity;
  pdfData: SafeResourceUrl | null = null;

  constructor(
    public dialogRef: MatDialogRef<MainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Activity,
    private pdfService: PdfService,
    private sanitizer: DomSanitizer
  ) {
    this.activity = data;
  }

  async ngOnInit() {
    if (!this.activity.sop) {
      return;
    }
    this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(this.activity.sop);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
