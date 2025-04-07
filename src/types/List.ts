import { Task } from "./Task";

export type List = {
  createdAt?: Date;
  icon?: string;
  id: number | string;
  modifiedAt?: Date;
  name: string;
  taskCount: number;
  tasks: Task[];
};
