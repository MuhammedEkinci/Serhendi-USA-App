import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import axios from "axios";
import { RootStackParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type ResetPasswordProps = NativeStackScreenProps<
  RootStackParamList,
  "ResetPassword"
>;

const ResetPasswordScreen: React.FC<ResetPasswordProps> = ({
  route,
  navigation,
}) => {
  const { token } = route.params;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      return Alert.alert("Error", "Please fill out both fields.");
    }
    if (newPassword !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match.");
    }

    try {
      const res = await axios.post(
        `${process.env.LOGIN_SERVER_URL}/api/auth/reset-password`,
        {
          token,
          password: newPassword,
        }
      );

      Alert.alert("Success", res.data.message || "Password has been reset!");
      navigation.navigate("Login");
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Reset Password
      </Text>

      <TextInput
        label="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleResetPassword}
        style={styles.button}
      >
        Submit
      </Button>

      <Button onPress={() => navigation.navigate("Login")}>
        Back to Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { marginBottom: 20, textAlign: "center" },
  input: { marginBottom: 16 },
  button: { marginTop: 16 },
});

export default ResetPasswordScreen;
