import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

const linking = {
  prefixes: ["serhendi-usa-app://", "https://www.serhendiusa.com"],
  config: {
    screens: {
      Login: "login",
      Signup: "signup",
      ForgotPassword: "forgot-password",
      ResetPassword: "reset-password", // maps to /reset-password?token=...
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <AppNavigator />
    </NavigationContainer>
  );
}
