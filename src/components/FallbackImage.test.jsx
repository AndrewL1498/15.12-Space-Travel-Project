import { render, screen, waitFor } from "@testing-library/react";
import FallBackImage from "./FallbackImage";

const validSrc = "https://example.com/image.jpg";
const invalidSrc = "invalid-url";

test("renders image when valid src is provided", () => {
    render(<FallBackImage src={validSrc} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", validSrc);
})

test("renders fallback emoji when invalid src is provided", () => {
    render(<FallBackImage src={invalidSrc} />);
    const emoji = screen.getByText("🚀");
    expect(emoji).toBeInTheDocument();
})
test("renders fallback emoji when no src is provided", () => {
    render(<FallBackImage />);
    const emoji = screen.getByText("🚀");
    expect(emoji).toBeInTheDocument();
})

test("renders fallback emoji when image fails to load", async () => {
  render(<FallBackImage src={validSrc} />);
  
  const image = screen.getByRole("img");
  
  // Simulate the image error event
  image.dispatchEvent(new Event("error"));
  
  // Now the fallback emoji should be rendered instead
  await waitFor(() => { // Await waits for a single promise to resolve or reject. waitFor keeps retrying the callback inside over and over again until it passes or a timeout happens (default 1000ms)
  expect((screen.getByText("🚀"))).toBeInTheDocument();
  });
});