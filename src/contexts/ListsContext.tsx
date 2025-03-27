import { createContext, useContext, useState } from "react";
import { List } from "../types/List";

interface ListsContextProps {
  lists: List[];
  addList: (list: List) => void;
  deleteList: (id: number) => void;
  updateList: (id: number, updatedList: Partial<List>) => void;
}

const ListsContext = createContext<ListsContextProps | undefined>(undefined);

export const ListsProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<List[]>([]);

  const addList = (list: List) => {
    setLists((prevLists) => [...prevLists, list]);
  };

  const updateList = (id: number, updatedList: Partial<List>) => {
    setLists((prevLists) =>
      prevLists.map((list) => (list.id === id ? { ...list, ...updatedList, modifiedAt: new Date() } : list))
    );
  };

  const deleteList = (id: number) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };

  return(
    <ListsContext.Provider value={{lists,addList,deleteList,updateList}}>
      {children}
    </ListsContext.Provider>
  )
};

export const useLists=()=>{
  const context = useContext(ListsContext);

  if(!context){
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}