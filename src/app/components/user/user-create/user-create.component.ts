import { Component, Input } from '@angular/core';
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
import { User, Permissions } from '../../../interfaces/user.interface';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user.service';
import { SnackbarService } from './../../../services/snack-bar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
  @Input() user: User = {
    ...({} as User),
    context: 'create',
    permissions: [],
  };

  permissions: Permissions[] = [
    'create_users',
    'edit_users',
    'view_users',
    'view_history',
    'create_checklist',
    'create_activity',
    'reports',
  ];

  constructor(
    private userService: UserService,
    private SnackbarService: SnackbarService
  ) {}

  addPermission(permition: Permissions) {
    if (this.user.permissions && !this.user.permissions.includes(permition)) {
      this.user.permissions.push(permition);
    }
  }

  removePermition(index: number) {
    if (this.user.permissions) {
      this.user.permissions.splice(index, 1);
    }
  }

  handlePermissions(value: string) {
    const permission: { [key: string]: string } = {
      'create_users': 'Cadastrar usuários',
      'view_users': 'Visualizar usuários',
      'edit_users': 'Editar usuários',
      'view_history': 'Visualizar histórico de atividades',
      'create_checklist': 'Realizar checklist',
      'create_activity': 'Cadastrar atividade',
      'reports': 'Exportar Relatórios',
    };

    return permission[value];
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
      Object.keys(form.controls).forEach(field => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      this.SnackbarService.openSnackBar('register_error');
      return;
    }
    this.SnackbarService.openSnackBar('register_success');
    this.userService.createUser(this.user).subscribe();
  }
}
