import { MessageList } from "./MessageList"
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('MessageList', () => {
  const arr = ([
    {
      author: 'USER',
      text: '111'
    }
  ]);

  it('render component MessageList', () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(<MessageList messages={arr} />);
    // screen.debug();

    expect(screen.getByText(/USER : 111/)).toBeInTheDocument();
  })
});