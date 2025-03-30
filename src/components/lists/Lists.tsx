import { useState } from "react";
import { useLists } from "../../contexts/ListsContext";
import ListItem from "../listItem/ListItem";

function Lists() {
  const { lists } = useLists();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleClick = (id: number) => {
    setSelectedId(id);
  };
  return (
    <div className="list-container">
      {lists.map((list) => (
        <div key={list.id} onClick={() => handleClick(list.id)}>
          <ListItem isSelected={selectedId == list.id} list={list} />
        </div>
      ))}
    </div>
  );
}

export default Lists;
