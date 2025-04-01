import { useLists } from "../../contexts/ListsContext";
import { List } from "../../types/List";
import { AddListButton } from "../addListButton/AddListButton";
import { Lists } from "../lists/Lists";
import { SidebarHeader } from "../sidebarHeader/SidebarHeader";
import "./Sidebar.css";

export function Sidebar() {
  const { addList } = useLists();

  const handleAddList = () => {
    const newList: List = {
      createdAt: new Date(),
      id: crypto.randomUUID(),
      modifiedAt: new Date(),
      name: "New List",
      taskCount: 0,
      tasks: [],
    };
    addList(newList);
  };

  return (
    <aside className="sidebar-container" id="sidebar">
      <div>
        <SidebarHeader />
        <Lists />
      </div>
      <AddListButton onClick={handleAddList} />
    </aside>
  );
}
