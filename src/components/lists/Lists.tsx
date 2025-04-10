import { useLists } from "../../contexts/ListsContext";
import { Id } from "../../types/Id";
import { ListItem } from "../listItem/ListItem";
import "./Lists.css";
import React from "react";

export function Lists() {
  const { lists, currentListId, updateCurrentListId } = useLists();

  const handleListClick = (listId: Id) => {
    updateCurrentListId(listId);
  };

  return (
    <>
      {lists.map((list) => (
        <div
          key={list.id}
          onClick={() => handleListClick(list.id)}
          data-testid="list-item-cy"
        >
          <ListItem isSelected={currentListId === list.id} list={list} />
        </div>
      ))}
    </>
  );
}
