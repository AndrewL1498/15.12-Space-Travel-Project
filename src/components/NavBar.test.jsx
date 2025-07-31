import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

test("renders all nav links with correct hrefs", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  // Check links by text
  expect(screen.getByText("🌏 Home")).toBeInTheDocument();
  expect(screen.getByText("🚀 Spacecrafts")).toBeInTheDocument();
  expect(screen.getByText("🪐 Planets")).toBeInTheDocument();

  // Check href attributes
  expect(screen.getByText("🌏 Home").closest("a")).toHaveAttribute("href", "/");
  expect(screen.getByText("🚀 Spacecrafts").closest("a")).toHaveAttribute("href", "/spacecrafts");
  expect(screen.getByText("🪐 Planets").closest("a")).toHaveAttribute("href", "/planets");
});
