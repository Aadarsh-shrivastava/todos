import "./AddTaskButton.css";

export const AddTaskButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="fab-button" onClick={onClick}>
      +
    </button>
  );
};
