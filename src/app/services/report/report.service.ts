import { Injectable } from '@angular/core';
import { HistoryData } from '../../interfaces/history.interface';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';

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

  exportExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.historyData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'history_data');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}${this.EXCEL_EXTENSION}`);
  }
}
