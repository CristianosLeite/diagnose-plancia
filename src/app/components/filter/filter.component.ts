import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, Output, EventEmitter } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ReportService } from '../../services/report/report.service';
import { AuthService } from '../../services/auth/auth.service';
import { PopupMessageComponent } from '../modal/popup-message/popup-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIcon,
    TooltipModule,
    PopupMessageComponent
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7);
  endDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
  @Output() startDateChange = new EventEmitter<Date>();
  @Output() endDateChange = new EventEmitter<Date>();

  constructor(
    private reportService: ReportService,
    private readonly auth: AuthService,
    public dialog: MatDialog,
  ) { }

  onStartDateChange(date: Date) {
    this.startDateChange.emit(date);
  }

  onEndDateChange(date: Date) {
    this.endDateChange.emit(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
  }

  private openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(PopupMessageComponent, {
      width: '400px',
      data: { title, message }
    });

    dialogRef.componentInstance.onClick.subscribe(() => {
      dialogRef.close();
    });
  }

  exportReport() {
    if(! this.auth.checkPermissionFor('reports')) {
      this.openDialog('Acesso negado', 'Você não possui permissão para exportar relatórios.');
      return;
    }
    this.reportService.exportExcel();
  }
}
