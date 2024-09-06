import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { User, Shift } from '../../../interfaces/user.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatInputModule,
    NgFor,
    MatSelect,
    MatOption,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user: User = {} as User;

  constructor(public dialogRef: MatDialogRef<LoginComponent>) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      // Simular autenticação
      console.log('Matrícula:', this.user.user_id, 'Turno:', this.user.shift);
      this.dialogRef.close(true); // Fecha o modal após login bem-sucedido
    } else {
      console.log('Formulário inválido');
    }
  }

  // Ação ao cancelar o login
  onCancel(): void {
    this.dialogRef.close(false);
  }

  validateNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (event instanceof KeyboardEvent) {
      const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'Tab',
      ];

      if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
        event.preventDefault();
      }
    } else {
      // Remove caracteres inválidos se o evento não for KeyboardEvent (por exemplo, input event)
      input.value = input.value.replace(/[^0-9]/g, '');
    }
  }
}
