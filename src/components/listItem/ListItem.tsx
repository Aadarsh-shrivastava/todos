import "./ListItem.css";
import { List } from "../../types/List";

interface ListItemInterface {
  list: List;
  isSelected: boolean;
}
function ListItem({ list, isSelected }: ListItemInterface) {
  return (
    <div className={`listitem-container ${isSelected ? "selected" : ""}`}>
      <div className="listitem-name">{list.name}</div>
      <div className="listitem-count">
        <span>{list.taskCount}</span>
      </div>
    </div>
  );
}

export default ListItem;
