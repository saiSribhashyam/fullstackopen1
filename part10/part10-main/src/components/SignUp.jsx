import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-native";
import * as yup from "yup";
import SignUpForm from "./SignUpForm";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("username is required")
    .min(1, "Minimum length is 1")
    .max(30, "Max length is 30"),
  password: yup
    .string()
    .required("password is required")
    .min(5, "Minimum length is 5")
    .max(50, "Max length is 50"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords do not match")
    .required("Password confirm is required"),
});

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(username, password);

    await signUp({ username, password });
    await signIn({ username, password });
    history.push("/");
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
