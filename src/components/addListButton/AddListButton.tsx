import "./AddListButton.css";

interface AddListButtonProps {
  onAddListClick: () => void;
}

export function AddListButton({ onAddListClick }: AddListButtonProps) {
  return (
    <div className="addlist-button" onClick={onAddListClick}>
      <p className="unselectable">Add List</p>
    </div>
  );
}
