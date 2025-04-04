import "./AddTaskButton.css";

interface AddTaskButtonProps {
  onAddTaskClick: () => void;
}

export const AddTaskButton = ({ onAddTaskClick }: AddTaskButtonProps) => {
  return (
    <button className="fab-button" onClick={onAddTaskClick}>
      +
    </button>
  );
};
