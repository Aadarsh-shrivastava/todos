import { useState, useRef, useEffect } from "react";
import { Task } from "../../types/Task";
import "./TaskListItem.css";
import bin from "../../assets/bin.svg";

interface TaskListItemProps {
  task: Task;
  handleDelete?: (taskId: number | string) => void;
  handleUpdate: (taskId: number | string, newTask: Partial<Task>) => void;
}

function TaskListItem({ task, handleDelete, handleUpdate }: TaskListItemProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>(task.name);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    handleUpdate(task.id, { ...task, name: newTaskName }); // Save the updated task name
    setIsEditing(false); // Exit editing mode
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
  };

  const handleBlur = () => {
    if (newTaskName !== task.name) {
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
  }, [newTaskName]);

  return (
    <div className="task-list-item">
      <div className="list-item-title-checkbox">
        <div
          className={`checkbox ${isChecked ? "checked" : ""}`}
          onClick={handleCheck}
        >
          {isChecked ? "✔️" : ""}
        </div>

        {isEditing ? (
          <input
            autoFocus
            className="editable-task-input"
            ref={inputRef}
            type="text"
            value={newTaskName}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        ) : (
          <span
            className={`${isChecked ? "strikethrough" : ""}`}
            onClick={handleEdit}
          >
            {task.name}
          </span>
        )}
      </div>

      {handleDelete && (
        <div className="task-list-buttons">
          <img
            alt="Delete task"
            className="button-icon"
            src={bin}
            onClick={() => handleDelete(task.id)}
          />
        </div>
      )}
    </div>
  );
}

export default TaskListItem;
