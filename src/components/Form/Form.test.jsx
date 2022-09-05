import { Form } from "./Form"
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Form', () => {

  it('activation of the button when the text is entered', () => {
    const value = '23';
    render(<Form />);
    const inputEl = screen.getByPlaceholderText("текст");
    const inputBtn = screen.getByRole('button');
    fireEvent.change(inputEl, { target: { value: value } })

    expect(inputBtn).toBeEnabled(); //toBeDisabled() toBeEnabled()
    screen.debug();
  })
});
