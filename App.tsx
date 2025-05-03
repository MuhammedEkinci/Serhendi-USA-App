import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}
