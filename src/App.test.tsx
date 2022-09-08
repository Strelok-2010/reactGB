import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { App } from "./App";

describe("App", () => {
  it("render component", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(<App />);
  });

  it("send user message", async () => {
    render(<App />);

    const input = screen.getByTestId<HTMLInputElement>("input");
    await userEvent.type(input, "Hello, world!");

    const button = screen.getByTestId("button");
    await userEvent.click(button);

    expect(screen.getAllByTestId("li").length).toBe(1);
  });

  it('bot answer', async () => {
    render(<App />);

    const input = screen.getByTestId<HTMLInputElement>('input');
    await userEvent.type(input, 'Hello, world!');

    const button = screen.getByTestId('button');
    await userEvent.click(button);

    expect(
      await screen.findByText(/Im Bot/, undefined, { timeout: 1600 })
    ).toBeInTheDocument();
  });
});
