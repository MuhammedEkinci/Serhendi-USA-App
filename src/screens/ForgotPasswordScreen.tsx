import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button, Text, useTheme, Card } from "react-native-paper";
import axios from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import Constants from "expo-constants";

type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;

interface Props {
  navigation: ForgotPasswordNavigationProp;
}

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");

  // How to get .env variables in react native
  const { LOGIN_SERVER_URL } = Constants.expoConfig?.extra || {};

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        `${LOGIN_SERVER_URL}/api/auth/forgot-password`,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.outerContainer}
    >
      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Forgot your password?
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Enter the email associated with your account and we’ll send a link
            to reset your password.
          </Text>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleForgotPassword}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Send Reset Link
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate("Login")}
            style={styles.backButton}
          >
            Back to Login
          </Button>
        </Card.Content>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  card: {
    borderRadius: 12,
    paddingVertical: 24,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 24,
    textAlign: "center",
    color: "#555",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  button: {
    marginBottom: 8,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  backButton: {
    alignSelf: "center",
    marginTop: 8,
  },
});

export default ForgotPasswordScreen;
