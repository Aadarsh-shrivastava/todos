import "./ListItem.css";
import { List } from "../../types/List";

interface ListItemInterface {
  list: List;
  isSelected: boolean;
}
export function ListItem({ list, isSelected }: ListItemInterface) {
  return (
    <div className={`Listitem-container ${isSelected ? "selected" : ""}`}>
      <div className="Listitem-name">{list.name}</div>
      <div className="Listitem-count">
        <span>{list.taskCount}</span>
      </div>
    </div>
  );
}
