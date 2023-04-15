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

const SignInForm = ({ onSubmit }) => {
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
          testID='formikPassword'
        />
      </View>
      <Button testID='formikSubmit' onPress={onSubmit}>
        Sign in
      </Button>
    </View>
  );
};

export default SignInForm;
