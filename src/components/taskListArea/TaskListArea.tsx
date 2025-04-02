import { useLists } from "../../contexts/ListsContext";
import { List } from "../../types/List";
import { Task } from "../../types/Task";
import { TaskListItem, TaskListItemHandle } from "../taskListItem/TaskListItem";
import { AddTaskButton } from "../addTaskButton/AddTaskButon";
import "./TaskListArea.css";
import { useEffect, useRef } from "react";

export function TaskListArea() {
  const { getListByListId, currentListId, deleteTask, updateTask, addTask } =
    useLists();

  const tasksRef = useRef<Map<string | number, TaskListItemHandle | null>>(
    new Map(),
  );

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

  // Effect to auto-focus the latest added task
  useEffect(() => {
    if (list?.tasks.length) {
      const lastTask = list.tasks[list.tasks.length - 1];
      const taskElement = tasksRef.current.get(lastTask.id);
      if (taskElement) {
        taskElement.focusInput();
        console.log(taskElement, lastTask);
      }
    }
  }, [list?.tasks]);

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
                ref={(el) => {
                  if (el) {
                    tasksRef.current.set(task.id, el);
                  } else {
                    tasksRef.current.delete(task.id);
                  }
                }}
                task={task}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
