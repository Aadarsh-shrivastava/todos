import { Task } from "./Task";

export type List = {
  createdAt?: Date;
  icon?: string;
  id: number;
  modifiedAt?: Date;
  name: string;
  taskCount: number;
  tasks: Task[];
};
