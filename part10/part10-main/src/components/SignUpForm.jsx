import React from "react";
import { View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Button from "./Button";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          testID='formikUsername'
          name='username'
          placeholder=' Username'
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name='password'
          placeholder=' Password'
          secureTextEntry
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name='confirmPassword'
          placeholder=' Confirm password'
          secureTextEntry
        />
      </View>
      <Button onPress={onSubmit}>Sign up</Button>
    </View>
  );
};

export default SignUpForm;
