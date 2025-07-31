import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

test("renders loader with spinner and text", () => {
  render(<Loader />);

  // Check for the spinner div using data-testid
  expect(screen.getByTestId("loader")).toBeInTheDocument();

  // Check for the loading text
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
