import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendDirective } from '../../../directives/legend.directive';
import { ClockComponent } from '../../clock/clock.component';

@NgModule({
  declarations: [
    LegendDirective,
  ],
  imports: [
    CommonModule,
    ClockComponent
  ],
  exports: [
    LegendDirective,
    ClockComponent
  ]
})
export class LegendModule { }
