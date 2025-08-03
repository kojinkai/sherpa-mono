import { render } from "@testing-library/react";
import { Loader } from "./loader";

const setup = () => render(<Loader />);

describe("The Loader component", () => {
  it("displays a loading spinner", () => {
    const { getByRole } = setup();

    expect(getByRole("alert")).toBeInTheDocument();
  });
});
