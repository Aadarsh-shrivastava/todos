import React, { act } from "react";
import { TaskListItem } from "./TaskListItem";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Task } from "../../types/Task";
import userEvent from "@testing-library/user-event";

const mockDelete = jest.fn();
const mockUpdate = jest.fn();

const mockTask: Task = {
  createdAt: new Date(),
  id: "task-1",
  isDone: false,
  modifiedAt: new Date(),
  name: "potatoes",
};

describe("task item component", () => {
  test("render task name ,checkbox andbin icon", () => {
    render(
      <TaskListItem
        handleDelete={mockDelete}
        handleUpdate={mockUpdate}
        task={mockTask}
      />
    );
    const bin = screen.getByTestId("task-list-item-bin-task-1");
    const checkbox = screen.getByTestId("task-list-item-checkbox-task-1");

    expect(screen.getByText("potatoes")).toBeInTheDocument();
    expect(bin).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });

  test("edits the name and presses Enter to save", async () => {
    render(
      <TaskListItem
        handleDelete={mockDelete}
        handleUpdate={mockUpdate}
        task={mockTask}
      />
    );
    await userEvent.click(screen.getByTestId("task-list-item-span-task-1"));

    const input = screen.getByTestId("task-list-item-input-task-1");
    await userEvent.clear(input);
    await userEvent.type(input, "New Name{enter}");

    expect(mockUpdate).toHaveBeenCalledWith({
      ...mockTask,
      name: "New Name",
    });
  });

  test("call handle check on checkbox checked", async () => {
    render(
      <TaskListItem
        handleDelete={mockDelete}
        handleUpdate={mockUpdate}
        task={mockTask}
      />
    );

    await userEvent.click(screen.getByTestId("task-list-item-checkbox-task-1"));

    expect(mockUpdate).toHaveBeenCalledWith({
      ...mockTask,
      isDone: true,
    });
  });

  test("call handle delete on delete clicked", async () => {
    render(
      <TaskListItem
        handleDelete={mockDelete}
        handleUpdate={mockUpdate}
        task={mockTask}
      />
    );

    await userEvent.click(screen.getByTestId("task-list-item-bin-task-1"));

    expect(mockDelete).toHaveBeenCalledWith(mockTask.id);
  });

  test("calls updateList on blur if name changed", async () => {
    render(
      <TaskListItem
        handleDelete={mockDelete}
        handleUpdate={mockUpdate}
        task={mockTask}
      />
    );
    await userEvent.click(screen.getByTestId("task-list-item-span-task-1"));

    const input = screen.getByTestId("task-list-item-input-task-1");
    await userEvent.clear(input);
    await userEvent.type(input, "New Name");

    // Trigger blur
    act(() => {
      input.blur();
    });

    expect(mockUpdate).toHaveBeenCalledWith({
      ...mockTask,
      name: "New Name",
    });
  });

  test("does not call update on blur if name not changed", async () => {
    render(
      <TaskListItem
        handleDelete={mockDelete}
        handleUpdate={mockUpdate}
        task={mockTask}
      />
    );
    await userEvent.click(screen.getByTestId("task-list-item-span-task-1"));

    const input = screen.getByTestId("task-list-item-input-task-1");

    // Trigger blur
    act(() => {
      input.blur();
    });

    expect(mockUpdate).not.toHaveBeenCalled();
  });

  test("should add class strike through to task name", async () => {
    const updatedTask = { ...mockTask, isDone: true };

    const { rerender } = render(
      <TaskListItem
        handleDelete={mockDelete}
        handleUpdate={mockUpdate}
        task={mockTask}
      />
    );

    await userEvent.click(screen.getByTestId("task-list-item-checkbox-task-1"));

    rerender(
      <TaskListItem
        handleDelete={mockDelete}
        handleUpdate={mockUpdate}
        task={updatedTask}
      />
    );

    const name = screen.getByTestId("task-list-item-span-task-1");
    expect(name).toHaveClass("strike-through");
  });
});
