import { Form } from "./Form";
import { render, screen, fireEvent, getByRole } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";

describe("Form", () => {
  let addMessage: jest.Mock<any, any>;

  beforeEach(() => {
    addMessage = jest.fn();
    render(<Form addMessage={addMessage} />);
  });

  it('render component', () => {

  });

  it('input change with fireevent', () => {
    const inputEl = screen.getByTestId<HTMLInputElement>('input');

    fireEvent.change(inputEl, { target: { value: 'new value' } });
    expect(inputEl.value).toBe('new value');
  });

  it('input change with userevent', async () => {
    const inputEl = screen.getByTestId<HTMLInputElement>('input');

    await userEvent.type(inputEl, 'Hello world');
    expect(inputEl.value).toBe('Hello world');
  });

  it('button click with fireEvent', () => {
    const input = screen.getByTestId<HTMLInputElement>('input');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input.value).toBe('new value');

    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(addMessage).toHaveBeenCalledTimes(1);
  });


  it("activation of the button when the text is entered", () => {
    const value = "23";
    const inputEl = screen.getByTestId<HTMLInputElement>('input')
    const inputBtn = screen.getByRole("button");
    fireEvent.change(inputEl, { target: { value: value } });

    expect(inputBtn).toBeEnabled();
  });
});
