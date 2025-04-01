import { useLists } from "../../contexts/ListsContext";
import { List } from "../../types/List";
import { Task } from "../../types/Task";
import TaskListItem from "../taskListItem/TaskListItem";
import menu from "../../assets/menu.svg";
import "./TaskListArea.css";

export function TaskListArea() {
  const { getListByListId, currentListId, deleteTask } = useLists();
  const list: List | undefined = currentListId
    ? getListByListId(currentListId)
    : undefined;

  const handleDelete = (taskId: number) => {
    if (!list?.id || !taskId) return;
    deleteTask(list?.id, taskId);
  };
  return (
    <div className="taskListArea">
      <div className="header">
        <span className="header-title">{list?.name}</span>
        <img className="menu-icon" src={menu} />
      </div>
      <div className="task-list">
        {list?.tasks.map((task: Task) => (
          <TaskListItem handleDelete={handleDelete} key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
