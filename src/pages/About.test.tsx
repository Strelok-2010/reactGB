import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { About } from './About';

describe('About', () => {
  it('Initial state flag', () => {
    render(
      <Provider store={store}>
        <About />
      </Provider>
    );
  });
});
