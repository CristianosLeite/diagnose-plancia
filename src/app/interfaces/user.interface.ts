export type Permissions = 'create_users' | 'view_users' | 'edit_users' | 'view_history' | 'create_checklist' | 'create_activity' | 'reports';

export type Context = 'create' | 'edit';

export type ShiftWork = '1°' | '2°' | '3°' | '4°';

export interface User {
  user_id: string;
  name: string;
  origin: string;
  company: string;
  badge_number: number;
  plant: string;
  createdAt: Date;
  updatedAt: Date;
  context: Context;
  shift_work: ShiftWork;
  permissions: string[];
}
