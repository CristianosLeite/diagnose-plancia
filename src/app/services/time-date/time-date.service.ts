import { Injectable } from '@angular/core';
import { Interval } from '../../interfaces/activity.interface';

@Injectable({
  providedIn: 'root'
})
export class TimeDateService {

  public formatTime(interval: Interval): string {
    if (!interval) return '00:00:00';

    const hours = interval.hours || 0;
    const minutes = interval.minutes || 0;
    const seconds = interval.seconds || 0;

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  public formatISO8601(interval: Interval): string {
    if (!interval) return 'PT0H0M0S';

    const hours = interval.hours || 0;
    const minutes = interval.minutes || 0;
    const seconds = interval.seconds || 0;

    // Round milliseconds to seconds
    if (interval.milliseconds) {
      interval.seconds += Math.round(interval.milliseconds / 1000);
    }

    return `PT${hours}H${minutes}M${seconds}S`;
  }

  getLocaleIsoString(date?: Date): string {
    const now = date || new Date();
    const localDateTime =
      `${now.getFullYear()}-${String(now.getMonth() + 1)
        .padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours())
          .padStart(2, '0')}:${String(now.getMinutes())
            .padStart(2, '0')}:${String(now.getSeconds())
              .padStart(2, '0')}.${String(now.getMilliseconds())
                .padStart(3, '0')
      }Z`;
    return localDateTime;
  }

  getTimeLocaleString(date?: Date): string {
    const now = date || new Date();
    const localDateTime =
      `${String(now.getHours())
        .padStart(2, '0')}:${String(now.getMinutes())
          .padStart(2, '0')}:${String(now.getSeconds())
            .padStart(2, '0')
      }`;
    return localDateTime;
  }
}
