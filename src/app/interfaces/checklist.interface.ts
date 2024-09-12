import { ActivityStatus } from './activity.interface';

export interface Checklist {
  checklist_id: number;
  activity_id: number;
  user_id: string;
  shift_work: number;
  time_spent: string;
  status: ActivityStatus;
  action_plan: string;
  createdAt: string;
  updatedAt: string;
}
