import React, { act } from "react";
import { ListItem } from "./ListItem";
import { render, screen, waitFor } from "@testing-library/react";
import { useLists } from "../../contexts/ListsContext";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.mock("../../contexts/ListsContext", () => ({ useLists: jest.fn() }));

const mockDelete = jest.fn();
const mockUpdate = jest.fn();

beforeEach(() => {
  (useLists as jest.Mock).mockReturnValue({
    deleteList: mockDelete,
    updateList: mockUpdate,
  });
});

const mockList = {
  id: "list-1",
  name: "Groceries",
  taskCount: 3,
  tasks: [],
};

describe("list item components", () => {
  test("renders list name and task count", () => {
    render(<ListItem isSelected={false} list={mockList} />);
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("(3)")).toBeInTheDocument();
  });

  test("edits the name and presses Enter to save", async () => {
    render(<ListItem isSelected={false} list={mockList} />);
    await userEvent.click(screen.getByTestId("list-name-span"));

    const input = screen.getByTestId("list-name-input");
    await userEvent.clear(input);
    await userEvent.type(input, "New Name{enter}");

    expect(mockUpdate).toHaveBeenCalledWith({
      ...mockList,
      name: "New Name",
    });
  });

  test("calls updateList on blur if name changed", async () => {
    render(<ListItem isSelected={false} list={mockList} />);
    await userEvent.click(screen.getByTestId("list-name-span"));

    const input = screen.getByTestId("list-name-input");
    await userEvent.clear(input);
    await userEvent.type(input, "New Name");

    // Trigger blur
    input.blur();

    expect(mockUpdate).toHaveBeenCalledWith({
      ...mockList,
      name: "New Name",
    });
  });

  test("does not call updateList on blur if name unchanged", async () => {
    render(<ListItem isSelected={false} list={mockList} />);
    await userEvent.click(screen.getByTestId("list-name-span"));

    const input = screen.getByTestId("list-name-input");

    input.blur();

    expect(mockUpdate).not.toHaveBeenCalled();
  });

  test("clicking outside input triggers handleBlur and updateList if name changed", async () => {
    render(<ListItem isSelected={false} list={mockList} />);

    await userEvent.click(screen.getByTestId("list-name-span"));

    const input = screen.getByTestId("list-name-input");
    await userEvent.clear(input);
    await userEvent.type(input, "Updated List");

    const outside = document.createElement("div");
    document.body.appendChild(outside);

    const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true });
    await act(async () => {
      outside.dispatchEvent(mouseDownEvent);
    });

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith({
        ...mockList,
        name: "Updated List",
      });
    });
  });

  test("calls deleteList when bin icon is clicked", () => {
    render(<ListItem isSelected={false} list={mockList} />);
    screen.getByTestId("bin-icon").click();

    expect(mockDelete).toHaveBeenCalledWith("list-1");
  });

  test("applies 'selected' class when isSelected is true", () => {
    const { container } = render(
      <ListItem isSelected={true} list={mockList} />
    );
    expect(container.firstChild).toHaveClass("selected");
  });
});
