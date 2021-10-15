import * as React from "react";
import { render } from "../../../test/testUtils";
import { Default } from "./NewPasswordForm.stories";
import { fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

jest.mock("@aws-amplify/auth");

const inputEmail = (value: string) =>
  act(async () => {
    fireEvent.input(screen.getByRole("textbox", { name: /email address/i }), {
      target: { value },
    });
  });
const inputPassword = (value: string) =>
  act(async () => {
    fireEvent.input(screen.getByLabelText(/change your password/i), {
      target: { value },
    });
  });
const submitForm = () =>
  act(async () => {
    fireEvent.click(screen.getByRole("button", { name: /set new password/i }));
  });

describe("SignInForm", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(<Default {...Default.args} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call onSubmit prop on form submit", async () => {
    const onSubmit = jest.fn();
    render(<Default {...Default.args} onSubmit={onSubmit} />);
    await inputEmail("test@example.com");
    await inputPassword("password");
    await submitForm();
    expect(onSubmit).toBeCalled();
  });

  it("should not call onSubmit prop on empty form submit", async () => {
    const onSubmit = jest.fn();
    render(<Default {...Default.args} onSubmit={onSubmit} />);
    await submitForm();
    expect(screen.queryByText("email is a required field")).toBeTruthy();
    expect(screen.queryByText("newPassword is a required field")).toBeTruthy();
    expect(onSubmit).not.toBeCalled();
  });

  it("should check for valid email address", async () => {
    const onSubmit = jest.fn();
    render(<Default {...Default.args} onSubmit={onSubmit} />);
    await inputEmail("test");
    await inputPassword("password");
    await submitForm();
    expect(screen.queryByText("email must be a valid email")).toBeTruthy();
    expect(onSubmit).not.toBeCalled();
  });
});
