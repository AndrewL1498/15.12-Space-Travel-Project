// ConstructPage.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ConstructPage from "./ConstructPage";
import SpacecraftsPage from "./SpacecraftsPage";
import SpaceTravelApi from "../services/SpaceTravelApi";

//Mocks the spacetravel api. In addition it also loads the actual module in case we want to access real parts of the module instead of mocked ones
vi.mock("../services/SpaceTravelApi", async () => { //creates a mock version of the api
  const actual = await vi.importActual("../services/SpaceTravelApi"); //creates a real version of the api so we can access parts of it
  return {
    __esModule: true, //Tells Vitest that this mock should act like an ES module
    default: { //Creates a default export for our mock module
      ...actual.default, //import all functions from the SpaceTravelApi
      buildSpacecraft: vi.fn(), //Create mock version of build spacecraft
      getSpacecrafts: vi.fn() //Create mock version getSpacecrafts
    }
  };
});

function renderWithRouter(ui, { route = "/construct", state = {} } = {}) { //Has two parameters: ui and an object destructure. If no second argument is passed, it defaults to an empty object that gets destructered to be route = "/construct", state = {}. If route or state is provided, or both, it can destructured.
  window.history.pushState({ state }, "Test", route); //Pushes the Url and state to the history like we passed totalCapacity state with useLocation in my spacecraftsPage and Construct page
  return render(  

// MemoryRouter simulates routing for testing purposes.`initialEntries` sets the starting history stack with a pathname and optional state, mimicking a real navigation event (e.g., user landed on "/construct" with state like totalCapacity).
    <MemoryRouter initialEntries={[{ pathname: route, state }]}>  
      <Routes>
        <Route path="/construct" element={ui} />
        <Route path="/spacecrafts" element={<SpacecraftsPage />} />
      </Routes>
    </MemoryRouter>
  );
}

