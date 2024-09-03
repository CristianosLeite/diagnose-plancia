
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
import { UserService } from '../../../services/user.service';
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
    skills: []
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

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  addSkill(skill: Skills) {
    if (this.user.skills && !this.user.skills.includes(skill)) {
      this.user.skills.push(skill);
    }
  }

  removeSkill(index: number) {
    if (this.user.skills) {
      this.user.skills.splice(index, 1);
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

  onSubmit(form: NgForm) {
    if (form.invalid) {
      // Marcar todos os controles como tocados para exibir mensagens de erro
      Object.keys(form.controls).forEach(field => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.userService.createUser(this.user).subscribe(() => {
      console.log('User created');
    });
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
}
