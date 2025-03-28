import { Sidebar } from "../../components/sidebar/Sidebar";
import { TaskListArea } from "../../components/taskListArea/TaskListArea";
import { ListsProvider } from "../../contexts/ListsContext";
import "./HomePage.css";

export function HomePage() {
  return (
    <ListsProvider>
      <div className="HomePage">
        <Sidebar />
        <TaskListArea />
      </div>
    </ListsProvider>
  );
}
