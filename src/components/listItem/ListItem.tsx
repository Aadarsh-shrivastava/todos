import { List } from "../../types/List";
import bin from "../../assets/bin.svg";
import { useLists } from "../../contexts/ListsContext";
import { useEffect, useRef, useState } from "react";
import "./ListItem.css";

interface ListItemInterface {
  list: List;
  isSelected: boolean;
}

export function ListItem({ list, isSelected }: ListItemInterface) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string>(list.name);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { deleteList, updateList } = useLists();

  const handleDelete = () => {
    deleteList(list.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newListName.length) updateList(list.id, { ...list, name: newListName });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(e.target.value);
  };

  const handleBlur = (name: string) => {
    if (newListName !== name) {
      handleSave();
    } else {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        handleBlur(list.name);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newListName]);

  return (
    <div className={`Listitem-container ${isSelected ? "selected" : ""}`}>
      <div className="Listitem-name-count">
        <div className="Listitem-name">
          {isEditing ? (
            <input
              autoFocus
              className="editable-list-input unselectable"
              ref={inputRef}
              type="text"
              value={newListName}
              onBlur={() => handleBlur(list.name)}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          ) : (
            <div className="Listitem-name unselectable" onClick={handleEdit}>
              {list.name}
            </div>
          )}
        </div>
        <div className="Listitem-count unselectable" onClick={handleEdit}>
          ({list.taskCount})
        </div>
      </div>
      <img className="Listitem-icon" src={bin} onClick={handleDelete} />
    </div>
  );
}
