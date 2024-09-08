import { Injectable, Output, EventEmitter } from '@angular/core';
import { UserService } from './user.service';
import { ShiftWork, User } from '../interfaces/user.interface';
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
  authnticatedUser = '';
  @Output() authChanged: EventEmitter<boolean> = new EventEmitter();
  @Output() userChanged: EventEmitter<User> = new EventEmitter();

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
          this.authnticatedUser = '';
          this.authChanged.emit(false);
          this.userChanged.emit({} as User);
          return of(false);
        }

        user.shift_work = shiftWork;
        this.authnticatedUser = user.user_id;
        this.authChanged.emit(true);
        this.userChanged.emit(user);
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

        const hasPermission = of(this.checkPermission(user.permissions, requiredPermission));
        if (!hasPermission) {
          this.router.navigate(['/not-authenticated']);
        }

        return hasPermission;
      }),
      catchError(error => {
        console.error('Error during permission check:', error);
        return of(false);
      })
    );
  }
}
