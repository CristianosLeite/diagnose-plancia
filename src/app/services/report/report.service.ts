import { Injectable } from '@angular/core';
import { HistoryData } from '../../interfaces/history.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  historyData = [] as HistoryData[];
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  constructor() { }

  setHistoryData(data: HistoryData[]) {
    this.historyData = data;
  }

  getHistoryData() {
    return this.historyData;
  }
}
