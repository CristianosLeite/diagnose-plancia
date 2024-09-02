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
    return this.http.post(`${this.baseUrl}/create`, checklist);
  }

  retrieveChecklist(id: number) {
    return this.http.get(`${this.baseUrl}/one?checklistId=${id}`);
  }

  retrieveAllChecklists() {
    return this.http.get(`${this.baseUrl}/all`);
  }

  updateChecklist(checklist: Checklist) {
    return this.http.put(`${this.baseUrl}/update`, checklist);
  }

  deleteChecklist(id: number) {
    return this.http.delete(`${this.baseUrl}/delete?checklistId=${id}`);
  }
}
