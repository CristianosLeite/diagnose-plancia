export type Skills = 'Talha' | 'Paleteira' | 'Empilhadeira' | 'NR12' | 'NR33'| 'Rebocador' | 'NR13' | 'NR35' | 'NR10' | 'NR20';

export type context = 'create' | 'edit';

export interface User {
  name: string;
  origin: string;
  company: string;
  // Id = Matricula
  id: number;
  plant: string;
  userSkills: Skills[];
  context: context;
}
