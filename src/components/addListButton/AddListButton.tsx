import "./AddListButton.css";

interface AddListButtonInterface {
  onAddListClick: () => void;
}

export function AddListButton({ onAddListClick }: AddListButtonInterface) {
  return (
    <div className="addlist-button" onClick={onAddListClick}>
      <p className="unselectable">Add List</p>
    </div>
  );
}
