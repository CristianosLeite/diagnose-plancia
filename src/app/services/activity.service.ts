import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../interfaces/activity.interface';
import { TimeDateService } from './time-date.service';
import { Interval } from '../interfaces/activity.interface';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  baseUrl = 'http://localhost:4000/api/activities';
  ELEMENT_DATA: Activity[] = [];

  @Output() activitiesChanged = new EventEmitter<Activity[]>();
  @Output() selectionChanged = new EventEmitter<Activity>();
  @Output() activityCanceled = new EventEmitter<Activity>();
  @Output() activityConfirmed = new EventEmitter<Activity>();
  @Output() activitySaved = new EventEmitter<Activity>();
  @Output() sopSolicitation = new EventEmitter<Activity>();

  constructor(
    private http: HttpClient,
    private timeDateService: TimeDateService
  ) { }

  createActivity(activity: Activity) {
    activity.estimated_time = this.timeDateService.formatISO8601(activity.estimated_time) as unknown as Interval;
    return this.http.post<Activity>(`${this.baseUrl}/create`, activity);
  }

  retrieveActivity(id: string) {
    return this.http.get<Activity>(`${this.baseUrl}/one?activity_id=${id}`);
  }

  retrieveAllActivities() {
    return this.http.get<Activity[]>(`${this.baseUrl}/all`).subscribe((data: Activity[]) => {
      this.ELEMENT_DATA = data;
      this.activitiesChanged.emit(this.ELEMENT_DATA);
    });
  }

  updateActivity(activity: Activity) {
    activity.estimated_time = this.timeDateService.formatISO8601(activity.estimated_time) as unknown as Interval;
    return this.http.put<Activity>(`${this.baseUrl}/update`, activity);
  }

  deleteActivity(id: string) {
    return this.http.delete<Activity>(`${this.baseUrl}/delete?activity_id=${id}`);
  }
}
