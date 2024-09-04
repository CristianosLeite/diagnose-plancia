import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_MESSAGES, snackbarMessage } from '../interfaces/snackbarMessage';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(context: keyof typeof SNACKBAR_MESSAGES): void {
    const config: snackbarMessage = SNACKBAR_MESSAGES[context];

    this.snackBar.open(config.message, config.actionText, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
