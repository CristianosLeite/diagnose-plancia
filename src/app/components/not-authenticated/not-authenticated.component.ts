import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-authenticated',
  standalone: true,
  imports: [],
  templateUrl: './not-authenticated.component.html',
  styleUrl: './not-authenticated.component.scss'
})
export class NotAuthenticatedComponent {

  constructor(private auth: AuthService, private router: Router) { }

  openLoginDialog(): void {
    this.auth.openLoginDialog();
    this.router.navigate(['/']);
  }
}
