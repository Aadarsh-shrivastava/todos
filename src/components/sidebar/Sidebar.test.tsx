import { render, screen, fireEvent } from "@testing-library/react";
import { useLists } from "../../contexts/ListsContext";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Sidebar } from "./Sidebar";

beforeAll(() => {
  Object.defineProperty(global, "crypto", {
    value: {
      randomUUID: jest.fn(() => "mocked-uuid"),
    },
  });
});
jest.mock("../../contexts/ListsContext", () => ({
  useLists: jest.fn(),
}));

jest.mock("../lists/Lists", () => ({
  Lists: () => <div data-testid="mock-lists" />,
}));

jest.mock("../sidebarHeader/SidebarHeader", () => ({
  SidebarHeader: () => <div data-testid="mock-sidebar-header">To Do</div>,
}));

jest.mock("../addListButton/AddListButton", () => ({
  AddListButton: ({ onAddListClick }: { onAddListClick: () => void }) => (
    <button data-testid="mock-add-list-button" onClick={onAddListClick}>
      Add List
    </button>
  ),
}));

describe("Sidebar", () => {
  const mockAddList = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useLists as jest.Mock).mockReturnValue({
      addList: mockAddList,
    });
  });

  test("renders sidebar and child components", () => {
    render(<Sidebar />);
    expect(screen.getByTestId("mock-sidebar-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-lists")).toBeInTheDocument();
    expect(screen.getByTestId("mock-add-list-button")).toBeInTheDocument();
  });

  test("clicking menu button toggles sidebar visibility", async () => {
    render(<Sidebar />);
    const menuButton = screen.getByTestId("menu-button");
    expect(menuButton).toBeInTheDocument();

    await userEvent.click(menuButton);

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveClass("open");
  });

  test("clicking outside the sidebar closes it", () => {
    render(<Sidebar />);

    fireEvent.click(screen.getByTestId("menu-button"));
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveClass("open");

    fireEvent.mouseDown(document.body);
    expect(sidebar).toHaveClass("close");
  });

  test("clicking add list button calls addList", async () => {
    render(<Sidebar />);
    const button = screen.getByTestId("mock-add-list-button");
    await userEvent.click(button);
    expect(mockAddList).toHaveBeenCalled();
  });
});
