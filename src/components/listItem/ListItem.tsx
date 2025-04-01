import "./ListItem.css";
import { List } from "../../types/List";
import bin from "../../assets/bin.svg";
import { useLists } from "../../contexts/ListsContext";
import { useEffect, useRef, useState } from "react";
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
    updateList(list.id, { ...list, name: newListName });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(e.target.value);
  };

  const handleBlur = () => {
    if (newListName !== list.name) {
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
        handleBlur();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newListName]);

  return (
    <div className={`Listitem-container ${isSelected ? "selected" : ""}`}>
      {isEditing ? (
        <input
          autoFocus
          className="editable-task-input"
          ref={inputRef}
          type="text"
          value={newListName}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
      ) : (
        <span
          onClick={handleEdit} // Enable editing on click
        >
          {list.name}
        </span>
      )}
      <div className="Listitem-count">
        <img className="Listitem-icon" src={bin} onClick={handleDelete} />
      </div>
    </div>
  );
}
