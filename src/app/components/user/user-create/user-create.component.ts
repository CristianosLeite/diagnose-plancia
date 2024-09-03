import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { User, Skills } from '../../../interfaces/user.interface';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../modal/snackbar/snackbar.component';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    NgFor,
    NgIf,
    MatOption,
    MatSnackBarModule,
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  user: User = {
    ...({} as User),
    context: 'create',
    userSkills: [],
  };

  availableSkills: Skills[] = [
    'Talha',
    'Paleteira',
    'Empilhadeira',
    'NR12',
    'NR33',
    'Rebocador',
    'NR13',
    'NR35',
    'NR10',
    'NR20',
  ];

  constructor(private snackBar: MatSnackBar) {}

  addSkill(skill: Skills) {
    if (this.user.userSkills && !this.user.userSkills.includes(skill)) {
      this.user.userSkills.push(skill);
    }
  }

  removeSkill(index: number) {
    if (this.user.userSkills) {
      this.user.userSkills.splice(index, 1);
    }
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

  openSnackBar(isSuccess: boolean) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: isSuccess
          ? 'Cadastro realizado com sucesso!'
          : 'Erro ao realizar o cadastro.',
        actionText: 'Fechar',
      },
      duration: 5000,
      panelClass: isSuccess ? 'success-snackbar' : 'error-snackbar',
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  onSubmit() {
    const isFormValid = this.isFormValid();

    this.openSnackBar(isFormValid);
  }

  isFormValid(): boolean {
    return !!(
      this.user.name &&
      this.user.origin &&
      this.user.company &&
      this.user.id &&
      this.user.plant &&
      this.user.userSkills.length > 0
    );
  }
}
