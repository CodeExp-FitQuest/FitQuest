import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const HomeScreen = () => {
  const navigation = useNavigation();
  
<<<<<<< HEAD
  const handleSignOut = () => {
=======
  /*const handleSignOut = () => {
>>>>>>> main
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(`Signed out of ${user.email}`);
          }
        });
<<<<<<< HEAD
        /*
=======
        
>>>>>>> main
        let toast = Toast.show('You have signed out', {
          duration: Toast.durations.SHORT,
          backgroundColor: 'red',
        });
        
        setTimeout(function hideToast() {
          Toast.hide(toast);
        }, 1500);
<<<<<<< HEAD
        */
=======
        
>>>>>>> main
        navigation.navigate("login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
<<<<<<< HEAD
=======
  */
>>>>>>> main

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text>Hello this is home screen!</Text>
        <Text>I just created my first React App</Text>
        <TouchableOpacity
          style={styles.backbtn}
          onPress={handleSignOut}
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
