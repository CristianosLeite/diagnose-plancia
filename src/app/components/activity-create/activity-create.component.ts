import { Component, ChangeDetectorRef, Input, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Activity } from '../../interfaces/activity.interface';
import { NgFor, NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UploadService } from '../../services/upload.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../modal/snackbar/snackbar.component';

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
  @Input() activity: Activity = { context: 'create' } as Activity;
  @Input() filePath: SafeResourceUrl | undefined;
  fileName = '';

  constructor(
    private sanitizer: DomSanitizer,
    private uploadService: UploadService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.activity = {
        ...this.activity,
        ...JSON.parse(params.get('element') || '{}'),
        context: params.get('context') as 'create' | 'edit'
      };
      if (this.activity.sop) {
        this.filePath = this.sanitizer.bypassSecurityTrustResourceUrl(this.activity.sop);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const file = input.files[0];
      this.fileName = file.name;

      this.uploadService.uploadFile(file).subscribe(response => {
        this.activity.sop = response.filePath;
        this.filePath = this.sanitizer.bypassSecurityTrustResourceUrl(response.filePath);
        this.cdr.detectChanges();
      });
    }
  }

  isFormValid(): boolean {
    const { point, description, frequency, date } = this.activity;

    if (!point || !description || !frequency) {
      this.openSnackBar(false);
      return false;
    }

    if (['Anual', 'Mensal'].includes(frequency) && !date) {
      this.openSnackBar(false);
      return false;
    }

    return true;
  }

  handleDayOfWeek(day: string): string {
    const days: { [key: string]: string } = {
      'Sunday': 'Domingo',
      'Monday': 'Segunda-feira',
      'Tuesday': 'Terça-feira',
      'Wednesday': 'Quarta-feira',
      'Thursday': 'Quinta-feira',
      'Friday': 'Sexta-feira',
      'Saturday': 'Sábado',
    };
    return days[day] || '';
  }

  validateNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (event instanceof KeyboardEvent) {
      if (!['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key) && !/^\d$/.test(event.key)) {
        event.preventDefault();
      }
    } else {
      input.value = input.value.replace(/[^0-9]/g, '');
    }
  }

  openSnackBar(isSuccess: boolean) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: isSuccess ? 'Cadastro realizado com sucesso!' : 'Erro ao realizar o cadastro.',
        actionText: 'Fechar',
      },
      duration: 5000,
      panelClass: isSuccess ? 'success-snackbar' : 'error-snackbar',
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Dados enviados:', this.activity);
      this.openSnackBar(true);
    }
  }
}
