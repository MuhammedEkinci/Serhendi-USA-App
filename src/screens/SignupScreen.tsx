import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signup"
>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password,
        }
      );
      alert(
        "Signup successful! Please check your email to verify your account."
      );
      navigation.navigate("Login");
    } catch (err: any) {
      alert("Signup failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Signup</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        Sign Up
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

export default SignupScreen;
