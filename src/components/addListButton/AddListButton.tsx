import "./AddListButton.css";
import React from "react";

interface AddListButtonProps {
  onAddListClick: () => void;
}

export function AddListButton({ onAddListClick }: AddListButtonProps) {
  return (
    <div
      className="addlist-button"
      data-testid={"add-list-button"}
      onClick={onAddListClick}
    >
      <p className="unselectable">Add List</p>
    </div>
  );
}
