import { createContext, useContext, useState } from "react";
import { Task } from "../types/Task";

interface TasksContextProps {
  Tasks: Task[];
  addTask: (Task: Task) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, updatedTask: Partial<Task>) => void;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [Tasks, setTasks] = useState<Task[]>([]);

  const addTask = (Task: Task) => {
    setTasks((prevTasks) => [...prevTasks, Task]);
  };

  const updateTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((Task) =>
        Task.id === id
          ? { ...Task, ...updatedTask, modifiedAt: new Date() }
          : Task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((Task) => Task.id !== id));
  };

  return (
    <TasksContext.Provider value={{ Tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
