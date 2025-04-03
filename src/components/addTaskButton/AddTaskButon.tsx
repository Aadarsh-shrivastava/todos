import "./AddTaskButton.css";

interface AddTaskButton {
  onAddTaskClick: () => void;
}

export const AddTaskButton = ({ onAddTaskClick }: AddTaskButton) => {
  return (
    <button className="fab-button" onClick={onAddTaskClick}>
      +
    </button>
  );
};
