import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
//import { GoogleSignin } from "@react-native-google-signin/google-signin";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const navigation = useNavigation();

  const handleClick = () => {
    /*try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      setloggedIn(true);
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      await auth().signInWithCredential(credential);
    } catch (error) {
      return alert(error.message);
    }*/
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(`Signed in with ${user.email}`);
        /*let toast = Toast.show("Successfully signed in", {
          duration: Toast.durations.SHORT,
          backgroundColor: "green",
        });
        writeUserData(email, password);
        setTimeout(function hideToast() {
          Toast.hide(toast);
        }, 1500);
        */
<<<<<<< HEAD
        navigation.navigate("hometab");
=======
        navigation.navigate("profile");
>>>>>>> main
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      if (user) {
        setloggedIn(true);
<<<<<<< HEAD
        navigation.navigate("hometab");
=======
        navigation.navigate("profile");
>>>>>>> main
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.header}>FitQuest</Text>
        <Text style={styles.subheader}>Earn rewards while working out</Text>
      </View>
      <View style={styles.inputs}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="black"
            onChangeText={(email) => setEmail(email)}
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <View style={styles.separator}>
        <Text style={styles.separatorText}>
          ___________Sign in with___________
        </Text>
      </View>

      <View style={styles.socialMediaIcons}>
        <View style={styles.iconContainer}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require(".././assets/Facebook-logo.png")}
          />
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleClick}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require(".././assets/google.png")}
            />
          </TouchableOpacity>
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
    fontWeight: "bold",
  },
  inputContainer: {
    backgroundColor: "#A3A3BD",
    borderRadius: 15,
    width: 250,
    height: 50,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    marginTop: 100,
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "semibold",
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  separatorText: {
    color: "white",
    fontSize: 20,
    paddingHorizontal: 10,
    position: "absolute",
    top: 30,
  },
  socialMediaIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    position: "absolute",
    bottom: 80,
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
