import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

// https://blog.jarrodwatts.com/how-to-set-up-nextjs-with-jest-react-testing-library-and-playwright
describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /todo/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
