import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlanetsPage from "./PlanetsPage";
import SpaceTravelApi from "../services/SpaceTravelApi";

// Mock the API
vi.mock("../services/SpaceTravelApi"); //creates a mock for the SpaceTravelApi module

beforeEach(() => { //Ensures any leftover mocks from previous tests are cleared
  vi.clearAllMocks();
});

//We choose to do a synchronus function so this runs immedietely on render before useEffect has completed and set loading to true
describe("PlanetsPage", () => {
  test("shows loader while fetching data", () => {
    // Don’t resolve promises yet so it's still loading
    SpaceTravelApi.getPlanets.mockResolvedValue({ isError: false, data: [] });
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({ isError: false, data: [] });

    render(<PlanetsPage />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  
  //Makes sure the planets are rendered after the data is fetched
  test("renders planets after fetch", async () => {
    SpaceTravelApi.getPlanets.mockResolvedValue({
      isError: false,
      data: [{ id: 1, name: "Mars", currentPopulation: 10, pictureUrl: "mars.png" }],
    });
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({ isError: false, data: [] });

    render(<PlanetsPage />);

    await waitFor(() => {
      expect(screen.getByText("Mars")).toBeInTheDocument();
      expect(screen.getByText("10")).toBeInTheDocument();
    });
  });


test("selects a planet when clicked", async () => {
  SpaceTravelApi.getPlanets.mockResolvedValue({
    isError: false,
    data: [
      { 
        id: 1, 
        name: "Mars", 
        currentPopulation: 10, 
        pictureUrl: "https://example.com/mars.png" 
      }
    ],
  });
  SpaceTravelApi.getSpacecrafts.mockResolvedValue({ isError: false, data: [] });

  render(<PlanetsPage />);

  // Try to get the card container
  const mars = await screen.findByText("Mars");
  const marsCard = mars.closest("div");

  // Now try clicking the card
  await userEvent.click(marsCard);

  expect(marsCard.className).toMatch(/selectedPlanetCard/); //expect the div to have a class name that includes 'selectedPlanetCard'. Due to the styling of the class with CSS, it my render in the DOM looking something like this: <div class="_selectedPlanetCard_a2f3ec"></div>, instead of class="selectedPlanetCard"

});



  test("renders spacecrafts inside Earth’s card", async () => {
  SpaceTravelApi.getPlanets.mockResolvedValue({
    isError: false,
    data: [
      { id: 1, name: "Earth", currentPopulation: 100000, pictureUrl: "earth.png" },
    ],
  });
  SpaceTravelApi.getSpacecrafts.mockResolvedValue({
    isError: false,
    data: [
      { id: 42, name: "Apollo", capacity: 5, currentLocation: 1, pictureUrl: "apollo.png" },
    ],
  });

  render(<PlanetsPage />);

  // Find the Earth planet card
  const earth = await screen.findByText("Earth");
 const earthCard = earth.closest("div[class*='planetCard']");


  // Ensure spacecraft is displayed inside Earth’s card
  expect(within(earthCard).getByText("Apollo")).toBeInTheDocument();
  expect(within(earthCard).getByText("5")).toBeInTheDocument();
});



test("shows spacecrafts on their planet", async () => {
    SpaceTravelApi.getPlanets.mockResolvedValue({
      isError: false,
      data: [{ id: 1, name: "Mars", currentPopulation: 10, pictureUrl: "mars.png" }],
    });
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({
      isError: false,
      data: [
        { id: 42, name: "Apollo", capacity: 5, currentLocation: 1, pictureUrl: "apollo.png" },
      ],
    });

    render(<PlanetsPage />);
    await screen.findByText("Mars");

    expect(screen.getByText("Apollo")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
  

  test("clicking spacecraft calls sendSpacecraftToPlanet", async () => {
    SpaceTravelApi.getPlanets.mockResolvedValue({
      isError: false,
      data: [{ id: 1, name: "Mars", currentPopulation: 10, pictureUrl: "mars.png" }],
    });
SpaceTravelApi.getSpacecrafts.mockResolvedValue({
  isError: false,
  data: [
    { id: 42, name: "Apollo", capacity: 5, currentLocation: 1, pictureUrl: "https://example.com/apollo.png" },
  ],
});

    SpaceTravelApi.sendSpacecraftToPlanet = vi.fn().mockResolvedValue({ isError: false });

    render(<PlanetsPage />);
    const mars = await screen.findByText("Mars");
    await userEvent.click(mars);

  const spacecraft = await screen.findByAltText("Apollo");
await userEvent.click(spacecraft);


    expect(SpaceTravelApi.sendSpacecraftToPlanet).toHaveBeenCalledWith({
      spacecraftId: 42,
      targetPlanetId: 1,
    });
  });
});
