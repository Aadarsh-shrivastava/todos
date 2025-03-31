import { createContext, useContext, useState } from "react";
import { List } from "../types/List";
import { Task } from "../types/Task";
import { DefaultLists } from "../data/tasks";

interface ListsContextProps {
  addList: (list: List) => void;
  addTask: (listId: number, task: Task) => void;
  deleteList: (id: number) => void;
  deleteTask: (listId: number, taskId: number) => void;
  lists: List[];
  updateList: (id: number, updatedList: Partial<List>) => void;
  updateTask: (
    listId: number,
    taskId: number,
    updatedTask: Partial<Task>,
  ) => void;
  getTasksByListId: (listId: number) => Task[] | undefined;
}

const ListsContext = createContext<ListsContextProps | undefined>(undefined);

export const ListsProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<List[]>(DefaultLists);

  const addList = (list: List) => {
    setLists((prevLists) => [...prevLists, { ...list, tasks: [] }]);
  };

  const updateList = (id: number, updatedList: Partial<List>) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id
          ? { ...list, ...updatedList, modifiedAt: new Date() }
          : list,
      ),
    );
  };

  const deleteList = (id: number) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };

  const addTask = (listId: number, task: Task) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, tasks: [...list.tasks, task] } : list,
      ),
    );
  };

  const updateTask = (
    listId: number,
    taskId: number,
    updatedTask: Partial<Task>,
  ) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, ...updatedTask, modifiedAt: new Date() }
                  : task,
              ),
            }
          : list,
      ),
    );
  };

  const deleteTask = (listId: number, taskId: number) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list,
      ),
    );
  };

  const getTasksByListId = (listId: number) => {
    return lists.find((item) => item.id === listId)?.tasks;
  };

  return (
    <ListsContext.Provider
      value={{
        addList,
        addTask,
        deleteList,
        deleteTask,
        getTasksByListId,
        lists,
        updateList,
        updateTask,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useLists = () => {
  const context = useContext(ListsContext);
  if (!context) {
    throw new Error("useLists must be used within a ListsProvider");
  }
  return context;
};
