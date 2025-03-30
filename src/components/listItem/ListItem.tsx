import "./ListItem.css";
import { List } from "../../types/List";

interface ListItemInterface {
  list: List;
  isSelected: boolean;
}
function ListItem({ list, isSelected }: ListItemInterface) {
  return (
    <div className="listitem-container">
      <div className="listitem-section">
        <img
          alt="listitem-picture"
          className="listitem-picture"
          src={list.icon}
        />
        <div
          className="listitem-name"
          style={isSelected ? { color: "green" } : { color: "black" }}
        >
          {list.name}
        </div>
      </div>
      <div className="listitem-count">
        <span>{list.taskCount}</span>
      </div>
    </div>
  );
}

export default ListItem;
