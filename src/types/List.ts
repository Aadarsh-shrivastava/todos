import { Task } from "./Task";

export type List = {
    id:number;
    name:string;
    taskCount:number;
    tasks:Task[];
    createdAt:Date;
    modifiedAt:Date;
}

