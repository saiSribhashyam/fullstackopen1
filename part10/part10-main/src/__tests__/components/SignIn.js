import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      const { getByTestId, debug } = render(
        <SignInContainer onSubmit={onSubmit} />
      );
      debug();
      await act(async () => {
        await fireEvent.changeText(getByTestId("formikUsername"), "kalle");
      });
      await act(async () => {
        await fireEvent.changeText(getByTestId("formikPassword"), "password");
      });

      await act(async () => {
        await fireEvent.press(getByTestId("formikSubmit"));
      });

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
