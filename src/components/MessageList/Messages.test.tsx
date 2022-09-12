import { MessageList } from './MessageList';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Chat } from 'src/types';

describe('MessageList', () => {
  const arrMessages = [
    {
      author: 'USER',
      text: '111',
    },
  ];

  it('render component MessageList', () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(
      <MessageList
        messages={arrMessages}
        chats={[]}
        onAddChat={function (chat: Chat): void {
          throw new Error('Function not implemented.');
        }}
        removeChat={function (id: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    );

    expect(screen.getByText(/USER : 111/)).toBeInTheDocument();
  });

  it('messages list is empty', () => {
    render(
      <MessageList
        messages={[]}
        chats={[]}
        onAddChat={function (chat: Chat): void {throw new Error('Function not implemented.');}} removeChat={function (id: string): void {throw new Error('Function not implemented.');}}
      />
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
      <MessageList
        messages={messages}
        chats={[]}
        onAddChat={function (chat: Chat): void {
          throw new Error('Function not implemented.');
        }}
        removeChat={function (id: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(screen.getAllByTestId('li').length).toBe(2);
    expect(screen.getAllByTestId('li')[0].innerHTML).toBe('USER : first');
    screen.debug();
  });
});
