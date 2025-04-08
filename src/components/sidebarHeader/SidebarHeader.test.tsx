import { render, screen } from "@testing-library/react";
import { SidebarHeader } from "./SidebarHeader";
import React from "react";

describe("SidebarHeader", () => {
  test("renders the sidebar header with correct text", () => {
    render(<SidebarHeader />);
    const header = screen.getByText("To Do");

    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("sidebar-header");
    expect(header).toHaveClass("unselectable");
  });
});
