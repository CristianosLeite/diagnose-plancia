import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ShiftWork } from '../interfaces/user.interface';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false;
  authnticatedUser = '';

  constructor(private userService: UserService) { }

  authenticate(badgeNumber: number, shiftWork: ShiftWork): Observable<boolean> {
    return this.userService.getUserByBadgeNumber(badgeNumber).pipe(
      switchMap(user => {
        if (!user) {
          return of(false);
        }

        user.shift_work = shiftWork;
        return of(true);
      }),
      catchError(error => {
        console.error('Error during authentication:', error);
        return of(false);
      })
    );
  }
}
