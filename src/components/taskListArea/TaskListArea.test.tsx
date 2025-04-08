import React, { act } from "react";
import { ListItem } from "./ListItem";
import { render, screen } from "@testing-library/react";
import { useLists } from "../../contexts/ListsContext";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { List } from "../../types/List";
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
  AddTaskButton: ({ onAddTaskClick }: any) => (
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

const mockUseLists = useLists as jest.Mock;

describe("first", () => {
  test("shows fallback message when no current list is selected", () => {
    mockUseLists.mockReturnValue({
      addTask: jest.fn(),
      currentListId: null,
      deleteTask: jest.fn(),
      getListByListId: jest.fn(),
      updateTask: jest.fn(),
    });

    render(<TaskListArea />);

    expect(
      screen.getByText(/Oops!!! there are no tasks here/i)
    ).toBeInTheDocument();
  });

  test("should render list name and task when a list is selected", () => {
    mockUseLists.mockReturnValue({
      addTask: jest.fn(),
      currentListId: "list-1",
      deleteTask: jest.fn(),
      getListByListId: () => mockList,
      updateTask: jest.fn(),
    });

    render(<TaskListArea />);

    expect(screen.getByText("TO DO")).toBeInTheDocument();
    expect(screen.getByText("Test List")).toBeInTheDocument();
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("should call add task when add task button is clicked", async () => {
    const mockAddTask = jest.fn();
    mockUseLists.mockReturnValue({
      addTask: mockAddTask,
      currentListId: "list-1",
      deleteTask: jest.fn(),
      getListByListId: () => mockList,
      updateTask: jest.fn(),
    });

    render(<TaskListArea />);
    const button = screen.getByTestId("mock-add-task-button");
    await userEvent.click(button);

    expect(useLists).toHaveBeenCalled();
  });

  test("calls delete function when delete is triggered ", async () => {
    const mockDeleteTask = jest.fn();

    mockUseLists.mockReturnValue({
      addTask: jest.fn(),
      currentListId: "list-1",
      deleteTask: mockDeleteTask,
      getListByListId: () => mockList,
      updateTask: jest.fn(),
    });

    render(<TaskListArea />);

    const deleteButton = screen.getByTestId("task-list-item-bin-task-1");
    await userEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith("list-1", "task-1");
  });

  test("doesnt call delete function when delete is triggered ", async () => {
    const mockDeleteTask = jest.fn();

    mockUseLists.mockReturnValue({
      addTask: jest.fn(),
      currentListId: "list-1",
      deleteTask: mockDeleteTask,
      getListByListId: () => null,
      updateTask: jest.fn(),
    });

    render(<TaskListArea />);

    expect(mockDeleteTask).not.toHaveBeenCalled();
  });

  test("calls UPDATE function when update is triggered ", async () => {
    const mockUpdateTask = jest.fn();

    mockUseLists.mockReturnValue({
      addTask: jest.fn(),
      currentListId: "list-1",
      deleteTask: jest.fn(),
      getListByListId: () => mockList,
      updateTask: mockUpdateTask,
    });

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

  test("doesnt call UPDATE function when update is triggered and list is not there ", async () => {
    const mockUpdateTask = jest.fn();

    mockUseLists.mockReturnValue({
      addTask: jest.fn(),
      currentListId: "list-1",
      deleteTask: jest.fn(),
      getListByListId: () => null, // <- no list returned
      updateTask: mockUpdateTask,
    });

    render(<TaskListArea />);

    expect(mockUpdateTask).not.toHaveBeenCalled();
  });

  test("should call deleteTask when delete button is clicked and list exists", async () => {
    const mockDeleteTask = jest.fn();

    const mockList = {
      id: "list-1",
      name: "My List",
      tasks: [
        {
          createdAt: new Date(),
          id: "task-1",
          isDone: false,
          modifiedAt: new Date(),
          name: "My Task",
        },
      ],
    };

    mockUseLists.mockReturnValue({
      addTask: jest.fn(),
      currentListId: "list-1",
      deleteTask: mockDeleteTask,
      getListByListId: () => mockList,
      updateTask: jest.fn(),
    });

    render(<TaskListArea />);

    const deleteButton = screen.getByTestId("task-list-item-bin-task-1");
    await userEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith("list-1", "task-1");
  });
});
