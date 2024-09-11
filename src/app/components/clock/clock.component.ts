import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent implements OnInit {
  currentTime: string = '';
  intervalId: any;

  ngOnInit(): void {
    this.updateTime();
    // Atualiza a cada segundo
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString(); // Formata a hora de acordo com a localidade
  }
}
