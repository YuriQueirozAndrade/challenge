import { IComment } from './IComment';

export interface ITask {
  id: number;
  name: string;
  start_date: string;
  end_date?: string | null;
  cost?: number;
  status: string;
  comments?: IComment[];
}
