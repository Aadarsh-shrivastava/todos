import { createContext, useContext, useEffect, useState } from "react";
import { List } from "../types/List";
import { Task } from "../types/Task";
import { Id } from "../types/Id";

interface ListsContextProps {
  currentListId: Id | null | undefined;
  updateCurrentListId: (id: Id | null) => void;
  addList: (list: List) => void;
  addTask: (listId: Id, task: Task) => void;
  deleteList: (id: Id) => void;
  deleteTask: (listId: Id, taskId: Id) => void;
  lists: List[];
  updateList: (id: Id, updatedList: Partial<List>) => void;
  updateTask: (listId: Id, taskId: Id, updatedTask: Partial<Task>) => void;
  getListByListId: (listId: Id) => List | undefined;
}

const ListsContext = createContext<ListsContextProps | undefined>(undefined);

export const ListsProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<List[]>(() => {
    const storedLists = localStorage.getItem("lists");
    return storedLists ? JSON.parse(storedLists) : [];
  });

  const [currentListId, setCurrentListId] = useState<Id | null>(
    lists.length ? lists[0].id : null
  );

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const updateCurrentListId = (id: Id | null) => {
    setCurrentListId(id);
  };

  const addList = (list: List) => {
    setLists((prevLists) => [{ ...list, tasks: [] }, ...prevLists]);
  };

  const updateList = (id: Id, updatedList: Partial<List>) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id
          ? { ...list, ...updatedList, modifiedAt: new Date() }
          : list
      )
    );
  };

  const deleteList = (id: Id) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };

  const addTask = (listId: Id, task: Task): void => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              taskCount: list.taskCount + 1,
              tasks: [task, ...list.tasks],
            }
          : list
      )
    );
  };

  const updateTask = (listId: Id, taskId: Id, updatedTask: Partial<Task>) => {
    console.log("updatig", updatedTask);
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, ...updatedTask, modifiedAt: new Date() }
                  : task
              ),
            }
          : list
      )
    );
  };

  const deleteTask = (listId: Id, taskId: Id) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              taskCount: list.taskCount - 1,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
          : list
      )
    );
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
