import AddListButton from "../addListButton/AddListButton";
import HorizontalLine from "../horizontalLine/HorizontalLine";
import Lists from "../lists/Lists";
import SidebarHeader from "../sidebarHeader/SidebarHeader";
import "./Sidebar.css";

export function Sidebar() {
  return (
    <aside className="sidebar-container" id="sidebar">
      <div>
        <SidebarHeader />
        <Lists />
        <HorizontalLine color="#0002" thickness={1} />
      </div>
      <AddListButton />
    </aside>
  );
}
