export interface ITask {
  id: number;
  name: string;
  startDate: Date;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  endDate?: Date;
  cost?: number;
  status: number;
}
