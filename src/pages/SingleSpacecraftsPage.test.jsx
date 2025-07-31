import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import SingleSpacecraftPage from "../pages/SingleSpacecraftPage";
import SpaceTravelApi from "../services/SpaceTravelApi";

vi.mock("../services/SpaceTravelApi");

// ✅ Local renderWithRouter utility defined here
function renderWithRouter(ui, { route = "/", state = {}, routes = [<Route path="*" element={ui} />] } = {}) {
  window.history.pushState({ state }, "Test", route);

  return render(
    <MemoryRouter initialEntries={[{ pathname: route, state }]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}

//Clear all usage data from mocks created via vi.fn(), vi.spyOn(), or module mocks before each test but does not remove mock implementation. So in this function I am saying "before each test, make sure this function resolves with { a mock spacecraft }"
describe("SingleSpacecraftPage", () => {
  const mockSpacecraft = {
    id: 1,
    name: "Apollo",
    capacity: 5000,
    description: "A powerful test ship.",
    pictureUrl: "http://example.com/image.jpg"
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });


  test("displays loading spinner initially", () => {
    // Don’t resolve the promise to simulate loading
    SpaceTravelApi.getSpacecraftById.mockReturnValue(new Promise(() => {}));

    renderWithRouter(<SingleSpacecraftPage />, { route: "/spacecrafts/1" });

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("displays spacecraft data on success", async () => {
    SpaceTravelApi.getSpacecraftById.mockResolvedValue({
      isError: false,
      data: mockSpacecraft
    });

    renderWithRouter(<SingleSpacecraftPage />, { route: "/spacecrafts/1" });

    expect(await screen.findByText("Apollo")).toBeInTheDocument();
    expect(screen.getByText(/Capacity: 5000/i)).toBeInTheDocument();
    expect(screen.getByText(/Description:/i)).toBeInTheDocument();
    expect(screen.getByAltText("Apollo")).toBeInTheDocument();
  });

  test("displays error message on API failure (rejected promise)", async () => {
    SpaceTravelApi.getSpacecraftById.mockRejectedValue(new Error("Network Error")); //throws a mock error
    renderWithRouter(<SingleSpacecraftPage />, { route: "/spacecrafts/1" });
    expect(await screen.findByText(/Failed to load spacecraft/i)).toBeInTheDocument(); //looks for the "failed to load spacecraft" text on screen
  });

  test("displays 'No spacecraft found' when API returns isError true", async () => {
    SpaceTravelApi.getSpacecraftById.mockResolvedValue({
      isError: true, //Since there is an error, that means the mock value never returned
      data: "Not found"
    });

    renderWithRouter(<SingleSpacecraftPage />, { route: "/spacecrafts/1" });

    expect(await screen.findByText(/No spacecraft found/i)).toBeInTheDocument();
  });
});
