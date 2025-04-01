import { useLists } from "../../contexts/ListsContext";
import { ListItem } from "../listItem/ListItem";

export function Lists() {
  const { lists, currentListId, setCurrentListId } = useLists();
  const handleClick = (id: number) => {
    setCurrentListId(id);
  };
  return (
    <div className="list-container">
      {lists.map((list) => (
        <div key={list.id} onClick={() => handleClick(list.id)}>
          <ListItem isSelected={currentListId === list.id} list={list} />
        </div>
      ))}
    </div>
  );
}
