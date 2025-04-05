import { useLists } from "../../contexts/ListsContext";
import { List } from "../../types/List";
import { Task } from "../../types/Task";
import { TaskListItem } from "../taskListItem/TaskListItem";
import { AddTaskButton } from "../addTaskButton/AddTaskButon";
import "./TaskListArea.css";
import { Id } from "../../types/Id";

export function TaskListArea() {
  const { getListByListId, currentListId, deleteTask, updateTask, addTask } =
    useLists();

  const list: List | null | undefined = currentListId
    ? getListByListId(currentListId)
    : null;

  const handleDelete = (taskId: Id) => {
    if (!list?.id || !taskId) return;
    deleteTask(list?.id, taskId);
  };

  const handleUpdate = (updatedTask: Partial<Task>) => {
    if (list) {
      updateTask(list?.id, updatedTask);
    }
  };

  const addNewTask = (list: List | null | undefined) => {
    if (list) {
      const newTask: Task = {
        createdAt: new Date(),
        id: crypto.randomUUID(),
        isDone: false,
        modifiedAt: new Date(),
        name: "new task",
      };
      addTask(list?.id, newTask);
    }
  };

  return (
    <div className="taskListArea">
      {!currentListId ? (
        <div className="alt-message">
          <p> Oops!!! there are no tasks here , go to a list </p>
        </div>
      ) : (
        <>
          <div className="headers">
            <div className={`title`}>TO DO</div>
            <div className="header">
              <span className="header-title unselectable">{list?.name}</span>
              <AddTaskButton onAddTaskClick={() => addNewTask(list)} />
            </div>
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
