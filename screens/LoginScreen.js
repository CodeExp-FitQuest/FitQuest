import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.header}>FitQuest</Text>
        <Text style={styles.subheader}>Earn rewards while working out</Text>
      </View>
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
        <View style={styles.iconContainer}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require(".././assets/Facebook-logo.png")}
          />
        </View>
        <View style={styles.iconContainer}>
          <Image
            style={{ width: 60, height: 60 }}
            source={require(".././assets/google.png")}
          />
        </View>
        <View style={styles.iconContainer}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require(".././assets/twitter.png")}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.signUpLink}
        onPress={() => navigation.navigate("signup")}
      >
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
  subcontainer: {
    position: "absolute",
    top: 130,
  },
  header: {
    fontSize: 65,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subheader: {
    fontSize: 17,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
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
    fontSize: 25,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  separatorText: {
    color: "white",
    fontSize: 20,
    paddingHorizontal: 10,
    position: "absolute",
    top: 120
  },
  socialMediaIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    position: "absolute",
    bottom: 100,
  },
  iconContainer: {
    width: 80,
    height: 80,
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
    marginBottom: 20,
  },
});

export default LoginPage;
