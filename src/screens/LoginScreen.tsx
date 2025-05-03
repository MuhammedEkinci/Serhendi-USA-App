import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      alert("Login success! Token: " + res.data.token);
    } catch (err: any) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Login</Text>
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
      <Button mode="contained" onPress={handleLogin} style={{ marginTop: 16 }}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate("Signup")}>
        Go to Signup
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default LoginScreen;
