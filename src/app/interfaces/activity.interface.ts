/**
 * Origin é a origem da atividade, podendo ser:
 * - PM: Atividades provenientes da Manutenção profissional
 * - QB: Atividades provenientes da ocorrência de quebras (EWO)
 * - QX: Atividades provenientes da Matriz X
 * - EX: Atividades provenientes da experiência com máquinas similares
 */
export type Origin = 'PM' | 'QB' | 'QX' | 'EX';

export type Period = '1º' | '2º' | '3º';

export type Frequency = 'Diária' | 'Semanal' | 'Mensal' | 'Anual' | 'Outro';

export type Day = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo';

export interface Interval {
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Interface de atividade
 */
export interface Activity {
  id: number;
  point: string;
  description: string;
  activityType: string;
  sop: string;
  origin: Origin;
  frequency: Frequency;
  day: Day;
  date: Date;
  estimatedTime: Interval;
  timeSpent: Interval;
  activeMachine: boolean;
  period: Period;
  responsible: string;
  isFinished: boolean;
  isBooked: boolean;
}
