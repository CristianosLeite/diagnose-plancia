export type Skills = 'Talha' | 'Paleteira' | 'Empilhadeira' | 'NR12' | 'NR33'| 'Rebocador' | 'NR13' | 'NR35' | 'NR10' | 'NR20';

export type context = 'create' | 'edit';

export interface User {
  id: string;
  name: string;
  origin: string;
  company: string;
  badgeNumber: number;
  plant: string;
  skills: Skills[];
  createdAt: Date;
  updatedAt: Date;
  context: context;
}
