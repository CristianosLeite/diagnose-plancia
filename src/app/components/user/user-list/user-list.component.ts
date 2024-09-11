// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { LegendModule } from '../../legend/legend/legend.module';
import { ClockComponent } from '../../clock/clock.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ClockComponent,
    LegendModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['badge_number', 'name', 'origin', 'company', 'plant', 'permissions', 'options'];
  dataSource = new MatTableDataSource<User>();

  constructor(private userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.userService.retrieveAllUsers().subscribe((users: User[]) => {
      this.dataSource.data = users;
    });
  }

  deleteUser(userId: string) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', { duration: 3000 });
        this.userService.retrieveAllUsers().subscribe((users: User[]) => {
          this.dataSource.data = users;
        });
      });
    }
  }
}
