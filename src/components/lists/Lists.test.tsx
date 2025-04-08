import React, { act } from "react";
import { Lists } from "./Lists";
import { render, screen, waitFor } from "@testing-library/react";
import { useLists } from "../../contexts/ListsContext";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { List } from "../../types/List";
import { Id } from "../../types/Id";

jest.mock("../../components/listItem/ListItem", () => ({
  ListItem: ({ list, isSelected }: { list: List; isSelected: boolean }) => (
    <div data-testid={`list-item-${list.id}`}>
      {list.name} {isSelected ? "(Selected)" : ""}
    </div>
  ),
}));

jest.mock("../../contexts/ListsContext", () => ({ useLists: jest.fn() }));

const mockUpdateCurrentListId = jest.fn();
const mockLists: List[] = [
  {
    id: "1",
    name: "Excercise",
    taskCount: 0,
    tasks: [],
  },
  {
    id: "2",
    name: "Groceries",
    taskCount: 0,
    tasks: [],
  },
  {
    id: "3",
    name: "studies",
    taskCount: 0,
    tasks: [],
  },
];

const mockCurrentListId: Id = "1";

beforeEach(() => {
  (useLists as jest.Mock).mockReturnValue({
    currentListId: mockCurrentListId,
    lists: mockLists,
    updateCurrentListId: mockUpdateCurrentListId,
  });
});

describe("list item components", () => {
  test("renders list item", () => {
    render(<Lists />);
    expect(screen.getByTestId("list-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-2")).toBeInTheDocument();
  });

  test("calls update current list id on click", async () => {
    render(<Lists />);
    await userEvent.click(screen.getByTestId("list-item-2"));
    expect(mockUpdateCurrentListId).toHaveBeenCalledWith("2");
  });
  it("passes isSelected correctly", () => {
    render(<Lists />);
    expect(screen.getByTestId("list-item-1")).toHaveTextContent("Selected");
    expect(screen.getByTestId("list-item-2")).not.toHaveTextContent("Selected");
  });
});
