import { SnackbarService } from '../../../services/snack-bar.service';
import { Component, ChangeDetectorRef, Input, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatFormField,
  MatLabel,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, NgForm } from '@angular/forms';
import { Activity } from '../../../interfaces/activity.interface';
import { NgFor, NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UploadService } from '../../../services/upload.service';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../../../services/activity.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TimeDateService } from '../../../services/time-date.service';
import { Interval } from '../../../interfaces/activity.interface';

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
    MatSnackBarModule,
  ],
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss'],
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
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private timeDateService: TimeDateService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.activity = {
        ...this.activity,
        ...JSON.parse(params.get('element') || '{}'),
        context: params.get('context') as 'create' | 'edit',
      };
      if (this.activity.sop) {
        this.filePath = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.activity.sop
        );
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const file = input.files[0];
      this.fileName = file.name;

      this.uploadService.uploadFile(file).subscribe((response) => {
        this.activity.sop = response.filePath;
        this.filePath = this.sanitizer.bypassSecurityTrustResourceUrl(
          response.filePath
        );
        this.cdr.detectChanges();
      });
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      Object.keys(form.controls).forEach((field) => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      this.snackbarService.openSnackBar('register_error');
      return;
    }

    this.activity.created_by = "532d1758-0fb2-46b4-90c7-fdfc62adcbca";
    this.activity.estimated_time = this.timeDateService
      .formatISO8601(this.activity.estimated_time) as unknown as Interval;
    if (this.activity.context === 'create') {
      this.snackbarService.openSnackBar('activity_edit_success');
      this.activityService.createActivity(this.activity).subscribe(() => {
        this.activityService.retrieveAllActivities();
      });
    } else {
      this.snackbarService.openSnackBar('register_success');
      this.activityService.updateActivity(this.activity).subscribe(() => {
        this.activityService.retrieveAllActivities();
      });
    }

    form.resetForm();
  }

  handleCILR(character: string): string {
    const cilr: { [key: string]: string } = {
      'C': 'Ciclo Limpeza',
      'I': 'Inspeção',
      'L': 'Lubrifcação',
      'R': 'Reaperto',
    };
    return cilr[character] || '';
  }

  handleDayOfWeek(day: string): string {
    const days: { [key: string]: string } = {
      Sunday: 'Domingo',
      Monday: 'Segunda-feira',
      Tuesday: 'Terça-feira',
      Wednesday: 'Quarta-feira',
      Thursday: 'Quinta-feira',
      Friday: 'Sexta-feira',
      Saturday: 'Sábado',
    };
    return days[day] || '';
  }

  handleFrequency(frequency: string): string {
    const frequencies: { [key: string]: string } = {
      'Daily': 'Diária',
      'Weekly': 'Semanal',
      'Monthly': 'Mensal',
      'Yearly': 'Anual',
      'Other': 'Outra'
    };
    return frequencies[frequency] || '';
  }

  validateNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (event instanceof KeyboardEvent) {
      if (
        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(
          event.key
        ) &&
        !/^\d$/.test(event.key)
      ) {
        event.preventDefault();
      }
    } else {
      input.value = input.value.replace(/[^0-9]/g, '');
    }
  }
}
