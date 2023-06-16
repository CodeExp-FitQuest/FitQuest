import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text>Hello this is home screen!</Text>
        <Text>I just created my first React App</Text>
        <TouchableOpacity
          style={styles.backbtn}
          onPress={() => navigation.navigate("login")}
        >
          <Text>Click me</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
  },
});

export default HomeScreen;
