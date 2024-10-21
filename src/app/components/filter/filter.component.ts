import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, Output, EventEmitter } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ReportService } from '../../services/report/report.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIcon,
    TooltipModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7);
  endDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
  @Output() startDateChange = new EventEmitter<Date>();
  @Output() endDateChange = new EventEmitter<Date>();

  constructor(private reportService: ReportService) { }

  onStartDateChange(date: Date) {
    this.startDateChange.emit(date);
  }

  onEndDateChange(date: Date) {
    this.endDateChange.emit(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
  }
}
