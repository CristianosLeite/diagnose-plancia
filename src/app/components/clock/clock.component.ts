import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, AfterViewInit, signal } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent implements AfterViewInit, OnDestroy {
  date = new Date();
  localeDateString = this.date.toLocaleDateString();
  localeTimeString = this.date.toLocaleTimeString();
  intervalId: any;
  subscription: Subscription | undefined;
  isBrowser = signal(false);

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngAfterViewInit() {
    if (this.isBrowser()) {
      this.subscription = timer(0, 1000)
        .pipe(
          map(() => new Date()),
          share()
        )
        .subscribe(time => {
          this.date = time;
          this.localeDateString = this.date.toLocaleDateString();
          this.localeTimeString = this.date.toLocaleTimeString();
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
