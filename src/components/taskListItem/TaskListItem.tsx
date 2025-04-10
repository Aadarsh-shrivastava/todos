import React from "react";
import { useState } from "react";
import { Task } from "../../types/Task";
import bin from "../../assets/bin.svg";
import "./TaskListItem.css";

export interface TaskListItemHandle {
  focusInput: () => void;
}

interface TaskListItemProps {
  task: Task;
  handleDelete: (taskId: string | number) => void;
  handleUpdate: (task: Task) => void;
}

export const TaskListItem = ({
  task,
  handleDelete,
  handleUpdate,
}: TaskListItemProps) => {
  const [newTaskName, setNewTaskName] = useState<string>(task.name);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleCheck = (updatedTask: Task) => {
    handleUpdate({ ...task, isDone: !updatedTask.isDone });
  };

  const handleSave = (newTaskName: string, task: Task) => {
    if (newTaskName.trim() && newTaskName !== task.name) {
      handleUpdate({ ...task, name: newTaskName });
    } else {
      setNewTaskName(task.name);
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (!task.isDone) {
    setIsEditing(true);
    };
  };

  return (
    <div className="task-list-item">
      <div className="list-item-title-checkbox">
        <input
          checked={task.isDone}
          className="checkbox"
          data-testid={`task-list-item-checkbox-${task.id}`}
          type="checkbox"
          onChange={() => handleCheck(task)}
        />
        <div className="input-container" onClick={handleEdit}>
          {isEditing ? (
            <input
              autoFocus
              className="editable-task-input"
              data-testid={`task-list-item-input-${task.id}`}
              type="text"
              value={newTaskName}
              onBlur={() => handleSave(newTaskName, task)}
              onChange={(e) => setNewTaskName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSave(newTaskName, task);
                }
              }}
            />
          ) : (
            <span
              className={`task-name ${task.isDone ? "strike-through" : ""}`}
              data-testid={`task-list-item-span-${task.id}`}
            >
              {newTaskName}
            </span>
          )}
        </div>
      </div>
      {handleDelete && (
        <div className="task-list-buttons">
          <img
            alt="Delete task"
            className="bin-icon unselectable"
            data-testid={`task-list-item-bin-${task.id}`}
            src={bin}
            onClick={() => handleDelete(task.id)}
          />
        </div>
      )}
    </div>
  );
};
