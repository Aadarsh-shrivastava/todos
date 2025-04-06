import { useLists } from "../../contexts/ListsContext";
import { Id } from "../../types/Id";
import { ListItem } from "../listItem/ListItem";
import "./Lists.css";

export function Lists() {
  const { lists, currentListId, updateCurrentListId } = useLists();

  const handleListClick = (listId: Id) => {
    updateCurrentListId(listId);
  };

  return (
    <div className="list-container">
      {lists.map((list) => (
        <div key={list.id} onClick={() => handleListClick(list.id)}>
          <ListItem isSelected={currentListId === list.id} list={list} />
        </div>
      ))}
    </div>
  );
}
