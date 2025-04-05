import { createContext, useContext, useEffect, useState } from "react";
import { List } from "../types/List";
import { Task } from "../types/Task";
import { Id } from "../types/Id";

interface ListsContextProps {
  currentListId: Id | undefined;
  updateCurrentListId: (id: Id | undefined) => void;
  addList: (list: List) => void;
  addTask: (listId: Id, task: Task) => void;
  deleteList: (id: Id) => void;
  deleteTask: (listId: Id, taskId: Id) => void;
  lists: List[];
  updateList: (updatedList: Partial<List>) => void;
  updateTask: (listId: Id, updatedTask: Partial<Task>) => void;
  getListByListId: (listId: Id) => List | undefined;
}

const ListsContext = createContext<ListsContextProps | undefined>(undefined);

export const ListsProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<List[]>([]);

  const [currentListId, setCurrentListId] = useState<Id | undefined>(
    lists?.[0]?.id
  );

  useEffect(() => {
    const storedLists = localStorage.getItem("lists");
    const updatedList = storedLists ? JSON.parse(storedLists) : [];

    setLists(updatedList);
    setCurrentListId(updatedList.length ? updatedList[0].id : null);
  }, []);

  const saveToLocalStorage = (updatedLists: List[]) => {
    localStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  const updateCurrentListId = (id: Id | undefined) => {
    setCurrentListId(id);
  };

  const addList = (list: List) => {
    setLists((prevLists) => {
      const updatedLists = [{ ...list, tasks: [] }, ...prevLists];
      saveToLocalStorage(updatedLists);
      return updatedLists;
    });
  };

  const updateList = (updatedList: Partial<List>) => {
    setLists((prevLists) => {
      const updatedLists = prevLists.map((list) =>
        list.id === updatedList.id
          ? { ...list, ...updatedList, modifiedAt: new Date() }
          : list
      );
      saveToLocalStorage(updatedLists);
      return updatedLists;
    });
  };

  const deleteList = (id: Id) => {
    setLists((prevLists) => {
      const updatedLists = prevLists.filter((list) => list.id !== id);
      saveToLocalStorage(updatedLists);
      return updatedLists;
    });
  };

  const addTask = (listId: Id, task: Task): void => {
    setLists((prevLists) => {
      const updatedLists = prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              taskCount: list.taskCount + 1,
              tasks: [task, ...list.tasks],
            }
          : list
      );
      saveToLocalStorage(updatedLists);
      return updatedLists;
    });
  };

  const updateTask = (listId: Id, updatedTask: Partial<Task>) => {
    setLists((prevLists) => {
      const updatedLists = prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === updatedTask.id
                  ? { ...task, ...updatedTask, modifiedAt: new Date() }
                  : task
              ),
            }
          : list
      );
      saveToLocalStorage(updatedLists);
      return updatedLists;
    });
  };

  const deleteTask = (listId: Id, taskId: Id) => {
    setLists((prevLists) => {
      const updatedLists = prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              taskCount: list.taskCount - 1,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
          : list
      );
      saveToLocalStorage(updatedLists);
      return updatedLists;
    });
  };

  const getListByListId = (listId: Id) => {
    return lists.find((item) => item.id === listId);
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
        updateCurrentListId,
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
