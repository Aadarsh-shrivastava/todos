import React from "react";
import "./AddTaskButton.css";

interface AddTaskButtonProps {
  onAddTaskClick: () => void;
}

export const AddTaskButton = ({ onAddTaskClick }: AddTaskButtonProps) => {
  return (
    <button
      className="fab-button"
      data-testid={"add-task-button"}
      onClick={onAddTaskClick}
    >
      +
    </button>
  );
};
