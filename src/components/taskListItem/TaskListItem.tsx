import { useState, useRef } from "react";
import { Task } from "../../types/Task";
import bin from "../../assets/bin.svg";
import "./TaskListItem.css";
import { Id } from "../../types/Id";

export interface TaskListItemHandle {
  focusInput: () => void;
}

interface TaskListItemProps {
  task: Task;
  handleDelete: (taskId: string | number) => void;
  handleUpdate: (taskId: string | number, task: Partial<Task>) => void;
}

export const TaskListItem = ({
  task,
  handleDelete,
  handleUpdate,
}: TaskListItemProps) => {
  const [newTaskName, setNewTaskName] = useState<string>(task.name);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheck = (taskId: Id, isChecked: boolean) => {
    handleUpdate(taskId, { isDone: !isChecked });
  };

  const handleSave = (newTaskName: string, task: Task) => {
    if (newTaskName.trim()) {
      handleUpdate(task.id, { ...task, name: newTaskName });
    } else {
      setNewTaskName(task.name);
    }
    setIsEditing(false);
  };

  return (
    <div className="task-list-item">
      <div className="list-item-title-checkbox">
        <input
          checked={task.isDone}
          className="checkbox"
          type="checkbox"
          onChange={() => handleCheck(task.id, task.isDone)}
        />
        <div className="input-container" onClick={() => setIsEditing(true)}>
          {isEditing ? (
            <input
              autoFocus
              className="editable-task-input"
              ref={inputRef}
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
            className="button-icon unselectable"
            src={bin}
            onClick={() => handleDelete(task.id)}
          />
        </div>
      )}
    </div>
  );
};
