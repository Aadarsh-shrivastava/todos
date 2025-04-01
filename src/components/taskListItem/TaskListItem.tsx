import { useState } from "react";
import { Task } from "../../types/Task";
import "./TaskListItem.css";
import bin from "../../assets/bin.svg";
import edit from "../../assets/edit.svg";

interface TaskListItemProps {
  task: Task;
  handleDelete: (listId: number) => void;
}

function TaskListItem({ task, handleDelete }: TaskListItemProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="task-list-item">
      <div className="list-item-title-checkbox">
        <div
          className={`checkbox ${isChecked ? "checked" : ""}`}
          onClick={handleCheck}
        >
          {isChecked ? "✔️" : ""}
        </div>
        <span className={`${isChecked ? "strikethrough" : ""}`}>
          {task.name}
        </span>
      </div>
      <div className="task-list-buttons">
        <img
          className="button-icon"
          src={bin}
          onClick={() => handleDelete(task.id)}
        />
        <img className="button-icon" src={edit} />
      </div>
    </div>
  );
}

export default TaskListItem;