//Clear all usage data from mocks created via vi.fn(), vi.spyOn(), or module mocks before each test but does not remove mock implementation. So in this function I am saying "before each test, make sure this function resolves with { isError: false, data: {} }"
describe("ConstructPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({ isError: false, data: [] });
  });

  test("navigates to spacecrafts on 'Back' button click", async () => {
    renderWithRouter(<ConstructPage />); // Calls renderWithRouter to render ConstructPage inside a MemoryRouter, simulating a visit to the "/construct" route with default state ({}).
    const backBtn = screen.getByRole("button", { name: /back/i }); //Selects the button element with accessible name matching "back" (case-insensitive). This verifies the button is rendered and allows interaction in the test
    await userEvent.click(backBtn); //Awaits the button click before moving onto the next part of the function
    expect(await screen.findByText(/build a spacecraft/i)).toBeInTheDocument(); //Expects to land on a page that has the text "build a spacecraft". 
  });

  test("successful build calls API and navigates", async () => {
    SpaceTravelApi.buildSpacecraft.mockResolvedValue({ isError: false }); //Makes mock value
    renderWithRouter(<ConstructPage />, { state: { totalCapacity: 0 } }); //passes construct page and state to render with router

    //Searches for rendered UI with a placeholder text types text into that element and wait for it to be finished before moving onto the next function
    await userEvent.type(screen.getByPlaceholderText(/name/i), "Apollo");
    await userEvent.type(screen.getByPlaceholderText(/capacity/i), "5000");
    await userEvent.type(screen.getByPlaceholderText(/description/i), "Test ship");
    await userEvent.type(screen.getByPlaceholderText(/picture url/i), "http://test.com/image.jpg");

    await userEvent.click(screen.getByRole("button", { name: /build/i })); //awaits the build button click before moving onto the next part of the function

    expect(SpaceTravelApi.buildSpacecraft).toHaveBeenCalledWith({ //Expects that the mock function SpaceTravelApi.buildSpacecraft was called once and that it was called with this exact object as the argument
      name: "Apollo",
      capacity: 5000,
      description: "Test ship",
      pictureUrl: "http://test.com/image.jpg",
    });

    expect(await screen.findByText(/build a spacecraft/i)).toBeInTheDocument(); //expects to be routed to the spacecrafts page with the "build a spacecraft" button
  });

  test("shows error for name < 3 characters", async () => {
    renderWithRouter(<ConstructPage />, { state: { totalCapacity: 0 } });
    await userEvent.type(screen.getByPlaceholderText(/name/i), "Ap"); //Types text in the name input that is less than 3 characters
    await userEvent.click(screen.getByRole("button", { name: /build/i })); //clicks the build button
    expect(screen.getByText(/name must be at least 3 characters/i)).toBeInTheDocument(); //expects the text "name must be at least 3 characters" on screen
  });

  test("shows error if capacity is empty", async () => {
    renderWithRouter(<ConstructPage />, { state: { totalCapacity: 0 } });
    await userEvent.type(screen.getByPlaceholderText(/name/i), "Apollo"); //types a name in the name input
    await userEvent.click(screen.getByRole("button", { name: /build/i })); //clicks the build button
    expect(screen.getByText(/capacity is required/i)).toBeInTheDocument(); //looks for "capacity is required" text on screen
  });

  test("shows error if capacity is not a number", async () => {
    renderWithRouter(<ConstructPage />, { state: { totalCapacity: 0 } });
    await userEvent.type(screen.getByPlaceholderText(/capacity/i), "five thousand"); //types text in the capacity input as opposed to a number
    await userEvent.click(screen.getByRole("button", { name: /build/i })); //clicks the build button
    expect(screen.getByText(/capacity must be a number/i)).toBeInTheDocument(); //looks for "capacity must be a number" text on screen
  });

  test("shows error if capacity <= 0", async () => {
    renderWithRouter(<ConstructPage />, { state: { totalCapacity: 0 } });
    await userEvent.type(screen.getByPlaceholderText(/capacity/i), "0"); //types text in the capacity input as 0
    await userEvent.click(screen.getByRole("button", { name: /build/i })); //clicks the build button
    expect(screen.getByText(/capacity must be greater than 0/i)).toBeInTheDocument(); //looks for "capacity must be greater than 0" text on screen
  });

  test("shows error if description is empty", async () => {
    renderWithRouter(<ConstructPage />, { state: { totalCapacity: 0 } });
    await userEvent.type(screen.getByPlaceholderText(/name/i), "Apollo"); //types text in the name input as Apollo
    await userEvent.type(screen.getByPlaceholderText(/capacity/i), "5000"); //types text in the capacity input as 5000
    await userEvent.click(screen.getByRole("button", { name: /build/i })); //clicks the build button
    expect(screen.getByText(/description is required/i)).toBeInTheDocument(); //looks for "description is required" text on screen
  });

  test("shows error if totalCapacity + capacity > 100000", async () => {
    renderWithRouter(<ConstructPage />, { state: { totalCapacity: 99000 } });
    await userEvent.type(screen.getByPlaceholderText(/name/i), "Apollo"); //types text in the name input as Apollo
    await userEvent.type(screen.getByPlaceholderText(/capacity/i), "2000"); //types text in the capacity input as 2000
    await userEvent.type(screen.getByPlaceholderText(/description/i), "Over limit"); //types text in the description input as Over limit
    await userEvent.click(screen.getByRole("button", { name: /build/i })); //clicks the build button
    expect(screen.getByText(/total capacity limit of 100,000 reached/i)).toBeInTheDocument(); //looks for "total capacity limit of 100,000 reached" text on screen
  });

test("handles API rejection (e.g. network error) gracefully", async () => {
  SpaceTravelApi.buildSpacecraft.mockRejectedValue(new Error("Network Error")); //mocks rejected value and creates a new error when the button is clicked
  
  renderWithRouter(<ConstructPage />, { state: { totalCapacity: 0 } });

  await userEvent.type(screen.getByPlaceholderText(/name/i), "Apollo");
  await userEvent.type(screen.getByPlaceholderText(/capacity/i), "5000");
  await userEvent.type(screen.getByPlaceholderText(/description/i), "Fails");

  await userEvent.click(screen.getByRole("button", { name: /build/i })); //clicks the build button

  expect(SpaceTravelApi.buildSpacecraft).toHaveBeenCalled(); //expects the buildSpacecraft function to have been called
  expect(screen.queryByText(/spacecrafts/i)).not.toBeInTheDocument(); //Expects not to go to the spacecrafts page. We use query selector to avoid an error and the test crashing when spacecrafts isn't found
});

});

