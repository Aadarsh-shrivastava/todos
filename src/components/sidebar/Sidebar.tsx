import { useEffect, useRef, useState } from "react";
import { useLists } from "../../contexts/ListsContext";
import { List } from "../../types/List";
import { AddListButton } from "../addListButton/AddListButton";
import { Lists } from "../lists/Lists";
import { SidebarHeader } from "../sidebarHeader/SidebarHeader";
import "./Sidebar.css";

export function Sidebar() {
  const { addList } = useLists();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleAddList = (addList: (list: List) => void) => {
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
    <>
      <div
        className={`menu-button ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </div>
      <aside
        className={`sidebar-container ${isOpen ? "open" : "close"}`}
        id="sidebar"
        ref={sidebarRef}
      >
        <div className={`sidebar-header`}>
          <SidebarHeader />
        </div>
        <div className="list">
          <Lists />
        </div>
        <div className="add-list-button">
          <AddListButton onAddListClick={() => handleAddList(addList)} />
        </div>
      </aside>
    </>
  );
}
