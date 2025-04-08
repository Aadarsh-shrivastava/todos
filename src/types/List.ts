import { Id } from "./Id";
import { Task } from "./Task";

export type List = {
  createdAt?: Date;
  icon?: string;
  id: Id;
  modifiedAt?: Date;
  name: string;
  taskCount: number;
  tasks: Task[];
};
