import "./AddListButton.css";

interface AddListButtonInterface {
  onClick: () => void;
}

export function AddListButton({ onClick }: AddListButtonInterface) {
  return (
    <div className="addlist-button" onClick={onClick}>
      <p className="title">Add List</p>
    </div>
  );
}
