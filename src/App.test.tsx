import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { App } from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  it('render main page', () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(
      <MemoryRouter initialEntries={['/main']}>
        <App />
      </MemoryRouter>
    );
  });

  it('wrong url', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-url']}>
        <App />
      </MemoryRouter>
    );
    screen.debug();
    expect(screen.getByText('404 page')).toBeInTheDocument();
  });

  it('send user message', async () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(
      <MemoryRouter initialEntries={['/chats/1']}>
        <App />
      </MemoryRouter>
    );

    const input = screen.getByTestId<HTMLInputElement>('input');
    await userEvent.type(input, 'Hello, world!');

    const button = screen.getByTestId('button');
    await userEvent.click(button);

    expect(screen.getAllByTestId('li').length).toBe(2);
  });

  it('bot answer', async () => {
    render(
      <MemoryRouter initialEntries={['/chats/1']}>
        <App />
      </MemoryRouter>
    );

    const input = screen.getByTestId<HTMLInputElement>('input');
    await userEvent.type(input, 'Hello, world!');

    const button = screen.getByTestId('button');
    await userEvent.click(button);

    expect(
      await screen.findByText(/Im Bot/, undefined, { timeout: 1600 })
    ).toBeInTheDocument();
  });
});
