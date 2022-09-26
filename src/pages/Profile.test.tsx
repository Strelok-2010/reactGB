import { Profile } from './Profile';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store';

describe('Profile', () => {
  it('render component Profile', () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
  });

  it('Changing the checkbox when the button is pressed', () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    const input = screen.getByTestId<HTMLInputElement>('input');
    const button = screen.getByTestId('button');
    fireEvent.click(button);

    expect(input.checked).toBe(false);
  });

  it('Changing the name when the button is pressed', () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    const input = screen.getByTestId<HTMLInputElement>('inputName');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input.value).toBe('new value');

    const button = screen.getByTestId('buttonName');
    fireEvent.click(button);
    expect(screen.getByTestId('name').innerHTML).toBe('name: new value');
  });
});
