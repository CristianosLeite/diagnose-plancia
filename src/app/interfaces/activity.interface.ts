/**
 * Origin é a origem da atividade, podendo ser:
 * - PM: Atividades provenientes da Manutenção profissional
 * - QB: Atividades provenientes da ocorrência de quebras (EWO)
 * - QX: Atividades provenientes da Matriz X
 * - EX: Atividades provenientes da experiência com máquinas similares
 */
export type Origin = 'PM' | 'QB' | 'QX' | 'EX';

export type Period = '1º' | '2º' | '3º';

export type Frequency = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' | 'Other';

export type ActivityStatus = 'OK' | 'KO';

export type dayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type context = 'create' | 'edit' | 'checklist' | 'history';

export interface Interval {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds?: number;
}

/**
 * Interface de atividade
 */
export interface Activity {
  activity_id: number;
  point: string;
  description: string;
  activity_type: string;
  sop: string;
  origin: Origin;
  action_plan: string;
  frequency: Frequency;
  day_to_check: dayOfWeek;
  date: Date;
  created_by: string;
  createdAt: string;
  updatedAt: string;
  estimated_time: Interval;
  time_spent: Interval;
  active_machine: boolean;
  period: Period;
  responsible: string;
  last_checked: string;
  status: ActivityStatus;
  context: context;
}
