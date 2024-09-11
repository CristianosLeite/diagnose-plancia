import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { User } from '../../interfaces/user.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from '../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-auth',
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
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  user: User = {} as User;

  constructor(
    public dialogRef: MatDialogRef<AuthComponent>,
    private auth: AuthService,
    private snackbarService: SnackbarService
  ) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.auth.authenticate(this.user.badge_number, this.user.shift_work).subscribe({
        next: (authenticated) => {
          if (authenticated) {
            this.snackbarService.openSnackBar('login_success');
            this.dialogRef.close(true);
          } else {
            this.snackbarService.openSnackBar('login_error');
          }
        }
      });
    }
  }

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
