import { useLists } from "../../contexts/ListsContext";
import TaskListItem from "../taskListItem/TaskListItem";
import "./TaskListArea.css";

interface TaskListAreaInterface {
  listId: number;
}
export function TaskListArea({ listId }: TaskListAreaInterface) {
  const { getTasksByListId } = useLists();
  const tasks = getTasksByListId(listId);

  return (
    <div className="taskListArea">
      <div className="task-list">
        {tasks?.map((task) => <TaskListItem task={task} />)}
      </div>
    </div>
  );
}
