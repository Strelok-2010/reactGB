import { ChatPage } from './ChatPage';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { store } from 'src/store';

describe('MessageList', () => {
  it('render component MessageList', () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ChatPage />
        </MemoryRouter>
      </Provider>
    );
  });
});
