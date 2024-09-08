import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-not-authenticated',
  standalone: true,
  imports: [],
  templateUrl: './not-authenticated.component.html',
  styleUrl: './not-authenticated.component.scss'
})
export class NotAuthenticatedComponent {

  constructor(private auth: AuthService) { }

  openLoginDialog(): void {
    this.auth.openLoginDialog();
  }
}
