import { Injectable, Output, EventEmitter } from '@angular/core';
import { Activity } from '../interfaces/activity.interface';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  ELEMENT_DATA: Partial<Activity>[] = [
    {id: 1, point: 'SWAY', description: 'CONFERIR ESTADO DE CONSERVAÇÃO DOS PINOS E FUNCIONAMENTO DAS LÂMPADAS DOS SENSORES', estimatedTime: { hours: 0, minutes: 0, seconds: 0 }, activityType: 'Conectores da mesa', frequency: 'Diária'},
    {id: 2, point: 'NOVO TECTOR', description: 'CONFERIR FUNCIONAMENTO DO BOTÃO DE TRAVA', activityType: 'Conectores da mesa', frequency: 'Semanal', sop: './uploads/teste.pdf'},
    {id: 3, point: 'USB-1', description: 'CONFERIR ESTADO DE CONSERVAÇÃO DOS PINOS E FUNCIONAMENTO DAS LÂMPADAS DOS SENSORES', activityType: 'Conectores da mesa', frequency: 'Diária'},
    {id: 4, point: 'ST46 86175', description: 'CONFERIR FUNCIONAMENTO DO BOTÃO DE TRAVA', activityType: 'Conectores da mesa', frequency: 'Semanal'},
    {id: 5, point: 'SWAY', description: 'CONFERIR ESTADO DE CONSERVAÇÃO DOS PINOS E FUNCIONAMENTO DAS LÂMPADAS DOS SENSORES', activityType: 'Conectores da mesa', frequency: 'Diária'},
    {id: 6, point: 'SWAY', description: 'CONFERIR FUNCIONAMENTO DO BOTÃO DE TRAVA', activityType: 'Conectores da mesa', frequency: 'Semanal'},
    {id: 7, point: 'SWAY', description: 'CONFERIR ESTADO DE CONSERVAÇÃO DOS PINOS E FUNCIONAMENTO DAS LÂMPADAS DOS SENSORES', activityType: 'Conectores da mesa', frequency: 'Diária'},
    {id: 8, point: 'SWAY', description: 'CONFERIR FUNCIONAMENTO DO BOTÃO DE TRAVA', activityType: 'Conectores da mesa', frequency: 'Semanal'},
    {id: 9, point: 'SWAY', description: 'CONFERIR ESTADO DE CONSERVAÇÃO DOS PINOS E FUNCIONAMENTO DAS LÂMPADAS DOS SENSORES', activityType: 'Conectores da mesa', frequency: 'Diária'},
    {id: 10, point: 'SWAY', description: 'CONFERIR FUNCIONAMENTO DO BOTÃO DE TRAVA', activityType: 'Conectores da mesa', frequency: 'Semanal'},
  ];

  @Output() selectionChanged = new EventEmitter<Activity>();
  @Output() activityCanceled = new EventEmitter<Activity>();
  @Output() activityConfirmed = new EventEmitter<Activity>();
  @Output() activitySaved = new EventEmitter<Activity>();
  @Output() sopSolicitation = new EventEmitter<Activity>();
  constructor() { }
}
