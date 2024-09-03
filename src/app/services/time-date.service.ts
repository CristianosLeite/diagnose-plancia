import { Injectable } from '@angular/core';
import { Interval } from '../interfaces/activity.interface';

@Injectable({
  providedIn: 'root'
})
export class TimeDateService {

  public formatTime(interval: Interval): string {
    const hours = interval.hours;
    const minutes = interval.minutes;
    const seconds = interval.seconds;

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
}
