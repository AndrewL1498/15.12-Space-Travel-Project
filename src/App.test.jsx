// App.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import SpaceTravelApi from "./services/SpaceTravelApi";

test("renders HomePage at root path", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/cradle/i)).toBeInTheDocument(); // Unique to HomePage
});


//Testing to make sure spacecrafts page is loading
test("renders SpacecraftPage at /spacecrafts", async () => {
  // Mock API call
  vi.spyOn(SpaceTravelApi, "getSpacecrafts").mockResolvedValue({
    isError: false,
    data: [
      {
        id: 1,
        name: "Explorer 1",
        capacity: 5,
        // Add any other expected spacecraft properties
      }
    ]
  });

  render(
    <MemoryRouter initialEntries={["/spacecrafts"]}>
      <App />
    </MemoryRouter>
  );

  // Look for some stable text — "Build A Spacecraft" button or spacecraft name
  const buildButton = await screen.findByText(/build a spacecraft/i);
  expect(buildButton).toBeInTheDocument();
});

//Testing to make sure planets page is loading
test("renders PlanetsPage at /planets", async () => {
  vi.spyOn(SpaceTravelApi, "getPlanets").mockResolvedValue({
    isError: false,
    data: [
      { id: 1, name: "Earth", currentPopulation: 100000, pictureUrl: "some-url" },
      // add any mock planets here
    ]
  });
  vi.spyOn(SpaceTravelApi, "getSpacecrafts").mockResolvedValue({
    isError: false,
    data: []
  });

  render(
    <MemoryRouter initialEntries={["/planets"]}>
      <App />
    </MemoryRouter>
  );

  const planetsPage = await screen.findByTestId("planets-page");
  expect(planetsPage).toBeInTheDocument();
});