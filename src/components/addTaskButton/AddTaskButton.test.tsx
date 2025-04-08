import React from "react";
import { AddTaskButton } from "./AddTaskButon";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const mockOnAddTaskClick = jest.fn();

describe("add task button component", () => {
  test("render add task button with name", () => {
    render(<AddTaskButton onAddTaskClick={mockOnAddTaskClick} />);

    expect(screen.getByText("+")).toBeInTheDocument();
  });

  test("calls onAddTaskClick when clicked", async () => {
    render(<AddTaskButton onAddTaskClick={mockOnAddTaskClick} />);

    const button = screen.getByTestId("add-task-button");
    await userEvent.click(button);

    expect(mockOnAddTaskClick).toHaveBeenCalled();
  });
});
