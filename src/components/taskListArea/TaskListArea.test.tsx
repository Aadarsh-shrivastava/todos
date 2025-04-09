import React from "react";
import { render, screen } from "@testing-library/react";
import { useLists } from "../../contexts/ListsContext";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { TaskListArea } from "./TaskListArea";

beforeAll(() => {
  Object.defineProperty(global, "crypto", {
    value: {
      randomUUID: jest.fn(() => "mocked-uuid"),
    },
  });
});

jest.mock("../../contexts/ListsContext", () => ({ useLists: jest.fn() }));

jest.mock("../addTaskButton/AddTaskButon", () => ({
  AddTaskButton: ({ onAddTaskClick }: { onAddTaskClick: () => void }) => (
    <button data-testid="mock-add-task-button" onClick={onAddTaskClick}>
      +
    </button>
  ),
}));

const mockList = {
  id: "list-1",
  name: "Test List",
  taskCount: 1,
  tasks: [
    {
      createdAt: "2025-04-08T17:10:49.469Z",
      id: "task-1",
      isDone: false,
      modifiedAt: "2025-04-08T17:10:49.469Z",
      name: "Test Task",
    },
  ],
};
const mockDeleteTask = jest.fn();
const mockUpdateTask = jest.fn();
const mockAddTask = jest.fn();

const mockUseLists = useLists as jest.Mock;
const baseMockReturnValue = {
  addTask: mockAddTask,
  currentListId: "list-1",
  deleteTask: mockDeleteTask,
  getListByListId: () => mockList,
  updateTask: mockUpdateTask,
};

describe("first", () => {
  beforeEach(() => {
    mockUseLists.mockReturnValue({ ...baseMockReturnValue });
  });

  test("shows fallback message when no current list is selected", () => {
    mockUseLists.mockReturnValue({
      ...baseMockReturnValue,
      currentListId: null,
    });

    render(<TaskListArea />);

    expect(
      screen.getByText(/Oops!!! there are no tasks here/i)
    ).toBeInTheDocument();
  });

  test("should render list name and task when a list is selected", () => {
    render(<TaskListArea />);

    expect(screen.getByText("TO DO")).toBeInTheDocument();
    expect(screen.getByText("Test List")).toBeInTheDocument();
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("should call add task when add task button is clicked", async () => {
    render(<TaskListArea />);
    const button = screen.getByTestId("mock-add-task-button");
    await userEvent.click(button);

    expect(useLists).toHaveBeenCalled();
  });

  test("calls delete function when delete is triggered ", async () => {
    render(<TaskListArea />);

    const deleteButton = screen.getByTestId("task-list-item-bin-task-1");
    await userEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith("list-1", "task-1");
  });

  test("doesnt call delete function when delete is triggered ", async () => {
    mockUseLists.mockReturnValue({
      ...baseMockReturnValue,
      getListByListId: () => null,
    });

    render(<TaskListArea />);

    expect(mockDeleteTask).not.toHaveBeenCalled();
  });

  test("calls UPDATE function when update is triggered ", async () => {
    render(<TaskListArea />);

    const name = screen.getByTestId("task-list-item-span-task-1");
    await userEvent.click(name);
    const input = screen.getByTestId("task-list-item-input-task-1");
    await userEvent.clear(input);
    await userEvent.type(input, "New Name{Enter}");

    expect(mockUpdateTask).toHaveBeenCalledWith("list-1", {
      ...mockList.tasks[0],
      name: "New Name",
    });
  });
});
