import { Interval } from './activity.interface';

export type HistoryData = {
  checklist_id: number;
  username: string;
  activity: string;
  estimatedTime: Interval;
  timeSpent: string;
  status: string;
  createdAt: string;
  activityTime: string;
  actionPlan: string;
};
