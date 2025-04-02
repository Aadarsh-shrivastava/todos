import { List } from "../types/List";

export const DefaultLists: List[] = [
  {
    id: 1,
    name: "My day",
    taskCount: 3,
    tasks: [
      {
        createdAt: new Date(),
        id: 1,
        isDone: false,
        modifiedAt: new Date(),
        name: "task1",
      },
      {
        createdAt: new Date(),
        id: 2,
        isDone: false,
        modifiedAt: new Date(),
        name: "task2",
      },
      {
        createdAt: new Date(),
        id: 3,
        isDone: false,
        modifiedAt: new Date(),
        name: "task3",
      },
    ],
  },
  {
    id: 2,
    name: "Important",
    taskCount: 0,
    tasks: [],
  },
  {
    id: 3,
    name: "Planned",
    taskCount: 0,
    tasks: [],
  },
  {
    id: 4,
    name: "Tasks",
    taskCount: 0,
    tasks: [],
  },
];
