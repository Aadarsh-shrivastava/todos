import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Task } from "../../types/Task";
import bin from "../../assets/bin.svg";
import "./TaskListItem.css";

export interface TaskListItemHandle {
  focusInput: () => void;
}

interface TaskListItemProps {
  task: Task;
  handleDelete: (taskId: string | number) => void;
  handleUpdate: (taskId: string | number, task: Partial<Task>) => void;
}
export const TaskListItem = forwardRef<TaskListItemHandle, TaskListItemProps>(
  ({ task, handleDelete, handleUpdate }, ref) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newTaskName, setNewTaskName] = useState<string>(task.name);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCheck = () => {
      setIsChecked((prev) => !prev);
    };

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleSave = () => {
      if (newTaskName.length > 0)
        handleUpdate(task.id, { ...task, name: newTaskName });
      else setNewTaskName(task.name);
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

    useImperativeHandle(ref, () => ({
      focusInput: () => {
        if (inputRef.current) {
          console.log("asdas", inputRef);
          inputRef.current.focus();
        }
      },
    }));

    return (
      <div className="task-list-item">
        <div className="list-item-title-checkbox">
          <div
            className={`checkbox ${isChecked ? "checked" : ""}`}
            onClick={handleCheck}
          >
            {isChecked ? "✔️" : ""}
          </div>

          {!isEditing ? (
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
  },
);
