import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatFormField,
  MatLabel,
  MatFormFieldModule,
} from '@angular/material/form-field';
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
export class ActivityCreateComponent {
  element: Activity = {
    ...({} as Activity), // Inicializa o objeto sem valores definidos
    context: 'create', // Define o valor padrão para context
  };
  fileName: string = '';
  filePath: SafeResourceUrl | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private uploadService: UploadService,
    private route: ActivatedRoute
  ) {
    // Verifique se há dados passados pela rota
    this.route.paramMap.subscribe(params => {
      const activityData = params.get('element');
      const context = params.get('context');

      if (activityData) {
        this.element = JSON.parse(activityData);
      }

      if (context) {
        this.element.context = context as 'create' | 'edit';
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileName = file.name;

      this.uploadService.uploadFile(file).subscribe(() => {
        console.log('Upload bem-sucedido:', this.fileName);
        this.filePath = this.sanitizer.bypassSecurityTrustResourceUrl(
          'uploads/' + this.fileName
        );
      });
    }
  }

  onSubmit(): void {
    // Verifique se todos os campos obrigatórios estão preenchidos
    if (
      !this.element.point ||
      !this.element.description ||
      !this.element.frequency
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // validação adicional para data
    if (
      (this.element.frequency === 'Anual' ||
        this.element.frequency === 'Mensal') &&
      !this.element.date
    ) {
      alert('Por favor, escolha uma data.');
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
}
