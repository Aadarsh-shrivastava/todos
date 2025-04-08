import React from "react";
import { AddListButton } from "./AddListButton";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const mockOnAddListClick = jest.fn();

describe("add list button component", () => {
  test("render add list button with name", () => {
    render(<AddListButton onAddListClick={mockOnAddListClick} />);
    expect(screen.getByText("Add List")).toBeInTheDocument();
  });

  test("calls onAddListClick when clicked", async () => {
    render(<AddListButton onAddListClick={mockOnAddListClick} />);

    const button = screen.getByTestId("add-list-button");
    await userEvent.click(button);
    expect(mockOnAddListClick).toHaveBeenCalled();
  });
});
