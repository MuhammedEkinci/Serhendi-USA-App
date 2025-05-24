import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
require("dotenv").config();

type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;

interface Props {
  navigation: ForgotPasswordNavigationProp;
}

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        `${process.env.LOGIN_SERVER_URL}/api/auth/forgot-password`,
        {
          email,
        }
      );
      alert("Password reset email sent!");
      navigation.navigate("Login");
    } catch (err: any) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Reset Password</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Button
        mode="contained"
        onPress={handleForgotPassword}
        style={styles.button}
      >
        Send Reset Link
      </Button>
      <Button onPress={() => navigation.navigate("Login")}>
        Back to Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  button: { marginTop: 16 },
});

export default ForgotPasswordScreen;
