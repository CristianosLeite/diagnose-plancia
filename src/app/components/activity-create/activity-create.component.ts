import { Component, ChangeDetectorRef, Input, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, NgForm } from '@angular/forms';
import { Activity } from '../../interfaces/activity.interface';
import { NgFor, NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UploadService } from '../../services/upload.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-create',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    NgFor,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './activity-create.component.html',
  styleUrl: './activity-create.component.scss',
})
export class ActivityCreateComponent implements OnInit {
  @Input() activity: Activity = {
    ...({} as Activity),
    context: 'create',
  };
  @Input() filePath: SafeResourceUrl | undefined;
  fileName = '';

  constructor(
    private sanitizer: DomSanitizer,
    private uploadService: UploadService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const activityData = params.get('element');
      const context = params.get('context');

      if (activityData) {
        this.activity = JSON.parse(activityData);
      }

      if (context) {
        this.activity.context = context as 'create' | 'edit';
      }
    });
  }

  ngOnInit(): void {
    if (this.activity.sop) {
      this.filePath = this.sanitizer.bypassSecurityTrustResourceUrl(this.activity.sop);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileName = file.name;

      this.uploadService.uploadFile(file).subscribe((response) => {
        console.log('Upload bem-sucedido:', response.fileName);
        this.cdr.detectChanges();
        this.activity.sop = response.filePath;
        this.filePath = this.sanitizer.bypassSecurityTrustResourceUrl(response.filePath);
      });
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }
  }

  handleDayOfWeek(day: string): string {
    if (day === 'Sunday') return 'Domingo';
    if (day === 'Monday') return 'Segunda-feira';
    if (day === 'Tuesday') return 'Terça-feira';
    if (day === 'Wednesday') return 'Quarta-feira';
    if (day === 'Thursday') return 'Quinta-feira';
    if (day === 'Friday') return 'Sexta-feira';
    if (day === 'Saturday') return 'Sábado';
    return '';
  }

  validateNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (event instanceof KeyboardEvent) {
      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

      if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
        event.preventDefault();
      }
    } else {
      // Remove caracteres inválidos se o evento não for KeyboardEvent (por exemplo, input event)
      input.value = input.value.replace(/[^0-9]/g, '');
    }
  }
}
