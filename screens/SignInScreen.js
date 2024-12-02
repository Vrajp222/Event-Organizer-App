import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSignIn = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTab" }], 
        });
      } catch (error) {
        Alert.alert("Sign In Failed", error.message);
      }
    };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: "#ffffff",
    },
    title: {
      fontSize: 36,
      fontWeight: "bold",
      color: "#2ecc71",
      textAlign: "center",
      marginBottom: 30,
    },
    input: {
      borderWidth: 1,
      borderColor: "#dfe6e9",
      backgroundColor: "#f5f6fa",
      padding: 15,
      marginBottom: 20,
      borderRadius: 10,
      fontSize: 16,
      color: "#2d3436",
    },
    button: {
      backgroundColor: "#2ecc71",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "600",
    },
    link: {
      color: "#2980b9",
      textAlign: "center",
      marginTop: 15,
      fontSize: 16,
    },
  });
  

export default SignInScreen;
