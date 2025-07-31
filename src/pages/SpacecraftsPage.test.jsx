// src/SpacecraftsPage.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SpacecraftsPage from "./SpacecraftsPage";
import ConstructPage from "./ConstructPage";
import SpaceTravelApi from "../services/SpaceTravelApi";

//Removes all mock data before each test to prevent potential errors and problems from previously fetched mockdata in the event that a future test may need to use something besides the mock data, such as the real data
describe("SpacecraftsPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
 
  //Makes sure the spacecrafts page gets the spacecraft data
  test("renders spacecraft data from API", async () => {
    vi.spyOn(SpaceTravelApi, "getSpacecrafts").mockResolvedValue({
      isError: false,
      data: [
        {
          id: 1,
          name: "Explorer I",
          capacity: 4,
          pictureUrl: "test-url"
        }
      ]
    });

    render(
      <MemoryRouter initialEntries={["/spacecrafts"]}>
        <Routes>
          <Route path="/spacecrafts" element={<SpacecraftsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/build a spacecraft/i)).toBeInTheDocument();
  });

 // tests to make sure the navigation to the construct page works
  test("navigates to construct page when clicking build button", async () => {
    vi.spyOn(SpaceTravelApi, "getSpacecrafts").mockResolvedValue({
      isError: false,
      data: []
    });

    render(
      <MemoryRouter initialEntries={["/spacecrafts"]}>
        <Routes>
          <Route path="/spacecrafts" element={<SpacecraftsPage />} />
          <Route path="/construct" element={<ConstructPage />} />
        </Routes>
      </MemoryRouter>
    );

    const button = await screen.findByRole("button", { name: /build a spacecraft/i });
    await userEvent.click(button);

    expect(
      await screen.findByText(/back/i)
    ).toBeInTheDocument(); // Something unique from the construct page
  });
});
