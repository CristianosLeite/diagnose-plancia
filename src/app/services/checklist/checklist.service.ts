import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checklist } from '../../interfaces/checklist.interface';
import { Activity } from '../../interfaces/activity.interface';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  baseUrl = 'http://localhost:4000/api/checklists';
  @Output() checklistChanged = new EventEmitter<Activity[]>();

  constructor(private http: HttpClient) { }

  createChecklist(checklist: Partial<Checklist>) {
    return this.http.post<Checklist>(`${this.baseUrl}/create`, checklist);
  }

  retrievePendingChecklist(shiftWork: number) {
    return this.http.get<Activity[]>(`${this.baseUrl}/pending?shift_work=${shiftWork}`)
      .subscribe((data: Activity[]) => {
        this.checklistChanged.emit(data);
      });
  }

  retrieveAllChecklists() {
    return this.http.get<Checklist[]>(`${this.baseUrl}/all`);
  }

  updateChecklist(checklist: Checklist) {
    return this.http.put<Checklist>(`${this.baseUrl}/update`, checklist);
  }

  deleteChecklist(id: number) {
    return this.http.delete<Checklist>(`${this.baseUrl}/delete?checklist_id=${id}`);
  }
}
