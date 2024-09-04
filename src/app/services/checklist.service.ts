import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checklist } from '../interfaces/checklist.interface';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  baseUrl = 'http://localhost:4000/api/checklists';

  constructor(private http: HttpClient) { }

  createChecklist(checklist: Partial<Checklist>) {
    return this.http.post<Checklist>(`${this.baseUrl}/create`, checklist);
  }

  retrieveChecklist(id: number) {
    return this.http.get<Checklist>(`${this.baseUrl}/one?checklist_id=${id}`);
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
