import * as React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../../test/testUtils";
import {
  Default,
  SignInForm,
  NewPasswordForm,
  ErrorForm,
} from "./LoginForm.stories";

describe("LoginForm", () => {
  it("matches default snapshot", () => {
    const { asFragment } = render(<Default {...Default.args} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches sign in form snapshot", () => {
    const { asFragment } = render(<SignInForm {...SignInForm.args} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches new password form snapshot", () => {
    const { asFragment } = render(
      <NewPasswordForm {...NewPasswordForm.args} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches error form snapshot", () => {
    const { asFragment } = render(<ErrorForm {...ErrorForm.args} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call onSubmit prop on Sign In button click", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    render(<SignInForm {...SignInForm.args} onSubmit={onSubmit} />);
    const submitButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitButton);
    expect(onSubmit).toBeCalled();
  });

  it("should call onSubmit prop on Set new password button click", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    render(<NewPasswordForm {...NewPasswordForm.args} onSubmit={onSubmit} />);
    const submitButton = screen.getByRole("button", {
      name: /set new password/i,
    });
    fireEvent.click(submitButton);
    expect(onSubmit).toBeCalled();
  });
});
