import { Injectable } from '@angular/core';
import { Interval } from '../interfaces/activity.interface';

@Injectable({
  providedIn: 'root'
})
export class TimeDateService {

  public formatTime(interval: Interval): string {
    const hours = interval.hours || 0;
    const minutes = interval.minutes || 0;
    const seconds = interval.seconds || 0;

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  public formatISO8601(interval: Interval): string {
    const hours = interval.hours || 0;
    const minutes = interval.minutes || 0;
    const seconds = interval.seconds || 0;

    // Round milliseconds to seconds
    interval.milliseconds ? interval.seconds += Math.round(interval.milliseconds / 1000) : null;

    return `PT${hours}H${minutes}M${seconds}S`;
  }
}
