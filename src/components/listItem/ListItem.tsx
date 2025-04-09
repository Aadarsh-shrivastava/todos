import { List } from "../../types/List";
import bin from "../../assets/bin.svg";
import { useLists } from "../../contexts/ListsContext";
import { useEffect, useRef, useState } from "react";
import React from "react";
import "./ListItem.css";
import { Id } from "../../types/Id";

interface ListItemInterface {
  list: List;
  isSelected: boolean;
}

export function ListItem({ list, isSelected }: ListItemInterface) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string>(list.name);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { deleteList, updateList } = useLists();

  const handleDelete = (listId: Id) => {
    deleteList(listId);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (list: List) => {
    if (newListName.length) updateList({ ...list, name: newListName });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(e.target.value);
  };

  const handleBlur = (list: List) => {
    if (newListName.trim() && newListName !== list.name) {
      handleSave(list);
    } else {
      setIsEditing(false);
      setNewListName(list.name);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        handleBlur(list);
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
              data-testid={`list-name-input-${list.id}`}
              ref={inputRef}
              type="text"
              value={newListName}
              onBlur={() => handleBlur(list)}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleSave(list)}
            />
          ) : (
            <div
              className="Listitem-name unselectable"
              data-testid={`list-name-span-${list.id}`}
              onClick={handleEdit}
            >
              {list.name}
            </div>
          )}
        </div>
        <div className="Listitem-count unselectable" onClick={handleEdit}>
          ({list.taskCount})
        </div>
      </div>
      <img
        className="Listitem-icon"
        data-testid={`bin-icon-${list.id}`}
        src={bin}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(list.id);
        }}
      />
    </div>
  );
}
