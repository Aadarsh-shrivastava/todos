import { Sidebar } from "../../components/Sidebar/Sidebar";
import { TaskListArea } from "../../components/TaskListArea/TaskListArea";
import { ListsProvider } from "../../contexts/ListsContext";
import { TasksProvider } from "../../contexts/TasksContext";
import "./HomePage.css";

export function HomePage() {
  return (
    <div className="HomePage">
      <ListsProvider>
        <Sidebar />
      </ListsProvider>
      <TasksProvider>
        <TaskListArea />
      </TasksProvider>
    </div>
  );
}
