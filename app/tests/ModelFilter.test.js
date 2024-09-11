import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModelFilter from "../components/ModelFilter";

describe("ModelFilter Component", () => {
  const mockSetSelectedModels = jest.fn();

  const models = ["Model A", "Model B", "Model C"];

  test("renders with initial models and search input", () => {
    render(
      <ModelFilter
        models={models}
        selectedModels={[]}
        setSelectedModels={mockSetSelectedModels}
      />
    );

    expect(screen.getByText("Model")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();

    models.forEach((model) => {
      expect(screen.getByText(model)).toBeInTheDocument();
    });
  });

  test("filters models based on search input", () => {
    render(
      <ModelFilter
        models={models}
        selectedModels={[]}
        setSelectedModels={mockSetSelectedModels}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "Model A" },
    });

    expect(screen.getByText("Model A")).toBeInTheDocument();
    expect(screen.queryByText("Model B")).not.toBeInTheDocument();
    expect(screen.queryByText("Model C")).not.toBeInTheDocument();
  });

  test("calls setSelectedModels when a model checkbox is clicked", () => {
    render(
      <ModelFilter
        models={models}
        selectedModels={[]}
        setSelectedModels={mockSetSelectedModels}
      />
    );

    fireEvent.click(screen.getByLabelText("Model A"));

    expect(mockSetSelectedModels).toHaveBeenCalledWith(["Model A"]);
  });

  test("calls setSelectedModels to deselect a model when checkbox is clicked again", () => {
    render(
      <ModelFilter
        models={models}
        selectedModels={["Model A"]}
        setSelectedModels={mockSetSelectedModels}
      />
    );

    fireEvent.click(screen.getByLabelText("Model A"));

    expect(mockSetSelectedModels).toHaveBeenCalledWith([]);
  });
});
