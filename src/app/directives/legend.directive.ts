import { Directive, ElementRef, Renderer2, OnInit, ViewContainerRef } from '@angular/core';
import { ClockComponent } from '../../app/components/clock/clock.component';

@Directive({
  selector: '[appLegend]'
})
export class LegendDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'legend-container');
    this.createLegend();
  }

  createLegend() {
    const legendItems = [
      { color: 'red', text: 'Criar usuários' },
      { color: 'green', text: 'Ver usuários' },
      { color: 'blue', text: 'Editar usuários' },
      { color: 'yellow', text: 'Ver histórico' },
      { color: 'white', text: 'Criar checklist' },
      { color: 'orange', text: 'Criar atividades' },
      { color: 'purple', text: 'Exportar Relatórios' }
    ];

    legendItems.forEach(item => {
      const li = this.renderer.createElement('li');
      this.renderer.addClass(li, 'legend-item');

      const dot = this.renderer.createElement('span');
      this.renderer.setStyle(dot, 'background-color', item.color);
      this.renderer.addClass(dot, 'legend-dot');

      const text = this.renderer.createText(item.text);

      this.renderer.appendChild(li, dot);
      this.renderer.appendChild(li, text);

      this.renderer.appendChild(this.el.nativeElement, li);

      // Se o item for "Exportar Relatórios", adiciona o relógio ao lado
      if (item.text === 'Exportar Relatórios') {
        // Cria uma referência ao componente ClockComponent
        const componentRef = this.viewContainerRef.createComponent(ClockComponent);

        // Adiciona o ClockComponent ao final do item da legenda
        this.renderer.appendChild(li, componentRef.location.nativeElement);
      }
    });
  }
}
