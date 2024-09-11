import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sort from "../components/Sort";

describe("Sort Component", () => {
  const mockOnSortChange = jest.fn();

  test("renders with initial sort option selected", () => {
    render(<Sort onSortChange={mockOnSortChange} />);

    expect(screen.getByLabelText("Old to new")).toBeChecked();
  });

  test("calls onSortChange when a sort option is selected", () => {
    render(<Sort onSortChange={mockOnSortChange} />);

    fireEvent.click(screen.getByLabelText("New to old"));

    expect(mockOnSortChange).toHaveBeenCalledWith("newToOld");
  });

  test("updates selected option correctly when a different option is selected", () => {
    render(<Sort onSortChange={mockOnSortChange} />);

    expect(screen.getByLabelText("Old to new")).toBeChecked();

    fireEvent.click(screen.getByLabelText("Price high to low"));

    expect(screen.getByLabelText("Price high to low")).toBeChecked();
  });
});
