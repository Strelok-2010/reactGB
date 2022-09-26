import { MessageList } from './MessageList';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { MemoryRouter } from 'react-router-dom';

describe('MessageList', () => {
  const arrMessages = [
    {
      author: 'USER',
      text: '111',
    },
  ];

  const string = 'string';

  it('render component MessageList', () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MessageList messages={arrMessages} title={string} />
        </MemoryRouter>
      </Provider>
    );
    screen.debug();
    expect(screen.getByText(/USER : 111/)).toBeInTheDocument();
  });

  it('messages list is empty', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MessageList messages={[]} title={string} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryAllByRole('li').length).toBe(0);
  });

  it('messages list length is 2', () => {
    const messages = [
      {
        author: 'USER',
        text: 'first',
      },
      {
        author: 'USER',
        text: 'second',
      },
    ];
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MessageList messages={messages} title={string} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByTestId('li').length).toBe(2);
    expect(screen.getAllByTestId('li')[0].innerHTML).toBe('USER : first');
  });
});
