import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>FitQuest</Text>
      <Text style={styles.subheader}>Earn rewards while working out</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("hometab")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.separator}>
        <Text style={styles.separatorText}>Sign in with</Text>
      </View>

      <View style={styles.socialMediaIcons}>
        <View style={styles.iconContainer}>{/* Facebook Icon */}</View>
        <View style={styles.iconContainer}>{/* Google Icon */}</View>
        <View style={styles.iconContainer}>{/* Twitter Icon */}</View>
      </View>

      <TouchableOpacity style={styles.signUpLink}>
        <Text style={styles.signUpLinkText}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7D57C1",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subheader: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  button: {
    height: 70,
    width: 270,
    backgroundColor: "transparent",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 25
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  separatorText: {
    color: "white",
    paddingHorizontal: 10,
  },
  socialMediaIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "white",
    marginTop: 80,
    marginHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",

  },
  signUpLink: {
    position: "absolute",
    bottom: 20,
  },
  signUpLinkText: {
    color: "white",
    textDecorationLine: "underline",
  },
});

export default LoginPage;
