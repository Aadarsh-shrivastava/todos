export const sampledata = [
  {
    createdAt: new Date(),
    id: 1,
    modifiedAt: new Date(),
    name: "Groceries",
    taskCount: 2,
    tasks: [
      {
        createdAt: new Date(),
        id: 1,
        isDone: false,
        modifiedAt: new Date(),
        name: "Buy milk",
        priority: 2,
      },
      {
        createdAt: new Date(),
        id: 2,
        isDone: true,
        modifiedAt: new Date(),
        name: "Get vegetables",
        priority: 1,
      },
    ],
  },
  {
    createdAt: new Date(),
    id: 2,
    modifiedAt: new Date(),
    name: "Work Tasks",
    taskCount: 3,
    tasks: [
      {
        createdAt: new Date(),
        id: 3,
        isDone: false,
        modifiedAt: new Date(),
        name: "Finish report",
        priority: 3,
      },
      {
        createdAt: new Date(),
        id: 4,
        isDone: false,
        modifiedAt: new Date(),
        name: "Email client",
        priority: 2,
      },
      {
        createdAt: new Date(),
        id: 5,
        isDone: true,
        modifiedAt: new Date(),
        name: "Prepare presentation",
        priority: 1,
      },
    ],
  },
];
