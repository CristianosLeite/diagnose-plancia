import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ShiftWork } from '../interfaces/user.interface';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../components/auth/auth.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false;
  authnticatedUser = '';

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  openLoginDialog(): void {
    this.dialog.open(AuthComponent, {
      width: '400px',
      disableClose: true
    });
  }

  authenticate(badgeNumber: number, shiftWork: ShiftWork): Observable<boolean> {
    return this.userService.getUserByBadgeNumber(badgeNumber).pipe(
      switchMap(user => {
        if (!user) {
          return of(false);
        }

        user.shift_work = shiftWork;
        this.authnticatedUser = user.user_id;
        return of(true);
      }),
      catchError(error => {
        console.error('Error during authentication:', error);
        return of(false);
      })
    );
  }

  checkPermission(permissions: string[], requestedPermission: string): boolean {
    return permissions.includes(requestedPermission);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredPermission = route.data['permission'];
    if (!requiredPermission) {
      return of(false);
    }
    return this.userService.retrieveUser(this.authnticatedUser).pipe(
      switchMap(user => {
        if (!user.permissions) {
          this.router.navigate(['/not-authenticated']);
          return of(false);
        }

        console.log('Checking permission:', requiredPermission);
        console.log('User permissions:', user.permissions);
        return of(this.checkPermission(user.permissions, requiredPermission));
      }),
      catchError(error => {
        console.error('Error during permission check:', error);
        return of(false);
      })
    );
  }
}
