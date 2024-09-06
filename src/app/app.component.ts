import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/modal/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { FooterComponent } from './components/footer/footer.component';

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
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
      disableClose: true  // Modal permanece ativo até login
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Login realizado com sucesso');
      } else {
        console.log('Login cancelado');
      }
    });
  }
}
