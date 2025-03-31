import { useState } from "react";
import { Task } from "../../types/Task";
import "./TaskListItem.css";

interface TaskListItemProps {
  task: Task;
}

function TaskListItem({ task }: TaskListItemProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="task-list-item">
      <div
        className={`checkbox ${isChecked ? "checked" : ""}`}
        onClick={handleCheck}
      >
        {isChecked ? "✔️" : ""}
      </div>
      {task.name}
    </div>
  );
}

export default TaskListItem;
