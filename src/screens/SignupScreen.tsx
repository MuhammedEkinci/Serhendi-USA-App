import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import axios from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import Constants from "expo-constants";

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signup"
>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { LOGIN_SERVER_URL } = Constants.expoConfig?.extra || {};

  const handleSignup = async () => {
    try {
      if (!name || !email || !password) {
        return Alert.alert("Error", "All fields are required.");
      }
      const response = await axios.post(`${LOGIN_SERVER_URL}/api/auth/signup`, {
        email,
        password,
        name,
      });
      Alert.alert(
        "Success",
        response.data.message || "Signup successful! Please verify your email."
      );

      navigation.navigate("Login");
    } catch (err: any) {
      alert("Signup failed: " + (err.response?.data?.message || err.message));
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
            Create Account
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Sign up to get started
          </Text>

          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="words"
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          <Button
            mode="contained"
            onPress={handleSignup}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Sign Up
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate("Login")}
            style={styles.linkButton}
          >
            Already have an account? Log in
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
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  linkButton: {
    alignSelf: "center",
    marginTop: 16,
  },
});

export default SignupScreen;
