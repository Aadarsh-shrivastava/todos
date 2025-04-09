import { createContext, useContext, useEffect, useState } from "react";
import { List } from "../types/List";
import { Task } from "../types/Task";
import { Id } from "../types/Id";

interface ListsContextProps {
  currentListId: Id | undefined | null;
  updateCurrentListId: (id: Id | undefined | null) => void;
  addList: (list: List) => void;
  addTask: (listId: Id, task: Task) => void;
  deleteList: (id: Id) => void;
  deleteTask: (listId: Id, taskId: Id) => void;
  lists: List[];
  updateList: (updatedList: List) => void;
  updateTask: (listId: Id, updatedTask: Task) => void;
  getListByListId: (listId: Id) => List | undefined;
}

const ListsContext = createContext<ListsContextProps | undefined>(undefined);

export const ListsProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<List[]>([]);

  const [currentListId, setCurrentListId] = useState<Id | null | undefined>(
    undefined
  );

  const saveToLocalStorage = (updatedLists: List[]) => {
    localStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  const updateCurrentListId = (id: Id | null | undefined) => {
    setCurrentListId(id);
  };

  const addList = (list: List) => {
    const updatedLists = [{ ...list, tasks: [] }, ...lists];
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const updateList = (updatedList: List) => {
    const updatedLists = lists.map((list) =>
      list.id === updatedList.id
        ? { ...list, ...updatedList, modifiedAt: new Date() }
        : list
    );
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const deleteList = (id: Id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
    if (updatedLists.length === 0) {
      setCurrentListId(undefined);
    } else if (currentListId === id) {
      setCurrentListId(updatedLists[0].id);
    }
  };

  const addTask = (listId: Id, task: Task): void => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            taskCount: list.taskCount + 1,
            tasks: [task, ...list.tasks],
          }
        : list
    );
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const updateTask = (listId: Id, updatedTask: Task) => {
    const updatedLists = lists.map((list) =>
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
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const deleteTask = (listId: Id, taskId: Id) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            taskCount: list.taskCount - 1,
            tasks: list.tasks.filter((task) => task.id !== taskId),
          }
        : list
    );
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const getListByListId = (listId: Id) => {
    return lists.find((item) => item.id === listId);
  };

  useEffect(() => {
    const storedLists = localStorage.getItem("lists");
    const updatedList = storedLists ? JSON.parse(storedLists) : [];

    setLists(updatedList);
    setCurrentListId(updatedList.length ? updatedList[0].id : null);
  }, []);

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
