import { useLists } from "../../contexts/ListsContext";
import { List } from "../../types/List";
import { Task } from "../../types/Task";
import TaskListItem from "../taskListItem/TaskListItem";
import { AddTaskButton } from "../addTaskButton/AddTaskButon";
import "./TaskListArea.css";

export function TaskListArea() {
  const { getListByListId, currentListId, deleteTask, updateTask, addTask } =
    useLists();

  const list: List | undefined = currentListId
    ? getListByListId(currentListId)
    : undefined;

  const handleDelete = (taskId: number | string) => {
    if (!list?.id || !taskId) return;
    deleteTask(list?.id, taskId);
  };

  const handleUpdate = (taskId: number | string, task: Partial<Task>) => {
    if (list) updateTask(list?.id, taskId, task);
  };

  const addNewTask = () => {
    const newTask: Task = {
      createdAt: new Date(),
      id: crypto.randomUUID(),
      isDone: false,
      modifiedAt: new Date(),
      name: "new task",
    };
    if (list) addTask(list?.id, newTask);
  };

  return (
    <div className="taskListArea">
      {!currentListId && (
        <div className="alt-message">
          <p>Oops!!! there are no tasks here , go to a list</p>
        </div>
      )}
      {currentListId && (
        <>
          <div className="header">
            <span className="header-title">{list?.name}</span>
            <AddTaskButton onClick={addNewTask} />
          </div>
          <div className="task-list">
            {list?.tasks.map((task: Task) => (
              <TaskListItem
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                key={task.id}
                task={task}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
