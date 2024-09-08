import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './components/auth/auth.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'diagnose-plancia';
  constructor(public dialog: MatDialog) {
    this.openLoginDialog();
  }

  openLoginDialog(): void {
    this.dialog.open(AuthComponent, {
      width: '400px',
      disableClose: true
    });
  }
}
