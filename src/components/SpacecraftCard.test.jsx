import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SpacecraftCard from "./SpacecraftCard";

/** 
 * @param {React.ReactElement} ui - The component to render.
 * @param {Object} [options]
 * @param {string} [options.route="/"] - The route to simulate.
 * @param {string} [options.path="*"] - The path for the Route.
 * @param {object} [options.state={}] - Optional state to push to history.
 */



function renderWithRouter(ui, { route = "/", path = "*", state = {}, extraRoutes = []} ={}) {
    window.history.pushState(state, "Test Page", route);

return render (
    <MemoryRouter initialEntries={[route]}>
        <Routes>
            <Route path={path} element={ui}/>
            {extraRoutes.map(({ path, element }, index) => (
                <Route key={index} path={path} element={element} />
            ))}
        </Routes>
    </MemoryRouter>
  );
}

describe("SpacecraftCard component", () => {

const mockShip = {
    id: 1,
    name: "Voyager 1",
    capacity: 5,
    pictureUrl: "https://example.com/voyager.jpg"
};

afterEach(() => { //After each test, reset mock data
    vi.clearAllMocks();
});

test("displays spacecraft details", () => {
    renderWithRouter(
        <SpacecraftCard spacecraft={mockShip} onDestroy={() => {}}/> //passes spacecraftcard as the ui element, passes our mockship as prop, and provides an empty arrow function to satisfy the onDestroy prop so there is no error
    )

    const img = screen.queryByRole("img"); //Query by returns null if not found, as opposed to getBy which throws an error
    const emoji = screen.queryByText("🚀"); //Query by returns null if not found, as opposed to getBy which throws an error

    expect(screen.getByText(/Name: Voyager 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacity: 5/i)).toBeInTheDocument();
    expect(img || emoji).toBeInTheDocument(); //Looks for an image or my emoji element being loaded in the DOM
});

test("navigates to single spacecraft page on image click", async () => {
  renderWithRouter(
    <SpacecraftCard spacecraft={mockShip} onDestroy={() => {}} />, 
    {
      route: "/spacecrafts",
      path: "/spacecrafts",
      extraRoutes: [
        { path: "/spacecrafts/:id", element: <div>Mock Detail Page</div> }
      ]
    }
  );

  const img = screen.queryByRole("img");
  const emoji = screen.queryByText("🚀");

  const clickable = img || emoji;
  expect(clickable).toBeInTheDocument();

  await userEvent.click(clickable);

  // ✅ Instead of checking window.location, check that the new page rendered
  expect(await screen.findByText("Mock Detail Page")).toBeInTheDocument();
});


test("calls onDestroy when destroy button is clicked", async () => {
    const mockDestroy = vi.fn();

    renderWithRouter(
        <SpacecraftCard spacecraft={mockShip} onDestroy={mockDestroy}/>
    );

    const destroyBtn = screen.getByRole("button", {name: /destroy/i});
    await userEvent.click(destroyBtn);

    expect(mockDestroy).toHaveBeenCalledWith(mockShip.id);
 });
});