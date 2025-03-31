import my_day_icon from "../assets/my_day.svg";
import planned_icon from "../assets/planned.svg";
import tasks_icon from "../assets/tasks.svg";
import important_icon from "../assets/Important.svg";
import { List } from "../types/List";

export const DefaultLists: List[] = [
  {
    icon: my_day_icon,
    id: 1,
    name: "My day",
    taskCount: 0,
    tasks: [
      {
        createdAt: new Date(),
        id: 1,
        isDone: false,
        modifiedAt: new Date(),
        name: "task1",
        priority: 1,
      },
      {
        createdAt: new Date(),
        id: 2,
        isDone: false,
        modifiedAt: new Date(),
        name: "task2",
        priority: 1,
      },
      {
        createdAt: new Date(),
        id: 3,
        isDone: false,
        modifiedAt: new Date(),
        name: "task3",
        priority: 1,
      },
    ],
  },
  {
    icon: important_icon,
    id: 2,
    name: "Important",
    taskCount: 0,
    tasks: [],
  },
  {
    icon: planned_icon,
    id: 3,
    name: "Planned",
    taskCount: 0,
    tasks: [],
  },
  {
    icon: tasks_icon,
    id: 4,
    name: "Tasks",
    taskCount: 0,
    tasks: [],
  },
];
