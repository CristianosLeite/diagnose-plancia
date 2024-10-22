import { Component, OnInit, Input } from '@angular/core';
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
import { PopupConfirmationComponent } from '../../modal/popup-confirmation/popup-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    RouterLink,
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
  loggedUser = this.authService.loggedUser;
  @Input() context = 'user';

  constructor(
    private userService: UserService,
    private snackBar: SnackbarService,
    public dialog: MatDialog,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.ActivatedRoute.params.subscribe((params) => {
      this.context = params['context'];
      this.userService.retrieveAllUsers();
    });
  }

  ngOnInit() {
    this.userService.retrieveAllUsers().subscribe((users: User[]) => {
      this.dataSource.data = users;
    });
  }

  openPopupConfirmation(event: any, user: User): boolean {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PopupConfirmationComponent, {
      width: '400px',
      data: {
        user,
        title: 'Confirmar exclusão',
        message: 'Deseja excluir o usuario?',
      },
    });

    const onCancelSubscription = dialogRef.componentInstance.onCancel.subscribe(
      () => {
        dialogRef.close();
        onCancelSubscription.unsubscribe();
      }
    );

    const onConfirmSubscription =
      dialogRef.componentInstance.onConfirm.subscribe(() => {
        this.deleteUser(user.user_id);
        onConfirmSubscription.unsubscribe();
      });

    return false;
  }

  deleteUser(userId: string) {
    if (userId === this.loggedUser.user_id) {
      this.snackBar.openSnackBar('user_delete_error');
      return;
    } else {
      this.userService.deleteUser(userId).subscribe(() => {
        this.snackBar.openSnackBar('user_delete_success');
        this.userService.retrieveAllUsers().subscribe((users: User[]) => {
          this.dataSource.data = users;
        });
      });
    }
  }

  userEdit(event: Event, user: User) {
    event.stopPropagation();
    this.router.navigate([
      '/users-create',
      { element: JSON.stringify(user), context: 'edit' },
    ]);
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
      list_activity: 'Visualizar atividades cadastradas',
      reports: 'Exportar Relatórios',
    };

    return value[permission];
  }
}
