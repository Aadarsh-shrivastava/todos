import { createContext, useContext, useState } from "react";
import { List } from "../types/List";
import { Task } from "../types/Task";
import { DefaultLists } from "../data/tasks";

interface ListsContextProps {
  currentListId: number | string | null | undefined;
  setCurrentListId: React.Dispatch<
    React.SetStateAction<number | string | null | undefined>
  >;
  addList: (list: List) => void;
  addTask: (listId: number | string, task: Task) => void;
  deleteList: (id: number | string) => void;
  deleteTask: (listId: number | string, taskId: number | string) => void;
  lists: List[];
  updateList: (id: number | string, updatedList: Partial<List>) => void;
  updateTask: (
    listId: number | string,
    taskId: number | string,
    updatedTask: Partial<Task>,
  ) => void;
  getListByListId: (listId: number | string) => List | undefined;
}

const ListsContext = createContext<ListsContextProps | undefined>(undefined);

export const ListsProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<List[]>(DefaultLists);
  const [currentListId, setCurrentListId] = useState<
    number | string | null | undefined
  >();

  const addList = (list: List) => {
    setLists((prevLists) => [{ ...list, tasks: [] }, ...prevLists]);
  };

  const updateList = (id: number | string, updatedList: Partial<List>) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id
          ? { ...list, ...updatedList, modifiedAt: new Date() }
          : list,
      ),
    );
  };

  const deleteList = (id: number | string) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };

  const addTask = (listId: number | string, task: Task) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              taskCount: list.taskCount + 1,
              tasks: [task, ...list.tasks],
            }
          : list,
      ),
    );
  };

  const updateTask = (
    listId: number | string,
    taskId: number | string,
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

  const deleteTask = (listId: number | string, taskId: number | string) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              taskCount: list.taskCount - 1,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
          : list,
      ),
    );
  };

  const getListByListId = (listId: number | string) => {
    return lists.find((item) => item.id === listId) ?? undefined;
  };

  return (
    <ListsContext.Provider
      value={{
        addList,
        addTask,
        currentListId,
        deleteList,
        deleteTask,
        getListByListId,
        lists,
        setCurrentListId,
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
