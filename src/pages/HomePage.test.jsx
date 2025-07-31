import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage"; // adjust path if needed

test("renders HomePage component", () => {
  render(<HomePage />);
  // example check — replace with something real from your component
  const element = screen.getByText(/welcome/i);
  expect(element).toBeInTheDocument();
});
