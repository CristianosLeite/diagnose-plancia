export type Skills = 'Talha' | 'Paleteira' | 'Empilhadeira' | 'NR12' | 'NR33'| 'Rebocador' | 'NR13' | 'NR35' | 'NR10' | 'NR20';

export type Context = 'create' | 'edit';

export type Shift = '1°' | '2°' | '3°' | '4°';

export interface User {
  user_id: string;
  name: string;
  origin: string;
  company: string;
  badge_number: number;
  plant: string;
  skills: Skills[];
  createdAt: Date;
  updatedAt: Date;
  context: Context;
  shift: Shift;
}
