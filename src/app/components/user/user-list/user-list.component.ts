import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../services/user/user.service';
import { User, Permissions } from '../../../interfaces/user.interface';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { CaptionModule } from '../../../directives/caption/caption.module';
import { SnackbarService } from './../../../services/snack-bar/snack-bar.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { TooltipModule } from '../../tooltip/tooltip.module';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgStyle,
    TooltipModule,
    CaptionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'badge_number',
    'name',
    'origin',
    'company',
    'plant',
    'permissions',
    'options',
  ];
  dataSource = new MatTableDataSource<User>();
  showModal = false;
  selectedElement: any = null;

  constructor(
    private userService: UserService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit() {
    this.userService.retrieveAllUsers().subscribe((users: User[]) => {
      this.dataSource.data = users;
    });
  }

  openModalConfirmation(event: Event, element: any) {
    event.stopPropagation();
    this.showModal = true;
    this.selectedElement = element.user_id;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmDeletion(): void {
    this.deleteUser(this.selectedElement);
    this.closeModal();
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.snackBar.openSnackBar('user_delete_success');
      this.userService.retrieveAllUsers().subscribe((users: User[]) => {
        this.dataSource.data = users;
      });
    });
  }

  getALLPermissions() {
    if (!this.dataSource.data) return [];
    let permissions: Permissions[] = [];
    this.dataSource.data.forEach((user) => {
      if (user.permissions) {
        permissions = [
          ...permissions,
          ...user.permissions.map((permission) => permission as Permissions),
        ];
      }
    });
    return [...new Set(permissions)];
  }

  handlePermissions(permission: string) {
    const value: { [key: string]: string } = {
      create_users: 'Cadastrar usuários',
      view_users: 'Visualizar usuários cadastrados',
      edit_users: 'Editar usuários',
      view_history: 'Visualizar histórico de atividades',
      create_checklist: 'Realizar checklist',
      create_activity: 'Cadastrar nova atividade',
      view_activity: 'Visualizar atividades cadastradas',
      reports: 'Exportar Relatórios',
    };

    return value[permission];
  }
}
