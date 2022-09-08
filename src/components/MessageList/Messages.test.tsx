import { MessageList } from "./MessageList";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("MessageList", () => {
  const arr = [
    {
      author: "USER",
      text: "111",
    },
  ];

  it("render component MessageList", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(<MessageList messages={arr} />);

    expect(screen.getByText(/USER : 111/)).toBeInTheDocument();
    screen.debug();
  });

  it("messages list is empty", () => {
    render(<MessageList messages={[]} />);
    expect(screen.queryAllByRole("li").length).toBe(0);
  });

  it("messages list length is 2", () => {
    const messages = [
      {
        author: 'USER',
        text: "first",
      },
      {
        author: 'USER',
        text: "second",
      },
    ];
    render(<MessageList messages={messages} />);
    expect(screen.getAllByTestId("li").length).toBe(2);
    expect(screen.getAllByTestId("li")[0].innerHTML).toBe("USER : first");
    screen.debug();
  });
});
